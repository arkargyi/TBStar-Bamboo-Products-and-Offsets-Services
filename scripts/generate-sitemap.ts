import fs from 'node:fs';
import path from 'node:path';
import {
  COMPANY_INFO,
  INQUIRY_TYPE_OPTIONS,
  PAGE_SEO,
  PageRoute,
} from '../src/constants/companyData';
import {
  escapeHtml,
  getRouteSeoPayload,
  resolveInquiryFromSearch,
  resolveRouteState,
  VALID_ROUTES,
} from '../src/utils/seoHtml';

interface SitemapRouteConfig {
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
}

const ROUTE_SITEMAP_CONFIG: Record<PageRoute, SitemapRouteConfig> = {
  '/': { lastmod: '2026-11-09', changefreq: 'weekly', priority: '1.0' },
  '/bamboo-products': {
    lastmod: '2026-11-09',
    changefreq: 'weekly',
    priority: '0.9',
  },
  '/activated-carbon': {
    lastmod: '2026-11-09',
    changefreq: 'weekly',
    priority: '0.9',
  },
  '/printing-services': {
    lastmod: '2026-11-09',
    changefreq: 'weekly',
    priority: '0.9',
  },
  '/about': { lastmod: '2026-11-09', changefreq: 'monthly', priority: '0.8' },
  '/contact': { lastmod: '2026-11-09', changefreq: 'monthly', priority: '0.8' },
  '/gallery': { lastmod: '2026-11-09', changefreq: 'weekly', priority: '0.7' },
};

export function buildSitemapXml(
  routes: readonly string[] = VALID_ROUTES,
  lastmodOverride?: string
): string {
  // Canonicalize and deduplicate any incoming routes (e.g. stripping ?inquiry=... or trailing slashes)
  const canonicalRoutes: PageRoute[] = [];
  const seen = new Set<PageRoute>();

  for (const rawRoute of routes) {
    const { route, isNotFound } = resolveRouteState(rawRoute);
    if (!isNotFound && !seen.has(route)) {
      seen.add(route);
      canonicalRoutes.push(route);
    }
  }

  const urlEntries = canonicalRoutes
    .map((route) => {
      const seo = PAGE_SEO[route];
      const loc =
        seo?.canonicalUrl ||
        `${COMPANY_INFO.canonicalBase}${route === '/' ? '/' : route}`;
      const config = ROUTE_SITEMAP_CONFIG[route] ?? {
        lastmod: '2026-11-09',
        changefreq: 'weekly',
        priority: '0.8',
      };
      const routeLastmod = lastmodOverride || config.lastmod;

      return [
        '  <url>',
        `    <loc>${escapeHtml(loc)}</loc>`,
        `    <lastmod>${escapeHtml(routeLastmod)}</lastmod>`,
        `    <changefreq>${config.changefreq}</changefreq>`,
        `    <priority>${config.priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    '</urlset>',
    '',
  ].join('\n');
}

function generateSitemap() {
  for (const route of VALID_ROUTES) {
    const seo = PAGE_SEO[route];
    if (!seo || !seo.canonicalUrl) {
      throw new Error(
        `[Sitemap] Missing PAGE_SEO or canonicalUrl definition for route: ${route}`
      );
    }
    const expectedCanonical = `${COMPANY_INFO.canonicalBase}${
      route === '/' ? '/' : route
    }`;
    if (seo.canonicalUrl !== expectedCanonical) {
      throw new Error(
        `[Sitemap] Canonical mismatch for ${route}: expected ${expectedCanonical}, got ${seo.canonicalUrl}`
      );
    }
  }

  // Verify that all inquiry query variants resolve to /contact with canonical https://tbstarcompany.com/contact
  for (const option of INQUIRY_TYPE_OPTIONS) {
    const queryUrl = `/contact?inquiry=${encodeURIComponent(option)}`;
    const payload = getRouteSeoPayload(queryUrl);
    const parsedOption = resolveInquiryFromSearch(queryUrl);
    if (
      payload.statusCode !== 200 ||
      payload.route !== '/contact' ||
      payload.canonicalUrl !== `${COMPANY_INFO.canonicalBase}/contact` ||
      parsedOption !== option
    ) {
      throw new Error(
        `[Sitemap] Query variant canonicalization failed for ${queryUrl}`
      );
    }
  }

  const xml = buildSitemapXml(VALID_ROUTES);

  const publicDir = path.resolve(process.cwd(), 'public');
  fs.mkdirSync(publicDir, { recursive: true });
  const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xml, 'utf-8');

  console.log(
    `[Sitemap] Generated ${publicSitemapPath} with ${VALID_ROUTES.length} routes from VALID_ROUTES:`
  );
  for (const route of VALID_ROUTES) {
    const loc = PAGE_SEO[route].canonicalUrl;
    if (!xml.includes(`<loc>${escapeHtml(loc)}</loc>`)) {
      throw new Error(`[Sitemap] Generated XML is missing <loc>${loc}</loc>`);
    }
    console.log(`  ✓ ${route} -> ${loc}`);
  }

  // Also sync to dist/sitemap.xml if dist directory exists
  const distDir = path.resolve(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, xml, 'utf-8');
    console.log(`[Sitemap] Synced sitemap to ${distSitemapPath}`);
  }
}

generateSitemap();
