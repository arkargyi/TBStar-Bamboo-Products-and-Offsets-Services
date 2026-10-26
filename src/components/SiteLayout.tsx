import React, { useState } from 'react';
import { Globe, MapPin, Menu, Phone, X } from 'lucide-react';
import {
  COMPANY_INFO,
  InquiryTypeOption,
  PageRoute,
} from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export const NAV_ITEMS: { label: string; labelMm: string; route: PageRoute }[] = [
  { label: 'Home', labelMm: 'ပင်မစာမျက်နှာ', route: '/' },
  { label: 'About Us', labelMm: 'ကုမ္ပဏီအကြောင်း', route: '/about' },
  { label: 'Bamboo Products', labelMm: 'ဝါးထုတ်ကုန်များ', route: '/bamboo-products' },
  { label: 'Printing Services', labelMm: 'ပုံနှိပ်ဝန်ဆောင်မှုများ', route: '/printing-services' },
  { label: 'Gallery', labelMm: 'ဓာတ်ပုံပြခန်း', route: '/gallery' },
  { label: 'Contact Us', labelMm: 'ဆက်သွယ်ရန်', route: '/contact' },
];

export interface LanguageToggleSwitchProps {
  className?: string;
  compact?: boolean;
}

export const LanguageToggleSwitch: React.FC<LanguageToggleSwitchProps> = ({
  className = '',
  compact = false,
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
      className={`group relative inline-flex items-center bg-[#F6F8F3] hover:bg-[#EDF3E8] border border-[#DDE5D9] hover:border-[#245C3A]/60 rounded-full p-1 shrink-0 cursor-pointer select-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173D2A] ${className}`}
    >
      <span
        className={`inline-flex items-center justify-center text-[#245C3A] shrink-0 ${
          compact ? 'pl-1.5 pr-1' : 'pl-2 pr-1.5'
        }`}
        aria-hidden="true"
      >
        <Globe className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
      </span>

      {/* Interactive Sliding Toggle Track */}
      <div className="relative grid grid-cols-2 items-center rounded-full bg-white/80 border border-[#DDE5D9]/80 p-0.5 min-w-[116px] sm:min-w-[128px]">
        {/* Sliding Thumb Indicator */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-[#173D2A] shadow-xs transition-transform duration-200 ease-out ${
            isMm ? 'translate-x-full' : 'translate-x-0'
          }`}
        />

        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => handleSegmentClick('en', e)}
          className={`relative z-10 px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-full transition-colors duration-200 cursor-pointer text-center whitespace-nowrap flex items-center justify-center gap-1 ${
            !isMm
              ? 'text-white'
              : 'text-[#26332B]/75 hover:text-[#173D2A]'
          }`}
        >
          {!isMm && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#A8D977] shrink-0"
              aria-hidden="true"
            />
          )}
          <span>EN</span>
        </button>

        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => handleSegmentClick('mm', e)}
          className={`relative z-10 px-2.5 py-1 text-[11px] sm:text-xs font-bold font-myanmar rounded-full transition-colors duration-200 cursor-pointer text-center whitespace-nowrap flex items-center justify-center gap-1 ${
            isMm
              ? 'text-white'
              : 'text-[#26332B]/75 hover:text-[#173D2A]'
          }`}
        >
          {isMm && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#A8D977] shrink-0"
              aria-hidden="true"
            />
          )}
          <span>မြန်မာ</span>
        </button>
      </div>
    </div>
  );
};

export const LanguageSwitchButton = LanguageToggleSwitch;

interface DesktopNavigationProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  currentRoute,
  onNavigate,
}) => {
  const { isMm } = useLanguage();

  return (
    <nav
      aria-label="Primary Navigation"
      className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-[#26332B]"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = currentRoute === item.route;
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
  onNavigate: (route: PageRoute) => void;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  currentRoute,
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
          const isActive = currentRoute === item.route;
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
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenInquiry();
          }}
          className="w-full py-2.5 px-4 bg-[#173D2A] text-white text-sm font-semibold rounded-lg text-center cursor-pointer"
        >
          {t('Request Inquiry', 'ဆက်သွယ်မေးမြန်းရန်')}
        </button>
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
  onNavigate: (route: PageRoute) => void;
  onOpenInquiry: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMm, toggleLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DDE5D9]">
      {/* Executive Corporate Top Utility Bar */}
      <div className="hidden md:block bg-[#112E1F] text-white/85 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => {
                onNavigate('/contact');
                setTimeout(() => {
                  document
                    .getElementById('location-maps')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }, 120);
              }}
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#A8D977] transition-colors truncate cursor-pointer text-left"
              title="View Central Tower, Kyauktada Township, Yangon on Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-[#A8D977] shrink-0" />
              <span className="truncate underline-offset-4 hover:underline">
                {t(
                  COMPANY_INFO.address.shortAddress,
                  COMPANY_INFO.address.shortAddressMm
                )}
              </span>
            </button>
            <a
              href={COMPANY_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-[#A8D977] text-[#A8D977] hover:text-[#173D2A] text-[11px] font-semibold transition-colors shrink-0"
            >
              {t('Google Maps ↗', 'မြေပုံကြည့်ရန် ↗')}
            </a>
          </div>

          <div className="flex items-center gap-3.5 shrink-0">
            <span className="hidden xl:inline text-white/70">
              {t(
                '100% Natural Myanmar Bamboo · One-Stop Offset Printing',
                '၁၀၀% သဘာဝမြန်မာ့ဝါးထုတ်ကုန် · အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း'
              )}
            </span>
            <span className="hidden xl:inline text-white/25" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 text-[11px] text-white/80 hover:text-[#A8D977] transition-colors cursor-pointer"
              title={t('Switch to Burmese (မြန်မာ)', 'Switch to English')}
            >
              <Globe className="w-3 h-3 text-[#A8D977]" />
              <span>
                {t('Language: English (Switch to မြန်မာ)', 'ဘာသာစကား - မြန်မာ (Switch to EN)')}
              </span>
            </button>
            <span className="text-white/25" aria-hidden="true">
              |
            </span>
            <a
              href={COMPANY_INFO.telephoneHref}
              className="inline-flex items-center gap-1.5 font-mono-tabular font-bold text-[#A8D977] hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{COMPANY_INFO.telephone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
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
            referrerPolicy="no-referrer"
            className="h-11 w-11 sm:h-12 sm:w-12 object-contain shrink-0 rounded-full border border-[#DDE5D9] bg-white p-0.5"
          />
          <div className="min-w-0">
            <span
              className={`font-display text-sm sm:text-base xl:text-lg font-bold tracking-tight text-[#173D2A] group-hover:text-[#245C3A] transition-colors block whitespace-nowrap ${
                isMm ? 'font-myanmar' : ''
              }`}
            >
              {isMm ? 'တီဘီစတား ကုမ္ပဏီ လီမိတက်' : COMPANY_INFO.name}
            </span>
            <span className="text-[11px] text-[#245C3A] font-medium hidden sm:block">
              {t('Bamboo Export & Offset Printing', 'TB Star Company Limited')}
            </span>
          </div>
        </a>

        {/* Zone 2: Desktop Navigation */}
        <DesktopNavigation currentRoute={currentRoute} onNavigate={onNavigate} />

        {/* Zone 3: Language Toggle Switch + Primary Action Button + Mobile Menu Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <LanguageToggleSwitch />

          <button
            type="button"
            onClick={onOpenInquiry}
            className="hidden sm:inline-flex items-center justify-center px-3.5 xl:px-4 py-2.5 bg-[#173D2A] hover:bg-[#245C3A] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t('Request Inquiry', 'ဆက်သွယ်မေးမြန်းရန်')}
          </button>

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
        onNavigate={onNavigate}
        onClose={() => setMobileMenuOpen(false)}
        onOpenInquiry={onOpenInquiry}
      />
    </header>
  );
};

interface SiteFooterProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  currentRoute,
  onNavigate,
  onInquireWithCategory,
}) => {
  const { isMm, t } = useLanguage();

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
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-contain bg-white p-0.5 shrink-0"
              />
              <div>
                <span className="font-display text-lg font-bold text-white block">
                  {t(COMPANY_INFO.name, 'တီဘီစတား ကုမ္ပဏီ လီမိတက်')}
                </span>
                <span className="text-xs text-[#A8D977] block">
                  {t('Yangon, Myanmar', 'TB Star Company Limited')}
                </span>
              </div>
            </a>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              {t(
                `${COMPANY_INFO.name} manufactures natural bamboo products for domestic distribution in Myanmar and international export markets, and provides one-stop offset printing services.`,
                'တီဘီစတား ကုမ္ပဏီ လီမိတက် (TB Star Company Limited) သည် သဘာဝဝါးထုတ်ကုန်များကို ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်စျေးကွက်များအတွက် ထုတ်လုပ်တင်ပို့ပြီး တစ်နေရာတည်းတွင် အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုကိုလည်း ဆောင်ရွက်ပေးလျက်ရှိပါသည်။'
              )}
            </p>
            <p className="text-xs font-mono-tabular text-[#A8D977]">
              {t('Official Domain:', 'ကုမ္ပဏီ ဝဘ်ဆိုက်ဒိုမိန်း -')} {COMPANY_INFO.domain}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              {t('Navigation', 'စာမျက်နှာများ')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((nav) => (
                <li key={nav.route}>
                  <a
                    href={nav.route}
                    aria-current={currentRoute === nav.route ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(nav.route);
                    }}
                    className={`transition-colors block ${
                      currentRoute === nav.route
                        ? 'text-[#A8D977] font-semibold'
                        : 'hover:text-[#A8D977]'
                    }`}
                  >
                    {isMm ? nav.labelMm : nav.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Bamboo Products & Printing Services Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              {t('Products & Services', 'ထုတ်ကုန်နှင့် ဝန်ဆောင်မှုများ')}
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-semibold text-[#A8D977] mb-1.5">
                  {t('Bamboo Production & Export', 'ဝါးထုတ်ကုန်နှင့် ပြည်ပပို့ကုန်လုပ်ငန်း')}
                </p>
                <ul className="space-y-1.5 text-white/80">
                  <li>
                    <button
                      type="button"
                      onClick={() => onInquireWithCategory('Bamboo Split', true)}
                      className="hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {t('Bamboo Split (3 mm · 20"–48")', 'ဝါးခြမ်းပြား (အထူ 3 mm · ၂၀"–၄၈")')}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onInquireWithCategory('Bamboo Sticks', true)}
                      className="hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {t('Bamboo Sticks (8", 9", 10" · 30 kg/bag)', 'ဝါးတံ (၈"၊ ၉"၊ ၁၀" · တစ်အိတ် 30 kg)')}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onInquireWithCategory('Other Bamboo Products', true)}
                      className="hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {t('Other Bamboo Products', 'အခြား ဝါးထုတ်ကုန်များ')}
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#A8D977] mb-1.5">
                  {t('Offset Printing Services', 'အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှုများ')}
                </p>
                <ul className="space-y-1.5 text-white/80">
                  <li>
                    <button
                      type="button"
                      onClick={() => onInquireWithCategory('Books Printing', true)}
                      className="hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {t('Books Printing', 'စာအုပ်ပုံနှိပ်ခြင်းလုပ်ငန်း')}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onInquireWithCategory('Voucher Books Printing', true)}
                      className="hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {t('Voucher Books Printing', 'ဘောင်ချာစာအုပ် ပုံနှိပ်ခြင်းလုပ်ငန်း')}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        onInquireWithCategory('Other Offset Printing Services', true)
                      }
                      className="hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {t('Other Offset Printing Services', 'အခြား အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများ')}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Col 4: Verified Office Address & Telephone */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
              {t('Office & Contact', 'ရုံးချုပ်လိပ်စာနှင့် ဖုန်းနံပါတ်')}
            </h4>
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
                {t('Telephone:', 'ဆက်သွယ်ရန် ဖုန်းနံပါတ် -')}
              </span>
              <a
                href={COMPANY_INFO.telephoneHref}
                className="font-mono-tabular font-bold text-[#A8D977] hover:underline"
              >
                {COMPANY_INFO.telephone}
              </a>
            </p>
            <a
              href={COMPANY_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A8D977] hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{t('Open Central Tower in Google Maps ↗', 'Google Maps တွင် ရုံးချုပ်တည်နေရာကြည့်ရန် ↗')}</span>
            </a>
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
