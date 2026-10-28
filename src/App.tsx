/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  BAMBOO_PRODUCTS,
  COMPANY_INFO,
  INQUIRY_TYPE_OPTIONS,
  InquiryTypeOption,
  PAGE_SEO,
  PageRoute,
} from './data/companyData';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SiteHeader, SiteFooter, NAV_ITEMS } from './components/SiteLayout';
import { InquiryModal } from './components/InquiryModal';
import { BackToTopButton } from './components/SharedUI';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BambooProductsPage } from './pages/BambooProductsPage';
import { PrintingServicesPage } from './pages/PrintingServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

const VALID_ROUTES: PageRoute[] = [
  '/',
  '/about',
  '/bamboo-products',
  '/printing-services',
  '/gallery',
  '/contact',
];

function resolveRouteState(pathname: string): {
  route: PageRoute;
  isNotFound: boolean;
} {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (VALID_ROUTES.includes(normalized as PageRoute)) {
    return { route: normalized as PageRoute, isNotFound: false };
  }
  return { route: '/', isNotFound: true };
}

function resolveInquiryFromSearch(search: string): InquiryTypeOption | null {
  const params = new URLSearchParams(search);
  const inq = params.get('inquiry');
  if (inq && INQUIRY_TYPE_OPTIONS.includes(inq as InquiryTypeOption)) {
    return inq as InquiryTypeOption;
  }
  return null;
}

function buildStructuredData(route: PageRoute) {
  const seo = PAGE_SEO[route] || PAGE_SEO['/'];
  const baseUrl = COMPANY_INFO.canonicalBase;

  const organizationNode = {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: COMPANY_INFO.name,
    alternateName: COMPANY_INFO.nameMm,
    url: `${baseUrl}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}${COMPANY_INFO.logoPath}`,
    },
    image: `${baseUrl}/images/products/bamboo-split-main.webp`,
    description:
      'TB Star Company Limited manufactures 100% natural Myanmar bamboo products (Bamboo Split and Bamboo Sticks) for domestic distribution and international export markets, and provides one-stop offset printing services in Yangon, Myanmar.',
    telephone: COMPANY_INFO.telephone,
    email: COMPANY_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Room No. 1103, 11th Floor, Central Tower, Corner of 39th Street and Anawrahta Road, Kyauktada Township',
      addressLocality: 'Yangon',
      addressCountry: 'MM',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: COMPANY_INFO.telephone,
        email: COMPANY_INFO.email,
        contactType: 'sales',
        areaServed: ['MM', 'IN', 'PK'],
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
      : route === '/gallery' || route === '/bamboo-products'
      ? 'CollectionPage'
      : 'WebPage';

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
    inLanguage: 'en',
  };

  const graph: Record<string, unknown>[] = [
    organizationNode,
    websiteNode,
    webPageNode,
  ];

  if (seo.breadcrumbs.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${seo.canonicalUrl}#breadcrumb`,
      itemListElement: seo.breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    });
  }

  if (route === '/bamboo-products') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${seo.canonicalUrl}#product-list`,
      name: 'TB Star Company Limited Natural Myanmar Bamboo Products',
      itemListElement: BAMBOO_PRODUCTS.slice(0, 2).map((prod, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Product',
          '@id': `${seo.canonicalUrl}#${prod.id}`,
          name: prod.name,
          description: prod.detailedDescription,
          image: prod.imagePath
            ? `${baseUrl}${prod.imagePath}`
            : `${baseUrl}/images/products/bamboo-split-main.webp`,
          brand: {
            '@type': 'Brand',
            name: COMPANY_INFO.name,
          },
          manufacturer: {
            '@id': `${baseUrl}/#organization`,
          },
          material: '100% Natural Bamboo',
          countryOfOrigin: {
            '@type': 'Country',
            name: 'Myanmar',
          },
        },
      })),
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

  return (
    <section className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-mono-tabular font-bold text-[#245C3A] uppercase mb-2">
          404 · {t('Page Not Found', 'စာမျက်နှာ မတွေ့ရှိပါ')}
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173D2A] mb-4">
          {t(
            'The Requested Page Could Not Be Found',
            'သင်ရှာဖွေသော စာမျက်နှာကို မတွေ့ရှိပါ'
          )}
        </h1>
        <p className="text-sm sm:text-base text-[#26332B]/85 leading-relaxed mb-8">
          {t(
            'The URL you visited may have been moved or does not exist. Explore TB Star Company Limited’s bamboo products, offset printing services, or contact details below:',
            'သင်ဝင်ရောက်သော လင့်ခ်မှာ ပြောင်းလဲသွားခြင်း သို့မဟုတ် မရှိခြင်း ဖြစ်နိုင်ပါသည်။ အောက်ပါ စာမျက်နှာများမှတစ်ဆင့် ဝါးထုတ်ကုန်များနှင့် ပုံနှိပ်ဝန်ဆောင်မှုများကို ဆက်လက်ကြည့်ရှုနိုင်ပါသည် -'
          )}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.route}
              href={item.route}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.route);
              }}
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#173D2A] text-[#173D2A] hover:text-white border border-[#DDE5D9] text-xs sm:text-sm font-semibold transition-colors"
            >
              {isMm ? item.labelMm : item.label}
            </a>
          ))}
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
    setMetaContent('meta[property="og:url"]', seo.canonicalUrl);
    setMetaContent('meta[property="og:image"]', seo.ogImage);
    setMetaContent('meta[property="og:image:alt"]', seo.ogImageAlt);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
    setMetaContent('meta[name="twitter:image"]', seo.ogImage);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', seo.canonicalUrl);
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
