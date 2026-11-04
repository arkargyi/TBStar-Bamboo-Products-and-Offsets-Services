import fs from 'node:fs';
import path from 'node:path';
import {
  COMPANY_INFO,
  PAGE_SEO,
  PageRoute,
} from '../src/constants/companyData';
import { escapeHtml, VALID_ROUTES } from '../src/utils/seoHtml';

interface SitemapRouteConfig {
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
}

const ROUTE_SITEMAP_CONFIG: Record<PageRoute, SitemapRouteConfig> = {
  '/': { changefreq: 'weekly', priority: '1.0' },
  '/bamboo-products': { changefreq: 'weekly', priority: '0.9' },
  '/activated-carbon': { changefreq: 'weekly', priority: '0.9' },
  '/printing-services': { changefreq: 'weekly', priority: '0.9' },
  '/about': { changefreq: 'monthly', priority: '0.8' },
  '/contact': { changefreq: 'monthly', priority: '0.8' },
  '/gallery': { changefreq: 'weekly', priority: '0.7' },
};

export function buildSitemapXml(
  routes: readonly PageRoute[] = VALID_ROUTES,
  lastmodDate: string = new Date().toISOString().split('T')[0]
): string {
  const urlEntries = routes
    .map((route) => {
      const seo = PAGE_SEO[route];
      const loc =
        seo?.canonicalUrl ||
        `${COMPANY_INFO.canonicalBase}${route === '/' ? '/' : route}`;
      const config = ROUTE_SITEMAP_CONFIG[route] ?? {
        changefreq: 'weekly',
        priority: '0.8',
      };

      return [
        '  <url>',
        `    <loc>${escapeHtml(loc)}</loc>`,
        `    <lastmod>${escapeHtml(lastmodDate)}</lastmod>`,
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
  const xml = buildSitemapXml(VALID_ROUTES);

  const publicDir = path.resolve(process.cwd(), 'public');
  fs.mkdirSync(publicDir, { recursive: true });
  const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xml, 'utf-8');

  console.log(
    `[Sitemap] Generated ${publicSitemapPath} with ${VALID_ROUTES.length} routes from VALID_ROUTES:`
  );
  for (const route of VALID_ROUTES) {
    const loc =
      PAGE_SEO[route]?.canonicalUrl ||
      `${COMPANY_INFO.canonicalBase}${route === '/' ? '/' : route}`;
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
