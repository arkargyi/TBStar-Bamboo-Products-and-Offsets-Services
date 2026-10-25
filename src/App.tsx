/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  INQUIRY_TYPE_OPTIONS,
  InquiryTypeOption,
  PAGE_SEO,
  PageRoute,
} from './data/companyData';
import { LanguageProvider } from './context/LanguageContext';
import { SiteHeader, SiteFooter } from './components/SiteLayout';
import { InquiryModal } from './components/InquiryModal';
import { ProposalBlueprintDrawer } from './components/ProposalBlueprintDrawer';
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

function resolveRouteFromPathname(pathname: string): PageRoute {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (VALID_ROUTES.includes(normalized as PageRoute)) {
    return normalized as PageRoute;
  }
  return '/';
}

function resolveInquiryFromSearch(search: string): InquiryTypeOption | null {
  const params = new URLSearchParams(search);
  const inq = params.get('inquiry');
  if (inq && INQUIRY_TYPE_OPTIONS.includes(inq as InquiryTypeOption)) {
    return inq as InquiryTypeOption;
  }
  return null;
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    resolveRouteFromPathname(window.location.pathname)
  );
  const [selectedInquiryType, setSelectedInquiryType] = useState<InquiryTypeOption>(
    () => resolveInquiryFromSearch(window.location.search) || 'Bamboo Split'
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [showArchitectureReport, setShowArchitectureReport] = useState(false);

  // Sync page-level SEO title, meta description, and OpenGraph tags
  useEffect(() => {
    const seo = PAGE_SEO[currentRoute] || PAGE_SEO['/'];
    document.title = seo.title;

    const setMetaContent = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    setMetaContent('meta[name="description"]', seo.description);
    setMetaContent('meta[property="og:title"]', seo.title);
    setMetaContent('meta[property="og:description"]', seo.description);
    setMetaContent('meta[name="twitter:title"]', seo.title);
    setMetaContent('meta[name="twitter:description"]', seo.description);
  }, [currentRoute]);

  // Listen to browser Back / Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(resolveRouteFromPathname(window.location.pathname));
      const inq = resolveInquiryFromSearch(window.location.search);
      if (inq) {
        setSelectedInquiryType(inq);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((route: PageRoute, inquiryParam?: InquiryTypeOption) => {
    setShowArchitectureReport(false);
    setCurrentRoute(route);

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
          {showArchitectureReport ? (
            <ProposalBlueprintDrawer
              onSwitchToPrototype={() => {
                setShowArchitectureReport(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
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
          onToggleArchitectureReport={() => {
            setShowArchitectureReport((prev) => !prev);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          showingArchitectureReport={showArchitectureReport}
        />

        {/* Optional Quick Inquiry Modal */}
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
