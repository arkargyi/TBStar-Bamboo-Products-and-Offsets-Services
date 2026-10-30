import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Maximize2, Phone, Search, X } from 'lucide-react';
import {
  BambooProductItem,
  COMPANY_INFO,
  GalleryCategoryName,
  GalleryPreviewItem,
  InquiryTypeOption,
  PAGE_BACKGROUNDS,
  PageRoute,
  PrintingServiceItem,
  ProductCategoryId,
  SpecificationRow,
} from '../constants/companyData';
import { VisualAssetFrame } from './VisualAssetFrame';
import { AdaptiveBackgroundMedia, Button } from './SharedUI';
import { BambooProductIcon, PrintingServiceIcon } from './PrintingIcons';
import { GALLERY_CATEGORY_LABELS, useLanguage } from '../context/LanguageContext';

interface ProductSpecificationTableProps {
  title: string;
  titleMm?: string;
  subtitle?: string;
  subtitleMm?: string;
  specifications: SpecificationRow[];
  onInquire?: () => void;
  inquireLabel?: string;
  inquireLabelMm?: string;
}

export const ProductSpecificationTable: React.FC<ProductSpecificationTableProps> = ({
  title,
  titleMm,
  subtitle = 'TECHNICAL SPECIFICATION SHEET · 100% NATURAL MYANMAR BAMBOO',
  subtitleMm = 'အသေးစိတ် စံချိန်စံညွှန်းဇယား · ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်',
  specifications,
  onInquire,
  inquireLabel = 'Inquire About Specifications',
  inquireLabelMm = 'စုံစမ်းမေးမြန်းရန်',
}) => {
  const { isMm, t } = useLanguage();
  const safeSpecifications = Array.isArray(specifications) ? specifications : [];

  return (
    <div className="bg-white border border-[#DDE5D9] rounded-xl p-6 md:p-8 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[#DDE5D9]">
        <div>
          <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
            {isMm ? subtitleMm : subtitle}
          </p>
          <h3 className="text-lg md:text-xl font-bold text-[#173D2A]">
            {isMm && titleMm ? titleMm : title}
          </h3>
        </div>
        {onInquire && (
          <Button type="button" variant="primary-light" size="sm" onClick={onInquire}>
            {isMm ? inquireLabelMm : inquireLabel}
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>

      {safeSpecifications.length > 0 ? (
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full min-w-[540px] text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#DDE5D9] text-xs text-[#245C3A]">
                <th scope="col" className="py-3 pr-4 font-semibold w-1/3">
                  {t('Specification Parameter', 'အချက်အလက် အမျိုးအစား')}
                </th>
                <th scope="col" className="py-3 px-4 font-semibold w-1/3">
                  {t('Verified Value', 'သတ်မှတ် စံချိန်စံညွှန်း')}
                </th>
                <th scope="col" className="py-3 pl-4 font-semibold w-1/3">
                  {t('Supply & Origin Notes', 'ထုတ်လုပ်မှုနှင့် ပို့ကုန်မှတ်ချက်')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE5D9] text-xs">
              {safeSpecifications.map((row, idx) => (
                <tr
                  key={`${row.parameter}-${idx}`}
                  className="hover:bg-[#F6F8F3]/60 transition-colors"
                >
                  <th
                    scope="row"
                    className="py-3.5 pr-4 font-semibold text-[#173D2A] align-top"
                  >
                    {isMm && row.parameterMm ? row.parameterMm : row.parameter}
                  </th>
                  <td className="py-3.5 px-4 align-top font-bold text-[#173D2A]">
                    {isMm && row.valueMm ? row.valueMm : row.value}
                  </td>
                  <td className="py-3.5 pl-4 text-[#26332B]/80 align-top">
                    {isMm
                      ? row.notesMm || row.notes || 'ပြည်တွင်းနှင့် ပြည်ပပို့ကုန် စံချိန်စံညွှန်း'
                      : row.notes || 'Standard export & domestic specification'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xs text-[#26332B]/80">
          {t(
            'Contact TB Star Company Limited for detailed product specifications.',
            'အသေးစိတ် ကုန်ပစ္စည်း စံချိန်စံညွှန်းများအတွက် TBStar Company Limited သို့ ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။'
          )}
        </p>
      )}
    </div>
  );
};

interface ProductCardProps {
  product: BambooProductItem;
  onInquireProduct: (type: InquiryTypeOption) => void;
  onViewDetails?: () => void;
  useFeaturedImage?: boolean;
  imageLoading?: 'lazy' | 'eager';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onInquireProduct,
  onViewDetails,
  useFeaturedImage = false,
  imageLoading = 'lazy',
}) => {
  const { isMm, t } = useLanguage();

  const resolvedImagePath =
    useFeaturedImage && product.featuredImagePath
      ? product.featuredImagePath
      : product.imagePath;

  const resolvedAltText =
    useFeaturedImage && product.featuredImageAlt
      ? product.featuredImageAlt
      : product.imageAlt;

  const keySpecs = (product.specifications || []).filter(
    (s) =>
      s.parameter !== 'Product Name' &&
      s.parameter !== 'Product Category'
  );

  const featureList: string[] = (product.features || [])
    .map((f) => (isMm ? f.mm || f.labelMm || f.en : f.en || f.label || ''))
    .filter(Boolean);

  const detailsHref =
    product.href ||
    (product.sectionId ? `${product.route}#${product.sectionId}` : product.route);

  return (
    <article className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl overflow-hidden flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all duration-200">
      <div>
        <VisualAssetFrame
          type={product.visualType}
          imagePath={resolvedImagePath}
          altText={resolvedAltText}
          label={isMm && product.placeholderNoteMm ? product.placeholderNoteMm : product.placeholderNote}
          aspectClassName="aspect-[4/3]"
          loading={imageLoading}
        />

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="w-12 h-12 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9] flex items-center justify-center shrink-0 group-hover:border-[#245C3A] transition-colors">
              <BambooProductIcon type={product.visualType} className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono-tabular font-bold text-[#245C3A] pt-1">
              {product.index}
            </span>
          </div>

          <p className="text-xs text-[#245C3A] font-medium mb-1">
            {isMm ? product.categoryMm : product.category}
          </p>
          <h3 className="text-xl font-bold text-[#173D2A] mb-2.5">
            {isMm ? product.nameMm : product.name}
          </h3>
          <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
            {isMm ? product.shortDescriptionMm : product.shortDescription}
          </p>

          {keySpecs.length > 0 ? (
            <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-lg overflow-hidden">
              <div className="px-3.5 py-2 bg-[#173D2A] text-white text-xs font-semibold flex items-center justify-between">
                <span>{t('Key Specifications', 'အဓိက စံချိန်စံညွှန်းများ')}</span>
                <span className="font-mono-tabular text-[#A8D977]">
                  {t('Myanmar Origin', 'မြန်မာနိုင်ငံထုတ်')}
                </span>
              </div>
              <dl className="divide-y divide-[#DDE5D9] text-xs">
                {keySpecs.map((spec, idx) => (
                  <div
                    key={`${spec.parameter}-${idx}`}
                    className="px-3.5 py-2.5 flex items-start justify-between gap-4"
                  >
                    <dt className="text-[#26332B]/80 font-medium">
                      {isMm && spec.parameterMm ? spec.parameterMm : spec.parameter}
                    </dt>
                    <dd className="text-right text-[#173D2A] font-bold">
                      {isMm && spec.valueMm ? spec.valueMm : spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : featureList.length > 0 ? (
            <ul className="space-y-2 pt-4 border-t border-[#DDE5D9] text-xs text-[#26332B]/90">
              {featureList.map((feat) => (
                <li key={feat} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#245C3A] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-2.5">
        <Button
          type="button"
          variant="primary-dark"
          size="sm"
          href={`/contact?inquiry=${encodeURIComponent(product.inquiryType)}`}
          className="flex-1"
          onClick={() => onInquireProduct(product.inquiryType)}
        >
          {isMm ? 'စုံစမ်းမေးမြန်းရန်' : `Inquire: ${product.name}`}
          <ArrowRight className="w-3.5 h-3.5 text-[#A8D977]" />
        </Button>

        {onViewDetails && (
          <Button
            type="button"
            variant="outline-dark"
            size="sm"
            href={detailsHref}
            onClick={onViewDetails}
          >
            {t('Full Specs', 'အသေးစိတ်ကြည့်ရန်')}
          </Button>
        )}
      </div>
    </article>
  );
};

interface ServiceCardProps {
  service: PrintingServiceItem;
  onInquireService: (type: InquiryTypeOption) => void;
  onViewDetails?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onInquireService,
  onViewDetails,
}) => {
  const { isMm, t } = useLanguage();
  const points = isMm ? service.scopePointsMm : service.scopePoints;

  return (
    <article className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl overflow-hidden flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all duration-200">
      <div>
        <VisualAssetFrame
          type={service.visualType}
          imagePath={service.imagePath}
          label={isMm && service.placeholderNoteMm ? service.placeholderNoteMm : service.placeholderNote}
          aspectClassName="aspect-[4/3]"
        />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="w-12 h-12 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9] flex items-center justify-center shrink-0 group-hover:border-[#245C3A] transition-colors">
              <PrintingServiceIcon type={service.visualType} className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono-tabular font-bold text-[#245C3A] pt-1">
              {service.index}
            </span>
          </div>
          <p className="text-xs text-[#245C3A] font-medium mb-1">
            {isMm ? service.categoryMm : service.category}
          </p>
          <h3 className="text-xl font-bold text-[#173D2A] mb-2.5">
            {isMm ? service.nameMm : service.name}
          </h3>
          <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
            {isMm ? service.shortDescriptionMm : service.shortDescription}
          </p>

          <ul className="space-y-2.5 pt-4 border-t border-[#DDE5D9] text-xs text-[#26332B]/90">
            {points.map((pt) => (
              <li key={pt} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#245C3A] shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-2.5">
        <Button
          type="button"
          variant="subtle"
          size="sm"
          href={`/contact?inquiry=${encodeURIComponent(service.inquiryType)}`}
          className="flex-1"
          onClick={() => onInquireService(service.inquiryType)}
        >
          {isMm ? 'ဝန်ဆောင်မှု မေးမြန်းရန်' : `Inquire: ${service.name}`}
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>

        {onViewDetails && (
          <Button
            type="button"
            variant="outline-dark"
            size="sm"
            href={`/printing-services#service-${service.id}`}
            onClick={onViewDetails}
          >
            {t('Service Details', 'အသေးစိတ်ကြည့်ရန်')}
          </Button>
        )}
      </div>
    </article>
  );
};

interface GalleryGridProps {
  items: GalleryPreviewItem[];
  showCategoryFilters?: boolean;
  onInquireFromGallery?: (type: InquiryTypeOption) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  showCategoryFilters = true,
  onInquireFromGallery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | GalleryCategoryName>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryPreviewItem | null>(null);
  const { isMm, t } = useLanguage();

  useEffect(() => {
    if (!lightboxItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem]);

  const categories: ('All' | GalleryCategoryName)[] = [
    'All',
    'Bamboo Products',
    'Bamboo Production',
    'Packaging',
    'Printing Products',
    'Other Company Activities',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div>
      {showCategoryFilters && (
        <div
          role="tablist"
          aria-label="Gallery Categories"
          className="mb-8 flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F6F8F3] border border-[#DDE5D9] rounded-lg w-fit"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#173D2A] text-white'
                  : 'text-[#26332B] hover:text-[#173D2A] hover:bg-white/60'
              }`}
            >
              {isMm ? GALLERY_CATEGORY_LABELS[cat].mm : GALLERY_CATEGORY_LABELS[cat].en}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl overflow-hidden flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all duration-200"
          >
            <div className="relative">
              <VisualAssetFrame
                type={item.visualType}
                imagePath={item.imagePath}
                altText={item.altText}
                aspectClassName="aspect-[16/10]"
                label={isMm ? item.titleMm : item.title}
              />
              <button
                type="button"
                onClick={() => setLightboxItem(item)}
                className="absolute top-3 right-3 z-20 px-2.5 py-1.5 rounded-md bg-[#173D2A]/85 hover:bg-[#173D2A] text-white text-xs font-medium inline-flex items-center gap-1.5 border border-white/20 transition-colors cursor-pointer"
                aria-label={`Inspect enlarged preview for ${item.title}`}
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#A8D977]" />
                {t('View', 'ကြည့်ရှုရန်')}
              </button>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#245C3A] mb-1.5">
                  <span className="font-medium">
                    {isMm
                      ? GALLERY_CATEGORY_LABELS[item.category].mm
                      : GALLERY_CATEGORY_LABELS[item.category].en}
                  </span>
                  <span className="font-mono-tabular text-[#26332B]/65">
                    {t('TB Star Showcase', 'TBStar Company Limited')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#173D2A] mb-1.5">
                  {isMm ? item.titleMm : item.title}
                </h3>
                <p className="text-xs text-[#26332B]/80 leading-relaxed mb-3">
                  {isMm ? item.captionMm : item.caption}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DDE5D9] flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (onInquireFromGallery) {
                      onInquireFromGallery(
                        item.category === 'Printing Products'
                          ? 'Books Printing'
                          : item.visualType === 'bamboo-sticks'
                          ? 'Bamboo Sticks'
                          : 'Bamboo Split'
                      );
                    }
                  }}
                  className="font-semibold text-[#245C3A] hover:text-[#173D2A] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{t('Inquire Now', 'ဆက်သွယ်မေးမြန်းရန်')}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxItem(item)}
                  className="font-semibold text-[#173D2A] hover:text-[#245C3A] underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {t('Enlarge Photo', 'ပုံကြီးချဲ့ကြည့်ရန်')}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal for Enlarged Gallery Preview */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#173D2A]/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={isMm ? lightboxItem.titleMm : lightboxItem.title}
        >
          <div className="bg-white border border-[#DDE5D9] rounded-xl max-w-3xl w-full overflow-hidden shadow-xl">
            <div className="px-6 py-4 bg-[#173D2A] text-white flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#A8D977]">
                  {isMm
                    ? GALLERY_CATEGORY_LABELS[lightboxItem.category].mm
                    : GALLERY_CATEGORY_LABELS[lightboxItem.category].en}{' '}
                  · {t(COMPANY_INFO.name, 'TBStar Company Limited')}
                </p>
                <h3 className="text-lg font-bold text-white">
                  {isMm ? lightboxItem.titleMm : lightboxItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="p-2 text-white/75 hover:text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Close enlarged gallery view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <VisualAssetFrame
              type={lightboxItem.visualType}
              imagePath={lightboxItem.imagePath}
              altText={lightboxItem.altText}
              aspectClassName="aspect-[16/9]"
              label={isMm ? lightboxItem.titleMm : lightboxItem.title}
            />

            <div className="p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#173D2A] mb-1">
                  {isMm ? lightboxItem.captionMm : lightboxItem.caption}
                </p>
                <p className="text-xs text-[#245C3A] font-medium">
                  {t(
                    `${COMPANY_INFO.name} · Natural Myanmar Bamboo & One-Stop Offset Printing`,
                    'TBStar Company Limited · သဘာဝမြန်မာ့ဝါးထုတ်ကုန်နှင့် အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း'
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {onInquireFromGallery && (
                  <Button
                    type="button"
                    variant="primary-dark"
                    size="sm"
                    onClick={() => {
                      const cat = lightboxItem.category;
                      const vType = lightboxItem.visualType;
                      setLightboxItem(null);
                      onInquireFromGallery(
                        cat === 'Printing Products'
                          ? 'Books Printing'
                          : vType === 'bamboo-sticks'
                          ? 'Bamboo Sticks'
                          : 'Bamboo Split'
                      );
                    }}
                  >
                    {t('Inquire About This Product', 'ဤထုတ်ကုန်အကြောင်း မေးမြန်းရန်')}
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline-dark"
                  size="sm"
                  onClick={() => setLightboxItem(null)}
                >
                  {t('Close', 'ပိတ်ရန်')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface ContactCTAProps {
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
  backgroundRoute?: PageRoute;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({
  onNavigate,
  onInquireWithCategory,
  backgroundRoute = '/contact',
}) => {
  const { t } = useLanguage();
  const bgConfig = PAGE_BACKGROUNDS[backgroundRoute] || PAGE_BACKGROUNDS['/contact'];

  return (
    <section className="relative py-16 md:py-20 bg-[#071A10] text-white border-t border-[#245C3A] overflow-hidden">
      <AdaptiveBackgroundMedia
        bgConfig={bgConfig}
        loading="lazy"
        fetchPriority="low"
      />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#0B2316]/88 backdrop-blur-md border border-[#A8D977]/35 rounded-xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-mono-tabular text-[#A8D977] font-semibold mb-2">
                {t(
                  'DIRECT B2B & COMMERCIAL INQUIRIES · YANGON, MYANMAR',
                  'စီးပွားရေးလုပ်ငန်း ဆက်သွယ်မေးမြန်းရန် · ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ'
                )}
              </p>
              <h2
                className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                style={{ textWrap: 'balance' }}
              >
                {t(
                  "Let's Discuss Your Business Requirements",
                  'လူကြီးမင်းတို့၏ လုပ်ငန်းလိုအပ်ချက်များအတွက် ဆက်သွယ်ဆွေးနွေးနိုင်ပါသည်'
                )}
              </h2>
              <p className="text-sm sm:text-base text-white/95 leading-relaxed mb-6 max-w-2xl">
                {t(
                  `Contact ${COMPANY_INFO.name} for natural Myanmar bamboo export and distribution inquiries or one-stop offset printing services.`,
                  'သဘာဝဝါးထုတ်ကုန်များ ပြည်တွင်းဖြန့်ဖြူးရေး၊ ပြည်ပတင်ပို့ရေးနှင့် တစ်နေရာတည်းတွင် အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများအတွက် TBStar Company Limited သို့ ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။'
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="primary-light"
                  href="/contact"
                  onClick={() => onNavigate('/contact')}
                >
                  {t('Contact Us', 'ဆက်သွယ်ရန်')}
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button
                  type="button"
                  variant="outline-light"
                  href="/contact?inquiry=Bamboo%20Split"
                  onClick={() => onInquireWithCategory('Bamboo Split', true)}
                >
                  {t('Bamboo Product Inquiry', 'ဝါးထုတ်ကုန် မေးမြန်းရန်')}
                </Button>

                <Button
                  type="button"
                  variant="outline-light"
                  href="/contact?inquiry=Books%20Printing"
                  onClick={() => onInquireWithCategory('Books Printing', true)}
                >
                  {t('Printing Service Inquiry', 'ပုံနှိပ်လုပ်ငန်း မေးမြန်းရန်')}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#173D2A]/90 border border-white/15 rounded-xl p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#A8D977] mb-1">
                  {t('Direct Telephone Contact', 'တိုက်ရိုက် ဖုန်းဆက်သွယ်ရန်')}
                </p>
                <a
                  href={COMPANY_INFO.telephoneHref}
                  className="text-xl sm:text-2xl font-mono-tabular font-bold text-white hover:text-[#A8D977] transition-colors inline-flex items-center gap-2.5"
                >
                  <Phone className="w-5 h-5 text-[#A8D977]" />
                  {COMPANY_INFO.telephone}
                </a>
              </div>

              <div className="pt-4 border-t border-white/15 text-xs text-white/85 leading-relaxed space-y-1.5">
                <strong className="text-white block">
                  {t('Registered Office:', 'ရုံးချုပ်လိပ်စာ -')}
                </strong>
                <p>
                  {t(COMPANY_INFO.address.full, COMPANY_INFO.address.fullMm)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export interface ProductSearchCategoryTab {
  id: 'all' | ProductCategoryId;
  label: string;
  labelMm: string;
}

const DEFAULT_PRODUCT_SEARCH_TABS: ProductSearchCategoryTab[] = [
  { id: 'all', label: 'All Products', labelMm: 'ထုတ်ကုန်အားလုံး' },
  { id: 'bamboo', label: 'Natural Bamboo', labelMm: 'သဘာဝဝါးထုတ်ကုန်' },
  {
    id: 'activated-carbon',
    label: 'Activated Carbon',
    labelMm: 'အက်တီဗိတ်တက် ကာဗွန်',
  },
  { id: 'stationery', label: 'Stationery (Ball Pen)', labelMm: 'ဘောပင် (Ball Pen)' },
];

export interface ProductSearchSuggestion {
  label: string;
  labelMm: string;
  query: string;
}

const DEFAULT_QUICK_SUGGESTIONS: ProductSearchSuggestion[] = [
  { label: 'Bamboo Split', labelMm: 'ဝါးခြမ်းပြား', query: 'Bamboo Split' },
  { label: 'Bamboo Sticks', labelMm: 'ဝါးတံ', query: 'Bamboo Sticks' },
  { label: 'With Nodes', labelMm: 'အဆစ်ပါ (With Nodes)', query: 'With Nodes' },
  { label: '30 kg per bag', labelMm: 'တစ်အိတ် 30 kg', query: '30 kg' },
  { label: 'Activated Carbon', labelMm: 'Activated Carbon', query: 'Activated Carbon' },
  { label: 'Ball Pen (Klick / Plano)', labelMm: 'ဘောပင် (Klick / Plano)', query: 'Ball Pen' },
];

export interface ProductSearchBarProps {
  query: string;
  onQueryChange: (nextQuery: string) => void;
  totalCount: number;
  resultCount: number;
  selectedCategory?: 'all' | ProductCategoryId;
  onCategoryChange?: (category: 'all' | ProductCategoryId) => void;
  showCategoryTabs?: boolean;
  categoryTabs?: ProductSearchCategoryTab[];
  suggestions?: ProductSearchSuggestion[];
  placeholder?: string;
  placeholderMm?: string;
  inputId?: string;
}

export const ProductSearchBar: React.FC<ProductSearchBarProps> = ({
  query,
  onQueryChange,
  totalCount,
  resultCount,
  selectedCategory = 'all',
  onCategoryChange,
  showCategoryTabs = false,
  categoryTabs = DEFAULT_PRODUCT_SEARCH_TABS,
  suggestions = DEFAULT_QUICK_SUGGESTIONS,
  placeholder = 'Search products by name, description, dimension, or packaging (e.g. Bamboo Split, 30 kg, Without Nodes)...',
  placeholderMm = 'ထုတ်ကုန်အမည်၊ အကြောင်းအရာ၊ အရွယ်အစား သို့မဟုတ် ထုပ်ပိုးမှုဖြင့် ရှာဖွေပါ (ဥပမာ - ဝါးခြမ်းပြား၊ ဝါးတံ၊ 30 kg)...',
  inputId = 'tbstar-product-search-input',
}) => {
  const { isMm, t } = useLanguage();
  const hasActiveSearch = query.trim().length > 0;
  const hasActiveCategory = showCategoryTabs && selectedCategory !== 'all';

  return (
    <div className="bg-white border border-[#DDE5D9] rounded-xl p-4 sm:p-5 mb-8 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3.5">
        {/* Search Input Field */}
        <div className="relative flex-1">
          <label htmlFor={inputId} className="sr-only">
            {t('Search products by name and description', 'ထုတ်ကုန်အမည်နှင့် အကြောင်းအရာအလိုက် ရှာဖွေရန်')}
          </label>
          <Search
            className="w-4 h-4 text-[#245C3A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && hasActiveSearch) {
                e.preventDefault();
                onQueryChange('');
              }
            }}
            placeholder={isMm ? placeholderMm : placeholder}
            autoComplete="off"
            className="w-full min-h-[44px] pl-10 pr-10 py-2.5 text-sm text-[#173D2A] bg-[#F6F8F3] border border-[#DDE5D9] rounded-lg placeholder:text-[#26332B]/55 focus:bg-white focus:border-[#245C3A] focus:outline-none focus:ring-2 focus:ring-[#245C3A]/20 transition-colors"
          />
          {hasActiveSearch && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label={t('Clear search query', 'ရှာဖွေထားသည်ကို ပယ်ဖျက်ရန်')}
              className="w-8 h-8 rounded-md text-[#26332B]/70 hover:text-[#173D2A] hover:bg-[#DDE5D9]/50 flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Tabs (when enabled) */}
        {showCategoryTabs && onCategoryChange && (
          <div
            role="group"
            aria-label={t('Filter products by category', 'ကဏ္ဍအလိုက် စစ်ထုတ်ရန်')}
            className="flex flex-wrap items-center gap-1.5"
          >
            {categoryTabs.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onCategoryChange(tab.id)}
                  aria-pressed={isSelected}
                  className={`min-h-[40px] px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#173D2A] text-white border-[#173D2A]'
                      : 'bg-[#F6F8F3] text-[#173D2A] border-[#DDE5D9] hover:border-[#245C3A]'
                  }`}
                >
                  {isMm ? tab.labelMm : tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Filter Suggestions & Unboxed Live Result Metadata */}
      <div className="mt-3.5 pt-3 border-t border-[#DDE5D9]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[#26332B]/70 font-medium mr-1">
            {t('Quick filter:', 'အမြန်ရှာဖွေရန် -')}
          </span>
          {suggestions.map((suggestion) => {
            const isQueryActive =
              query.trim().toLowerCase() === suggestion.query.toLowerCase();
            return (
              <button
                key={suggestion.query}
                type="button"
                onClick={() =>
                  onQueryChange(isQueryActive ? '' : suggestion.query)
                }
                aria-pressed={isQueryActive}
                className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                  isQueryActive
                    ? 'bg-[#245C3A] text-white border-[#245C3A]'
                    : 'bg-[#F6F8F3] text-[#173D2A] border-[#DDE5D9] hover:border-[#245C3A]'
                }`}
              >
                {isMm ? suggestion.labelMm : suggestion.label}
              </button>
            );
          })}
        </div>

        <div
          aria-live="polite"
          className="flex flex-wrap items-center gap-2 text-xs text-[#26332B]/80 font-mono-tabular shrink-0"
        >
          <span>
            {isMm
              ? `စုစုပေါင်း ${totalCount} ခုအနက် ${resultCount} ခု ပြသထားသည်`
              : `Showing ${resultCount} of ${totalCount} ${
                  totalCount === 1 ? 'product' : 'products'
                }`}
          </span>
          {(hasActiveSearch || hasActiveCategory) && (
            <>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => {
                  onQueryChange('');
                  if (onCategoryChange) {
                    onCategoryChange('all');
                  }
                }}
                className="text-[#245C3A] hover:text-[#173D2A] font-semibold underline underline-offset-4 cursor-pointer"
              >
                {t('Reset filter', 'ပြန်လည်ရিসেတ်လုပ်ရန်')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export interface ProductSearchEmptyStateProps {
  query: string;
  onReset: () => void;
}

export const ProductSearchEmptyState: React.FC<ProductSearchEmptyStateProps> = ({
  query,
  onReset,
}) => {
  const { isMm, t } = useLanguage();

  return (
    <div className="bg-white border border-[#DDE5D9] rounded-xl p-8 sm:p-10 text-center my-4">
      <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-2">
        {t('NO MATCHING PRODUCTS FOUND', 'ရှာဖွေမှုနှင့် ကိုက်ညီသော ထုတ်ကုန် မတွေ့ရှိပါ')}
      </p>
      <h3 className="text-lg sm:text-xl font-bold text-[#173D2A] mb-2">
        {isMm
          ? `"${query}" နှင့် ကိုက်ညီသော ထုတ်ကုန် မရှိပါ`
          : `No products matched "${query}"`}
      </h3>
      <p className="text-sm text-[#26332B]/80 max-w-xl mx-auto mb-5 leading-relaxed">
        {t(
          'Try searching by product name (Bamboo Split, Bamboo Sticks, Activated Carbon, Ball Pen) or specification keywords (3 mm, With Nodes, Without Nodes, 30 kg, Klick, Plano).',
          'ထုတ်ကုန်အမည် (Bamboo Split၊ Bamboo Sticks၊ Activated Carbon၊ Ball Pen) သို့မဟုတ် အသေးစိတ်အချက်အလက်များ (3 mm၊ အဆစ်ပါ၊ အဆစ်မပါ၊ 30 kg၊ Klick၊ Plano) ဖြင့် ပြန်လည်ရှာဖွေကြည့်ပါ။'
        )}
      </p>
      <Button type="button" variant="primary-dark" size="sm" onClick={onReset}>
        {t('Clear Search & Show All Products', 'ရှာဖွေမှု ပယ်ဖျက်ပြီး ထုတ်ကုန်အားလုံး ပြန်ကြည့်ရန်')}
      </Button>
    </div>
  );
};

