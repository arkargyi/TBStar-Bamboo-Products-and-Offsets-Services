import React, { useEffect, useRef, useState } from 'react';
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

/**
 * Low-resolution Base64 SVG placeholders tailored to the color palette
 * of the 10 Bamboo Split & Bamboo Sticks product images and printing assets.
 */
export const PRODUCT_IMAGE_BASE64_PLACEHOLDERS: Record<string, string> = {
  // Bamboo Split Assets
  '/images/products/bamboo-split-main.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0VFRjVFRCIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjRDRFMkM4Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQzlCQTlCIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/images/products/bamboo-split-natural.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0Y1RjJFQSIvPjxzdG9wIG9mZnNldD0iNTUlIiBzdG9wLWNvbG9yPSIjREJDRkIzIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOTlCNTc4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/images/products/bamboo-split-wholesale.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzJBNDQzMiIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjOEI5Rjc2Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRDhDRkI4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/images/products/bamboo-split-featured.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0VBRjNFNiIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjQzdEOEI1Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQjhBQTg2Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/images/products/bamboo-split-texture.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0UyRDhDMiIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjQzhCOUEwIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjN0M5NDY0Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',

  // Bamboo Sticks Assets
  '/images/products/bamboo-sticks-main.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0YwRjRFQyIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjREJEMkJDIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQzBBRTg2Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/images/products/bamboo-sticks-natural.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0YzRUZFNCIvPjxzdG9wIG9mZnNldD0iNTUlIiBzdG9wLWNvbG9yPSIjRDVDN0E5Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjODhBMTY4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/images/products/bamboo-sticks-wholesale.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzJDNDUzNCIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjOTRBMjgyIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjREJDRkJBIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/images/products/bamboo-sticks-featured.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0VDRjJFNCIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjRDBDN0FCIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQjRBMjc4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/images/products/bamboo-sticks-texture.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0U2REMwNCIgc3RvcC1vcGFjaXR5PSIwLjIiLz48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRTVEREM2Ii8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNDQUI5OTkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM4Nzk2NjgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=',
};

const DEFAULT_BASE64_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzE3M0QyQSIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjMjQ1QzNBIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjM0E3NTUwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+';

export interface ProductImageSkeletonProps {
  placeholderDataUrl?: string;
  isLoaded: boolean;
}

/**
 * Reusable Skeleton Loader & Low-Resolution Base64 Placeholder overlay
 * that provides a smooth visual transition while product images load.
 */
export const ProductImageSkeleton: React.FC<ProductImageSkeletonProps> = ({
  placeholderDataUrl = DEFAULT_BASE64_PLACEHOLDER,
  isLoaded,
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-10 overflow-hidden pointer-events-none transition-opacity duration-500 ease-out ${
        isLoaded ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Low-resolution Base64 blur-up backdrop */}
      <img
        src={placeholderDataUrl}
        alt=""
         aria-hidden="true"
        className="w-full h-full object-cover scale-110 blur-md"
      />

      {/* Subtle brand-tinted surface & GPU-accelerated shimmer sweep */}
      <div className="absolute inset-0 bg-[#173D2A]/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-skeleton-shimmer" />
    </div>
  );
};

interface ProgressiveProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  imgClassName?: string;
}

const ProgressiveProductImage: React.FC<ProgressiveProductImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  imgClassName = 'w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]',
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  const placeholderDataUrl =
    PRODUCT_IMAGE_BASE64_PLACEHOLDERS[src] || DEFAULT_BASE64_PLACEHOLDER;

  return (
    <>
      <ProductImageSkeleton
        placeholderDataUrl={placeholderDataUrl}
        isLoaded={isLoaded}
      />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        referrerPolicy="no-referrer"
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`${imgClassName} transition-all duration-500 ease-out ${
          isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xs scale-[1.01]'
        }`}
      />
    </>
  );
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
        <div className="relative overflow-hidden rounded-md border border-white/15 group bg-[#173D2A]">
          <ProgressiveProductImage
            src="/images/products/bamboo-split-main.webp"
            alt="Natural Myanmar bamboo splits with nodes"
            width={400}
            height={300}
            loading="eager"
            fetchPriority="high"
            imgClassName="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#0E2619]/90 via-[#0E2619]/50 to-transparent px-2.5 py-1.5 flex items-center justify-between text-[10px] text-white">
            <span className="font-semibold truncate">
              {t('Bamboo Split (3mm)', 'ဝါးခြမ်းပြား (3mm)')}
            </span>
            <span className="text-[#A8D977] font-mono-tabular shrink-0">20&quot;–48&quot;</span>
          </div>
        </div>

        {/* Top-Right: Bamboo Sticks (30KG per bag) */}
        <div className="relative overflow-hidden rounded-md border border-white/15 group bg-[#173D2A]">
          <ProgressiveProductImage
            src="/images/products/bamboo-sticks-main.webp"
            alt="Natural bamboo sticks from Myanmar"
            width={400}
            height={300}
            loading="eager"
            imgClassName="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#0E2619]/90 via-[#0E2619]/50 to-transparent px-2.5 py-1.5 flex items-center justify-between text-[10px] text-white">
            <span className="font-semibold truncate">
              {t('Bamboo Sticks', 'ဝါးတံ (Bamboo Sticks)')}
            </span>
            <span className="text-[#A8D977] font-mono-tabular shrink-0">30KG/bag</span>
          </div>
        </div>

        {/* Bottom Span: One-Stop Offset Printing Services */}
        <div className="col-span-2 relative overflow-hidden rounded-md border border-white/15 group bg-[#173D2A]">
          <ProgressiveProductImage
            src="/assets/aistudio/Offset-Printing.svg"
            alt="TB Star Company Limited One-Stop Offset Printing Services — Books, Voucher Books & Brochures"
            width={800}
            height={300}
            imgClassName="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#0E2619]/90 via-[#0E2619]/50 to-transparent px-3 py-1.5 flex items-center justify-between text-[11px] text-white">
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
      <ProgressiveProductImage
        src={resolvedImage}
        alt={altText || defaultAlt}
        width={640}
        height={480}
        loading={loading}
        fetchPriority={fetchPriority}
      />
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#0E2619]/85 via-[#0E2619]/35 to-transparent px-4 py-2.5 flex items-center justify-between gap-2 text-[11px] text-white/95">
        <span className="truncate font-medium">{label || defaultLabel}</span>
        <span className="shrink-0 font-mono-tabular text-[#A8D977] font-semibold">
          {badgeText}
        </span>
      </div>
    </div>
  );
};
