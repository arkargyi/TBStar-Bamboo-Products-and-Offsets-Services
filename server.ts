import express, { Request, Response, NextFunction } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';
import {
  BALL_PEN_PRODUCT,
  BAMBOO_PRODUCTS,
  CHARCOAL_PRODUCT_INFO,
  COMPANY_INFO,
  INQUIRY_TYPE_OPTIONS,
  InquiryTypeOption,
  PAGE_SEO,
  PageRoute,
  PRINTING_SERVICES,
} from './src/data/companyData';

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

function buildServerStructuredData(route: PageRoute) {
  const seo = PAGE_SEO[route] || PAGE_SEO['/'];
  const baseUrl = COMPANY_INFO.canonicalBase;

  const organizationNode = {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: COMPANY_INFO.name,
    alternateName: COMPANY_INFO.nameMm,
    foundingDate: COMPANY_INFO.establishedYear,
    url: `${baseUrl}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${baseUrl}/#logo`,
      url: `${baseUrl}${COMPANY_INFO.logoPath}`,
      contentUrl: `${baseUrl}${COMPANY_INFO.logoPath}`,
      caption: 'TB Star Company Limited Official Logo',
    },
    image: `${baseUrl}/images/products/bamboo-split-main.webp`,
    description:
      'Established in 2013, TB Star Company Limited has been operating in Myanmar, supplying 100% natural Myanmar bamboo products (Bamboo Split and Bamboo Sticks), Activated Carbon, and one-stop offset printing services and stationery (including Klick and Plano Ball Pens) in Yangon, Myanmar.',
    telephone: COMPANY_INFO.telephone,
    email: COMPANY_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Room No. 1103, 11th Floor, Central Tower, Corner of 39th Street and Anawrahta Road, Kyauktada Township',
      addressLocality: 'Yangon',
      addressRegion: 'Yangon Region',
      postalCode: '11182',
      addressCountry: 'MM',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: COMPANY_INFO.telephone,
        email: COMPANY_INFO.email,
        contactType: 'sales',
        areaServed: 'MM',
        availableLanguage: ['en', 'my'],
      },
    ],
  };

  const websiteNode = {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: `${baseUrl}/`,
    name: COMPANY_INFO.name,
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: 'en',
  };

  const pageType =
    route === '/about'
      ? 'AboutPage'
      : route === '/contact'
      ? 'ContactPage'
      : route === '/gallery' || route === '/bamboo-products' || route === '/charcoal'
      ? 'CollectionPage'
      : 'WebPage';

  const breadcrumbNode = {
    '@type': 'BreadcrumbList',
    '@id': `${seo.canonicalUrl}#breadcrumb`,
    itemListElement: seo.breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  const webPageNode: Record<string, unknown> = {
    '@type': pageType,
    '@id': `${seo.canonicalUrl}#webpage`,
    url: seo.canonicalUrl,
    name: seo.title,
    description: seo.description,
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#organization`,
    },
    breadcrumb: {
      '@id': `${seo.canonicalUrl}#breadcrumb`,
    },
    inLanguage: 'en',
  };

  const graph: Record<string, unknown>[] = [
    organizationNode,
    websiteNode,
    webPageNode,
    breadcrumbNode,
  ];

  if (route === '/bamboo-products') {
    const sectionAnchorById: Record<string, string> = {
      'bamboo-split': 'product-bamboo-split',
      'bamboo-sticks': 'product-bamboo-sticks',
    };

    graph.push({
      '@type': 'ItemList',
      '@id': `${seo.canonicalUrl}#product-list`,
      name: 'TB Star Company Limited Natural Myanmar Bamboo Products',
      itemListElement: BAMBOO_PRODUCTS.map((prod, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: prod.name,
        description: prod.detailedDescription,
        url: `${seo.canonicalUrl}#${sectionAnchorById[prod.id] || prod.id}`,
      })),
    });
  }

  if (route === '/charcoal') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${seo.canonicalUrl}#activated-carbon-list`,
      name: 'TB Star Company Limited Activated Carbon Product Line',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: CHARCOAL_PRODUCT_INFO.name,
          description: CHARCOAL_PRODUCT_INFO.detailedDescription,
          url: `${seo.canonicalUrl}#product-charcoal`,
        },
      ],
    });
  }

  if (route === '/printing-services') {
    const items = [
      ...PRINTING_SERVICES.map((svc, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: svc.name,
        description: svc.detailedDescription,
        url: `${seo.canonicalUrl}#service-${svc.id}`,
      })),
      {
        '@type': 'ListItem',
        position: PRINTING_SERVICES.length + 1,
        name: BALL_PEN_PRODUCT.name,
        description: BALL_PEN_PRODUCT.detailedDescription,
        url: `${seo.canonicalUrl}#product-ball-pen`,
      },
    ];

    graph.push({
      '@type': 'ItemList',
      '@id': `${seo.canonicalUrl}#service-list`,
      name: 'TB Star Company Limited One-Stop Offset Printing Services & Stationery',
      itemListElement: items,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
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
    const jsonLd = JSON.stringify(buildServerStructuredData(route), null, 2);
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
  email: string;
  inquiryType: InquiryTypeOption;
  message: string;
  delivered: boolean;
  deliveryChannel: 'smtp' | 'resend' | 'webhook' | 'server-log';
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
  email: string;
  inquiryType: InquiryTypeOption;
  message: string;
}): Promise<{
  delivered: boolean;
  channel: 'smtp' | 'resend' | 'webhook' | 'server-log';
}> {
  const recipientEmail =
    process.env.INQUIRY_TO_EMAIL?.trim() || COMPANY_INFO.email;
  const subject = `[TB Star Inquiry #${record.referenceId}] ${record.inquiryType} – ${
    record.companyName || record.name
  }`;

  const plainBody = [
    `New Website Inquiry – ${COMPANY_INFO.name}`,
    `Reference ID: ${record.referenceId}`,
    `--------------------------------------------------`,
    `Full Name: ${record.name}`,
    `Company Name: ${record.companyName || 'Not provided'}`,
    `Email Address: ${record.email}`,
    `Phone / WhatsApp: ${record.phone || 'Not provided'}`,
    `Inquiry Category: ${record.inquiryType}`,
    `--------------------------------------------------`,
    `Message / Specifications:`,
    record.message,
  ].join('\n');

  // 1. Check SMTP configuration via Nodemailer
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const smtpPort = Number(process.env.SMTP_PORT || '587');
  const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
  const smtpFrom =
    process.env.SMTP_FROM?.trim() ||
    `"TB Star Website" <${smtpUser || COMPANY_INFO.email}>`;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: recipientEmail,
        replyTo: record.email,
        subject,
        text: plainBody,
      });

      return { delivered: true, channel: 'smtp' };
    } catch (err) {
      console.error('[Inquiry Delivery]: SMTP send failed', err);
    }
  }

  // 2. Check Resend API configuration
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:
            process.env.SMTP_FROM?.trim() ||
            'TB Star Website <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: record.email,
          subject,
          text: plainBody,
        }),
      });
      if (res.ok) {
        return { delivered: true, channel: 'resend' };
      }
      console.error('[Inquiry Delivery]: Resend API returned non-200 status', res.status);
    } catch (err) {
      console.error('[Inquiry Delivery]: Resend request failed', err);
    }
  }

  // 3. Check custom Webhook configuration
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
    const emailConfigured = Boolean(
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) ||
        process.env.RESEND_API_KEY ||
        process.env.INQUIRY_WEBHOOK_URL
    );
    res.status(200).json({
      status: 'ok',
      service: 'tb-star-web',
      emailDeliveryConfigured: emailConfigured,
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
            'Too many inquiry submissions from this connection. Please wait 15 minutes or contact our office directly via phone or email.',
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

    const name = sanitizeText(body.name, 120);
    const companyName = sanitizeText(body.companyName, 160);
    const phone = sanitizeText(body.phone, 60);
    const email = sanitizeText(body.email, 160);
    const rawCategory = sanitizeText(body.inquiryType, 80);
    const inquiryTypeRaw =
      rawCategory === 'Charcoal' ? 'Activated Carbon' : rawCategory;
    const message = sanitizeText(body.message, 4000);

    const fieldErrors: Record<string, string> = {};

    if (name.length < 2) {
      fieldErrors.name = 'Please enter your full name (at least 2 characters).';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldErrors.email = 'Please enter a valid business or contact email address.';
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
      email,
      inquiryType,
      message,
    });

    const storedOnServer = appendInquiryToDisk({
      referenceId,
      createdAt: new Date(now).toISOString(),
      name,
      companyName,
      phone,
      email,
      inquiryType,
      message,
      delivered: deliveryResult.delivered,
      deliveryChannel: deliveryResult.channel,
    });

    if (deliveryResult.delivered) {
      return res.status(200).json({
        ok: true,
        delivered: true,
        storedOnServer,
        referenceId,
        message: `Your inquiry (Ref #${referenceId}) has been delivered to ${COMPANY_INFO.name}. Our team will respond to ${email}.`,
      });
    }

    if (storedOnServer) {
      return res.status(200).json({
        ok: true,
        delivered: false,
        storedOnServer: true,
        referenceId,
        message: `Your inquiry (Ref #${referenceId}) has been validated and recorded on the server. Because external SMTP email transport is not configured in this environment, no automated email was dispatched yet — you can send your inquiry directly via Email or WhatsApp below.`,
      });
    }

    return res.status(503).json({
      ok: false,
      delivered: false,
      storedOnServer: false,
      error:
        'Automated email delivery is not configured on this server. Please send your inquiry directly via Email or WhatsApp below.',
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
