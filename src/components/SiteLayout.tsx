import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowRight, Globe, Mail, MapPin, Menu, Phone, Search, X } from 'lucide-react';
import {
  COMPANY_INFO,
  filterPrintingServicesBySearchQuery,
  filterProductsBySearchQuery,
  getProductsByCategory,
  getPublishedPrintingServices,
  getPublishedProducts,
  InquiryTypeOption,
  PageRoute,
} from '../constants/companyData';
import { useLanguage } from '../context/LanguageContext';
import { AnimatedHeading } from './AnimatedHeading';
import { BambooProductIcon, PrintingServiceIcon } from './PrintingIcons';

export type SiteSearchFilterCategory = 'all' | 'bamboo' | 'activated-carbon' | 'printing-stationery';

export interface SiteSearchResultItem {
  id: string;
  kind: 'product' | 'service';
  title: string;
  titleMm: string;
  categoryLabel: string;
  categoryLabelMm: string;
  filterGroup: Exclude<SiteSearchFilterCategory, 'all'>;
  summary: string;
  summaryMm: string;
  specHighlight: string;
  specHighlightMm: string;
  route: PageRoute;
  sectionId: string;
  inquiryType: InquiryTypeOption;
  visualType:
    | 'bamboo-split'
    | 'bamboo-sticks'
    | 'bamboo-custom'
    | 'activated-carbon'
    | 'books-printing'
    | 'voucher-printing'
    | 'commercial-printing';
}

const HEADER_QUICK_SUGGESTIONS: Array<{
  label: string;
  labelMm: string;
  query: string;
}> = [
  { label: 'Bamboo Split (3 mm)', labelMm: 'ဝါးခြမ်းပြား (3 mm)', query: 'Bamboo Split' },
  { label: 'Bamboo Sticks (30 Bundles/Bag)', labelMm: 'ဝါးတံ (၃၀ စည်း/အိတ်)', query: 'Bamboo Sticks' },
  { label: 'Nut Shell Carbon', labelMm: 'ဇီးစေ့ခွံ ကာဗွန်', query: 'Nut Shell' },
  { label: 'Coconut Shell (25 Kg)', labelMm: 'အုန်းမှုတ်ခွံ (25 Kg)', query: 'Coconut Shell' },
  { label: 'Books Printing', labelMm: 'စာအုပ်ပုံနှိပ်', query: 'Books Printing' },
  { label: 'Voucher Books', labelMm: 'ဘောင်ချာစာအုပ်', query: 'Voucher' },
  { label: 'Ball Pen (Klick / Plano)', labelMm: 'ဘောပင် (Klick / Plano)', query: 'Ball Pen' },
];

export const NAV_ITEMS: { label: string; labelMm: string; route: PageRoute }[] = [
  { label: 'Home', labelMm: 'ပင်မစာမျက်နှာ', route: '/' },
  { label: 'About Us', labelMm: 'ကုမ္ပဏီအကြောင်း', route: '/about' },
  { label: 'Bamboo Products', labelMm: 'ဝါးထုတ်ကုန်များ', route: '/bamboo-products' },
  { label: 'Activated Carbon', labelMm: 'အက်တီဗိတ်တက် ကာဗွန်', route: '/activated-carbon' },
  { label: 'Printing Services', labelMm: 'ပုံနှိပ်နှင့် စာရေးကိရိယာ', route: '/printing-services' },
  { label: 'Gallery', labelMm: 'ဓာတ်ပုံပြခန်း', route: '/gallery' },
  { label: 'Contact Us', labelMm: 'ဆက်သွယ်ရန်', route: '/contact' },
];

export interface LanguageToggleSwitchProps {
  className?: string;
  compact?: boolean;
  variant?: 'light' | 'dark';
}

export const LanguageToggleSwitch: React.FC<LanguageToggleSwitchProps> = ({
  className = '',
  compact = false,
  variant = 'light',
}) => {
  const { lang, isMm, setLang, toggleLang, t } = useLanguage();

  const handleSegmentClick = (targetLang: 'en' | 'mm', e: React.MouseEvent) => {
    e.stopPropagation();
    if (lang === targetLang) {
      toggleLang();
    } else {
      setLang(targetLang);
    }
  };

  const isDark = variant === 'dark';

  return (
    <div
      role="switch"
      aria-checked={isMm}
      tabIndex={0}
      aria-label={t(
        'Language toggle switch: Currently English. Click to switch to Burmese (မြန်မာ).',
        'ဘာသာစကား ပြောင်းလဲရန် ခလုတ် - လက်ရှိ မြန်မာဘာသာ။ English သို့ ပြောင်းရန် နှိပ်ပါ။'
      )}
      title={t(
        'Switch site language between English and Burmese (မြန်မာ)',
        'English နှင့် မြန်မာဘာသာစကား အပြန်အလှန် ပြောင်းလဲရန်'
      )}
      onClick={toggleLang}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleLang();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setLang('en');
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setLang('mm');
        }
      }}
      className={`group relative inline-flex items-center rounded-full p-0.5 shrink-0 cursor-pointer select-none transition-all duration-200 ${
        isDark
          ? 'bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-[#A8D977]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8D977]'
          : 'bg-[#F6F8F3] hover:bg-[#EDF3E8] border border-[#DDE5D9] hover:border-[#245C3A]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173D2A]'
      } ${className}`}
    >
      <span
        className={`inline-flex items-center justify-center shrink-0 ${
          isDark ? 'text-[#A8D977]' : 'text-[#245C3A]'
        } ${compact ? 'pl-2 pr-1' : 'pl-2.5 pr-1.5'}`}
        aria-hidden="true"
      >
        <Globe className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
      </span>

      {/* Interactive Sliding Toggle Track */}
      <div
        className={`relative grid grid-cols-2 items-center rounded-full p-0.5 ${
          isDark
            ? 'bg-black/25 min-w-[108px] sm:min-w-[116px]'
            : 'bg-white/90 border border-[#DDE5D9]/80 min-w-[116px] sm:min-w-[124px]'
        }`}
      >
        {/* Sliding Thumb Indicator */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full shadow-xs transition-transform duration-200 ease-out ${
            isDark ? 'bg-[#A8D977]' : 'bg-[#173D2A]'
          } ${isMm ? 'translate-x-full' : 'translate-x-0'}`}
        />

        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => handleSegmentClick('en', e)}
          className={`relative z-10 px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-colors duration-200 cursor-pointer text-center whitespace-nowrap flex items-center justify-center ${
            !isMm
              ? isDark
                ? 'text-[#112E1F]'
                : 'text-white'
              : isDark
              ? 'text-white/75 hover:text-white'
              : 'text-[#26332B]/75 hover:text-[#173D2A]'
          }`}
        >
          <span>EN</span>
        </button>

        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => handleSegmentClick('mm', e)}
          className={`relative z-10 px-2.5 py-0.5 text-[11px] font-bold font-myanmar leading-tight rounded-full transition-colors duration-200 cursor-pointer text-center whitespace-nowrap flex items-center justify-center ${
            isMm
              ? isDark
                ? 'text-[#112E1F]'
                : 'text-white'
              : isDark
              ? 'text-white/75 hover:text-white'
              : 'text-[#26332B]/75 hover:text-[#173D2A]'
          }`}
        >
          <span>မြန်မာ</span>
        </button>
      </div>
    </div>
  );
};

export const LanguageSwitchButton = LanguageToggleSwitch;

interface DesktopNavigationProps {
  currentRoute: PageRoute;
  isNotFound?: boolean;
  onNavigate: (route: PageRoute) => void;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  currentRoute,
  isNotFound = false,
  onNavigate,
}) => {
  const { isMm } = useLanguage();

  return (
    <nav
      aria-label="Primary Navigation"
      className="hidden lg:flex items-center gap-3 xl:gap-5 text-sm font-medium text-[#26332B]"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = !isNotFound && currentRoute === item.route;
        return (
          <a
            key={item.route}
            href={item.route}
            aria-current={isActive ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.route);
            }}
            className={`py-2 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              isMm ? 'font-myanmar text-xs xl:text-[13px]' : 'text-xs xl:text-sm'
            } ${
              isActive
                ? 'border-[#173D2A] text-[#173D2A] font-bold'
                : 'border-transparent text-[#26332B] hover:text-[#245C3A] hover:border-[#A8D977]'
            }`}
          >
            {isMm ? item.labelMm : item.label}
          </a>
        );
      })}
    </nav>
  );
};

interface MobileNavigationProps {
  isOpen: boolean;
  currentRoute: PageRoute;
  isNotFound?: boolean;
  onNavigate: (route: PageRoute) => void;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  currentRoute,
  isNotFound = false,
  onNavigate,
  onClose,
  onOpenInquiry,
}) => {
  const { isMm, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white border-b border-[#DDE5D9] px-4 pt-3 pb-5 space-y-2 shadow-lg">
      <div className="flex items-center justify-between pb-3 mb-1 border-b border-[#DDE5D9]">
        <div>
          <span className="text-xs font-semibold text-[#173D2A] block">
            {t('Site Language', 'ဘာသာစကား ရွေးချယ်ရန်')}
          </span>
          <span className="text-[11px] text-[#245C3A] block">
            {t('Currently viewing in English', 'လက်ရှိ မြန်မာဘာသာဖြင့် ကြည့်ရှုနေပါသည်')}
          </span>
        </div>
        <LanguageToggleSwitch compact />
      </div>

      <nav aria-label="Mobile Primary Navigation" className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = !isNotFound && currentRoute === item.route;
          return (
            <a
              key={item.route}
              href={item.route}
              aria-current={isActive ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                onClose();
                onNavigate(item.route);
              }}
              className={`block w-full text-left px-3.5 py-2.5 rounded-lg text-sm transition-colors ${
                isMm ? 'font-myanmar' : ''
              } ${
                isActive
                  ? 'bg-[#173D2A] text-white font-semibold'
                  : 'text-[#26332B] font-medium hover:bg-[#F6F8F3] hover:text-[#173D2A]'
              }`}
            >
              {isMm ? item.labelMm : item.label}
            </a>
          );
        })}
      </nav>

      <div className="pt-3 mt-2 border-t border-[#DDE5D9] flex flex-col gap-2">
        <a
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            onClose();
            onOpenInquiry();
          }}
          className="w-full py-2.5 px-4 bg-[#173D2A] text-white text-sm font-semibold rounded-lg text-center cursor-pointer block"
        >
          {t('Request Inquiry', 'ဆက်သွယ်မေးမြန်းရန်')}
        </a>
        <a
          href={COMPANY_INFO.telephoneHref}
          className="w-full py-2.5 px-4 bg-[#A8D977] text-[#173D2A] text-sm font-semibold rounded-lg text-center"
        >
          {t(`Call ${COMPANY_INFO.telephone}`, `ဖုန်းခေါ်ဆိုရန် ${COMPANY_INFO.telephone}`)}
        </a>
        <a
          href={COMPANY_INFO.emailHref}
          className="w-full py-2.5 px-4 bg-[#F6F8F3] hover:bg-[#EAF5E4] text-[#173D2A] border border-[#DDE5D9] text-sm font-semibold rounded-lg text-center inline-flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4 text-[#245C3A]" />
          <span>{COMPANY_INFO.email}</span>
        </a>
      </div>
    </div>
  );
};

interface SiteHeaderProps {
  currentRoute: PageRoute;
  isNotFound?: boolean;
  onNavigate: (route: PageRoute) => void;
  onOpenInquiry: () => void;
  onInquireWithCategory?: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentRoute,
  isNotFound = false,
  onNavigate,
  onOpenInquiry,
  onInquireWithCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<SiteSearchFilterCategory>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const { isMm, t } = useLanguage();

  // Search across all published products and printing services in real time
  const searchResults = useMemo<SiteSearchResultItem[]>(() => {
    const allProducts = getPublishedProducts();
    const allServices = getPublishedPrintingServices();

    const matchedProducts = filterProductsBySearchQuery(allProducts, searchQuery, 'all');
    const matchedServices = filterPrintingServicesBySearchQuery(allServices, searchQuery);

    const productItems: SiteSearchResultItem[] = matchedProducts.map((p) => {
      const filterGroup: Exclude<SiteSearchFilterCategory, 'all'> =
        p.categoryKey === 'bamboo'
          ? 'bamboo'
          : p.categoryKey === 'activated-carbon'
          ? 'activated-carbon'
          : 'printing-stationery';

      const categoryLabel =
        p.categoryKey === 'bamboo'
          ? 'Bamboo Products'
          : p.categoryKey === 'activated-carbon'
          ? 'Activated Carbon'
          : 'Stationery';
      const categoryLabelMm =
        p.categoryKey === 'bamboo'
          ? 'ဝါးထုတ်ကုန်များ'
          : p.categoryKey === 'activated-carbon'
          ? 'အက်တီဗိတ်တက် ကာဗွန်'
          : 'စာရေးကိရိယာ';

      const specHighlight = (p.specifications || [])
        .slice(0, 3)
        .map((s) => `${s.parameter}: ${s.value}`)
        .join(' · ');
      const specHighlightMm = (p.specifications || [])
        .slice(0, 3)
        .map((s) => `${s.parameterMm || s.parameter}: ${s.valueMm || s.value}`)
        .join(' · ');

      return {
        id: `product-${p.id}`,
        kind: 'product',
        title: p.name,
        titleMm: p.nameMm,
        categoryLabel,
        categoryLabelMm,
        filterGroup,
        summary: p.shortDescription,
        summaryMm: p.shortDescriptionMm,
        specHighlight: specHighlight || p.footerLabel,
        specHighlightMm: specHighlightMm || p.footerLabelMm,
        route: p.route,
        sectionId: p.sectionId,
        inquiryType: p.inquiryType,
        visualType: p.visualType,
      };
    });

    const serviceItems: SiteSearchResultItem[] = matchedServices.map((s) => ({
      id: `service-${s.id}`,
      kind: 'service',
      title: s.name,
      titleMm: s.nameMm,
      categoryLabel: 'Offset Printing',
      categoryLabelMm: 'အော့ဖ်ဆက် ပုံနှိပ်',
      filterGroup: 'printing-stationery',
      summary: s.shortDescription,
      summaryMm: s.shortDescriptionMm,
      specHighlight: (s.scopePoints || [])[0] || s.placeholderNote,
      specHighlightMm: (s.scopePointsMm || [])[0] || s.placeholderNoteMm || s.placeholderNote,
      route: '/printing-services',
      sectionId: s.sectionId || `service-${s.id}`,
      inquiryType: s.inquiryType,
      visualType: s.visualType,
    }));

    const combined = [...productItems, ...serviceItems];
    if (searchCategory === 'all') {
      return combined;
    }
    return combined.filter((item) => item.filterGroup === searchCategory);
  }, [searchQuery, searchCategory]);

  // Reset highlighted index when query or category changes
  useEffect(() => {
    setActiveIndex(searchResults.length > 0 && searchQuery.trim().length > 0 ? 0 : -1);
  }, [searchQuery, searchCategory, searchResults.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Global keyboard shortcut (`/` or `Ctrl+K` / `Cmd+K`) to focus header search
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isInputFocused =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => {
          if (window.innerWidth >= 768) {
            desktopInputRef.current?.focus();
          } else {
            mobileInputRef.current?.focus();
          }
        }, 20);
      } else if (!isInputFocused && event.key === '/') {
        event.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => {
          if (window.innerWidth >= 768) {
            desktopInputRef.current?.focus();
          } else {
            mobileInputRef.current?.focus();
          }
        }, 20);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleSelectSearchResult = (item: SiteSearchResultItem) => {
    setIsSearchOpen(false);
    setMobileMenuOpen(false);
    onNavigate(item.route);

    setTimeout(() => {
      const targetEl = document.getElementById(item.sectionId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleInquireResult = (
    item: SiteSearchResultItem,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setIsSearchOpen(false);
    setMobileMenuOpen(false);
    if (onInquireWithCategory) {
      onInquireWithCategory(item.inquiryType, false);
    } else {
      onOpenInquiry();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (searchQuery) {
        setSearchQuery('');
      } else {
        setIsSearchOpen(false);
        e.currentTarget.blur();
      }
      return;
    }

    if (!isSearchOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setIsSearchOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (searchResults.length > 0) {
        setActiveIndex((prev) => (prev + 1) % searchResults.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (searchResults.length > 0) {
        setActiveIndex((prev) => (prev <= 0 ? searchResults.length - 1 : prev - 1));
      }
    } else if (e.key === 'Enter' && searchResults.length > 0) {
      e.preventDefault();
      const targetItem = searchResults[activeIndex >= 0 ? activeIndex : 0];
      if (targetItem) {
        handleSelectSearchResult(targetItem);
      }
    }
  };

  const filterTabs: Array<{
    id: SiteSearchFilterCategory;
    label: string;
    labelMm: string;
  }> = [
    { id: 'all', label: 'All', labelMm: 'အားလုံး' },
    { id: 'bamboo', label: 'Bamboo', labelMm: 'ဝါးထုတ်ကုန်' },
    { id: 'activated-carbon', label: 'Activated Carbon', labelMm: 'ကာဗွန်' },
    { id: 'printing-stationery', label: 'Printing & Pens', labelMm: 'ပုံနှိပ်နှင့် ဘောပင်' },
  ];

  return (
    <header
      ref={searchContainerRef}
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DDE5D9]"
    >
      {/* Executive Corporate Top Utility Bar */}
      <div className="hidden md:block bg-[#112E1F] text-white/90 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[42px] py-1.5 flex items-center justify-between gap-4 text-xs">
          {/* Left Zone: Verified Office Location */}
          <div className="flex items-center gap-3.5 min-w-0 flex-1 overflow-hidden">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
              className="group inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors min-w-0 max-w-full overflow-hidden cursor-pointer"
              title={t(COMPANY_INFO.address.full, COMPANY_INFO.address.fullMm)}
            >
              <span className="relative z-10 w-5 h-5 rounded-full bg-[#112E1F] border border-[#A8D977]/30 flex items-center justify-center shrink-0 group-hover:bg-[#A8D977] group-hover:text-[#112E1F] text-[#A8D977] transition-colors shadow-[4px_0_8px_#112E1F]">
                <MapPin className="w-3 h-3" />
              </span>
              <span
                className={`animate-slide-ltr ${
                  isMm ? 'font-myanmar text-[11.5px] leading-relaxed' : 'text-xs font-medium'
                }`}
              >
                {t(
                  COMPANY_INFO.address.shortAddress,
                  COMPANY_INFO.address.shortAddressMm
                )}
              </span>
            </a>
          </div>

          {/* Right Zone: Direct Hotline, Email & Sleek Language Switcher */}
          <div className="flex items-center gap-3.5 shrink-0">
            <a
              href={COMPANY_INFO.emailHref}
              className="group inline-flex items-center gap-2 text-white/90 hover:text-[#A8D977] transition-colors"
              title={t(`Email ${COMPANY_INFO.email}`, `အီးမေးလ်ပို့ရန် ${COMPANY_INFO.email}`)}
            >
              <span className="w-5 h-5 rounded-full bg-[#A8D977]/15 border border-[#A8D977]/30 flex items-center justify-center shrink-0 group-hover:bg-[#A8D977] group-hover:text-[#112E1F] text-[#A8D977] transition-colors">
                <Mail className="w-3 h-3" />
              </span>
              <span className="font-mono-tabular font-semibold tracking-tight text-white group-hover:text-[#A8D977] transition-colors">
                {COMPANY_INFO.email}
              </span>
            </a>

            <span
              className="h-4 w-px bg-white/15 shrink-0"
              aria-hidden="true"
            />

            <a
              href={COMPANY_INFO.telephoneHref}
              className="group inline-flex items-center gap-2 text-white/90 hover:text-[#A8D977] transition-colors"
              title={t('Call our Yangon Head Office', 'ရန်ကုန်ရုံးချုပ်သို့ ဖုန်းခေါ်ဆိုရန်')}
            >
              <span className="w-5 h-5 rounded-full bg-[#A8D977]/15 border border-[#A8D977]/30 flex items-center justify-center shrink-0 group-hover:bg-[#A8D977] group-hover:text-[#112E1F] text-[#A8D977] transition-colors">
                <Phone className="w-3 h-3" />
              </span>
              <span className="font-mono-tabular font-bold tracking-tight text-white group-hover:text-[#A8D977] transition-colors">
                {COMPANY_INFO.telephone}
              </span>
            </a>

            <span
              className="h-4 w-px bg-white/15 shrink-0"
              aria-hidden="true"
            />

            <LanguageToggleSwitch variant="dark" compact />
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 xl:gap-4 relative">
        {/* Zone 1: Official TB Star Company Limited Logo + Brand Title */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            setIsSearchOpen(false);
            onNavigate('/');
          }}
          className="flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0 group"
        >
          <img
            src={COMPANY_INFO.logoPath}
            alt="TB Star Company Limited Official Logo"
            width={48}
            height={48}
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-10 w-10 sm:h-11 sm:w-11 xl:h-12 xl:w-12 object-contain shrink-0 rounded-full border border-[#DDE5D9] bg-white p-0.5"
          />
          <div className="min-w-0">
            <span
              className={`font-display text-sm sm:text-base xl:text-lg font-bold tracking-tight text-[#173D2A] group-hover:text-[#245C3A] transition-colors block whitespace-nowrap ${
                isMm ? 'font-myanmar' : ''
              }`}
            >
              {isMm ? 'TBStar Company Limited' : COMPANY_INFO.name}
            </span>
            <span className="text-[11px] text-[#245C3A] font-medium hidden sm:block">
              {t('Bamboo Export & Offset Printing', 'ဝါးပို့ကုန်နှင့် အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း')}
            </span>
          </div>
        </a>

        {/* Zone 2: Desktop Navigation */}
        <DesktopNavigation
          currentRoute={currentRoute}
          isNotFound={isNotFound}
          onNavigate={(route) => {
            setIsSearchOpen(false);
            onNavigate(route);
          }}
        />

        {/* Zone 3: Site-Wide Search Bar + Primary Action Button + Mobile Menu Button */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop Inline Site-Wide Search Input */}
          <div className="hidden md:block relative" role="search" aria-label={t('Site-wide product and service search', 'ဝဘ်ဆိုက်တစ်ခုလုံးရှိ ထုတ်ကုန်နှင့် ဝန်ဆောင်မှု ရှာဖွေရေး')}>
            <label htmlFor="site-header-search-desktop" className="sr-only">
              {t('Search products or services', 'ထုတ်ကုန် သို့မဟုတ် ဝန်ဆောင်မှု ရှာဖွေရန်')}
            </label>
            <Search
              className="w-4 h-4 text-[#245C3A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={desktopInputRef}
              id="site-header-search-desktop"
              type="search"
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder={t('Search products, specs...', 'ထုတ်ကုန်၊ စံချိန်စံညွှန်း ရှာရန်...')}
              aria-expanded={isSearchOpen}
              aria-controls="site-header-search-results"
              aria-autocomplete="list"
              className={`w-40 lg:w-44 xl:w-56 focus:w-56 lg:focus:w-60 xl:focus:w-72 pl-9 pr-8 py-2 bg-[#F6F8F3] hover:bg-[#EFF4EC] focus:bg-white border border-[#DDE5D9] focus:border-[#245C3A] rounded-lg text-xs text-[#122019] placeholder-[#526358]/80 focus:outline-none focus:ring-2 focus:ring-[#245C3A]/15 transition-all duration-200 ${
                isMm ? 'font-myanmar' : ''
              }`}
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  desktopInputRef.current?.focus();
                }}
                aria-label={t('Clear search query', 'ရှာဖွေမှု ရှင်းလင်းရန်')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-[#526358] hover:text-[#173D2A] hover:bg-[#DDE5D9]/50 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd
                aria-hidden="true"
                className="hidden xl:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-semibold text-[#526358] bg-white border border-[#DDE5D9] rounded absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                /
              </kbd>
            )}
          </div>

          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => {
              const nextOpen = !isSearchOpen;
              setIsSearchOpen(nextOpen);
              if (nextOpen) {
                setMobileMenuOpen(false);
                setTimeout(() => mobileInputRef.current?.focus(), 30);
              }
            }}
            className={`md:hidden p-2.5 rounded-lg border transition-colors cursor-pointer ${
              isSearchOpen || searchQuery.trim().length > 0
                ? 'bg-[#173D2A] text-white border-[#173D2A]'
                : 'bg-[#F6F8F3] text-[#173D2A] border-[#DDE5D9] hover:bg-[#EAF5E4]'
            }`}
            aria-label={t('Toggle site search', 'ထုတ်ကုန်နှင့် ဝန်ဆောင်မှု ရှာဖွေရန်')}
            aria-expanded={isSearchOpen}
            aria-controls="site-header-search-results"
          >
            <Search className="w-5 h-5" />
          </button>

          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              setIsSearchOpen(false);
              onOpenInquiry();
            }}
            className="hidden sm:inline-flex items-center justify-center px-3.5 xl:px-4 py-2.5 bg-[#173D2A] hover:bg-[#245C3A] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t('Request Inquiry', 'ဆက်သွယ်မေးမြန်းရန်')}
          </a>

          <button
            type="button"
            onClick={() => {
              const nextMenu = !mobileMenuOpen;
              setMobileMenuOpen(nextMenu);
              if (nextMenu) {
                setIsSearchOpen(false);
              }
            }}
            className="lg:hidden p-2.5 text-[#173D2A] hover:bg-[#F6F8F3] rounded-lg transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Site-Wide Search Results Popover / Drawer */}
        {isSearchOpen && (
          <div
            id="site-header-search-results"
            role="region"
            aria-label={t('Site-wide search results', 'ရှာဖွေတွေ့ရှိသော ထုတ်ကုန်နှင့် ဝန်ဆောင်မှုများ')}
            className="absolute left-0 right-0 md:left-auto md:right-4 lg:right-8 top-full mt-1.5 md:w-[540px] lg:w-[600px] bg-white border border-[#DDE5D9] rounded-none md:rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Mobile Search Input Bar inside Drawer */}
            <div className="md:hidden p-3 bg-[#F6F8F3] border-b border-[#DDE5D9]">
              <div className="relative">
                <label htmlFor="site-header-search-mobile" className="sr-only">
                  {t('Search products or services', 'ထုတ်ကုန် သို့မဟုတ် ဝန်ဆောင်မှု ရှာဖွေရန်')}
                </label>
                <Search
                  className="w-4 h-4 text-[#245C3A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  ref={mobileInputRef}
                  id="site-header-search-mobile"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder={t(
                    'Search Bamboo, Activated Carbon, Printing, Ball Pen...',
                    'ဝါး၊ ကာဗွန်၊ ပုံနှိပ်၊ ဘောပင် အသေးစိတ် ရှာရန်...'
                  )}
                  className={`w-full pl-10 pr-20 py-2.5 bg-white border border-[#DDE5D9] focus:border-[#245C3A] rounded-xl text-sm text-[#122019] placeholder-[#526358]/75 focus:outline-none ${
                    isMm ? 'font-myanmar' : ''
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      mobileInputRef.current?.focus();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-[#EAF5E4] text-[#173D2A] text-xs font-semibold cursor-pointer"
                  >
                    {t('Clear', 'ရှင်းရန်')}
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Bar & Live Count */}
            <div className="px-4 py-2.5 bg-[#F6F8F3] border-b border-[#DDE5D9] flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1" role="tablist">
                {filterTabs.map((tab) => {
                  const active = searchCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSearchCategory(tab.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#173D2A] text-white shadow-2xs'
                          : 'text-[#26332B]/80 hover:text-[#173D2A] hover:bg-white'
                      } ${isMm ? 'font-myanmar' : ''}`}
                    >
                      {t(tab.label, tab.labelMm)}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-[11px] font-medium text-[#526358]">
                <span aria-live="polite">
                  {isMm
                    ? `ရလဒ် ${searchResults.length} ခု`
                    : `${searchResults.length} ${
                        searchResults.length === 1 ? 'match' : 'matches'
                      }`}
                </span>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label={t('Close search panel', 'ရှာဖွေမှု ပိတ်ရန်')}
                  className="p-1 rounded hover:bg-[#DDE5D9]/60 text-[#26332B] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2.5 bg-white border-b border-[#DDE5D9]/70 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#526358] mr-1">
                {t('Quick Find:', 'အမြန်ရှာရန် -')}
              </span>
              {HEADER_QUICK_SUGGESTIONS.map((chip) => {
                const isSelected =
                  searchQuery.trim().toLowerCase() === chip.query.toLowerCase();
                return (
                  <button
                    key={chip.query}
                    type="button"
                    onClick={() => setSearchQuery(isSelected ? '' : chip.query)}
                    className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#245C3A] text-white border-[#245C3A] font-semibold'
                        : 'bg-[#F6F8F3] text-[#173D2A] border-[#DDE5D9] hover:border-[#245C3A]/50 hover:bg-[#EAF5E4]/50'
                    } ${isMm ? 'font-myanmar' : ''}`}
                  >
                    {t(chip.label, chip.labelMm)}
                  </button>
                );
              })}
            </div>

            {/* Matching Products & Services List */}
            <div
              role="listbox"
              aria-label={t('Products and services results', 'ထုတ်ကုန်နှင့် ဝန်ဆောင်မှု ရလဒ်များ')}
              className="max-h-[380px] overflow-y-auto divide-y divide-[#DDE5D9]/60"
            >
              {searchResults.length > 0 ? (
                searchResults.map((item, idx) => {
                  const isHighlighted = idx === activeIndex;
                  const isPrintingVisual =
                    item.visualType === 'books-printing' ||
                    item.visualType === 'voucher-printing' ||
                    item.visualType === 'commercial-printing';

                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isHighlighted}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => handleSelectSearchResult(item)}
                      className={`p-3.5 sm:px-4 flex items-start justify-between gap-3 cursor-pointer transition-colors ${
                        isHighlighted ? 'bg-[#F0F6EC]' : 'bg-white hover:bg-[#F6F8F3]'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9] flex items-center justify-center shrink-0 mt-0.5">
                          {isPrintingVisual ? (
                            <PrintingServiceIcon
                              type={
                                item.visualType as
                                  | 'books-printing'
                                  | 'voucher-printing'
                                  | 'commercial-printing'
                              }
                              className="w-5 h-5"
                            />
                          ) : (
                            <BambooProductIcon
                              type={
                                item.visualType as
                                  | 'bamboo-split'
                                  | 'bamboo-sticks'
                                  | 'bamboo-custom'
                                  | 'activated-carbon'
                              }
                              className="w-5 h-5"
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-0.5">
                            <span
                              className={`text-sm font-bold text-[#173D2A] truncate ${
                                isMm ? 'font-myanmar' : ''
                              }`}
                            >
                              {isMm ? item.titleMm : item.title}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded bg-[#EAF5E4] text-[#245C3A] border border-[#A8D977]/50 shrink-0 ${
                                isMm ? 'font-myanmar' : ''
                              }`}
                            >
                              {isMm ? item.categoryLabelMm : item.categoryLabel}
                            </span>
                          </div>

                          <p
                            className={`text-xs text-[#26332B]/85 line-clamp-1 mb-1 ${
                              isMm ? 'font-myanmar' : ''
                            }`}
                          >
                            {isMm ? item.summaryMm : item.summary}
                          </p>

                          <p
                            className={`text-[11px] font-mono-tabular text-[#245C3A] font-medium truncate ${
                              isMm ? 'font-myanmar' : ''
                            }`}
                          >
                            {isMm ? item.specHighlightMm : item.specHighlight}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 shrink-0 self-center">
                        <button
                          type="button"
                          onClick={(e) => handleInquireResult(item, e)}
                          className="px-2.5 py-1.5 rounded-md bg-[#F6F8F3] hover:bg-[#A8D977] text-[#173D2A] border border-[#DDE5D9] text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                        >
                          {t('Inquire', 'မေးမြန်းရန်')}
                        </button>
                        <span
                          aria-hidden="true"
                          className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#173D2A] text-white text-[11px] font-semibold"
                        >
                          <span>{t('View', 'ကြည့်ရန်')}</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center">
                  <p className="text-sm font-semibold text-[#173D2A] mb-1">
                    {t(
                      `No matching products or services for "${searchQuery}"`,
                      `"${searchQuery}" နှင့် ကိုက်ညီသော ထုတ်ကုန် သို့မဟုတ် ဝန်ဆောင်မှု မတွေ့ရှိပါ`
                    )}
                  </p>
                  <p className="text-xs text-[#526358] mb-3">
                    {t(
                      'Try searching for Bamboo Split, 3 mm, Bamboo Sticks, 30 Bundles, Nut Shell, Coconut Shell, Books Printing, Voucher, or Ball Pen.',
                      'ဝါးခြမ်းပြား (Bamboo Split)၊ ဝါးတံ (Bamboo Sticks)၊ Activated Carbon၊ စာအုပ်ပုံနှိပ်၊ ဘောင်ချာ သို့မဟုတ် Ball Pen ဟု ရိုက်ထည့်ရှာဖွေကြည့်ပါ။'
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchCategory('all');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#173D2A] text-white text-xs font-semibold hover:bg-[#245C3A] transition-colors cursor-pointer"
                  >
                    {t('Show All Products & Services', 'ထုတ်ကုန်နှင့် ဝန်ဆောင်မှု အားလုံးပြရန်')}
                  </button>
                </div>
              )}
            </div>

            {/* Footer Hint Bar */}
            <div className="px-4 py-2 bg-[#F6F8F3] border-t border-[#DDE5D9] flex items-center justify-between text-[11px] text-[#526358]">
              <span>
                {t(
                  'Select an item to jump directly to its specifications',
                  'အသေးစိတ် စံချိန်စံညွှန်းများ ကြည့်ရှုရန် ရွေးချယ်နှိပ်ပါ'
                )}
              </span>
              <span className="hidden sm:inline font-mono text-[10px]">
                {t('↑↓ Navigate · Enter Select · Esc Close', '↑↓ ရွေးရန် · Enter ကြည့်ရန် · Esc ပိတ်ရန်')}
              </span>
            </div>
          </div>
        )}
      </div>

      <MobileNavigation
        isOpen={mobileMenuOpen}
        currentRoute={currentRoute}
        isNotFound={isNotFound}
        onNavigate={onNavigate}
        onClose={() => setMobileMenuOpen(false)}
        onOpenInquiry={onOpenInquiry}
      />
    </header>
  );
};

interface SiteFooterProps {
  currentRoute: PageRoute;
  isNotFound?: boolean;
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  currentRoute,
  isNotFound = false,
  onNavigate,
}) => {
  const { isMm, t } = useLanguage();

  const bambooExportProducts = [
    ...getProductsByCategory('bamboo'),
    ...getProductsByCategory('activated-carbon'),
  ];
  const printingServices = getPublishedPrintingServices();
  const stationeryProducts = getProductsByCategory('stationery');

  const navigateAndScroll = (route: PageRoute, sectionId: string) => {
    onNavigate(route);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  return (
    <footer className="bg-[#112E1F] text-white/80 border-t border-white/15">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Logo & Company Introduction */}
          <div className="lg:col-span-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="flex items-center gap-3 mb-3 w-fit"
            >
              <img
                src={COMPANY_INFO.logoPath}
                alt="TB Star Company Limited Official Logo"
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-contain bg-white p-0.5 shrink-0"
              />
              <div>
                <span className="font-display text-lg font-bold text-white block">
                  {t(COMPANY_INFO.name, 'TBStar Company Limited')}
                </span>
                <span className="text-xs text-[#A8D977] block">
                  {t('Established in 2013 · Yangon, Myanmar', '၂၀၁၃ ခုနှစ်တွင် တည်ထောင်သည် · ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ')}
                </span>
              </div>
            </a>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              {t(COMPANY_INFO.overview, COMPANY_INFO.overviewMm)}
            </p>
            <p className="text-xs font-mono-tabular text-[#A8D977]">
              {t('Official Domain:', 'ကုမ္ပဏီ ဝဘ်ဆိုက်ဒိုမိန်း -')}{' '}
              <a
                href={COMPANY_INFO.canonicalBase}
                rel="home"
                title={`${COMPANY_INFO.name} Official Website (${COMPANY_INFO.canonicalBase})`}
                aria-label={t(
                  `Go to ${COMPANY_INFO.name} Home (${COMPANY_INFO.domain})`,
                  `${COMPANY_INFO.name} ပင်မစာမျက်နှာသို့ သွားရန် (${COMPANY_INFO.domain})`
                )}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                className="hover:text-white hover:underline underline-offset-4 transition-colors cursor-pointer"
              >
                {COMPANY_INFO.domain}
              </a>
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2">
            <AnimatedHeading
              tag="h2"
              className="text-xs font-semibold text-white tracking-wider uppercase mb-4 justify-start"
            >
              {t('Navigation', 'စာမျက်နှာများ')}
            </AnimatedHeading>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((nav) => {
                const isActive = !isNotFound && currentRoute === nav.route;
                return (
                  <li key={nav.route}>
                    <a
                      href={nav.route}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(nav.route);
                      }}
                      className={`transition-colors block ${
                        isActive
                          ? 'text-[#A8D977] font-semibold'
                          : 'hover:text-[#A8D977]'
                      }`}
                    >
                      {isMm ? nav.labelMm : nav.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Bamboo Products & Printing Services Links */}
          <div className="lg:col-span-3">
            <AnimatedHeading
              tag="h2"
              className="text-xs font-semibold text-white tracking-wider uppercase mb-4 justify-start"
            >
              {t('Products & Services', 'ထုတ်ကုန်နှင့် ဝန်ဆောင်မှုများ')}
            </AnimatedHeading>
            <div className="space-y-4 text-sm">
              {bambooExportProducts.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#A8D977] mb-1.5">
                    {t('Bamboo Production & Export', 'ဝါးထုတ်ကုန်နှင့် ပြည်ပပို့ကုန်လုပ်ငန်း')}
                  </p>
                  <ul className="space-y-1.5 text-white/80">
                    {bambooExportProducts.map((prod) => (
                      <li key={prod.id}>
                        <a
                          href={prod.href}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateAndScroll(prod.route, prod.sectionId);
                          }}
                          className="hover:text-white transition-colors text-left cursor-pointer block"
                        >
                          {isMm ? prod.footerLabelMm : prod.footerLabel}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(printingServices.length > 0 || stationeryProducts.length > 0) && (
                <div>
                  <p className="text-xs font-semibold text-[#A8D977] mb-1.5">
                    {t('Printing Services & Stationery', 'ပုံနှိပ်နှင့် စာရေးကိရိယာ ဝန်ဆောင်မှုများ')}
                  </p>
                  <ul className="space-y-1.5 text-white/80">
                    {printingServices.map((svc) => (
                      <li key={svc.id}>
                        <a
                          href={svc.href || `/printing-services#service-${svc.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateAndScroll(
                              '/printing-services',
                              svc.sectionId || `service-${svc.id}`
                            );
                          }}
                          className="hover:text-white transition-colors text-left cursor-pointer block"
                        >
                          {isMm ? svc.nameMm : svc.name}
                        </a>
                      </li>
                    ))}
                    {stationeryProducts.map((prod) => (
                      <li key={prod.id}>
                        <a
                          href={prod.href}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateAndScroll(prod.route, prod.sectionId);
                          }}
                          className="hover:text-white transition-colors text-left cursor-pointer block"
                        >
                          {isMm ? prod.footerLabelMm : prod.footerLabel}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Col 4: Verified Office Address & Telephone */}
          <div className="lg:col-span-3">
            <AnimatedHeading
              tag="h2"
              className="text-xs font-semibold text-white tracking-wider uppercase mb-4 justify-start"
            >
              {t('Office & Contact', 'ရုံးချုပ်လိပ်စာနှင့် ဖုန်းနံပါတ်')}
            </AnimatedHeading>
            <address className="not-italic text-sm text-white/80 leading-relaxed mb-4">
              <strong className="text-white block mb-1">
                {t(COMPANY_INFO.name, COMPANY_INFO.nameMm)}
              </strong>
              {isMm ? (
                <span>{COMPANY_INFO.address.fullMm}</span>
              ) : (
                <>
                  {COMPANY_INFO.address.line1},<br />
                  {COMPANY_INFO.address.line2},<br />
                  {COMPANY_INFO.address.township}, {COMPANY_INFO.address.city},{' '}
                  {COMPANY_INFO.address.country}.
                </>
              )}
            </address>
            <p className="text-sm mb-3">
              <span className="text-white/60 block text-xs mb-0.5">
                {t('Phone & WhatsApp:', 'ဖုန်း နှင့် WhatsApp -')}
              </span>
              <a
                href={COMPANY_INFO.telephoneHref}
                className="font-mono-tabular font-bold text-[#A8D977] hover:underline mr-2"
              >
                {COMPANY_INFO.telephone}
              </a>
              <a
                href={COMPANY_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-2 py-0.5 rounded bg-[#25D366]/20 border border-[#25D366]/40 text-[#A8D977] hover:bg-[#25D366] hover:text-white text-[11px] font-semibold transition-colors"
              >
                WhatsApp ↗
              </a>
            </p>
            <p className="text-sm">
              <span className="text-white/60 block text-xs mb-0.5">
                {t('Email:', 'အီးမေးလ် -')}
              </span>
              <a
                href={COMPANY_INFO.emailHref}
                className="font-mono-tabular font-bold text-[#A8D977] hover:underline inline-flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#A8D977] shrink-0" />
                {COMPANY_INFO.email}
              </a>
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} {t(COMPANY_INFO.name, COMPANY_INFO.nameMm)}.{' '}
            {t('All rights reserved.', 'မူပိုင်ခွင့်များအားလုံး သိမ်းဆည်းထားပါသည်။')}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-white/70">
            <span>
              {t(
                'Natural Bamboo Production & Export',
                'သဘာဝဝါးထုတ်ကုန်နှင့် ပြည်ပပို့ကုန်'
              )}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {t(
                'One-Stop Offset Printing Services',
                'အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှုလုပ်ငန်း'
              )}
            </span>
            <span aria-hidden="true">·</span>
            <span>{t('Yangon, Myanmar', 'ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
