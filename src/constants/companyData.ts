export type PageRoute =
  | '/'
  | '/about'
  | '/bamboo-products'
  | '/charcoal'
  | '/printing-services'
  | '/gallery'
  | '/contact';

export type InquiryTypeOption =
  | 'Bamboo Split'
  | 'Bamboo Sticks'
  | 'Activated Carbon'
  | 'Books Printing'
  | 'Voucher Books Printing'
  | 'Other Offset Printing Services'
  | 'Ball Pen'
  | 'General Inquiry';

export const INQUIRY_TYPE_OPTIONS: InquiryTypeOption[] = [
  'Bamboo Split',
  'Bamboo Sticks',
  'Activated Carbon',
  'Books Printing',
  'Voucher Books Printing',
  'Other Offset Printing Services',
  'Ball Pen',
  'General Inquiry',
];

export const COMPANY_INFO = {
  name: 'TB Star Company Limited',
  nameMm: 'TBStar Company Limited',
  establishedYear: '2013',
  domain: 'tbstarcompany.com',
  canonicalBase: 'https://tbstarcompany.com',
  telephone: '+95 9 450048547',
  telephoneInternational: '+95 9 450048547',
  telephoneHref: 'tel:+959450048547',
  whatsappHref: 'https://wa.me/959450048547',
  logoPath: '/assets/aistudio/TBStar_073dded3.jpeg',
  tagline: 'Bamboo Export & Offset Printing',
  taglineMm: 'ဝါးပို့ကုန်နှင့် အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း',
  overview:
    'Established in 2013, TB Star Company Limited has been operating in Myanmar, serving domestic and international customers through its bamboo products and printing services businesses.',
  overviewMm:
    '၂၀၁၃ ခုနှစ်တွင် စတင်တည်ထောင်ခဲ့သော TBStar Company Limited သည် မြန်မာနိုင်ငံတွင် သဘာဝဝါးထုတ်ကုန်လုပ်ငန်းနှင့် အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုလုပ်ငန်းများဖြင့် ပြည်တွင်းနှင့် နိုင်ငံတကာ မိတ်ဖက်များအား ဝန်ဆောင်မှုပေးလျက်ရှိပါသည်။',
  seoDescription:
    'Established in 2013, TB Star Company Limited operates in Yangon, Myanmar, supplying 100% natural Myanmar bamboo products (Bamboo Split and Bamboo Sticks), Activated Carbon inquiries, and one-stop offset printing services and stationery (Klick and Plano Ball Pens).',
  address: {
    line1: 'Room No. 1103, 11th Floor, Central Tower',
    line2: 'Corner of 39th Street and Anawrahta Road',
    streetAddress:
      'Room No. 1103, 11th Floor, Central Tower, Corner of 39th Street and Anawrahta Road, Kyauktada Township',
    township: 'Kyauktada Township',
    city: 'Yangon',
    region: 'Yangon Region',
    postalCode: '11182',
    country: 'Myanmar',
    countryCode: 'MM',
    full: 'Room No. 1103, 11th Floor, Central Tower, Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon, Myanmar',
    fullMm:
      'အခန်းအမှတ် (၁၁၀၃)၊ (၁၁) လွှာ၊ Central Tower၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်၊ ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ။',
    shortAddress:
      'Room 1103, 11th Floor, Central Tower, 39th St & Anawrahta Rd, Kyauktada, Yangon',
    shortAddressMm:
      'အခန်း (၁၁၀၃)၊ (၁၁) လွှာ၊ Central Tower၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်၊ ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့',
  },
};

export interface CssFilterMetrics {
  brightness: number;
  contrast: number;
  saturate: number;
  cssFilter: string;
}

/**
 * Programmatically calculates CSS brightness, contrast, and saturation filters
 * based on an image's luminance (0–1) and highlight glare intensity (0–1)
 * so overlaying white/light typography achieves WCAG AAA legibility without
 * replacing the underlying image asset.
 */
export function computeLegibilityFilter(
  luminance: number,
  highlightIntensity: number
): CssFilterMetrics {
  const clampedLum = Math.min(1, Math.max(0.1, luminance));
  const clampedHigh = Math.min(1, Math.max(0.1, highlightIntensity));

  // Weight overall luminance and upper-quartile highlight glare
  const effectiveBrightness = clampedLum * 0.62 + clampedHigh * 0.38;
  const targetLuminance = 0.29;

  // Inverse brightness scaling to suppress blown-out highlights/skies
  const rawBrightness = targetLuminance / Math.max(effectiveBrightness, 0.35);
  const brightness = Number(
    Math.min(0.58, Math.max(0.34, rawBrightness)).toFixed(2)
  );

  // Compensate midtone separation as brightness is reduced
  const rawContrast = 1 + (1 - brightness) * 0.32;
  const contrast = Number(
    Math.min(1.24, Math.max(1.08, rawContrast)).toFixed(2)
  );

  // Temper oversaturated highlight channels so foreground text stands out cleanly
  const rawSaturate = 1 - clampedHigh * 0.18;
  const saturate = Number(
    Math.min(0.94, Math.max(0.8, rawSaturate)).toFixed(2)
  );

  return {
    brightness,
    contrast,
    saturate,
    cssFilter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`,
  };
}

export interface PageBackgroundConfig {
  imagePath: string;
  publicSourceUrl: string;
  alt: string;
  objectPosition: string;
  estimatedLuminance: number;
  highlightIntensity: number;
  filterMetrics: CssFilterMetrics;
  overlayGradient: string;
  vignetteGradient: string;
  overlayCss: string;
  vignetteCss: string;
  imageOpacityClass: string;
}

export const PAGE_BACKGROUNDS: Record<PageRoute, PageBackgroundConfig> = {
  '/': {
    imagePath: '/images/backgrounds/tbstar-hero-placeholder.svg',
    publicSourceUrl: '/images/backgrounds/tbstar-hero-placeholder.svg',
    alt: "Placeholder background image — to be replaced with TB Star Company Limited's own photos",
    objectPosition: 'object-center',
    estimatedLuminance: 0.78,
    highlightIntensity: 0.86,
    filterMetrics: computeLegibilityFilter(0.78, 0.86),
    overlayGradient:
      'bg-linear-to-r from-[#06170E]/92 via-[#0B2417]/84 to-[#123322]/68',
    vignetteGradient:
      'bg-linear-to-t from-[#05140C]/90 via-[#0A2015]/35 to-[#05140C]/68',
    overlayCss:
      'linear-gradient(90deg, rgba(5, 20, 12, 0.92) 0%, rgba(10, 34, 21, 0.84) 55%, rgba(16, 46, 30, 0.68) 100%)',
    vignetteCss:
      'linear-gradient(180deg, rgba(5, 18, 11, 0.70) 0%, rgba(9, 28, 18, 0.30) 50%, rgba(5, 20, 12, 0.88) 100%)',
    imageOpacityClass: 'opacity-70',
  },
  '/about': {
    imagePath: '/images/backgrounds/tbstar-hero-placeholder.svg',
    publicSourceUrl: '/images/backgrounds/tbstar-hero-placeholder.svg',
    alt: "Placeholder background image — to be replaced with TB Star Company Limited's own photos",
    objectPosition: 'object-center',
    estimatedLuminance: 0.82,
    highlightIntensity: 0.9,
    filterMetrics: computeLegibilityFilter(0.82, 0.9),
    overlayGradient:
      'bg-linear-to-r from-[#06180F]/94 via-[#0C2618]/86 to-[#133523]/72',
    vignetteGradient:
      'bg-linear-to-t from-[#06180F]/90 via-[#0A2015]/38 to-[#06180F]/68',
    overlayCss:
      'linear-gradient(90deg, rgba(6, 22, 14, 0.93) 0%, rgba(11, 36, 23, 0.86) 58%, rgba(17, 49, 32, 0.72) 100%)',
    vignetteCss:
      'linear-gradient(180deg, rgba(5, 18, 11, 0.72) 0%, rgba(9, 29, 19, 0.35) 50%, rgba(6, 22, 14, 0.90) 100%)',
    imageOpacityClass: 'opacity-65',
  },
  '/bamboo-products': {
    imagePath: '/images/backgrounds/tbstar-hero-placeholder.svg',
    publicSourceUrl: '/images/backgrounds/tbstar-hero-placeholder.svg',
    alt: "Placeholder background image — to be replaced with TB Star Company Limited's own photos",
    objectPosition: 'object-center',
    estimatedLuminance: 0.76,
    highlightIntensity: 0.84,
    filterMetrics: computeLegibilityFilter(0.76, 0.84),
    overlayGradient:
      'bg-linear-to-r from-[#06170E]/92 via-[#0C2618]/84 to-[#133523]/68',
    vignetteGradient:
      'bg-linear-to-t from-[#06170E]/90 via-[#0A2015]/35 to-[#06170E]/68',
    overlayCss:
      'linear-gradient(90deg, rgba(6, 22, 13, 0.92) 0%, rgba(11, 36, 23, 0.84) 55%, rgba(18, 50, 33, 0.68) 100%)',
    vignetteCss:
      'linear-gradient(180deg, rgba(5, 19, 12, 0.70) 0%, rgba(10, 31, 20, 0.32) 50%, rgba(6, 22, 13, 0.88) 100%)',
    imageOpacityClass: 'opacity-70',
  },
  '/charcoal': {
    imagePath: '/images/backgrounds/tbstar-hero-placeholder.svg',
    publicSourceUrl: '/images/backgrounds/tbstar-hero-placeholder.svg',
    alt: "Placeholder background image — to be replaced with TB Star Company Limited's own photos",
    objectPosition: 'object-center',
    estimatedLuminance: 0.54,
    highlightIntensity: 0.6,
    filterMetrics: computeLegibilityFilter(0.54, 0.6),
    overlayGradient:
      'bg-linear-to-r from-[#07130E]/94 via-[#0D2118]/86 to-[#132E21]/72',
    vignetteGradient:
      'bg-linear-to-t from-[#07130E]/92 via-[#0B1C14]/38 to-[#07130E]/68',
    overlayCss:
      'linear-gradient(90deg, rgba(7, 18, 13, 0.93) 0%, rgba(12, 31, 22, 0.86) 58%, rgba(18, 45, 32, 0.72) 100%)',
    vignetteCss:
      'linear-gradient(180deg, rgba(6, 15, 11, 0.72) 0%, rgba(10, 25, 18, 0.36) 50%, rgba(7, 18, 13, 0.90) 100%)',
    imageOpacityClass: 'opacity-65',
  },
  '/printing-services': {
    imagePath: '/images/backgrounds/tbstar-hero-placeholder.svg',
    publicSourceUrl: '/images/backgrounds/tbstar-hero-placeholder.svg',
    alt: "Placeholder background image — to be replaced with TB Star Company Limited's own photos",
    objectPosition: 'object-center',
    estimatedLuminance: 0.79,
    highlightIntensity: 0.85,
    filterMetrics: computeLegibilityFilter(0.79, 0.85),
    overlayGradient:
      'bg-linear-to-r from-[#06180F]/94 via-[#0C2618]/86 to-[#133422]/72',
    vignetteGradient:
      'bg-linear-to-t from-[#06180F]/90 via-[#0B2115]/38 to-[#06180F]/68',
    overlayCss:
      'linear-gradient(90deg, rgba(6, 23, 14, 0.93) 0%, rgba(12, 37, 24, 0.86) 58%, rgba(18, 51, 34, 0.72) 100%)',
    vignetteCss:
      'linear-gradient(180deg, rgba(5, 19, 12, 0.72) 0%, rgba(10, 31, 20, 0.35) 50%, rgba(6, 23, 14, 0.90) 100%)',
    imageOpacityClass: 'opacity-65',
  },
  '/gallery': {
    imagePath: '/images/backgrounds/tbstar-hero-placeholder.svg',
    publicSourceUrl: '/images/backgrounds/tbstar-hero-placeholder.svg',
    alt: "Placeholder background image — to be replaced with TB Star Company Limited's own photos",
    objectPosition: 'object-center',
    estimatedLuminance: 0.8,
    highlightIntensity: 0.88,
    filterMetrics: computeLegibilityFilter(0.8, 0.88),
    overlayGradient:
      'bg-linear-to-r from-[#06180F]/94 via-[#0C2618]/86 to-[#133422]/72',
    vignetteGradient:
      'bg-linear-to-t from-[#06180F]/90 via-[#0B2115]/38 to-[#06180F]/68',
    overlayCss:
      'linear-gradient(90deg, rgba(6, 23, 14, 0.93) 0%, rgba(12, 37, 24, 0.86) 58%, rgba(18, 51, 34, 0.72) 100%)',
    vignetteCss:
      'linear-gradient(180deg, rgba(5, 19, 12, 0.72) 0%, rgba(10, 31, 20, 0.35) 50%, rgba(6, 23, 14, 0.90) 100%)',
    imageOpacityClass: 'opacity-65',
  },
  '/contact': {
    imagePath: '/images/backgrounds/tbstar-hero-placeholder.svg',
    publicSourceUrl: '/images/backgrounds/tbstar-hero-placeholder.svg',
    alt: "Placeholder background image — to be replaced with TB Star Company Limited's own photos",
    objectPosition: 'object-center',
    estimatedLuminance: 0.84,
    highlightIntensity: 0.92,
    filterMetrics: computeLegibilityFilter(0.84, 0.92),
    overlayGradient:
      'bg-linear-to-r from-[#06180F]/94 via-[#0C2618]/86 to-[#133422]/72',
    vignetteGradient:
      'bg-linear-to-t from-[#06180F]/90 via-[#0B2115]/38 to-[#06180F]/68',
    overlayCss:
      'linear-gradient(90deg, rgba(6, 23, 14, 0.93) 0%, rgba(12, 37, 24, 0.86) 58%, rgba(18, 51, 34, 0.72) 100%)',
    vignetteCss:
      'linear-gradient(180deg, rgba(5, 19, 12, 0.72) 0%, rgba(10, 31, 20, 0.35) 50%, rgba(6, 23, 14, 0.90) 100%)',
    imageOpacityClass: 'opacity-65',
  },
};

export interface SpecificationRow {
  parameter: string;
  parameterMm?: string;
  value: string;
  valueMm?: string;
  notes?: string;
  notesMm?: string;
}

export interface ProductDescriptions {
  short: string;
  shortMm?: string;
  detailed: string;
  detailedMm?: string;
}

export interface ProductImages {
  main: string;
  mainAlt: string;
  featured?: string;
  featuredAlt?: string;
  natural?: string;
  naturalAlt?: string;
  wholesale?: string;
  wholesaleAlt?: string;
  texture?: string;
  textureAlt?: string;
  secondary?: string;
  secondaryAlt?: string;
}

export interface ProductFeatureItem {
  label?: string;
  labelMm?: string;
  en: string;
  mm?: string;
}

export interface ProductSeoMetadata {
  title?: string;
  description?: string;
  ogImage?: string;
  ogImageAlt?: string;
  canonicalAnchor?: string;
}

export interface ProductDetailSubCard {
  kicker: string;
  kickerMm?: string;
  title: string;
  titleMm?: string;
  description: string;
  descriptionMm?: string;
  imagePath: string;
  imageAlt: string;
  frameLabel: string;
  frameLabelMm?: string;
}

export interface BallPenVariant {
  type: string;
  typeMm: string;
  packaging: string;
  packagingMm: string;
}

export type ProductCategoryId =
  | 'bamboo'
  | 'activated-carbon'
  | 'stationery';

export type ProductVisualType =
  | 'bamboo-split'
  | 'bamboo-sticks'
  | 'bamboo-custom'
  | 'charcoal'
  | 'commercial-printing';

/**
 * Flexible input schema for adding or updating a product in the centralized catalog.
 * Optional fields are safely normalized with verified defaults.
 */
export interface CentralizedProductInput {
  id: string;
  slug?: string;
  index?: string;
  name: string;
  nameMm?: string;
  footerLabel?: string;
  footerLabelMm?: string;
  category: ProductCategoryId | string;
  categoryLabel?: string;
  categoryMm?: string;
  descriptions?: ProductDescriptions;
  shortDescription?: string;
  shortDescriptionMm?: string;
  detailedDescription?: string;
  detailedDescriptionMm?: string;
  visualType?: ProductVisualType;
  images?: ProductImages;
  imagePath?: string;
  imageAlt?: string;
  featuredImagePath?: string;
  featuredImageAlt?: string;
  naturalImagePath?: string;
  naturalImageAlt?: string;
  wholesaleImagePath?: string;
  wholesaleImageAlt?: string;
  textureImagePath?: string;
  textureImageAlt?: string;
  secondaryImagePath?: string;
  secondaryImageAlt?: string;
  placeholderNote?: string;
  placeholderNoteMm?: string;
  inquiryType?: InquiryTypeOption;
  specifications?: SpecificationRow[];
  features?: (string | ProductFeatureItem)[];
  variants?: BallPenVariant[];
  detailSubCards?: ProductDetailSubCard[];
  published?: boolean;
  featured?: boolean;
  route?: PageRoute;
  sectionId?: string;
  relatedProductIds?: string[];
  seo?: ProductSeoMetadata;
}

/**
 * Normalized product item guaranteed to have safe defaults for all UI components,
 * listings, cards, links, related products, and SEO structured data.
 */
export interface BambooProductItem {
  id: string;
  slug: string;
  index: string;
  name: string;
  nameMm: string;
  footerLabel: string;
  footerLabelMm: string;
  category: string;
  categoryKey: ProductCategoryId | string;
  categoryMm: string;
  descriptions: Required<ProductDescriptions>;
  shortDescription: string;
  shortDescriptionMm: string;
  detailedDescription: string;
  detailedDescriptionMm: string;
  visualType: 'bamboo-split' | 'bamboo-sticks' | 'bamboo-custom' | 'charcoal';
  images: ProductImages;
  imagePath: string;
  imageAlt: string;
  featuredImagePath?: string;
  featuredImageAlt?: string;
  naturalImagePath?: string;
  naturalImageAlt?: string;
  wholesaleImagePath?: string;
  wholesaleImageAlt?: string;
  textureImagePath?: string;
  textureImageAlt?: string;
  secondaryImagePath?: string;
  secondaryImageAlt?: string;
  placeholderNote: string;
  placeholderNoteMm: string;
  inquiryType: InquiryTypeOption;
  specifications: SpecificationRow[];
  features: ProductFeatureItem[];
  variants: BallPenVariant[];
  detailSubCards: ProductDetailSubCard[];
  published: boolean;
  featured: boolean;
  route: PageRoute;
  sectionId: string;
  href: string;
  relatedProductIds: string[];
  seo: Required<ProductSeoMetadata>;
}

/**
 * Single centralized product catalog source of truth.
 * To add, update, unpublish, or remove a product across the entire website,
 * edit this array — listings, cards, navigation links, related products,
 * and JSON-LD structured data update automatically.
 */
export const RAW_CENTRALIZED_PRODUCTS: CentralizedProductInput[] = [
  {
    id: 'bamboo-split',
    slug: 'bamboo-split',
    index: '01',
    name: 'Bamboo Split',
    nameMm: 'ဝါးခြမ်းပြား (Bamboo Split)',
    footerLabel: 'Bamboo Split (3 mm · 20–48 inches)',
    footerLabelMm: 'ဝါးခြမ်းပြား (အထူ 3 mm · ၂၀–၄၈ လက်မ)',
    category: 'bamboo',
    categoryLabel: '100% Natural Bamboo · Domestic & Export Supply',
    categoryMm: '၁၀၀% သဘာဝ မြန်မာ့ဝါး · ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်',
    descriptions: {
      short:
        '100% natural Myanmar bamboo splits in 3 mm thickness and 20 to 48 inch lengths, available with nodes or without nodes.',
      shortMm:
        '၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ်ဖြင့် ထုတ်လုပ်ထားသော အထူ 3 mm၊ အရှည် ၂၀ လက်မမှ ၄၈ လက်မ ဝါးခြမ်းပြားများ။ အဆစ်ပါ (With Nodes) သို့မဟုတ် အဆစ်မပါ (Without Nodes) ရရှိနိုင်ပါသည်။',
      detailed:
        'Manufactured from 100% natural bamboo originating in Myanmar, our Bamboo Split is processed to a 3 mm thickness across lengths from 20 to 48 inches. Available with nodes or without nodes for domestic distribution in Myanmar and international export.',
      detailedMm:
        'မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးစစ်စစ်ဖြင့် အထူ 3 mm နှင့် အရှည် ၂၀ လက်မမှ ၄၈ လက်မအထိ ထုတ်လုပ်ထားပါသည်။ အဆစ်ပါ (With Nodes) သို့မဟုတ် အဆစ်မပါ (Without Nodes) ရရှိနိုင်ပြီး ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်အတွက် ထုတ်လုပ်ပေးပါသည်။',
    },
    visualType: 'bamboo-split',
    images: {
      main: '/images/products/bamboo-split-main.webp',
      mainAlt: 'Natural Myanmar bamboo splits with nodes',
      featured: '/images/products/bamboo-split-featured.webp',
      featuredAlt: 'Featured natural Myanmar bamboo splits for export and domestic supply',
      natural: '/images/products/bamboo-split-natural.webp',
      naturalAlt: 'Natural bamboo splits with authentic bamboo texture',
      wholesale: '/images/products/bamboo-split-wholesale.webp',
      wholesaleAlt: 'Bamboo splits bundled for commercial supply',
      texture: '/images/products/bamboo-split-texture.webp',
      textureAlt: 'Close-up texture of 3 mm natural Myanmar bamboo splits',
    },
    placeholderNote: 'Bamboo Split · 3 mm · 20–48 inches · With Nodes or Without Nodes',
    placeholderNoteMm: 'ဝါးခြမ်းပြား · အထူ 3 mm · ၂၀–၄၈ လက်မ · အဆစ်ပါ သို့မဟုတ် အဆစ်မပါ',
    inquiryType: 'Bamboo Split',
    published: true,
    featured: true,
    route: '/bamboo-products',
    sectionId: 'product-bamboo-split',
    relatedProductIds: ['bamboo-sticks'],
    features: [
      {
        label: 'Type: With Nodes',
        labelMm: 'အမျိုးအစား - အဆစ်ပါ (With Nodes)',
        en: '3 mm thickness · 20 to 48 inches · With nodes',
        mm: 'အထူ 3 mm · အရှည် ၂၀ မှ ၄၈ လက်မ · အဆစ်ပါ',
      },
      {
        label: 'Type: Without Nodes',
        labelMm: 'အမျိုးအစား - အဆစ်မပါ (Without Nodes)',
        en: '3 mm thickness · 20 to 48 inches · Without nodes',
        mm: 'အထူ 3 mm · အရှည် ၂၀ မှ ၄၈ လက်မ · အဆစ်မပါ',
      },
    ],
    detailSubCards: [
      {
        kicker: 'PRODUCT TYPES · WITH NODES & WITHOUT NODES',
        kickerMm: 'အမျိုးအစား · အဆစ်ပါ နှင့် အဆစ်မပါ',
        title: 'With Nodes & Without Nodes Bamboo Split',
        titleMm: 'အဆစ်ပါ (With Nodes) နှင့် အဆစ်မပါ (Without Nodes) ဝါးခြမ်းပြား',
        description:
          '100% natural Myanmar bamboo splits in 3 mm thickness and 20 to 48 inch lengths, available with nodes or without nodes.',
        descriptionMm:
          '၁၀၀% သဘာဝ မြန်မာ့ဝါးခြမ်းပြားများကို အထူ 3 mm၊ အရှည် ၂၀ မှ ၄၈ လက်မဖြင့် အဆစ်ပါ သို့မဟုတ် အဆစ်မပါ ရရှိနိုင်ပါသည်။',
        imagePath: '/images/products/bamboo-split-texture.webp',
        imageAlt: 'Close-up texture of 3 mm natural Myanmar bamboo splits',
        frameLabel: 'Bamboo Split · With Nodes & Without Nodes Texture',
        frameLabelMm: 'ဝါးခြမ်းပြား · အဆစ်ပါ နှင့် အဆစ်မပါ သဘာဝဝါးအသားဖွဲ့စည်းပုံ',
      },
      {
        kicker: 'DOMESTIC & EXPORT SUPPLY',
        kickerMm: 'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်',
        title: 'Bundled Natural Myanmar Bamboo Split',
        titleMm: 'ပြည်တွင်းနှင့် ပြည်ပပို့ကုန်အတွက် သဘာဝဝါးခြမ်းပြား',
        description:
          'Prepared from 100% natural bamboo originating in Myanmar for domestic distribution and international export.',
        descriptionMm:
          'မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးစစ်စစ်ဖြင့် ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် နိုင်ငံတကာ ပြည်ပပို့ကုန်အတွက် ထုတ်လုပ်ထားပါသည်။',
        imagePath: '/images/products/bamboo-split-wholesale.webp',
        imageAlt: 'Bamboo splits bundled for commercial supply',
        frameLabel: 'Bamboo Split · Domestic & Export Supply',
        frameLabelMm: 'ဝါးခြမ်းပြား · ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်',
      },
    ],
    specifications: [
      {
        parameter: 'Product Name',
        parameterMm: 'ကုန်ပစ္စည်းအမည်',
        value: 'Bamboo Split',
        valueMm: 'ဝါးခြမ်းပြား (Bamboo Split)',
        notes: 'Natural bamboo product line',
        notesMm: 'သဘာဝဝါးထုတ်ကုန်',
      },
      {
        parameter: 'Material',
        parameterMm: 'ကုန်ကြမ်းအမျိုးအစား',
        value: '100% Natural Bamboo',
        valueMm: '၁၀၀% သဘာဝ ဝါးစစ်စစ်',
        notes: 'Natural bamboo from Myanmar',
        notesMm: 'သဘာဝ မြန်မာ့ဝါးစစ်စစ်',
      },
      {
        parameter: 'Thickness',
        parameterMm: 'အထူ (Thickness)',
        value: '3 mm',
        valueMm: '3 mm (၃ မီလီမီတာ)',
        notes: 'Standard thickness',
        notesMm: 'အထူစံနှုန်း',
      },
      {
        parameter: 'Length',
        parameterMm: 'အရှည် (Length)',
        value: '20 to 48 inches',
        valueMm: '၂၀ လက်မ မှ ၄၈ လက်မ (20 to 48 inches)',
        notes: 'Available length range',
        notesMm: 'ရရှိနိုင်သော အရှည်အတိုင်းအတာ',
      },
      {
        parameter: 'Available Types',
        parameterMm: 'ရရှိနိုင်သော အမျိုးအစားများ',
        value: 'With Nodes / Without Nodes',
        valueMm: 'အဆစ်ပါ (With Nodes) / အဆစ်မပါ (Without Nodes)',
        notes: 'With nodes or without nodes',
        notesMm: 'အဆစ်ပါ သို့မဟုတ် အဆစ်မပါ',
      },
      {
        parameter: 'Origin',
        parameterMm: 'မူရင်းဒေသ (Origin)',
        value: 'Myanmar',
        valueMm: 'မြန်မာနိုင်ငံ (Myanmar)',
        notes: 'Domestic distribution & international export',
        notesMm: 'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်',
      },
    ],
    seo: {
      title: 'Bamboo Split (3 mm · 20–48 inches) – 100% Natural Myanmar Bamboo | TB Star',
      description:
        '100% natural Myanmar Bamboo Split in 3 mm thickness and 20 to 48 inch lengths, available with nodes or without nodes.',
      ogImage: `${COMPANY_INFO.canonicalBase}/images/products/bamboo-split-main.webp`,
      ogImageAlt: 'Natural Myanmar bamboo splits with nodes',
      canonicalAnchor: `${COMPANY_INFO.canonicalBase}/bamboo-products#product-bamboo-split`,
    },
  },
  {
    id: 'bamboo-sticks',
    slug: 'bamboo-sticks',
    index: '02',
    name: 'Bamboo Sticks',
    nameMm: 'ဝါးတံ (Bamboo Sticks)',
    footerLabel: 'Bamboo Sticks (8", 9", 10" · 30 kg/bag)',
    footerLabelMm: 'ဝါးတံ (၈"၊ ၉"၊ ၁၀" · တစ်အိတ် 30 kg)',
    category: 'bamboo',
    categoryLabel: '100% Natural Bamboo · Domestic & Export Supply',
    categoryMm: '၁၀၀% သဘာဝ မြန်မာ့ဝါး · ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်',
    descriptions: {
      short:
        '100% natural Myanmar bamboo sticks in 1.2 to 2.5 mm thickness across 8, 9, and 10 inch sizes, packed 30 kg per bag.',
      shortMm:
        '၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ်ဖြင့် ထုတ်လုပ်ထားသော အထူ 1.2 မှ 2.5 mm၊ အရွယ်အစား ၈ လက်မ၊ ၉ လက်မ နှင့် ၁၀ လက်မ ဝါးတံများကို တစ်အိတ်လျှင် 30 kg ထုပ်ပိုးထားပါသည်။',
      detailed:
        'Manufactured from 100% natural bamboo originating in Myanmar, our Bamboo Sticks are supplied in thicknesses from 1.2 to 2.5 mm and sizes of 8, 9, and 10 inches, packed 30 kg per bag for domestic distribution in Myanmar and international export.',
      detailedMm:
        'မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးစစ်စစ်ဖြင့် အထူ 1.2 မှ 2.5 mm နှင့် အရွယ်အစား ၈ လက်မ၊ ၉ လက်မ၊ ၁၀ လက်မ ဝါးတံများကို ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် နိုင်ငံတကာ ပြည်ပပို့ကုန်အတွက် တစ်အိတ်လျှင် ၃၀ ကီလိုဂရမ် (30 kg per bag) ထုပ်ပိုးထားပါသည်။',
    },
    visualType: 'bamboo-sticks',
    images: {
      main: '/images/products/bamboo-sticks-main.webp',
      mainAlt: 'Natural bamboo sticks from Myanmar',
      featured: '/images/products/bamboo-sticks-featured.webp',
      featuredAlt: 'Featured natural Myanmar bamboo sticks packed at 30 kg per bag',
      natural: '/images/products/bamboo-sticks-natural.webp',
      naturalAlt: 'Natural bamboo sticks in 8, 9, and 10 inch lengths',
      wholesale: '/assets/aistudio/bamboo-sticks-wholesale_d8d4d6b3.webp',
      wholesaleAlt: 'Bamboo sticks prepared in 30 kg bags for commercial supply',
      texture: '/images/products/bamboo-sticks-texture.webp',
      textureAlt: 'Close-up texture of 1.2 mm to 2.5 mm natural Myanmar bamboo sticks',
    },
    placeholderNote: 'Bamboo Sticks · 1.2–2.5 mm · 8", 9", 10" · 30 kg per bag',
    placeholderNoteMm: 'ဝါးတံ · အထူ 1.2–2.5 mm · ၈"၊ ၉"၊ ၁၀" · တစ်အိတ် 30 kg',
    inquiryType: 'Bamboo Sticks',
    published: true,
    featured: true,
    route: '/bamboo-products',
    sectionId: 'product-bamboo-sticks',
    relatedProductIds: ['bamboo-split'],
    detailSubCards: [
      {
        kicker: 'MATERIAL TEXTURE & APPEARANCE',
        kickerMm: 'သဘာဝဝါးအသားနှင့် အသွင်အပြင်',
        title: '1.2–2.5 mm Natural Bamboo Stick Texture',
        titleMm: 'အထူ 1.2–2.5 mm သဘာဝဝါးတံ အသေးစိတ်ပုံစံ',
        description:
          'Close-up physical appearance of 100% natural Myanmar bamboo sticks in 1.2 to 2.5 mm thickness.',
        descriptionMm:
          'အထူ 1.2 မှ 2.5 mm ရှိသော ၁၀၀% သဘာဝ မြန်မာ့ဝါးတံများ၏ အသားဖွဲ့စည်းပုံ။',
        imagePath: '/images/products/bamboo-sticks-texture.webp',
        imageAlt: 'Close-up texture of 1.2 mm to 2.5 mm natural Myanmar bamboo sticks',
        frameLabel: 'Bamboo Sticks · 1.2–2.5 mm Cross-Section & Texture',
        frameLabelMm: 'ဝါးတံ · အထူ 1.2–2.5 mm နှင့် သဘာဝဝါးအသားဖွဲ့စည်းပုံ',
      },
      {
        kicker: 'COMMERCIAL & WHOLESALE SUPPLY',
        kickerMm: 'လက်ကားနှင့် ပြည်ပပို့ကုန်',
        title: '30 kg per Bag Commercial Packaging',
        titleMm: 'တစ်အိတ်လျှင် 30 kg ထုပ်ပိုးထားရှိမှု',
        description:
          'Available in 8, 9, and 10 inch sizes and packed 30 kg per bag for domestic and export supply.',
        descriptionMm:
          'အရွယ်အစား ၈၊ ၉ နှင့် ၁၀ လက်မဖြင့် တစ်အိတ်လျှင် 30 kg ထုပ်ပိုးထားသော ဝါးတံများ။',
        imagePath: '/assets/aistudio/bamboo-sticks-wholesale_d8d4d6b3.webp',
        imageAlt: 'Bamboo sticks prepared in 30 kg bags for commercial supply',
        frameLabel: 'Bamboo Sticks · 30 kg per Bag Wholesale & Export Packaging',
        frameLabelMm: 'ဝါးတံ · တစ်အိတ် 30 kg လက်ကားနှင့် ပြည်ပပို့ကုန် ထုပ်ပိုးမှု',
      },
    ],
    specifications: [
      {
        parameter: 'Product Name',
        parameterMm: 'ကုန်ပစ္စည်းအမည်',
        value: 'Bamboo Sticks',
        valueMm: 'ဝါးတံ (Bamboo Sticks)',
        notes: 'Natural bamboo stick product line',
        notesMm: 'သဘာဝဝါးတံ ထုတ်ကုန်',
      },
      {
        parameter: 'Material',
        parameterMm: 'ကုန်ကြမ်းအမျိုးအစား',
        value: '100% Natural Bamboo',
        valueMm: '၁၀၀% သဘာဝ ဝါးစစ်စစ်',
        notes: 'Natural bamboo from Myanmar',
        notesMm: 'သဘာဝ မြန်မာ့ဝါးစစ်စစ်',
      },
      {
        parameter: 'Thickness',
        parameterMm: 'အထူ (Thickness)',
        value: '1.2 to 2.5 mm',
        valueMm: '1.2 မှ 2.5 mm',
        notes: 'Thickness range',
        notesMm: 'အထူအတိုင်းအတာ',
      },
      {
        parameter: 'Sizes',
        parameterMm: 'အရွယ်အစား (Sizes)',
        value: '8, 9, 10 inches',
        valueMm: '၈ လက်မ၊ ၉ လက်မ၊ ၁၀ လက်မ',
        notes: 'Available lengths',
        notesMm: 'ရရှိနိုင်သော အရွယ်အစားများ',
      },
      {
        parameter: 'Packaging',
        parameterMm: 'ထုပ်ပိုးမှုပုံစံ (Packaging)',
        value: '30 kg per bag',
        valueMm: 'တစ်အိတ်လျှင် ၃၀ ကီလိုဂရမ် (30 kg per bag)',
        notes: 'Packed 30 kg per bag',
        notesMm: 'တစ်အိတ်လျှင် 30 kg ထုပ်ပိုးမှု',
      },
      {
        parameter: 'Origin',
        parameterMm: 'မူရင်းဒေသ (Origin)',
        value: 'Myanmar',
        valueMm: 'မြန်မာနိုင်ငံ (Myanmar)',
        notes: 'Domestic distribution & international export',
        notesMm: 'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်',
      },
    ],
    seo: {
      title: 'Bamboo Sticks (1.2–2.5 mm · 8", 9", 10" · 30 kg/bag) | TB Star',
      description:
        '100% natural Myanmar Bamboo Sticks in 1.2 to 2.5 mm thickness and 8, 9, and 10 inch sizes, packed 30 kg per bag.',
      ogImage: `${COMPANY_INFO.canonicalBase}/images/products/bamboo-sticks-main.webp`,
      ogImageAlt: 'Natural bamboo sticks from Myanmar',
      canonicalAnchor: `${COMPANY_INFO.canonicalBase}/bamboo-products#product-bamboo-sticks`,
    },
  },
  {
    id: 'activated-carbon',
    slug: 'activated-carbon',
    index: '03',
    name: 'Activated Carbon',
    nameMm: 'အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon)',
    footerLabel: 'Activated Carbon',
    footerLabelMm: 'အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon)',
    category: 'activated-carbon',
    categoryLabel: 'Activated Carbon · Inquiry Only',
    categoryMm: 'အက်တီဗိတ်တက် ကာဗွန် · ဆက်သွယ်စုံစမ်းရန်',
    descriptions: {
      short:
        'Activated Carbon product category by TB Star Company Limited. Contact our Yangon office directly for inquiries.',
      shortMm:
        'TBStar Company Limited ၏ အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon) ကုန်ပစ္စည်းကဏ္ဍ။ စုံစမ်းမေးမြန်းမှုများအတွက် ရန်ကုန်ရုံးချုပ်သို့ တိုက်ရိုက် ဆက်သွယ်နိုင်ပါသည်။',
      detailed:
        'TB Star Company Limited handles inquiries for Activated Carbon from our office in Kyauktada Township, Yangon. Please contact our team directly with your inquiry.',
      detailedMm:
        'TBStar Company Limited သည် ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ် ရုံးချုပ်မှတစ်ဆင့် အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon) နှင့် ပတ်သက်သော စုံစမ်းမေးမြန်းမှုများကို လက်ခံဆောင်ရွက်ပေးလျက်ရှိပါသည်။ တိုက်ရိုက် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။',
    },
    visualType: 'charcoal',
    images: {
      main: '/assets/aistudio/Charcoal-Product.svg',
      mainAlt: "Placeholder image for Activated Carbon — to be replaced with TB Star's own photos",
    },
    placeholderNote: "Placeholder — To be replaced with TB Star's own photos",
    placeholderNoteMm: 'TB Star ၏ ကိုယ်ပိုင်ဓာတ်ပုံများဖြင့် အစားထိုးရန် ယာယီပုံစံ (Placeholder)',
    inquiryType: 'Activated Carbon',
    published: true,
    featured: false,
    route: '/charcoal',
    sectionId: 'activated-carbon-overview',
    relatedProductIds: ['bamboo-split', 'bamboo-sticks'],
    specifications: [
      {
        parameter: 'Product Category',
        parameterMm: 'ကုန်ပစ္စည်းကဏ္ဍ',
        value: 'Activated Carbon',
        valueMm: 'အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon)',
        notes: 'Inquiry only',
        notesMm: 'ဆက်သွယ်စုံစမ်းရန်',
      },
    ],
    seo: {
      title: 'Activated Carbon Inquiries – TB Star Company Limited Yangon, Myanmar',
      description:
        'Contact TB Star Company Limited in Yangon, Myanmar for Activated Carbon inquiries.',
      ogImage: `${COMPANY_INFO.canonicalBase}/assets/aistudio/Charcoal-Product.svg`,
      ogImageAlt: "Placeholder image for Activated Carbon — to be replaced with TB Star's own photos",
      canonicalAnchor: `${COMPANY_INFO.canonicalBase}/charcoal#activated-carbon-overview`,
    },
  },
  {
    id: 'ball-pen',
    slug: 'ball-pen',
    index: '04',
    name: 'Ball Pen',
    nameMm: 'ဘောပင် (Ball Pen)',
    footerLabel: 'Ball Pen (Klick: 30 pcs/box · Plano: 50 pcs/box)',
    footerLabelMm: 'ဘောပင် · Ball Pen (Klick / Plano)',
    category: 'stationery',
    categoryLabel: 'Offset Printing & Stationery',
    categoryMm: 'အော့ဖ်ဆက်ပုံနှိပ်နှင့် စာရေးကိရိယာ',
    descriptions: {
      short:
        'Ball Pen stationery available in two types: Klick (30 pcs per box) and Plano (50 pcs per box).',
      shortMm:
        'Klick (တစ်ဘူးလျှင် 30 pcs) နှင့် Plano (တစ်ဘူးလျှင် 50 pcs) ဟူ၍ အမျိုးအစား (၂) မျိုး ရရှိနိုင်သော ဘောပင် (Ball Pen) စာရေးကိရိယာ။',
      detailed:
        'Under our Offset Printing & Stationery division, TB Star Company Limited supplies Ball Pen products in two box packaging configurations: Klick (30 pcs per box) and Plano (50 pcs per box). Contact our Yangon office for inquiries.',
      detailedMm:
        'TBStar Company Limited ၏ အော့ဖ်ဆက်ပုံနှိပ်နှင့် စာရေးကိရိယာ လုပ်ငန်းကဏ္ဍအောက်တွင် ဘောပင် (Ball Pen) ထုတ်ကုန်များကို Klick (တစ်ဘူးလျှင် ၃၀ ချောင်း · 30 pcs per box) နှင့် Plano (တစ်ဘူးလျှင် ၅၀ ချောင်း · 50 pcs per box) ဟူ၍ အမျိုးအစား (၂) မျိုးဖြင့် ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။',
    },
    visualType: 'commercial-printing',
    images: {
      main: '/assets/aistudio/Branding_Image_V2_cc9a2035.webp',
      mainAlt:
        'TB Star Company Limited Ball Pen — Klick (30 pcs per box) and Plano (50 pcs per box) box packaging',
      secondary: '/assets/aistudio/Branding_Image_V1_c6c098a8.webp',
      secondaryAlt:
        'TB Star Company Limited Ball Pen — Klick (30 pcs per box) and Plano (50 pcs per box) pen showcase',
    },
    placeholderNote: 'Ball Pen · Klick (30 pcs per box) & Plano (50 pcs per box)',
    placeholderNoteMm: 'ဘောပင် (Ball Pen) · Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs)',
    inquiryType: 'Ball Pen',
    published: true,
    featured: true,
    route: '/printing-services',
    sectionId: 'product-ball-pen',
    relatedProductIds: ['bamboo-split', 'bamboo-sticks'],
    variants: [
      {
        type: 'Klick',
        typeMm: 'Klick',
        packaging: '30 pcs per box',
        packagingMm: 'တစ်ဘူးလျှင် ၃၀ ချောင်း (30 pcs per box)',
      },
      {
        type: 'Plano',
        typeMm: 'Plano',
        packaging: '50 pcs per box',
        packagingMm: 'တစ်ဘူးလျှင် ၅၀ ချောင်း (50 pcs per box)',
      },
    ],
    specifications: [
      {
        parameter: 'Product',
        parameterMm: 'ကုန်ပစ္စည်းအမည်',
        value: 'Ball Pen',
        valueMm: 'ဘောပင် (Ball Pen)',
        notes: 'Offset Printing & Stationery division',
        notesMm: 'အော့ဖ်ဆက်ပုံနှိပ်နှင့် စာရေးကိရိယာ ဌာန',
      },
      {
        parameter: 'Available Types',
        parameterMm: 'အမျိုးအစားများ (Types)',
        value: 'Klick / Plano',
        valueMm: 'Klick နှင့် Plano',
        notes: 'Two Ball Pen models available',
        notesMm: 'အမျိုးအစား (၂) မျိုး ရွေးချယ်နိုင်သည်',
      },
      {
        parameter: 'Packaging — Klick',
        parameterMm: 'ထုပ်ပိုးမှု — Klick အမျိုးအစား',
        value: '30 pcs per box',
        valueMm: 'တစ်ဘူးလျှင် ၃၀ ချောင်း (30 pcs per box)',
        notes: 'Box packaging for Klick',
        notesMm: 'Klick ဘောပင် တစ်ဘူးချင်း ထုပ်ပိုးမှု',
      },
      {
        parameter: 'Packaging — Plano',
        parameterMm: 'ထုပ်ပိုးမှု — Plano အမျိုးအစား',
        value: '50 pcs per box',
        valueMm: 'တစ်ဘူးလျှင် ၅၀ ချောင်း (50 pcs per box)',
        notes: 'Box packaging for Plano',
        notesMm: 'Plano ဘောပင် တစ်ဘူးချင်း ထုပ်ပိုးမှု',
      },
    ],
    seo: {
      title: 'Ball Pen Stationery (Klick: 30 pcs/box & Plano: 50 pcs/box) | TB Star',
      description:
        'Ball Pen stationery supplied by TB Star Company Limited in Yangon: Klick (30 pcs per box) and Plano (50 pcs per box).',
      ogImage: `${COMPANY_INFO.canonicalBase}/assets/aistudio/Branding_Image_V2_cc9a2035.webp`,
      ogImageAlt:
        'TB Star Company Limited Ball Pen — Klick (30 pcs per box) and Plano (50 pcs per box) packaging',
      canonicalAnchor: `${COMPANY_INFO.canonicalBase}/printing-services#product-ball-pen`,
    },
  },
];

function slugifyProductId(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Normalizes and validates raw product entries:
 * - Prevents duplicate IDs or slugs
 * - Safely fills missing optional fields without inventing fake claims
 * - Resolves internal links, routes, anchors, and SEO metadata
 * - Validates relatedProductIds against published products
 */
export function normalizeCatalogProducts(
  rawItems: CentralizedProductInput[]
): BambooProductItem[] {
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const preliminary: BambooProductItem[] = [];

  rawItems.forEach((raw, idx) => {
    const cleanId = slugifyProductId(raw.id || raw.slug || `product-${idx + 1}`);
    const cleanSlug = slugifyProductId(raw.slug || cleanId);

    if (!cleanId || seenIds.has(cleanId) || seenSlugs.has(cleanSlug)) {
      console.warn(
        `[Catalog Validation]: Skipping duplicate or invalid product ID/slug "${raw.id}"`
      );
      return;
    }

    seenIds.add(cleanId);
    seenSlugs.add(cleanSlug);

    const published = raw.published !== false;
    const featured = Boolean(raw.featured);

    const categoryKey = (raw.category || 'bamboo').toLowerCase();
    const defaultCategoryLabel =
      categoryKey === 'bamboo'
        ? '100% Natural Bamboo · Domestic & Export Supply'
        : categoryKey === 'activated-carbon'
        ? 'Activated Carbon · Commercial Inquiries'
        : categoryKey === 'stationery'
        ? 'Printing Services & Stationery'
        : raw.category;
    const defaultCategoryMm =
      categoryKey === 'bamboo'
        ? '၁၀၀% သဘာဝ မြန်မာ့ဝါး · ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်'
        : categoryKey === 'activated-carbon'
        ? 'အက်တီဗိတ်တက် ကာဗွန် · စီးပွားရေးလုပ်ငန်းသုံး ဆက်သွယ်စုံစမ်းရန်'
        : categoryKey === 'stationery'
        ? 'ပုံနှိပ်နှင့် စာရေးကိရိယာ ဝန်ဆောင်မှုလုပ်ငန်း'
        : raw.categoryMm || raw.category;

    const shortDesc =
      raw.descriptions?.short ||
      raw.shortDescription ||
      `${raw.name} supplied by ${COMPANY_INFO.name} in Yangon, Myanmar.`;
    const shortDescMm =
      raw.descriptions?.shortMm ||
      raw.shortDescriptionMm ||
      shortDesc;
    const detailedDesc =
      raw.descriptions?.detailed ||
      raw.detailedDescription ||
      shortDesc;
    const detailedDescMm =
      raw.descriptions?.detailedMm ||
      raw.detailedDescriptionMm ||
      shortDescMm;

    const mainImg =
      raw.images?.main ||
      raw.imagePath ||
      '/images/products/bamboo-split-main.webp';
    const mainAlt =
      raw.images?.mainAlt ||
      raw.imageAlt ||
      `${raw.name} – ${COMPANY_INFO.name}`;

    const resolvedImages: ProductImages = {
      main: mainImg,
      mainAlt,
      featured: raw.images?.featured || raw.featuredImagePath,
      featuredAlt:
        raw.images?.featuredAlt ||
        raw.featuredImageAlt ||
        mainAlt,
      natural: raw.images?.natural || raw.naturalImagePath,
      naturalAlt:
        raw.images?.naturalAlt ||
        raw.naturalImageAlt ||
        mainAlt,
      wholesale: raw.images?.wholesale || raw.wholesaleImagePath,
      wholesaleAlt:
        raw.images?.wholesaleAlt ||
        raw.wholesaleImageAlt ||
        mainAlt,
      texture: raw.images?.texture || raw.textureImagePath,
      textureAlt:
        raw.images?.textureAlt ||
        raw.textureImageAlt ||
        mainAlt,
      secondary: raw.images?.secondary || raw.secondaryImagePath,
      secondaryAlt:
        raw.images?.secondaryAlt ||
        raw.secondaryImageAlt ||
        mainAlt,
    };

    const route: PageRoute =
      raw.route ||
      (categoryKey === 'activated-carbon'
        ? '/charcoal'
        : categoryKey === 'stationery'
        ? '/printing-services'
        : '/bamboo-products');

    const sectionId = raw.sectionId || `product-${cleanSlug}`;
    const href =
      route === '/charcoal'
        ? '/charcoal'
        : `${route}#${sectionId}`;

    const normalizedFeatures: ProductFeatureItem[] = (raw.features || []).map(
      (feat) =>
        typeof feat === 'string'
          ? { en: feat, mm: feat }
          : {
              label: feat.label,
              labelMm: feat.labelMm || feat.label,
              en: feat.en,
              mm: feat.mm || feat.en,
            }
    );

    const normalizedSpecs: SpecificationRow[] = (raw.specifications || []).map(
      (spec) => ({
        parameter: spec.parameter,
        parameterMm: spec.parameterMm || spec.parameter,
        value: spec.value,
        valueMm: spec.valueMm || spec.value,
        notes: spec.notes,
        notesMm: spec.notesMm || spec.notes,
      })
    );

    // Build detailSubCards if not explicitly provided but texture/wholesale images exist
    const resolvedSubCards: ProductDetailSubCard[] =
      raw.detailSubCards && raw.detailSubCards.length > 0
        ? raw.detailSubCards
        : [
            ...(resolvedImages.texture
              ? [
                  {
                    kicker: 'MATERIAL TEXTURE & APPEARANCE',
                    kickerMm: 'သဘာဝဝါးအသားနှင့် အသွင်အပြင်',
                    title: `${raw.name} Texture & Detail`,
                    titleMm: `${raw.nameMm || raw.name} အသေးစိတ်ပုံစံ`,
                    description: shortDesc,
                    descriptionMm: shortDescMm,
                    imagePath: resolvedImages.texture,
                    imageAlt: resolvedImages.textureAlt || mainAlt,
                    frameLabel: `${raw.name} · Material Texture`,
                    frameLabelMm: `${raw.nameMm || raw.name} · သဘာဝအသားဖွဲ့စည်းပုံ`,
                  },
                ]
              : []),
            ...(resolvedImages.wholesale
              ? [
                  {
                    kicker: 'COMMERCIAL & WHOLESALE PACKAGING',
                    kickerMm: 'လက်ကားနှင့် ပြည်ပပို့ကုန် ထုပ်ပိုးမှု',
                    title: `${raw.name} Commercial Supply`,
                    titleMm: `${raw.nameMm || raw.name} ထုပ်ပိုးမှုပုံစံ`,
                    description: shortDesc,
                    descriptionMm: shortDescMm,
                    imagePath: resolvedImages.wholesale,
                    imageAlt: resolvedImages.wholesaleAlt || mainAlt,
                    frameLabel: `${raw.name} · Commercial Packaging`,
                    frameLabelMm: `${raw.nameMm || raw.name} · စံချိန်မီ ထုပ်ပိုးမှု`,
                  },
                ]
              : []),
          ];

    const resolvedInquiryType: InquiryTypeOption =
      raw.inquiryType && INQUIRY_TYPE_OPTIONS.includes(raw.inquiryType)
        ? raw.inquiryType
        : INQUIRY_TYPE_OPTIONS.includes(raw.name as InquiryTypeOption)
        ? (raw.name as InquiryTypeOption)
        : categoryKey === 'bamboo'
        ? 'Bamboo Split'
        : categoryKey === 'activated-carbon'
        ? 'Activated Carbon'
        : categoryKey === 'stationery'
        ? 'Ball Pen'
        : 'General Inquiry';

    const visualType: 'bamboo-split' | 'bamboo-sticks' | 'bamboo-custom' | 'charcoal' =
      raw.visualType === 'bamboo-split' ||
      raw.visualType === 'bamboo-sticks' ||
      raw.visualType === 'bamboo-custom' ||
      raw.visualType === 'charcoal'
        ? raw.visualType
        : cleanSlug.includes('stick')
        ? 'bamboo-sticks'
        : categoryKey === 'activated-carbon'
        ? 'charcoal'
        : 'bamboo-split';

    const ogImageUrl = raw.seo?.ogImage
      ? raw.seo.ogImage
      : mainImg.startsWith('http')
      ? mainImg
      : `${COMPANY_INFO.canonicalBase}${mainImg}`;

    preliminary.push({
      id: cleanId,
      slug: cleanSlug,
      index: raw.index || String(idx + 1).padStart(2, '0'),
      name: raw.name,
      nameMm: raw.nameMm || raw.name,
      footerLabel: raw.footerLabel || raw.name,
      footerLabelMm: raw.footerLabelMm || raw.nameMm || raw.name,
      category: raw.categoryLabel || defaultCategoryLabel,
      categoryKey,
      categoryMm: defaultCategoryMm,
      descriptions: {
        short: shortDesc,
        shortMm: shortDescMm,
        detailed: detailedDesc,
        detailedMm: detailedDescMm,
      },
      shortDescription: shortDesc,
      shortDescriptionMm: shortDescMm,
      detailedDescription: detailedDesc,
      detailedDescriptionMm: detailedDescMm,
      visualType,
      images: resolvedImages,
      imagePath: resolvedImages.main,
      imageAlt: resolvedImages.mainAlt,
      featuredImagePath: resolvedImages.featured,
      featuredImageAlt: resolvedImages.featuredAlt,
      naturalImagePath: resolvedImages.natural,
      naturalImageAlt: resolvedImages.naturalAlt,
      wholesaleImagePath: resolvedImages.wholesale,
      wholesaleImageAlt: resolvedImages.wholesaleAlt,
      textureImagePath: resolvedImages.texture,
      textureImageAlt: resolvedImages.textureAlt,
      secondaryImagePath: resolvedImages.secondary,
      secondaryImageAlt: resolvedImages.secondaryAlt,
      placeholderNote: raw.placeholderNote || `${raw.name} · ${COMPANY_INFO.name}`,
      placeholderNoteMm:
        raw.placeholderNoteMm || raw.placeholderNote || `${raw.nameMm || raw.name}`,
      inquiryType: resolvedInquiryType,
      specifications: normalizedSpecs,
      features: normalizedFeatures,
      variants: raw.variants || [],
      detailSubCards: resolvedSubCards,
      published,
      featured,
      route,
      sectionId,
      href,
      relatedProductIds: raw.relatedProductIds || [],
      seo: {
        title: raw.seo?.title || `${raw.name} – ${COMPANY_INFO.name}`,
        description: raw.seo?.description || shortDesc,
        ogImage: ogImageUrl,
        ogImageAlt: raw.seo?.ogImageAlt || mainAlt,
        canonicalAnchor:
          raw.seo?.canonicalAnchor || `${COMPANY_INFO.canonicalBase}${href}`,
      },
    });
  });

  const publishedIds = new Set(
    preliminary.filter((p) => p.published).map((p) => p.id)
  );

  // Validate relatedProductIds so broken or unpublished product references never appear
  return preliminary.map((item) => {
    const validRelated = item.relatedProductIds.filter(
      (relId) => relId !== item.id && publishedIds.has(relId)
    );
    const fallbackRelated = preliminary
      .filter((other) => other.published && other.id !== item.id)
      .map((other) => other.id);

    return {
      ...item,
      relatedProductIds:
        validRelated.length > 0 ? validRelated : fallbackRelated.slice(0, 2),
    };
  });
}

export const ALL_NORMALIZED_PRODUCTS: BambooProductItem[] =
  normalizeCatalogProducts(RAW_CENTRALIZED_PRODUCTS);

/**
 * Returns all published products across all categories.
 * Unpublished products (published: false) are automatically hidden.
 */
export function getPublishedProducts(): BambooProductItem[] {
  return ALL_NORMALIZED_PRODUCTS.filter((p) => p.published);
}

/**
 * Returns published products filtered by category key ('bamboo', 'activated-carbon', 'stationery').
 * Re-indexes display numbers (01, 02, ...) sequentially within the category.
 */
export function getProductsByCategory(
  categoryKey: ProductCategoryId | string
): BambooProductItem[] {
  const normalizedKey = categoryKey.toLowerCase();
  return getPublishedProducts()
    .filter((p) => p.categoryKey.toLowerCase() === normalizedKey)
    .map((p, idx) => ({
      ...p,
      index: String(idx + 1).padStart(2, '0'),
    }));
}

/**
 * Returns published products marked as `featured: true` (optionally filtered by category).
 */
export function getFeaturedProducts(
  categoryKey?: ProductCategoryId | string
): BambooProductItem[] {
  const base = categoryKey
    ? getProductsByCategory(categoryKey)
    : getPublishedProducts();
  const featuredList = base.filter((p) => p.featured);
  return featuredList.length > 0 ? featuredList : base;
}

/**
 * Finds a single published product by its `id` or `slug`.
 */
export function getProductByIdOrSlug(
  idOrSlug: string
): BambooProductItem | undefined {
  const clean = slugifyProductId(idOrSlug);
  return getPublishedProducts().find(
    (p) => p.id === clean || p.slug === clean
  );
}

/**
 * Returns published related products for a given product ID or slug.
 */
export function getRelatedProducts(
  productIdOrSlug: string,
  limit = 2
): BambooProductItem[] {
  const current = getProductByIdOrSlug(productIdOrSlug);
  const published = getPublishedProducts();
  if (!current) {
    return published.slice(0, limit);
  }
  const byExplicitIds = current.relatedProductIds
    .map((id) => published.find((p) => p.id === id))
    .filter((p): p is BambooProductItem => Boolean(p));

  if (byExplicitIds.length >= limit) {
    return byExplicitIds.slice(0, limit);
  }

  const remaining = published.filter(
    (p) => p.id !== current.id && !byExplicitIds.some((r) => r.id === p.id)
  );
  return [...byExplicitIds, ...remaining].slice(0, limit);
}

/**
 * Returns active product categories that currently have at least one published product.
 */
export function getActiveProductCategories(): string[] {
  return Array.from(new Set(getPublishedProducts().map((p) => p.categoryKey)));
}

/**
 * Filters a list of centralized products in real-time by matching the user query
 * against product names (English & Myanmar), short and detailed descriptions
 * (English & Myanmar), category labels, variants, and specification values.
 */
export function filterProductsBySearchQuery(
  products: BambooProductItem[],
  query: string,
  categoryFilter: ProductCategoryId | 'all' = 'all'
): BambooProductItem[] {
  const normalizedCategory = categoryFilter.toLowerCase();
  const categoryFiltered =
    normalizedCategory === 'all'
      ? products
      : products.filter(
          (product) => product.categoryKey.toLowerCase() === normalizedCategory
        );

  const trimmedQuery = query.trim().toLowerCase();
  if (!trimmedQuery) {
    return categoryFiltered;
  }

  const tokens = trimmedQuery.split(/\s+/).filter(Boolean);

  return categoryFiltered.filter((product) => {
    const searchableFields: string[] = [
      product.name,
      product.nameMm,
      product.slug,
      product.footerLabel,
      product.footerLabelMm,
      product.category,
      product.categoryMm,
      product.categoryKey,
      product.shortDescription,
      product.shortDescriptionMm,
      product.detailedDescription,
      product.detailedDescriptionMm,
      product.descriptions.short,
      product.descriptions.shortMm,
      product.descriptions.detailed,
      product.descriptions.detailedMm,
      ...(product.variants || []).flatMap((v) => [
        v.type,
        v.typeMm,
        v.packaging,
        v.packagingMm,
      ]),
      ...(product.specifications || []).flatMap((s) => [
        s.parameter,
        s.parameterMm || '',
        s.value,
        s.valueMm || '',
        s.notes || '',
        s.notesMm || '',
      ]),
      ...(product.features || []).flatMap((f) => [
        f.en,
        f.mm || '',
        f.label || '',
        f.labelMm || '',
      ]),
    ];

    const haystack = searchableFields.join(' ').toLowerCase();
    return tokens.every((token) => haystack.includes(token));
  });
}

/**
 * Searches all published centralized products by name, description, and optional category.
 */
export function searchPublishedProducts(
  query: string,
  categoryFilter: ProductCategoryId | 'all' = 'all'
): BambooProductItem[] {
  return filterProductsBySearchQuery(
    getPublishedProducts(),
    query,
    categoryFilter
  );
}


// Derived exports for seamless compatibility across all existing components & server routes
export const BAMBOO_PRODUCTS: BambooProductItem[] =
  getProductsByCategory('bamboo');

const fallbackActivatedCarbon = ALL_NORMALIZED_PRODUCTS.find(
  (p) => p.id === 'activated-carbon'
)!;

export const CHARCOAL_PRODUCT_INFO =
  getProductByIdOrSlug('activated-carbon') || fallbackActivatedCarbon;

export interface BallPenProductInfo {
  id: string;
  slug: string;
  index: string;
  name: string;
  nameMm: string;
  footerLabel: string;
  footerLabelMm: string;
  category: string;
  categoryMm: string;
  shortDescription: string;
  shortDescriptionMm: string;
  detailedDescription: string;
  detailedDescriptionMm: string;
  visualType: 'commercial-printing';
  imagePath: string;
  imageAlt: string;
  secondaryImagePath?: string;
  secondaryImageAlt?: string;
  placeholderNote: string;
  placeholderNoteMm: string;
  inquiryType: InquiryTypeOption;
  published: boolean;
  featured: boolean;
  href: string;
  sectionId: string;
  variants: BallPenVariant[];
  specifications: SpecificationRow[];
}

const resolvedBallPen =
  getProductByIdOrSlug('ball-pen') ||
  ALL_NORMALIZED_PRODUCTS.find((p) => p.id === 'ball-pen')!;

export const BALL_PEN_PRODUCT: BallPenProductInfo = {
  id: resolvedBallPen.id,
  slug: resolvedBallPen.slug,
  index: '04',
  name: resolvedBallPen.name,
  nameMm: resolvedBallPen.nameMm,
  footerLabel: resolvedBallPen.footerLabel,
  footerLabelMm: resolvedBallPen.footerLabelMm,
  category: resolvedBallPen.category,
  categoryMm: resolvedBallPen.categoryMm,
  shortDescription: resolvedBallPen.shortDescription,
  shortDescriptionMm: resolvedBallPen.shortDescriptionMm,
  detailedDescription: resolvedBallPen.detailedDescription,
  detailedDescriptionMm: resolvedBallPen.detailedDescriptionMm,
  visualType: 'commercial-printing',
  imagePath: resolvedBallPen.imagePath,
  imageAlt: resolvedBallPen.imageAlt,
  secondaryImagePath: resolvedBallPen.secondaryImagePath,
  secondaryImageAlt: resolvedBallPen.secondaryImageAlt,
  placeholderNote: resolvedBallPen.placeholderNote,
  placeholderNoteMm: resolvedBallPen.placeholderNoteMm,
  inquiryType: resolvedBallPen.inquiryType,
  published: resolvedBallPen.published,
  featured: resolvedBallPen.featured,
  href: resolvedBallPen.href,
  sectionId: resolvedBallPen.sectionId,
  variants: resolvedBallPen.variants,
  specifications: resolvedBallPen.specifications,
};

export interface PrintingServiceItem {
  id: 'books-printing' | 'voucher-books-printing' | 'other-offset-printing' | string;
  slug?: string;
  index: string;
  name: string;
  nameMm: string;
  category: string;
  categoryMm: string;
  shortDescription: string;
  shortDescriptionMm: string;
  detailedDescription: string;
  detailedDescriptionMm: string;
  visualType: 'books-printing' | 'voucher-printing' | 'commercial-printing';
  imagePath?: string;
  imageAlt?: string;
  placeholderNote: string;
  placeholderNoteMm?: string;
  inquiryType: InquiryTypeOption;
  scopePoints: string[];
  scopePointsMm: string[];
  published?: boolean;
  featured?: boolean;
  sectionId?: string;
  href?: string;
}

const RAW_PRINTING_SERVICES: PrintingServiceItem[] = [
  {
    id: 'books-printing',
    slug: 'books-printing',
    index: '01',
    name: 'Books Printing',
    nameMm: 'စာအုပ်ပုံနှိပ်ခြင်းလုပ်ငန်း (Books Printing)',
    category: 'One-Stop Offset Printing Services',
    categoryMm: 'တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း',
    shortDescription:
      'One-stop offset printing for books, educational publications, manuals, and multi-page editions with clean typography and durable binding.',
    shortDescriptionMm:
      'စာအုပ်အမျိုးမျိုး၊ ပညာရေးဆိုင်ရာ စာအုပ်များနှင့် လမ်းညွှန်စာအုပ်များကို စာသားကြည်လင်ပြတ်သားပြီး ခိုင်ခံ့သပ်ရပ်စွာ တစ်နေရာတည်းတွင် အပြီးအစီး ပုံနှိပ်ပေးပါသည်။',
    detailedDescription:
      'TB Star Company Limited provides one-stop offset printing services for books, publications, and institutional manuals in Yangon. We coordinate layout verification, offset press production, cover printing, and binding under one roof.',
    detailedDescriptionMm:
      'TBStar Company Limited သည် စာအုပ်များ၊ စာပေထုတ်ဝေမှုများနှင့် လမ်းညွှန်စာအုပ်အမျိုးမျိုးအတွက် စာမျက်နှာစစ်ဆေးခြင်းမှစ၍ အော့ဖ်ဆက်စက်ဖြင့် ပုံနှိပ်ခြင်း၊ မျက်နှာဖုံးပုံနှိပ်ခြင်းနှင့် စာအုပ်ချုပ်လုပ်ခြင်းအထိ တစ်နေရာတည်းတွင် အပြီးအစီး တာဝန်ယူ ဆောင်ရွက်ပေးပါသည်။',
    visualType: 'books-printing',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    imageAlt: "Placeholder illustration for Books Printing — to be replaced with TB Star's own photos",
    placeholderNote: "Placeholder — To be replaced with TB Star's own photos",
    placeholderNoteMm: 'TB Star ၏ ကိုယ်ပိုင်ဓာတ်ပုံများဖြင့် အစားထိုးရန် ယာယီပုံစံ (Placeholder)',
    inquiryType: 'Books Printing',
    published: true,
    featured: true,
    sectionId: 'service-books-printing',
    href: '/printing-services#service-books-printing',
    scopePoints: [
      'Multi-page books, textbooks, and corporate publications',
      'Sharp offset interior text reproduction and full-color covers',
      'End-to-end coordination from offset press production to binding and trimming',
    ],
    scopePointsMm: [
      'စာမျက်နှာစုံ စာအုပ်များ၊ ကျောင်းသုံးနှင့် ရုံးသုံးစာအုပ်အမျိုးမျိုး',
      'ကြည်လင်ပြတ်သားသော အတွင်းစာသားနှင့် ရောင်စုံမျက်နှာဖုံး ပုံနှိပ်မှု',
      'ပုံနှိပ်ခြင်းမှ စာအုပ်ချုပ်လုပ်ပြီးစီးသည်အထိ တစ်နေရာတည်း အပြီးအစီး ဝန်ဆောင်မှု',
    ],
  },
  {
    id: 'voucher-books-printing',
    slug: 'voucher-books-printing',
    index: '02',
    name: 'Voucher Books Printing',
    nameMm: 'ဘောင်ချာစာအုပ် ပုံနှိပ်ခြင်းလုပ်ငန်း (Voucher Books Printing)',
    category: 'One-Stop Offset Printing Services',
    categoryMm: 'တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း',
    shortDescription:
      'Commercial voucher books, invoice pads, receipt books, and business forms customized for daily retail and B2B operations.',
    shortDescriptionMm:
      'နေ့စဉ်လုပ်ငန်းသုံး ဘောင်ချာစာအုပ်များ၊ ငွေတောင်းခံလွှာနှင့် ပြေစာစာအုပ်များကို လုပ်ငန်းအမှတ်တံဆိပ်နှင့်အညီ သပ်ရပ်တိကျစွာ ပုံနှိပ်ပေးပါသည်။',
    detailedDescription:
      'Our Voucher Books Printing service supplies businesses, wholesalers, and commercial offices with custom-formatted voucher books, receipt pads, delivery notes, and invoice books.',
    detailedDescriptionMm:
      'ကုမ္ပဏီများ၊ လက်ကားဆိုင်များနှင့် စီးပွားရေးလုပ်ငန်းများအတွက် လိုအပ်သော ဘောင်ချာစာအုပ်များ၊ ပြေစာစာအုပ်များနှင့် စာရင်းပုံစံစာအုပ်များကို စနစ်တကျ ပုံနှိပ်ပေးပါသည်။',
    visualType: 'voucher-printing',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    imageAlt: "Placeholder illustration for Voucher Books Printing — to be replaced with TB Star's own photos",
    placeholderNote: "Placeholder — To be replaced with TB Star's own photos",
    placeholderNoteMm: 'TB Star ၏ ကိုယ်ပိုင်ဓာတ်ပုံများဖြင့် အစားထိုးရန် ယာယီပုံစံ (Placeholder)',
    inquiryType: 'Voucher Books Printing',
    published: true,
    featured: true,
    sectionId: 'service-voucher-books-printing',
    href: '/printing-services#service-voucher-books-printing',
    scopePoints: [
      'Custom sales voucher books, receipt pads, and invoice books',
      'Perforation and multi-copy pad binding',
      'Tailored layouts featuring your company logo and contact details',
    ],
    scopePointsMm: [
      'အရောင်းဘောင်ချာစာအုပ်များ၊ ပြေစာနှင့် ငွေတောင်းခံလွှာစာအုပ်များ',
      'ဆုတ်ဖြဲရလွယ်ကူသော အပေါက်ဖောက်ခြင်းနှင့် အလွှာစုံ (Multi-copy) စာအုပ်ချုပ်လုပ်ခြင်း',
      'မိမိလုပ်ငန်းလိုဂိုနှင့် အချက်အလက်များအတိုင်း စိတ်ကြိုက်ဒီဇိုင်း ပုံနှိပ်နိုင်ခြင်း',
    ],
  },
  {
    id: 'other-offset-printing',
    slug: 'other-offset-printing',
    index: '03',
    name: 'Other Offset Printing Services',
    nameMm: 'အခြား အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများ',
    category: 'One-Stop Offset Printing Services',
    categoryMm: 'တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း',
    shortDescription:
      'Commercial offset printing for brochures, pamphlets, catalogs, business cards, letterheads, and office forms.',
    shortDescriptionMm:
      'လက်ကမ်းစာစောင်များ၊ ကတ်တလောက်များ၊ လိပ်စာကတ်များနှင့် ရုံးသုံးပုံစံစာရွက်အမျိုးမျိုးအတွက် အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှု။',
    detailedDescription:
      'Beyond books and voucher pads, TB Star Company Limited delivers one-stop offset printing for corporate brochures, flyers, product catalogs, business cards, envelopes, letterheads, and administrative forms.',
    detailedDescriptionMm:
      'စာအုပ်နှင့် ဘောင်ချာစာအုပ်များအပြင် ကုမ္ပဏီသုံး လက်ကမ်းစာစောင်များ (Brochures & Pamphlets)၊ ကုန်ပစ္စည်းကတ်တလောက်များ၊ လိပ်စာကတ်များ၊ စာအိတ်များနှင့် ရုံးသုံးပုံစံစာရွက်အမျိုးမျိုးကိုပါ တစ်နေရာတည်းတွင် အပြီးအစီး ပုံနှိပ်ပေးပါသည်။',
    visualType: 'commercial-printing',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    imageAlt: "Placeholder illustration for Other Offset Printing Services — to be replaced with TB Star's own photos",
    placeholderNote: "Placeholder — To be replaced with TB Star's own photos",
    placeholderNoteMm: 'TB Star ၏ ကိုယ်ပိုင်ဓာတ်ပုံများဖြင့် အစားထိုးရန် ယာယီပုံစံ (Placeholder)',
    inquiryType: 'Other Offset Printing Services',
    published: true,
    featured: true,
    sectionId: 'service-other-offset-printing',
    href: '/printing-services#service-other-offset-printing',
    scopePoints: [
      'Corporate brochures, pamphlets, flyers, and product catalogs',
      'Business cards, letterheads, envelopes, and office forms',
      'Consistent offset color reproduction for commercial orders',
    ],
    scopePointsMm: [
      'လက်ကမ်းစာစောင်များ၊ ကြော်ငြာစာရွက်များနှင့် ကုန်ပစ္စည်းကတ်တလောက်များ',
      'လိပ်စာကတ်များ၊ ရုံးသုံးစာရွက်များ၊ စာအိတ်နှင့် ဖိုင်တွဲများ',
      'အရောင်အသွေး တိကျမှန်ကန်သော အော့ဖ်ဆက်ပုံနှိပ် အရည်အသွေး',
    ],
  },
];

export function getPublishedPrintingServices(): PrintingServiceItem[] {
  return RAW_PRINTING_SERVICES.filter((svc) => svc.published !== false).map(
    (svc, idx) => ({
      ...svc,
      index: String(idx + 1).padStart(2, '0'),
      sectionId: svc.sectionId || `service-${svc.id}`,
      href: svc.href || `/printing-services#service-${svc.id}`,
    })
  );
}

/**
 * Filters printing services in real-time by matching the user query against
 * service names, categories, descriptions, and scope points in English and Myanmar.
 */
export function filterPrintingServicesBySearchQuery(
  services: PrintingServiceItem[],
  query: string
): PrintingServiceItem[] {
  const trimmedQuery = query.trim().toLowerCase();
  if (!trimmedQuery) {
    return services;
  }

  const tokens = trimmedQuery.split(/\s+/).filter(Boolean);

  return services.filter((service) => {
    const searchableFields: string[] = [
      service.name,
      service.nameMm,
      service.slug || '',
      service.category,
      service.categoryMm,
      service.shortDescription,
      service.shortDescriptionMm,
      service.detailedDescription,
      service.detailedDescriptionMm,
      service.inquiryType,
      ...(service.scopePoints || []),
      ...(service.scopePointsMm || []),
    ];

    const haystack = searchableFields.join(' ').toLowerCase();
    return tokens.every((token) => haystack.includes(token));
  });
}

export const PRINTING_SERVICES: PrintingServiceItem[] =
  getPublishedPrintingServices();

export interface PageSeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogImageAlt: string;
  breadcrumbs: { name: string; url: string }[];
}

const publishedBambooNames = BAMBOO_PRODUCTS.map((p) => p.name).join(', ');

export const PAGE_SEO: Record<PageRoute, PageSeoMetadata> = {
  '/': {
    title: `${COMPANY_INFO.name} – Natural Myanmar Bamboo Products, Activated Carbon & Offset Printing Services`,
    description: `Established in ${COMPANY_INFO.establishedYear}, ${COMPANY_INFO.name} operates in Yangon, Myanmar, supplying 100% natural Myanmar ${publishedBambooNames || 'Bamboo Products'}, Activated Carbon, and one-stop Offset Printing Services & Ball Pen stationery.`,
    canonicalUrl: `${COMPANY_INFO.canonicalBase}/`,
    ogImage: `${COMPANY_INFO.canonicalBase}/images/products/bamboo-split-main.webp`,
    ogImageAlt: `Natural Myanmar bamboo splits with nodes by ${COMPANY_INFO.name}`,
    breadcrumbs: [{ name: 'Home', url: `${COMPANY_INFO.canonicalBase}/` }],
  },
  '/about': {
    title: `About ${COMPANY_INFO.name} – Established in ${COMPANY_INFO.establishedYear} in Yangon, Myanmar`,
    description: COMPANY_INFO.overview,
    canonicalUrl: `${COMPANY_INFO.canonicalBase}/about`,
    ogImage: `${COMPANY_INFO.canonicalBase}/images/products/bamboo-split-natural.webp`,
    ogImageAlt: `About ${COMPANY_INFO.name} in Yangon, Myanmar`,
    breadcrumbs: [
      { name: 'Home', url: `${COMPANY_INFO.canonicalBase}/` },
      { name: 'About Us', url: `${COMPANY_INFO.canonicalBase}/about` },
    ],
  },
  '/bamboo-products': {
    title: `${publishedBambooNames || 'Bamboo Products'} Specifications – 100% Natural Myanmar Bamboo | TB Star`,
    description:
      'Explore 100% natural Myanmar Bamboo Split (3 mm thickness, 20 to 48 inches, with nodes or without nodes) and Bamboo Sticks (1.2 to 2.5 mm, 8, 9, 10 inches, packed 30 kg per bag) from TB Star Company Limited.',
    canonicalUrl: `${COMPANY_INFO.canonicalBase}/bamboo-products`,
    ogImage:
      BAMBOO_PRODUCTS[0]?.seo.ogImage ||
      `${COMPANY_INFO.canonicalBase}/images/products/bamboo-split-main.webp`,
    ogImageAlt:
      BAMBOO_PRODUCTS[0]?.seo.ogImageAlt ||
      `100% Natural Myanmar Bamboo Split and Bamboo Sticks by ${COMPANY_INFO.name}`,
    breadcrumbs: [
      { name: 'Home', url: `${COMPANY_INFO.canonicalBase}/` },
      { name: 'Bamboo Products', url: `${COMPANY_INFO.canonicalBase}/bamboo-products` },
    ],
  },
  '/charcoal': {
    title: CHARCOAL_PRODUCT_INFO.seo.title,
    description: CHARCOAL_PRODUCT_INFO.seo.description,
    canonicalUrl: `${COMPANY_INFO.canonicalBase}/charcoal`,
    ogImage: CHARCOAL_PRODUCT_INFO.seo.ogImage,
    ogImageAlt: CHARCOAL_PRODUCT_INFO.seo.ogImageAlt,
    breadcrumbs: [
      { name: 'Home', url: `${COMPANY_INFO.canonicalBase}/` },
      { name: CHARCOAL_PRODUCT_INFO.name, url: `${COMPANY_INFO.canonicalBase}/charcoal` },
    ],
  },
  '/printing-services': {
    title:
      'One-Stop Offset Printing Services & Ball Pen Stationery (Klick & Plano) | TB Star',
    description:
      'One-stop offset printing services in Yangon for Books Printing, Voucher Books Printing, and Other Offset Printing Services, plus Ball Pen stationery (Klick: 30 pcs per box; Plano: 50 pcs per box).',
    canonicalUrl: `${COMPANY_INFO.canonicalBase}/printing-services`,
    ogImage: `${COMPANY_INFO.canonicalBase}/assets/aistudio/Branding_Image_V2_cc9a2035.webp`,
    ogImageAlt: `${COMPANY_INFO.name} Offset Printing Services and Klick & Plano Ball Pen Stationery`,
    breadcrumbs: [
      { name: 'Home', url: `${COMPANY_INFO.canonicalBase}/` },
      {
        name: 'Printing Services',
        url: `${COMPANY_INFO.canonicalBase}/printing-services`,
      },
    ],
  },
  '/gallery': {
    title: 'Product & Packaging Gallery – Bamboo, Offset Printing & Ball Pen | TB Star',
    description:
      'Inspect product photos of 100% natural Myanmar Bamboo Split, Bamboo Sticks, 30 kg export packaging, Offset Printing deliverables, and Klick & Plano Ball Pens.',
    canonicalUrl: `${COMPANY_INFO.canonicalBase}/gallery`,
    ogImage: `${COMPANY_INFO.canonicalBase}/images/products/bamboo-split-featured.webp`,
    ogImageAlt: `${COMPANY_INFO.name} Product and Packaging Gallery`,
    breadcrumbs: [
      { name: 'Home', url: `${COMPANY_INFO.canonicalBase}/` },
      { name: 'Gallery', url: `${COMPANY_INFO.canonicalBase}/gallery` },
    ],
  },
  '/contact': {
    title: `Contact ${COMPANY_INFO.name} – Central Tower, Kyauktada Township, Yangon`,
    description: `Contact ${COMPANY_INFO.name} at ${COMPANY_INFO.address.line1}, ${COMPANY_INFO.address.township}, ${COMPANY_INFO.address.city} (Tel: ${COMPANY_INFO.telephone}) for Bamboo, Activated Carbon, Printing, and Ball Pen inquiries.`,
    canonicalUrl: `${COMPANY_INFO.canonicalBase}/contact`,
    ogImage: `${COMPANY_INFO.canonicalBase}/images/products/bamboo-split-main.webp`,
    ogImageAlt: `Contact ${COMPANY_INFO.name} in Yangon, Myanmar`,
    breadcrumbs: [
      { name: 'Home', url: `${COMPANY_INFO.canonicalBase}/` },
      { name: 'Contact Us', url: `${COMPANY_INFO.canonicalBase}/contact` },
    ],
  },
};

/**
 * Centralized Schema.org JSON-LD generator used by both client-side navigation (src/App.tsx)
 * and server-side HTML injection (server.ts). Dynamically reflects published products,
 * services, and verified company metadata.
 */
export function buildStructuredData(route: PageRoute) {
  const seo = PAGE_SEO[route] || PAGE_SEO['/'];
  const baseUrl = COMPANY_INFO.canonicalBase;

  const organizationNode = {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: COMPANY_INFO.name,
    alternateName: COMPANY_INFO.nameMm,
    foundingDate: COMPANY_INFO.establishedYear,
    url: `${baseUrl}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${baseUrl}/#logo`,
      url: `${baseUrl}${COMPANY_INFO.logoPath}`,
      contentUrl: `${baseUrl}${COMPANY_INFO.logoPath}`,
      caption: `${COMPANY_INFO.name} Official Logo`,
    },
    description: COMPANY_INFO.seoDescription,
    telephone: COMPANY_INFO.telephone,
    areaServed: ['MM'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address.streetAddress,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.region,
      postalCode: COMPANY_INFO.address.postalCode,
      addressCountry: COMPANY_INFO.address.countryCode,
    },
  };

  const websiteNode = {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: `${baseUrl}/`,
    name: COMPANY_INFO.name,
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: 'en',
  };

  const pageType =
    route === '/about'
      ? 'AboutPage'
      : route === '/contact'
      ? 'ContactPage'
      : route === '/gallery' ||
        route === '/bamboo-products' ||
        route === '/charcoal'
      ? 'CollectionPage'
      : 'WebPage';

  const breadcrumbNode = {
    '@type': 'BreadcrumbList',
    '@id': `${seo.canonicalUrl}#breadcrumb`,
    itemListElement: seo.breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  const webPageNode: Record<string, unknown> = {
    '@type': pageType,
    '@id': `${seo.canonicalUrl}#webpage`,
    url: seo.canonicalUrl,
    name: seo.title,
    description: seo.description,
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#organization`,
    },
    breadcrumb: {
      '@id': `${seo.canonicalUrl}#breadcrumb`,
    },
    inLanguage: 'en',
  };

  const graph: Record<string, unknown>[] = [
    organizationNode,
    websiteNode,
    webPageNode,
    breadcrumbNode,
  ];

  if (route === '/bamboo-products') {
    const publishedBamboo = getProductsByCategory('bamboo');
    graph.push({
      '@type': 'ItemList',
      '@id': `${seo.canonicalUrl}#product-list`,
      name: `${COMPANY_INFO.name} Natural Myanmar Bamboo Products`,
      itemListElement: publishedBamboo.map((prod, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: prod.name,
        description: prod.detailedDescription,
        url: `${seo.canonicalUrl}#${prod.sectionId}`,
        item: {
          '@type': 'Product',
          '@id': `${seo.canonicalUrl}#${prod.sectionId}`,
          name: prod.name,
          description: prod.detailedDescription,
          image: prod.seo.ogImage,
          category: prod.category,
          brand: {
            '@type': 'Brand',
            name: COMPANY_INFO.name,
          },
          manufacturer: {
            '@id': `${baseUrl}/#organization`,
          },
          countryOfOrigin: {
            '@type': 'Country',
            name: COMPANY_INFO.address.country,
          },
          additionalProperty: prod.specifications.map((spec) => ({
            '@type': 'PropertyValue',
            name: spec.parameter,
            value: spec.value,
          })),
        },
      })),
    });
  }

  if (route === '/charcoal') {
    const publishedCarbon = getProductsByCategory('activated-carbon');
    if (publishedCarbon.length > 0) {
      graph.push({
        '@type': 'ItemList',
        '@id': `${seo.canonicalUrl}#activated-carbon-list`,
        name: `${COMPANY_INFO.name} Activated Carbon Product Line`,
        itemListElement: publishedCarbon.map((prod, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: prod.name,
          description: prod.detailedDescription,
          url: `${seo.canonicalUrl}#${prod.sectionId}`,
        })),
      });
    }
  }

  if (route === '/printing-services') {
    const publishedServices = getPublishedPrintingServices();
    const publishedStationery = getProductsByCategory('stationery');

    const serviceItems = publishedServices.map((svc, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: svc.name,
      description: svc.detailedDescription,
      url: `${seo.canonicalUrl}#${svc.sectionId || `service-${svc.id}`}`,
      item: {
        '@type': 'Service',
        name: svc.name,
        description: svc.detailedDescription,
        provider: {
          '@id': `${baseUrl}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: COMPANY_INFO.address.country,
        },
      },
    }));

    const stationeryItems = publishedStationery.map((prod, idx) => ({
      '@type': 'ListItem',
      position: serviceItems.length + idx + 1,
      name: prod.name,
      description: prod.detailedDescription,
      url: `${seo.canonicalUrl}#${prod.sectionId}`,
      item: {
        '@type': 'Product',
        name: prod.name,
        description: prod.detailedDescription,
        image: prod.seo.ogImage,
        brand: {
          '@type': 'Brand',
          name: COMPANY_INFO.name,
        },
        additionalProperty: prod.specifications.map((spec) => ({
          '@type': 'PropertyValue',
          name: spec.parameter,
          value: spec.value,
        })),
      },
    }));

    graph.push({
      '@type': 'ItemList',
      '@id': `${seo.canonicalUrl}#service-list`,
      name: `${COMPANY_INFO.name} One-Stop Offset Printing Services & Stationery`,
      itemListElement: [...serviceItems, ...stationeryItems],
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export type GalleryCategoryName =
  | 'Bamboo Products'
  | 'Bamboo Production'
  | 'Packaging'
  | 'Printing Products'
  | 'Other Company Activities';

export interface GalleryPreviewItem {
  id: string;
  title: string;
  titleMm: string;
  category: GalleryCategoryName;
  caption: string;
  captionMm: string;
  visualType:
    | 'bamboo-split'
    | 'bamboo-sticks'
    | 'bamboo-custom'
    | 'books-printing'
    | 'voucher-printing'
    | 'commercial-printing';
  imagePath: string;
  altText: string;
}

export const GALLERY_PREVIEW_ITEMS: GalleryPreviewItem[] = [
  {
    id: 'gal-bamboo-split-main',
    title: 'Natural Myanmar Bamboo Split (3 mm · 20"–48")',
    titleMm: 'သဘာဝ မြန်မာ့ဝါးခြမ်းပြား (အထူ 3 mm · အရှည် ၂၀"–၄၈")',
    category: 'Bamboo Products',
    caption:
      '100% natural Myanmar Bamboo Split in 3 mm thickness and 20 to 48 inch lengths, available with nodes or without nodes.',
    captionMm:
      '၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ်ဖြင့် ထုတ်လုပ်ထားသော အထူ 3 mm၊ အရှည် ၂၀ မှ ၄၈ လက်မ ဝါးခြမ်းပြား (အဆစ်ပါ သို့မဟုတ် အဆစ်မပါ)။',
    visualType: 'bamboo-split',
    imagePath: '/images/products/bamboo-split-main.webp',
    altText: 'Natural Myanmar bamboo splits with nodes',
  },
  {
    id: 'gal-bamboo-sticks-main',
    title: 'Natural Myanmar Bamboo Sticks (8", 9", and 10")',
    titleMm: 'သဘာဝ မြန်မာ့ဝါးတံ (၈ လက်မ၊ ၉ လက်မ နှင့် ၁၀ လက်မ)',
    category: 'Bamboo Products',
    caption:
      '1.2 to 2.5 mm natural bamboo sticks manufactured in Myanmar for domestic and export markets.',
    captionMm:
      'ပြည်တွင်းနှင့် ပြည်ပပို့ကုန်အတွက် မြန်မာနိုင်ငံတွင် ထုတ်လုပ်ထားသော အထူ 1.2–2.5 mm သဘာဝဝါးတံများ။',
    visualType: 'bamboo-sticks',
    imagePath: '/images/products/bamboo-sticks-main.webp',
    altText: 'Natural bamboo sticks from Myanmar',
  },
  {
    id: 'gal-bamboo-split-texture',
    title: 'Bamboo Split Fiber & Node Processing',
    titleMm: 'ဝါးခြမ်းပြား သဘာဝအသားနှင့် အဆစ် စိတ်ဖြာထုတ်လုပ်မှု',
    category: 'Bamboo Production',
    caption:
      '3 mm Myanmar bamboo splits available with nodes or without nodes.',
    captionMm:
      'အထူ 3 mm မြန်မာ့ဝါးခြမ်းပြားများကို အဆစ်ပါ သို့မဟုတ် အဆစ်မပါ ပုံစံနှစ်မျိုးဖြင့် ရရှိနိုင်ပုံ။',
    visualType: 'bamboo-split',
    imagePath: '/images/products/bamboo-split-texture.webp',
    altText: 'Close-up texture of 3 mm natural Myanmar bamboo splits',
  },
  {
    id: 'gal-bamboo-sticks-packaging',
    title: 'Bamboo Sticks — 30 kg per Bag Export Packaging',
    titleMm: 'ဝါးတံ — တစ်အိတ်လျှင် 30 kg ပြည်ပပို့ကုန် ထုပ်ပိုးမှု',
    category: 'Packaging',
    caption:
      '30 kg per bag packaging for 8, 9, and 10 inch Myanmar Bamboo Sticks.',
    captionMm:
      '၈ လက်မ၊ ၉ လက်မနှင့် ၁၀ လက်မ မြန်မာ့ဝါးတံများကို တစ်အိတ်လျှင် 30 kg ထုပ်ပိုးထားပုံ။',
    visualType: 'bamboo-sticks',
    imagePath: '/assets/aistudio/bamboo-sticks-wholesale_d8d4d6b3.webp',
    altText: 'Bamboo sticks prepared in 30 kg bags for commercial supply',
  },
  {
    id: 'gal-bamboo-split-bundles',
    title: 'Bamboo Split — Bundled Supply (20"–48")',
    titleMm: 'ဝါးခြမ်းပြား — အစည်းလိုက် ထုပ်ပိုးမှု (၂၀"–၄၈")',
    category: 'Packaging',
    caption:
      '100% natural Myanmar Bamboo Split bundled for domestic distribution and international export.',
    captionMm:
      'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်အတွက် စည်းနှောင်ထုပ်ပိုးထားသော ၁၀၀% သဘာဝ မြန်မာ့ဝါးခြမ်းပြားများ။',
    visualType: 'bamboo-split',
    imagePath: '/images/products/bamboo-split-wholesale.webp',
    altText: 'Bamboo splits bundled for commercial supply',
  },
  {
    id: 'gal-ball-pen-packaging',
    title: 'Ball Pen — Klick (30 pcs/box) & Plano (50 pcs/box)',
    titleMm: 'ဘောပင် (Ball Pen) — Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs)',
    category: 'Printing Products',
    caption:
      'Klick (30 pcs per box) and Plano (50 pcs per box) Ball Pen packaging under our Offset Printing & Stationery division.',
    captionMm:
      'အော့ဖ်ဆက်ပုံနှိပ်နှင့် စာရေးကိရိယာဌာနမှ ဖြန့်ဖြူးသော Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs) ဘူးထုပ်ပိုးမှုပုံစံ။',
    visualType: 'commercial-printing',
    imagePath: '/assets/aistudio/Branding_Image_V2_cc9a2035.webp',
    altText:
      'TB Star Company Limited Ball Pen — Klick (30 pcs per box) and Plano (50 pcs per box) packaging',
  },
  {
    id: 'gal-ball-pen-designs',
    title: 'Ball Pen Stationery — Klick & Plano Pen Showcase',
    titleMm: 'Klick နှင့် Plano ဘောပင် ဒီဇိုင်းနှင့် ထုပ်ပိုးမှုပြခန်း',
    category: 'Printing Products',
    caption:
      'View of Klick (30 pcs per box) and Plano (50 pcs per box) ball pens.',
    captionMm:
      'Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs) ဘောပင်များ ပြကွက်။',
    visualType: 'commercial-printing',
    imagePath: '/assets/aistudio/Branding_Image_V1_c6c098a8.webp',
    altText:
      'TB Star Company Limited Ball Pen — Klick (30 pcs per box) and Plano (50 pcs per box) pen showcase',
  },
  {
    id: 'gal-offset-printing',
    title: 'One-Stop Offset Printing — Placeholder Illustration',
    titleMm: 'တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက် ပုံနှိပ်လုပ်ငန်း (ယာယီပုံစံ)',
    category: 'Printing Products',
    caption:
      "Placeholder illustration for Books Printing, Voucher Books Printing, and Other Offset Printing Services — to be replaced with TB Star's own photos.",
    captionMm:
      'စာအုပ်ပုံနှိပ်ခြင်း၊ ဘောင်ချာစာအုပ်ပုံနှိပ်ခြင်းနှင့် အခြားအော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများအတွက် TB Star ၏ ကိုယ်ပိုင်ဓာတ်ပုံများဖြင့် အစားထိုးရန် ယာယီပုံစံ။',
    visualType: 'books-printing',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    altText: "Placeholder illustration for Offset Printing — to be replaced with TB Star's own photos",
  },
  {
    id: 'gal-company-activities',
    title: 'Domestic Distribution & Export Trade Coordination',
    titleMm: 'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန် လုပ်ငန်းဆောင်ရွက်မှု',
    category: 'Other Company Activities',
    caption:
      'Coordinating natural Myanmar bamboo shipments and commercial printing orders from Central Tower, Yangon since 2013.',
    captionMm:
      '၂၀၁၃ ခုနှစ်မှစတင်၍ ရန်ကုန်မြို့ Central Tower ရုံးချုပ်မှ ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်လုပ်ငန်းများ ဆောင်ရွက်နေမှု။',
    visualType: 'bamboo-custom',
    imagePath: '/images/products/bamboo-split-featured.webp',
    altText: 'TB Star Company Limited bamboo export and distribution activities',
  },
];

export interface WhyChooseUsItem {
  index: string;
  divisionTag: string;
  divisionTagMm?: string;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
}

export const WHY_CHOOSE_US_ITEMS: WhyChooseUsItem[] = [
  {
    index: '01',
    divisionTag: 'Established in 2013',
    divisionTagMm: '၂၀၁၃ ခုနှစ်မှစတင်သော အတွေ့အကြုံ',
    title: 'Operating in Myanmar Since 2013',
    titleMm: '၂၀၁၃ ခုနှစ်မှစတင်၍ မြန်မာနိုင်ငံတွင် လုပ်ငန်းဆောင်ရွက်နေသော ကုမ္ပဏီ',
    description:
      'Established in 2013, TB Star Company Limited serves domestic and international customers through its bamboo products and printing services businesses.',
    descriptionMm:
      '၂၀၁၃ ခုနှစ်တွင် စတင်တည်ထောင်ခဲ့သော TBStar Company Limited သည် သဘာဝဝါးထုတ်ကုန်နှင့် ပုံနှိပ်ဝန်ဆောင်မှုလုပ်ငန်းများဖြင့် ပြည်တွင်းနှင့် နိုင်ငံတကာ မိတ်ဖက်များအား ဝန်ဆောင်မှုပေးလျက်ရှိပါသည်။',
  },
  {
    index: '02',
    divisionTag: '100% Natural Bamboo',
    divisionTagMm: '၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ်',
    title: 'Verified Myanmar Bamboo Specifications',
    titleMm: 'တိကျမှန်ကန်သော မြန်မာ့သဘာဝဝါး စံချိန်စံညွှန်းများ',
    description:
      'We supply 3 mm Bamboo Split (20 to 48 inches, with nodes or without nodes) and 1.2–2.5 mm Bamboo Sticks (8", 9", 10", packed 30 kg per bag).',
    descriptionMm:
      'အထူ 3 mm ဝါးခြမ်းပြား (၂၀ မှ ၄၈ လက်မ၊ အဆစ်ပါ သို့မဟုတ် အဆစ်မပါ) နှင့် 1.2–2.5 mm ဝါးတံ (၈"၊ ၉"၊ ၁၀"၊ တစ်အိတ် 30 kg) တို့ကို ထုတ်လုပ်ပေးပါသည်။',
  },
  {
    index: '03',
    divisionTag: 'Local & Export Supply',
    divisionTagMm: 'ပြည်တွင်းနှင့် ပြည်ပပို့ကုန်',
    title: 'Domestic Distribution & International Export',
    titleMm: 'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် နိုင်ငံတကာ ပြည်ပပို့ကုန်',
    description:
      'Supporting both domestic distribution within Myanmar and international export shipments from Yangon.',
    descriptionMm:
      'မြန်မာနိုင်ငံ ပြည်တွင်းဖြန့်ဖြူးရေးသာမက နိုင်ငံတကာ ပြည်ပပို့ကုန်တင်ပို့မှုများကိုပါ ရန်ကုန်မြို့မှ ဆောင်ရွက်ပေးလျက်ရှိပါသည်။',
  },
  {
    index: '04',
    divisionTag: 'Printing & Stationery',
    divisionTagMm: 'ပုံနှိပ်နှင့် စာရေးကိရိယာ',
    title: 'One-Stop Offset Printing & Ball Pen Supply',
    titleMm: 'တစ်နေရာတည်း အပြီးအစီး ပုံနှိပ်လုပ်ငန်းနှင့် Ball Pen ဖြန့်ဖြူးရေး',
    description:
      'Books Printing, Voucher Books Printing, and Other Offset Printing Services alongside Klick (30 pcs/box) and Plano (50 pcs/box) Ball Pen supply.',
    descriptionMm:
      'စာအုပ်ပုံနှိပ်ခြင်း၊ ဘောင်ချာစာအုပ်ပုံနှိပ်ခြင်းနှင့် အခြားအော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများအပြင် Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs) ဘောပင်များကိုပါ ရရှိနိုင်ပါသည်။',
  },
];

export interface IndustryServedItem {
  id: string;
  index: string;
  sector: string;
  sectorMm: string;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  productsUsed: string;
  productsUsedMm: string;
  inquiryType: InquiryTypeOption;
}

export const INDUSTRIES_SERVED: IndustryServedItem[] = [
  {
    id: 'ind-agriculture',
    index: '01',
    sector: 'Agriculture & Horticulture',
    sectorMm: 'စိုက်ပျိုးရေးနှင့် ဥယျာဉ်ခြံလုပ်ငန်း',
    title: 'Crop Support, Nursery Stakes & Weaving',
    titleMm: 'စိုက်ပျိုးရေးသုံး ဝါးခြမ်းပြားနှင့် ဝါးထုတ်ကုန်များ',
    description:
      'Supplying 3 mm natural Myanmar Bamboo Split (20 to 48 inches, with nodes or without nodes) for plant support, nursery structures, and weaving.',
    descriptionMm:
      'စိုက်ပျိုးရေးခြံများ၊ ပျိုးဥယျာဉ်များနှင့် ဝါးရက်လုပ်ငန်းများအတွက် အထူ 3 mm သဘာဝ မြန်မာ့ဝါးခြမ်းပြားများ (၂၀–၄၈ လက်မ၊ အဆစ်ပါ သို့မဟုတ် အဆစ်မပါ) ကို ဖြန့်ဖြူးပေးပါသည်။',
    productsUsed: 'Bamboo Split (3 mm · 20–48 inches · With Nodes / Without Nodes)',
    productsUsedMm: 'ဝါးခြမ်းပြား (အထူ 3 mm · ၂၀–၄၈ လက်မ · အဆစ်ပါ / အဆစ်မပါ)',
    inquiryType: 'Bamboo Split',
  },
  {
    id: 'ind-incense-craft',
    index: '02',
    sector: 'Incense & Stick Manufacturing',
    sectorMm: 'အမွှေးတိုင်နှင့် လက်မှုကုန်ထုတ်လုပ်ငန်း',
    title: 'Raw Bamboo Sticks for Incense & Crafts',
    titleMm: 'အမွှေးတိုင်နှင့် လက်မှုလုပ်ငန်းသုံး သဘာဝဝါးတံများ',
    description:
      '1.2 to 2.5 mm natural bamboo sticks in 8, 9, and 10 inch sizes, packed 30 kg per bag.',
    descriptionMm:
      'အမွှေးတိုင်လုပ်ငန်းနှင့် လက်မှုကုန်ထုတ်လုပ်ငန်းများအတွက် အထူ 1.2–2.5 mm၊ အရွယ်အစား ၈"၊ ၉"၊ ၁၀" ဝါးတံများကို တစ်အိတ် 30 kg ထုပ်ပိုးပံ့ပိုးပေးပါသည်။',
    productsUsed: 'Bamboo Sticks (1.2–2.5 mm · 8", 9", 10" · 30 kg/bag)',
    productsUsedMm: 'ဝါးတံ (အထူ 1.2–2.5 mm · ၈"၊ ၉"၊ ၁၀" · တစ်အိတ် 30 kg)',
    inquiryType: 'Bamboo Sticks',
  },
  {
    id: 'ind-filtration',
    index: '03',
    sector: 'Activated Carbon Inquiries',
    sectorMm: 'အက်တီဗိတ်တက် ကာဗွန် ကဏ္ဍ',
    title: 'Activated Carbon Commercial Inquiries',
    titleMm: 'အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon) စုံစမ်းမေးမြန်းမှုများ',
    description:
      'Direct inquiry coordination with our Yangon office for buyers inquiring about Activated Carbon.',
    descriptionMm:
      'အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon) အတွက် စုံစမ်းမေးမြန်းလိုသူများအား ရန်ကုန်ရုံးချုပ်မှ တိုက်ရိုက်လက်ခံဆွေးနွေးပေးပါသည်။',
    productsUsed: 'Activated Carbon (Inquiry Only)',
    productsUsedMm: 'အက်တီဗိတ်တက် ကာဗွန် (ဆက်သွယ်စုံစမ်းရန်)',
    inquiryType: 'Activated Carbon',
  },
  {
    id: 'ind-publishing',
    index: '04',
    sector: 'Publishing & Education',
    sectorMm: 'စာပေထုတ်ဝေရေးနှင့် ပညာရေးကဏ္ဍ',
    title: 'Books, Manuals & Educational Print Runs',
    titleMm: 'စာအုပ်စာပေနှင့် ပညာရေးဆိုင်ရာ ပုံနှိပ်လုပ်ငန်းများ',
    description:
      'One-stop offset printing for publishers, schools, and organizations requiring multi-page books and training manuals.',
    descriptionMm:
      'စာပေထုတ်ဝေသူများ၊ သင်တန်းကျောင်းများနှင့် အဖွဲ့အစည်းများအတွက် စာအုပ်အမျိုးမျိုးကို တစ်နေရာတည်းတွင် အပြီးအစီး ပုံနှိပ်ပေးပါသည်။',
    productsUsed: 'Books Printing (One-Stop Offset Press)',
    productsUsedMm: 'စာအုပ်ပုံနှိပ်ခြင်းလုပ်ငန်း (Books Printing)',
    inquiryType: 'Books Printing',
  },
  {
    id: 'ind-retail-wholesale',
    index: '05',
    sector: 'Retail, Wholesale & Accounting',
    sectorMm: 'လက်လီ/လက်ကားနှင့် စာရင်းကိုင်လုပ်ငန်းများ',
    title: 'Commercial Voucher Books & Receipt Pads',
    titleMm: 'လုပ်ငန်းသုံး ဘောင်ချာစာအုပ်နှင့် ပြေစာစာအုပ်များ',
    description:
      'Voucher books, invoice pads, and delivery forms for daily commercial transactions.',
    descriptionMm:
      'နေ့စဉ် အရောင်းအဝယ်နှင့် စာရင်းမှတ်တမ်းများအတွက် ဘောင်ချာစာအုပ်များနှင့် ပြေစာစာအုပ်များကို စိတ်ကြိုက်ပုံနှိပ်ပေးပါသည်။',
    productsUsed: 'Voucher Books Printing & Commercial Forms',
    productsUsedMm: 'ဘောင်ချာစာအုပ် ပုံနှိပ်ခြင်းလုပ်ငန်း',
    inquiryType: 'Voucher Books Printing',
  },
  {
    id: 'ind-office-stationery',
    index: '06',
    sector: 'Corporate Offices & Stationery',
    sectorMm: 'ရုံးလုပ်ငန်းနှင့် စာရေးကိရိယာ ဖြန့်ဖြူးရေး',
    title: 'Ball Pen Supply & Corporate Print',
    titleMm: 'Ball Pen စာရေးကိရိယာနှင့် ရုံးသုံးပုံနှိပ်ပစ္စည်းများ',
    description:
      'Supplying Klick (30 pcs per box) and Plano (50 pcs per box) Ball Pens alongside brochures, business cards, and office stationery.',
    descriptionMm:
      'Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs) ဘောပင်များအပြင် လက်ကမ်းစာစောင်နှင့် ရုံးသုံးပုံနှိပ်ပစ္စည်းများကို ဖြန့်ဖြူးပေးပါသည်။',
    productsUsed: 'Ball Pen (Klick: 30 pcs/box · Plano: 50 pcs/box)',
    productsUsedMm: 'ဘောပင် · Ball Pen (Klick / Plano)',
    inquiryType: 'Ball Pen',
  },
];

export const EXPORT_AND_DOMESTIC_MARKETS = {
  domestic: {
    badge: 'DOMESTIC DISTRIBUTION · MYANMAR',
    title: 'Domestic Myanmar Distribution Network',
    titleMm: 'မြန်မာနိုင်ငံ ပြည်တွင်းစျေးကွက် ဖြန့်ဖြူးရေး',
    description:
      'From our office in Kyauktada Township, Yangon, TB Star Company Limited distributes natural bamboo products, offset printed materials, and Ball Pen stationery to buyers across Myanmar.',
    descriptionMm:
      'ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ် ရုံးချုပ်မှတစ်ဆင့် မြန်မာနိုင်ငံတစ်ဝန်းရှိ ဝယ်ယူသူများထံသို့ သဘာဝဝါးထုတ်ကုန်များ၊ အော့ဖ်ဆက်ပုံနှိပ်ပစ္စည်းများနှင့် Ball Pen စာရေးကိရိယာများကို ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။',
    regions: [
      {
        name: 'Yangon commercial, wholesale, and industrial buyers',
        nameMm: 'ရန်ကုန်မြို့တွင်းရှိ စီးပွားရေး၊ လက်ကားနှင့် စက်မှုလုပ်ငန်းများ',
      },
      {
        name: 'Agricultural, craft, and incense producers across Myanmar',
        nameMm: 'မြန်မာနိုင်ငံတစ်ဝန်းရှိ စိုက်ပျိုးရေး၊ လက်မှုနှင့် အမွှေးတိုင်လုပ်ငန်းများ',
      },
      {
        name: 'Publishers, corporate offices, and stationery distributors',
        nameMm: 'စာပေထုတ်ဝေရေး၊ ကုမ္ပဏီရုံးများနှင့် စာရေးကိရိယာ ဖြန့်ချိရေးလုပ်ငန်းများ',
      },
    ],
  },
  international: {
    badge: 'INTERNATIONAL EXPORT · MYANMAR ORIGIN',
    title: 'International Export Supply',
    titleMm: 'နိုင်ငံတကာ ပြည်ပပို့ကုန် တင်ပို့ရောင်းချခြင်း',
    description:
      'We supply 100% natural Myanmar Bamboo Split and Bamboo Sticks (packed 30 kg per bag) for international export.',
    descriptionMm:
      'မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝ ဝါးခြမ်းပြားနှင့် ဝါးတံ (တစ်အိတ် 30 kg) တို့ကို နိုင်ငံတကာ ပြည်ပပို့ကုန်အဖြစ် တင်ပို့ရောင်းချပေးလျက်ရှိပါသည်။',
    regions: [
      {
        name: 'Bamboo Split (3 mm thickness, 20 to 48 inches, with nodes or without nodes)',
        nameMm: 'ဝါးခြမ်းပြား (အထူ 3 mm၊ ၂၀ မှ ၄၈ လက်မ၊ အဆစ်ပါ သို့မဟုတ် အဆစ်မပါ)',
      },
      {
        name: 'Bamboo Sticks (1.2 to 2.5 mm, sizes 8, 9, 10 inches, packed 30 kg per bag)',
        nameMm: 'ဝါးတံ (အထူ 1.2 မှ 2.5 mm၊ အရွယ်အစား ၈၊ ၉၊ ၁၀ လက်မ၊ တစ်အိတ် 30 kg)',
      },
      {
        name: 'Direct export inquiry coordination from Yangon, Myanmar',
        nameMm: 'ရန်ကုန်ရုံးချုပ်မှ ပြည်ပပို့ကုန် စုံစမ်းမေးမြန်းမှုများကို တိုက်ရိုက်ဆောင်ရွက်ပေးခြင်း',
      },
    ],
  },
};

export interface QualityStandardItem {
  id: string;
  index: string;
  category: string;
  categoryMm: string;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  standardSpec: string;
  standardSpecMm: string;
}

export const QUALITY_AND_STANDARDS: QualityStandardItem[] = [
  {
    id: 'qual-material',
    index: '01',
    category: 'Raw Material Purity',
    categoryMm: 'သဘာဝကုန်ကြမ်း စစ်မှန်မှု',
    title: '100% Natural Myanmar Bamboo',
    titleMm: '၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ်',
    description:
      'Bamboo Split and Bamboo Sticks are processed from 100% natural bamboo originating in Myanmar.',
    descriptionMm:
      'ဝါးခြမ်းပြားနှင့် ဝါးတံများကို မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးစစ်စစ်ဖြင့် ထုတ်လုပ်ထားပါသည်။',
    standardSpec: 'Origin: Myanmar · 100% Natural Bamboo',
    standardSpecMm: 'မူရင်းဒေသ - မြန်မာ · ၁၀၀% သဘာဝဝါး',
  },
  {
    id: 'qual-split',
    index: '02',
    category: 'Bamboo Split Specifications',
    categoryMm: 'ဝါးခြမ်းပြား စံချိန်စံညွှန်း',
    title: '3 mm Thickness & 20–48 Inch Lengths',
    titleMm: 'အထူ 3 mm နှင့် အရှည် ၂၀–၄၈ လက်မ',
    description:
      'Sized to 3 mm thickness across 20 to 48 inch lengths, available with nodes or without nodes.',
    descriptionMm:
      'အထူ 3 mm၊ အရှည် ၂၀ မှ ၄၈ လက်မ ရှိပြီး အဆစ်ပါ သို့မဟုတ် အဆစ်မပါ ရရှိနိုင်ပါသည်။',
    standardSpec: '3 mm · 20"–48" · With Nodes / Without Nodes',
    standardSpecMm: '3 mm · ၂၀"–၄၈" · အဆစ်ပါ / အဆစ်မပါ',
  },
  {
    id: 'qual-sticks',
    index: '03',
    category: 'Bamboo Sticks Packaging',
    categoryMm: 'ဝါးတံ ထုပ်ပိုးမှုစံနှုန်း',
    title: '1.2–2.5 mm Thickness & 30 kg Bags',
    titleMm: 'အထူ 1.2–2.5 mm နှင့် 30 kg ထုပ်ပိုးမှု',
    description:
      'Sized to 1.2 to 2.5 mm thickness in 8, 9, and 10 inch sizes and packed 30 kg per bag.',
    descriptionMm:
      'အထူ 1.2 မှ 2.5 mm၊ အရွယ်အစား ၈"၊ ၉"၊ ၁၀" ဝါးတံများကို တစ်အိတ် 30 kg ထုပ်ပိုးထားပါသည်။',
    standardSpec: '1.2–2.5 mm · 8", 9", 10" · 30 kg/bag',
    standardSpecMm: '1.2–2.5 mm · ၈"၊ ၉"၊ ၁၀" · တစ်အိတ် 30 kg',
  },
  {
    id: 'qual-printing',
    index: '04',
    category: 'Printing & Stationery',
    categoryMm: 'ပုံနှိပ်နှင့် စာရေးကိရိယာ',
    title: 'One-Stop Press & Boxed Stationery',
    titleMm: 'အပြီးအစီး ပုံနှိပ်မှုနှင့် ဘောပင်ဘူးများ',
    description:
      'Offset printing for books, voucher books, and other offset printing services plus Klick (30 pcs/box) and Plano (50 pcs/box) Ball Pen packaging.',
    descriptionMm:
      'စာအုပ်များ၊ ဘောင်ချာစာအုပ်များနှင့် အခြားအော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းများအပြင် Klick (30 pcs/box) နှင့် Plano (50 pcs/box) ဘောပင်များ။',
    standardSpec: 'One-Stop Offset · Klick (30) & Plano (50)',
    standardSpecMm: 'အော့ဖ်ဆက်ပုံနှိပ် · Klick (30) & Plano (50)',
  },
];

export const COMPANY_VISION_MISSION = {
  vision: {
    kicker: 'CORPORATE VISION · မျှော်မှန်းချက်',
    title: 'Dependable Myanmar Bamboo & Offset Printing Partner',
    titleMm: 'ယုံကြည်စိတ်ချရသော မြန်မာ့သဘာဝဝါးနှင့် အော့ဖ်ဆက်ပုံနှိပ် လုပ်ငန်းမိတ်ဖက်',
    statement:
      'To be a trusted partner for domestic and international customers seeking 100% natural Myanmar bamboo products and one-stop offset printing and stationery solutions.',
    statementMm:
      'ပြည်တွင်းနှင့် နိုင်ငံတကာမှ ဝယ်ယူသူများအတွက် ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များနှင့် တစ်နေရာတည်းတွင် အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်နှင့် စာရေးကိရိယာ ဝန်ဆောင်မှုများကို ပံ့ပိုးပေးနိုင်သော ယုံကြည်စိတ်ချရသည့် ကုမ္ပဏီဖြစ်လာစေရန်။',
    highlights: [
      'Operating in Myanmar since our establishment in 2013',
      'Supplying Bamboo Split and Bamboo Sticks',
      'Providing one-stop offset printing and stationery supply in Yangon',
    ],
    highlightsMm: [
      '၂၀၁၃ ခုနှစ်မှစတင်၍ မြန်မာနိုင်ငံတွင် လုပ်ငန်းဆောင်ရွက်မှု',
      'ဝါးခြမ်းပြားနှင့် ဝါးတံများ ထုတ်လုပ်ဖြန့်ဖြူးမှု',
      'ရန်ကုန်မြို့တွင် တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်နှင့် စာရေးကိရိယာ ဝန်ဆောင်မှု',
    ],
  },
  mission: {
    kicker: 'CORPORATE MISSION · ရည်မှန်းချက်',
    title: 'Delivering Verified Specifications & Responsive Service',
    titleMm: 'တိကျသော စံချိန်စံညွှန်းနှင့် မြန်ဆန်သွက်လက်သော ဝန်ဆောင်မှု ပေးအပ်ရန်',
    statement:
      'To supply natural Myanmar bamboo products to clear specifications while providing businesses with one-stop offset printing and stationery products.',
    statementMm:
      'မြန်မာ့သဘာဝဝါးထုတ်ကုန်များကို တိကျသော စံချိန်စံညွှန်းများအတိုင်း ထုတ်လုပ်ဖြန့်ဖြူးရန်နှင့် စီးပွားရေးလုပ်ငန်းများအတွက် အော့ဖ်ဆက်ပုံနှိပ်နှင့် စာရေးကိရိယာများကို တစ်နေရာတည်းတွင် ပံ့ပိုးပေးရန်။',
    highlights: [
      'Supplying Bamboo Split (3 mm, 20–48 inches) and Bamboo Sticks (30 kg/bag)',
      'Serving both domestic Myanmar distribution and international export markets',
      'Delivering Books Printing, Voucher Books Printing, and Klick / Plano Ball Pens',
    ],
    highlightsMm: [
      'ဝါးခြမ်းပြား (3 mm, ၂၀–၄၈ လက်မ) နှင့် ဝါးတံ (30 kg/bag) တို့ကို ထုတ်လုပ်တင်ပို့ခြင်း',
      'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် နိုင်ငံတကာ ပြည်ပပို့ကုန်စျေးကွက် နှစ်ခုလုံးကို ဝန်ဆောင်မှုပေးခြင်း',
      'စာအုပ်များ၊ ဘောင်ချာစာအုပ်များနှင့် Klick / Plano ဘောပင်များကို ဖြန့်ဖြူးပေးခြင်း',
    ],
  },
};

export interface CorporateValueItem {
  index: string;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
}

export const PROPOSED_CORPORATE_VALUES: CorporateValueItem[] = [
  {
    index: '01',
    title: 'Clear & Verified Product Specifications',
    titleMm: 'တိကျရှင်းလင်းသော ကုန်ပစ္စည်း စံချိန်စံညွှန်းများ',
    description:
      'Every bamboo and stationery product is presented with clear specifications—from 3 mm Bamboo Split (20 to 48 inches) to 30 kg Bamboo Stick bags and boxed Ball Pens.',
    descriptionMm:
      'အထူ 3 mm ဝါးခြမ်းပြားများ (၂၀ မှ ၄၈ လက်မ)၊ တစ်အိတ် 30 kg ဝါးတံများနှင့် Klick / Plano ဘောပင်ဘူးများအထိ စံချိန်စံညွှန်းများကို ရှင်းလင်းစွာ ဖော်ပြထားပါသည်။',
  },
  {
    index: '02',
    title: 'Long-Term B2B Reliability Since 2013',
    titleMm: '၂၀၁၃ ခုနှစ်မှစတင်သော ရေရှည်လုပ်ငန်း ယုံကြည်စိတ်ချရမှု',
    description:
      'Operating in Myanmar since 2013, we focus on practical, long-term supply relationships with domestic buyers, exporters, and corporate clients.',
    descriptionMm:
      '၂၀၁၃ ခုနှစ်မှစတင်၍ မြန်မာနိုင်ငံတွင် လုပ်ငန်းဆောင်ရွက်လျက်ရှိပြီး ပြည်တွင်းဝယ်ယူသူများ၊ ပြည်ပပို့ကုန်ဝယ်ယူသူများနှင့် ကုမ္ပဏီများအတွက် ရေရှည်လက်တွဲဆောင်ရွက်လျက်ရှိပါသည်။',
  },
  {
    index: '03',
    title: 'Direct Communication from Our Yangon Office',
    titleMm: 'ရန်ကုန်ရုံးချုပ်မှ တိုက်ရိုက် ချိတ်ဆက်ဆောင်ရွက်ပေးမှု',
    description:
      'Our team at Central Tower in Kyauktada Township, Yangon coordinates all product, export, and printing inquiries directly via phone and WhatsApp.',
    descriptionMm:
      'ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ်၊ Central Tower ရုံးချုပ်မှတစ်ဆင့် ဝယ်ယူသူများ၏ မေးမြန်းချက်များကို ဖုန်းနှင့် WhatsApp တို့ဖြင့် တိုက်ရိုက် ပြန်လည်ဖြေကြား ဆောင်ရွက်ပေးပါသည်။',
  },
];

export interface BusinessPartnerCollaborationItem {
  id: string;
  index: string;
  partnerType: string;
  partnerTypeMm: string;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  collaborationPoints: string[];
  collaborationPointsMm: string[];
  inquiryType: InquiryTypeOption;
}

export const BUSINESS_PARTNERS_COLLABORATION: BusinessPartnerCollaborationItem[] = [
  {
    id: 'partner-export',
    index: '01',
    partnerType: 'International Importers & Buyers',
    partnerTypeMm: 'နိုင်ငံတကာ ပို့ကုန်ဝယ်ယူသူများ',
    title: 'Bamboo Export Supply Partners',
    titleMm: 'သဘာဝဝါး ပြည်ပပို့ကုန် မိတ်ဖက်များ',
    description:
      'We work with international buyers sourcing 100% natural Myanmar Bamboo Split and Bamboo Sticks.',
    descriptionMm:
      'မြန်မာ့သဘာဝ ဝါးခြမ်းပြားနှင့် ဝါးတံများကို ပြည်ပသို့ တင်သွင်းလိုသော နိုင်ငံတကာ ဝယ်ယူသူများနှင့် လက်တွဲဆောင်ရွက်ပါသည်။',
    collaborationPoints: [
      'Bamboo Split: 3 mm thickness, 20 to 48 inches, with nodes or without nodes',
      'Bamboo Sticks: 1.2 to 2.5 mm, 8"/9"/10", packed 30 kg per bag',
      'Direct export inquiry coordination with our Yangon office',
    ],
    collaborationPointsMm: [
      'ဝါးခြမ်းပြား - အထူ 3 mm၊ ၂၀ မှ ၄၈ လက်မ၊ အဆစ်ပါ သို့မဟုတ် အဆစ်မပါ',
      'ဝါးတံ - အထူ 1.2–2.5 mm၊ အရွယ်အစား ၈"၊ ၉"၊ ၁၀" (တစ်အိတ် 30 kg)',
      'ရန်ကုန်ရုံးချုပ်နှင့် တိုက်ရိုက်ချိတ်ဆက်၍ ပို့ကုန်ဆောင်ရွက်နိုင်ခြင်း',
    ],
    inquiryType: 'Bamboo Split',
  },
  {
    id: 'partner-domestic',
    index: '02',
    partnerType: 'Domestic Wholesalers & Enterprises',
    partnerTypeMm: 'ပြည်တွင်း လက်ကားနှင့် ကုန်ထုတ်လုပ်ငန်းများ',
    title: 'Myanmar Domestic Distribution Partners',
    titleMm: 'ပြည်တွင်း ဖြန့်ဖြူးရေးနှင့် လုပ်ငန်းသုံး မိတ်ဖက်များ',
    description:
      'We supply agricultural businesses, incense manufacturers, and local distributors across Myanmar with natural bamboo products and Activated Carbon inquiries.',
    descriptionMm:
      'ပြည်တွင်းရှိ စိုက်ပျိုးရေးလုပ်ငန်းများ၊ အမွှေးတိုင်လုပ်ငန်းများနှင့် ဖြန့်ချိသူများသို့ သဘာဝဝါးထုတ်ကုန်များနှင့် Activated Carbon ကဏ္ဍအတွက် ပူးပေါင်းဆောင်ရွက်ပါသည်။',
    collaborationPoints: [
      'Domestic supply of Bamboo Split and Bamboo Sticks',
      'Direct consultation for Activated Carbon inquiries',
      'Coordination from Kyauktada Township, Yangon',
    ],
    collaborationPointsMm: [
      'ပြည်တွင်းစျေးကွက်အတွက် ဝါးခြမ်းပြားနှင့် ဝါးတံများ ဖြန့်ဖြူးပေးခြင်း',
      'Activated Carbon အတွက် တိုက်ရိုက်ဆက်သွယ် မေးမြန်းနိုင်ခြင်း',
      'ရန်ကုန်မြို့ ကျောက်တံတားမြို့နယ် ရုံးချုပ်မှ ဆက်သွယ်မှာယူနိုင်ခြင်း',
    ],
    inquiryType: 'Bamboo Sticks',
  },
  {
    id: 'partner-printing',
    index: '03',
    partnerType: 'Corporate, Publishing & Retail Clients',
    partnerTypeMm: 'ကုမ္ပဏီများ၊ စာပေထုတ်ဝေရေးနှင့် စာရေးကိရိယာဆိုင်များ',
    title: 'Offset Printing & Stationery Partners',
    titleMm: 'ပုံနှိပ်နှင့် စာရေးကိရိယာ လုပ်ငန်းမိတ်ဖက်များ',
    description:
      'Supporting publishers, businesses, and stationery wholesalers with one-stop offset printing services and Klick & Plano Ball Pen supply.',
    descriptionMm:
      'စာအုပ်ထုတ်ဝေသူများ၊ ကုမ္ပဏီရုံးများနှင့် စာရေးကိရိယာဆိုင်များအတွက် အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းနှင့် Ball Pen (Klick / Plano) ဖြန့်ဖြူးရေး ဆောင်ရွက်ပေးပါသည်။',
    collaborationPoints: [
      'Books Printing, Voucher Books Printing, and Other Offset Printing Services',
      'Ball Pen Klick (30 pcs per box) and Plano (50 pcs per box)',
      'Direct coordination for business print and stationery orders',
    ],
    collaborationPointsMm: [
      'စာအုပ်ပုံနှိပ်ခြင်း၊ ဘောင်ချာစာအုပ်ပုံနှိပ်ခြင်းနှင့် အခြားအော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများ',
      'Ball Pen — Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs)',
      'လုပ်ငန်းသုံး ပုံနှိပ်နှင့် စာရေးကိရိယာများကို တိုက်ရိုက်ဆက်သွယ် မှာယူနိုင်ခြင်း',
    ],
    inquiryType: 'Books Printing',
  },
];
