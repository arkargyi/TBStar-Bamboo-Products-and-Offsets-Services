import React from 'react';
import { ArrowRight, Check, Phone } from 'lucide-react';
import {
  BAMBOO_PRODUCTS,
  COMPANY_INFO,
  InquiryTypeOption,
  PageRoute,
} from '../constants/companyData';
import { VisualAssetFrame } from '../components/VisualAssetFrame';
import { Button, HeroSection, SectionHeading } from '../components/SharedUI';
import {
  ContactCTA,
  ProductCard,
  ProductSpecificationTable,
} from '../components/CatalogComponents';
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
      'Our 3 mm Bamboo Split and 1.2–2.5 mm Bamboo Sticks are mechanically split, sized, and naturally seasoned from 100% raw Myanmar bamboo without synthetic resins or toxic additives.',
    descriptionMm:
      'ကျွန်ုပ်တို့၏ အထူ 3 mm ဝါးခြမ်းပြားများနှင့် 1.2–2.5 mm ဝါးတံများကို ဓာတုဆေးဝါးနှင့် ကော်ရည်များ လုံးဝမပါဝင်ဘဲ ၁၀၀% သဘာဝမြန်မာ့ဝါးစစ်စစ်မှ စက်မှုနည်းပညာဖြင့် စနစ်တကျ စိတ်ဖြာထုတ်လုပ်ထားပါသည်။',
    metricLabel: '100% Natural Bamboo · No Synthetic Binders',
    metricLabelMm: '၁၀၀% သဘာဝဝါးစစ်စစ် · ဓာတုကင်းစင်',
  },
  {
    id: 'eco-biodegradable',
    index: '03',
    icon: 'biodegradable',
    kicker: 'Circular & Earth-Safe',
    kickerMm: 'သဘာဝပတ်ဝန်းကျင်နှင့် သဟဇာတဖြစ်မှု',
    title: '100% Biodegradable Plastic Alternative',
    titleMm: 'ပလတ်စတစ်အစားထိုး သဘာဝအလျောက် ဆွေးမြည့်နိုင်သော ထုတ်ကုန်',
    description:
      'Ideal for agricultural stakes, incense sticks, handicrafts, and industrial applications where buyers seek a fully compostable, zero-microplastic replacement for synthetic materials.',
    descriptionMm:
      'စိုက်ပျိုးရေး၊ လက်မှုလုပ်ငန်းနှင့် စက်မှုကုန်ထုတ်လုပ်ငန်းများတွင် ပလတ်စတစ်နှင့် သံထည်ပစ္စည်းများအစား သဘာဝမြေသြဇာအဖြစ် ပြန်လည်ဆွေးမြည့်နိုင်သော သဘာဝဝါးကို စိတ်ချစွာ အသုံးပြုနိုင်ပါသည်။',
    metricLabel: 'Fully Compostable · Plastic-Free Supply',
    metricLabelMm: 'သဘာဝမြေသြဇာအဖြစ် ပြန်လည်ဆွေးမြည့်နိုင်မှု',
  },
  {
    id: 'eco-strength',
    index: '04',
    icon: 'tensile-durability',
    kicker: 'Structural Fiber Integrity',
    kickerMm: 'သဘာဝအမျှင်ဓာတ် ခိုင်ခံ့မှု',
    title: 'High Tensile Strength & Natural Flexibility',
    titleMm: 'သဘာဝအမျှင်ဓာတ် မြင့်မားပြီး ခိုင်ခံ့ပျော့ပျောင်းမှုရှိခြင်း',
    description:
      'Myanmar bamboo possesses dense longitudinal vascular fibers that deliver exceptional bending resilience—available both With Nodes for rigidity and Without Nodes for smooth flexibility.',
    descriptionMm:
      'မြန်မာ့သဘာဝဝါးသည် သိပ်သည်းသော အမျှင်ဖွဲ့စည်းပုံကြောင့် ကွေးညွှတ်ခံနိုင်ရည်နှင့် ခိုင်ခံ့မှု မြင့်မားပြီး လုပ်ငန်းလိုအပ်ချက်အလိုက် အဆစ်ပါ (With Nodes) နှင့် အဆစ်မပါ (Without Nodes) ရွေးချယ်နိုင်ပါသည်။',
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

  const bambooSplit = BAMBOO_PRODUCTS[0];
  const bambooSticks = BAMBOO_PRODUCTS[1];

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
        description="Established in 2013, TB Star Company Limited manufactures and supplies 100% natural Myanmar Bamboo Split (With Nodes: 50 pieces per bundle; Without Nodes: 100 pieces per bundle) and Bamboo Sticks (30 kg per bag) for domestic distribution within Myanmar and export to international markets."
        descriptionMm="၂၀၁၃ ခုနှစ်တွင် စတင်တည်ထောင်ခဲ့သော TBStar Company Limited သည် မြန်မာနိုင်ငံတွင်း ဖြန့်ဖြူးရောင်းချရန်နှင့် နိုင်ငံတကာဈေးကွက်သို့ တင်ပို့ရန် ဝါးခြမ်းပြား (Bamboo Split · အဆစ်ပါ တစ်စည်း 50 pcs နှင့် အဆစ်မပါ တစ်စည်း 100 pcs) နှင့် ဝါးတံ (Bamboo Sticks · တစ်အိတ် 30 kg) များကို ထုတ်လုပ်ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။"
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
            <button
              type="button"
              onClick={() => scrollToProductSection('product-bamboo-split')}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977]/40 text-[#173D2A] border border-[#DDE5D9] hover:border-[#245C3A] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <BambooProductIcon type="bamboo-split" className="w-4 h-4 shrink-0" />
              <span>{t('01. Bamboo Split', '၀၁။ ဝါးခြမ်းပြား')}</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToProductSection('product-bamboo-sticks')}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977]/40 text-[#173D2A] border border-[#DDE5D9] hover:border-[#245C3A] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <BambooProductIcon type="bamboo-sticks" className="w-4 h-4 shrink-0" />
              <span>{t('02. Bamboo Sticks', '၀၂။ ဝါးတံ')}</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToProductSection('eco-advantages')}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#EAF5E4] hover:bg-[#A8D977]/50 text-[#173D2A] border border-[#C3E4B5] hover:border-[#245C3A] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <EcoAdvantageIcon type="rapid-regeneration" className="w-4 h-4 shrink-0" />
              <span>{t('Eco-Advantages', 'သဘာဝပတ်ဝန်းကျင် အားသာချက်များ')}</span>
            </button>
            <a
              href="/charcoal"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/charcoal');
              }}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977]/40 text-[#173D2A] border border-[#DDE5D9] hover:border-[#245C3A] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <BambooProductIcon type="charcoal" className="w-4 h-4 shrink-0" />
              <span>{t('Activated Carbon →', 'အက်တီဗိတ်တက် ကာဗွန် →')}</span>
            </a>
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

      {/* Product Overview Cards */}
      <section className="py-16 bg-[#F6F8F3] border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Product Line Overview"
            kickerMm="ထုတ်ကုန် အမျိုးအစားများ အကျဉ်းချုပ်"
            title="Natural Bamboo Product Categories"
            titleMm="သဘာဝ ဝါးထုတ်ကုန် အမျိုးအစားများ"
            description="Select any bamboo product below to inspect its technical specification table or send an inquiry with the product category preselected."
            descriptionMm="သက်ဆိုင်ရာ ဝါးထုတ်ကုန်အလိုက် အသေးစိတ်အချက်အလက်ဇယားကို ကြည့်ရှုနိုင်ပြီး လိုအပ်သည့် အမျိုးအစားအလိုက် တိုက်ရိုက် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {BAMBOO_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                imageLoading="eager"
                onInquireProduct={(type) => onInquireWithCategory(type, true)}
                onViewDetails={() =>
                  scrollToProductSection(
                    product.id === 'bamboo-split'
                      ? 'product-bamboo-split'
                      : 'product-bamboo-sticks'
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ECO-ADVANTAGES & SUSTAINABILITY SECTION */}
      <section
        id="eco-advantages"
        aria-label="Eco-Advantages of TB Star Natural Myanmar Bamboo"
        className="py-20 bg-white border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Eco-Advantages · Sustainable Myanmar Bamboo Supply"
            kickerMm="သဘာဝပတ်ဝန်းကျင်ဆိုင်ရာ အားသာချက်များ · ရေရှည်တည်တံ့သော မြန်မာ့သဘာဝဝါး"
            title="Why TB Star’s 100% Natural Bamboo Is a Sustainable Choice"
            titleMm="TBStar Company Limited ၏ ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များ ရေရှည်တည်တံ့ပြီး သဘာဝပတ်ဝန်းကျင်နှင့် သဟဇာတဖြစ်သည့် အချက်များ"
            description="Sourced from rapidly regenerating bamboo groves in Myanmar and mechanically processed without synthetic chemicals, our bamboo products support environmentally responsible manufacturing and global trade."
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
            <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl overflow-hidden shadow-2xs flex flex-col">
              <VisualAssetFrame
                type="bamboo-split"
                imagePath={bambooSplit.naturalImagePath}
                altText={bambooSplit.naturalImageAlt}
                aspectClassName="aspect-[16/10]"
                label={t(
                  '100% Natural Myanmar Bamboo Split · With Nodes & Without Nodes',
                  '၁၀၀% သဘာဝ မြန်မာ့ဝါးခြမ်းပြား · အဆစ်ပါ နှင့် အဆစ်မပါ'
                )}
              />
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                    {t('100% NATURAL BAMBOO · ORIGIN: MYANMAR', '၁၀၀% သဘာဝဝါးစစ်စစ် · မူရင်းနိုင်ငံ - မြန်မာ')}
                  </p>
                  <h3 className="text-lg font-bold text-[#173D2A] mb-2">
                    {t(
                      'Natural Bamboo Split (3 mm · 20–48 inches)',
                      'သဘာဝ ဝါးခြမ်းပြား (အထူ 3 mm · အရှည် ၂၀–၄၈ လက်မ)'
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#26332B]/85 leading-relaxed">
                    {t(
                      'Mechanically split from 100% natural Myanmar bamboo in uniform 3 mm thickness and 20 to 48 inch lengths, available both With Nodes and Without Nodes.',
                      '၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ်မှ အထူ 3 mm နှင့် အရှည် ၂၀ လက်မမှ ၄၈ လက်မအထိ တစ်ပြေးညီ ထုတ်လုပ်ထားပြီး အဆစ်ပါ (With Nodes) နှင့် အဆစ်မပါ (Without Nodes) ရရှိနိုင်ပါသည်။'
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl overflow-hidden shadow-2xs flex flex-col">
              <VisualAssetFrame
                type="bamboo-sticks"
                imagePath={bambooSticks.naturalImagePath}
                altText={bambooSticks.naturalImageAlt}
                aspectClassName="aspect-[16/10]"
                label={t(
                  '100% Natural Myanmar Bamboo Sticks · 8", 9", and 10"',
                  '၁၀၀% သဘာဝ မြန်မာ့ဝါးတံ · ၈ လက်မ၊ ၉ လက်မ နှင့် ၁၀ လက်မ'
                )}
              />
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                    {t('100% NATURAL BAMBOO · ORIGIN: MYANMAR', '၁၀၀% သဘာဝဝါးစစ်စစ် · မူရင်းနိုင်ငံ - မြန်မာ')}
                  </p>
                  <h3 className="text-lg font-bold text-[#173D2A] mb-2">
                    {t(
                      'Natural Bamboo Sticks (1.2–2.5 mm · 8, 9, and 10 inches)',
                      'သဘာဝ ဝါးတံ (အထူ 1.2–2.5 mm · အရှည် ၈၊ ၉ နှင့် ၁၀ လက်မ)'
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#26332B]/85 leading-relaxed">
                    {t(
                      'Precision-sized from 100% natural Myanmar bamboo in 1.2 to 2.5 mm thickness across 8, 9, and 10 inch lengths, neatly bundled and packed at 30 kg per bag.',
                      '၁၀၀% သဘာဝ မြန်မာ့ဝါးစစ်စစ်ဖြင့် အထူ 1.2–2.5 mm နှင့် အရှည် ၈၊ ၉၊ ၁၀ လက်မ အရွယ်အစားများအတိုင်း သပ်ရပ်စွာ ထုတ်လုပ်ပြီး တစ်အိတ် 30 kg စံနှုန်းဖြင့် ထုပ်ပိုးထားပါသည်။'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 6-Card Professional Eco-Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {ECO_ADVANTAGE_ITEMS.map((item) => (
              <article
                key={item.id}
                className="bg-[#F6F8F3] border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl p-6 flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-white border border-[#DDE5D9] group-hover:border-[#245C3A] flex items-center justify-center shrink-0 transition-colors">
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

      {/* PRODUCT A: BAMBOO SPLIT */}
      <section
        id="product-bamboo-split"
        className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-[#DDE5D9]">
                <VisualAssetFrame
                  type="bamboo-split"
                  imagePath={bambooSplit.imagePath}
                  altText={bambooSplit.imageAlt}
                  aspectClassName="aspect-[4/3]"
                  loading="eager"
                  label={isMm && bambooSplit.placeholderNoteMm ? bambooSplit.placeholderNoteMm : bambooSplit.placeholderNote}
                />
              </div>

              <div className="mt-6 bg-white border border-[#DDE5D9] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9] flex items-center justify-center shrink-0">
                    <BambooProductIcon type="bamboo-split" className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold">
                      {t('PRODUCT 01 · ORIGIN: MYANMAR', 'ထုတ်ကုန် ၀၁ · မူရင်းနိုင်ငံ - မြန်မာ')}
                    </p>
                    <h2 className="text-2xl font-bold text-[#173D2A]">
                      {isMm ? bambooSplit.nameMm : bambooSplit.name}
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-[#26332B]/85 leading-relaxed mb-4">
                  {isMm ? bambooSplit.detailedDescriptionMm : bambooSplit.detailedDescription}
                </p>

                {/* Available Types & Bundle Packaging Summary */}
                <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-lg p-4 mb-5">
                  <p className="text-xs font-mono-tabular font-bold text-[#173D2A] uppercase tracking-wider mb-2.5">
                    {t('Available Types & Bundle Packaging', 'အမျိုးအစားနှင့် အစည်းထုပ်ပိုးမှု စံနှုန်း')}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white border border-[#DDE5D9] rounded-md p-3">
                      <p className="font-bold text-[#173D2A] mb-0.5">
                        {t('Type: With Nodes', 'အမျိုးအစား - အဆစ်ပါ (With Nodes)')}
                      </p>
                      <p className="text-[#245C3A] font-semibold">
                        {t('50 pieces per bundle (50 pcs/bundle)', 'တစ်စည်းလျှင် ၅၀ ချောင်း (50 pcs/bundle)')}
                      </p>
                    </div>
                    <div className="bg-white border border-[#DDE5D9] rounded-md p-3">
                      <p className="font-bold text-[#173D2A] mb-0.5">
                        {t('Type: Without Nodes', 'အမျိုးအစား - အဆစ်မပါ (Without Nodes)')}
                      </p>
                      <p className="text-[#245C3A] font-semibold">
                        {t('100 pieces per bundle (100 pcs/bundle)', 'တစ်စည်းလျှင် ၁၀၀ ချောင်း (100 pcs/bundle)')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant="primary-dark"
                    onClick={() => onInquireWithCategory('Bamboo Split', true)}
                  >
                    {t('Inquire About Bamboo Split', 'ဝါးခြမ်းပြား မေးမြန်းရန်')}
                    <ArrowRight className="w-4 h-4 text-[#A8D977]" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline-dark"
                    onClick={() => onInquireWithCategory('Bamboo Split', false)}
                  >
                    {t('Quick Inquiry Modal', 'အမြန် မေးမြန်းရန်')}
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <ProductSpecificationTable
                title="Bamboo Split — Technical Specification Table"
                titleMm="ဝါးခြမ်းပြား (Bamboo Split) — အသေးစိတ်အချက်အလက်ဇယား"
                subtitle="PRODUCT 01 · VERIFIED SPECIFICATIONS"
                subtitleMm="ထုတ်ကုန် ၀၁ · တရားဝင် စံချိန်စံညွှန်းများ"
                specifications={bambooSplit.specifications}
                onInquire={() => onInquireWithCategory('Bamboo Split', true)}
                inquireLabel="Inquire: Bamboo Split"
                inquireLabelMm="ဝါးခြမ်းပြား မေးမြန်းရန်"
              />

              {/* Product Details: Material Texture & Wholesale Supply Visuals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white border border-[#DDE5D9] rounded-xl overflow-hidden shadow-2xs flex flex-col">
                  <VisualAssetFrame
                    type="bamboo-split"
                    imagePath={bambooSplit.textureImagePath}
                    altText={bambooSplit.textureImageAlt}
                    aspectClassName="aspect-[4/3]"
                    label={t(
                      'Bamboo Split · With Nodes & Without Nodes Texture',
                      'ဝါးခြမ်းပြား · အဆစ်ပါ နှင့် အဆစ်မပါ သဘာဝဝါးအသားဖွဲ့စည်းပုံ'
                    )}
                  />
                  <div className="p-4 flex-1">
                    <p className="text-[11px] font-mono-tabular text-[#245C3A] font-semibold mb-1">
                      {t('PRODUCT TYPES · WITH NODES & WITHOUT NODES', 'အမျိုးအစား · အဆစ်ပါ နှင့် အဆစ်မပါ')}
                    </p>
                    <h3 className="text-sm font-bold text-[#173D2A] mb-1">
                      {t(
                        'With Nodes & Without Nodes Bamboo Split',
                        'အဆစ်ပါ (With Nodes) နှင့် အဆစ်မပါ (Without Nodes) ဝါးခြမ်းပြား'
                      )}
                    </h3>
                    <p className="text-xs text-[#26332B]/80 leading-relaxed">
                      {t(
                        '100% natural Myanmar bamboo splits supplied in two distinct types: With Nodes (50 pieces per bundle) and Without Nodes (100 pieces per bundle).',
                        '၁၀၀% သဘာဝ မြန်မာ့ဝါးခြမ်းပြားများကို အဆစ်ပါ (တစ်စည်း ၅၀ ချောင်း) နှင့် အဆစ်မပါ (တစ်စည်း ၁၀၀ ချောင်း) ဟူ၍ အမျိုးအစား (၂) မျိုးဖြင့် ထုတ်လုပ်ပေးပါသည်။'
                      )}
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-[#DDE5D9] rounded-xl overflow-hidden shadow-2xs flex flex-col">
                  <VisualAssetFrame
                    type="bamboo-split"
                    imagePath={bambooSplit.wholesaleImagePath}
                    altText={bambooSplit.wholesaleImageAlt}
                    aspectClassName="aspect-[4/3]"
                    label={t(
                      'Bamboo Split · 50 pcs & 100 pcs Bundle Packaging',
                      'ဝါးခြမ်းပြား · တစ်စည်း 50 pcs နှင့် 100 pcs ထုပ်ပိုးမှု'
                    )}
                  />
                  <div className="p-4 flex-1">
                    <p className="text-[11px] font-mono-tabular text-[#245C3A] font-semibold mb-1">
                      {t('BUNDLE PACKAGING SPECIFICATIONS', 'အစည်းအလိုက် ထုပ်ပိုးမှုစံနှုန်း')}
                    </p>
                    <h3 className="text-sm font-bold text-[#173D2A] mb-1">
                      {t(
                        '50 pcs & 100 pcs per Bundle Packaging',
                        'တစ်စည်း ၅၀ ချောင်း (50 pcs) နှင့် ၁၀၀ ချောင်း (100 pcs) ထုပ်ပိုးမှု'
                      )}
                    </h3>
                    <p className="text-xs text-[#26332B]/80 leading-relaxed">
                      {t(
                        'With Nodes Bamboo Split is packed at 50 pieces per bundle, and Without Nodes Bamboo Split is packed at 100 pieces per bundle.',
                        'အဆစ်ပါ ဝါးခြမ်းပြား (With Nodes) ကို တစ်စည်းလျှင် ၅၀ ချောင်းနှုန်းနှင့် အဆစ်မပါ ဝါးခြမ်းပြား (Without Nodes) ကို တစ်စည်းလျှင် ၁၀၀ ချောင်းနှုန်းဖြင့် စနစ်တကျ စည်းနှောင်ထုပ်ပိုးပါသည်။'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT B: BAMBOO STICKS */}
      <section
        id="product-bamboo-sticks"
        className="py-20 bg-white border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-[#DDE5D9]">
                <VisualAssetFrame
                  type="bamboo-sticks"
                  imagePath={bambooSticks.imagePath}
                  altText={bambooSticks.imageAlt}
                  aspectClassName="aspect-[4/3]"
                  label={isMm && bambooSticks.placeholderNoteMm ? bambooSticks.placeholderNoteMm : bambooSticks.placeholderNote}
                />
              </div>

              <div className="mt-6 bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-lg bg-white border border-[#DDE5D9] flex items-center justify-center shrink-0">
                    <BambooProductIcon type="bamboo-sticks" className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold">
                      {t('PRODUCT 02 · ORIGIN: MYANMAR', 'ထုတ်ကုန် ၀၂ · မူရင်းနိုင်ငံ - မြန်မာ')}
                    </p>
                    <h2 className="text-2xl font-bold text-[#173D2A]">
                      {isMm ? bambooSticks.nameMm : bambooSticks.name}
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                  {isMm ? bambooSticks.detailedDescriptionMm : bambooSticks.detailedDescription}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant="primary-dark"
                    onClick={() => onInquireWithCategory('Bamboo Sticks', true)}
                  >
                    {t('Inquire About Bamboo Sticks', 'ဝါးတံ မေးမြန်းရန်')}
                    <ArrowRight className="w-4 h-4 text-[#A8D977]" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline-dark"
                    onClick={() => onInquireWithCategory('Bamboo Sticks', false)}
                  >
                    {t('Quick Inquiry Modal', 'အမြန် မေးမြန်းရန်')}
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <ProductSpecificationTable
                title="Bamboo Sticks — Technical Specification Table"
                titleMm="ဝါးတံ (Bamboo Sticks) — အသေးစိတ်အချက်အလက်ဇယား"
                subtitle="PRODUCT 02 · VERIFIED SPECIFICATIONS"
                subtitleMm="ထုတ်ကုန် ၀၂ · တရားဝင် စံချိန်စံညွှန်းများ"
                specifications={bambooSticks.specifications}
                onInquire={() => onInquireWithCategory('Bamboo Sticks', true)}
                inquireLabel="Inquire: Bamboo Sticks"
                inquireLabelMm="ဝါးတံ မေးမြန်းရန်"
              />

              {/* Product Details: Material Texture & Wholesale Supply Visuals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl overflow-hidden shadow-2xs flex flex-col">
                  <VisualAssetFrame
                    type="bamboo-sticks"
                    imagePath={bambooSticks.textureImagePath}
                    altText={bambooSticks.textureImageAlt}
                    aspectClassName="aspect-[4/3]"
                    label={t(
                      'Bamboo Sticks · 1.2–2.5 mm Cross-Section & Texture',
                      'ဝါးတံ · အထူ 1.2–2.5 mm နှင့် သဘာဝဝါးအသားဖွဲ့စည်းပုံ'
                    )}
                  />
                  <div className="p-4 flex-1">
                    <p className="text-[11px] font-mono-tabular text-[#245C3A] font-semibold mb-1">
                      {t('MATERIAL TEXTURE & APPEARANCE', 'သဘာဝဝါးအသားနှင့် အသွင်အပြင်')}
                    </p>
                    <h3 className="text-sm font-bold text-[#173D2A] mb-1">
                      {t(
                        '1.2–2.5 mm Natural Bamboo Stick Texture',
                        'အထူ 1.2–2.5 mm သဘာဝဝါးတံ အသေးစိတ်ပုံစံ'
                      )}
                    </h3>
                    <p className="text-xs text-[#26332B]/80 leading-relaxed">
                      {t(
                        'Close-up physical appearance of 100% natural Myanmar bamboo sticks in 1.2 to 2.5 mm thickness.',
                        'အထူ 1.2 မှ 2.5 mm ရှိသော ၁၀၀% သဘာဝ မြန်မာ့ဝါးတံများ၏ ဖြောင့်တန်းသပ်ရပ်သော အသားဖွဲ့စည်းပုံ။'
                      )}
                    </p>
                  </div>
                </div>

                <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl overflow-hidden shadow-2xs flex flex-col">
                  <VisualAssetFrame
                    type="bamboo-sticks"
                    imagePath={bambooSticks.wholesaleImagePath}
                    altText={bambooSticks.wholesaleImageAlt}
                    aspectClassName="aspect-[4/3]"
                    label={t(
                      'Bamboo Sticks · 30 kg per Bag Wholesale & Export Packaging',
                      'ဝါးတံ · တစ်အိတ် 30 kg လက်ကားနှင့် ပြည်ပပို့ကုန် ထုပ်ပိုးမှု'
                    )}
                  />
                  <div className="p-4 flex-1">
                    <p className="text-[11px] font-mono-tabular text-[#245C3A] font-semibold mb-1">
                      {t('COMMERCIAL & WHOLESALE SUPPLY', 'လက်ကားနှင့် ပြည်ပပို့ကုန်')}
                    </p>
                    <h3 className="text-sm font-bold text-[#173D2A] mb-1">
                      {t(
                        '30 kg per Bag Commercial Packaging',
                        'တစ်အိတ်လျှင် 30 kg စံနှုန်း ထုပ်ပိုးထားရှိမှု'
                      )}
                    </h3>
                    <p className="text-xs text-[#26332B]/80 leading-relaxed">
                      {t(
                        'Available in 8, 9, and 10 inch lengths and packed in standardized 30 kg bags for commercial supply.',
                        'အရှည် ၈၊ ၉ နှင့် ၁၀ လက်မ အရွယ်အစားများဖြင့် တစ်အိတ်လျှင် 30 kg စံနှုန်း ထုပ်ပိုးထားသော ပို့ကုန်အဆင့် ဝါးတံများ။'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA
        onNavigate={onNavigate}
        onInquireWithCategory={onInquireWithCategory}
      />
    </div>
  );
};
