import React from 'react';
import { ArrowRight, Check, Phone } from 'lucide-react';
import {
  BALL_PEN_PRODUCT,
  COMPANY_INFO,
  InquiryTypeOption,
  PageRoute,
  PRINTING_SERVICES,
} from '../data/companyData';
import { VisualAssetFrame } from '../components/VisualAssetFrame';
import { Button, HeroSection, SectionHeading } from '../components/SharedUI';
import {
  ContactCTA,
  ProductSpecificationTable,
  ServiceCard,
} from '../components/CatalogComponents';
import { PrintingIconType, PrintingServiceIcon } from '../components/PrintingIcons';
import { useLanguage } from '../context/LanguageContext';

interface PrintingServicesPageProps {
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

interface PrintDeliverableHighlight {
  id: string;
  index: string;
  icon: PrintingIconType;
  title: string;
  titleMm: string;
  subtitle: string;
  subtitleMm: string;
  description: string;
  descriptionMm: string;
  inquiryType: InquiryTypeOption;
}

const PRINT_DELIVERABLE_HIGHLIGHTS: PrintDeliverableHighlight[] = [
  {
    id: 'deliv-books',
    index: '01',
    icon: 'books-printing',
    title: 'Book & Publication Printing',
    titleMm: 'စာအုပ်နှင့် စာပေထုတ်ဝေမှု ပုံနှိပ်ခြင်း',
    subtitle: 'Books Printing · Multi-Page Editions',
    subtitleMm: 'စာမျက်နှာစုံ စာအုပ်အမျိုးမျိုး',
    description:
      'Sharp interior typography, full-color covers, and durable binding for books, manuals, and educational publications.',
    descriptionMm:
      'ပညာရေးစာအုပ်များ၊ လမ်းညွှန်စာအုပ်များနှင့် စာပေထုတ်ဝေမှုများအတွက် အတွင်းစာသားနှင့် မျက်နှာဖုံးများကို သပ်ရပ်ခိုင်ခံ့စွာ ပုံနှိပ်ချုပ်လုပ်ပေးပါသည်။',
    inquiryType: 'Books Printing',
  },
  {
    id: 'deliv-vouchers',
    index: '02',
    icon: 'voucher-printing',
    title: 'Voucher, Receipt & Invoice Books',
    titleMm: 'ဘောင်ချာ၊ ပြေစာနှင့် ငွေတောင်းခံလွှာစာအုပ်များ',
    subtitle: 'Voucher Books Printing · Business Forms',
    subtitleMm: 'လုပ်ငန်းသုံး စာရင်းနှင့် ဘောင်ချာစာအုပ်များ',
    description:
      'Numbered, perforated, and multi-copy commercial voucher pads designed for daily retail, wholesale, and accounting records.',
    descriptionMm:
      'နေ့စဉ်လုပ်ငန်းသုံး ဘောင်ချာစာအုပ်များ၊ ပြေစာနှင့် ငွေတောင်းခံလွှာစာအုပ်များကို စာရင်းမှတ်တမ်းထားရှိရန် လွယ်ကူရှင်းလင်းသော ပုံစံဖြင့် ပုံနှိပ်ပေးပါသည်။',
    inquiryType: 'Voucher Books Printing',
  },
  {
    id: 'deliv-cards',
    index: '03',
    icon: 'business-cards',
    title: 'Business Cards & Corporate Stationery',
    titleMm: 'လိပ်စာကတ်နှင့် ရုံးသုံးပုံနှိပ်ပစ္စည်းများ',
    subtitle: 'Other Offset Printing · Brand Identity',
    subtitleMm: 'ကုမ္ပဏီအမှတ်တံဆိပ် ရုံးသုံးပုံနှိပ်လုပ်ငန်း',
    description:
      'Executive business cards, letterheads, envelopes, and office stationery printed with consistent corporate color accuracy.',
    descriptionMm:
      'ကုမ္ပဏီသုံး လိပ်စာကတ်များ (Business Cards)၊ ရုံးသုံးစာရွက်များနှင့် စာအိတ်များကို အရောင်အသွေး မှန်ကန်တိကျစွာဖြင့် ပုံနှိပ်ဆောင်ရွက်ပေးပါသည်။',
    inquiryType: 'Other Offset Printing Services',
  },
  {
    id: 'deliv-brochures',
    index: '04',
    icon: 'brochures-pamphlets',
    title: 'Brochures, Pamphlets & Catalogs',
    titleMm: 'လက်ကမ်းစာစောင်နှင့် ကုန်ပစ္စည်းကတ်တလောက်များ',
    subtitle: 'Other Offset Printing · Marketing Materials',
    subtitleMm: 'စီးပွားရေးနှင့် ကြော်ငြာပုံနှိပ်ပစ္စည်းများ',
    description:
      'Folded corporate brochures, product catalogs, flyers, and promotional handouts crafted for clear visual presentation.',
    descriptionMm:
      'လုပ်ငန်းမိတ်ဆက် လက်ကမ်းစာစောင်များ (Brochures & Pamphlets) နှင့် ကုန်ပစ္စည်းကတ်တလောက်များကို သပ်ရပ်လှပစွာ ပုံနှိပ်ပေးပါသည်။',
    inquiryType: 'Other Offset Printing Services',
  },
  {
    id: 'deliv-commercial',
    index: '05',
    icon: 'commercial-printing',
    title: 'Commercial & Administrative Forms',
    titleMm: 'စီးပွားရေးနှင့် ရုံးလုပ်ငန်းသုံး ပုံစံစာရွက်များ',
    subtitle: 'Other Offset Printing · B2B Operations',
    subtitleMm: 'လုပ်ငန်းသုံး ပုံစံစာရွက်အမျိုးမျိုး',
    description:
      'Custom-formatted logbooks, warehouse sheets, folders, and institutional print materials tailored to your workflow.',
    descriptionMm:
      'ကုန်고ဒေါင်သုံး စာရင်းစာအုပ်များ၊ ဖိုင်တွဲများနှင့် အဖွဲ့အစည်းသုံး ပုံစံစာရွက်အမျိုးမျိုးကို လုပ်ငန်းလိုအပ်ချက်အတိုင်း ပုံနှိပ်ပေးပါသည်။',
    inquiryType: 'Other Offset Printing Services',
  },
  {
    id: 'deliv-prepress',
    index: '06',
    icon: 'prepress-finishing',
    title: 'One-Stop Prepress to Finishing',
    titleMm: 'တစ်နေရာတည်းတွင် အပြီးအစီး ပုံနှိပ်ဝန်ဆောင်မှု',
    subtitle: 'End-to-End Offset Production · Yangon',
    subtitleMm: 'ကနဦးပြင်ဆင်မှုမှ စာအုပ်ချုပ်လုပ်ပြီးစီးသည်အထိ',
    description:
      'Coordinated layout verification, offset press runs, trimming, numbering, and binding managed under one roof.',
    descriptionMm:
      'ပုံနှိပ်မတိုင်မီ စာမျက်နှာစစ်ဆေးခြင်း၊ အော့ဖ်ဆက်စက်ဖြင့် ပုံနှိပ်ခြင်း၊ စက္ကူဖြတ်တောက်ခြင်းနှင့် စာအုပ်ချုပ်လုပ်ခြင်းတို့ကို တစ်နေရာတည်းတွင် ဆောင်ရွက်ပေးပါသည်။',
    inquiryType: 'Other Offset Printing Services',
  },
];

export const PrintingServicesPage: React.FC<PrintingServicesPageProps> = ({
  onNavigate,
  onInquireWithCategory,
}) => {
  const { isMm, t } = useLanguage();

  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Page Hero */}
      <HeroSection
        breadcrumbs={[
          { label: 'Home', route: '/' },
          { label: 'Printing Services & Stationery', route: '/printing-services' },
        ]}
        onNavigate={onNavigate}
        kicker="Division B · Printing Services & Stationery · Yangon, Myanmar"
        kickerMm="လုပ်ငန်းကဏ္ဍ (ခ) · အော့ဖ်ဆက် ပုံနှိပ်နှင့် စာရေးကိရိယာ လုပ်ငန်း · ရန်ကုန်မြို့"
        title="One-Stop Offset Printing Services & Stationery"
        titleMm="တစ်နေရာတည်းတွင် ပြီးပြည့်စုံသော အော့ဖ်ဆက် ပုံနှိပ်နှင့် စာရေးကိရိယာ ဝန်ဆောင်မှုများ"
        description="Established in 2013, TB Star Company Limited provides one-stop offset printing services for books, voucher books, and commercial printing needs alongside Ball Pen stationery supply (Klick: 30 pcs per box; Plano: 50 pcs per box)."
        descriptionMm="၂၀၁၃ ခုနှစ်တွင် စတင်တည်ထောင်ခဲ့သော TBStar Company Limited သည် စာအုပ်များ၊ ဘောင်ချာစာအုပ်များနှင့် အခြားအော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းများအပြင် Ball Pen (Klick တစ်ဘူး 30 pcs · Plano တစ်ဘူး 50 pcs) စာရေးကိရိယာများကိုပါ ဆောင်ရွက်ပေးလျက်ရှိပါသည်။"
        actions={
          <>
            <Button
              type="button"
              variant="primary-light"
              onClick={() => onInquireWithCategory('Books Printing', true)}
            >
              {t('Inquire About Books Printing', 'စာအုပ်ပုံနှိပ်လုပ်ငန်း မေးမြန်းရန်')}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline-light"
              onClick={() => onInquireWithCategory('Voucher Books Printing', true)}
            >
              {t('Inquire About Voucher Books', 'ဘောင်ချာစာအုပ် ပုံနှိပ်ရန် မေးမြန်းရန်')}
            </Button>
            <Button
              type="button"
              variant="outline-light"
              onClick={() => onInquireWithCategory('Ball Pen', true)}
            >
              {t('Inquire About Ball Pen', 'Ball Pen မေးမြန်းရန်')}
            </Button>
          </>
        }
      />

      {/* Quick Service Jump Bar with Custom SVG Icons */}
      <div className="bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#245C3A] mr-2">
              {t('Service Categories:', 'ပုံနှိပ်ဝန်ဆောင်မှု အမျိုးအစားများ -')}
            </span>
            {PRINTING_SERVICES.map((svc) => (
              <button
                key={svc.id}
                type="button"
                onClick={() => scrollToService(`service-${svc.id}`)}
                className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977]/40 text-[#173D2A] border border-[#DDE5D9] hover:border-[#245C3A] transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <PrintingServiceIcon type={svc.visualType} className="w-4 h-4 shrink-0" />
                <span>
                  {svc.index}. {isMm ? svc.nameMm : svc.name}
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollToService('product-ball-pen')}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#EAF5E4] hover:bg-[#A8D977]/50 text-[#173D2A] border border-[#C3E4B5] hover:border-[#245C3A] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <PrintingServiceIcon type="business-cards" className="w-4 h-4 shrink-0" />
              <span>
                {t('04. Ball Pen (Klick & Plano)', '၀၄။ ဘောပင် · Ball Pen (Klick & Plano)')}
              </span>
            </button>
          </div>

          <a
            href={COMPANY_INFO.telephoneHref}
            className="text-xs font-mono-tabular font-bold text-[#173D2A] hover:text-[#245C3A] inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#245C3A]" />
            {t('Printing Inquiries:', 'ပုံနှိပ်လုပ်ငန်း ဆက်သွယ်ရန် -')} {COMPANY_INFO.telephone}
          </a>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <section className="py-16 bg-[#F6F8F3] border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="One-Stop Offset Printing Overview"
            kickerMm="အော့ဖ်ဆက် ပုံနှိပ်လုပ်ငန်း အကျဉ်းချုပ်"
            title="Offset Printing Categories"
            titleMm="အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှု အမျိုးအစားများ"
            description="Select a service category below to review details or start an inquiry with your selected printing category pre-filled in our Contact form."
            descriptionMm="အောက်ပါ ပုံနှိပ်ဝန်ဆောင်မှု အမျိုးအစားများကို လေ့လာကြည့်ရှုနိုင်ပြီး လိုအပ်သည့် ဝန်ဆောင်မှုအလိုက် တိုက်ရိုက် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRINTING_SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onInquireService={(type) => onInquireWithCategory(type, true)}
                onViewDetails={() => scrollToService(`service-${service.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Visual Icon Hierarchy: Specialized Print Deliverables & Capabilities */}
      <section className="py-16 bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Print Deliverables & Production Scope"
            kickerMm="ပုံနှိပ်ထုတ်ကုန် အမျိုးအစားများနှင့် ဝန်ဆောင်မှုနယ်ပယ်"
            title="Complete Offset Printing Capabilities"
            titleMm="စုံလင်သော အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှု အမျိုးအစားများ"
            description="From bound books and numbered commercial voucher pads to business cards, corporate brochures, and administrative forms, we coordinate your print project from start to finish."
            descriptionMm="စာအုပ်များ၊ ဘောင်ချာစာအုပ်များမှစ၍ လိပ်စာကတ်များ၊ လက်ကမ်းစာစောင်များနှင့် ရုံးသုံးပုံစံစာရွက်များအထိ လုပ်ငန်းလိုအပ်ချက်အားလုံးကို တစ်နေရာတည်းတွင် စနစ်တကျ ပုံနှိပ်ဆောင်ရွက်ပေးပါသည်။"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINT_DELIVERABLE_HIGHLIGHTS.map((item) => (
              <article
                key={item.id}
                className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl p-6 flex flex-col justify-between hover:border-[#245C3A] transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-white border border-[#DDE5D9] flex items-center justify-center shrink-0">
                      <PrintingServiceIcon type={item.icon} className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono-tabular font-bold text-[#245C3A]">
                      {item.index}
                    </span>
                  </div>

                  <p className="text-xs text-[#245C3A] font-medium mb-1">
                    {isMm ? item.subtitleMm : item.subtitle}
                  </p>
                  <h3 className="text-lg font-bold text-[#173D2A] mb-2">
                    {isMm ? item.titleMm : item.title}
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                    {isMm ? item.descriptionMm : item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DDE5D9] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onInquireWithCategory(item.inquiryType, true)}
                    className="text-xs font-bold text-[#173D2A] hover:text-[#245C3A] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>
                      {t('Inquire About This Service', 'ဤဝန်ဆောင်မှုအတွက် မေးမြန်းရန်')}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#245C3A]" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Dedicated Sections for Each Printing Service */}
      {PRINTING_SERVICES.map((service, idx) => {
        const points = isMm ? service.scopePointsMm : service.scopePoints;
        return (
          <section
            key={service.id}
            id={`service-${service.id}`}
            className={`py-20 border-b border-[#DDE5D9] ${
              idx % 2 === 0 ? 'bg-[#F6F8F3]' : 'bg-white'
            }`}
          >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div
                  className={`lg:col-span-5 ${
                    idx % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <VisualAssetFrame
                    type={service.visualType}
                    imagePath={service.imagePath}
                    aspectClassName="aspect-[4/3]"
                    label={isMm && service.placeholderNoteMm ? service.placeholderNoteMm : service.placeholderNote}
                  />
                </div>

                <div
                  className={`lg:col-span-7 ${
                    idx % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-white border border-[#DDE5D9] flex items-center justify-center shrink-0">
                      <PrintingServiceIcon type={service.visualType} className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold">
                        {isMm
                          ? `ဝန်ဆောင်မှု ${service.index} · ${service.categoryMm}`
                          : `SERVICE ${service.index} · ${service.category.toUpperCase()}`}
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#173D2A]">
                        {isMm ? service.nameMm : service.name}
                      </h2>
                    </div>
                  </div>

                  <p className="text-base text-[#26332B]/85 leading-relaxed mb-6">
                    {isMm ? service.detailedDescriptionMm : service.detailedDescription}
                  </p>

                  <div className="bg-white border border-[#DDE5D9] rounded-xl p-5 mb-6">
                    <p className="text-xs font-semibold text-[#173D2A] mb-3">
                      {t(
                        'Service Highlights & Coordination Scope:',
                        'ဝန်ဆောင်မှုဆိုင်ရာ အဓိကအချက်များ -'
                      )}
                    </p>
                    <ul className="space-y-2.5 text-sm text-[#26332B]/90">
                      {points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      type="button"
                      variant="primary-dark"
                      onClick={() => onInquireWithCategory(service.inquiryType, true)}
                    >
                      {isMm
                        ? `${service.nameMm} မေးမြန်းရန်`
                        : `Inquire About ${service.name}`}
                      <ArrowRight className="w-4 h-4 text-[#A8D977]" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline-dark"
                      onClick={() => onInquireWithCategory(service.inquiryType, false)}
                    >
                      {t('Quick Inquiry Modal', 'အမြန် မေးမြန်းရန်')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Dedicated Stationery Section: Ball Pen Specifications (Klick & Plano) */}
      <section
        id="product-ball-pen"
        aria-labelledby="ball-pen-heading"
        className="py-20 bg-white border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Printing Services & Stationery · Product Specifications"
            kickerMm="ပုံနှိပ်နှင့် စာရေးကိရိယာ ကဏ္ဍ · ကုန်ပစ္စည်း စံချိန်စံညွှန်းများ"
            title="Stationery Product — Ball Pen (Klick & Plano)"
            titleMm="စာရေးကိရိယာ ထုတ်ကုန် — ဘောပင် · Ball Pen (Klick နှင့် Plano)"
            description="Review our available Ball Pen types and box packaging quantities supplied under our Printing Services & Stationery division."
            descriptionMm="ပုံနှိပ်နှင့် စာရေးကိရိယာ လုပ်ငန်းကဏ္ဍအောက်မှ ဖြန့်ဖြူးပေးလျက်ရှိသော Ball Pen အမျိုးအစားများ (Klick နှင့် Plano) နှင့် တစ်ဘူးချင်း ထုပ်ပိုးမှုစံနှုန်းများကို လေ့လာနိုင်ပါသည်။"
            action={
              <Button
                type="button"
                variant="primary-dark"
                size="sm"
                href="/contact?inquiry=Ball%20Pen"
                onClick={() => onInquireWithCategory('Ball Pen', true)}
              >
                {t('Inquire About Ball Pen', 'Ball Pen မှာယူရန် မေးမြန်းရန်')}
                <ArrowRight className="w-3.5 h-3.5 text-[#A8D977]" />
              </Button>
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Official 16:9 Ball Pen Branding Images & Product Overview Card */}
            <div className="lg:col-span-5 space-y-5">
              {/* Primary Ball Pen Packaging Showcase (Klick & Plano Box Packaging) */}
              <div className="rounded-xl overflow-hidden border border-[#DDE5D9] bg-[#F7F3E8] shadow-2xs">
                <VisualAssetFrame
                  type={BALL_PEN_PRODUCT.visualType}
                  imagePath={BALL_PEN_PRODUCT.imagePath}
                  altText={BALL_PEN_PRODUCT.imageAlt}
                  aspectClassName="aspect-[16/9]"
                  label={
                    isMm && BALL_PEN_PRODUCT.placeholderNoteMm
                      ? BALL_PEN_PRODUCT.placeholderNoteMm
                      : BALL_PEN_PRODUCT.placeholderNote
                  }
                />
              </div>

              {/* Secondary Ball Pen Design Showcase (Klick Box & Plano Pen Designs) */}
              {BALL_PEN_PRODUCT.secondaryImagePath && (
                <div className="rounded-xl overflow-hidden border border-[#DDE5D9] bg-[#F7F3E8] shadow-2xs">
                  <VisualAssetFrame
                    type={BALL_PEN_PRODUCT.visualType}
                    imagePath={BALL_PEN_PRODUCT.secondaryImagePath}
                    altText={BALL_PEN_PRODUCT.secondaryImageAlt}
                    aspectClassName="aspect-[16/9]"
                    label={t(
                      'Klick (30 pcs per box) & Plano (50 pcs per box) Pen Showcase',
                      'Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs) ဘောပင် ဒီဇိုင်းပြခန်း'
                    )}
                  />
                </div>
              )}

              <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl p-6 shadow-2xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-lg bg-white border border-[#DDE5D9] flex items-center justify-center shrink-0">
                    <PrintingServiceIcon type="business-cards" className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold">
                      {t(
                        `STATIONERY ${BALL_PEN_PRODUCT.index} · PRINTING & STATIONERY`,
                        `စာရေးကိရိယာ ${BALL_PEN_PRODUCT.index} · ပုံနှိပ်နှင့် စာရေးကိရိယာ`
                      )}
                    </p>
                    <h3 id="ball-pen-heading" className="text-2xl font-bold text-[#173D2A]">
                      {isMm ? BALL_PEN_PRODUCT.nameMm : BALL_PEN_PRODUCT.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                  {isMm
                    ? BALL_PEN_PRODUCT.detailedDescriptionMm
                    : BALL_PEN_PRODUCT.detailedDescription}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant="primary-dark"
                    href="/contact?inquiry=Ball%20Pen"
                    onClick={() => onInquireWithCategory('Ball Pen', true)}
                  >
                    {t('Inquire About Ball Pen', 'Ball Pen မေးမြန်းရန်')}
                    <ArrowRight className="w-4 h-4 text-[#A8D977]" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline-dark"
                    onClick={() => onInquireWithCategory('Ball Pen', false)}
                  >
                    {t('Quick Inquiry Modal', 'အမြန် မေးမြန်းရန်')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Distinct Variant Cards (Klick & Plano) + Technical Specification Table */}
            <div className="lg:col-span-7 space-y-6">
              {/* Distinct Product Types / Variants Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {BALL_PEN_PRODUCT.variants.map((variant, vIdx) => (
                  <article
                    key={variant.type}
                    className="bg-[#F6F8F3] border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl p-6 flex flex-col justify-between transition-colors shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-mono-tabular font-bold px-2.5 py-1 rounded bg-[#EAF5E4] text-[#173D2A] border border-[#C3E4B5]">
                          {t(`TYPE 0${vIdx + 1} · BALL PEN`, `အမျိုးအစား ၀${vIdx + 1} · BALL PEN`)}
                        </span>
                        <span className="text-xs font-mono-tabular font-semibold text-[#245C3A]">
                          {isMm ? variant.packagingMm : variant.packaging}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-[#173D2A] mb-2">
                        {isMm ? `Ball Pen — ${variant.typeMm}` : `Ball Pen — ${variant.type}`}
                      </h4>

                      <dl className="mt-4 pt-3 border-t border-[#DDE5D9] space-y-2 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <dt className="text-[#26332B]/75 font-medium">
                            {t('Product', 'ကုန်ပစ္စည်း')}
                          </dt>
                          <dd className="font-bold text-[#173D2A]">
                            {isMm ? BALL_PEN_PRODUCT.nameMm : BALL_PEN_PRODUCT.name}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <dt className="text-[#26332B]/75 font-medium">
                            {t('Type', 'အမျိုးအစား')}
                          </dt>
                          <dd className="font-bold text-[#173D2A]">
                            {isMm ? variant.typeMm : variant.type}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <dt className="text-[#26332B]/75 font-medium">
                            {t('Packaging', 'ထုပ်ပိုးမှုပုံစံ')}
                          </dt>
                          <dd className="font-mono-tabular font-bold text-[#245C3A]">
                            {isMm ? variant.packagingMm : variant.packaging}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#DDE5D9]">
                      <button
                        type="button"
                        onClick={() => onInquireWithCategory('Ball Pen', true)}
                        className="text-xs font-bold text-[#173D2A] hover:text-[#245C3A] inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>
                          {t(
                            `Inquire: ${variant.type} (${variant.packaging})`,
                            `${variant.type} (${variant.packaging}) မေးမြန်းရန်`
                          )}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#245C3A]" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <ProductSpecificationTable
                title="Ball Pen — Product Specification Table"
                titleMm="ဘောပင် (Ball Pen) — အသေးစိတ် စံချိန်စံညွှန်းဇယား"
                subtitle="STATIONERY SPECIFICATIONS · KLICK (30 PCS/BOX) & PLANO (50 PCS/BOX)"
                subtitleMm="စာရေးကိရိယာ စံချိန်စံညွှန်းများ · KLICK (တစ်ဘူး 30 PCS) နှင့် PLANO (တစ်ဘူး 50 PCS)"
                specifications={BALL_PEN_PRODUCT.specifications}
                onInquire={() => onInquireWithCategory('Ball Pen', true)}
                inquireLabel="Inquire: Ball Pen"
                inquireLabelMm="Ball Pen မေးမြန်းရန်"
              />
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
