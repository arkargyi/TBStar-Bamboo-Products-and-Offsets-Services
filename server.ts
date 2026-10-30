import express, { Request, Response, NextFunction } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  buildStructuredData,
  COMPANY_INFO,
  INQUIRY_TYPE_OPTIONS,
  InquiryTypeOption,
  PAGE_SEO,
  PageRoute,
} from './src/constants/companyData';

const VALID_ROUTES: PageRoute[] = [
  '/',
  '/about',
  '/bamboo-products',
  '/charcoal',
  '/printing-services',
  '/gallery',
  '/contact',
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeText(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function injectRouteSeoIntoHtml(html: string, pathname: string): {
  html: string;
  statusCode: number;
} {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const isKnownRoute = VALID_ROUTES.includes(normalized as PageRoute);
  const route: PageRoute = isKnownRoute ? (normalized as PageRoute) : '/';
  const seo = PAGE_SEO[route] || PAGE_SEO['/'];

  const title = isKnownRoute
    ? seo.title
    : `Page Not Found (404) – ${COMPANY_INFO.name}`;
  const description = isKnownRoute
    ? seo.description
    : `The requested page was not found on ${COMPANY_INFO.name}. Explore 100% natural Myanmar Bamboo Split, Bamboo Sticks, Activated Carbon, and One-Stop Offset Printing Services.`;
  const robots = isKnownRoute
    ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'noindex, nofollow';
  const canonicalUrl = isKnownRoute
    ? seo.canonicalUrl
    : `${COMPANY_INFO.canonicalBase}${pathname}`;

  let output = html;

  output = output.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`
  );

  output = output.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  output = output.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${escapeHtml(robots)}" />`
  );

  output = output.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );

  output = output.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
  );

  output = output.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );

  output = output.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );

  output = output.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(seo.ogImage)}" />`
  );

  output = output.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:alt" content="${escapeHtml(seo.ogImageAlt)}" />`
  );

  output = output.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`
  );

  output = output.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`
  );

  output = output.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(seo.ogImage)}" />`
  );

  if (isKnownRoute) {
    const jsonLd = JSON.stringify(buildStructuredData(route), null, 2);
    output = output.replace(
      /<script id="structured-data-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script id="structured-data-jsonld" type="application/ld+json">\n${jsonLd}\n    </script>`
    );
  }

  return {
    html: output,
    statusCode: isKnownRoute ? 200 : 404,
  };
}

// In-memory IP rate limiter for inquiry endpoint
interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const inquiryRateLimits = new Map<string, RateLimitBucket>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // max 5 inquiries per 15 minutes per IP

function getClientIpHash(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  const rawIp =
    (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') ||
    req.socket.remoteAddress ||
    'unknown';
  return crypto.createHash('sha256').update(rawIp).digest('hex').slice(0, 16);
}

interface StoredInquiryRecord {
  referenceId: string;
  createdAt: string;
  name: string;
  companyName: string;
  phone: string;
  inquiryType: InquiryTypeOption;
  message: string;
  delivered: boolean;
  deliveryChannel: 'webhook' | 'server-log';
}

function appendInquiryToDisk(record: StoredInquiryRecord): boolean {
  try {
    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, 'inquiries.json');
    let existing: StoredInquiryRecord[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          existing = parsed;
        }
      } catch {
        existing = [];
      }
    }
    existing.push(record);
    // Keep most recent 500 records
    if (existing.length > 500) {
      existing = existing.slice(existing.length - 500);
    }
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Inquiry Storage Error]: Failed to write inquiry log', err);
    return false;
  }
}

async function deliverInquiryNotification(record: {
  referenceId: string;
  name: string;
  companyName: string;
  phone: string;
  inquiryType: InquiryTypeOption;
  message: string;
}): Promise<{
  delivered: boolean;
  channel: 'webhook' | 'server-log';
}> {
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: COMPANY_INFO.name,
          ...record,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        return { delivered: true, channel: 'webhook' };
      }
    } catch (err) {
      console.error('[Inquiry Delivery]: Webhook delivery failed', err);
    }
  }

  return { delivered: false, channel: 'server-log' };
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  const isProd = process.env.NODE_ENV === 'production';

  app.disable('x-powered-by');

  // Security headers middleware
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'geolocation=(), microphone=(), camera=()'
    );
    next();
  });

  // Strict JSON body limit to prevent payload abuse
  app.use(express.json({ limit: '16kb' }));

  // Redirect /activated-carbon alias to canonical /charcoal route
  app.get(['/activated-carbon', '/activated-carbon/'], (_req: Request, res: Response) => {
    res.redirect(301, '/charcoal');
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      service: 'tb-star-web',
    });
  });

  // Inquiry submission endpoint with rate limiting, validation, and spam protection
  app.post('/api/inquiries', async (req: Request, res: Response) => {
    const now = Date.now();
    const clientKey = getClientIpHash(req);

    // Clean up expired buckets periodically
    if (inquiryRateLimits.size > 1000) {
      for (const [key, bucket] of inquiryRateLimits.entries()) {
        if (bucket.resetAt <= now) {
          inquiryRateLimits.delete(key);
        }
      }
    }

    const existingBucket = inquiryRateLimits.get(clientKey);
    if (existingBucket && existingBucket.resetAt > now) {
      if (existingBucket.count >= RATE_LIMIT_MAX_REQUESTS) {
        const retryAfterSeconds = Math.ceil(
          (existingBucket.resetAt - now) / 1000
        );
        res.setHeader('Retry-After', String(retryAfterSeconds));
        return res.status(429).json({
          ok: false,
          error:
            'Too many inquiry submissions from this connection. Please wait 15 minutes or contact our office directly via phone or WhatsApp.',
        });
      }
      existingBucket.count += 1;
    } else {
      inquiryRateLimits.set(clientKey, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    const body = req.body && typeof req.body === 'object' ? req.body : {};

    // Honeypot check: bots filling the hidden `website` field are rejected
    const honeypot = sanitizeText(body.website, 200);
    if (honeypot.length > 0) {
      return res.status(400).json({
        ok: false,
        error: 'Automated spam submission detected.',
      });
    }

    // Timing check: reject instant automated submissions (< 800ms after render) when timestamp is provided
    if (
      typeof body.formRenderedAt === 'number' &&
      body.formRenderedAt > 0 &&
      now - body.formRenderedAt < 800
    ) {
      return res.status(400).json({
        ok: false,
        error: 'Submission was too fast. Please review your details and try again.',
      });
    }

    const name = sanitizeText(body.fullName || body.name, 120);
    const companyName = sanitizeText(body.companyName, 160);
    const phone = sanitizeText(body.phone, 60);
    const rawCategory = sanitizeText(body.inquiryType, 80);
    const inquiryTypeRaw =
      rawCategory === 'Charcoal' ? 'Activated Carbon' : rawCategory;
    const message = sanitizeText(body.message, 4000);

    const fieldErrors: Record<string, string> = {};

    if (name.length < 2) {
      fieldErrors.name = 'Please enter your full name (at least 2 characters).';
    }

    if (
      phone &&
      !/^[+\d\s()-]{6,30}$/.test(phone)
    ) {
      fieldErrors.phone = 'Please enter a valid phone or WhatsApp number.';
    }

    if (!INQUIRY_TYPE_OPTIONS.includes(inquiryTypeRaw as InquiryTypeOption)) {
      fieldErrors.inquiryType = 'Please select a valid inquiry category.';
    }

    if (message.length < 10) {
      fieldErrors.message =
        'Please provide at least 10 characters describing your product or printing inquiry.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      return res.status(400).json({
        ok: false,
        error: 'Please check the highlighted form fields and try again.',
        fieldErrors,
      });
    }

    const inquiryType = inquiryTypeRaw as InquiryTypeOption;
    const referenceId = `TBS-${Date.now().toString(36).toUpperCase()}-${crypto
      .randomBytes(2)
      .toString('hex')
      .toUpperCase()}`;

    const deliveryResult = await deliverInquiryNotification({
      referenceId,
      name,
      companyName,
      phone,
      inquiryType,
      message,
    });

    const storedOnServer = appendInquiryToDisk({
      referenceId,
      createdAt: new Date(now).toISOString(),
      name,
      companyName,
      phone,
      inquiryType,
      message,
      delivered: deliveryResult.delivered,
      deliveryChannel: deliveryResult.channel,
    });

    if (deliveryResult.delivered || storedOnServer) {
      return res.status(200).json({
        ok: true,
        delivered: deliveryResult.delivered,
        storedOnServer,
        referenceId,
        message: `Your inquiry (Ref #${referenceId}) has been recorded for ${COMPANY_INFO.name}. You can also contact our Yangon office directly via phone or WhatsApp below.`,
      });
    }

    return res.status(503).json({
      ok: false,
      delivered: false,
      storedOnServer: false,
      error:
        'Please contact our Yangon office directly via phone or WhatsApp below.',
    });
  });

  // Catch-all for unknown /api/* routes
  app.all('/api/*splat', (_req: Request, res: Response) => {
    res.status(404).json({
      ok: false,
      error: 'API endpoint not found.',
    });
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use(async (req: Request, res: Response, next: NextFunction) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next();
      }

      try {
        const url = req.originalUrl || '/';
        const pathname = url.split('?')[0] || '/';
        const templatePath = path.resolve(process.cwd(), 'index.html');
        const rawTemplate = fs.readFileSync(templatePath, 'utf-8');
        const transformed = await vite.transformIndexHtml(url, rawTemplate);
        const { html, statusCode } = injectRouteSeoIntoHtml(
          transformed,
          pathname
        );

        res
          .status(statusCode)
          .set({ 'Content-Type': 'text/html; charset=utf-8' })
          .end(html);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    const indexHtmlPath = path.join(distPath, 'index.html');

    app.use(
      express.static(distPath, {
        index: false,
        maxAge: '7d',
      })
    );

    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next();
      }
      if (!fs.existsSync(indexHtmlPath)) {
        return res.status(500).send('Production build not found. Run npm run build.');
      }
      const pathname = (req.originalUrl || '/').split('?')[0] || '/';
      const rawHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
      const { html, statusCode } = injectRouteSeoIntoHtml(rawHtml, pathname);
      res
        .status(statusCode)
        .set({ 'Content-Type': 'text/html; charset=utf-8' })
        .send(html);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `[TB Star Server] Listening on http://0.0.0.0:${PORT} (mode: ${
        isProd ? 'production' : 'development'
      })`
    );
  });
}

startServer().catch((err) => {
  console.error('[TB Star Server] Fatal startup error:', err);
  process.exit(1);
});
