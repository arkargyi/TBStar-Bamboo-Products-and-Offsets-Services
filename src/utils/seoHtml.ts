import {
  buildStructuredData,
  COMPANY_INFO,
  INQUIRY_TYPE_OPTIONS,
  InquiryTypeOption,
  PAGE_SEO,
  PageRoute,
} from '../constants/companyData';

export const VALID_ROUTES: PageRoute[] = [
  '/',
  '/about',
  '/bamboo-products',
  '/activated-carbon',
  '/printing-services',
  '/gallery',
  '/contact',
];

export const NOT_FOUND_SEO = {
  title: `Page Not Found (404) – ${COMPANY_INFO.name}`,
  description: `The requested page was not found on ${COMPANY_INFO.name}. Explore 100% natural Myanmar Bamboo Split, Bamboo Sticks, Activated Carbon, and One-Stop Offset Printing Services.`,
  robots: 'noindex, nofollow',
  ogImage: `${COMPANY_INFO.canonicalBase}${COMPANY_INFO.logoPath}`,
  ogImageAlt: `${COMPANY_INFO.name} Official Logo`,
};

export const INDEXABLE_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export function resolveInquiryFromSearch(
  searchOrUrl: string
): InquiryTypeOption | null {
  if (!searchOrUrl) return null;
  const queryPart = searchOrUrl.includes('?')
    ? searchOrUrl.slice(searchOrUrl.indexOf('?'))
    : searchOrUrl;
  const cleanQuery = queryPart.split('#')[0];
  const params = new URLSearchParams(cleanQuery);
  let rawInq = params.get('inquiry');
  if (!rawInq) return null;

  try {
    if (rawInq.includes('%')) {
      rawInq = decodeURIComponent(rawInq);
    }
  } catch {
    // Keep original decoded param if malformed percent encoding
  }

  const normalizedInq = rawInq.replace(/\s+/g, ' ').trim().toLowerCase();
  const matched = INQUIRY_TYPE_OPTIONS.find(
    (opt) => opt.toLowerCase() === normalizedInq
  );
  return matched ?? null;
}

export function resolveRouteState(pathnameOrUrl: string): {
  route: PageRoute;
  isNotFound: boolean;
} {
  let cleanPath = (pathnameOrUrl || '/').trim();
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    try {
      cleanPath = new URL(cleanPath).pathname;
    } catch {
      cleanPath = '/';
    }
  }
  cleanPath = cleanPath.split('?')[0].split('#')[0] || '/';
  const normalized = cleanPath.replace(/\/+$/, '') || '/';
  if (normalized === '/charcoal') {
    return { route: '/activated-carbon', isNotFound: false };
  }
  if (VALID_ROUTES.includes(normalized as PageRoute)) {
    return { route: normalized as PageRoute, isNotFound: false };
  }
  return { route: '/', isNotFound: true };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface RouteSeoPayload {
  route: PageRoute;
  isKnownRoute: boolean;
  statusCode: number;
  title: string;
  description: string;
  robots: string;
  canonicalUrl: string;
  ogImage: string;
  ogImageAlt: string;
  jsonLd: Record<string, unknown>;
}

export function getRouteSeoPayload(pathnameOrUrl: string): RouteSeoPayload {
  const { route, isNotFound } = resolveRouteState(pathnameOrUrl);
  const isKnownRoute = !isNotFound;
  const seo = PAGE_SEO[route] || PAGE_SEO['/'];

  const title = isKnownRoute ? seo.title : NOT_FOUND_SEO.title;
  const description = isKnownRoute
    ? seo.description
    : NOT_FOUND_SEO.description;
  const robots = isKnownRoute ? INDEXABLE_ROBOTS : NOT_FOUND_SEO.robots;
  const canonicalUrl = isKnownRoute ? seo.canonicalUrl : '';
  const ogImage = isKnownRoute ? seo.ogImage : NOT_FOUND_SEO.ogImage;
  const ogImageAlt = isKnownRoute ? seo.ogImageAlt : NOT_FOUND_SEO.ogImageAlt;

  const fullStructuredData = buildStructuredData(route);
  const jsonLd = isKnownRoute
    ? fullStructuredData
    : {
        '@context': 'https://schema.org',
        '@graph': fullStructuredData['@graph'].slice(0, 3),
      };

  return {
    route,
    isKnownRoute,
    statusCode: isKnownRoute ? 200 : 404,
    title,
    description,
    robots,
    canonicalUrl,
    ogImage,
    ogImageAlt,
    jsonLd,
  };
}

export function injectRouteSeoAndHtml(
  templateHtml: string,
  pathname: string,
  renderedAppHtml?: string
): {
  html: string;
  statusCode: number;
  isKnownRoute: boolean;
  route: PageRoute;
} {
  const payload = getRouteSeoPayload(pathname);
  let output = templateHtml;

  output = output.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(payload.title)}</title>`
  );

  output = output.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(payload.description)}" />`
  );

  output = output.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${escapeHtml(payload.robots)}" />`
  );

  output = output.replace(
    /\s*<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    payload.isKnownRoute
      ? `\n    <link rel="canonical" href="${escapeHtml(payload.canonicalUrl)}" />`
      : ''
  );

  output = output.replace(
    /\s*<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    payload.isKnownRoute
      ? `\n    <meta property="og:url" content="${escapeHtml(payload.canonicalUrl)}" />`
      : ''
  );

  output = output.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(payload.title)}" />`
  );

  output = output.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(payload.description)}" />`
  );

  output = output.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(payload.ogImage)}" />`
  );

  output = output.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:alt" content="${escapeHtml(payload.ogImageAlt)}" />`
  );

  output = output.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(payload.title)}" />`
  );

  output = output.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(payload.description)}" />`
  );

  output = output.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(payload.ogImage)}" />`
  );

  output = output.replace(
    /<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image:alt" content="${escapeHtml(payload.ogImageAlt)}" />`
  );

  const jsonLdString = JSON.stringify(payload.jsonLd, null, 2);
  output = output.replace(
    /<script id="structured-data-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="structured-data-jsonld" type="application/ld+json">\n${jsonLdString}\n    </script>`
  );

  if (renderedAppHtml !== undefined) {
    output = output.replace(
      /<div id="root"><\/div>/i,
      `<div id="root">${renderedAppHtml}</div>`
    );
  }

  return {
    html: output,
    statusCode: payload.statusCode,
    isKnownRoute: payload.isKnownRoute,
    route: payload.route,
  };
}
