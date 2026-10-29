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
  domain: 'www.tbstar.com.mm',
  canonicalBase: 'https://www.tbstar.com.mm',
  telephone: '09 422 479994',
  telephoneHref: 'tel:+959422479994',
  whatsappHref: 'https://wa.me/959422479994',
  email: 'info@tbstar.com.mm',
  emailHref: 'mailto:info@tbstar.com.mm',
  logoPath: '/assets/aistudio/TBStar_073dded3.jpeg',
  address: {
    line1: 'Room No. 1103, 11th Floor, Central Tower',
    line2: 'Corner of 39th Street and Anawrahta Road',
    township: 'Kyauktada Township',
    city: 'Yangon',
    country: 'Myanmar',
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
    imagePath:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/A_true_bamboo_forest_%2836443777482%29.jpg/1280px-A_true_bamboo_forest_%2836443777482%29.jpg',
    publicSourceUrl: '/images/products/bamboo-split-natural.webp',
    alt: 'Natural green bamboo forest canopy representing TB Star Company Limited natural bamboo and printing businesses',
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
    imagePath:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1280&q=80',
    publicSourceUrl: '/images/products/bamboo-split-natural.webp',
    alt: 'Modern corporate headquarters architecture representing TB Star Company Limited established in 2013 in Yangon',
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
    imagePath:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Sagano_Bamboo_Forest_at_Arashimaya.jpg/1280px-Sagano_Bamboo_Forest_at_Arashimaya.jpg',
    publicSourceUrl: '/images/products/bamboo-split-main.webp',
    alt: 'Tall natural green bamboo stalks representing 100% natural Myanmar Bamboo Split and Bamboo Sticks',
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
    imagePath:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Bamboo_charcoal.jpg/1280px-Bamboo_charcoal.jpg',
    publicSourceUrl: '/images/products/bamboo-split-texture.webp',
    alt: 'Carbonized natural bamboo charcoal and activated carbon material texture',
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
    imagePath:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Offset_printing_press_2.jpg/1280px-Offset_printing_press_2.jpg',
    publicSourceUrl: '/assets/aistudio/Branding_Image_V2_cc9a2035.webp',
    alt: 'Commercial multi-unit offset printing press representing TB Star one-stop offset printing services',
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
    imagePath:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1280&q=80',
    publicSourceUrl: '/images/products/bamboo-split-featured.webp',
    alt: 'Organized commercial warehouse and export packaging showcase for TB Star Company Limited',
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
    imagePath:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1280&q=80',
    publicSourceUrl: '/images/products/bamboo-split-wholesale.webp',
    alt: 'Modern executive corporate office corridor representing TB Star Company Limited Yangon headquarters',
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

export interface PageSeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogImageAlt: string;
  breadcrumbs: { name: string; url: string }[];
}

export const PAGE_SEO: Record<PageRoute, PageSeoMetadata> = {
  '/': {
    title:
      'TB Star Company Limited – Natural Myanmar Bamboo Products, Activated Carbon & Offset Printing Services',
    description:
      'Established in 2013, TB Star Company Limited operates in Yangon, Myanmar, supplying 100% natural Myanmar Bamboo Split, Bamboo Sticks, Activated Carbon, and one-stop Offset Printing Services & Ball Pen stationery.',
    canonicalUrl: 'https://www.tbstar.com.mm/',
    ogImage: 'https://www.tbstar.com.mm/images/products/bamboo-split-main.webp',
    ogImageAlt: 'Natural Myanmar bamboo splits with nodes by TB Star Company Limited',
    breadcrumbs: [{ name: 'Home', url: 'https://www.tbstar.com.mm/' }],
  },
  '/about': {
    title: 'About TB Star Company Limited – Established in 2013 in Yangon, Myanmar',
    description:
      'Established in 2013, TB Star Company Limited has been operating in Myanmar, serving domestic and international customers through its bamboo products and printing services businesses.',
    canonicalUrl: 'https://www.tbstar.com.mm/about',
    ogImage: 'https://www.tbstar.com.mm/images/products/bamboo-split-natural.webp',
    ogImageAlt: 'About TB Star Company Limited in Yangon, Myanmar',
    breadcrumbs: [
      { name: 'Home', url: 'https://www.tbstar.com.mm/' },
      { name: 'About Us', url: 'https://www.tbstar.com.mm/about' },
    ],
  },
  '/bamboo-products': {
    title:
      'Bamboo Split & Bamboo Sticks Specifications – 100% Natural Myanmar Bamboo | TB Star',
    description:
      'Explore 100% natural Myanmar Bamboo Split (With Nodes: 50 pcs/bundle; Without Nodes: 100 pcs/bundle) and Bamboo Sticks (8", 9", 10" in 30 kg bags) from TB Star Company Limited.',
    canonicalUrl: 'https://www.tbstar.com.mm/bamboo-products',
    ogImage: 'https://www.tbstar.com.mm/images/products/bamboo-split-main.webp',
    ogImageAlt: '100% Natural Myanmar Bamboo Split and Bamboo Sticks by TB Star Company Limited',
    breadcrumbs: [
      { name: 'Home', url: 'https://www.tbstar.com.mm/' },
      { name: 'Bamboo Products', url: 'https://www.tbstar.com.mm/bamboo-products' },
    ],
  },
  '/charcoal': {
    title: 'Activated Carbon Inquiries – TB Star Company Limited Yangon, Myanmar',
    description:
      'Contact TB Star Company Limited in Yangon, Myanmar for Activated Carbon commercial inquiries alongside our natural Myanmar bamboo products.',
    canonicalUrl: 'https://www.tbstar.com.mm/charcoal',
    ogImage: 'https://www.tbstar.com.mm/assets/aistudio/Charcoal-Product.svg',
    ogImageAlt: 'TB Star Company Limited Activated Carbon Product Category',
    breadcrumbs: [
      { name: 'Home', url: 'https://www.tbstar.com.mm/' },
      { name: 'Activated Carbon', url: 'https://www.tbstar.com.mm/charcoal' },
    ],
  },
  '/printing-services': {
    title:
      'One-Stop Offset Printing Services & Ball Pen Stationery (Klick & Plano) | TB Star',
    description:
      'One-stop offset printing services in Yangon for Books Printing, Voucher Books Printing, and commercial print, plus Ball Pen stationery (Klick: 30 pcs/box; Plano: 50 pcs/box).',
    canonicalUrl: 'https://www.tbstar.com.mm/printing-services',
    ogImage: 'https://www.tbstar.com.mm/assets/aistudio/Branding_Image_V2_cc9a2035.webp',
    ogImageAlt:
      'TB Star Company Limited Offset Printing Services and Klick & Plano Ball Pen Stationery',
    breadcrumbs: [
      { name: 'Home', url: 'https://www.tbstar.com.mm/' },
      { name: 'Printing Services', url: 'https://www.tbstar.com.mm/printing-services' },
    ],
  },
  '/gallery': {
    title: 'Product & Packaging Gallery – Bamboo, Offset Printing & Ball Pen | TB Star',
    description:
      'Inspect product photos of 100% natural Myanmar Bamboo Split, Bamboo Sticks, 30 kg export packaging, Offset Printing deliverables, and Klick & Plano Ball Pens.',
    canonicalUrl: 'https://www.tbstar.com.mm/gallery',
    ogImage: 'https://www.tbstar.com.mm/images/products/bamboo-split-featured.webp',
    ogImageAlt: 'TB Star Company Limited Product and Packaging Gallery',
    breadcrumbs: [
      { name: 'Home', url: 'https://www.tbstar.com.mm/' },
      { name: 'Gallery', url: 'https://www.tbstar.com.mm/gallery' },
    ],
  },
  '/contact': {
    title: 'Contact TB Star Company Limited – Central Tower, Kyauktada Township, Yangon',
    description:
      'Contact TB Star Company Limited at Room 1103, 11th Floor, Central Tower, Kyauktada Township, Yangon (Tel: 09 422 479994) for Bamboo, Activated Carbon, Printing, and Ball Pen inquiries.',
    canonicalUrl: 'https://www.tbstar.com.mm/contact',
    ogImage: 'https://www.tbstar.com.mm/images/products/bamboo-split-main.webp',
    ogImageAlt: 'Contact TB Star Company Limited in Yangon, Myanmar',
    breadcrumbs: [
      { name: 'Home', url: 'https://www.tbstar.com.mm/' },
      { name: 'Contact Us', url: 'https://www.tbstar.com.mm/contact' },
    ],
  },
};

export interface SpecificationRow {
  parameter: string;
  parameterMm: string;
  value: string;
  valueMm: string;
  notes?: string;
  notesMm?: string;
}

export interface BambooProductItem {
  id: 'bamboo-split' | 'bamboo-sticks' | 'charcoal' | 'activated-carbon';
  index: string;
  name: string;
  nameMm: string;
  category: string;
  categoryMm: string;
  shortDescription: string;
  shortDescriptionMm: string;
  detailedDescription: string;
  detailedDescriptionMm: string;
  visualType: 'bamboo-split' | 'bamboo-sticks' | 'bamboo-custom' | 'charcoal';
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
  placeholderNote: string;
  placeholderNoteMm?: string;
  inquiryType: InquiryTypeOption;
  specifications: SpecificationRow[];
}

export const BAMBOO_PRODUCTS: BambooProductItem[] = [
  {
    id: 'bamboo-split',
    index: '01',
    name: 'Bamboo Split',
    nameMm: 'ဝါးခြမ်းပြား (Bamboo Split)',
    category: '100% Natural Bamboo · Domestic & Export Supply',
    categoryMm: '၁၀၀% သဘာဝ မြန်မာ့ဝါး · ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်',
    shortDescription:
      '100% natural Myanmar bamboo splits in 3 mm thickness and 20 to 48 inch lengths. Available With Nodes (50 pieces per bundle) and Without Nodes (100 pieces per bundle).',
    shortDescriptionMm:
      '၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ်ဖြင့် ထုတ်လုပ်ထားသော အထူ 3 mm၊ အရှည် ၂၀ လက်မမှ ၄၈ လက်မ ဝါးခြမ်းပြားများ။ အဆစ်ပါ (တစ်စည်း 50 pcs) နှင့် အဆစ်မပါ (တစ်စည်း 100 pcs) ရရှိနိုင်ပါသည်။',
    detailedDescription:
      'Manufactured from 100% natural bamboo originating in Myanmar, our Bamboo Split is processed to a uniform 3 mm thickness across lengths from 20 to 48 inches. Available in two types with standardized bundle packaging: With Nodes (50 pieces per bundle) and Without Nodes (100 pieces per bundle) for domestic distribution and international export.',
    detailedDescriptionMm:
      'မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးစစ်စစ်ဖြင့် အထူ 3 mm နှင့် အရှည် ၂၀ လက်မမှ ၄၈ လက်မအထိ စနစ်တကျ စိတ်ဖြာထုတ်လုပ်ထားပါသည်။ အဆစ်ပါ (With Nodes — တစ်စည်းလျှင် ၅၀ ချောင်း) နှင့် အဆစ်မပါ (Without Nodes — တစ်စည်းလျှင် ၁၀၀ ချောင်း) ဟူ၍ အမျိုးအစား (၂) မျိုး ထုပ်ပိုးထားပြီး ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်အတွက် အသင့်တော်ဆုံးဖြစ်ပါသည်။',
    visualType: 'bamboo-split',
    imagePath: '/images/products/bamboo-split-main.webp',
    imageAlt: 'Natural Myanmar bamboo splits with nodes',
    featuredImagePath: '/images/products/bamboo-split-featured.webp',
    featuredImageAlt: 'Featured natural Myanmar bamboo splits for export and domestic supply',
    naturalImagePath: '/images/products/bamboo-split-natural.webp',
    naturalImageAlt: 'Natural bamboo splits with authentic bamboo texture',
    wholesaleImagePath: '/images/products/bamboo-split-wholesale.webp',
    wholesaleImageAlt: 'Bamboo splits arranged in 50 pcs and 100 pcs bundles for commercial supply',
    textureImagePath: '/images/products/bamboo-split-texture.webp',
    textureImageAlt: 'Close-up texture of 3 mm natural Myanmar bamboo splits',
    placeholderNote: 'Bamboo Split · With Nodes (50 pcs/bundle) & Without Nodes (100 pcs/bundle)',
    placeholderNoteMm: 'ဝါးခြမ်းပြား · အဆစ်ပါ (တစ်စည်း 50 pcs) နှင့် အဆစ်မပါ (တစ်စည်း 100 pcs)',
    inquiryType: 'Bamboo Split',
    specifications: [
      {
        parameter: 'Product Name',
        parameterMm: 'ကုန်ပစ္စည်းအမည်',
        value: 'Bamboo Split',
        valueMm: 'ဝါးခြမ်းပြား (Bamboo Split)',
        notes: 'Core natural bamboo product line',
        notesMm: 'အဓိက သဘာဝဝါးထုတ်ကုန်',
      },
      {
        parameter: 'Material',
        parameterMm: 'ကုန်ကြမ်းအမျိုးအစား',
        value: '100% Natural Bamboo',
        valueMm: '၁၀၀% သဘာဝ ဝါးစစ်စစ်',
        notes: 'Mechanically split without synthetic binders',
        notesMm: 'ဓာတုဆေးဝါးမပါသော သဘာဝဝါးစစ်စစ်',
      },
      {
        parameter: 'Thickness',
        parameterMm: 'အထူ (Thickness)',
        value: '3 mm',
        valueMm: '3 mm (၃ မီလီမီတာ)',
        notes: 'Uniformly sized thickness',
        notesMm: 'တစ်ပြေးညီ အထူစံနှုန်း',
      },
      {
        parameter: 'Length',
        parameterMm: 'အရှည် (Length)',
        value: '20 – 48 inches',
        valueMm: '၂၀ လက်မ မှ ၄၈ လက်မ (20 – 48 inches)',
        notes: 'Supplied according to buyer length requirements',
        notesMm: 'ဝယ်ယူသူလိုအပ်ချက်အလိုက် ထုတ်လုပ်ပေးပါသည်',
      },
      {
        parameter: 'Available Types',
        parameterMm: 'ရရှိနိုင်သော အမျိုးအစားများ',
        value: 'With Nodes / Without Nodes',
        valueMm: 'အဆစ်ပါ (With Nodes) / အဆစ်မပါ (Without Nodes)',
        notes: 'Two distinct bamboo split configurations',
        notesMm: 'အဆစ်ပါ နှင့် အဆစ်မပါ နှစ်မျိုးရရှိနိုင်သည်',
      },
      {
        parameter: 'Packaging (With Nodes)',
        parameterMm: 'ထုပ်ပိုးမှု (အဆစ်ပါ · With Nodes)',
        value: '50 pieces per bundle (50 pcs/bundle)',
        valueMm: 'တစ်စည်းလျှင် ၅၀ ချောင်း (50 pcs/bundle)',
        notes: 'Standardized bundle packaging for With Nodes type',
        notesMm: 'အဆစ်ပါ အမျိုးအစားအတွက် တစ်စည်း 50 pcs စံနှုန်း',
      },
      {
        parameter: 'Packaging (Without Nodes)',
        parameterMm: 'ထုပ်ပိုးမှု (အဆစ်မပါ · Without Nodes)',
        value: '100 pieces per bundle (100 pcs/bundle)',
        valueMm: 'တစ်စည်းလျှင် ၁၀၀ ချောင်း (100 pcs/bundle)',
        notes: 'Standardized bundle packaging for Without Nodes type',
        notesMm: 'အဆစ်မပါ အမျိုးအစားအတွက် တစ်စည်း 100 pcs စံနှုန်း',
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
  },
  {
    id: 'bamboo-sticks',
    index: '02',
    name: 'Bamboo Sticks',
    nameMm: 'ဝါးတံ (Bamboo Sticks)',
    category: '100% Natural Bamboo · Domestic & Export Supply',
    categoryMm: '၁၀၀% သဘာဝ မြန်မာ့ဝါး · ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်',
    shortDescription:
      '100% natural Myanmar bamboo sticks in 1.2 mm to 2.5 mm thickness across 8, 9, and 10 inch lengths, packed at 30 kg per bag.',
    shortDescriptionMm:
      '၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ်ဖြင့် ထုတ်လုပ်ထားသော အထူ 1.2 mm မှ 2.5 mm၊ အရှည် ၈ လက်မ၊ ၉ လက်မ နှင့် ၁၀ လက်မ ဝါးတံများကို တစ်အိတ်လျှင် 30 kg စံနှုန်းဖြင့် ထုပ်ပိုးထားပါသည်။',
    detailedDescription:
      'Precision-sized from 100% natural Myanmar bamboo, our Bamboo Sticks are manufactured in thicknesses from 1.2 mm to 2.5 mm and standard lengths of 8, 9, and 10 inches. Packed in standardized 30 kg bags for reliable domestic distribution in Myanmar and international export.',
    detailedDescriptionMm:
      'မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးစစ်စစ်ဖြင့် အထူ 1.2 mm မှ 2.5 mm နှင့် အရှည် ၈ လက်မ၊ ၉ လက်မ၊ ၁၀ လက်မ အရွယ်အစားများအတိုင်း တိကျသပ်ရပ်စွာ ထုတ်လုပ်ထားပါသည်။ ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် နိုင်ငံတကာ ပြည်ပပို့ကုန်တင်ပို့မှုအတွက် တစ်အိတ်လျှင် ၃၀ ကီလိုဂရမ် (30 kg per bag) စံနှုန်းဖြင့် စနစ်တကျ ထုပ်ပိုးထားပါသည်။',
    visualType: 'bamboo-sticks',
    imagePath: '/images/products/bamboo-sticks-main.webp',
    imageAlt: 'Natural bamboo sticks from Myanmar',
    featuredImagePath: '/images/products/bamboo-sticks-featured.webp',
    featuredImageAlt: 'Featured natural Myanmar bamboo sticks packed at 30 kg per bag',
    naturalImagePath: '/images/products/bamboo-sticks-natural.webp',
    naturalImageAlt: 'Natural bamboo sticks in 8, 9, and 10 inch lengths',
    wholesaleImagePath: '/images/products/bamboo-sticks-wholesale.webp',
    wholesaleImageAlt: 'Bamboo sticks prepared in 30 kg bags for commercial supply',
    textureImagePath: '/images/products/bamboo-sticks-texture.webp',
    textureImageAlt: 'Close-up texture of 1.2 mm to 2.5 mm natural Myanmar bamboo sticks',
    placeholderNote: 'Bamboo Sticks · 1.2–2.5 mm · 8", 9", 10" · 30 kg per bag',
    placeholderNoteMm: 'ဝါးတံ · အထူ 1.2–2.5 mm · ၈"၊ ၉"၊ ၁၀" · တစ်အိတ် 30 kg',
    inquiryType: 'Bamboo Sticks',
    specifications: [
      {
        parameter: 'Product Name',
        parameterMm: 'ကုန်ပစ္စည်းအမည်',
        value: 'Bamboo Sticks',
        valueMm: 'ဝါးတံ (Bamboo Sticks)',
        notes: 'Core natural bamboo stick product line',
        notesMm: 'အဓိက သဘာဝဝါးတံ ထုတ်ကုန်',
      },
      {
        parameter: 'Material',
        parameterMm: 'ကုန်ကြမ်းအမျိုးအစား',
        value: '100% Natural Bamboo',
        valueMm: '၁၀၀% သဘာဝ ဝါးစစ်စစ်',
        notes: 'Cleanly sized natural bamboo fibers',
        notesMm: 'သဘာဝ မြန်မာ့ဝါးစစ်စစ်',
      },
      {
        parameter: 'Thickness',
        parameterMm: 'အထူ (Thickness)',
        value: '1.2 mm – 2.5 mm',
        valueMm: '1.2 mm မှ 2.5 mm',
        notes: 'Precision-calibrated diameter/thickness',
        notesMm: 'တိကျသော အထူအရွယ်အစား',
      },
      {
        parameter: 'Length',
        parameterMm: 'အရှည် (Length)',
        value: '8, 9, and 10 inches',
        valueMm: '၈ လက်မ၊ ၉ လက်မ နှင့် ၁၀ လက်မ',
        notes: 'Three standard commercial length options',
        notesMm: 'စံသတ်မှတ် အရှည် (၃) မျိုး',
      },
      {
        parameter: 'Packaging',
        parameterMm: 'ထုပ်ပိုးမှုပုံစံ (Packaging)',
        value: '30 kg per bag',
        valueMm: 'တစ်အိတ်လျှင် ၃၀ ကီလိုဂရမ် (30 kg per bag)',
        notes: 'Standardized wholesale & export bag weight',
        notesMm: 'ပြည်တွင်းနှင့် ပြည်ပပို့ကုန် စံချိန်မီ ထုပ်ပိုးမှု',
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
  },
];

export const CHARCOAL_PRODUCT_INFO = {
  id: 'activated-carbon',
  name: 'Activated Carbon',
  nameMm: 'အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon)',
  category: 'Activated Carbon · Commercial Inquiries',
  categoryMm: 'အက်တီဗိတ်တက် ကာဗွန် · စီးပွားရေးလုပ်ငန်းသုံး ဆက်သွယ်စုံစမ်းရန်',
  shortDescription:
    'Activated Carbon product category by TB Star Company Limited. Contact our Yangon office directly for commercial inquiries.',
  shortDescriptionMm:
    'TBStar Company Limited ၏ အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon) ကုန်ပစ္စည်းကဏ္ဍ။ လုပ်ငန်းသုံး စုံစမ်းမေးမြန်းမှုများအတွက် ရန်ကုန်ရုံးချုပ်သို့ တိုက်ရိုက် ဆက်သွယ်နိုင်ပါသည်။',
  detailedDescription:
    'TB Star Company Limited handles commercial inquiries for Activated Carbon from our headquarters in Kyauktada Township, Yangon. Detailed product specifications will be added later; please contact our team directly with your inquiry requirements.',
  detailedDescriptionMm:
    'TBStar Company Limited သည် ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ် ရုံးချုပ်မှတစ်ဆင့် အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon) နှင့် ပတ်သက်သော စီးပွားရေးလုပ်ငန်းသုံး စုံစမ်းမေးမြန်းမှုများကို လက်ခံဆောင်ရွက်ပေးလျက်ရှိပါသည်။ အသေးစိတ်အချက်အလက်များကို သိရှိလိုပါက တိုက်ရိုက် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။',
  imagePath: '/assets/aistudio/Charcoal-Product.svg',
  imageAlt: 'TB Star Company Limited Activated Carbon Product Category',
  placeholderNote: 'Activated Carbon · Direct B2B Inquiry Category',
  placeholderNoteMm: 'အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon) · တိုက်ရိုက်ဆက်သွယ်မေးမြန်းရန်',
  inquiryType: 'Activated Carbon' as InquiryTypeOption,
  specifications: [
    {
      parameter: 'Product Category',
      parameterMm: 'ကုန်ပစ္စည်းကဏ္ဍ',
      value: 'Activated Carbon',
      valueMm: 'အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon)',
      notes: 'Replaced former Charcoal category',
      notesMm: 'တရားဝင် ကုန်ပစ္စည်းကဏ္ဍ',
    },
    {
      parameter: 'Specification Status',
      parameterMm: 'အသေးစိတ် စံချိန်စံညွှန်းများ',
      value: 'Detailed product information will be added later',
      valueMm: 'အသေးစိတ်အချက်အလက်များကို ဆက်လက်ဖော်ပြပေးသွားပါမည်',
      notes: 'Contact our Yangon office directly for current availability',
      notesMm: 'ရန်ကုန်ရုံးချုပ်သို့ တိုက်ရိုက်ဆက်သွယ်မေးမြန်းနိုင်ပါသည်',
    },
    {
      parameter: 'Supplier',
      parameterMm: 'ဖြန့်ဖြူးသည့် ကုမ္ပဏီ',
      value: 'TB Star Company Limited (Established 2013)',
      valueMm: 'TBStar Company Limited (၂၀၁၃ ခုနှစ်တွင် တည်ထောင်သည်)',
      notes: 'Central Tower, Kyauktada Township, Yangon, Myanmar',
      notesMm: 'Central Tower၊ ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့',
    },
  ] as SpecificationRow[],
};

export interface PrintingServiceItem {
  id: 'books-printing' | 'voucher-books-printing' | 'other-offset-printing';
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
  placeholderNote: string;
  placeholderNoteMm?: string;
  inquiryType: InquiryTypeOption;
  scopePoints: string[];
  scopePointsMm: string[];
}

export const PRINTING_SERVICES: PrintingServiceItem[] = [
  {
    id: 'books-printing',
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
      'TB Star Company Limited provides one-stop offset printing services for books, publications, and institutional manuals in Yangon. We coordinate prepress layout verification, offset press production, cover printing, and binding under one roof.',
    detailedDescriptionMm:
      'TBStar Company Limited သည် စာအုပ်များ၊ စာပေထုတ်ဝေမှုများနှင့် လမ်းညွှန်စာအုပ်အမျိုးမျိုးအတွက် ကနဦးစာမျက်နှာစစ်ဆေးခြင်းမှစ၍ အော့ဖ်ဆက်စက်ဖြင့် ပုံနှိပ်ခြင်း၊ မျက်နှာဖုံးပုံနှိပ်ခြင်းနှင့် စာအုပ်ချုပ်လုပ်ခြင်းအထိ တစ်နေရာတည်းတွင် အပြီးအစီး တာဝန်ယူ ဆောင်ရွက်ပေးပါသည်။',
    visualType: 'books-printing',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    placeholderNote: 'Books Printing · One-Stop Offset Press Production',
    placeholderNoteMm: 'စာအုပ်ပုံနှိပ်ခြင်းလုပ်ငန်း · တစ်နေရာတည်း အပြီးအစီး ဝန်ဆောင်မှု',
    inquiryType: 'Books Printing',
    scopePoints: [
      'Multi-page books, textbooks, and corporate publications',
      'Sharp offset interior text reproduction and full-color covers',
      'End-to-end coordination from prepress to binding and trimming',
    ],
    scopePointsMm: [
      'စာမျက်နှာစုံ စာအုပ်များ၊ ကျောင်းသုံးနှင့် ရုံးသုံးစာအုပ်အမျိုးမျိုး',
      'ကြည်လင်ပြတ်သားသော အတွင်းစာသားနှင့် ရောင်စုံမျက်နှာဖုံး ပုံနှိပ်မှု',
      'ပုံနှိပ်ခြင်းမှ စာအုပ်ချုပ်လုပ်ပြီးစီးသည်အထိ တစ်နေရာတည်း အပြီးအစီး ဝန်ဆောင်မှု',
    ],
  },
  {
    id: 'voucher-books-printing',
    index: '02',
    name: 'Voucher Books Printing',
    nameMm: 'ဘောင်ချာစာအုပ် ပုံနှိပ်ခြင်းလုပ်ငန်း (Voucher Books Printing)',
    category: 'One-Stop Offset Printing Services',
    categoryMm: 'တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း',
    shortDescription:
      'Commercial voucher books, invoice pads, receipt books, and numbered business forms customized for daily retail and B2B operations.',
    shortDescriptionMm:
      'နေ့စဉ်လုပ်ငန်းသုံး ဘောင်ချာစာအုပ်များ၊ ငွေတောင်းခံလွှာနှင့် ပြေစာစာအုပ်များကို လုပ်ငန်းအမှတ်တံဆိပ်နှင့်အညီ သပ်ရပ်တိကျစွာ ပုံနှိပ်ပေးပါသည်။',
    detailedDescription:
      'Our Voucher Books Printing service supplies businesses, wholesalers, and commercial offices with custom-formatted voucher books, receipt pads, delivery notes, and invoice books featuring sequential numbering and clean tear-off perforation.',
    detailedDescriptionMm:
      'ကုမ္ပဏီများ၊ လက်ကားဆိုင်များနှင့် စီးပွားရေးလုပ်ငန်းများအတွက် လိုအပ်သော ဘောင်ချာစာအုပ်များ၊ ပြေစာစာအုပ်များနှင့် စာရင်းပုံစံစာအုပ်များကို နံပါတ်စဉ်ရိုက်နှိပ်ခြင်း၊ ဆုတ်ဖြဲရလွယ်ကူသော အပေါက်ဖောက်ခြင်းတို့ဖြင့် စနစ်တကျ ပုံနှိပ်ပေးပါသည်။',
    visualType: 'voucher-printing',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    placeholderNote: 'Voucher Books Printing · Commercial Forms & Receipt Pads',
    placeholderNoteMm: 'ဘောင်ချာစာအုပ် ပုံနှိပ်ခြင်း · လုပ်ငန်းသုံး ပြေစာနှင့် ဘောင်ချာများ',
    inquiryType: 'Voucher Books Printing',
    scopePoints: [
      'Custom sales voucher books, receipt pads, and invoice books',
      'Sequential numbering, perforation, and multi-copy pad binding',
      'Tailored layouts featuring your company logo and contact details',
    ],
    scopePointsMm: [
      'အရောင်းဘောင်ချာစာအုပ်များ၊ ပြေစာနှင့် ငွေတောင်းခံလွှာစာအုပ်များ',
      'နံပါတ်စဉ်ရိုက်နှိပ်ခြင်းနှင့် အလွှာစုံ (Multi-copy) စာအုပ်ချုပ်လုပ်ခြင်း',
      'မိမိလုပ်ငန်းလိုဂိုနှင့် အချက်အလက်များအတိုင်း စိတ်ကြိုက်ဒီဇိုင်း ပုံနှိပ်နိုင်ခြင်း',
    ],
  },
  {
    id: 'other-offset-printing',
    index: '03',
    name: 'Other Offset Printing Services',
    nameMm: 'အခြား အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများ',
    category: 'One-Stop Offset Printing Services',
    categoryMm: 'တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း',
    shortDescription:
      'Comprehensive commercial offset printing for brochures, pamphlets, catalogs, business cards, letterheads, and office forms.',
    shortDescriptionMm:
      'လက်ကမ်းစာစောင်များ၊ ကတ်တလောက်များ၊ လိပ်စာကတ်များနှင့် ရုံးသုံးပုံစံစာရွက်အမျိုးမျိုးအတွက် အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှု။',
    detailedDescription:
      'Beyond books and voucher pads, TB Star Company Limited delivers one-stop offset printing for corporate brochures, flyers, product catalogs, business cards, envelopes, letterheads, and administrative forms.',
    detailedDescriptionMm:
      'စာအုပ်နှင့် ဘောင်ချာစာအုပ်များအပြင် ကုမ္ပဏီသုံး လက်ကမ်းစာစောင်များ (Brochures & Pamphlets)၊ ကုန်ပစ္စည်းကတ်တလောက်များ၊ လိပ်စာကတ်များ၊ စာအိတ်များနှင့် ရုံးသုံးပုံစံစာရွက်အမျိုးမျိုးကိုပါ တစ်နေရာတည်းတွင် အပြီးအစီး ပုံနှိပ်ပေးပါသည်။',
    visualType: 'commercial-printing',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    placeholderNote: 'Commercial Offset Printing · Brochures, Catalogs & Stationery',
    placeholderNoteMm: 'အခြား အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း · လက်ကမ်းစာစောင်နှင့် ရုံးသုံးပုံနှိပ်',
    inquiryType: 'Other Offset Printing Services',
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

export interface BallPenVariant {
  type: string;
  typeMm: string;
  packaging: string;
  packagingMm: string;
}

export interface BallPenProductInfo {
  id: 'ball-pen';
  index: string;
  name: string;
  nameMm: string;
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
  variants: BallPenVariant[];
  specifications: SpecificationRow[];
}

export const BALL_PEN_PRODUCT: BallPenProductInfo = {
  id: 'ball-pen',
  index: '04',
  name: 'Ball Pen',
  nameMm: 'ဘောပင် (Ball Pen)',
  category: 'Printing Services & Stationery',
  categoryMm: 'ပုံနှိပ်နှင့် စာရေးကိရိယာ ဝန်ဆောင်မှုလုပ်ငန်း',
  shortDescription:
    'Ball Pen stationery supplied under our Printing Services & Stationery division in two types: Klick (30 pcs per box) and Plano (50 pcs per box).',
  shortDescriptionMm:
    'ပုံနှိပ်နှင့် စာရေးကိရိယာ လုပ်ငန်းကဏ္ဍအောက်မှ Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs) ဘောပင် (Ball Pen) အမျိုးအစား (၂) မျိုးကို ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။',
  detailedDescription:
    'Under our Printing Services & Stationery division, TB Star Company Limited supplies Ball Pen products in two standardized box packaging configurations: Klick (30 pcs per box) and Plano (50 pcs per box). Contact our Yangon office for wholesale and commercial stationery inquiries.',
  detailedDescriptionMm:
    'TBStar Company Limited ၏ ပုံနှိပ်နှင့် စာရေးကိရိယာ လုပ်ငန်းကဏ္ဍအောက်တွင် ဘောပင် (Ball Pen) ထုတ်ကုန်များကို Klick (တစ်ဘူးလျှင် ၃၀ ချောင်း · 30 pcs per box) နှင့် Plano (တစ်ဘူးလျှင် ၅၀ ချောင်း · 50 pcs per box) ဟူ၍ အမျိုးအစား (၂) မျိုးဖြင့် ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။',
  visualType: 'commercial-printing',
  imagePath: '/assets/aistudio/Branding_Image_V2_cc9a2035.webp',
  imageAlt:
    'TB Star Company Limited Ball Pen — Klick (30 pcs per box) and Plano (50 pcs per box) box packaging',
  secondaryImagePath: '/assets/aistudio/Branding_Image_V1_c6c098a8.webp',
  secondaryImageAlt:
    'TB Star Company Limited Ball Pen — Klick (30 pcs per box) and Plano (50 pcs per box) pen showcase',
  placeholderNote: 'Ball Pen · Klick (30 pcs per box) & Plano (50 pcs per box)',
  placeholderNoteMm: 'ဘောပင် (Ball Pen) · Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs)',
  inquiryType: 'Ball Pen',
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
      notes: 'Printing Services & Stationery division',
      notesMm: 'ပုံနှိပ်နှင့် စာရေးကိရိယာ ဌာန',
    },
    {
      parameter: 'Available Types',
      parameterMm: 'အမျိုးအစားများ (Types)',
      value: 'Klick / Plano',
      valueMm: 'Klick နှင့် Plano',
      notes: 'Two distinct Ball Pen models available',
      notesMm: 'အမျိုးအစား (၂) မျိုး ရွေးချယ်နိုင်သည်',
    },
    {
      parameter: 'Packaging — Type 1 (Klick)',
      parameterMm: 'ထုပ်ပိုးမှု — Klick အမျိုးအစား',
      value: '30 pcs per box',
      valueMm: 'တစ်ဘူးလျှင် ၃၀ ချောင်း (30 pcs per box)',
      notes: 'Standardized box packaging for Klick Ball Pen',
      notesMm: 'Klick ဘောပင် တစ်ဘူးချင်း စံနှုန်း',
    },
    {
      parameter: 'Packaging — Type 2 (Plano)',
      parameterMm: 'ထုပ်ပိုးမှု — Plano အမျိုးအစား',
      value: '50 pcs per box',
      valueMm: 'တစ်ဘူးလျှင် ၅၀ ချောင်း (50 pcs per box)',
      notes: 'Standardized box packaging for Plano Ball Pen',
      notesMm: 'Plano ဘောပင် တစ်ဘူးချင်း စံနှုန်း',
    },
  ],
};

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
      '100% natural Myanmar Bamboo Split available With Nodes (50 pcs/bundle) and Without Nodes (100 pcs/bundle).',
    captionMm:
      '၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ်ဖြင့် ထုတ်လုပ်ထားသော ဝါးခြမ်းပြား (အဆစ်ပါ တစ်စည်း 50 pcs · အဆစ်မပါ တစ်စည်း 100 pcs)။',
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
      'Precision-sized 1.2 mm to 2.5 mm natural bamboo sticks manufactured in Myanmar for domestic and export markets.',
    captionMm:
      'ပြည်တွင်းနှင့် ပြည်ပပို့ကုန်အတွက် တိကျသပ်ရပ်စွာ ထုတ်လုပ်ထားသော အထူ 1.2–2.5 mm သဘာဝဝါးတံများ။',
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
      'Mechanical splitting and sizing of 3 mm Myanmar bamboo splits in With Nodes and Without Nodes formats.',
    captionMm:
      'အထူ 3 mm တစ်ပြေးညီ ရှိစေရန် အဆစ်ပါနှင့် အဆစ်မပါ ပုံစံနှစ်မျိုးဖြင့် စနစ်တကျ စိတ်ဖြာထုတ်လုပ်ထားပုံ။',
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
      'Standardized 30 kg per bag packaging for 8, 9, and 10 inch Myanmar Bamboo Sticks.',
    captionMm:
      '၈ လက်မ၊ ၉ လက်မနှင့် ၁၀ လက်မ ဝါးတံများကို တစ်အိတ်လျှင် 30 kg စံနှုန်းဖြင့် စနစ်တကျ ထုပ်ပိုးထားပုံ။',
    visualType: 'bamboo-sticks',
    imagePath: '/images/products/bamboo-sticks-wholesale.webp',
    altText: 'Bamboo sticks prepared in 30 kg bags for commercial supply',
  },
  {
    id: 'gal-bamboo-split-bundles',
    title: 'Bamboo Split — 50 pcs & 100 pcs Bundle Packaging',
    titleMm: 'ဝါးခြမ်းပြား — တစ်စည်း 50 pcs နှင့် 100 pcs ထုပ်ပိုးမှု',
    category: 'Packaging',
    caption:
      'With Nodes packed at 50 pieces per bundle and Without Nodes packed at 100 pieces per bundle.',
    captionMm:
      'အဆစ်ပါ (With Nodes) တစ်စည်း ၅၀ ချောင်းနှင့် အဆစ်မပါ (Without Nodes) တစ်စည်း ၁၀၀ ချောင်း စည်းနှောင်ထုပ်ပိုးမှု။',
    visualType: 'bamboo-split',
    imagePath: '/images/products/bamboo-split-wholesale.webp',
    altText: 'Bamboo splits arranged in 50 pcs and 100 pcs bundles for commercial supply',
  },
  {
    id: 'gal-ball-pen-packaging',
    title: 'Ball Pen — Klick (30 pcs/box) & Plano (50 pcs/box)',
    titleMm: 'ဘောပင် (Ball Pen) — Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs)',
    category: 'Printing Products',
    caption:
      'Klick (30 pcs per box) and Plano (50 pcs per box) Ball Pen container packaging under our Printing Services & Stationery division.',
    captionMm:
      'ပုံနှိပ်နှင့် စာရေးကိရိယာဌာနမှ ဖြန့်ဖြူးသော Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs) ဘူးထုပ်ပိုးမှုပုံစံ။',
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
      'Detailed view of Klick (30 pcs per box) and colorful patterned Plano (50 pcs per box) ball pens.',
    captionMm:
      'Klick (တစ်ဘူး 30 pcs) နှင့် ရောင်စုံဒီဇိုင်း Plano (တစ်ဘူး 50 pcs) ဘောပင်များ ပြကွက်။',
    visualType: 'commercial-printing',
    imagePath: '/assets/aistudio/Branding_Image_V1_c6c098a8.webp',
    altText:
      'TB Star Company Limited Ball Pen — Klick (30 pcs per box) and Plano (50 pcs per box) pen showcase',
  },
  {
    id: 'gal-offset-printing',
    title: 'One-Stop Offset Printing — Books & Voucher Books',
    titleMm: 'တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက် ပုံနှိပ်လုပ်ငန်း',
    category: 'Printing Products',
    caption:
      'Books Printing, Voucher Books Printing, and commercial offset printing services in Yangon.',
    captionMm:
      'စာအုပ်ပုံနှိပ်ခြင်း၊ ဘောင်ချာစာအုပ်ပုံနှိပ်ခြင်းနှင့် စီးပွားရေးလုပ်ငန်းသုံး အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများ။',
    visualType: 'books-printing',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    altText: 'TB Star Company Limited One-Stop Offset Printing Services',
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
    title: 'Long-Term Operations in Myanmar Since 2013',
    titleMm: '၂၀၁၃ ခုနှစ်မှစတင်၍ ရေရှည်ရပ်တည်ဆောင်ရွက်နေသော ကုမ္ပဏီ',
    description:
      'Established in 2013, TB Star Company Limited brings over a decade of continuous operational experience serving domestic and international business partners.',
    descriptionMm:
      '၂၀၁၃ ခုနှစ်တွင် စတင်တည်ထောင်ခဲ့ပြီး မြန်မာနိုင်ငံတွင်းနှင့် နိုင်ငံတကာမှ စီးပွားရေးမိတ်ဖက်များအား ရေရှည်ယုံကြည်စိတ်ချစွာ ဝန်ဆောင်မှုပေးလျက်ရှိပါသည်။',
  },
  {
    index: '02',
    divisionTag: '100% Natural Bamboo',
    divisionTagMm: '၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ်',
    title: 'Verified Myanmar Bamboo Specifications',
    titleMm: 'တိကျမှန်ကန်သော မြန်မာ့သဘာဝဝါး စံချိန်စံညွှန်းများ',
    description:
      'We supply 3 mm Bamboo Split (With Nodes: 50 pcs/bundle; Without Nodes: 100 pcs/bundle) and 1.2–2.5 mm Bamboo Sticks (8", 9", 10" in 30 kg bags).',
    descriptionMm:
      'အထူ 3 mm ဝါးခြမ်းပြား (အဆစ်ပါ တစ်စည်း 50 pcs / အဆစ်မပါ တစ်စည်း 100 pcs) နှင့် 1.2–2.5 mm ဝါးတံ (တစ်အိတ် 30 kg) တို့ကို စံချိန်စံညွှန်းအတိုင်း တိကျစွာ ထုတ်လုပ်ပေးပါသည်။',
  },
  {
    index: '03',
    divisionTag: 'Local & Export Supply',
    divisionTagMm: 'ပြည်တွင်းနှင့် ပြည်ပပို့ကုန်',
    title: 'Domestic Distribution & International Export',
    titleMm: 'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် နိုင်ငံတကာ ပြည်ပပို့ကုန်',
    description:
      'Structured bundle and 30 kg bag packaging supports both domestic wholesale distribution across Myanmar and international export shipments.',
    descriptionMm:
      'ပြည်တွင်းစျေးကွက်သို့ လက်ကားဖြန့်ဖြူးပေးရုံသာမက နိုင်ငံတကာ ပို့ကုန်စျေးကွက်များသို့ပါ စနစ်တကျ ထုပ်ပိုးတင်ပို့ပေးလျက်ရှိပါသည်။',
  },
  {
    index: '04',
    divisionTag: 'Printing & Stationery',
    divisionTagMm: 'ပုံနှိပ်နှင့် စာရေးကိရိယာ',
    title: 'One-Stop Offset Printing & Ball Pen Supply',
    titleMm: 'တစ်နေရာတည်း အပြီးအစီး ပုံနှိပ်လုပ်ငန်းနှင့် Ball Pen ဖြန့်ဖြူးရေး',
    description:
      'Complete offset printing for books, voucher books, and commercial print alongside Klick (30 pcs/box) and Plano (50 pcs/box) Ball Pen supply.',
    descriptionMm:
      'စာအုပ်များ၊ ဘောင်ချာစာအုပ်များ ပုံနှိပ်ခြင်းအပြင် Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs) ဘောပင်များကိုပါ တစ်နေရာတည်းတွင် ရရှိနိုင်ပါသည်။',
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
    titleMm: 'စိုက်ပျိုးရေးသုံး ဝါးခြမ်းပြားနှင့် ဝါးတံ လုပ်ငန်းများ',
    description:
      'Supplying durable 3 mm natural Myanmar Bamboo Split (20–48 inches) for plant support, nursery structures, and agricultural bundling.',
    descriptionMm:
      'စိုက်ပျိုးရေးခြံများနှင့် ပျိုးဥယျာဉ်များတွင် အသုံးပြုရန် ခိုင်ခံ့သော အထူ 3 mm သဘာဝဝါးခြမ်းပြားများ (၂၀–၄၈ လက်မ) ကို ဖြန့်ဖြူးပေးပါသည်။',
    productsUsed: 'Bamboo Split (With Nodes: 50 pcs/bundle · Without Nodes: 100 pcs/bundle)',
    productsUsedMm: 'ဝါးခြမ်းပြား (အဆစ်ပါ 50 pcs/bundle · အဆစ်မပါ 100 pcs/bundle)',
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
      'Uniform 1.2 mm to 2.5 mm natural bamboo sticks in 8, 9, and 10 inch lengths, packed at 30 kg per bag for high-volume production lines.',
    descriptionMm:
      'အမွှေးတိုင်လုပ်ငန်းနှင့် လက်မှုကုန်ထုတ်လုပ်ငန်းများအတွက် အထူ 1.2–2.5 mm၊ အရှည် ၈"၊ ၉"၊ ၁၀" ဝါးတံများကို တစ်အိတ် 30 kg စံနှုန်းဖြင့် ပံ့ပိုးပေးပါသည်။',
    productsUsed: 'Bamboo Sticks (1.2–2.5 mm · 8", 9", 10" · 30 kg/bag)',
    productsUsedMm: 'ဝါးတံ (အထူ 1.2–2.5 mm · ၈"၊ ၉"၊ ၁၀" · တစ်အိတ် 30 kg)',
    inquiryType: 'Bamboo Sticks',
  },
  {
    id: 'ind-filtration',
    index: '03',
    sector: 'Industrial & Filtration Inquiries',
    sectorMm: 'စက်မှုနှင့် သန့်စင်ရေးလုပ်ငန်း ကဏ္ဍ',
    title: 'Activated Carbon Commercial Inquiries',
    titleMm: 'အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon) စုံစမ်းမေးမြန်းမှုများ',
    description:
      'Direct B2B consultation with our Yangon headquarters for buyers inquiring about Activated Carbon supply.',
    descriptionMm:
      'အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon) လိုအပ်ချက်ရှိသော စီးပွားရေးလုပ်ငန်းများအတွက် ရန်ကုန်ရုံးချုပ်မှ တိုက်ရိုက်လက်ခံဆွေးနွေးပေးပါသည်။',
    productsUsed: 'Activated Carbon (Direct B2B Inquiry)',
    productsUsedMm: 'အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon)',
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
      'Custom-numbered voucher books, invoice pads, and delivery forms for daily commercial transactions.',
    descriptionMm:
      'နေ့စဉ် အရောင်းအဝယ်နှင့် စာရင်းမှတ်တမ်းများအတွက် နံပါတ်စဉ်ပါ ဘောင်ချာစာအုပ်များနှင့် ပြေစာစာအုပ်များကို စိတ်ကြိုက်ပုံနှိပ်ပေးပါသည်။',
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
      'From our headquarters in Kyauktada Township, Yangon, TB Star Company Limited distributes natural bamboo products, offset printed materials, and Ball Pen stationery to commercial buyers across Myanmar.',
    descriptionMm:
      'ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ် ရုံးချုပ်မှတစ်ဆင့် မြန်မာနိုင်ငံတစ်ဝန်းရှိ လုပ်ငန်းရှင်များနှင့် လက်ကားဝယ်ယူသူများထံသို့ သဘာဝဝါးထုတ်ကုန်များ၊ ပုံနှိပ်ပစ္စည်းများနှင့် Ball Pen စာရေးကိရိယာများကို ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။',
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
      'We prepare and export 100% natural Myanmar Bamboo Split (50 pcs / 100 pcs bundles) and Bamboo Sticks (30 kg per bag) for international B2B importers and regional buyers.',
    descriptionMm:
      'မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝ ဝါးခြမ်းပြား (တစ်စည်း 50 pcs / 100 pcs) နှင့် ဝါးတံ (တစ်အိတ် 30 kg) များကို နိုင်ငံတကာမှ ဝယ်ယူသူများထံသို့ ပြည်ပပို့ကုန်အဖြစ် တင်ပို့ရောင်းချပေးလျက်ရှိပါသည်။',
    regions: [
      {
        name: 'Export-ready Bamboo Split (With Nodes: 50 pcs/bundle; Without Nodes: 100 pcs/bundle)',
        nameMm: 'ပြည်ပပို့ကုန်အဆင့် ဝါးခြမ်းပြား (အဆစ်ပါ 50 pcs/bundle · အဆစ်မပါ 100 pcs/bundle)',
      },
      {
        name: 'Standardized 30 kg per bag Bamboo Sticks (8", 9", and 10")',
        nameMm: 'တစ်အိတ်လျှင် 30 kg စံနှုန်းဖြင့် ထုပ်ပိုးထားသော ဝါးတံ (၈"၊ ၉"၊ ၁၀")',
      },
      {
        name: 'Direct B2B export inquiry coordination from Yangon, Myanmar',
        nameMm: 'ရန်ကုန်ရုံးချုပ်မှ နိုင်ငံတကာဝယ်ယူသူများနှင့် တိုက်ရိုက်ချိတ်ဆက် ဆောင်ရွက်ပေးခြင်း',
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
      'All Bamboo Split and Bamboo Sticks are mechanically processed from 100% natural bamboo harvested in Myanmar.',
    descriptionMm:
      'ဝါးခြမ်းပြားနှင့် ဝါးတံအားလုံးကို မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးစစ်စစ်ဖြင့်သာ ထုတ်လုပ်ထားပါသည်။',
    standardSpec: 'Origin: Myanmar · 100% Natural Bamboo',
    standardSpecMm: 'မူရင်းဒေသ - မြန်မာ · ၁၀၀% သဘာဝဝါး',
  },
  {
    id: 'qual-split',
    index: '02',
    category: 'Bamboo Split Calibration',
    categoryMm: 'ဝါးခြမ်းပြား စံချိန်စံညွှန်း',
    title: 'Uniform Thickness & Bundle Counts',
    titleMm: 'တူညီသော အထူနှင့် အစည်းအရေအတွက်',
    description:
      'Sized to 3 mm thickness across 20–48 inch lengths, bundled at 50 pcs (With Nodes) or 100 pcs (Without Nodes).',
    descriptionMm:
      'အထူ 3 mm၊ အရှည် ၂၀"–၄၈" ရှိပြီး အဆစ်ပါ တစ်စည်း 50 pcs နှင့် အဆစ်မပါ တစ်စည်း 100 pcs စည်းနှောင်ထားပါသည်။',
    standardSpec: '3 mm · 20"–48" · 50 / 100 pcs per bundle',
    standardSpecMm: '3 mm · ၂၀"–၄၈" · တစ်စည်း 50 / 100 pcs',
  },
  {
    id: 'qual-sticks',
    index: '03',
    category: 'Bamboo Sticks Packaging',
    categoryMm: 'ဝါးတံ ထုပ်ပိုးမှုစံနှုန်း',
    title: 'Precision Sizing & 30 kg Bags',
    titleMm: 'တိကျသော အရွယ်အစားနှင့် 30 kg ထုပ်ပိုးမှု',
    description:
      'Calibrated to 1.2–2.5 mm thickness in 8, 9, and 10 inch lengths and packed in 30 kg bags.',
    descriptionMm:
      'အထူ 1.2–2.5 mm၊ အရှည် ၈"၊ ၉"၊ ၁၀" အရွယ်အစားများကို တစ်အိတ် 30 kg စံနှုန်းဖြင့် ထုပ်ပိုးထားပါသည်။',
    standardSpec: '1.2–2.5 mm · 8", 9", 10" · 30 kg/bag',
    standardSpecMm: '1.2–2.5 mm · ၈"၊ ၉"၊ ၁၀" · တစ်အိတ် 30 kg',
  },
  {
    id: 'qual-printing',
    index: '04',
    category: 'Printing & Stationery',
    categoryMm: 'ပုံနှိပ်နှင့် စာရေးကိရိယာ',
    title: 'One-Stop Press & Boxed Stationery',
    titleMm: 'အပြီးအစီး ပုံနှိပ်မှုနှင့် စံချိန်မီ ဘောပင်ဘူးများ',
    description:
      'Complete offset printing workflow plus Klick (30 pcs/box) and Plano (50 pcs/box) Ball Pen packaging.',
    descriptionMm:
      'တစ်နေရာတည်း အပြီးအစီး ပုံနှိပ်လုပ်ငန်းနှင့် Klick (30 pcs/box)၊ Plano (50 pcs/box) ဘောပင်များ။',
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
      'To be a trusted long-term partner for domestic and international buyers seeking 100% natural Myanmar bamboo products and one-stop offset printing and stationery solutions.',
    statementMm:
      'ပြည်တွင်းနှင့် နိုင်ငံတကာမှ ဝယ်ယူသူများအတွက် ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များနှင့် တစ်နေရာတည်းတွင် အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်နှင့် စာရေးကိရိယာ ဝန်ဆောင်မှုများကို ပံ့ပိုးပေးနိုင်သော ရေရှည်ယုံကြည်စိတ်ချရသည့် ကုမ္ပဏီဖြစ်လာစေရန်။',
    highlights: [
      'Continuous operations in Myanmar since our establishment in 2013',
      'Consistent specifications for Bamboo Split and Bamboo Sticks',
      'Reliable one-stop offset printing and stationery supply in Yangon',
    ],
    highlightsMm: [
      '၂၀၁၃ ခုနှစ်မှစတင်၍ မြန်မာနိုင်ငံတွင် စဉ်ဆက်မပြတ် လုပ်ငန်းဆောင်ရွက်မှု',
      'တိကျသော ဝါးခြမ်းပြားနှင့် ဝါးတံ စံချိန်စံညွှန်းများ',
      'ယုံကြည်စိတ်ချရသော အော့ဖ်ဆက်ပုံနှိပ်နှင့် စာရေးကိရိယာ ဝန်ဆောင်မှု',
    ],
  },
  mission: {
    kicker: 'CORPORATE MISSION · ရည်မှန်းချက်',
    title: 'Delivering Verified Specifications & Responsive Service',
    titleMm: 'တိကျသော စံချိန်စံညွှန်းနှင့် မြန်ဆန်သွက်လက်သော ဝန်ဆောင်မှု ပေးအပ်ရန်',
    statement:
      'To manufacture and supply natural Myanmar bamboo products to exact bundle and bag specifications while providing businesses with efficient one-stop offset printing and stationery products.',
    statementMm:
      'မြန်မာ့သဘာဝဝါးထုတ်ကုန်များကို သတ်မှတ်အရွယ်အစားနှင့် ထုပ်ပိုးမှုစံနှုန်းများအတိုင်း တိကျစွာ ထုတ်လုပ်ဖြန့်ဖြူးရန်နှင့် စီးပွားရေးလုပ်ငန်းများအတွက် အော့ဖ်ဆက်ပုံနှိပ်နှင့် စာရေးကိရိယာများကို တစ်နေရာတည်းတွင် အဆင်ပြေချောမွေ့စွာ ပံ့ပိုးပေးရန်။',
    highlights: [
      'Supplying Bamboo Split (50 pcs / 100 pcs per bundle) and Bamboo Sticks (30 kg/bag)',
      'Serving both domestic Myanmar buyers and international export markets',
      'Delivering Books Printing, Voucher Books Printing, and Klick / Plano Ball Pens',
    ],
    highlightsMm: [
      'ဝါးခြမ်းပြား (50 / 100 pcs/bundle) နှင့် ဝါးတံ (30 kg/bag) တို့ကို စနစ်တကျ ထုတ်လုပ်တင်ပို့ခြင်း',
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
      'Every bamboo and stationery product is presented with clear measurements and packaging counts—from 3 mm Bamboo Split bundles to 30 kg Bamboo Stick bags and boxed Ball Pens.',
    descriptionMm:
      'အထူ 3 mm ဝါးခြမ်းပြား အစည်းများ၊ တစ်အိတ် 30 kg ဝါးတံများနှင့် Klick / Plano ဘောပင်ဘူးများအထိ အရွယ်အစားနှင့် အရေအတွက် စံနှုန်းများကို တိကျရှင်းလင်းစွာ သတ်မှတ်ထားပါသည်။',
  },
  {
    index: '02',
    title: 'Long-Term B2B Reliability Since 2013',
    titleMm: '၂၀၁၃ ခုနှစ်မှစတင်သော ရေရှည်လုပ်ငန်း ယုံကြည်စိတ်ချရမှု',
    description:
      'Operating in Myanmar since 2013, we focus on practical, long-term supply relationships with domestic wholesalers, exporters, and corporate clients.',
    descriptionMm:
      '၂၀၁၃ ခုနှစ်မှစတင်၍ ပြည်တွင်းလက်ကားဖြန့်ချိသူများ၊ ပြည်ပပို့ကုန်ဝယ်ယူသူများနှင့် ကုမ္ပဏီများအတွက် ရေရှည်လက်တွဲနိုင်သော လုပ်ငန်းမိတ်ဖက်အဖြစ် ဆောင်ရွက်လျက်ရှိပါသည်။',
  },
  {
    index: '03',
    title: 'Direct Communication from Our Yangon Office',
    titleMm: 'ရန်ကုန်ရုံးချုပ်မှ တိုက်ရိုက် ချိတ်ဆက်ဆောင်ရွက်ပေးမှု',
    description:
      'Our team at Central Tower in Kyauktada Township, Yangon coordinates all product, export, and printing inquiries directly via phone, WhatsApp, and email.',
    descriptionMm:
      'ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ်၊ Central Tower ရုံးချုပ်မှတစ်ဆင့် ဝယ်ယူသူများ၏ မေးမြန်းချက်များကို ဖုန်း၊ WhatsApp နှင့် အီးမေးလ်တို့ဖြင့် တိုက်ရိုက် ပြန်လည်ဖြေကြား ဆောင်ရွက်ပေးပါသည်။',
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
      'We work with international buyers sourcing 100% natural Myanmar Bamboo Split and Bamboo Sticks in standardized export bundles and 30 kg bags.',
    descriptionMm:
      'မြန်မာ့သဘာဝ ဝါးခြမ်းပြားနှင့် ဝါးတံများကို ပြည်ပသို့ တင်သွင်းဖြန့်ဖြူးလိုသော နိုင်ငံတကာ ဝယ်ယူသူများနှင့် လက်တွဲဆောင်ရွက်ပါသည်။',
    collaborationPoints: [
      'Bamboo Split: With Nodes (50 pcs/bundle) & Without Nodes (100 pcs/bundle)',
      'Bamboo Sticks: 1.2–2.5 mm, 8"/9"/10", packed at 30 kg per bag',
      'Direct export inquiry coordination with our Yangon headquarters',
    ],
    collaborationPointsMm: [
      'ဝါးခြမ်းပြား - အဆစ်ပါ (တစ်စည်း 50 pcs) နှင့် အဆစ်မပါ (တစ်စည်း 100 pcs)',
      'ဝါးတံ - အထူ 1.2–2.5 mm၊ အရှည် ၈"၊ ၉"၊ ၁၀" (တစ်အိတ် 30 kg)',
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
      'ပြည်တွင်းရှိ စိုက်ပျိုးရေးလုပ်ငန်းများ၊ အမွှေးတိုင်စက်ရုံများနှင့် လက်ကားဒိုင်များသို့ သဘာဝဝါးထုတ်ကုန်များနှင့် Activated Carbon ကဏ္ဍအတွက် ပူးပေါင်းဆောင်ရွက်ပါသည်။',
    collaborationPoints: [
      'Consistent local supply of Bamboo Split and Bamboo Sticks',
      'Direct consultation for Activated Carbon commercial inquiries',
      'Convenient coordination from Kyauktada Township, Yangon',
    ],
    collaborationPointsMm: [
      'ပြည်တွင်းစျေးကွက်အတွက် ဝါးခြမ်းပြားနှင့် ဝါးတံ စဉ်ဆက်မပြတ် ဖြန့်ဖြူးပေးခြင်း',
      'Activated Carbon အတွက် တိုက်ရိုက်ဆက်သွယ် ဆွေးနွေးနိုင်ခြင်း',
      'ရန်ကုန်မြို့လယ် ရုံးချုပ်မှ အလွယ်တကူ ဆက်သွယ်မှာယူနိုင်ခြင်း',
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
      'စာအုပ်ထုတ်ဝေသူများ၊ ကုမ္ပဏီရုံးများနှင့် စာရေးကိရိယာ လက်ကားဆိုင်များအတွက် ပုံနှိပ်လုပ်ငန်းနှင့် Ball Pen (Klick / Plano) ဖြန့်ဖြူးရေး ဆောင်ရွက်ပေးပါသည်။',
    collaborationPoints: [
      'Books Printing, Voucher Books Printing, and commercial offset print',
      'Ball Pen Klick (30 pcs per box) and Plano (50 pcs per box)',
      'Reliable production for recurring business print and stationery orders',
    ],
    collaborationPointsMm: [
      'စာအုပ်များ၊ ဘောင်ချာစာအုပ်များနှင့် ရုံးသုံးပုံနှိပ်လုပ်ငန်းများ',
      'Ball Pen — Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs)',
      'လုပ်ငန်းသုံး ပုံနှိပ်နှင့် စာရေးကိရိယာများကို ပုံမှန်လက်တွဲ မှာယူနိုင်ခြင်း',
    ],
    inquiryType: 'Books Printing',
  },
];
