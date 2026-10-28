import React, { useState } from 'react';
import { ArrowRight, Check, Maximize2, Phone, X } from 'lucide-react';
import {
  BambooProductItem,
  COMPANY_INFO,
  GalleryCategoryName,
  GalleryPreviewItem,
  InquiryTypeOption,
  PageRoute,
  PrintingServiceItem,
  SpecificationRow,
} from '../data/companyData';
import { VisualAssetFrame } from './VisualAssetFrame';
import { Button } from './SharedUI';
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
            {specifications.map((row) => (
              <tr key={row.parameter} className="hover:bg-[#F6F8F3]/60 transition-colors">
                <th
                  scope="row"
                  className="py-3.5 pr-4 font-semibold text-[#173D2A] align-top"
                >
                  {isMm ? row.parameterMm : row.parameter}
                </th>
                <td className="py-3.5 px-4 align-top font-bold text-[#173D2A]">
                  {isMm ? row.valueMm : row.value}
                </td>
                <td className="py-3.5 pl-4 text-[#26332B]/80 align-top">
                  {isMm
                    ? row.notesMm || 'ပြည်တွင်းနှင့် ပြည်ပပို့ကုန် စံချိန်စံညွှန်း'
                    : row.notes || 'Standard export & domestic specification'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

          <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-lg overflow-hidden">
            <div className="px-3.5 py-2 bg-[#173D2A] text-white text-xs font-semibold flex items-center justify-between">
              <span>{t('Key Specifications', 'အဓိက စံချိန်စံညွှန်းများ')}</span>
              <span className="font-mono-tabular text-[#A8D977]">
                {t('Myanmar Origin', 'မြန်မာနိုင်ငံထုတ်')}
              </span>
            </div>
            <dl className="divide-y divide-[#DDE5D9] text-xs">
              {product.specifications
                .filter(
                  (s) =>
                    s.parameter !== 'Product Name' &&
                    s.parameter !== 'Product Category'
                )
                .map((spec) => (
                  <div
                    key={spec.parameter}
                    className="px-3.5 py-2.5 flex items-start justify-between gap-4"
                  >
                    <dt className="text-[#26332B]/80 font-medium">
                      {isMm ? spec.parameterMm : spec.parameter}
                    </dt>
                    <dd className="text-right text-[#173D2A] font-bold">
                      {isMm ? spec.valueMm : spec.value}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-2.5">
        <Button
          type="button"
          variant="primary-dark"
          size="sm"
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
}

export const ContactCTA: React.FC<ContactCTAProps> = ({
  onNavigate,
  onInquireWithCategory,
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-[#173D2A] text-white border-t border-[#245C3A]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#245C3A]/45 border border-[#A8D977]/30 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-mono-tabular text-[#A8D977] mb-2">
                {t(
                  'DIRECT B2B & COMMERCIAL INQUIRIES · YANGON, MYANMAR',
                  'စီးပွားရေးလုပ်ငန်း ဆက်သွယ်မေးမြန်းရန် · ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ'
                )}
              </p>
              <h2
                className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3"
                style={{ textWrap: 'balance' }}
              >
                {t(
                  "Let's Discuss Your Business Requirements",
                  'လူကြီးမင်းတို့၏ လုပ်ငန်းလိုအပ်ချက်များအတွက် ဆက်သွယ်ဆွေးနွေးနိုင်ပါသည်'
                )}
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-6 max-w-2xl">
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
                  onClick={() => onInquireWithCategory('Bamboo Split', true)}
                >
                  {t('Bamboo Product Inquiry', 'ဝါးထုတ်ကုန် မေးမြန်းရန်')}
                </Button>

                <Button
                  type="button"
                  variant="outline-light"
                  onClick={() => onInquireWithCategory('Books Printing', true)}
                >
                  {t('Printing Service Inquiry', 'ပုံနှိပ်လုပ်ငန်း မေးမြန်းရန်')}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#173D2A] border border-white/15 rounded-xl p-6 space-y-4">
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
