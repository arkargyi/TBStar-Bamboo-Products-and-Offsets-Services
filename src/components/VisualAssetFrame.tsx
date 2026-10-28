import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export type VisualAssetType =
  | 'bamboo-split'
  | 'bamboo-sticks'
  | 'bamboo-custom'
  | 'books-printing'
  | 'voucher-printing'
  | 'commercial-printing'
  | 'hero-bamboo';

const DEFAULT_IMAGE_BY_TYPE: Record<Exclude<VisualAssetType, 'hero-bamboo'>, string> = {
  'bamboo-split': '/images/products/bamboo-split-main.webp',
  'bamboo-sticks': '/images/products/bamboo-sticks-main.webp',
  'bamboo-custom': '/images/products/bamboo-split-natural.webp',
  'books-printing': '/assets/aistudio/Offset-Printing.svg',
  'voucher-printing': '/assets/aistudio/Offset-Printing.svg',
  'commercial-printing': '/assets/aistudio/Offset-Printing.svg',
};

const DEFAULT_ALT_BY_TYPE: Record<Exclude<VisualAssetType, 'hero-bamboo'>, string> = {
  'bamboo-split': 'Natural Myanmar bamboo splits with nodes',
  'bamboo-sticks': 'Natural bamboo sticks from Myanmar',
  'bamboo-custom': 'Natural bamboo splits with authentic bamboo texture',
  'books-printing': 'TB Star Company Limited One-Stop Offset Books Printing Services',
  'voucher-printing': 'TB Star Company Limited Commercial Voucher Books Printing Services',
  'commercial-printing': 'TB Star Company Limited Commercial Offset Printing Services',
};

interface VisualAssetFrameProps {
  type: VisualAssetType;
  imagePath?: string;
  altText?: string;
  label?: string;
  aspectClassName?: string;
  showReplacementNote?: boolean;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export const VisualAssetFrame: React.FC<VisualAssetFrameProps> = ({
  type,
  imagePath,
  altText,
  label,
  aspectClassName = 'aspect-[4/3]',
  loading = 'lazy',
  fetchPriority,
}) => {
  const { t } = useLanguage();

  // Hero Dual-Division 3-Photo Showcase
  if (type === 'hero-bamboo' && !imagePath) {
    return (
      <div
        className={`relative w-full ${aspectClassName} overflow-hidden rounded-lg bg-[#112E1F] border border-white/15 p-2 grid grid-cols-2 grid-rows-2 gap-2 select-none`}
      >
        {/* Top-Left: Bamboo Split */}
        <div className="relative overflow-hidden rounded-md border border-white/15 group">
          <img
            src="/images/products/bamboo-split-main.webp"
            alt="Natural Myanmar bamboo splits with nodes"
            width={400}
            height={300}
            referrerPolicy="no-referrer"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E2619]/90 via-[#0E2619]/50 to-transparent px-2.5 py-1.5 flex items-center justify-between text-[10px] text-white">
            <span className="font-semibold truncate">
              {t('Bamboo Split (3mm)', 'ဝါးခြမ်းပြား (3mm)')}
            </span>
            <span className="text-[#A8D977] font-mono-tabular shrink-0">20&quot;–48&quot;</span>
          </div>
        </div>

        {/* Top-Right: Bamboo Sticks (30KG per bag) */}
        <div className="relative overflow-hidden rounded-md border border-white/15 group">
          <img
            src="/images/products/bamboo-sticks-main.webp"
            alt="Natural bamboo sticks from Myanmar"
            width={400}
            height={300}
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E2619]/90 via-[#0E2619]/50 to-transparent px-2.5 py-1.5 flex items-center justify-between text-[10px] text-white">
            <span className="font-semibold truncate">
              {t('Bamboo Sticks', 'ဝါးတံ (Bamboo Sticks)')}
            </span>
            <span className="text-[#A8D977] font-mono-tabular shrink-0">30KG/bag</span>
          </div>
        </div>

        {/* Bottom Span: One-Stop Offset Printing Services */}
        <div className="col-span-2 relative overflow-hidden rounded-md border border-white/15 group">
          <img
            src="/assets/aistudio/Offset-Printing.svg"
            alt="TB Star Company Limited One-Stop Offset Printing Services — Books, Voucher Books & Brochures"
            width={800}
            height={300}
            referrerPolicy="no-referrer"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E2619]/90 via-[#0E2619]/50 to-transparent px-3 py-1.5 flex items-center justify-between text-[11px] text-white">
            <span className="font-semibold truncate">
              {t(
                'One-Stop Offset Printing · Books & Voucher Books',
                'အော့ဖ်ဆက် ပုံနှိပ်လုပ်ငန်း · စာအုပ်နှင့် ဘောင်ချာစာအုပ်များ'
              )}
            </span>
            <span className="text-[#A8D977] font-mono-tabular shrink-0">
              {t('One-Stop Service', 'အပြီးအစီး ဝန်ဆောင်မှု')}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const resolvedImage =
    imagePath ||
    DEFAULT_IMAGE_BY_TYPE[type as Exclude<VisualAssetType, 'hero-bamboo'>] ||
    '/images/products/bamboo-split-main.webp';

  const defaultAlt =
    DEFAULT_ALT_BY_TYPE[type as Exclude<VisualAssetType, 'hero-bamboo'>] ||
    'Natural Myanmar bamboo splits with nodes';

  const defaultLabel =
    type === 'bamboo-split'
      ? t(
          'TB Star Company · Bamboo Split (3 mm · 20"–48")',
          'TBStar Company Limited · ဝါးခြမ်းပြား (အထူ 3 mm · ၂၀"–၄၈")'
        )
      : type === 'bamboo-sticks'
      ? t(
          'TB Star Company · Bamboo Sticks (1.2–2.5 mm · 30KG/bag)',
          'TBStar Company Limited · ဝါးတံ (1.2–2.5 mm · တစ်အိတ် 30KG)'
        )
      : type === 'bamboo-custom'
      ? t(
          'TB Star Company · 100% Natural Myanmar Bamboo Products',
          'TBStar Company Limited · ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များ'
        )
      : t(
          'TB Star Company · One-Stop Offset Printing Services',
          'TBStar Company Limited · တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း'
        );

  const badgeText =
    type === 'books-printing' ||
    type === 'voucher-printing' ||
    type === 'commercial-printing'
      ? t('One-Stop Press', 'အော့ဖ်ဆက် ပုံနှိပ်')
      : t('Myanmar Origin', 'မြန်မာနိုင်ငံထုတ်');

  return (
    <div
      className={`relative w-full ${aspectClassName} overflow-hidden bg-[#173D2A] text-white select-none`}
    >
      <img
        src={resolvedImage}
        alt={altText || defaultAlt}
        width={640}
        height={480}
        referrerPolicy="no-referrer"
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E2619]/85 via-[#0E2619]/35 to-transparent px-4 py-2.5 flex items-center justify-between gap-2 text-[11px] text-white/95">
        <span className="truncate font-medium">{label || defaultLabel}</span>
        <span className="shrink-0 font-mono-tabular text-[#A8D977] font-semibold">
          {badgeText}
        </span>
      </div>
    </div>
  );
};
