import React, { useState } from 'react';
import { Globe, MapPin, Menu, Phone, X } from 'lucide-react';
import {
  COMPANY_INFO,
  getProductsByCategory,
  getPublishedPrintingServices,
  InquiryTypeOption,
  PageRoute,
} from '../constants/companyData';
import { useLanguage } from '../context/LanguageContext';

export const NAV_ITEMS: { label: string; labelMm: string; route: PageRoute }[] = [
  { label: 'Home', labelMm: 'ပင်မစာမျက်နှာ', route: '/' },
  { label: 'About Us', labelMm: 'ကုမ္ပဏီအကြောင်း', route: '/about' },
  { label: 'Bamboo Products', labelMm: 'ဝါးထုတ်ကုန်များ', route: '/bamboo-products' },
  { label: 'Activated Carbon', labelMm: 'အက်တီဗိတ်တက် ကာဗွန်', route: '/charcoal' },
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
      className="hidden lg:flex items-center gap-3.5 xl:gap-6 text-sm font-medium text-[#26332B]"
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
      </div>
    </div>
  );
};

interface SiteHeaderProps {
  currentRoute: PageRoute;
  isNotFound?: boolean;
  onNavigate: (route: PageRoute) => void;
  onOpenInquiry: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentRoute,
  isNotFound = false,
  onNavigate,
  onOpenInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMm, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DDE5D9]">
      {/* Executive Corporate Top Utility Bar */}
      <div className="hidden md:block bg-[#112E1F] text-white/90 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[42px] py-1.5 flex items-center justify-between gap-4 text-xs">
          {/* Left Zone: Verified Office Location */}
          <div className="flex items-center gap-3.5 min-w-0">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
              className="group inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors min-w-0 cursor-pointer"
              title={t(COMPANY_INFO.address.full, COMPANY_INFO.address.fullMm)}
            >
              <span className="w-5 h-5 rounded-full bg-[#A8D977]/15 border border-[#A8D977]/30 flex items-center justify-center shrink-0 group-hover:bg-[#A8D977] group-hover:text-[#112E1F] text-[#A8D977] transition-colors">
                <MapPin className="w-3 h-3" />
              </span>
              <span
                className={`truncate max-w-[280px] lg:max-w-[380px] xl:max-w-[460px] ${
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

          {/* Right Zone: Direct Hotline & Sleek Language Switcher */}
          <div className="flex items-center gap-3.5 shrink-0">
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
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Official TB Star Company Limited Logo + Brand Title */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            onNavigate('/');
          }}
          className="flex items-center gap-3 whitespace-nowrap shrink-0 group"
        >
          <img
            src={COMPANY_INFO.logoPath}
            alt="TB Star Company Limited Official Logo"
            width={48}
            height={48}
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-11 w-11 sm:h-12 sm:w-12 object-contain shrink-0 rounded-full border border-[#DDE5D9] bg-white p-0.5"
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
          onNavigate={onNavigate}
        />

        {/* Zone 3: Primary Action Button + Mobile Menu Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              onOpenInquiry();
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 bg-[#173D2A] hover:bg-[#245C3A] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t('Request Inquiry', 'ဆက်သွယ်မေးမြန်းရန်')}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-[#173D2A] hover:bg-[#F6F8F3] rounded-lg transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
              {t('Official Domain:', 'ကုမ္ပဏီ ဝဘ်ဆိုက်ဒိုမိန်း -')} {COMPANY_INFO.domain}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              {t('Navigation', 'စာမျက်နှာများ')}
            </h2>
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
            <h2 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              {t('Products & Services', 'ထုတ်ကုန်နှင့် ဝန်ဆောင်မှုများ')}
            </h2>
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
                            if (prod.categoryKey === 'activated-carbon') {
                              onNavigate(prod.route);
                            } else {
                              navigateAndScroll(prod.route, prod.sectionId);
                            }
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
            <h2 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              {t('Office & Contact', 'ရုံးချုပ်လိပ်စာနှင့် ဖုန်းနံပါတ်')}
            </h2>
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
            <p className="text-sm">
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
