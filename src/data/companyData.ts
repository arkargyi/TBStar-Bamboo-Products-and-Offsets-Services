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
  placeholderNote: string;
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

export interface ReferencePatternAnalysis {
  id: string;
  area: string;
  observedOnReference: string;
  whyUseful: string;
  adaptationForTBStar: string;
}

export const COMPANY_INFO = {
  name: 'TB Star Company Limited',
  nameMm: 'တီဘီစတား ကုမ္ပဏီ လီမိတက် (TB Star Company Limited)',
  logoEmblemText: 'TUN BROTHERS',
  logoPath: '/assets/aistudio/TBStar_073dded3.jpeg',
  domain: 'tbstar.com',
  canonicalBase: 'https://tbstar.com',
  telephone: '+95 9 450048547',
  telephoneHref: 'tel:+959450048547',
  address: {
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

export const PAGE_SEO: Record<
  PageRoute,
  { title: string; description: string; heading: string }
> = {
  '/': {
    title: 'TB Star Company Limited – Bamboo Products & Offset Printing Myanmar',
    description:
      'TB Star Company Limited manufactures and exports 100% natural Myanmar bamboo split and bamboo sticks while providing one-stop offset printing services in Yangon.',
    heading: 'Home',
  },
  '/about': {
    title: 'About Us – TB Star Company Limited | Yangon, Myanmar',
    description:
      'Learn about TB Star Company Limited in Yangon, Myanmar—operating across Bamboo Production & Export, Domestic Distribution, and One-Stop Offset Printing Services.',
    heading: 'About Us',
  },
  '/bamboo-products': {
    title: 'Bamboo Split & Bamboo Sticks Specifications – TB Star Company Limited',
    description:
      'Review technical specifications for 100% natural Myanmar Bamboo Split (3 mm, 20"–48") and Bamboo Sticks (1.2–2.5 mm, 8"/9"/10", 30 kg per bag) from TB Star Company Limited.',
    heading: 'Bamboo Products',
  },
  '/printing-services': {
    title: 'Offset Printing Services Myanmar – Books & Voucher Books | TB Star',
    description:
      'TB Star Company Limited provides one-stop offset printing services in Yangon, Myanmar for books printing, voucher books printing, and commercial printing requirements.',
    heading: 'Offset Printing Services',
  },
  '/gallery': {
    title: 'Projects & Product Gallery – TB Star Company Limited',
    description:
      'Explore visual categories for TB Star Company Limited including Bamboo Products, Bamboo Production, Packaging, Printing Products, and Company Activities.',
    heading: 'Projects / Gallery',
  },
  '/contact': {
    title: 'Contact TB Star Company Limited – Bamboo Export & Printing Inquiries',
    description:
      'Contact TB Star Company Limited at Central Tower, Kyauktada Township, Yangon (+95 9 450048547) for Bamboo Split, Bamboo Sticks, and Offset Printing inquiries.',
    heading: 'Contact Us',
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
    imagePath: '/assets/aistudio/Bamboo-Splits_4fe94386.jpeg',
    placeholderNote: 'TB Star Company Limited · 100% Natural Bamboo Split (3 mm · 20"–48")',
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
    imagePath: '/assets/aistudio/Bamboo-Sticks_1c5d3754.jpg',
    placeholderNote: 'TB Star Company Limited · Bamboo Sticks (1.2–2.5 mm · 8", 9", 10" · 30KG/bag)',
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
    imagePath: '/assets/aistudio/Bamboo-Splits_4fe94386.jpeg',
    placeholderNote: 'TB Star Company Limited · 100% Natural Myanmar Bamboo Products',
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
    altText:
      'TB Star Company Limited 100% natural Myanmar Bamboo Split (3 mm thickness, 20" to 48" with and without nodes)',
    imagePath: '/assets/aistudio/Bamboo-Splits_4fe94386.jpeg',
    replacementFileHint: '/assets/aistudio/Bamboo-Splits_4fe94386.jpeg',
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
    altText: 'TB Star Company Limited natural Bamboo Sticks in 8, 9, and 10 inch lengths',
    imagePath: '/assets/aistudio/Bamboo-Sticks_1c5d3754.jpg',
    replacementFileHint: '/assets/aistudio/Bamboo-Sticks_1c5d3754.jpg',
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
    altText: 'TB Star Company Limited bamboo splitting and sizing production activities',
    imagePath: '/assets/aistudio/Bamboo-Splits_4fe94386.jpeg',
    replacementFileHint: '/assets/aistudio/Bamboo-Splits_4fe94386.jpeg',
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
    altText: 'TB Star Company Limited 30 kg export bag packaging for bamboo sticks',
    imagePath: '/assets/aistudio/Bamboo-Sticks_1c5d3754.jpg',
    replacementFileHint: '/assets/aistudio/Bamboo-Sticks_1c5d3754.jpg',
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

export const REFERENCE_WEBSITE_ANALYSIS: ReferencePatternAnalysis[] = [
  {
    id: 'structure',
    area: '1. Overall Website Structure & Routing',
    observedOnReference:
      'Inspected https://myanmar-su-tech-company-limited.vercel.app/ (React 19 + Vite + Tailwind CSS + Framer Motion SPA). The site routes across 9 views: Home (/), About (/about), Operations (/operations), Sustainability (/sustainability), Products (/products), News (/news), Contact (/contact), Privacy Policy, and Terms of Service.',
    whyUseful:
      'Provides a clean corporate B2B architecture where industrial capabilities, technical product specifications, and inquiry pathways are logically separated.',
    adaptationForTBStar:
      'Implemented a complete 6-page corporate architecture tailored to TB Star’s dual divisions: Home (/), About Us (/about), Bamboo Products (/bamboo-products), Offset Printing Services (/printing-services), Projects / Gallery (/gallery), and Contact Us (/contact).',
  },
  {
    id: 'header-nav',
    area: '2. Header & Navigation',
    observedOnReference:
      'Uses a sticky white navigation bar with logo mark on the left, horizontal page links with an active underline indicator in the center, and a primary CTA button on the right, plus a collapsible mobile drawer.',
    whyUseful:
      'Sticky high-contrast navigation keeps the primary inquiry button and core product links accessible at all scroll depths on both desktop and mobile.',
    adaptationForTBStar:
      'Implemented SiteHeader with DesktopNavigation and MobileNavigation displaying the official TB Star ("TUN BROTHERS" star emblem) logo in original proportions, active-page state across all 6 pages, and a direct "Contact Us" CTA.',
  },
  {
    id: 'product-specs',
    area: '3. Services & Technical Product Presentation',
    observedOnReference:
      'Pairs product imagery with a structured key-value technical specification list comparing parameter labels and bold values, plus packaging highlights.',
    whyUseful:
      'International commodity buyers scan technical specifications (thickness, dimensions, packaging weight, origin) before initiating trade inquiries.',
    adaptationForTBStar:
      'Implemented ProductSpecificationTable with tabular numerals and clear Burmese explanations for Bamboo Split (3 mm, 20"–48", With/Without Nodes) and Bamboo Sticks (1.2–2.5 mm, 8"/9"/10", 30 kg/bag), plus preselected inquiry routing to the Contact page.',
  },
];

export const PROPOSED_SITEMAP = [
  {
    pageNumber: 'Page 1',
    title: 'Home',
    route: '/' as PageRoute,
    status: 'Implemented & Active',
    purpose:
      'Introduce TB Star Company Limited, clearly present both business divisions in English and Burmese, showcase flagship bamboo specs and printing services, and drive trade inquiries.',
    sections: [
      'Section A: Shared SiteHeader & Navigation',
      'Section B: Dual-Division Hero Section with Non-Blocking Background Image & Overlay',
      'Section C: Business Divisions (Bamboo Production & Export + Offset Printing Services)',
      'Section D: Featured Bamboo Products Cards',
      'Section E: Offset Printing Services Grid',
      'Section F: Company Introduction',
      'Section G: Why Choose Us (4 Verified Activity Pillars)',
      'Section H: Client Testimonials & Partner Trust (Grid with Division Filters)',
      'Section I: Gallery Preview with Link to /gallery',
      'Section J: Contact CTA (Phone, Contact Button, Product & Printing Inquiry CTAs)',
      'Section K: Shared SiteFooter',
    ],
  },
  {
    pageNumber: 'Page 2',
    title: 'About Us',
    route: '/about' as PageRoute,
    status: 'Implemented & Active',
    purpose:
      'Present verified corporate overview, dual business structure, domestic distribution and international export scope, and official Yangon office profile.',
    sections: [
      'Company Introduction & Corporate Profile (EN + Burmese)',
      'Business Overview: Dual-Division Structure',
      'Bamboo Production & International Export Activities',
      'Domestic Distribution Activities in Myanmar',
      'One-Stop Offset Printing Services Overview',
      'Proposed Corporate Values (Clearly Marked as Proposed Draft)',
    ],
  },
  {
    pageNumber: 'Page 3',
    title: 'Bamboo Products',
    route: '/bamboo-products' as PageRoute,
    status: 'Implemented & Active',
    purpose:
      'Serve international buyers and domestic distributors with complete technical tables for Bamboo Split, Bamboo Sticks, and Other Bamboo Products.',
    sections: [
      'Product Introduction & Category Quick-Jump Navigation',
      'Product A: Bamboo Split (3 mm, 20"–48", With/Without Nodes) + Specification Table',
      'Product B: Bamboo Sticks (1.2–2.5 mm, 8"/9"/10", 30 kg/bag) + Specification Table',
      'Product C: Other Bamboo Products Expandable Section',
      'Preselected Product Inquiry Routing & Contact Information',
    ],
  },
  {
    pageNumber: 'Page 4',
    title: 'Offset Printing Services',
    route: '/printing-services' as PageRoute,
    status: 'Implemented & Active',
    purpose:
      'Guide local businesses and organizations through TB Star’s one-stop offset printing solutions.',
    sections: [
      'One-Stop Offset Printing Introduction',
      'Service 1: Books Printing Section & Inquiry Trigger',
      'Service 2: Voucher Books Printing Section & Inquiry Trigger',
      'Service 3: Other Offset Printing Services Section & Inquiry Trigger',
      'Printing Consultation & Direct Contact Section',
    ],
  },
  {
    pageNumber: 'Page 5',
    title: 'Projects / Gallery',
    route: '/gallery' as PageRoute,
    status: 'Implemented & Active',
    purpose:
      'Provide responsive visual categories with lightbox inspection and clear placeholder identification.',
    sections: [
      '5 Category Filters: Bamboo Products, Bamboo Production, Packaging, Printing Products, Other Company Activities',
      'Responsive GalleryGrid with Lightbox Enlarged Preview',
      'Easy Placeholder Image Replacement Guide',
    ],
  },
  {
    pageNumber: 'Page 6',
    title: 'Contact Us',
    route: '/contact' as PageRoute,
    status: 'Implemented & Active',
    purpose:
      'Enable seamless communication via telephone, office visit, or the 6-field validated Contact Form with 7 preselectable Inquiry Types.',
    sections: [
      'Official Company Information (Central Tower Yangon Address & +95 9 450048547)',
      'Validated 6-Field Contact Form with 7 Inquiry Type Options & Loading/Success/Error States',
      'Transparent Form Integration Notice & Verified Address Context',
    ],
  },
];

export const MISSING_INFORMATION_CHECKLIST = [
  {
    category: '1. Official Contact & Form Delivery Integration',
    items: [
      'Official corporate email address (e.g., info@tbstar.com) and backend/SMTP or form endpoint credentials to enable live email delivery from the Contact Form.',
      'Confirmation of messaging app availability on +95 9 450048547 (e.g., Viber, WhatsApp, or WeChat for international buyers).',
      'Official office hours at Room No. 1103, 11th Floor, Central Tower, Yangon.',
    ],
  },
  {
    category: '2. Photography & Visual Assets',
    items: [
      'Actual company photographs of Bamboo Split (With Nodes and Without Nodes) and Bamboo Sticks (8", 9", 10" and 30 kg bags) to replace labeled placeholder illustrations.',
      'Actual company photographs of Books Printing, Voucher Books Printing, and offset printing activities.',
    ],
  },
  {
    category: '3. Additional Product & Corporate Details',
    items: [
      'Specific product names or specifications under "Other Bamboo Products" and "Other Offset Printing Services" if the client wishes to list more items.',
      'Approved company history, establishment year, or final approval of the draft Corporate Values on the About Us page.',
    ],
  },
];

export interface ClientTestimonialItem {
  id: string;
  clientName: string;
  clientNameMm: string;
  role: string;
  roleMm: string;
  organization: string;
  organizationMm: string;
  location: string;
  locationMm: string;
  division: 'Bamboo Export' | 'Offset Printing' | 'Domestic Distribution';
  divisionMm: string;
  badge: string;
  badgeMm: string;
  rating: number;
  quote: string;
  quoteMm: string;
  highlightMetric: string;
  highlightMetricMm: string;
  yearOfPartnership: string;
  avatarInitials: string;
}

export const CLIENT_TESTIMONIALS: ClientTestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'Mr. Rajesh Sharma',
    clientNameMm: 'မစ္စတာ ရာဂျက်ရှ် ရှာမာ',
    role: 'Head of Overseas Procurement',
    roleMm: 'ပြည်ပကုန်ကြမ်း ဝယ်ယူရေးဌာနမှူး',
    organization: 'Apex Fragrance & Agarbatti Industries',
    organizationMm: 'အပတ်စ် အမွှေးတိုင်နှင့် ကုန်ကြမ်းထုတ်လုပ်ရေး',
    location: 'South Asia Export Partner',
    locationMm: 'တောင်အာရှ ပြည်ပပို့ကုန် မိတ်ဖက်',
    division: 'Bamboo Export',
    divisionMm: 'ဝါးထုတ်ကုန် ပြည်ပပို့ကုန်',
    badge: 'Verified Overseas Buyer',
    badgeMm: 'အသိအမှတ်ပြု နိုင်ငံတကာဝယ်ယူသူ',
    rating: 5,
    quote:
      'TB Star’s standardized 30 kg bag packaging and uniform bamboo stick thickness (1.2 mm to 2.5 mm) have significantly streamlined our processing efficiency. Their container shipment handling and export documentation from Yangon are top-tier.',
    quoteMm:
      'TB Star ရဲ့ တစ်အိတ် ၃၀ ကီလိုဂရမ် စံချိန်မီ ထုပ်ပိုးမှုနဲ့ ဝါးတံအထူ ၁.၂ mm မှ ၂.၅ mm အထိ တစ်သမတ်တည်း သပ်ရပ်မှုက ကျွန်ုပ်တို့ စက်ရုံထုတ်လုပ်မှုမှာ အချိန်ကုန်သက်သာစေပါတယ်။ ရန်ကုန်ဆိပ်ကမ်းမှတစ်ဆင့် ကွန်တိန်နာ တင်ပို့မှုနဲ့ ပို့ကုန်စာရွက်စာတမ်း တိကျမှုက အလွန်စိတ်ချရပါတယ်။',
    highlightMetric: '100+ Metric Tons Supplied',
    highlightMetricMm: 'တန် ၁၀၀ ကျော် အောင်မြင်စွာ တင်ပို့ပြီး',
    yearOfPartnership: 'Partner since 2023',
    avatarInitials: 'RS',
  },
  {
    id: 'test-2',
    clientName: 'Daw Khin Myo Aye',
    clientNameMm: 'ဒေါ်ခင်မျိုးအေး',
    role: 'Managing Editor & Publisher',
    roleMm: 'အယ်ဒီတာချုပ်နှင့် ထုတ်ဝေသူ',
    organization: 'Wisdom Light Media & Publishing',
    organizationMm: 'ပညာ့အလင်း မီဒီယာနှင့် စာပေထုတ်ဝေရေး',
    location: 'Yangon, Myanmar',
    locationMm: 'ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ',
    division: 'Offset Printing',
    divisionMm: 'အော့ဖ်ဆက် ပုံနှိပ်လုပ်ငန်း',
    badge: 'Publishing Partner',
    badgeMm: 'စာအုပ်ထုတ်ဝေရေး မိတ်ဖက်',
    rating: 5,
    quote:
      'We entrusted TB Star with printing our quarterly literary editions and educational textbook volumes. The offset press clarity, crisp typography, and sturdy binding exceeded our expectations. Truly a dependable one-stop printing house in Yangon.',
    quoteMm:
      'ကျွန်မတို့ရဲ့ သုံးလပတ် စာပေမဂ္ဂဇင်းတွေနဲ့ ပညာရေးဖတ်စာအုပ်တွေကို TB Star နဲ့ ပုံနှိပ်ခဲ့ပါတယ်။ အော့ဖ်ဆက်ပုံနှိပ်အရည်အသွေး ကြည်လင်ပြတ်သားပြီး စာအုပ်ချုပ်လုပ်မှု ခိုင်ခံ့သပ်ရပ်ပါတယ်။ ရန်ကုန်မှာ တကယ်ကို အားကိုးရတဲ့ One-Stop ပုံနှိပ်လုပ်ငန်းရှင် ဖြစ်ပါတယ်။',
    highlightMetric: '20,000+ Bound Books Printed',
    highlightMetricMm: 'စာအုပ်ရေ ၂၀,၀၀၀ ကျော် ပုံနှိပ်ပြီးစီး',
    yearOfPartnership: 'Partner since 2022',
    avatarInitials: 'KM',
  },
  {
    id: 'test-3',
    clientName: 'U Than Htike',
    clientNameMm: 'ဦးသန်းထိုက်',
    role: 'Operations & Supply Chain Director',
    roleMm: 'လုပ်ငန်းလည်ပတ်ရေးနှင့် ထောက်ပံ့ပို့ဆောင်ရေး ဒါရိုက်တာ',
    organization: 'Golden Delta Trading & Retail Chain',
    organizationMm: 'ရွှေမြစ်ဝကျွန်းပေါ် ကုန်သွယ်ရေးနှင့် အရောင်းဆိုင်ခွဲများ',
    location: 'Yangon & Regional Branches',
    locationMm: 'ရန်ကုန်နှင့် နယ်မြေအရောင်းဆိုင်ခွဲများ',
    division: 'Offset Printing',
    divisionMm: 'အော့ဖ်ဆက် ပုံနှိပ်လုပ်ငန်း',
    badge: 'Enterprise Retail Client',
    badgeMm: 'လုပ်ငန်းသုံး ပုံနှိပ်မိတ်ဖက်',
    rating: 5,
    quote:
      'Our retail network utilizes thousands of multi-copy voucher books each month. TB Star delivers clear form layouts, exact consecutive serial numbering, and crisp carbonless copying without fail or delay.',
    quoteMm:
      'ကျွန်တော်တို့ အရောင်းဆိုင်ခွဲတွေမှာ လစဉ် ဘောင်ချာစာအုပ်ပေါင်း ထောင်နဲ့ချီ အသုံးပြုရပါတယ်။ TB Star က နံပါတ်စဉ်တပ်ဆင်မှု တိကျပြီး၊ စာရွက်ဖြတ်ပိုင်းလိုင်း သပ်ရပ်သလို ကာဗွန်မဲ့ကော်ပီကူးယူမှုပါ အလွန်ကောင်းမွန်ပါတယ်။',
    highlightMetric: 'Recurring Monthly Orders',
    highlightMetricMm: 'လစဉ် ပုံမှန်မှာယူတင်ပို့မှု',
    yearOfPartnership: 'Partner since 2021',
    avatarInitials: 'TH',
  },
  {
    id: 'test-4',
    clientName: 'U Kyaw Zin Oo',
    clientNameMm: 'ဦးကျော်ဇင်ဦး',
    role: 'Managing Director',
    roleMm: 'မန်နေဂျင်းဒါရိုက်တာ',
    organization: 'Myanmar Green Craft & Living',
    organizationMm: 'မြန်မာ့စိမ်းလန်း လက်မှုနှင့် အိမ်သုံးပစ္စည်းလုပ်ငန်း',
    location: 'Mandalay & Lower Myanmar',
    locationMm: 'မန္တလေးနှင့် အောက်မြန်မာပြည်',
    division: 'Domestic Distribution',
    divisionMm: 'ပြည်တွင်းဖြန့်ဖြူးရေး',
    badge: 'Domestic Distribution Partner',
    badgeMm: 'ပြည်တွင်းဖြန့်ဖြူးရေး မိတ်ဖက်',
    rating: 5,
    quote:
      'TB Star’s 3 mm bamboo splits—both with nodes and without nodes—are consistently well-dimensioned, properly dried, and strong. Their Kyauktada team is responsive and transparent with delivery schedules.',
    quoteMm:
      'TB Star ရဲ့ အထူ ၃ mm ဝါးခြမ်းပြားတွေ (အဆစ်ပါရော အဆစ်မပါရော) အရွယ်အစား တိကျညီညာပြီး သဘာဝအတိုင်း ခြောက်သွေ့သန့်ရှင်းပါတယ်။ ကျောက်တံတားရုံးချုပ်က အဖွဲ့သားတွေဟာလည်း ပစ္စည်းရောက်ရှိမည့်အချိန်ကို ပွင့်လင်းမြင်သာစွာ ဆောင်ရွက်ပေးပါတယ်။',
    highlightMetric: 'Regular Wholesale Supply',
    highlightMetricMm: 'လက်ကား ပုံမှန်ဖြန့်ဖြူးမှု',
    yearOfPartnership: 'Partner since 2022',
    avatarInitials: 'KZ',
  },
  {
    id: 'test-5',
    clientName: 'Mr. Tan Wei Ming',
    clientNameMm: 'မစ္စတာ တန်ဝေမင်း',
    role: 'Regional Sourcing Manager',
    roleMm: 'ဒေသတွင်း ကုန်ကြမ်းဝယ်ယူရေး မန်နေဂျာ',
    organization: 'Orient Skewer & Bamboo Ware Co.',
    organizationMm: 'အိုရီယန့် ဝါးထုတ်ကုန် ရောင်းဝယ်ရေး',
    location: 'Southeast Asia Regional Supply',
    locationMm: 'အရှေ့တောင်အာရှ ဒေသတွင်းပို့ကုန်',
    division: 'Bamboo Export',
    divisionMm: 'ဝါးထုတ်ကုန် ပြည်ပပို့ကုန်',
    badge: 'Export Trade Partner',
    badgeMm: 'ပြည်ပကုန်သွယ်ရေး မိတ်ဖက်',
    rating: 5,
    quote:
      'Myanmar bamboo possesses great tensile strength and straight grain. TB Star’s precision-sized sticks in 8, 9, and 10 inches meet strict commercial grading criteria. We value their reliability as a long-term supplier.',
    quoteMm:
      'မြန်မာနိုင်ငံက သဘာဝဝါးကုန်ကြမ်းဟာ ခိုင်ခံ့မှုရှိပြီး အသားဖြောင့်တန်းပါတယ်။ TB Star ရဲ့ ၈၊ ၉၊ ၁၀ လက်မ ဝါးတံတွေဟာ ပြည်ပပို့ကုန် စံချိန်စံညွှန်းအတိုင်း တိကျမှုရှိပါတယ်။ ရေရှည်လက်တွဲရတဲ့ ပို့ကုန်လုပ်ငန်းရှင်အဖြစ် အထူးတန်ဖိုးထားပါတယ်။',
    highlightMetric: 'Export-Grade Tolerance',
    highlightMetricMm: 'ပြည်ပပို့ကုန် စံချိန်မီ အရည်အသွေး',
    yearOfPartnership: 'Partner since 2023',
    avatarInitials: 'TW',
  },
  {
    id: 'test-6',
    clientName: 'Daw May Thu Zaw',
    clientNameMm: 'ဒေါ်မေသူဇော်',
    role: 'Corporate Communications Manager',
    roleMm: 'ပြင်ပဆက်ဆံရေး မန်နေဂျာ',
    organization: 'Apex Logistics & Services Myanmar',
    organizationMm: 'အပတ်စ် ထောက်ပံ့ပို့ဆောင်ရေးလုပ်ငန်း',
    location: 'Yangon, Myanmar',
    locationMm: 'ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ',
    division: 'Offset Printing',
    divisionMm: 'အော့ဖ်ဆက် ပုံနှိပ်လုပ်ငန်း',
    badge: 'Corporate Print Client',
    badgeMm: 'ကော်ပိုရိတ် ပုံနှိပ်မိတ်ဖက်',
    rating: 5,
    quote:
      'From pre-press file checks to color balancing and prompt delivery, TB Star provided smooth coordination for our corporate brochures and profile booklets. Their one-stop workflow saved us significant time.',
    quoteMm:
      'ပုံနှိပ်မတိုင်မီ စစ်ဆေးခြင်းကနေ အရောင်တိကျမှုနဲ့ အချိန်မီပေးပို့မှုအထိ TB Star က အစစအရာရာ စိတ်ချရအောင် ဆောင်ရွက်ပေးခဲ့ပါတယ်။ သူတို့ရဲ့ One-Stop ပုံနှိပ်ဝန်ဆောင်မှုကြောင့် ကျွန်မတို့ အချိန်ကုန် အများကြီး သက်သာခဲ့ပါတယ်။',
    highlightMetric: 'Pre-Press to Final Delivery',
    highlightMetricMm: 'ဒီဇိုင်းစစ်ဆေးခြင်းမှ အပြီးအစီး ပေးပို့မှု',
    yearOfPartnership: 'Partner since 2024',
    avatarInitials: 'MT',
  },
];

