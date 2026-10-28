export type PageRoute =
  | '/'
  | '/about'
  | '/bamboo-products'
  | '/printing-services'
  | '/gallery'
  | '/contact';

export type InquiryTypeOption =
  | 'Bamboo Split'
  | 'Bamboo Sticks'
  | 'Other Bamboo Products'
  | 'Books Printing'
  | 'Voucher Books Printing'
  | 'Other Offset Printing Services'
  | 'General Inquiry';

export const INQUIRY_TYPE_OPTIONS: InquiryTypeOption[] = [
  'Bamboo Split',
  'Bamboo Sticks',
  'Other Bamboo Products',
  'Books Printing',
  'Voucher Books Printing',
  'Other Offset Printing Services',
  'General Inquiry',
];

export const INQUIRY_TYPE_LABELS_MM: Record<InquiryTypeOption, string> = {
  'Bamboo Split': 'Bamboo Split (ဝါးခြမ်း)',
  'Bamboo Sticks': 'Bamboo Sticks (ဝါးတံ)',
  'Other Bamboo Products': 'Other Bamboo Products (အခြား ဝါးထုတ်ကုန်များ)',
  'Books Printing': 'Books Printing (စာအုပ်ပုံနှိပ်ခြင်း)',
  'Voucher Books Printing': 'Voucher Books Printing (ဘောင်ချာစာအုပ် ပုံနှိပ်ခြင်း)',
  'Other Offset Printing Services':
    'Other Offset Printing Services (အခြား အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများ)',
  'General Inquiry': 'General Inquiry (အထွေထွေ စုံစမ်းမေးမြန်းခြင်း)',
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
  id: string;
  index: string;
  name: string;
  nameMm: string;
  category: string;
  categoryMm: string;
  shortDescription: string;
  shortDescriptionMm: string;
  detailedDescription: string;
  detailedDescriptionMm: string;
  visualType: 'bamboo-split' | 'bamboo-sticks' | 'bamboo-custom';
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
  placeholderNote: string;
  placeholderNoteMm?: string;
  specifications: SpecificationRow[];
  inquiryType: InquiryTypeOption;
}

export interface PrintingServiceItem {
  id: string;
  index: string;
  name: string;
  nameMm: string;
  category: string;
  categoryMm: string;
  shortDescription: string;
  shortDescriptionMm: string;
  detailedDescription: string;
  detailedDescriptionMm: string;
  scopePoints: string[];
  scopePointsMm: string[];
  visualType: 'books-printing' | 'voucher-printing' | 'commercial-printing';
  imagePath?: string;
  placeholderNote: string;
  placeholderNoteMm?: string;
  inquiryType: InquiryTypeOption;
}

export type GalleryCategoryName =
  | 'Bamboo Products'
  | 'Bamboo Production'
  | 'Packaging'
  | 'Printing Products'
  | 'Other Company Activities';

export const GALLERY_CATEGORY_LABELS_MM: Record<'All' | GalleryCategoryName, string> = {
  All: 'All (အားလုံး)',
  'Bamboo Products': 'Bamboo Products (ဝါးထုတ်ကုန်များ)',
  'Bamboo Production': 'Bamboo Production (ဝါးထုတ်လုပ်မှုလုပ်ငန်း)',
  Packaging: 'Packaging (ထုပ်ပိုးမှုပုံစံ)',
  'Printing Products': 'Printing Products (ပုံနှိပ်ထုတ်ကုန်များ)',
  'Other Company Activities': 'Other Company Activities (အခြားလုပ်ငန်းဆောင်ရွက်မှုများ)',
};

export interface GalleryPreviewItem {
  id: string;
  title: string;
  titleMm: string;
  category: GalleryCategoryName;
  caption: string;
  captionMm: string;
  altText: string;
  imagePath?: string;
  replacementFileHint: string;
  visualType:
    | 'bamboo-split'
    | 'bamboo-sticks'
    | 'bamboo-custom'
    | 'books-printing'
    | 'voucher-printing'
    | 'commercial-printing';
  isPlaceholder: boolean;
}

export const COMPANY_INFO = {
  name: 'TB Star Company Limited',
  nameMm: 'TBStar Company Limited',
  logoEmblemText: 'TUN BROTHERS',
  logoPath: '/assets/aistudio/TBStar_073dded3.jpeg',
  domain: 'tbstarcompany.com',
  canonicalBase: 'https://tbstarcompany.com',
  telephone: '+95 9 450048547',
  telephoneHref: 'tel:+959450048547',
  whatsapp: '+95 9 450048547',
  whatsappNumberClean: '959450048547',
  whatsappHref: 'https://wa.me/959450048547',
  email: 'info@tbstarcompany.com',
  emailHref: 'mailto:info@tbstarcompany.com',
  address: {
    shortAddress: 'Central Tower, 11th Floor (Room 1103), Kyauktada Township, Yangon',
    shortAddressMm: 'Central Tower (၁၁) လွှာ၊ အခန်း (၁၁၀၃)၊ ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့',
    line1: 'Room No. 1103, 11th Floor, Central Tower',
    line2: 'Corner of 39th Street and Anawrahta Road',
    township: 'Kyauktada Township',
    city: 'Yangon',
    country: 'Myanmar',
    full: 'Room No. 1103, 11th Floor, Central Tower, Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon, Myanmar.',
    fullMm:
      'အခန်းအမှတ် (၁၁၀၃)၊ (၁၁) လွှာ၊ Central Tower၊ ၃၉ လမ်း နှင့် အနော်ရထာလမ်းထောင့်၊ ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ။',
  },
};

export interface PageSeoMetadata {
  title: string;
  description: string;
  heading: string;
  canonicalUrl: string;
  ogImage: string;
  ogImageAlt: string;
  breadcrumbs: { name: string; url: string }[];
}

export const PAGE_SEO: Record<PageRoute, PageSeoMetadata> = {
  '/': {
    title: 'TB Star Company Limited – Bamboo Export & Offset Printing',
    description:
      'TB Star Company Limited manufactures and exports 100% natural Myanmar bamboo split and bamboo sticks with one-stop offset printing services in Yangon.',
    heading: 'Home',
    canonicalUrl: 'https://tbstarcompany.com/',
    ogImage: 'https://tbstarcompany.com/images/products/bamboo-split-main.webp',
    ogImageAlt:
      'TB Star Company Limited 100% Natural Myanmar Bamboo Products and Offset Printing Services',
    breadcrumbs: [{ name: 'Home', url: 'https://tbstarcompany.com/' }],
  },
  '/about': {
    title: 'About Us – TB Star Company Limited | Yangon, Myanmar',
    description:
      'Learn about TB Star Company Limited in Yangon, Myanmar—operating across Bamboo Production & Export, Domestic Distribution, and One-Stop Offset Printing.',
    heading: 'About Us',
    canonicalUrl: 'https://tbstarcompany.com/about',
    ogImage: 'https://tbstarcompany.com/assets/aistudio/TBStar_073dded3.jpeg',
    ogImageAlt: 'TB Star Company Limited Official Corporate Emblem – Yangon, Myanmar',
    breadcrumbs: [
      { name: 'Home', url: 'https://tbstarcompany.com/' },
      { name: 'About Us', url: 'https://tbstarcompany.com/about' },
    ],
  },
  '/bamboo-products': {
    title: 'Bamboo Split & Bamboo Sticks Specifications – TB Star',
    description:
      'Review specifications for 100% natural Myanmar Bamboo Split (3 mm, 20"–48") and Bamboo Sticks (1.2–2.5 mm, 8"/9"/10", 30 kg/bag) from TB Star Company.',
    heading: 'Bamboo Products',
    canonicalUrl: 'https://tbstarcompany.com/bamboo-products',
    ogImage: 'https://tbstarcompany.com/images/products/bamboo-split-main.webp',
    ogImageAlt:
      'TB Star Company Limited 100% Natural Myanmar Bamboo Split (3 mm, 20 to 48 inches) and Bamboo Sticks (30 kg per bag)',
    breadcrumbs: [
      { name: 'Home', url: 'https://tbstarcompany.com/' },
      { name: 'Bamboo Products', url: 'https://tbstarcompany.com/bamboo-products' },
    ],
  },
  '/printing-services': {
    title: 'Offset Printing Services Myanmar – Books & Voucher Books',
    description:
      'TB Star Company Limited provides one-stop offset printing services in Yangon, Myanmar for books printing, voucher books printing, and commercial print runs.',
    heading: 'Offset Printing Services',
    canonicalUrl: 'https://tbstarcompany.com/printing-services',
    ogImage: 'https://tbstarcompany.com/assets/aistudio/Offset-Printing.svg',
    ogImageAlt:
      'TB Star Company Limited One-Stop Offset Printing Services in Yangon, Myanmar',
    breadcrumbs: [
      { name: 'Home', url: 'https://tbstarcompany.com/' },
      {
        name: 'Offset Printing Services',
        url: 'https://tbstarcompany.com/printing-services',
      },
    ],
  },
  '/gallery': {
    title: 'Projects & Product Gallery – TB Star Company Limited',
    description:
      'Explore visual categories for TB Star Company Limited including Bamboo Products, Bamboo Production, 30 kg Export Packaging, and Offset Printing Products.',
    heading: 'Projects / Gallery',
    canonicalUrl: 'https://tbstarcompany.com/gallery',
    ogImage: 'https://tbstarcompany.com/images/products/bamboo-sticks-wholesale.webp',
    ogImageAlt:
      'TB Star Company Limited Bamboo Products, 30 kg Export Packaging, and Printing Gallery',
    breadcrumbs: [
      { name: 'Home', url: 'https://tbstarcompany.com/' },
      { name: 'Projects / Gallery', url: 'https://tbstarcompany.com/gallery' },
    ],
  },
  '/contact': {
    title: 'Contact TB Star Company Limited – Bamboo Export & Printing',
    description:
      'Contact TB Star Company Limited at Central Tower, Kyauktada Township, Yangon (+95 9 450048547, info@tbstarcompany.com) for Bamboo & Offset Printing inquiries.',
    heading: 'Contact Us',
    canonicalUrl: 'https://tbstarcompany.com/contact',
    ogImage: 'https://tbstarcompany.com/assets/aistudio/TBStar_073dded3.jpeg',
    ogImageAlt:
      'Contact TB Star Company Limited at Central Tower, Kyauktada Township, Yangon, Myanmar',
    breadcrumbs: [
      { name: 'Home', url: 'https://tbstarcompany.com/' },
      { name: 'Contact Us', url: 'https://tbstarcompany.com/contact' },
    ],
  },
};

export const BAMBOO_PRODUCTS: BambooProductItem[] = [
  {
    id: 'bamboo-split',
    index: '01',
    name: 'Bamboo Split',
    nameMm: 'ဝါးခြမ်း (Bamboo Split)',
    category: 'Natural Bamboo Processing & Export',
    categoryMm: 'သဘာဝဝါးထုတ်ကုန် ထုတ်လုပ်ရေးနှင့် ပြည်ပပို့ကုန်',
    shortDescription:
      'Uniformly split 3 mm natural bamboo strips manufactured in Myanmar for domestic industrial distribution and international export markets.',
    shortDescriptionMm:
      'မြန်မာနိုင်ငံမှထွက်ရှိသော ၁၀၀% သဘာဝဝါးစစ်စစ်ဖြင့် အထူ ၃ မီလီမီတာ (3 mm) စံချိန်မီ ထုတ်လုပ်ထားပြီး ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်စျေးကွက်များအတွက် အသင့်တော်ဆုံးသော ဝါးခြမ်းများ ဖြစ်ပါသည်။',
    detailedDescription:
      'TB Star Company Limited manufactures 100% natural Myanmar Bamboo Split in lengths from 20 inches to 48 inches with a consistent 3 mm thickness. Available both With Nodes and Without Nodes to match buyer manufacturing and application requirements.',
    detailedDescriptionMm:
      'TB Star Company Limited သည် မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးစစ်စစ်ကို အသုံးပြု၍ အထူ ၃ မီလီမီတာ (3 mm) နှင့် အရှည် ၂၀ လက်မမှ ၄၈ လက်မအထိ ရှိသော ဝါးခြမ်းများကို စနစ်တကျ ထုတ်လုပ်ပေးလျက်ရှိပါသည်။ ဝယ်ယူသူများ၏ လုပ်ငန်းလိုအပ်ချက်အလိုက် အဆစ်ပါ (With Nodes) နှင့် အဆစ်မပါ (Without Nodes) နှစ်မျိုးလုံးကို ရွေးချယ်မှာယူနိုင်ပါသည်။',
    visualType: 'bamboo-split',
    imagePath: '/images/products/bamboo-split-main.webp',
    imageAlt: 'Natural Myanmar bamboo splits with nodes',
    featuredImagePath: '/images/products/bamboo-split-featured.webp',
    featuredImageAlt: 'Featured natural bamboo split product',
    naturalImagePath: '/images/products/bamboo-split-natural.webp',
    naturalImageAlt: 'Natural bamboo splits with authentic bamboo texture',
    wholesaleImagePath: '/images/products/bamboo-split-wholesale.webp',
    wholesaleImageAlt: 'Bamboo splits arranged for commercial supply',
    textureImagePath: '/images/products/bamboo-split-texture.webp',
    textureImageAlt: 'Close-up of natural bamboo split texture',
    placeholderNote: 'TB Star Company Limited · 100% Natural Bamboo Split (3 mm · 20"–48")',
    placeholderNoteMm: 'TBStar Company Limited · ၁၀၀% သဘာဝ ဝါးခြမ်းပြား (အထူ 3 mm · ၂၀"–၄၈")',
    inquiryType: 'Bamboo Split',
    specifications: [
      {
        parameter: 'Product Name',
        parameterMm: 'ကုန်ပစ္စည်းအမည်',
        value: 'Bamboo Split',
        valueMm: 'ဝါးခြမ်း (Bamboo Split)',
        notes: 'Export & domestic distribution grade',
        notesMm: 'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်အဆင့်',
      },
      {
        parameter: 'Thickness',
        parameterMm: 'အထူ',
        value: '3 mm',
        valueMm: '၃ မီလီမီတာ (3 mm)',
        notes: 'Uniform split thickness specification',
        notesMm: 'တစ်ပြေးညီ သတ်မှတ်ထားသော အထူ',
      },
      {
        parameter: 'Material',
        parameterMm: 'ကုန်ကြမ်းအမျိုးအစား',
        value: '100% Natural Bamboo',
        valueMm: '၁၀၀% သဘာဝဝါးစစ်စစ်',
        notes: 'Raw natural bamboo sourced in Myanmar',
        notesMm: 'မြန်မာနိုင်ငံထွက် သဘာဝဝါးစစ်စစ်',
      },
      {
        parameter: 'Available Size',
        parameterMm: 'ရရှိနိုင်သော အရွယ်အစား',
        value: '20 inches to 48 inches',
        valueMm: '၂၀ လက်မ မှ ၄၈ လက်မ အထိ',
        notes: 'Length options within range',
        notesMm: 'သတ်မှတ်အတိုင်းအတာအတွင်း အရှည်ရရှိနိုင်သည်',
      },
      {
        parameter: 'Types',
        parameterMm: 'အမျိုးအစားများ',
        value: 'With Nodes / Without Nodes',
        valueMm: 'အဆစ်ပါ / အဆစ်မပါ နှစ်မျိုးလုံး ရရှိနိုင်သည်',
        notes: 'Specify node preference upon inquiry',
        notesMm: 'ဆက်သွယ်မှာယူရာတွင် ရွေးချယ်နိုင်ပါသည်',
      },
      {
        parameter: 'Country of Origin',
        parameterMm: 'မူရင်းထုတ်လုပ်သည့်နိုင်ငံ',
        value: 'Myanmar',
        valueMm: 'မြန်မာနိုင်ငံ',
        notes: 'Manufactured by TB Star Company Limited',
        notesMm: 'TB Star Company Limited မှ ထုတ်လုပ်သည်',
      },
    ],
  },
  {
    id: 'bamboo-sticks',
    index: '02',
    name: 'Bamboo Sticks',
    nameMm: 'ဝါးတံ (Bamboo Sticks)',
    category: 'Natural Bamboo Processing & Export',
    categoryMm: 'သဘာဝဝါးထုတ်ကုန် ထုတ်လုပ်ရေးနှင့် ပြည်ပပို့ကုန်',
    shortDescription:
      'Precision-sized 100% natural bamboo sticks (1.2 mm to 2.5 mm) packed in standardized 30 kg bags for regional and international buyers.',
    shortDescriptionMm:
      '၁၀၀% သဘာဝမြန်မာ့ဝါးဖြင့် အထူ ၁.၂ မီလီမီတာမှ ၂.၅ မီလီမီတာအထိ တိကျသပ်ရပ်စွာ ထုတ်လုပ်ထားပြီး တစ်အိတ်လျှင် ၃၀ ကီလိုဂရမ် (30 kg) စံနှုန်းဖြင့် ထုပ်ပိုးထားသော ဝါးတံများ ဖြစ်ပါသည်။',
    detailedDescription:
      'Manufactured from 100% natural Myanmar bamboo, our Bamboo Sticks are processed in thicknesses from 1.2 mm to 2.5 mm across three standard lengths (8 inches, 9 inches, and 10 inches) and packed in 30 kg bags for efficient domestic supply and export loading.',
    detailedDescriptionMm:
      '၁၀၀% သဘာဝမြန်မာ့ဝါးစစ်စစ်ဖြင့် ထုတ်လုပ်ထားသော ဝါးတံများကို အထူ ၁.၂ မီလီမီတာမှ ၂.၅ မီလီမီတာအထိ နှင့် အရှည် ၈ လက်မ၊ ၉ လက်မ၊ ၁၀ လက်မ အရွယ်အစား (၃) မျိုးဖြင့် ရရှိနိုင်ပါသည်။ ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပတင်ပို့မှု လွယ်ကူစေရန် တစ်အိတ်လျှင် ၃၀ ကီလိုဂရမ် (30 kg per bag) စံနှုန်းဖြင့် စနစ်တကျ ထုပ်ပိုးပေးထားပါသည်။',
    visualType: 'bamboo-sticks',
    imagePath: '/images/products/bamboo-sticks-main.webp',
    imageAlt: 'Natural bamboo sticks from Myanmar',
    featuredImagePath: '/images/products/bamboo-sticks-featured.webp',
    featuredImageAlt: 'Featured natural bamboo sticks',
    naturalImagePath: '/images/products/bamboo-sticks-natural.webp',
    naturalImageAlt: 'Bamboo sticks arranged in neat bundles',
    wholesaleImagePath: '/images/products/bamboo-sticks-wholesale.webp',
    wholesaleImageAlt: 'Bamboo sticks prepared for commercial supply',
    textureImagePath: '/images/products/bamboo-sticks-texture.webp',
    textureImageAlt: 'Close-up of natural bamboo stick texture',
    placeholderNote: 'TB Star Company Limited · Bamboo Sticks (1.2–2.5 mm · 8", 9", 10" · 30KG/bag)',
    placeholderNoteMm: 'TBStar Company Limited · သဘာဝဝါးတံ (1.2–2.5 mm · ၈"၊ ၉"၊ ၁၀" · တစ်အိတ် 30KG)',
    inquiryType: 'Bamboo Sticks',
    specifications: [
      {
        parameter: 'Product Name',
        parameterMm: 'ကုန်ပစ္စည်းအမည်',
        value: 'Bamboo Sticks',
        valueMm: 'ဝါးတံ (Bamboo Sticks)',
        notes: 'Standardized export & commercial grade',
        notesMm: 'ပြည်ပပို့ကုန်နှင့် လုပ်ငန်းသုံးအဆင့်',
      },
      {
        parameter: 'Thickness',
        parameterMm: 'အထူ',
        value: '1.2 mm to 2.5 mm',
        valueMm: '၁.၂ မီလီမီတာ မှ ၂.၅ မီလီမီတာ အထိ',
        notes: 'Precision stick gauge range',
        notesMm: 'တိကျသပ်ရပ်သော အထူအတိုင်းအတာ',
      },
      {
        parameter: 'Material',
        parameterMm: 'ကုန်ကြမ်းအမျိုးအစား',
        value: '100% Natural Bamboo',
        valueMm: '၁၀၀% သဘာဝဝါးစစ်စစ်',
        notes: 'Natural Myanmar bamboo',
        notesMm: 'မြန်မာနိုင်ငံထွက် သဘာဝဝါးစစ်စစ်',
      },
      {
        parameter: 'Packaging',
        parameterMm: 'ထုပ်ပိုးမှုပုံစံ',
        value: '30 kg per bag',
        valueMm: 'တစ်အိတ်လျှင် ၃၀ ကီလိုဂရမ် (30 kg per bag)',
        notes: 'Standard wholesale & export bag weight',
        notesMm: 'လက်ကားနှင့် ပြည်ပပို့ကုန် စံချိန်မီအိတ်အလေးချိန်',
      },
      {
        parameter: 'Available Sizes',
        parameterMm: 'ရရှိနိုင်သော အရွယ်အစားများ',
        value: '8 inches, 9 inches, and 10 inches',
        valueMm: '၈ လက်မ၊ ၉ လက်မ နှင့် ၁၀ လက်မ',
        notes: 'Select size when inquiring',
        notesMm: 'လိုအပ်သော အရှည်အရွယ်အစားကို ရွေးချယ်မှာယူနိုင်သည်',
      },
      {
        parameter: 'Country of Origin',
        parameterMm: 'မူရင်းထုတ်လုပ်သည့်နိုင်ငံ',
        value: 'Myanmar',
        valueMm: 'မြန်မာနိုင်ငံ',
        notes: 'Manufactured by TB Star Company Limited',
        notesMm: 'TB Star Company Limited မှ ထုတ်လုပ်သည်',
      },
    ],
  },
  {
    id: 'other-bamboo-products',
    index: '03',
    name: 'Other Bamboo Products',
    nameMm: 'အခြား ဝါးထုတ်ကုန်များ (Other Bamboo Products)',
    category: 'Domestic Distribution & Export Supply',
    categoryMm: 'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်',
    shortDescription:
      'Contact us to learn more about our other bamboo products manufactured for Myanmar distribution and international export.',
    shortDescriptionMm:
      'ကျွန်ုပ်တို့၏ အခြားသော သဘာဝဝါးထုတ်ကုန်များအကြောင်း ပိုမိုသိရှိလိုပါက ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။ ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်အတွက် သီးသန့်ဆွေးနွေးနိုင်ပါသည်။',
    detailedDescription:
      'In addition to Bamboo Split and Bamboo Sticks, TB Star Company Limited manufactures and distributes other bamboo-related products for local and international customers. Contact us to learn more about our other bamboo products and discuss your specific requirements.',
    detailedDescriptionMm:
      'TB Star Company Limited သည် ဝါးခြမ်း (Bamboo Split) နှင့် ဝါးတံ (Bamboo Sticks) များအပြင် အခြားသော ဝါးနှင့်ဆက်စပ်သည့် ထုတ်ကုန်ပစ္စည်းများကိုလည်း ပြည်တွင်းနှင့် နိုင်ငံတကာ ဝယ်ယူသူများအတွက် ထုတ်လုပ်ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။ အခြားသော ဝါးထုတ်ကုန်များအကြောင်း အသေးစိတ်သိရှိလိုပါက ကျွန်ုပ်တို့ထံ တိုက်ရိုက်ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။',
    visualType: 'bamboo-custom',
    imagePath: '/images/products/bamboo-split-natural.webp',
    imageAlt: 'Natural bamboo splits with authentic bamboo texture',
    featuredImagePath: '/images/products/bamboo-split-natural.webp',
    featuredImageAlt: 'Natural bamboo splits with authentic bamboo texture',
    placeholderNote: 'TB Star Company Limited · 100% Natural Myanmar Bamboo Products',
    placeholderNoteMm: 'TBStar Company Limited · ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များ',
    inquiryType: 'Other Bamboo Products',
    specifications: [
      {
        parameter: 'Product Category',
        parameterMm: 'ကုန်ပစ္စည်းအမျိုးအစား',
        value: 'Other Bamboo Products',
        valueMm: 'အခြား ဝါးထုတ်ကုန်များ',
        notes: 'Additional bamboo product lines',
        notesMm: 'ဝါးနှင့်ဆက်စပ်သော အခြားထုတ်ကုန်များ',
      },
      {
        parameter: 'Material',
        parameterMm: 'ကုန်ကြမ်းအမျိုးအစား',
        value: '100% Natural Bamboo',
        valueMm: '၁၀၀% သဘာဝဝါးစစ်စစ်',
        notes: 'Natural bamboo from Myanmar',
        notesMm: 'မြန်မာနိုင်ငံထွက် သဘာဝဝါးစစ်စစ်',
      },
      {
        parameter: 'Supply Markets',
        parameterMm: 'ဖြန့်ဖြူးတင်ပို့သည့် စျေးကွက်',
        value: 'Myanmar Distribution & International Export',
        valueMm: 'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် နိုင်ငံတကာပို့ကုန်',
        notes: 'Local & overseas supply',
        notesMm: 'ပြည်တွင်းနှင့် ပြည်ပစျေးကွက်များ',
      },
      {
        parameter: 'Specifications',
        parameterMm: 'အသေးစိတ်အချက်အလက်များ',
        value: 'Contact us to learn more about our other bamboo products.',
        valueMm: 'အခြားဝါးထုတ်ကုန်များအကြောင်း သိရှိရန် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။',
        notes: 'Tailored to buyer inquiry',
        notesMm: 'ဝယ်ယူသူလိုအပ်ချက်အလိုက် ဆွေးနွေးနိုင်သည်',
      },
      {
        parameter: 'Country of Origin',
        parameterMm: 'မူရင်းထုတ်လုပ်သည့်နိုင်ငံ',
        value: 'Myanmar',
        valueMm: 'မြန်မာနိုင်ငံ',
        notes: 'TB Star Company Limited',
        notesMm: 'TB Star Company Limited',
      },
    ],
  },
];

export const PRINTING_SERVICES: PrintingServiceItem[] = [
  {
    id: 'books-printing',
    index: '01',
    name: 'Books Printing',
    nameMm: 'စာအုပ်ပုံနှိပ်ခြင်းလုပ်ငန်း (Books Printing)',
    category: 'One-Stop Offset Printing Services',
    categoryMm: 'တစ်နေရာတည်းတွင် အပြီးအစီး ရရှိနိုင်သော အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှု',
    shortDescription:
      'Professional offset book printing services for publications, educational materials, corporate manuals, and bound editions.',
    shortDescriptionMm:
      'စာအုပ်စာပေများ၊ ပညာရေးဆိုင်ရာ စာအုပ်များ၊ ကုမ္ပဏီလက်စွဲစာအုပ်များနှင့် စာမျက်နှာစုံ စာအုပ်အမျိုးမျိုးအတွက် သပ်ရပ်ကြည်လင်သော အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုကို ဆောင်ရွက်ပေးပါသည်။',
    detailedDescription:
      'TB Star Company Limited provides dedicated offset printing for multi-page books, publications, instructional manuals, and institutional editions. Our one-stop workflow supports local publishers, organizations, and businesses in Yangon and across Myanmar.',
    detailedDescriptionMm:
      'TB Star Company Limited သည် စာအုပ်ထုတ်ဝေသူများ၊ ပညာရေးနှင့် လူမှုရေးအဖွဲ့အစည်းများ၊ စီးပွားရေးလုပ်ငန်းများအတွက် စာမျက်နှာစုံ စာအုပ်အမျိုးမျိုးနှင့် လမ်းညွှန်စာအုပ်များကို အော့ဖ်ဆက်ပုံနှိပ်စနစ်ဖြင့် သပ်ရပ်ခိုင်ခံ့စွာ ပုံနှိပ်ချုပ်လုပ်ပေးလျက်ရှိပါသည်။',
    scopePoints: [
      'Multi-page interior text and cover offset printing',
      'Coordinated prepress review, press run, and book binding',
      'Consultative support based on your publication specifications',
    ],
    scopePointsMm: [
      'အတွင်းစာသားနှင့် မျက်နှာဖုံးများကို ကြည်လင်ပြတ်သားစွာ အော့ဖ်ဆက်ပုံနှိပ်ပေးခြင်း',
      'ပုံနှိပ်မတိုင်မီ စစ်ဆေးခြင်းမှ စာအုပ်ချုပ်လုပ်ပြီးစီးသည်အထိ စနစ်တကျ ဆောင်ရွက်ပေးခြင်း',
      'လူကြီးမင်းတို့ လိုအပ်သော စာအုပ်အရွယ်အစားနှင့် စက္ကူအမျိုးအစားအလိုက် တိုင်ပင်ဆွေးနွေးပေးခြင်း',
    ],
    visualType: 'books-printing',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    placeholderNote: 'TB Star Company Limited · Books Printing & Bound Publications',
    placeholderNoteMm: 'TBStar Company Limited · စာအုပ်ပုံနှိပ်ခြင်းနှင့် စာပေထုတ်ဝေမှုလုပ်ငန်း',
    inquiryType: 'Books Printing',
  },
  {
    id: 'voucher-books-printing',
    index: '02',
    name: 'Voucher Books Printing',
    nameMm: 'ဘောင်ချာစာအုပ် ပုံနှိပ်ခြင်းလုပ်ငန်း (Voucher Books Printing)',
    category: 'One-Stop Offset Printing Services',
    categoryMm: 'တစ်နေရာတည်းတွင် အပြီးအစီး ရရှိနိုင်သော အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှု',
    shortDescription:
      'Reliable offset printing for commercial voucher books, receipt pads, invoice books, and daily business documentation.',
    shortDescriptionMm:
      'စီးပွားရေးလုပ်ငန်းများတွင် နေ့စဉ်အသုံးပြုသော ဘောင်ချာစာအုပ်များ၊ ပြေစာစာအုပ်များနှင့် ငွေတောင်းခံလွှာစာအုပ်များကို စာလုံးကြည်လင်ပြတ်သားစွာဖြင့် စနစ်တကျ ပုံနှိပ်ပေးပါသည်။',
    detailedDescription:
      'We produce commercial voucher books, invoice pads, receipt books, and accounting forms tailored to daily business operations. Designed for legibility and practical commercial use across retail, wholesale, and corporate sectors.',
    detailedDescriptionMm:
      'လက်လီလက်ကား အရောင်းဆိုင်များ၊ ကုမ္ပဏီများနှင့် စီးပွားရေးလုပ်ငန်းများတွင် နေ့စဉ်အသုံးပြုရန် လိုအပ်သော ဘောင်ချာစာအုပ်များ (Voucher Books)၊ ပြေစာစာအုပ်များ (Receipt Pads) နှင့် ငွေတောင်းခံလွှာစာအုပ်များ (Invoice Books) ကို လုပ်ငန်းအမှတ်တံဆိပ်နှင့်အညီ သပ်ရပ်စွာ ပုံနှိပ်ပေးပါသည်။',
    scopePoints: [
      'Commercial voucher books, receipt pads, and invoice books',
      'Clear form layout alignment for business record-keeping',
      'Tailored to your company’s branding and page structure',
    ],
    scopePointsMm: [
      'လုပ်ငန်းသုံး ဘောင်ချာစာအုပ်၊ ပြေစာနှင့် ငွေတောင်းခံလွှာစာအုပ်အမျိုးမျိုး ပုံနှိပ်ပေးခြင်း',
      'စာရင်းမှတ်တမ်းထားရှိရာတွင် ရှင်းလင်းလွယ်ကူစေမည့် စာမျက်နှာဖွဲ့စည်းပုံ',
      'ကုမ္ပဏီအမည်၊ လိုဂိုနှင့် လိုအပ်သော အချက်အလက်များအတိုင်း စိတ်ကြိုက်ပုံနှိပ်နိုင်ခြင်း',
    ],
    visualType: 'voucher-printing',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    placeholderNote: 'TB Star Company Limited · Commercial Voucher Books Printing',
    placeholderNoteMm: 'TBStar Company Limited · လုပ်ငန်းသုံး ဘောင်ချာစာအုပ် ပုံနှိပ်ခြင်းလုပ်ငန်း',
    inquiryType: 'Voucher Books Printing',
  },
  {
    id: 'other-offset-printing',
    index: '03',
    name: 'Other Offset Printing Services',
    nameMm: 'အခြား အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများ (Other Offset Printing Services)',
    category: 'One-Stop Offset Printing Services',
    categoryMm: 'တစ်နေရာတည်းတွင် အပြီးအစီး ရရှိနိုင်သော အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှု',
    shortDescription:
      'Comprehensive one-stop offset printing solutions supporting commercial, administrative, and corporate print requirements.',
    shortDescriptionMm:
      'ရုံးသုံးနှင့် လုပ်ငန်းသုံး ပုံနှိပ်ပစ္စည်းအမျိုးမျိုးအတွက် တစ်နေရာတည်းတွင် အပြီးအစီး (One-Stop Offset Printing) တာဝန်ယူ ဆောင်ရွက်ပေးလျက်ရှိပါသည်။',
    detailedDescription:
      'Beyond books and voucher books, TB Star Company Limited delivers one-stop offset printing services for a wide variety of business and organizational print needs. Contact our Yangon office to discuss your specific offset printing requirements.',
    detailedDescriptionMm:
      'စာအုပ်များနှင့် ဘောင်ချာစာအုပ်များအပြင် အခြားသော ရုံးသုံး၊ လုပ်ငန်းသုံး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း အမျိုးမျိုးကိုလည်း တစ်နေရာတည်းတွင် အပြီးအစီး ဆောင်ရွက်ပေးပါသည်။ လူကြီးမင်းတို့၏ ပုံနှိပ်လိုအပ်ချက်များအတွက် ရန်ကုန်ရုံးချုပ်သို့ တိုက်ရိုက်ဆက်သွယ်ဆွေးနွေးနိုင်ပါသည်။',
    scopePoints: [
      'One-stop offset printing services from consultation to completion',
      'Commercial, administrative, and corporate print materials',
      'Direct coordination with our Yangon team for custom print specifications',
    ],
    scopePointsMm: [
      'ကနဦးဆွေးနွေးတိုင်ပင်ခြင်းမှ ပုံနှိပ်ပြီးစီးသည်အထိ တစ်နေရာတည်းတွင် အပြီးအစီး ဝန်ဆောင်မှုပေးခြင်း',
      'စီးပွားရေးလုပ်ငန်းသုံးနှင့် ရုံးသုံးပုံနှိပ်ပစ္စည်းအမျိုးမျိုး ဆောင်ရွက်ပေးခြင်း',
      'လုပ်ငန်းလိုအပ်ချက်နှင့် ကိုက်ညီစေရန် ရန်ကုန်ရုံးအဖွဲ့နှင့် တိုက်ရိုက်ညှိနှိုင်းဆောင်ရွက်နိုင်ခြင်း',
    ],
    visualType: 'commercial-printing',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    placeholderNote: 'TB Star Company Limited · One-Stop Offset Printing Services',
    placeholderNoteMm: 'TBStar Company Limited · တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှု',
    inquiryType: 'Other Offset Printing Services',
  },
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    index: '01',
    title: 'Bamboo Product Manufacturing',
    titleMm: 'သဘာဝဝါးထုတ်ကုန်များ ထုတ်လုပ်ခြင်း',
    description:
      'Manufacturing 100% natural Myanmar bamboo products—including 3 mm Bamboo Split (20"–48") and Bamboo Sticks (1.2–2.5 mm)—with clear dimensional specifications.',
    descriptionMm:
      'မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးစစ်စစ်ဖြင့် အထူ 3 mm ဝါးခြမ်းများ (၂၀"–၄၈") နှင့် ဝါးတံများ (1.2–2.5 mm) ကို တိကျသော အတိုင်းအတာ စံချိန်စံညွှန်းများအတိုင်း ထုတ်လုပ်ပေးလျက်ရှိပါသည်။',
    divisionTag: 'Division A · Manufacturing',
    divisionTagMm: 'လုပ်ငန်းကဏ္ဍ (က) · ထုတ်လုပ်ရေး',
  },
  {
    index: '02',
    title: 'Domestic Product Distribution',
    titleMm: 'ပြည်တွင်းစျေးကွက်သို့ ဖြန့်ဖြူးပေးခြင်း',
    description:
      'Distributing bamboo products and commercial printing deliverables to businesses and buyers across Yangon and throughout Myanmar.',
    descriptionMm:
      'သဘာဝဝါးထုတ်ကုန်များနှင့် ပုံနှိပ်ပစ္စည်းများကို ရန်ကုန်မြို့နှင့် မြန်မာနိုင်ငံတစ်ဝန်းရှိ လုပ်ငန်းရှင်များနှင့် ဝယ်ယူသူများထံသို့ စနစ်တကျ ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။',
    divisionTag: 'Division A & B · Myanmar Distribution',
    divisionTagMm: 'လုပ်ငန်းကဏ္ဍ (က နှင့် ခ) · ပြည်တွင်းဖြန့်ဖြူးရေး',
  },
  {
    index: '03',
    title: 'International Export Activities',
    titleMm: 'နိုင်ငံတကာစျေးကွက်သို့ တင်ပို့ရောင်းချခြင်း',
    description:
      'Export-ready bamboo supply featuring standardized 30 kg bag packaging for Bamboo Sticks and With Nodes / Without Nodes Bamboo Split for global buyers.',
    descriptionMm:
      'နိုင်ငံတကာဝယ်ယူသူများအတွက် တစ်အိတ်လျှင် 30 kg စံနှုန်းဖြင့် ထုပ်ပိုးထားသော ဝါးတံများနှင့် အဆစ်ပါ/အဆစ်မပါ ဝါးခြမ်းများကို ပြည်ပပို့ကုန်အဖြစ် တင်ပို့ပေးလျက်ရှိပါသည်။',
    divisionTag: 'Division A · Global Export',
    divisionTagMm: 'လုပ်ငန်းကဏ္ဍ (က) · ပြည်ပပို့ကုန်',
  },
  {
    index: '04',
    title: 'One-Stop Offset Printing Services',
    titleMm: 'တစ်နေရာတည်းတွင် အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှု',
    description:
      'Providing one-stop offset printing services covering Books Printing, Voucher Books Printing, and other commercial offset printing requirements.',
    descriptionMm:
      'စာအုပ်ပုံနှိပ်ခြင်း၊ ဘောင်ချာစာအုပ်ပုံနှိပ်ခြင်းနှင့် အခြားအော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းများကို တစ်နေရာတည်းတွင် အပြီးအစီး (One-Stop Service) ဆောင်ရွက်ပေးပါသည်။',
    divisionTag: 'Division B · Offset Printing',
    divisionTagMm: 'လုပ်ငန်းကဏ္ဍ (ခ) · အော့ဖ်ဆက်ပုံနှိပ်',
  },
];

export const PROPOSED_CORPORATE_VALUES = [
  {
    index: '01',
    title: 'Specification Transparency',
    titleMm: 'တိကျရှင်းလင်းသော ကုန်ပစ္စည်းစံချိန်စံညွှန်း',
    description:
      'Communicating clear, accurate product dimensions, materials, and packaging details for both domestic and international buyers.',
    descriptionMm:
      'ပြည်တွင်းနှင့် နိုင်ငံတကာဝယ်ယူသူများအတွက် ကုန်ပစ္စည်းအရွယ်အစား၊ အထူ၊ သဘာဝကုန်ကြမ်းနှင့် ထုပ်ပိုးမှုအချက်အလက်များကို တိကျရှင်းလင်းစွာ ဖော်ပြပေးပါသည်။',
    statusNote: 'Proposed Draft Value',
  },
  {
    index: '02',
    title: 'Dependable B2B Coordination',
    titleMm: 'ယုံကြည်စိတ်ချရသော လုပ်ငန်းချိတ်ဆက်ဆောင်ရွက်မှု',
    description:
      'Serving as a responsive point of contact in Central Tower, Yangon for bamboo export inquiries and one-stop offset printing projects.',
    descriptionMm:
      'ရန်ကုန်မြို့ Central Tower ရုံးချုပ်မှတစ်ဆင့် ဝါးပို့ကုန်လုပ်ငန်းနှင့် အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း ဆက်သွယ်မေးမြန်းမှုများကို လျင်မြန်စွာ ချိတ်ဆက်ဆောင်ရွက်ပေးပါသည်။',
    statusNote: 'Proposed Draft Value',
  },
  {
    index: '03',
    title: 'Natural Material & Print Craftsmanship',
    titleMm: 'သဘာဝကုန်ကြမ်းနှင့် သပ်ရပ်သော ပုံနှိပ်အရည်အသွေး',
    description:
      'Combining 100% natural Myanmar bamboo processing with practical, well-executed commercial offset printing.',
    descriptionMm:
      '၁၀၀% သဘာဝမြန်မာ့ဝါးထုတ်ကုန် ထုတ်လုပ်မှုနှင့် လက်တွေ့လုပ်ငန်းသုံး သပ်ရပ်သော အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုတို့ကို ပေါင်းစပ်ဆောင်ရွက်ပေးပါသည်။',
    statusNote: 'Proposed Draft Value',
  },
];

export const GALLERY_PREVIEW_ITEMS: GalleryPreviewItem[] = [
  {
    id: 'gal-1',
    title: 'Bamboo Split (With Nodes & Without Nodes)',
    titleMm: 'ဝါးခြမ်းပြား (အဆစ်ပါ / အဆစ်မပါ နှစ်မျိုး)',
    category: 'Bamboo Products',
    caption: '3 mm thickness · 20 inches to 48 inches · 100% Natural Myanmar Bamboo',
    captionMm: 'အထူ ၃ မီလီမီတာ · အရှည် ၂၀ လက်မ မှ ၄၈ လက်မ · ၁၀၀% သဘာဝမြန်မာ့ဝါး',
    altText: 'Natural Myanmar bamboo splits with nodes',
    imagePath: '/images/products/bamboo-split-main.webp',
    replacementFileHint: '/images/products/bamboo-split-main.webp',
    visualType: 'bamboo-split',
    isPlaceholder: false,
  },
  {
    id: 'gal-2',
    title: 'Bamboo Sticks (8", 9", and 10" Sizes)',
    titleMm: 'ဝါးတံ (၈ လက်မ၊ ၉ လက်မ နှင့် ၁၀ လက်မ)',
    category: 'Bamboo Products',
    caption: '1.2 mm to 2.5 mm thickness · 100% Natural Myanmar Bamboo',
    captionMm: 'အထူ ၁.၂ မီလီမီတာ မှ ၂.၅ မီလီမီတာ · ၁၀၀% သဘာဝမြန်မာ့ဝါး',
    altText: 'Natural bamboo sticks from Myanmar',
    imagePath: '/images/products/bamboo-sticks-main.webp',
    replacementFileHint: '/images/products/bamboo-sticks-main.webp',
    visualType: 'bamboo-sticks',
    isPlaceholder: false,
  },
  {
    id: 'gal-3',
    title: 'Natural Bamboo Splitting & Sizing Workflow',
    titleMm: 'သဘာဝဝါး စိတ်ဖြာခြင်းနှင့် အရွယ်အစားညှိခြင်း လုပ်ငန်းစဉ်',
    category: 'Bamboo Production',
    caption: 'Manufacturing bamboo-related products in Myanmar for local and export supply',
    captionMm: 'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်အတွက် မြန်မာနိုင်ငံတွင် ဝါးထုတ်ကုန်များ ထုတ်လုပ်နေမှု',
    altText: 'Natural bamboo splits with authentic bamboo texture',
    imagePath: '/images/products/bamboo-split-natural.webp',
    replacementFileHint: '/images/products/bamboo-split-natural.webp',
    visualType: 'bamboo-custom',
    isPlaceholder: false,
  },
  {
    id: 'gal-4',
    title: '30 kg per Bag Export Packaging',
    titleMm: 'တစ်အိတ်လျှင် ၃၀ ကီလိုဂရမ် (30 kg) ပြည်ပပို့ကုန် ထုပ်ပိုးမှုပုံစံ',
    category: 'Packaging',
    caption: 'Standardized 30 kg per bag packaging for Bamboo Sticks export and distribution',
    captionMm: 'ဝါးတံများ ပြည်ပတင်ပို့ရန်နှင့် ဖြန့်ဖြူးရန် တစ်အိတ်လျှင် 30 kg စံနှုန်းဖြင့် ထုပ်ပိုးထားရှိမှု',
    altText: 'Bamboo sticks prepared for commercial supply',
    imagePath: '/images/products/bamboo-sticks-wholesale.webp',
    replacementFileHint: '/images/products/bamboo-sticks-wholesale.webp',
    visualType: 'bamboo-sticks',
    isPlaceholder: false,
  },
  {
    id: 'gal-5',
    title: 'Offset Books & Voucher Books Printing',
    titleMm: 'စာအုပ်နှင့် ဘောင်ချာစာအုပ် အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း',
    category: 'Printing Products',
    caption: 'One-stop offset printing for books, commercial voucher books, and business forms',
    captionMm: 'စာအုပ်များ၊ လုပ်ငန်းသုံးဘောင်ချာစာအုပ်များနှင့် ရုံးသုံးပုံစံစာရွက်များ ပုံနှိပ်ထုတ်လုပ်မှု',
    altText: 'TB Star Company Limited offset printed books and commercial voucher pads',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    replacementFileHint: '/assets/aistudio/Offset-Printing.svg',
    visualType: 'books-printing',
    isPlaceholder: false,
  },
  {
    id: 'gal-6',
    title: 'One-Stop Offset Press & Distribution Activities',
    titleMm: 'အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းနှင့် ပြည်တွင်းဖြန့်ဖြူးရေး ဆောင်ရွက်မှုများ',
    category: 'Other Company Activities',
    caption: 'Coordinated commercial offset printing and domestic Myanmar distribution',
    captionMm: 'တစ်နေရာတည်းတွင် အပြီးအစီး ပုံနှိပ်ဝန်ဆောင်မှုနှင့် ပြည်တွင်းဖြန့်ဖြူးရေး လုပ်ငန်းများ',
    altText: 'TB Star Company Limited commercial printing and distribution activities',
    imagePath: '/assets/aistudio/Offset-Printing.svg',
    replacementFileHint: '/assets/aistudio/Offset-Printing.svg',
    visualType: 'commercial-printing',
    isPlaceholder: false,
  },
];

export const COMPANY_VISION_MISSION = {
  vision: {
    kicker: 'Corporate Vision · ကုမ္ပဏီ၏ မျှော်မှန်းချက်',
    title: 'Our Vision',
    titleMm: 'ကျွန်ုပ်တို့၏ မျှော်မှန်းချက် (Vision)',
    statement:
      'To become a trusted regional and international leader in sustainable 100% natural Myanmar bamboo exports and a premier one-stop commercial offset printing partner in Myanmar.',
    statementMm:
      'မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးထုတ်ကုန်များကို ပြည်တွင်းနှင့် နိုင်ငံတကာစျေးကွက်သို့ ရေရှည်တည်တံ့စွာ တင်ပို့ဖြန့်ဖြူးသည့် ဦးဆောင်ကုမ္ပဏီတစ်ခုဖြစ်လာစေရန်နှင့် မြန်မာနိုင်ငံ၏ အားကိုးယုံကြည်ရဆုံး တစ်နေရာတည်း အပြီးအစီး (One-Stop) အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှု လုပ်ငန်းရှင်ဖြစ်လာစေရန်။',
    highlights: [
      'Sustainable global supply of 100% natural Myanmar bamboo products',
      'Dependable long-term trade relationships across domestic and overseas markets',
      'Modern, high-precision commercial offset printing under one roof in Yangon',
    ],
    highlightsMm: [
      '၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များကို နိုင်ငံတကာစံချိန်မီ စဉ်ဆက်မပြတ် ထုတ်လုပ်တင်ပို့နိုင်ရန်',
      'ပြည်တွင်းနှင့် ပြည်ပ စီးပွားရေးမိတ်ဖက်များနှင့် ရေရှည်ခိုင်မာသော ယုံကြည်မှု တည်ဆောက်ရန်',
      'ရန်ကုန်မြို့တွင် အရည်အသွေးမြင့် အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုကို တစ်နေရာတည်း အပြီးအစီး ပေးအပ်နိုင်ရန်',
    ],
  },
  mission: {
    kicker: 'Corporate Mission · ကုမ္ပဏီ၏ ရည်မှန်းချက်တာဝန်',
    title: 'Our Mission',
    titleMm: 'ကျွန်ုပ်တို့၏ ရည်မှန်းချက် (Mission)',
    statement:
      'To manufacture and supply precision-graded natural bamboo products with transparent specifications and export-ready packaging, while delivering accurate, timely, and cost-effective offset printing solutions for businesses and institutions.',
    statementMm:
      'တိကျသော အတိုင်းအတာ စံချိန်စံညွှန်းနှင့် ပြည်ပပို့ကုန်အဆင့် ထုပ်ပိုးမှုရှိသည့် သဘာဝဝါးထုတ်ကုန်များကို ထုတ်လုပ်ဖြန့်ဖြူးပေးရန်နှင့် စီးပွားရေးလုပ်ငန်းများ၊ အဖွဲ့အစည်းများအတွက် သပ်ရပ်တိကျပြီး အချိန်မီပြီးစီးသော အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများကို ဆောင်ရွက်ပေးရန်။',
    highlights: [
      'Maintain strict dimensional grading (3 mm Bamboo Split & 1.2–2.5 mm Bamboo Sticks)',
      'Provide standardized 30 kg export packaging and responsive Yangon B2B coordination',
      'Deliver sharp typography, accurate color reproduction, and durable binding for every print run',
    ],
    highlightsMm: [
      'ဝါးခြမ်းပြား (3 mm) နှင့် ဝါးတံ (1.2–2.5 mm) အရွယ်အစား စံချိန်စံညွှန်း တိကျမှုကို အစဉ်ထိန်းသိမ်းရန်',
      'တစ်အိတ် 30 kg စံနှုန်း ထုပ်ပိုးမှုနှင့် ရန်ကုန်ရုံးချုပ်မှ မြန်ဆန်တိကျသော B2B ဝန်ဆောင်မှုပေးရန်',
      'စာအုပ်နှင့် ဘောင်ချာစာအုပ် ပုံနှိပ်ခြင်းတိုင်းတွင် စာလုံးကြည်လင်မှုနှင့် ချုပ်လုပ်မှု ခိုင်ခံ့သပ်ရပ်စေရန်',
    ],
  },
};

export interface IndustryServedItem {
  id: string;
  index: string;
  sector: 'Bamboo Division' | 'Printing Division' | 'Dual Division';
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
    sector: 'Bamboo Division',
    sectorMm: 'ဝါးထုတ်ကုန် ကဏ္ဍ',
    title: 'Agriculture, Horticulture & Plant Nurseries',
    titleMm: 'စိုက်ပျိုးရေး၊ ပျိုးဥယျာဉ်နှင့် စိုက်ခင်းလုပ်ငန်းများ',
    description:
      'Supplying strong 3 mm natural Bamboo Split (20"–48", with or without nodes) for crop support stakes, greenhouse trellises, orchard fencing, and nursery plant ties.',
    descriptionMm:
      'စိုက်ပျိုးရေးခြံများ၊ ပျိုးဥယျာဉ်များနှင့် ဟင်းသီးဟင်းရွက်စိုက်ခင်းများတွင် အပင်ထောက်တိုင်၊ စင်တိုင်နှင့် ခြံစည်းရိုးများအဖြစ် အသုံးပြုရန် အထူ 3 mm သဘာဝဝါးခြမ်းပြားများ (၂၀"–၄၈") ကို ဖြန့်ဖြူးပေးပါသည်။',
    productsUsed: 'Bamboo Split (3 mm · 20"–48" · With/Without Nodes)',
    productsUsedMm: 'ဝါးခြမ်းပြား (3 mm · ၂၀"–၄၈" · အဆစ်ပါ/အဆစ်မပါ)',
    inquiryType: 'Bamboo Split',
  },
  {
    id: 'ind-incense',
    index: '02',
    sector: 'Bamboo Division',
    sectorMm: 'ဝါးထုတ်ကုန် ပြည်ပပို့ကုန်ကဏ္ဍ',
    title: 'Incense (Agarbatti) & Fragrance Manufacturing',
    titleMm: 'အမွှေးတိုင်နှင့် လူသုံးကုန် ထုတ်လုပ်ရေးစက်ရုံများ',
    description:
      'Exporting precision-sized Bamboo Sticks (1.2 mm to 2.5 mm thickness in 8", 9", and 10" lengths, packed 30 kg/bag) for raw incense stick production and aromatic goods.',
    descriptionMm:
      'ပြည်တွင်းနှင့် ပြည်ပ အမွှေးတိုင်စက်ရုံများအတွက် အထူ 1.2–2.5 mm နှင့် အရှည် ၈"၊ ၉"၊ ၁၀" ရှိသော စံချိန်မီ သဘာဝဝါးတံများကို တစ်အိတ် 30 kg ထုပ်ပိုးမှုဖြင့် တင်ပို့ပေးပါသည်။',
    productsUsed: 'Bamboo Sticks (1.2–2.5 mm · 8", 9", 10" · 30 kg/bag)',
    productsUsedMm: 'ဝါးတံ (1.2–2.5 mm · ၈"၊ ၉"၊ ၁၀" · တစ်အိတ် 30 kg)',
    inquiryType: 'Bamboo Sticks',
  },
  {
    id: 'ind-handicraft',
    index: '03',
    sector: 'Bamboo Division',
    sectorMm: 'ဝါးထုတ်ကုန် ကဏ္ဍ',
    title: 'Handicrafts, Weaving, Furniture & Eco-Packaging',
    titleMm: 'လက်မှုအနုပညာ၊ ဝါးရက်လုပ်ငန်းနှင့် ပရိဘောဂကဏ္ဍ',
    description:
      'Providing flexible node-free and structural node-intact bamboo strips for woven baskets, blinds, mats, furniture panels, and biodegradable packaging manufacturers.',
    descriptionMm:
      'ဝါးရက်လုပ်ငန်း၊ လက်မှုပစ္စည်း၊ ဝါးယင်းလိပ်၊ ပရိဘောဂနှင့် သဘာဝထုပ်ပိုးပစ္စည်း ထုတ်လုပ်သူများအတွက် ကွေးညွှတ်ရလွယ်ကူသော ဝါးခြမ်းနှင့် အခြားဝါးထုတ်ကုန်များကို ထောက်ပံ့ပေးပါသည်။',
    productsUsed: 'Bamboo Split & Other Natural Bamboo Products',
    productsUsedMm: 'ဝါးခြမ်းပြားနှင့် အခြား သဘာဝဝါးထုတ်ကုန်များ',
    inquiryType: 'Other Bamboo Products',
  },
  {
    id: 'ind-publishing',
    index: '04',
    sector: 'Printing Division',
    sectorMm: 'အော့ဖ်ဆက် ပုံနှိပ်ကဏ္ဍ',
    title: 'Publishing Houses, Schools & Educational Institutions',
    titleMm: 'စာပေထုတ်ဝေရေး၊ ကျောင်းနှင့် ပညာရေးအဖွဲ့အစည်းများ',
    description:
      'Delivering one-stop offset book printing for textbooks, literary publications, instructional manuals, workbooks, and institutional periodicals.',
    descriptionMm:
      'စာအုပ်ထုတ်ဝေသူများ၊ ပုဂ္ဂလိကကျောင်းများနှင့် ပညာရေးအဖွဲ့အစည်းများအတွက် ဖတ်စာအုပ်၊ လမ်းညွှန်စာအုပ်နှင့် စာပေစာအုပ်အမျိုးမျိုးကို အော့ဖ်ဆက်စနစ်ဖြင့် ပုံနှိပ်ချုပ်လုပ်ပေးပါသည်။',
    productsUsed: 'Books Printing, Manuals & Educational Editions',
    productsUsedMm: 'စာအုပ်ပုံနှိပ်ခြင်းနှင့် ပညာရေးစာစောင်များ',
    inquiryType: 'Books Printing',
  },
  {
    id: 'ind-retail',
    index: '05',
    sector: 'Printing Division',
    sectorMm: 'အော့ဖ်ဆက် ပုံနှိပ်ကဏ္ဍ',
    title: 'Retail Chains, Wholesale Distribution & Logistics',
    titleMm: 'လက်လီလက်ကား အရောင်းဆိုင်များနှင့် ကုန်သွယ်ရေးလုပ်ငန်းများ',
    description:
      'Producing serially numbered commercial voucher books, carbonless NCR invoice pads, delivery orders, and warehouse inventory forms.',
    descriptionMm:
      'အရောင်းဆိုင်များ၊ ကုမ္ပဏီများနှင့် ကုန်စည်ပို့ဆောင်ရေးလုပ်ငန်းများတွင် နေ့စဉ်သုံးစွဲရသော ဘောင်ချာစာအုပ်၊ ပြေစာနှင့် ငွေတောင်းခံလွှာစာအုပ်များကို စိတ်ကြိုက်ပုံနှိပ်ပေးပါသည်။',
    productsUsed: 'Voucher Books, Invoice Pads & Receipt Books',
    productsUsedMm: 'ဘောင်ချာစာအုပ်၊ ပြေစာနှင့် ငွေတောင်းခံလွှာစာအုပ်များ',
    inquiryType: 'Voucher Books Printing',
  },
  {
    id: 'ind-corporate',
    index: '06',
    sector: 'Printing Division',
    sectorMm: 'အော့ဖ်ဆက် ပုံနှိပ်ကဏ္ဍ',
    title: 'Corporate Offices, NGOs & Commercial Enterprises',
    titleMm: 'ကုမ္ပဏီရုံးများ၊ အဖွဲ့အစည်းများနှင့် စီးပွားရေးလုပ်ငန်းများ',
    description:
      'Supporting corporate branding and administrative operations with executive business cards, company profiles, brochures, pamphlets, and custom stationery.',
    descriptionMm:
      'ကုမ္ပဏီနှင့် အဖွဲ့အစည်းများအတွက် လိပ်စာကတ်၊ လက်ကမ်းစာစောင် (Brochures)၊ ကုမ္ပဏီမိတ်ဆက်စာအုပ်နှင့် ရုံးသုံးပုံနှိပ်ပစ္စည်းအမျိုးမျိုးကို တစ်နေရာတည်း အပြီးအစီး ဆောင်ရွက်ပေးပါသည်။',
    productsUsed: 'Brochures, Business Cards & Corporate Print',
    productsUsedMm: 'လက်ကမ်းစာစောင်၊ လိပ်စာကတ်နှင့် ရုံးသုံးပုံနှိပ်များ',
    inquiryType: 'Other Offset Printing Services',
  },
];

export const EXPORT_AND_DOMESTIC_MARKETS = {
  domestic: {
    badge: 'Domestic Market · ပြည်တွင်းစျေးကွက်',
    title: 'Myanmar Domestic Distribution Network',
    titleMm: 'မြန်မာနိုင်ငံ ပြည်တွင်းဖြန့်ဖြူးရေး စျေးကွက်',
    description:
      'From our headquarters in Kyauktada Township, Yangon, we supply natural bamboo products and commercial offset printing across key commercial hubs in Myanmar.',
    descriptionMm:
      'ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ် ရုံးချုပ်မှတစ်ဆင့် မြန်မာနိုင်ငံတစ်ဝန်းရှိ အဓိက စီးပွားရေးမြို့ကြီးများနှင့် လုပ်ငန်းနယ်ပယ်အသီးသီးသို့ သဘာဝဝါးထုတ်ကုန်များနှင့် ပုံနှိပ်ပစ္စည်းများကို ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။',
    regions: [
      {
        name: 'Yangon Region (Commercial & Industrial Hub)',
        nameMm: 'ရန်ကုန်တိုင်းဒေသကြီး (ရုံးချုပ်နှင့် အဓိကဖြန့်ဖြူးရေးဗဟို)',
      },
      {
        name: 'Mandalay, Bago & Central Myanmar Supply',
        nameMm: 'မန္တလေး၊ ပဲခူးနှင့် မြန်မာပြည်အလယ်ပိုင်း ဒေသများ',
      },
      {
        name: 'Ayeyarwady & Regional Agricultural Zones',
        nameMm: 'ဧရာဝတီတိုင်းနှင့် စိုက်ပျိုးရေး/ကုန်ထုတ်လုပ်ငန်း ဒေသများ',
      },
      {
        name: 'Direct Wholesale & B2B Factory Delivery',
        nameMm: 'စက်ရုံနှင့် လုပ်ငန်းများသို့ လက်ကားတိုက်ရိုက် ပို့ဆောင်ပေးခြင်း',
      },
    ],
  },
  international: {
    badge: 'International Export · ပြည်ပပို့ကုန်စျေးကွက်',
    title: 'Global & Regional Bamboo Export Markets',
    titleMm: 'နိုင်ငံတကာနှင့် ဒေသတွင်း ပြည်ပပို့ကုန် စျေးကွက်',
    description:
      'TB Star Company Limited exports 100% natural Myanmar Bamboo Split and Bamboo Sticks in standardized 30 kg export bags to international commodity buyers and manufacturing factories.',
    descriptionMm:
      'TB Star Company Limited သည် မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝ ဝါးခြမ်းပြား (Bamboo Split) နှင့် တစ်အိတ် 30 kg စံနှုန်းဖြင့် ထုပ်ပိုးထားသော ဝါးတံ (Bamboo Sticks) များကို နိုင်ငံတကာ ဝယ်ယူသူများနှင့် စက်ရုံများသို့ တင်ပို့ရောင်းချပေးလျက်ရှိပါသည်။',
    regions: [
      {
        name: '100% Natural Myanmar Bamboo Split (3 mm · 20"–48" · With/Without Nodes)',
        nameMm: '၁၀၀% သဘာဝ မြန်မာ့ဝါးခြမ်းပြား (အထူ 3 mm · ၂၀"–၄၈" · အဆစ်ပါ/အဆစ်မပါ)',
      },
      {
        name: 'Bamboo Sticks (1.2–2.5 mm · 8", 9", and 10" Lengths)',
        nameMm: 'သဘာဝဝါးတံ (အထူ 1.2–2.5 mm · အရှည် ၈"၊ ၉" နှင့် ၁၀")',
      },
      {
        name: 'Export Packaging: Standardized 30 kg per Bag & Commercial Bundles',
        nameMm: 'ပို့ကုန်ထုပ်ပိုးမှု - တစ်အိတ်လျှင် 30 kg စံနှုန်းနှင့် စနစ်တကျထုပ်ပိုးမှု',
      },
      {
        name: 'Direct Export Inquiry & Coordination via Central Tower, Yangon Office',
        nameMm: 'ရန်ကုန်မြို့ Central Tower ရုံးချုပ်မှတစ်ဆင့် ပြည်ပပို့ကုန် တိုက်ရိုက်ချိတ်ဆက်ဆောင်ရွက်ပေးခြင်း',
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
    id: 'qual-raw-material',
    index: '01',
    category: 'Raw Material Standard',
    categoryMm: 'ကုန်ကြမ်း အရည်အသွေးစံနှုန်း',
    title: '100% Mature Natural Myanmar Bamboo Selection',
    titleMm: 'ရင့်မှည့်သန်စွမ်းသော ၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ် ရွေးချယ်မှု',
    description:
      'Only mature, high-density Myanmar bamboo culms with strong longitudinal fibers are selected prior to mechanical splitting and sizing, ensuring superior tensile strength.',
    descriptionMm:
      'သဘာဝအမျှင်ဓာတ် သိပ်သည်းခိုင်ခံ့ပြီး ရင့်မှည့်သော မြန်မာ့သဘာဝဝါးပင်များကိုသာ စနစ်တကျ ရွေးချယ်အသုံးပြုသဖြင့် ကွေးညွှတ်ခံနိုင်ရည်နှင့် တာရှည်ခံမှု မြင့်မားပါသည်။',
    standardSpec: '100% Natural Bamboo · Zero Synthetic Additives',
    standardSpecMm: '၁၀၀% သဘာဝဝါးစစ်စစ် · ဓာတုဆေးဝါး ကင်းစင်',
  },
  {
    id: 'qual-dimensional',
    index: '02',
    category: 'Dimensional Tolerance',
    categoryMm: 'အတိုင်းအတာ တိကျမှုစံနှုန်း',
    title: 'Precision Thickness, Length & Node Grading',
    titleMm: 'အထူ၊ အရှည်နှင့် အဆစ်ပါ/အဆစ်မပါ တိကျစွာ အဆင့်ခွဲခြားခြင်း',
    description:
      'Every batch is calibrated to strict dimensional specifications: 3 mm uniform thickness for Bamboo Split (20"–48", With/Without Nodes) and 1.2–2.5 mm gauge for Bamboo Sticks (8", 9", 10").',
    descriptionMm:
      'ဝါးခြမ်းပြားများကို အထူ 3 mm (အရှည် ၂၀"–၄၈"၊ အဆစ်ပါ/အဆစ်မပါ) နှင့် ဝါးတံများကို အထူ 1.2–2.5 mm (အရှည် ၈"၊ ၉"၊ ၁၀") စံချိန်စံညွှန်းအတိုင်း တစ်ပြေးညီ တိကျစွာ စစ်ဆေးထုတ်လုပ်ပါသည်။',
    standardSpec: '3 mm Split · 1.2–2.5 mm Sticks · Calibrated Sizing',
    standardSpecMm: '3 mm ဝါးခြမ်း · 1.2–2.5 mm ဝါးတံ · စံချိန်မီအရွယ်အစား',
  },
  {
    id: 'qual-moisture-pack',
    index: '03',
    category: 'Drying & Export Packaging',
    categoryMm: 'အခြောက်ခံခြင်းနှင့် ပို့ကုန်ထုပ်ပိုးမှုစံနှုန်း',
    title: 'Moisture Control & Standardized 30KG Export Bagging',
    titleMm: 'အစိုဓာတ်ထိန်းညှိ အခြောက်ခံခြင်းနှင့် 30KG စံချိန်မီ ထုပ်ပိုးမှု',
    description:
      'Properly seasoned and dried to prevent mold during transit, then packed into breathable, durable 30 kg export bags for safe sea freight and warehouse storage.',
    descriptionMm:
      'သယ်ယူပို့ဆောင်စဉ် မှိုတက်ခြင်းကင်းဝေးစေရန် စနစ်တကျ အခြောက်ခံထားပြီး တစ်အိတ်လျှင် ၃၀ ကီလိုဂရမ် (30 kg) စံနှုန်းဖြင့် ခိုင်ခံ့သပ်ရပ်စွာ ထုပ်ပိုးပေးပါသည်။',
    standardSpec: 'Seasoned Dry Bamboo · 30 kg per Bag Standard',
    standardSpecMm: 'စနစ်တကျ အခြောက်ခံပြီး · တစ်အိတ် 30 kg စံနှုန်း',
  },
  {
    id: 'qual-print-qc',
    index: '04',
    category: 'Offset Printing Quality',
    categoryMm: 'ပုံနှိပ်အရည်အသွေး စံနှုန်း',
    title: 'Sharp Offset Typography, Color Accuracy & Durable Binding',
    titleMm: 'ကြည်လင်ပြတ်သားသော အော့ဖ်ဆက်ပုံနှိပ်နှင့် ခိုင်ခံ့သော စာအုပ်ချုပ်လုပ်မှု',
    description:
      'Our printing division verifies prepress plates, ink density, serial numbering accuracy on voucher pads, and sturdy spine binding for multi-page books.',
    descriptionMm:
      'ပုံနှိပ်လုပ်ငန်းတိုင်းတွင် စာလုံးကြည်လင်ပြတ်သားမှု၊ အရောင်မှန်ကန်မှု၊ ဘောင်ချာနံပါတ်စဉ် တိကျမှုနှင့် စာအုပ်ချုပ်လုပ်မှု ခိုင်ခံ့သပ်ရပ်ရေးတို့ကို အဆင့်ဆင့် စစ်ဆေးဆောင်ရွက်ပါသည်။',
    standardSpec: 'Prepress Check · Serial Numbering · Durable Binding',
    standardSpecMm: 'Prepress စစ်ဆေးမှု · နံပါတ်စဉ်တိကျမှု · ခိုင်ခံ့သောချုပ်ရိုး',
  },
];

export interface BusinessPartnerCategory {
  id: string;
  index: string;
  title: string;
  titleMm: string;
  partnerType: string;
  partnerTypeMm: string;
  description: string;
  descriptionMm: string;
  collaborationPoints: string[];
  collaborationPointsMm: string[];
  inquiryType: InquiryTypeOption;
}

export const BUSINESS_PARTNERS_COLLABORATION: BusinessPartnerCategory[] = [
  {
    id: 'partner-export',
    index: '01',
    title: 'International Importers & Commodity Trading Houses',
    titleMm: 'နိုင်ငံတကာ သွင်းကုန်လုပ်ငန်းရှင်များနှင့် ကုန်သွယ်ရေးမိတ်ဖက်များ',
    partnerType: 'Global Bamboo Export Partners',
    partnerTypeMm: 'ပြည်ပပို့ကုန် မိတ်ဖက်များ',
    description:
      'We collaborate with overseas importers, incense manufacturers, and agricultural supply distributors seeking recurring container shipments of Myanmar Bamboo Split and Bamboo Sticks.',
    descriptionMm:
      'မြန်မာ့သဘာဝ ဝါးခြမ်းပြားနှင့် ဝါးတံများကို ပုံမှန်ဝယ်ယူတင်သွင်းလိုသော နိုင်ငံတကာ ကုန်သွယ်ရေးကုမ္ပဏီများ၊ စက်ရုံများနှင့် ရေရှည်လက်တွဲ ဆောင်ရွက်လျက်ရှိပါသည်။',
    collaborationPoints: [
      'Consistent 30 kg bag packaging & custom length/node selection',
      'Direct coordination with our Yangon headquarters for export orders',
    ],
    collaborationPointsMm: [
      'တစ်အိတ် 30 kg စံနှုန်း ထုပ်ပိုးမှုနှင့် လိုအပ်သော အရွယ်အစားအလိုက် ထုတ်လုပ်ပေးခြင်း',
      'ရန်ကုန်ရုံးချုပ်နှင့် တိုက်ရိုက်ချိတ်ဆက်၍ ပို့ကုန်အော်ဒါများ စနစ်တကျ ဆောင်ရွက်ခြင်း',
    ],
    inquiryType: 'Bamboo Sticks',
  },
  {
    id: 'partner-domestic',
    index: '02',
    title: 'Domestic Wholesale Distributors & Industrial Buyers',
    titleMm: 'ပြည်တွင်း လက်ကားဖြန့်ချိရေးနှင့် စက်မှု/စိုက်ပျိုးရေး မိတ်ဖက်များ',
    partnerType: 'Myanmar Distribution Partners',
    partnerTypeMm: 'ပြည်တွင်းဖြန့်ဖြူးရေး မိတ်ဖက်များ',
    description:
      'Partnering with regional wholesalers, agricultural plantations, and craft manufacturers across Yangon, Mandalay, and throughout Myanmar.',
    descriptionMm:
      'ရန်ကုန်၊ မန္တလေးနှင့် မြန်မာနိုင်ငံတစ်ဝန်းရှိ လက်ကားဒိုင်များ၊ စိုက်ပျိုးရေးခြံများနှင့် လက်မှုကုန်ထုတ်လုပ်ငန်းရှင်များထံ ပုံမှန်ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။',
    collaborationPoints: [
      'Reliable domestic supply of 3 mm Bamboo Split (20"–48") and Bamboo Sticks',
      'Flexible wholesale order quantities for local businesses',
    ],
    collaborationPointsMm: [
      'အထူ 3 mm ဝါးခြမ်းပြား (၂၀"–၄၈") နှင့် ဝါးတံများကို ပြည်တွင်း၌ စဉ်ဆက်မပြတ် ဖြန့်ဖြူးပေးခြင်း',
      'ပြည်တွင်းလုပ်ငန်းရှင်များအတွက် လက်ကားပမာဏအလိုက် အဆင်ပြေစွာ မှာယူနိုင်ခြင်း',
    ],
    inquiryType: 'Bamboo Split',
  },
  {
    id: 'partner-print',
    index: '03',
    title: 'Publishers, Educational Institutions & Corporate Print Clients',
    titleMm: 'စာပေထုတ်ဝေသူများ၊ ပညာရေးအဖွဲ့အစည်းများနှင့် ကော်ပိုရိတ်မိတ်ဖက်များ',
    partnerType: 'One-Stop Offset Printing Partners',
    partnerTypeMm: 'ပုံနှိပ်လုပ်ငန်း မိတ်ဖက်များ',
    description:
      'Serving as the dedicated offset printing partner for publishing houses, retail networks, SMEs, and corporate offices requiring books, voucher books, and business forms.',
    descriptionMm:
      'စာအုပ်ထုတ်ဝေရေးလုပ်ငန်းများ၊ အရောင်းဆိုင်ခွဲများနှင့် ကုမ္ပဏီများအတွက် စာအုပ်များနှင့် ဘောင်ချာစာအုပ်များကို လစဉ်/နှစ်စဉ် ပုံမှန်ပုံနှိပ်ပေးသည့် မိတ်ဖက်အဖြစ် ဆောင်ရွက်ပါသည်။',
    collaborationPoints: [
      'Recurring printing of commercial voucher books, receipt pads, and bound books',
      'End-to-end prepress, press run, numbering, and finishing under one roof',
    ],
    collaborationPointsMm: [
      'စာအုပ်များနှင့် လုပ်ငန်းသုံး ဘောင်ချာစာအုပ်များကို ပုံမှန်လက်တွဲ ပုံနှိပ်ပေးခြင်း',
      'ဒီဇိုင်းစစ်ဆေးခြင်းမှ စာအုပ်ချုပ်လုပ်ပြီးစီးသည်အထိ တစ်နေရာတည်း တာဝန်ယူပေးခြင်း',
    ],
    inquiryType: 'Books Printing',
  },
];


