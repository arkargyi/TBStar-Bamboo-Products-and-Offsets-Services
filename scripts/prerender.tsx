import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { PAGE_SEO } from '../src/constants/companyData';
import {
  escapeHtml,
  injectRouteSeoAndHtml,
  NOT_FOUND_SEO,
  VALID_ROUTES,
} from '../src/utils/seoHtml';

function extractFirstH1Text(html: string): string {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return '';
  return match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function prerenderBuild() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(
      `[Prerender] dist/index.html not found at ${indexHtmlPath}. Run "vite build" first.`
    );
  }

  const baseTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');

  console.log('[Prerender] Starting build-time static HTML prerendering...');

  for (const route of VALID_ROUTES) {
    const appHtml = renderToString(
      React.createElement(App, { initialPathname: route })
    );

    const { html } = injectRouteSeoAndHtml(baseTemplate, route, appHtml);
    const expectedSeo = PAGE_SEO[route];
    const h1Text = extractFirstH1Text(appHtml);

    if (!appHtml || appHtml.trim().length < 200) {
      throw new Error(`[Prerender] Empty or incomplete render for ${route}`);
    }
    if (!h1Text) {
      throw new Error(`[Prerender] Missing <h1> element in rendered HTML for ${route}`);
    }
    if (!html.includes(`<title>${escapeHtml(expectedSeo.title)}</title>`)) {
      throw new Error(`[Prerender] Title mismatch in generated HTML for ${route}`);
    }
    if (
      !html.includes(
        `<link rel="canonical" href="${escapeHtml(expectedSeo.canonicalUrl)}" />`
      )
    ) {
      throw new Error(
        `[Prerender] Canonical URL mismatch in generated HTML for ${route}`
      );
    }

    if (route === '/') {
      fs.writeFileSync(indexHtmlPath, html, 'utf-8');
      console.log(
        `  ✓ / -> dist/index.html | H1: "${h1Text}" | Canonical: ${expectedSeo.canonicalUrl}`
      );
    } else {
      const slug = route.replace(/^\/+/, '');
      const flatHtmlPath = path.join(distDir, `${slug}.html`);
      const nestedDir = path.join(distDir, slug);
      const nestedIndexPath = path.join(nestedDir, 'index.html');

      fs.mkdirSync(nestedDir, { recursive: true });
      fs.writeFileSync(flatHtmlPath, html, 'utf-8');
      fs.writeFileSync(nestedIndexPath, html, 'utf-8');

      console.log(
        `  ✓ ${route} -> dist/${slug}.html & dist/${slug}/index.html | H1: "${h1Text}" | Canonical: ${expectedSeo.canonicalUrl}`
      );
    }
  }

  // Prerender 404.html for unknown routes (served with HTTP 404 by Vercel and static hosts)
  const notFoundAppHtml = renderToString(
    React.createElement(App, { initialPathname: '/404' })
  );
  const { html: notFoundHtml } = injectRouteSeoAndHtml(
    baseTemplate,
    '/404',
    notFoundAppHtml
  );
  const notFoundH1 = extractFirstH1Text(notFoundAppHtml);

  if (!notFoundH1) {
    throw new Error('[Prerender] Missing <h1> in 404.html');
  }
  if (!notFoundHtml.includes(`<title>${escapeHtml(NOT_FOUND_SEO.title)}</title>`)) {
    throw new Error('[Prerender] Missing 404 title in 404.html');
  }
  if (!notFoundHtml.includes('<meta name="robots" content="noindex, nofollow" />')) {
    throw new Error('[Prerender] Missing noindex, nofollow robots tag in 404.html');
  }

  const notFoundPath = path.join(distDir, '404.html');
  fs.writeFileSync(notFoundPath, notFoundHtml, 'utf-8');
  console.log(
    `  ✓ /404 -> dist/404.html | H1: "${notFoundH1}" | Robots: ${NOT_FOUND_SEO.robots}`
  );

  console.log(
    `[Prerender] Successfully generated ${VALID_ROUTES.length} public routes + 404.html.`
  );
}

prerenderBuild();
