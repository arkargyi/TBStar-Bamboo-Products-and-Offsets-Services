import React from 'react';
import {
  ArrowRight,
  Check,
  Compass,
  Globe2,
  Handshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Target,
} from 'lucide-react';
import {
  BUSINESS_PARTNERS_COLLABORATION,
  COMPANY_INFO,
  COMPANY_VISION_MISSION,
  EXPORT_AND_DOMESTIC_MARKETS,
  InquiryTypeOption,
  PageRoute,
  PROPOSED_CORPORATE_VALUES,
} from '../constants/companyData';
import { VisualAssetFrame } from '../components/VisualAssetFrame';
import { Button, HeroSection, SectionHeading } from '../components/SharedUI';
import { ContactCTA } from '../components/CatalogComponents';
import { BambooProductIcon, PrintingServiceIcon } from '../components/PrintingIcons';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onInquireWithCategory,
}) => {
  const { isMm, t } = useLanguage();

  return (
    <div>
      {/* Page Hero with Breadcrumbs */}
      <HeroSection
        breadcrumbs={[
          { label: 'Home', route: '/' },
          { label: 'About Us', route: '/about' },
        ]}
        onNavigate={onNavigate}
        kicker="Corporate Profile · Established in 2013 · Yangon, Myanmar"
        kickerMm="ကုမ္ပဏီအချက်အလက် · ၂၀၁၃ ခုနှစ်တွင် တည်ထောင်သည် · ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ"
        title={`About ${COMPANY_INFO.name}`}
        titleMm="TBStar Company Limited အကြောင်း"
        description="Established in 2013, TB Star Company Limited has been operating in Myanmar, serving domestic customers and international buyers through its bamboo products and printing services businesses."
        descriptionMm="၂၀၁၃ ခုနှစ်တွင် စတင်တည်ထောင်ခဲ့သော TBStar Company Limited သည် မြန်မာနိုင်ငံတွင် သဘာဝဝါးထုတ်ကုန် ထုတ်လုပ်တင်ပို့ခြင်းလုပ်ငန်းနှင့် တစ်နေရာတည်းတွင် အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုလုပ်ငန်းတို့ဖြင့် ပြည်တွင်းနှင့် နိုင်ငံတကာဝယ်ယူသူများအား ဝန်ဆောင်မှုပေးလျက်ရှိပါသည်။"
        actions={
          <>
            <Button
              type="button"
              variant="primary-light"
              href="/bamboo-products"
              onClick={() => onNavigate('/bamboo-products')}
            >
              {t('View Bamboo Products', 'ဝါးထုတ်ကုန်များ ကြည့်ရှုရန်')}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline-light"
              href="/printing-services"
              onClick={() => onNavigate('/printing-services')}
            >
              {t('Offset Printing Services', 'အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှုများ')}
            </Button>
          </>
        }
      />

      {/* Section 1: Company Introduction & Official Profile Card */}
      <section className="py-20 bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium text-[#245C3A] mb-2">
                {t(
                  '01. Company Introduction & Business Overview · Est. 2013',
                  '၀၁။ ကုမ္ပဏီမိတ်ဆက်နှင့် လုပ်ငန်းအကျဉ်းချုပ် · ၂၀၁၃ ခုနှစ်တွင် တည်ထောင်သည်'
                )}
              </p>
              <h2
                className="text-2xl sm:text-4xl font-bold text-[#173D2A] tracking-tight mb-6"
                style={{ textWrap: 'balance' }}
              >
                {t(
                  'Serving Myanmar & International Buyers Since 2013',
                  '၂၀၁၃ ခုနှစ်မှစတင်၍ သဘာဝဝါးထုတ်ကုန်နှင့် ပုံနှိပ်ဝန်ဆောင်မှုများ ဆောင်ရွက်နေသော ကုမ္ပဏီ'
                )}
              </h2>

              <div className="space-y-4 text-base text-[#26332B]/90 leading-relaxed">
                <p>
                  {isMm ? (
                    <>
                      ၂၀၁၃ ခုနှစ်တွင် စတင်တည်ထောင်ခဲ့သော <strong>TBStar Company Limited</strong> သည် မြန်မာနိုင်ငံတွင် သဘာဝဝါးထုတ်ကုန်လုပ်ငန်းနှင့် ပုံနှိပ်ဝန်ဆောင်မှုလုပ်ငန်းများဖြင့် ဝယ်ယူသူများအား စဉ်ဆက်မပြတ် ဝန်ဆောင်မှုပေးလျက်ရှိပြီး ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်ရှိ Central Tower၊ (၁၁) လွှာ၊ အခန်းအမှတ် (၁၁၀၃) တွင် ရုံးချုပ်ဖွင့်လှစ်ထားပါသည်။
                    </>
                  ) : (
                    <>
                      Established in 2013, <strong>{COMPANY_INFO.name}</strong> has been operating in Myanmar, serving customers through its bamboo products and printing services businesses from its corporate headquarters at Central Tower, Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon, Myanmar.
                    </>
                  )}
                </p>
                <p>
                  {t(
                    'With long-term operational continuity since 2013, our company is structured into two specialized business divisions so that international buyers, wholesalers, and commercial partners receive dedicated support:',
                    '၂၀၁၃ ခုနှစ်မှစတင်၍ ရေရှည်လုပ်ငန်းအတွေ့အကြုံများဖြင့် ပြည်တွင်းနှင့် နိုင်ငံတကာမှ ဝယ်ယူသူများ၊ လက်ကားဖြန့်ချိသူများနှင့် စီးပွားရေးမိတ်ဖက်များအား စနစ်တကျ ဝန်ဆောင်မှုပေးနိုင်ရန် အောက်ပါ အဓိက စီးပွားရေးလုပ်ငန်းကဏ္ဍကြီး (၂) ခုဖြင့် ဖွဲ့စည်းဆောင်ရွက်လျက်ရှိပါသည် -'
                  )}
                </p>
                <ul className="space-y-4 pt-2">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#245C3A] shrink-0 mt-0.5" />
                    <div>
                      {isMm ? (
                        <p>
                          <strong>စီးပွားရေးလုပ်ငန်းကဏ္ဍ (က) — ဝါးထုတ်ကုန် ထုတ်လုပ်ရေးနှင့် ပြည်ပပို့ကုန်လုပ်ငန်း -</strong> မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးစစ်စစ်ဖြင့် ဝါးခြမ်းပြား (Bamboo Split · အဆစ်ပါ တစ်စည်း ၅၀ ချောင်း / အဆစ်မပါ တစ်စည်း ၁၀၀ ချောင်း) နှင့် ဝါးတံ (Bamboo Sticks · တစ်အိတ် 30 kg) များကို ထုတ်လုပ်ပြီး ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် နိုင်ငံတကာစျေးကွက်သို့ တင်ပို့ရောင်းချခြင်း။
                        </p>
                      ) : (
                        <p>
                          <strong>Business Division A — Bamboo Production and Export:</strong> Manufacturing 100% natural Myanmar bamboo products—specifically Bamboo Split (With Nodes: 50 pieces per bundle; Without Nodes: 100 pieces per bundle) and Bamboo Sticks (30 kg per bag)—for international export and domestic distribution within Myanmar.
                        </p>
                      )}
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#245C3A] shrink-0 mt-0.5" />
                    <div>
                      {isMm ? (
                        <p>
                          <strong>စီးပွားရေးလုပ်ငန်းကဏ္ဍ (ခ) — အော့ဖ်ဆက် ပုံနှိပ်နှင့် စာရေးကိရိယာ ဝန်ဆောင်မှုလုပ်ငန်း -</strong> စာအုပ်ပုံနှိပ်ခြင်း (Books Printing)၊ ဘောင်ချာစာအုပ်ပုံနှိပ်ခြင်း (Voucher Books Printing) နှင့် အခြားအော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းများအပြင် Ball Pen (Klick: တစ်ဘူး 30 pcs · Plano: တစ်ဘူး 50 pcs) စာရေးကိရိယာ ဖြန့်ဖြူးရေးကို ဆောင်ရွက်ပေးခြင်း။
                        </p>
                      ) : (
                        <p>
                          <strong>Business Division B — Printing Services & Stationery:</strong> Providing one-stop offset printing services covering Books Printing, Voucher Books Printing, and commercial offset printing alongside wholesale Ball Pen stationery supply (Klick: 30 pcs per box; Plano: 50 pcs per box).
                        </p>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Official Corporate Profile Card */}
            <div className="lg:col-span-5 bg-[#F6F8F3] border border-[#DDE5D9] rounded-2xl p-6 md:p-8 shadow-2xs">
              <div className="flex items-center gap-4 pb-5 mb-5 border-b border-[#DDE5D9]">
                <img
                  src={COMPANY_INFO.logoPath}
                  alt="TB Star Company Limited Official Logo"
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-contain bg-white p-1 border border-[#DDE5D9] shrink-0"
                />
                <div>
                  <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold">
                    {t('OFFICIAL CORPORATE INFORMATION', 'တရားဝင် ကုမ္ပဏီအချက်အလက်များ')}
                  </p>
                  <h3 className="text-lg font-bold text-[#173D2A]">
                    {t(COMPANY_INFO.name, 'TBStar Company Limited')}
                  </h3>
                </div>
              </div>

              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs text-[#26332B]/70 font-medium">
                    {t('Company Name', 'ကုမ္ပဏီအမည်')}
                  </dt>
                  <dd className="text-[#173D2A] font-bold mt-0.5">
                    {t(COMPANY_INFO.name, COMPANY_INFO.nameMm)}
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#DDE5D9] flex items-center justify-between">
                  <dt className="text-xs text-[#26332B]/70 font-medium">
                    {t('Established Year', 'စတင်တည်ထောင်သည့်နှစ်')}
                  </dt>
                  <dd className="font-mono-tabular font-bold text-[#173D2A]">
                    {t('2013', '၂၀၁၃ ခုနှစ်')}
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#DDE5D9]">
                  <dt className="text-xs text-[#26332B]/70 font-medium">
                    {t('Office Address', 'ရုံးချုပ်လိပ်စာ')}
                  </dt>
                  <dd className="text-[#173D2A] font-medium mt-0.5 leading-snug">
                    {t(COMPANY_INFO.address.full, COMPANY_INFO.address.fullMm)}
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#DDE5D9] flex items-center justify-between">
                  <dt className="text-xs text-[#26332B]/70 font-medium">
                    {t('Phone & WhatsApp', 'ဖုန်း နှင့် WhatsApp')}
                  </dt>
                  <dd className="font-mono-tabular font-bold text-[#173D2A]">
                    <a href={COMPANY_INFO.telephoneHref} className="hover:underline">
                      {COMPANY_INFO.telephone}
                    </a>
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#DDE5D9] flex items-center justify-between">
                  <dt className="text-xs text-[#26332B]/70 font-medium">
                    {t('Corporate Email', 'အီးမေးလ်လိပ်စာ')}
                  </dt>
                  <dd className="font-mono-tabular font-semibold text-[#245C3A]">
                    <a href={COMPANY_INFO.emailHref} className="hover:underline">
                      {COMPANY_INFO.email}
                    </a>
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#DDE5D9] flex items-center justify-between">
                  <dt className="text-xs text-[#26332B]/70 font-medium">
                    {t('Corporate Domain', 'ဝဘ်ဆိုက်ဒိုမိန်း')}
                  </dt>
                  <dd className="font-mono-tabular font-semibold text-[#245C3A]">
                    {COMPANY_INFO.domain}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Corporate Vision & Mission */}
      <section
        id="vision-mission"
        aria-label="Corporate Vision and Mission"
        className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="02. Corporate Direction · Vision & Mission"
            kickerMm="၀၂။ ကုမ္ပဏီ၏ ဦးတည်ချက် · မျှော်မှန်းချက်နှင့် ရည်မှန်းချက်"
            title="Our Corporate Vision & Mission"
            titleMm="ကုမ္ပဏီ၏ မျှော်မှန်းချက် (Vision) နှင့် ရည်မှန်းချက် (Mission)"
            description="Driving sustainable Myanmar bamboo manufacturing and dependable one-stop commercial offset printing services."
            descriptionMm="မြန်မာ့သဘာဝဝါးထုတ်ကုန်များကို နိုင်ငံတကာစံချိန်မီ တင်ပို့ဖြန့်ဖြူးရန်နှင့် ယုံကြည်စိတ်ချရသော One-Stop အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှု ပေးအပ်ရန် ချမှတ်ထားသော ဦးတည်ချက်များ။"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Vision Card */}
            <div className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-2xs transition-colors">
              <div>
                <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-[#DDE5D9]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#EAF5E4] border border-[#C3E4B5] text-[#173D2A] flex items-center justify-center shrink-0">
                      <Compass className="w-6 h-6 text-[#245C3A]" />
                    </div>
                    <div>
                      <p className="text-xs font-mono-tabular font-semibold text-[#245C3A]">
                        {COMPANY_VISION_MISSION.vision.kicker}
                      </p>
                      <h3 className="text-2xl font-bold text-[#173D2A]">
                        {isMm
                          ? COMPANY_VISION_MISSION.vision.titleMm
                          : COMPANY_VISION_MISSION.vision.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono-tabular font-bold text-[#245C3A] bg-[#F6F8F3] px-2.5 py-1 rounded border border-[#DDE5D9]">
                    VISION
                  </span>
                </div>

                <p className="text-base text-[#173D2A] font-medium leading-relaxed mb-6">
                  {isMm
                    ? COMPANY_VISION_MISSION.vision.statementMm
                    : COMPANY_VISION_MISSION.vision.statement}
                </p>

                <ul className="space-y-3 text-sm text-[#26332B]/90">
                  {(isMm
                    ? COMPANY_VISION_MISSION.vision.highlightsMm
                    : COMPANY_VISION_MISSION.vision.highlights
                  ).map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-[#173D2A] text-white border border-[#245C3A] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-white/15">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-[#A8D977] flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-[#A8D977]" />
                    </div>
                    <div>
                      <p className="text-xs font-mono-tabular font-semibold text-[#A8D977]">
                        {COMPANY_VISION_MISSION.mission.kicker}
                      </p>
                      <h3 className="text-2xl font-bold text-white">
                        {isMm
                          ? COMPANY_VISION_MISSION.mission.titleMm
                          : COMPANY_VISION_MISSION.mission.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono-tabular font-bold text-[#173D2A] bg-[#A8D977] px-2.5 py-1 rounded">
                    MISSION
                  </span>
                </div>

                <p className="text-base text-white/95 font-medium leading-relaxed mb-6">
                  {isMm
                    ? COMPANY_VISION_MISSION.mission.statementMm
                    : COMPANY_VISION_MISSION.mission.statement}
                </p>

                <ul className="space-y-3 text-sm text-white/85">
                  {(isMm
                    ? COMPANY_VISION_MISSION.mission.highlightsMm
                    : COMPANY_VISION_MISSION.mission.highlights
                  ).map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#A8D977] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Detailed Breakdown of Core Business Activities */}
      <section className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="02. Operational Scope"
            kickerMm="၀၂။ လုပ်ငန်းဆောင်ရွက်မှု နယ်ပယ်"
            title="Core Business Activities & Market Coverage"
            titleMm="အဓိက လုပ်ငန်းဆောင်ရွက်မှုများနှင့် စျေးကွက်ဖြန့်ကျက်မှု"
            description="An organized breakdown of our manufacturing, domestic distribution, export, and commercial offset printing activities."
            descriptionMm="သဘာဝဝါးထုတ်ကုန် ထုတ်လုပ်ခြင်း၊ ပြည်တွင်းဖြန့်ဖြူးခြင်း၊ ပြည်ပတင်ပို့ခြင်းနှင့် အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းများကို ကဏ္ဍအလိုက် စနစ်တကျ ဆောင်ရွက်ပေးလျက်ရှိပါသည်။"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Activity 1: Bamboo Production & International Export */}
            <div className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl overflow-hidden flex flex-col justify-between shadow-2xs transition-colors">
              <div>
                <VisualAssetFrame
                  type="bamboo-split"
                  imagePath="/images/products/bamboo-split-wholesale.webp"
                  altText="Bamboo splits arranged for commercial supply"
                  aspectClassName="aspect-[16/10]"
                  label={t(
                    '100% Natural Myanmar Bamboo · Production & Export',
                    '၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန် · ထုတ်လုပ်ရေးနှင့် ပြည်ပပို့ကုန်'
                  )}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-11 h-11 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9] flex items-center justify-center shrink-0">
                      <BambooProductIcon type="bamboo-split" className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono-tabular font-bold text-[#245C3A]">01</span>
                  </div>
                  <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                    {t('DIVISION A · PRODUCTION & EXPORT', 'လုပ်ငန်းကဏ္ဍ (က) · ထုတ်လုပ်ရေးနှင့် ပို့ကုန်')}
                  </p>
                  <h3 className="text-xl font-bold text-[#173D2A] mb-3">
                    {t(
                      'Bamboo Production & Export Activities',
                      'ဝါးထုတ်ကုန် ထုတ်လုပ်ခြင်းနှင့် ပြည်ပတင်ပို့ခြင်း'
                    )}
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed">
                    {t(
                      'We manufacture 100% natural bamboo products originating in Myanmar—featuring Bamboo Split (With Nodes: 50 pieces per bundle; Without Nodes: 100 pieces per bundle) and Bamboo Sticks (1.2 mm to 2.5 mm, 8"/9"/10", packed at 30 kg per bag)—prepared for international export markets.',
                      'မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးစစ်စစ်ဖြင့် ဝါးခြမ်းပြားများ (အဆစ်ပါ တစ်စည်း 50 pcs · အဆစ်မပါ တစ်စည်း 100 pcs) နှင့် တစ်အိတ်လျှင် 30 kg ထုပ်ပိုးထားသော ဝါးတံများ (၈"၊ ၉"၊ ၁၀") ကို နိုင်ငံတကာ ပို့ကုန်စျေးကွက်သို့ တင်ပို့ရောင်းချပေးလျက်ရှိပါသည်။'
                    )}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Button
                  type="button"
                  variant="outline-dark"
                  size="sm"
                  href="/bamboo-products"
                  className="w-full"
                  onClick={() => onNavigate('/bamboo-products')}
                >
                  {t('Inspect Bamboo Specifications', 'ဝါးထုတ်ကုန် စံချိန်စံညွှန်း ကြည့်ရှုရန်')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Activity 2: Domestic Distribution in Myanmar */}
            <div className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl overflow-hidden flex flex-col justify-between shadow-2xs transition-colors">
              <div>
                <VisualAssetFrame
                  type="bamboo-sticks"
                  imagePath="/images/products/bamboo-sticks-wholesale.webp"
                  altText="Bamboo sticks prepared for commercial supply"
                  aspectClassName="aspect-[16/10]"
                  label={t(
                    '30KG Export & Wholesale Bag Packaging · Domestic Supply',
                    'တစ်အိတ် 30KG စံချိန်မီ ထုပ်ပိုးမှု · ပြည်တွင်းဖြန့်ဖြူးရေး'
                  )}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-11 h-11 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9] flex items-center justify-center shrink-0">
                      <BambooProductIcon type="bamboo-sticks" className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono-tabular font-bold text-[#245C3A]">02</span>
                  </div>
                  <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                    {t('DOMESTIC SUPPLY · MYANMAR MARKET', 'ပြည်တွင်းဖြန့်ဖြူးရေး · မြန်မာ့စျေးကွက်')}
                  </p>
                  <h3 className="text-xl font-bold text-[#173D2A] mb-3">
                    {t(
                      'Domestic Distribution Activities',
                      'မြန်မာနိုင်ငံ ပြည်တွင်းစျေးကွက်သို့ ဖြန့်ဖြူးပေးခြင်း'
                    )}
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed">
                    {t(
                      `Alongside international export, ${COMPANY_INFO.name} distributes Bamboo Split and Bamboo Sticks locally within Myanmar, providing reliable supply to domestic commercial buyers, agricultural users, and industrial customers from our Yangon office.`,
                      'နိုင်ငံတကာသို့ တင်ပို့ရုံသာမက မြန်မာနိုင်ငံ ပြည်တွင်းစျေးကွက်ရှိ လုပ်ငန်းရှင်များနှင့် ဝယ်ယူသူများအတွက်လည်း အရည်အသွေးမီ ဝါးခြမ်းပြားနှင့် ဝါးတံပစ္စည်းများကို ရန်ကုန်ရုံးချုပ်မှတစ်ဆင့် ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။'
                    )}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Button
                  type="button"
                  variant="outline-dark"
                  size="sm"
                  href="/contact?inquiry=Bamboo%20Split"
                  className="w-full"
                  onClick={() => onInquireWithCategory('Bamboo Split', true)}
                >
                  {t('Inquire About Domestic Supply', 'ပြည်တွင်းဖြန့်ဖြူးရေး မေးမြန်းရန်')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Activity 3: One-Stop Offset Printing Services */}
            <div className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl overflow-hidden flex flex-col justify-between shadow-2xs transition-colors">
              <div>
                <VisualAssetFrame
                  type="books-printing"
                  aspectClassName="aspect-[16/10]"
                  label={t(
                    'One-Stop Offset Printing · Books & Voucher Books',
                    'တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း'
                  )}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-11 h-11 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9] flex items-center justify-center shrink-0">
                      <PrintingServiceIcon type="books-printing" className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono-tabular font-bold text-[#245C3A]">03</span>
                  </div>
                  <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                    {t('DIVISION B · COMMERCIAL PRESS', 'လုပ်ငန်းကဏ္ဍ (ခ) · အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း')}
                  </p>
                  <h3 className="text-xl font-bold text-[#173D2A] mb-3">
                    {t(
                      'One-Stop Offset Printing Services',
                      'တစ်နေရာတည်းတွင် အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှု'
                    )}
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed">
                    {t(
                      'Our Offset Printing Services division provides one-stop printing solutions for Books Printing, Voucher Books Printing, and other offset printing services—supporting businesses, publishers, and organizations in Yangon.',
                      'စာအုပ်ပုံနှိပ်ခြင်း၊ လုပ်ငန်းသုံး ဘောင်ချာစာအုပ်ပုံနှိပ်ခြင်းနှင့် အခြားအော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းများကို တစ်နေရာတည်းတွင် အပြီးအစီး တာဝန်ယူ ဆောင်ရွက်ပေးလျက်ရှိပါသည်။'
                    )}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Button
                  type="button"
                  variant="outline-dark"
                  size="sm"
                  href="/printing-services"
                  className="w-full"
                  onClick={() => onNavigate('/printing-services')}
                >
                  {t('Explore Offset Printing Services', 'ပုံနှိပ်ဝန်ဆောင်မှုများ လေ့လာရန်')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Core Corporate Values */}
      <section className="py-20 bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="03. Operating Principles · Corporate Commitment"
            kickerMm="၀၃။ လုပ်ငန်းဆောင်ရွက်မှု မူဝါဒများ · ကုမ္ပဏီ၏ စံနှုန်းများ"
            title="Our Core Corporate Values"
            titleMm="ကုမ္ပဏီ၏ အဓိက လုပ်ငန်းဆောင်ရွက်မှု စံနှုန်းများ"
            description="Guided by clear product specifications, responsive B2B coordination in Yangon, and commitment to natural material and print quality."
            descriptionMm="တိကျရှင်းလင်းသော ကုန်ပစ္စည်းစံချိန်စံညွှန်းများ၊ ယုံကြည်စိတ်ချရသော လုပ်ငန်းချိတ်ဆက်ဆောင်ရွက်မှုနှင့် အရည်အသွေးမီ ထုတ်လုပ်မှုတို့ကို အလေးထား ဆောင်ရွက်ပါသည်။"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROPOSED_CORPORATE_VALUES.map((val, idx) => (
              <div
                key={val.index}
                className="bg-[#F6F8F3] border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-white border border-[#DDE5D9] flex items-center justify-center shrink-0">
                      {idx === 0 ? (
                        <BambooProductIcon type="bamboo-split" className="w-6 h-6" />
                      ) : idx === 1 ? (
                        <BambooProductIcon type="bamboo-custom" className="w-6 h-6" />
                      ) : (
                        <PrintingServiceIcon type="prepress-finishing" className="w-6 h-6" />
                      )}
                    </div>
                    <span className="font-mono-tabular font-bold text-sm text-[#245C3A]">
                      {val.index}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#173D2A] mb-2.5">
                    {isMm ? val.titleMm : val.title}
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed">
                    {isMm ? val.descriptionMm : val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Office Contact Banner */}
          <div className="mt-12 bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#245C3A] shrink-0 mt-1" />
              <div>
                <h3 className="text-base font-bold text-[#173D2A] mb-1">
                  {t('Visit or Contact Our Yangon Office', 'ရန်ကုန်ရုံးချုပ် လိပ်စာ')}
                </h3>
                <p className="text-sm text-[#26332B]/85">
                  {t(COMPANY_INFO.address.full, COMPANY_INFO.address.fullMm)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={COMPANY_INFO.telephoneHref}
                className="px-4 py-2.5 bg-[#173D2A] hover:bg-[#245C3A] text-white text-xs font-semibold rounded-lg inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#A8D977]" />
                {COMPANY_INFO.telephone}
              </a>
              <a
                href={COMPANY_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-bold rounded-lg inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <Button
                type="button"
                variant="outline-dark"
                size="sm"
                href="/contact"
                onClick={() => onNavigate('/contact')}
              >
                {t('Open Contact Form', 'ဆက်သွယ်ရန် ဖောင်ဖွင့်ရန်')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Business Partners & Collaboration */}
      <section
        id="business-partners"
        aria-label="Business Partners and Collaboration"
        className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="05. Business Partners & B2B Collaboration"
            kickerMm="၀၅။ လုပ်ငန်းမိတ်ဖက်များနှင့် ပူးပေါင်းဆောင်ရွက်မှု"
            title="Long-Term Partnerships Across Export, Distribution & Printing"
            titleMm="လုပ်ငန်းမိတ်ဖက်များနှင့် ရေရှည်လက်တွဲ ပူးပေါင်းဆောင်ရွက်မှု"
            description="We build dependable B2B partnerships with international bamboo importers, domestic wholesalers, agricultural enterprises, and corporate printing clients."
            descriptionMm="နိုင်ငံတကာ ဝါးပို့ကုန်ဝယ်ယူသူများ၊ ပြည်တွင်းလက်ကားဖြန့်ချိရေးလုပ်ငန်းများ၊ စိုက်ပျိုးရေးနှင့် စက်မှုလုပ်ငန်းများ၊ စာပေထုတ်ဝေရေးနှင့် ကုမ္ပဏီများနှင့် ရေရှည်မိတ်ဖက်အဖြစ် ပူးပေါင်းဆောင်ရွက်လျက်ရှိပါသည်။"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
            {BUSINESS_PARTNERS_COLLABORATION.map((partner) => (
              <div
                key={partner.id}
                className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-[#EAF5E4] border border-[#C3E4B5] flex items-center justify-center shrink-0">
                      <Handshake className="w-5 h-5 text-[#245C3A]" />
                    </div>
                    <span className="text-xs font-mono-tabular font-bold text-[#245C3A]">
                      {partner.index}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#245C3A] mb-1">
                    {isMm ? partner.partnerTypeMm : partner.partnerType}
                  </p>
                  <h3 className="text-xl font-bold text-[#173D2A] mb-3">
                    {isMm ? partner.titleMm : partner.title}
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                    {isMm ? partner.descriptionMm : partner.description}
                  </p>

                  <ul className="space-y-2.5 text-xs text-[#173D2A] font-medium mb-6 pt-4 border-t border-[#DDE5D9]">
                    {(isMm
                      ? partner.collaborationPointsMm
                      : partner.collaborationPoints
                    ).map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  type="button"
                  variant="outline-dark"
                  size="sm"
                  href={`/contact?inquiry=${encodeURIComponent(partner.inquiryType)}`}
                  className="w-full"
                  onClick={() => onInquireWithCategory(partner.inquiryType, true)}
                >
                  {t('Become a Business Partner', 'မိတ်ဖက်အဖြစ် ပူးပေါင်းဆောင်ရွက်ရန်')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>

          {/* Domestic & International Export Markets Summary on About Page */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white border border-[#DDE5D9] rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Globe2 className="w-5 h-5 text-[#245C3A]" />
                <span className="text-xs font-mono-tabular font-bold text-[#245C3A]">
                  {EXPORT_AND_DOMESTIC_MARKETS.domestic.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#173D2A] mb-2.5">
                {isMm
                  ? EXPORT_AND_DOMESTIC_MARKETS.domestic.titleMm
                  : EXPORT_AND_DOMESTIC_MARKETS.domestic.title}
              </h3>
              <p className="text-sm text-[#26332B]/85 leading-relaxed mb-4">
                {isMm
                  ? EXPORT_AND_DOMESTIC_MARKETS.domestic.descriptionMm
                  : EXPORT_AND_DOMESTIC_MARKETS.domestic.description}
              </p>
              <ul className="space-y-2 text-xs text-[#173D2A] font-medium">
                {EXPORT_AND_DOMESTIC_MARKETS.domestic.regions.map((reg) => (
                  <li key={reg.name} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                    <span>{isMm ? reg.nameMm : reg.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-[#DDE5D9] rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Globe2 className="w-5 h-5 text-[#245C3A]" />
                <span className="text-xs font-mono-tabular font-bold text-[#245C3A]">
                  {EXPORT_AND_DOMESTIC_MARKETS.international.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#173D2A] mb-2.5">
                {isMm
                  ? EXPORT_AND_DOMESTIC_MARKETS.international.titleMm
                  : EXPORT_AND_DOMESTIC_MARKETS.international.title}
              </h3>
              <p className="text-sm text-[#26332B]/85 leading-relaxed mb-4">
                {isMm
                  ? EXPORT_AND_DOMESTIC_MARKETS.international.descriptionMm
                  : EXPORT_AND_DOMESTIC_MARKETS.international.description}
              </p>
              <ul className="space-y-2 text-xs text-[#173D2A] font-medium">
                {EXPORT_AND_DOMESTIC_MARKETS.international.regions.map((reg) => (
                  <li key={reg.name} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                    <span>{isMm ? reg.nameMm : reg.name}</span>
                  </li>
                ))}
              </ul>
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
