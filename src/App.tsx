/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
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
} from './data/companyData';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SiteHeader, SiteFooter, NAV_ITEMS } from './components/SiteLayout';
import { InquiryModal } from './components/InquiryModal';
import { BackToTopButton, Button } from './components/SharedUI';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BambooProductsPage } from './pages/BambooProductsPage';
import { CharcoalPage } from './pages/CharcoalPage';
import { PrintingServicesPage } from './pages/PrintingServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

export const VALID_ROUTES: PageRoute[] = [
  '/',
  '/about',
  '/bamboo-products',
  '/charcoal',
  '/printing-services',
  '/gallery',
  '/contact',
];

function resolveRouteState(pathname: string): {
  route: PageRoute;
  isNotFound: boolean;
} {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized === '/activated-carbon') {
    return { route: '/charcoal', isNotFound: false };
  }
  if (VALID_ROUTES.includes(normalized as PageRoute)) {
    return { route: normalized as PageRoute, isNotFound: false };
  }
  return { route: '/', isNotFound: true };
}

function resolveInquiryFromSearch(search: string): InquiryTypeOption | null {
  const params = new URLSearchParams(search);
  const inq = params.get('inquiry');
  if (inq === 'Charcoal') {
    return 'Activated Carbon';
  }
  if (inq && INQUIRY_TYPE_OPTIONS.includes(inq as InquiryTypeOption)) {
    return inq as InquiryTypeOption;
  }
  return null;
}

export function buildStructuredData(route: PageRoute) {
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

const NotFoundView: React.FC<{ onNavigate: (route: PageRoute) => void }> = ({
  onNavigate,
}) => {
  const { isMm, t } = useLanguage();
  const attemptedPath =
    typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <section
      aria-labelledby="not-found-heading"
      className="py-20 md:py-28 bg-[#F6F8F3] border-b border-[#DDE5D9]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white border border-[#DDE5D9] text-xs font-mono-tabular font-bold text-[#245C3A] uppercase mb-4">
          <span>404 · {t('Page Not Found', 'စာမျက်နှာ မတွေ့ရှိပါ')}</span>
        </div>

        <h1
          id="not-found-heading"
          className="text-3xl sm:text-4xl font-extrabold text-[#173D2A] mb-4"
        >
          {t(
            'The Requested Page Could Not Be Found',
            'သင်ရှာဖွေသော စာမျက်နှာကို မတွေ့ရှိပါ'
          )}
        </h1>

        {attemptedPath && attemptedPath !== '/' && (
          <p className="text-xs font-mono-tabular text-[#245C3A] bg-white border border-[#DDE5D9] rounded-md px-3 py-1.5 inline-block mb-4">
            {t('Requested URL:', 'ဝင်ရောက်ခဲ့သော လမ်းကြောင်း -')} {attemptedPath}
          </p>
        )}

        <p className="text-sm sm:text-base text-[#26332B]/85 leading-relaxed mb-8">
          {t(
            'The URL you visited may have been moved or does not exist. Return to our Home page or explore TB Star Company Limited’s bamboo products, offset printing services, and contact details below:',
            'သင်ဝင်ရောက်သော လင့်ခ်မှာ ပြောင်းလဲသွားခြင်း သို့မဟုတ် မရှိခြင်း ဖြစ်နိုင်ပါသည်။ ပင်မစာမျက်နှာသို့ ပြန်သွားနိုင်သလို အောက်ပါ စာမျက်နှာများမှတစ်ဆင့် ဝါးထုတ်ကုန်များနှင့် ပုံနှိပ်ဝန်ဆောင်မှုများကို ဆက်လက်ကြည့်ရှုနိုင်ပါသည် -'
          )}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Button
            type="button"
            variant="primary-dark"
            href="/"
            onClick={() => onNavigate('/')}
          >
            {t('Return to Home Page', 'ပင်မစာမျက်နှာသို့ ပြန်သွားရန်')}
          </Button>
          <Button
            type="button"
            variant="outline-dark"
            href="/contact"
            onClick={() => onNavigate('/contact')}
          >
            {t('Contact Our Office', 'ရုံးသို့ ဆက်သွယ်ရန်')}
          </Button>
        </div>

        <div className="pt-6 border-t border-[#DDE5D9]">
          <p className="text-xs font-semibold text-[#245C3A] uppercase tracking-wider mb-3">
            {t('Available Website Pages', 'ဝင်ရောက်ကြည့်ရှုနိုင်သော စာမျက်နှာများ')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.route}
                href={item.route}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.route);
                }}
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#173D2A] text-[#173D2A] hover:text-white border border-[#DDE5D9] text-xs font-semibold transition-colors"
              >
                {isMm ? item.labelMm : item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [routeState, setRouteState] = useState<{
    route: PageRoute;
    isNotFound: boolean;
  }>(() => resolveRouteState(window.location.pathname));

  const currentRoute = routeState.route;
  const isNotFound = routeState.isNotFound;

  const [selectedInquiryType, setSelectedInquiryType] = useState<InquiryTypeOption>(
    () => resolveInquiryFromSearch(window.location.search) || 'Bamboo Split'
  );
  const [modalOpen, setModalOpen] = useState(false);

  // Sync page-level SEO title, meta description, canonical URL, robots, OpenGraph, and JSON-LD
  useEffect(() => {
    const seo = PAGE_SEO[currentRoute] || PAGE_SEO['/'];
    const title = isNotFound
      ? `Page Not Found (404) – ${COMPANY_INFO.name}`
      : seo.title;
    const description = isNotFound
      ? `The requested page was not found on ${COMPANY_INFO.name}. Explore 100% natural Myanmar Bamboo Split, Bamboo Sticks, and One-Stop Offset Printing Services.`
      : seo.description;

    // Normalize trailing slashes or /activated-carbon alias in browser URL so URL matches canonical
    if (
      !isNotFound &&
      window.location.pathname !== currentRoute &&
      (window.location.pathname.endsWith('/') ||
        window.location.pathname.replace(/\/+$/, '') === '/activated-carbon')
    ) {
      try {
        window.history.replaceState(
          {},
          '',
          `${currentRoute}${window.location.search}${window.location.hash}`
        );
      } catch {
        // Ignore if history replaceState is restricted in sandboxed frame
      }
    }

    const effectiveCanonicalUrl = isNotFound
      ? `${COMPANY_INFO.canonicalBase}${window.location.pathname}`
      : seo.canonicalUrl;

    document.title = title;

    const setMetaContent = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    setMetaContent('meta[name="description"]', description);
    setMetaContent(
      'meta[name="robots"]',
      isNotFound
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', effectiveCanonicalUrl);
    setMetaContent('meta[property="og:image"]', seo.ogImage);
    setMetaContent('meta[property="og:image:alt"]', seo.ogImageAlt);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
    setMetaContent('meta[name="twitter:image"]', seo.ogImage);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', effectiveCanonicalUrl);
    }

    const jsonLdEl = document.getElementById('structured-data-jsonld');
    if (jsonLdEl && !isNotFound) {
      jsonLdEl.textContent = JSON.stringify(buildStructuredData(currentRoute));
    }
  }, [currentRoute, isNotFound]);

  // Listen to browser Back / Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setRouteState(resolveRouteState(window.location.pathname));
      const inq = resolveInquiryFromSearch(window.location.search);
      if (inq) {
        setSelectedInquiryType(inq);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((route: PageRoute, inquiryParam?: InquiryTypeOption) => {
    setRouteState({ route, isNotFound: false });

    const url =
      inquiryParam && route === '/contact'
        ? `${route}?inquiry=${encodeURIComponent(inquiryParam)}`
        : route;

    try {
      window.history.pushState({}, '', url);
    } catch {
      // Fallback if history pushState is restricted in sandboxed frame
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleInquireWithCategory = useCallback(
    (type: InquiryTypeOption, navigateToContact = true) => {
      setSelectedInquiryType(type);
      if (navigateToContact) {
        handleNavigate('/contact', type);
      } else {
        setModalOpen(true);
      }
    },
    [handleNavigate]
  );

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#F6F8F3] text-[#26332B]">
        {/* Skip to Main Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#173D2A] focus:text-white focus:rounded-lg focus:text-xs focus:font-semibold"
        >
          Skip to main content
        </a>

        {/* Shared SiteHeader across all 6 pages */}
        <SiteHeader
          currentRoute={currentRoute}
          isNotFound={isNotFound}
          onNavigate={handleNavigate}
          onOpenInquiry={() => handleInquireWithCategory(selectedInquiryType, true)}
        />

        {/* Main Content Area */}
        <main id="main-content" className="flex-grow" tabIndex={-1}>
          {isNotFound ? (
            <NotFoundView onNavigate={handleNavigate} />
          ) : (
            <>
              {currentRoute === '/' && (
                <HomePage
                  onNavigate={handleNavigate}
                  onInquireWithCategory={handleInquireWithCategory}
                />
              )}
              {currentRoute === '/about' && (
                <AboutPage
                  onNavigate={handleNavigate}
                  onInquireWithCategory={handleInquireWithCategory}
                />
              )}
              {currentRoute === '/bamboo-products' && (
                <BambooProductsPage
                  onNavigate={handleNavigate}
                  onInquireWithCategory={handleInquireWithCategory}
                />
              )}
              {currentRoute === '/charcoal' && (
                <CharcoalPage
                  onNavigate={handleNavigate}
                  onInquireWithCategory={handleInquireWithCategory}
                />
              )}
              {currentRoute === '/printing-services' && (
                <PrintingServicesPage
                  onNavigate={handleNavigate}
                  onInquireWithCategory={handleInquireWithCategory}
                />
              )}
              {currentRoute === '/gallery' && (
                <GalleryPage
                  onNavigate={handleNavigate}
                  onInquireWithCategory={handleInquireWithCategory}
                />
              )}
              {currentRoute === '/contact' && (
                <ContactPage
                  onNavigate={handleNavigate}
                  selectedInquiryType={selectedInquiryType}
                  onSelectInquiryType={setSelectedInquiryType}
                />
              )}
            </>
          )}
        </main>

        {/* Shared SiteFooter across all 6 pages */}
        <SiteFooter
          currentRoute={currentRoute}
          isNotFound={isNotFound}
          onNavigate={handleNavigate}
          onInquireWithCategory={handleInquireWithCategory}
        />

        {/* Floating Back to Top Button */}
        <BackToTopButton />

        {/* Quick Inquiry Modal */}
        <InquiryModal
          isOpen={modalOpen}
          defaultInquiryType={selectedInquiryType}
          onSelectInquiryType={setSelectedInquiryType}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </LanguageProvider>
  );
}
