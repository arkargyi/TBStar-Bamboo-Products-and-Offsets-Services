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
  'bamboo-split': '/assets/aistudio/Bamboo-Splits_4fe94386.jpeg',
  'bamboo-sticks': '/assets/aistudio/Bamboo-Sticks_1c5d3754.jpg',
  'bamboo-custom': '/assets/aistudio/Bamboo-Splits_4fe94386.jpeg',
  'books-printing': '/assets/aistudio/Offset-Printing.svg',
  'voucher-printing': '/assets/aistudio/Offset-Printing.svg',
  'commercial-printing': '/assets/aistudio/Offset-Printing.svg',
};

interface VisualAssetFrameProps {
  type: VisualAssetType;
  imagePath?: string;
  altText?: string;
  label?: string;
  aspectClassName?: string;
  showReplacementNote?: boolean;
}

export const VisualAssetFrame: React.FC<VisualAssetFrameProps> = ({
  type,
  imagePath,
  altText,
  label,
  aspectClassName = 'aspect-[4/3]',
}) => {
  const { t } = useLanguage();

  // Hero Dual-Division 3-Photo Showcase (replaces the SVG schematic boxes selected in Focus Mode)
  if (type === 'hero-bamboo' && !imagePath) {
    return (
      <div
        className={`relative w-full ${aspectClassName} overflow-hidden rounded-lg bg-[#112E1F] border border-white/15 p-2 grid grid-cols-2 grid-rows-2 gap-2 select-none`}
      >
        {/* Top-Left: Bamboo Split */}
        <div className="relative overflow-hidden rounded-md border border-white/15 group">
          <img
            src="/assets/aistudio/Bamboo-Splits_4fe94386.jpeg"
            alt="TB Star Company Limited Bamboo Split (3mm, 20 to 48 inches)"
            referrerPolicy="no-referrer"
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
            src="/assets/aistudio/Bamboo-Sticks_1c5d3754.jpg"
            alt="TB Star Company Limited Bamboo Sticks (1.2mm to 2.5mm, 30KG per bag)"
            referrerPolicy="no-referrer"
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
    '/assets/aistudio/Bamboo-Splits_4fe94386.jpeg';

  const defaultLabel =
    type === 'bamboo-split'
      ? t(
          'TB Star Company · Bamboo Split (3 mm · 20"–48")',
          'တီဘီစတား ကုမ္ပဏီ · ဝါးခြမ်းပြား (အထူ 3 mm · ၂၀"–၄၈")'
        )
      : type === 'bamboo-sticks'
      ? t(
          'TB Star Company · Bamboo Sticks (1.2–2.5 mm · 30KG/bag)',
          'တီဘီစတား ကုမ္ပဏီ · ဝါးတံ (1.2–2.5 mm · တစ်အိတ် 30KG)'
        )
      : type === 'bamboo-custom'
      ? t(
          'TB Star Company · 100% Natural Myanmar Bamboo Products',
          'တီဘီစတား ကုမ္ပဏီ · ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များ'
        )
      : t(
          'TB Star Company · One-Stop Offset Printing Services',
          'တီဘီစတား ကုမ္ပဏီ · တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း'
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
        alt={altText || label || defaultLabel}
        referrerPolicy="no-referrer"
        loading="lazy"
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
