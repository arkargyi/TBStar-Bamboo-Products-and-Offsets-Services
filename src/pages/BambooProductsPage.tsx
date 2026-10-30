import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Phone } from 'lucide-react';
import {
  BAMBOO_PRODUCTS,
  COMPANY_INFO,
  filterProductsBySearchQuery,
  getProductByIdOrSlug,
  getPublishedProducts,
  InquiryTypeOption,
  PageRoute,
  ProductCategoryId,
} from '../constants/companyData';
import { VisualAssetFrame } from '../components/VisualAssetFrame';
import { Button, HeroSection, SectionHeading } from '../components/SharedUI';
import {
  ContactCTA,
  ProductCard,
  ProductSearchEmptyState,
  ProductSpecificationTable,
} from '../components/CatalogComponents';
import { SearchBar } from '../components/SearchBar';
import {
  BambooProductIcon,
  EcoAdvantageIcon,
  EcoAdvantageType,
} from '../components/PrintingIcons';
import { useLanguage } from '../context/LanguageContext';

interface BambooProductsPageProps {
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

interface WhyChooseBambooItem {
  id: string;
  index: string;
  icon: EcoAdvantageType;
  kicker: string;
  kickerMm: string;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  highlights: string[];
  highlightsMm: string[];
  metricLabel: string;
  metricLabelMm: string;
}

const WHY_CHOOSE_BAMBOO_ITEMS: WhyChooseBambooItem[] = [
  {
    id: 'why-durability',
    index: '01',
    icon: 'natural-strength',
    kicker: 'Durability & Structural Integrity',
    kickerMm: 'ခိုင်ခံ့မှုနှင့် သဘာဝအမျှင် ဖွဲ့စည်းပုံ',
    title: 'Long-Lasting Natural Durability',
    titleMm: 'ကြာရှည်ခံပြီး ခိုင်ခံ့မှုမြင့်မားသော သဘာဝဝါး',
    description:
      'Dense longitudinal bamboo fibers provide reliable structural strength and dimensional consistency across both 3 mm Bamboo Split and precision-sized 1.2 to 2.5 mm Bamboo Sticks.',
    descriptionMm:
      'သိပ်သည်းသော သဘာဝဝါးအမျှင် ဖွဲ့စည်းပုံကြောင့် အထူ 3 mm ဝါးခြမ်းပြားများနှင့် 1.2 မှ 2.5 mm ဝါးတံများသည် ခိုင်ခံ့မှုမြင့်မားပြီး အရွယ်အစား တိကျမှန်ကန်မှုရှိပါသည်။',
    highlights: [
      'Bamboo Split: 3 mm thickness, 20" to 48" lengths',
      'Available With Nodes for rigidity or Without Nodes for smooth flexibility',
      'Bamboo Sticks: 1.2 to 2.5 mm thickness in 8", 9", and 10" sizes',
    ],
    highlightsMm: [
      'ဝါးခြမ်းပြား - အထူ 3 mm၊ အရှည် ၂၀ လက်မ မှ ၄၈ လက်မ',
      'လုပ်ငန်းလိုအပ်ချက်အလိုက် အဆစ်ပါ (With Nodes) နှင့် အဆစ်မပါ (Without Nodes) ရွေးချယ်နိုင်မှု',
      'ဝါးတံ - အထူ 1.2 မှ 2.5 mm၊ အရွယ်အစား ၈ လက်မ၊ ၉ လက်မ၊ ၁၀ လက်မ',
    ],
    metricLabel: 'Dense Natural Fiber · With or Without Nodes',
    metricLabelMm: 'သဘာဝအမျှင်ဓာတ် ခိုင်ခံ့မှု · အဆစ်ပါ / အဆစ်မပါ',
  },
  {
    id: 'why-natural-sourcing',
    index: '02',
    icon: 'zero-chemical',
    kicker: '100% Natural Sourcing',
    kickerMm: '၁၀၀% သဘာဝ ကုန်ကြမ်းစစ်စစ် ရယူမှု',
    title: '100% Natural Myanmar Bamboo',
    titleMm: '၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ် ကုန်ကြမ်း',
    description:
      'Sourced directly from mature bamboo groves in Myanmar and mechanically split, sized, and seasoned without chemical resins, artificial binders, or chemical additives.',
    descriptionMm:
      'မြန်မာနိုင်ငံရှိ သဘာဝဝါးတောများမှ တိုက်ရိုက်ရယူပြီး ဓာတုဆေးဝါးနှင့် ကော်ရည်များ လုံးဝမပါဝင်ဘဲ စက်မှုနည်းပညာဖြင့် စနစ်တကျ စိတ်ဖြာထုတ်လုပ်ထားပါသည်။',
    highlights: [
      'Country of Origin: Myanmar (100% natural bamboo)',
      'Chemical-free mechanical splitting, sizing, and natural seasoning',
      'Supplied for domestic distribution in Myanmar and international export',
    ],
    highlightsMm: [
      'မူရင်းနိုင်ငံ - မြန်မာ (၁၀၀% သဘာဝဝါးစစ်စစ်)',
      'ဓာတုဆေးဝါး ကင်းစင်သော စက်မှုနည်းပညာဖြင့် စိတ်ဖြာထုတ်လုပ်မှု',
      'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန် ဈေးကွက်နှစ်ခုလုံးအတွက် ထုတ်လုပ်မှု',
    ],
    metricLabel: '100% Natural Bamboo · Origin: Myanmar',
    metricLabelMm: '၁၀၀% သဘာဝဝါးစစ်စစ် · မူရင်းနိုင်ငံ - မြန်မာ',
  },
  {
    id: 'why-eco-friendly',
    index: '03',
    icon: 'eco-cycle',
    kicker: 'Eco-Friendly Properties',
    kickerMm: 'သဘာဝပတ်ဝန်းကျင်နှင့် သဟဇာတဖြစ်သော ဂုဏ်သတ္တိများ',
    title: 'Eco-Friendly & Renewable Resource',
    titleMm: 'သဘာဝပတ်ဝန်းကျင်နှင့် သဟဇာတဖြစ်သော ပြန်လည်ပြည့်ဖြိုးမြဲ ကုန်ကြမ်း',
    description:
      'Myanmar bamboo regenerates naturally from its established root system without replanting, offering a renewable, plastic-free plant material with high culm utilization and minimal waste.',
    descriptionMm:
      'မြန်မာ့သဘာဝဝါးသည် ပြန်လည်စိုက်ပျိုးရန်မလိုဘဲ မူလအမြစ်စနစ်မှ သဘာဝအလျောက် ပြန်လည်ရှင်သန်ကြီးထွားနိုင်သဖြင့် သဘာဝပတ်ဝန်းကျင်ကို ထိန်းသိမ်းပေးသော ကုန်ကြမ်းဖြစ်ပါသည်။',
    highlights: [
      'Fast natural regeneration from existing root systems',
      '100% plant-based, plastic-free raw material for agriculture & industry',
      'High-yield culm utilization and breathable 30 kg export bagging',
    ],
    highlightsMm: [
      'မူလအမြစ်စနစ်မှ သဘာဝအလျောက် လျင်မြန်စွာ ပြန်လည်ရှင်သန်ကြီးထွားမှု',
      'စိုက်ပျိုးရေးနှင့် စက်မှုလုပ်ငန်းသုံး ပလတ်စတစ်ကင်းစင်သော သဘာဝကုန်ကြမ်း',
      'အလေအလွင့်နည်းပါးသော ထုတ်လုပ်မှုနှင့် တစ်အိတ် 30 kg စံချိန်မီ ထုပ်ပိုးမှု',
    ],
    metricLabel: 'Renewable Plant Fiber · Plastic-Free Supply',
    metricLabelMm: 'ပြန်လည်ပြည့်ဖြိုးမြဲ သဘာဝအမျှင် · ပလတ်စတစ်ကင်းစင်',
  },
];

interface EcoAdvantageItem {
  id: string;
  index: string;
  icon: EcoAdvantageType;
  kicker: string;
  kickerMm: string;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  metricLabel: string;
  metricLabelMm: string;
}

const ECO_ADVANTAGE_ITEMS: EcoAdvantageItem[] = [
  {
    id: 'eco-regeneration',
    index: '01',
    icon: 'rapid-regeneration',
    kicker: 'Rapidly Renewable Resource',
    kickerMm: 'ပြန်လည်ရှင်သန်ကြီးထွားမှု မြန်ဆန်ခြင်း',
    title: 'Fast Natural Regeneration Without Replanting',
    titleMm: 'ပြန်လည်စိုက်ပျိုးရန်မလိုဘဲ သဘာဝအလျောက် လျင်မြန်စွာ ရှင်သန်ခြင်း',
    description:
      'Unlike slow-growing hardwood timber that takes decades to mature, Myanmar bamboo regenerates naturally from its established root system, preserving soil stability and forest cover.',
    descriptionMm:
      'နှစ်ပေါင်းများစွာ စောင့်ဆိုင်းရသော သစ်မာပင်များနှင့်မတူဘဲ မြန်မာ့သဘာဝဝါးပင်များသည် မူလအမြစ်စနစ်မှ သဘာဝအလျောက် လျင်မြန်စွာ ပြန်လည်ရှင်သန်ကြီးထွားနိုင်သဖြင့် သစ်တောပြုန်းတီးမှုကို ကာကွယ်ပေးပါသည်။',
    metricLabel: 'Self-Renewing Root System · Zero Deforestation',
    metricLabelMm: 'သဘာဝအမြစ်စနစ်မှ ပြန်လည်ရှင်သန်နိုင်မှု',
  },
  {
    id: 'eco-pure',
    index: '02',
    icon: 'zero-chemical',
    kicker: '100% Natural Material',
    kickerMm: '၁၀၀% သဘာဝ ကုန်ကြမ်းစစ်စစ်',
    title: 'Chemical-Free Mechanical Splitting & Sizing',
    titleMm: 'ဓာတုဆေးဝါး ကင်းစင်သော သဘာဝဝါး စိတ်ဖြာထုတ်လုပ်မှု',
    description:
      'Our 3 mm Bamboo Split and 1.2–2.5 mm Bamboo Sticks are mechanically split, sized, and naturally seasoned from 100% raw Myanmar bamboo without chemical resins or additives.',
    descriptionMm:
      'ကျွန်ုပ်တို့၏ အထူ 3 mm ဝါးခြမ်းပြားများနှင့် 1.2–2.5 mm ဝါးတံများကို ဓာတုဆေးဝါးနှင့် ကော်ရည်များ လုံးဝမပါဝင်ဘဲ ၁၀၀% သဘာဝမြန်မာ့ဝါးစစ်စစ်မှ စက်မှုနည်းပညာဖြင့် စနစ်တကျ စိတ်ဖြာထုတ်လုပ်ထားပါသည်။',
    metricLabel: '100% Natural Bamboo · No Chemical Binders',
    metricLabelMm: '၁၀၀% သဘာဝဝါးစစ်စစ် · ဓာတုကင်းစင်',
  },
  {
    id: 'eco-cycle',
    index: '03',
    icon: 'eco-cycle',
    kicker: 'Circular & Earth-Safe',
    kickerMm: 'သဘာဝပတ်ဝန်းကျင်နှင့် သဟဇာတဖြစ်မှု',
    title: '100% Natural & Earth-Friendly Material',
    titleMm: 'သဘာဝပတ်ဝန်းကျင်နှင့် သဟဇာတဖြစ်သော ၁၀၀% သဘာဝထုတ်ကုန်',
    description:
      'Ideal for agricultural stakes, incense sticks, handicrafts, and industrial applications where buyers seek a 100% natural, plant-based material.',
    descriptionMm:
      'စိုက်ပျိုးရေး၊ အမွှေးတိုင်လုပ်ငန်း၊ လက်မှုလုပ်ငန်းနှင့် စက်မှုကုန်ထုတ်လုပ်ငန်းများတွင် ၁၀၀% သဘာဝအပင်ထွက် ကုန်ကြမ်းအဖြစ် စိတ်ချစွာ အသုံးပြုနိုင်ပါသည်။',
    metricLabel: '100% Natural Plant Fiber · Plastic-Free Supply',
    metricLabelMm: '၁၀၀% သဘာဝအပင်ထွက် ကုန်ကြမ်း · ပလတ်စတစ်ကင်းစင်',
  },
  {
    id: 'eco-strength',
    index: '04',
    icon: 'natural-strength',
    kicker: 'Structural Fiber Integrity',
    kickerMm: 'သဘာဝအမျှင်ဓာတ် ခိုင်ခံ့မှု',
    title: 'Natural Structural Strength & Flexibility',
    titleMm: 'သဘာဝအမျှင်ဓာတ် မြင့်မားပြီး ခိုင်ခံ့ပျော့ပျောင်းမှုရှိခြင်း',
    description:
      'Myanmar bamboo possesses dense longitudinal fibers that deliver dependable structural resilience—available both With Nodes for rigidity and Without Nodes for smooth flexibility.',
    descriptionMm:
      'မြန်မာ့သဘာဝဝါးသည် သိပ်သည်းသော အမျှင်ဖွဲ့စည်းပုံကြောင့် ခိုင်ခံ့မှုရှိပြီး လုပ်ငန်းလိုအပ်ချက်အလိုက် အဆစ်ပါ (With Nodes) နှင့် အဆစ်မပါ (Without Nodes) ရွေးချယ်နိုင်ပါသည်။',
    metricLabel: 'With Nodes & Without Nodes · 20" to 48"',
    metricLabelMm: 'အဆစ်ပါ / အဆစ်မပါ · အရှည် ၂၀" မှ ၄၈"',
  },
  {
    id: 'eco-low-waste',
    index: '05',
    icon: 'low-waste',
    kicker: 'Resource Efficiency',
    kickerMm: 'ကုန်ကြမ်းအပြည့်အဝ အသုံးချနိုင်မှု',
    title: 'High-Yield Culm Utilization & Low Waste',
    titleMm: 'စွန့်ပစ်ပစ္စည်း နည်းပါးပြီး ကုန်ကြမ်းအကျိုးရှိစွာ ထုတ်လုပ်ခြင်း',
    description:
      'By coordinating both wide Bamboo Split (20"–48") and precision Bamboo Sticks (8", 9", 10"), our production maximizes every harvested bamboo culm while minimizing off-cut waste.',
    descriptionMm:
      'ဝါးခြမ်းပြား (၂၀"–၄၈") နှင့် ဝါးတံ (၈"၊ ၉"၊ ၁၀") နှစ်မျိုးလုံးကို အချိုးကျ ပေါင်းစပ်ထုတ်လုပ်သဖြင့် သဘာဝဝါးပင်တစ်ပင်လုံးကို အလေအလွင့်အနည်းဆုံးဖြင့် အပြည့်အဝ အသုံးချနိုင်ပါသည်။',
    metricLabel: 'Multi-Format Processing · Minimal Off-Cuts',
    metricLabelMm: 'အလေအလွင့်နည်းပါးသော စနစ်တကျ ထုတ်လုပ်မှု',
  },
  {
    id: 'eco-packaging',
    index: '06',
    icon: 'sustainable-packaging',
    kicker: 'Export Logistics Efficiency',
    kickerMm: 'ပြည်ပပို့ကုန် စံချိန်မီ ထုပ်ပိုးမှု',
    title: 'Breathable 30KG Export Bagging & Bundling',
    titleMm: 'လေဝင်လေထွက်ကောင်းမွန်သော 30KG စံချိန်မီ ထုပ်ပိုးမှုပုံစံ',
    description:
      'Standardized 30 kg per bag packaging and tightly bound bundles protect natural bamboo moisture balance during sea freight and maximize container loading efficiency.',
    descriptionMm:
      'တစ်အိတ်လျှင် ၃၀ ကီလိုဂရမ် (30 kg) စံနှုန်းဖြင့် လေဝင်လေထွက်ကောင်းမွန်စွာ ထုပ်ပိုးထားသဖြင့် ပင်လယ်ရေကြောင်း တင်ပို့ရာတွင် အစိုဓာတ်ထိန်းညှိပေးပြီး သဘာဝအရည်အသွေးကို အပြည့်အဝ ထိန်းသိမ်းပေးပါသည်။',
    metricLabel: 'Standardized 30 kg/bag · Export Ready',
    metricLabelMm: 'တစ်အိတ်လျှင် 30 kg စံနှုန်း · ပြည်ပပို့ကုန်အဆင့်',
  },
];

export const BambooProductsPage: React.FC<BambooProductsPageProps> = ({
  onNavigate,
  onInquireWithCategory,
}) => {
  const { isMm, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategoryId>('bamboo');

  const activatedCarbonProduct = getProductByIdOrSlug('activated-carbon');
  const allPublishedProducts = useMemo(() => getPublishedProducts(), []);

  const baseProductsForScope = useMemo(
    () =>
      selectedCategory === 'all'
        ? allPublishedProducts
        : allPublishedProducts.filter((p) => p.categoryKey === selectedCategory),
    [allPublishedProducts, selectedCategory]
  );

  const filteredCatalogProducts = useMemo(
    () =>
      filterProductsBySearchQuery(
        allPublishedProducts,
        searchQuery,
        selectedCategory
      ),
    [allPublishedProducts, searchQuery, selectedCategory]
  );

  const filteredDetailedBambooProducts = useMemo(
    () => filterProductsBySearchQuery(BAMBOO_PRODUCTS, searchQuery, 'bamboo'),
    [searchQuery]
  );

  const scrollToProductSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Page Hero */}
      <HeroSection
        breadcrumbs={[
          { label: 'Home', route: '/' },
          { label: 'Bamboo Products', route: '/bamboo-products' },
        ]}
        onNavigate={onNavigate}
        kicker="Division A · Bamboo Production, Domestic Distribution & International Export"
        kickerMm="လုပ်ငန်းကဏ္ဍ (က) · သဘာဝဝါးထုတ်လုပ်ရေး၊ ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်"
        title="100% Natural Myanmar Bamboo Products & Export Specifications"
        titleMm="၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များနှင့် ပြည်ပပို့ကုန် အချက်အလက်များ"
        description="Established in 2013, TB Star Company Limited manufactures and supplies 100% natural Myanmar Bamboo Split (3 mm thickness, 20 to 48 inches, with nodes or without nodes) and Bamboo Sticks (1.2 to 2.5 mm thickness, 8, 9, 10 inches, packed 30 kg per bag) for domestic distribution within Myanmar and export to international markets."
        descriptionMm="၂၀၁၃ ခုနှစ်တွင် စတင်တည်ထောင်ခဲ့သော TBStar Company Limited သည် မြန်မာနိုင်ငံတွင်း ဖြန့်ဖြူးရောင်းချရန်နှင့် နိုင်ငံတကာဈေးကွက်သို့ တင်ပို့ရန် ဝါးခြမ်းပြား (Bamboo Split · အထူ 3 mm၊ အရှည် ၂၀&quot; မှ ၄၈&quot;၊ အဆစ်ပါ / အဆစ်မပါ) နှင့် ဝါးတံ (Bamboo Sticks · တစ်အိတ် 30 kg) တို့ကို ထုတ်လုပ်ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။"
        actions={
          <>
            <Button
              type="button"
              variant="primary-light"
              onClick={() => onInquireWithCategory('Bamboo Split', true)}
            >
              {t('Inquire About Bamboo Split', 'ဝါးခြမ်းပြား မေးမြန်းရန်')}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline-light"
              onClick={() => onInquireWithCategory('Bamboo Sticks', true)}
            >
              {t('Inquire About Bamboo Sticks', 'ဝါးတံ မေးမြန်းရန်')}
            </Button>
          </>
        }
      />

      {/* Product Navigation Bar with Custom SVG Icons */}
      <div className="bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#245C3A] mr-2">
              {t('Jump to Section:', 'ကဏ္ဍအလိုက် ကြည့်ရှုရန် -')}
            </span>
            {BAMBOO_PRODUCTS.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => scrollToProductSection(product.sectionId)}
                className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977]/40 text-[#173D2A] border border-[#DDE5D9] hover:border-[#245C3A] transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <BambooProductIcon type={product.visualType} className="w-4 h-4 shrink-0" />
                <span>
                  {product.index}. {isMm ? product.nameMm : product.name}
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollToProductSection('why-choose-our-bamboo')}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#EAF5E4] hover:bg-[#A8D977]/50 text-[#173D2A] border border-[#C3E4B5] hover:border-[#245C3A] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <EcoAdvantageIcon type="natural-strength" className="w-4 h-4 shrink-0" />
              <span>{t('Why Choose Our Bamboo', 'ကျွန်ုပ်တို့၏ ဝါးကို ရွေးချယ်သင့်သည့်အချက်များ')}</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToProductSection('eco-advantages')}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977]/40 text-[#173D2A] border border-[#DDE5D9] hover:border-[#245C3A] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <EcoAdvantageIcon type="rapid-regeneration" className="w-4 h-4 shrink-0" />
              <span>{t('Eco-Advantages', 'သဘာဝပတ်ဝန်းကျင် အားသာချက်များ')}</span>
            </button>
            {activatedCarbonProduct && (
              <a
                href={activatedCarbonProduct.route}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(activatedCarbonProduct.route);
                }}
                className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977]/40 text-[#173D2A] border border-[#DDE5D9] hover:border-[#245C3A] transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <BambooProductIcon type={activatedCarbonProduct.visualType} className="w-4 h-4 shrink-0" />
                <span>
                  {isMm
                    ? `${activatedCarbonProduct.nameMm} →`
                    : `${activatedCarbonProduct.name} →`}
                </span>
              </a>
            )}
          </div>

          <a
            href={COMPANY_INFO.telephoneHref}
            className="text-xs font-mono-tabular font-bold text-[#173D2A] hover:text-[#245C3A] inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#245C3A]" />
            {t('Direct Trade Line:', 'တိုက်ရိုက်ဖုန်း -')} {COMPANY_INFO.telephone}
          </a>
        </div>
      </div>

      {/* Product Overview Cards with Real-Time Centralized Search */}
      <section className="py-16 bg-[#F6F8F3] border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Product Line Overview"
            kickerMm="ထုတ်ကုန် အမျိုးအစားများ အကျဉ်းချုပ်"
            title="Natural Bamboo Product Categories"
            titleMm="သဘာဝ ဝါးထုတ်ကုန် အမျိုးအစားများ"
            description="Search or filter products in real time by name, description, or specification, or select any bamboo product below to inspect its technical specification table."
            descriptionMm="ထုတ်ကုန်အမည်၊ အကြောင်းအရာ သို့မဟုတ် စံချိန်စံညွှန်းဖြင့် အချိန်နှင့်တစ်ပြေးညီ ရှာဖွေစစ်ထုတ်နိုင်ပြီး သက်ဆိုင်ရာ ဝါးထုတ်ကုန်အလိုက် အသေးစိတ်အချက်အလက်ဇယားကို ကြည့်ရှုနိုင်ပါသည်။"
          />

          <SearchBar
            query={searchQuery}
            onSearch={(nextQuery) => {
              setSearchQuery(nextQuery);
              if (nextQuery.trim() && selectedCategory !== 'all') {
                const scopedMatches = filterProductsBySearchQuery(
                  allPublishedProducts,
                  nextQuery,
                  selectedCategory
                );
                if (scopedMatches.length === 0) {
                  const allMatches = filterProductsBySearchQuery(
                    allPublishedProducts,
                    nextQuery,
                    'all'
                  );
                  if (allMatches.length > 0) {
                    setSelectedCategory('all');
                  }
                }
              }
            }}
            totalCount={baseProductsForScope.length}
            resultCount={filteredCatalogProducts.length}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showCategoryTabs={true}
            inputId="bamboo-page-product-search"
            className="mb-8"
          />

          {filteredCatalogProducts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {filteredCatalogProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  imageLoading="eager"
                  onInquireProduct={(type) => onInquireWithCategory(type, true)}
                  onViewDetails={() => {
                    if (product.route === '/bamboo-products') {
                      scrollToProductSection(product.sectionId);
                    } else {
                      onNavigate(product.route);
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <ProductSearchEmptyState
              query={searchQuery}
              onReset={() => {
                setSearchQuery('');
                setSelectedCategory('bamboo');
              }}
            />
          )}
        </div>
      </section>

      {/* WHY CHOOSE OUR BAMBOO SECTION */}
      <section
        id="why-choose-our-bamboo"
        aria-label="Why Choose Our Bamboo"
        className="py-20 bg-white border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Key Material Advantages · Division A"
            kickerMm="အဓိက အားသာချက်များ · လုပ်ငန်းကဏ္ဍ (က)"
            title="Why Choose Our Bamboo"
            titleMm="ကျွန်ုပ်တို့၏ မြန်မာ့သဘာဝဝါးကို အဘယ်ကြောင့် ရွေးချယ်သင့်သနည်း"
            description="TB Star Company Limited supplies 100% natural Myanmar bamboo engineered by nature for structural durability, processed without chemical additives, and harvested from rapidly renewable bamboo groves."
            descriptionMm="TBStar Company Limited သည် သဘာဝအလျောက် ခိုင်ခံ့မှုမြင့်မားပြီး ဓာတုဆေးဝါးမပါဘဲ စနစ်တကျ ထုတ်လုပ်ထားသည့် သဘာဝပတ်ဝန်းကျင်နှင့် သဟဇာတဖြစ်သော ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များကို ဖြန့်ဖြူးတင်ပို့ပေးလျက်ရှိပါသည်။"
            action={
              <Button
                type="button"
                variant="primary-dark"
                size="sm"
                onClick={() => onInquireWithCategory('Bamboo Split', true)}
              >
                {t('Inquire About Bamboo Supply', 'ဝါးထုတ်ကုန် မှာယူရန် မေးမြန်းရန်')}
                <ArrowRight className="w-3.5 h-3.5 text-[#A8D977]" />
              </Button>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_CHOOSE_BAMBOO_ITEMS.map((pillar) => (
              <article
                key={pillar.id}
                className="bg-[#F6F8F3] border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl p-6 sm:p-7 flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-lg bg-white border border-[#DDE5D9] group-hover:border-[#245C3A] flex items-center justify-center shrink-0 transition-colors">
                      <EcoAdvantageIcon type={pillar.icon} className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono-tabular font-bold text-[#245C3A] pt-1">
                      {pillar.index}
                    </span>
                  </div>

                  <p className="text-xs text-[#245C3A] font-medium mb-1">
                    {isMm ? pillar.kickerMm : pillar.kicker}
                  </p>
                  <h3 className="text-lg font-bold text-[#173D2A] mb-2.5">
                    {isMm ? pillar.titleMm : pillar.title}
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                    {isMm ? pillar.descriptionMm : pillar.description}
                  </p>

                  <ul className="space-y-2 mb-6 pt-4 border-t border-[#DDE5D9]/80">
                    {(isMm ? pillar.highlightsMm : pillar.highlights).map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-[#26332B]/90 leading-relaxed"
                      >
                        <Check className="w-3.5 h-3.5 text-[#245C3A] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3.5 border-t border-[#DDE5D9] flex items-center gap-2 text-xs font-semibold text-[#173D2A]">
                  <Check className="w-4 h-4 text-[#245C3A] shrink-0" />
                  <span>{isMm ? pillar.metricLabelMm : pillar.metricLabel}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ECO-ADVANTAGES & SUSTAINABILITY SECTION */}
      <section
        id="eco-advantages"
        aria-label="Eco-Advantages of TB Star Natural Myanmar Bamboo"
        className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Eco-Advantages · Sustainable Myanmar Bamboo Supply"
            kickerMm="သဘာဝပတ်ဝန်းကျင်ဆိုင်ရာ အားသာချက်များ · ရေရှည်တည်တံ့သော မြန်မာ့သဘာဝဝါး"
            title="Why TB Star’s 100% Natural Bamboo Is a Sustainable Choice"
            titleMm="TBStar Company Limited ၏ ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များ ရေရှည်တည်တံ့ပြီး သဘာဝပတ်ဝန်းကျင်နှင့် သဟဇာတဖြစ်သည့် အချက်များ"
            description="Sourced from rapidly regenerating bamboo groves in Myanmar and mechanically processed without chemical additives, our bamboo products support environmentally responsible manufacturing and global trade."
            descriptionMm="မြန်မာနိုင်ငံရှိ သဘာဝအလျောက် ပြန်လည်ရှင်သန်ကြီးထွားသော ဝါးတောများမှ ရယူပြီး ဓာတုဆေးဝါးမပါဘဲ စနစ်တကျ စိတ်ဖြာထုတ်လုပ်ထားသဖြင့် သဘာဝပတ်ဝန်းကျင်ကို ထိန်းသိမ်းရာရောက်သည့် စံချိန်မီ ထုတ်ကုန်များ ဖြစ်ပါသည်။"
            action={
              <Button
                type="button"
                variant="primary-dark"
                size="sm"
                onClick={() => onInquireWithCategory('Bamboo Split', true)}
              >
                {t('Inquire About Sustainable Supply', 'သဘာဝဝါးထုတ်ကုန် မှာယူရန် မေးမြန်းရန်')}
                <ArrowRight className="w-3.5 h-3.5 text-[#A8D977]" />
              </Button>
            }
          />

          {/* Natural Bamboo Product Overview Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {BAMBOO_PRODUCTS.map((product) => (
              <div
                key={`natural-${product.id}`}
                className="bg-white border border-[#DDE5D9] rounded-xl overflow-hidden shadow-2xs flex flex-col"
              >
                <VisualAssetFrame
                  type={product.visualType}
                  imagePath={product.naturalImagePath || product.imagePath}
                  altText={product.naturalImageAlt || product.imageAlt}
                  aspectClassName="aspect-[16/10]"
                  label={
                    isMm && product.placeholderNoteMm
                      ? product.placeholderNoteMm
                      : product.placeholderNote
                  }
                />
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                      {t('100% NATURAL BAMBOO · ORIGIN: MYANMAR', '၁၀၀% သဘာဝဝါးစစ်စစ် · မူရင်းနိုင်ငံ - မြန်မာ')}
                    </p>
                    <h3 className="text-lg font-bold text-[#173D2A] mb-2">
                      {isMm ? product.nameMm : product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#26332B]/85 leading-relaxed">
                      {isMm ? product.shortDescriptionMm : product.shortDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 6-Card Professional Eco-Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {ECO_ADVANTAGE_ITEMS.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl p-6 flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9] group-hover:border-[#245C3A] flex items-center justify-center shrink-0 transition-colors">
                      <EcoAdvantageIcon type={item.icon} className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono-tabular font-bold text-[#245C3A] pt-1">
                      {item.index}
                    </span>
                  </div>

                  <p className="text-xs text-[#245C3A] font-medium mb-1">
                    {isMm ? item.kickerMm : item.kicker}
                  </p>
                  <h3 className="text-lg font-bold text-[#173D2A] mb-2.5">
                    {isMm ? item.titleMm : item.title}
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                    {isMm ? item.descriptionMm : item.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-[#DDE5D9] flex items-center gap-2 text-xs font-semibold text-[#173D2A]">
                  <Check className="w-4 h-4 text-[#245C3A] shrink-0" />
                  <span>{isMm ? item.metricLabelMm : item.metricLabel}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Sustainability & Export Compliance Summary Strip */}
          <div className="bg-[#173D2A] text-white border border-[#245C3A] rounded-xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs font-mono-tabular text-[#A8D977] font-semibold mb-1.5">
                {t(
                  'SUSTAINABLE RAW MATERIAL · 100% NATURAL MYANMAR BAMBOO',
                  'သဘာဝပတ်ဝန်းကျင်နှင့် သဟဇာတဖြစ်သော ကုန်ကြမ်း · ၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ်'
                )}
              </p>
              <h3 className="text-xl font-bold text-white mb-2">
                {t(
                  'Ready for Eco-Conscious Domestic & International Buyers',
                  'ပြည်တွင်းနှင့် နိုင်ငံတကာမှ သဘာဝပတ်ဝန်းကျင် အလေးထားသော လုပ်ငန်းများအတွက် အသင့်တော်ဆုံး'
                )}
              </h3>
              <p className="text-sm text-white/85 leading-relaxed">
                {t(
                  'Every shipment of TB Star Bamboo Split (3 mm · 20"–48") and Bamboo Sticks (1.2–2.5 mm · 30 kg per bag) is produced from 100% natural bamboo harvested in Myanmar, delivering consistent dimensional quality with a low environmental footprint.',
                  'TBStar Company Limited မှ ထုတ်လုပ်တင်ပို့သော ဝါးခြမ်းပြား (3 mm · ၂၀"–၄၈") နှင့် ဝါးတံ (1.2–2.5 mm · တစ်အိတ် 30 kg) တိုင်းသည် သဘာဝပတ်ဝန်းကျင် ထိခိုက်မှုမရှိသော မြန်မာ့သဘာဝဝါးစစ်စစ်ဖြင့် အရည်အသွေးမီ ထုတ်လုပ်ထားပါသည်။'
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                type="button"
                variant="primary-light"
                onClick={() => onInquireWithCategory('Bamboo Split', true)}
              >
                {t('Request Export Quote', 'ပြည်ပပို့ကုန် ဈေးနှုန်းမေးမြန်းရန်')}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <a
                href={COMPANY_INFO.telephoneHref}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#A8D977]" />
                <span>{COMPANY_INFO.telephone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC DETAILED SECTIONS FOR EACH PUBLISHED BAMBOO PRODUCT */}
      {filteredDetailedBambooProducts.map((product, idx) => {
        const isEvenSection = idx % 2 !== 0;
        const hasVariants = product.variants && product.variants.length > 0;
        const hasSubCards = product.detailSubCards && product.detailSubCards.length > 0;

        return (
          <section
            key={product.id}
            id={product.sectionId}
            className={`py-20 border-b border-[#DDE5D9] ${
              isEvenSection ? 'bg-[#F6F8F3]' : 'bg-white'
            }`}
          >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-5">
                  <div className="rounded-xl overflow-hidden border border-[#DDE5D9]">
                    <VisualAssetFrame
                      type={product.visualType}
                      imagePath={product.imagePath}
                      altText={product.imageAlt}
                      aspectClassName="aspect-[4/3]"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      label={
                        isMm && product.placeholderNoteMm
                          ? product.placeholderNoteMm
                          : product.placeholderNote
                      }
                    />
                  </div>

                  <div
                    className={`mt-6 border border-[#DDE5D9] rounded-xl p-6 ${
                      isEvenSection ? 'bg-white' : 'bg-[#F6F8F3]'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-11 h-11 rounded-lg border border-[#DDE5D9] flex items-center justify-center shrink-0 ${
                          isEvenSection ? 'bg-[#F6F8F3]' : 'bg-white'
                        }`}
                      >
                        <BambooProductIcon type={product.visualType} className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold">
                          {t(
                            `PRODUCT ${product.index} · ORIGIN: MYANMAR`,
                            `ထုတ်ကုန် ${product.index} · မူရင်းနိုင်ငံ - မြန်မာ`
                          )}
                        </p>
                        <h2 className="text-2xl font-bold text-[#173D2A]">
                          {isMm ? product.nameMm : product.name}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm text-[#26332B]/85 leading-relaxed mb-4">
                      {isMm ? product.detailedDescriptionMm : product.detailedDescription}
                    </p>

                    {/* Available Types & Bundle Packaging Summary when variants exist */}
                    {hasVariants && (
                      <div
                        className={`border border-[#DDE5D9] rounded-lg p-4 mb-5 ${
                          isEvenSection ? 'bg-[#F6F8F3]' : 'bg-white'
                        }`}
                      >
                        <p className="text-xs font-mono-tabular font-bold text-[#173D2A] uppercase tracking-wider mb-2.5">
                          {t(
                            'Available Types & Bundle Packaging',
                            'အမျိုးအစားနှင့် အစည်းထုပ်ပိုးမှု စံနှုန်း'
                          )}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {product.variants.map((variant) => (
                            <div
                              key={variant.type}
                              className="bg-white border border-[#DDE5D9] rounded-md p-3"
                            >
                              <p className="font-bold text-[#173D2A] mb-0.5">
                                {isMm
                                  ? `အမျိုးအစား - ${variant.typeMm}`
                                  : `Type: ${variant.type}`}
                              </p>
                              <p className="text-[#245C3A] font-semibold">
                                {isMm ? variant.packagingMm : variant.packaging}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        variant="primary-dark"
                        onClick={() => onInquireWithCategory(product.inquiryType, true)}
                      >
                        {isMm
                          ? `${product.nameMm} မေးမြန်းရန်`
                          : `Inquire About ${product.name}`}
                        <ArrowRight className="w-4 h-4 text-[#A8D977]" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline-dark"
                        onClick={() => onInquireWithCategory(product.inquiryType, false)}
                      >
                        {t('Quick Inquiry Modal', 'အမြန် မေးမြန်းရန်')}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <ProductSpecificationTable
                    title={`${product.name} — Technical Specification Table`}
                    titleMm={`${product.nameMm} — အသေးစိတ်အချက်အလက်ဇယား`}
                    subtitle={`PRODUCT ${product.index} · VERIFIED SPECIFICATIONS`}
                    subtitleMm={`ထုတ်ကုန် ${product.index} · တရားဝင် စံချိန်စံညွှန်းများ`}
                    specifications={product.specifications}
                    onInquire={() => onInquireWithCategory(product.inquiryType, true)}
                    inquireLabel={`Inquire: ${product.name}`}
                    inquireLabelMm={`${product.nameMm} မေးမြန်းရန်`}
                  />

                  {/* Product Details: Material Texture & Wholesale Supply Visuals */}
                  {hasSubCards && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {product.detailSubCards.map((subCard) => (
                        <div
                          key={subCard.title}
                          className={`border border-[#DDE5D9] rounded-xl overflow-hidden shadow-2xs flex flex-col ${
                            isEvenSection ? 'bg-white' : 'bg-[#F6F8F3]'
                          }`}
                        >
                          <VisualAssetFrame
                            type={product.visualType}
                            imagePath={subCard.imagePath}
                            altText={subCard.imageAlt}
                            aspectClassName="aspect-[4/3]"
                            label={isMm ? subCard.frameLabelMm : subCard.frameLabel}
                          />
                          <div className="p-4 flex-1">
                            <p className="text-[11px] font-mono-tabular text-[#245C3A] font-semibold mb-1">
                              {isMm ? subCard.kickerMm : subCard.kicker}
                            </p>
                            <h3 className="text-sm font-bold text-[#173D2A] mb-1">
                              {isMm ? subCard.titleMm : subCard.title}
                            </h3>
                            <p className="text-xs text-[#26332B]/80 leading-relaxed">
                              {isMm ? subCard.descriptionMm : subCard.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <ContactCTA
        onNavigate={onNavigate}
        onInquireWithCategory={onInquireWithCategory}
      />
    </div>
  );
};

