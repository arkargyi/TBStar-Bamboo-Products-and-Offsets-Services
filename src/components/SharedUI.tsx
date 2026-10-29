import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, ArrowUp, ChevronRight, Loader2 } from 'lucide-react';
import {
  computeLegibilityFilter,
  CssFilterMetrics,
  PAGE_BACKGROUNDS,
  PageBackgroundConfig,
  PageRoute,
} from '../constants/companyData';
import { useLanguage } from '../context/LanguageContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary-light' | 'primary-dark' | 'outline-light' | 'outline-dark' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  href?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary-dark',
  size = 'md',
  isLoading = false,
  href,
  className = '',
  disabled,
  onClick,
  children,
  ...rest
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245C3A] disabled:opacity-60 disabled:cursor-not-allowed';

  const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
    'primary-light': 'bg-[#A8D977] hover:bg-[#97cc64] text-[#173D2A] shadow-xs',
    'primary-dark': 'bg-[#173D2A] hover:bg-[#245C3A] text-white shadow-xs',
    'outline-light':
      'bg-[#071A10]/70 hover:bg-white/20 backdrop-blur-xs border border-white/35 hover:border-[#A8D977] text-white shadow-xs',
    'outline-dark':
      'bg-white hover:bg-[#F6F8F3] border border-[#DDE5D9] hover:border-[#245C3A] text-[#173D2A]',
    subtle:
      'bg-[#F6F8F3] hover:bg-[#A8D977] text-[#173D2A] border border-[#DDE5D9] hover:border-[#A8D977]',
  };

  const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-sm',
  };

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href && !disabled && !isLoading) {
    return (
      <a
        href={href}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            (onClick as unknown as (ev: React.MouseEvent<HTMLAnchorElement>) => void)(e);
          }
        }}
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...rest}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {children}
    </button>
  );
};

interface SectionHeadingProps {
  kicker?: string;
  kickerMm?: string;
  title: string;
  titleMm?: string;
  description?: string;
  descriptionMm?: string;
  action?: React.ReactNode;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  kickerMm,
  title,
  titleMm,
  description,
  descriptionMm,
  action,
  light = false,
}) => {
  const { isMm } = useLanguage();
  const displayKicker = isMm && kickerMm ? kickerMm : kicker;
  const displayTitle = isMm && titleMm ? titleMm : title;
  const displayDescription = isMm && descriptionMm ? descriptionMm : description;

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div className="max-w-3xl">
        {displayKicker && (
          <p
            className={`text-xs font-medium mb-2 ${
              light ? 'text-[#A8D977]' : 'text-[#245C3A]'
            } ${isMm ? 'font-myanmar' : ''}`}
          >
            {displayKicker}
          </p>
        )}
        <h2
          className={`text-2xl sm:text-4xl font-bold tracking-tight ${
            light ? 'text-white' : 'text-[#173D2A]'
          } ${isMm ? 'font-myanmar leading-[1.4]' : ''}`}
          style={{ textWrap: 'balance' }}
        >
          {displayTitle}
        </h2>
        {displayDescription && (
          <p
            className={`mt-3 text-sm sm:text-base leading-relaxed ${
              light ? 'text-white/85' : 'text-[#26332B]/85'
            } ${isMm ? 'font-myanmar' : ''}`}
          >
            {displayDescription}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 self-start md:self-auto">{action}</div>}
    </div>
  );
};

export interface BreadcrumbItem {
  label: string;
  labelMm?: string;
  route?: PageRoute;
}

const DEFAULT_BREADCRUMB_MM: Record<string, string> = {
  Home: 'ပင်မစာမျက်နှာ',
  'About Us': 'ကုမ္ပဏီအကြောင်း',
  'Bamboo Products': 'ဝါးထုတ်ကုန်များ',
  Charcoal: 'မီးသွေးထုတ်ကုန်',
  'Offset Printing Services': 'အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှုများ',
  'Projects / Gallery': 'ဓာတ်ပုံမှတ်တမ်း',
  'Contact Us': 'ဆက်သွယ်ရန်',
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (route: PageRoute) => void;
  light?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
  light = true,
}) => {
  const { isMm } = useLanguage();

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol
        className={`flex flex-wrap items-center gap-1.5 text-xs ${
          light ? 'text-white/90 drop-shadow-xs' : 'text-[#26332B]/75'
        }`}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const displayLabel = isMm
            ? item.labelMm || DEFAULT_BREADCRUMB_MM[item.label] || item.label
            : item.label;

          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              {item.route && !isLast ? (
                <a
                  href={item.route}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.route!);
                  }}
                  className={`hover:underline cursor-pointer ${
                    light ? 'hover:text-[#A8D977]' : 'hover:text-[#173D2A]'
                  } ${isMm ? 'font-myanmar' : ''}`}
                >
                  {displayLabel}
                </a>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={`font-semibold ${
                    light ? 'text-[#A8D977]' : 'text-[#173D2A]'
                  } ${isMm ? 'font-myanmar' : ''}`}
                >
                  {displayLabel}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  className="w-3.5 h-3.5 opacity-75 shrink-0"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export interface AdaptiveBackgroundMediaProps {
  bgConfig: PageBackgroundConfig;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Renders a hero or section background image without changing the underlying asset,
 * programmatically computing and applying CSS `brightness()`, `contrast()`, and `saturate()`
 * filters from image luminance and highlight intensity metrics so overlaying text is crisp.
 */
export const AdaptiveBackgroundMedia: React.FC<AdaptiveBackgroundMediaProps> = ({
  bgConfig,
  loading = 'eager',
  fetchPriority = 'high',
}) => {
  const [filterMetrics, setFilterMetrics] = useState<CssFilterMetrics>(() =>
    bgConfig.filterMetrics ||
    computeLegibilityFilter(bgConfig.estimatedLuminance, bgConfig.highlightIntensity)
  );

  useEffect(() => {
    setFilterMetrics(
      bgConfig.filterMetrics ||
        computeLegibilityFilter(bgConfig.estimatedLuminance, bgConfig.highlightIntensity)
    );
  }, [bgConfig]);

  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      try {
        const sampleSize = 16;
        const canvas = document.createElement('canvas');
        canvas.width = sampleSize;
        canvas.height = sampleSize;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
        const { data } = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const luminances: number[] = [];

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i] / 255;
          const g = data[i + 1] / 255;
          const b = data[i + 2] / 255;
          // Perceived relative luminance (ITU-R BT.709)
          const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          luminances.push(lum);
        }

        if (luminances.length > 0) {
          const avgLum =
            luminances.reduce((acc, val) => acc + val, 0) / luminances.length;
          const sorted = [...luminances].sort((a, b) => a - b);
          const p90Index = Math.min(
            sorted.length - 1,
            Math.floor(sorted.length * 0.9)
          );
          const highlightLum = sorted[p90Index];

          // Blend measured canvas metrics with baseline profile for stability
          const blendedLum = avgLum * 0.7 + bgConfig.estimatedLuminance * 0.3;
          const blendedHigh =
            highlightLum * 0.7 + bgConfig.highlightIntensity * 0.3;

          setFilterMetrics(computeLegibilityFilter(blendedLum, blendedHigh));
        }
      } catch {
        // Cross-origin image without CORS headers: use pre-calibrated programmatic metrics
        setFilterMetrics(
          computeLegibilityFilter(
            bgConfig.estimatedLuminance,
            bgConfig.highlightIntensity
          )
        );
      }
    },
    [bgConfig]
  );

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none select-none"
      aria-hidden="true"
    >
      <img
        src={bgConfig.imagePath}
        onLoad={handleImageLoad}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== bgConfig.publicSourceUrl) {
            target.src = bgConfig.publicSourceUrl;
          }
        }}
        alt=""
        width={1920}
        height={1080}
        loading={loading}
        referrerPolicy="no-referrer"
        fetchPriority={fetchPriority}
        decoding="async"
        data-filter-brightness={filterMetrics.brightness}
        data-filter-contrast={filterMetrics.contrast}
        data-filter-saturate={filterMetrics.saturate}
        style={{
          filter: filterMetrics.cssFilter,
          WebkitFilter: filterMetrics.cssFilter,
        }}
        className={`w-full h-full object-cover transition-[filter,opacity] duration-300 ${bgConfig.objectPosition} ${bgConfig.imageOpacityClass}`}
      />
      <div
        className={`absolute inset-0 ${bgConfig.overlayGradient}`}
        style={{ background: bgConfig.overlayCss }}
      />
      <div
        className={`absolute inset-0 ${bgConfig.vignetteGradient}`}
        style={{ background: bgConfig.vignetteCss }}
      />
    </div>
  );
};

interface HeroSectionProps {
  breadcrumbs?: BreadcrumbItem[];
  backgroundRoute?: PageRoute;
  onNavigate: (route: PageRoute) => void;
  kicker?: string;
  kickerMm?: string;
  title: string;
  titleMm?: string;
  description: string;
  descriptionMm?: string;
  actions?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  breadcrumbs,
  backgroundRoute,
  onNavigate,
  kicker,
  kickerMm,
  title,
  titleMm,
  description,
  descriptionMm,
  actions,
  rightSlot,
}) => {
  const { isMm } = useLanguage();
  const displayKicker = isMm && kickerMm ? kickerMm : kicker;
  const displayTitle = isMm && titleMm ? titleMm : title;
  const displayDescription = isMm && descriptionMm ? descriptionMm : description;

  const lastBreadcrumbRoute =
    breadcrumbs && breadcrumbs.length > 0
      ? breadcrumbs[breadcrumbs.length - 1].route
      : undefined;
  const resolvedRoute: PageRoute = backgroundRoute || lastBreadcrumbRoute || '/';
  const bgConfig = PAGE_BACKGROUNDS[resolvedRoute] || PAGE_BACKGROUNDS['/'];

  return (
    <section className="relative bg-[#071A10] text-white overflow-hidden border-b border-[#245C3A]">
      <AdaptiveBackgroundMedia
        bgConfig={bgConfig}
        loading="eager"
        fetchPriority="high"
      />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative z-10">
        <div
          className={`grid grid-cols-1 ${
            rightSlot ? 'lg:grid-cols-12 gap-12 items-stretch' : 'max-w-3xl'
          }`}
        >
          <div className={rightSlot ? 'lg:col-span-7 flex flex-col justify-center' : ''}>
            {breadcrumbs && (
              <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} light={true} />
            )}
            {displayKicker && (
              <p
                className={`text-xs text-[#A8D977] font-semibold tracking-wide mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] ${
                  isMm ? 'font-myanmar' : ''
                }`}
              >
                {displayKicker}
              </p>
            )}
            <h1
              className={`w-[900px] max-w-full rounded-none text-left text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white tracking-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] ${
                isMm
                  ? 'font-myanmar leading-[1.45] lg:leading-[77.24px]'
                  : 'leading-[1.18] lg:leading-[1.22]'
              }`}
            >
              {displayTitle}
            </h1>
            <p
              className={`text-base sm:text-lg text-white/95 leading-relaxed max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)] ${
                isMm ? 'font-myanmar' : ''
              }`}
            >
              {displayDescription}
            </p>
            {actions && <div className="mt-8 flex flex-wrap items-center gap-4">{actions}</div>}
          </div>

          {rightSlot && <div className="lg:col-span-5 flex flex-col">{rightSlot}</div>}
        </div>
      </div>
    </section>
  );
};

interface LoadingStateProps {
  label?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label = 'Processing your request...',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-3 p-6 bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl text-sm text-[#173D2A]"
    >
      <Loader2 className="w-5 h-5 animate-spin text-[#245C3A]" />
      <span className="font-medium">{label}</span>
    </div>
  );
};

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
}) => {
  const { t } = useLanguage();
  return (
    <div
      role="alert"
      className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-900 text-sm flex items-start justify-between gap-3"
    >
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
        <span>{message}</span>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-xs font-semibold text-red-700 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
        >
          {t('Dismiss', 'ပိတ်ရန်')}
        </button>
      )}
    </div>
  );
};

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Show floating button once user scrolls past the sticky site header (~120px)
      setIsVisible(window.scrollY > 140);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('Back to top', 'စာမျက်နှာ အပေါ်ဆုံးသို့ ပြန်သွားရန်')}
      title={t('Back to top', 'စာမျက်နှာ အပေါ်ဆုံးသို့ ပြန်သွားရန်')}
      className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-3.5 py-3 rounded-full bg-[#173D2A] hover:bg-[#245C3A] text-white border border-[#A8D977]/45 shadow-lg transition-all duration-300 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8D977] ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <span className="w-6 h-6 rounded-full bg-[#A8D977] text-[#173D2A] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5">
        <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
      </span>
      <span className="hidden sm:inline text-xs font-semibold tracking-wide pr-1">
        {t('Back to Top', 'အပေါ်သို့')}
      </span>
    </button>
  );
};

