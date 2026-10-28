import React from 'react';
import { ArrowRight, Check, Globe2, Phone, ShieldCheck } from 'lucide-react';
import {
  BAMBOO_PRODUCTS,
  COMPANY_INFO,
  EXPORT_AND_DOMESTIC_MARKETS,
  GALLERY_PREVIEW_ITEMS,
  INDUSTRIES_SERVED,
  InquiryTypeOption,
  PageRoute,
  PRINTING_SERVICES,
  QUALITY_AND_STANDARDS,
  WHY_CHOOSE_US_ITEMS,
} from '../data/companyData';
import { VisualAssetFrame } from '../components/VisualAssetFrame';
import { Button, SectionHeading } from '../components/SharedUI';
import {
  ContactCTA,
  GalleryGrid,
  ProductCard,
  ServiceCard,
} from '../components/CatalogComponents';
import { BambooProductIcon, PrintingServiceIcon } from '../components/PrintingIcons';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onInquireWithCategory,
}) => {
  const { isMm, t } = useLanguage();

  return (
    <div>
      {/* HERO SECTION WITH OPTIMIZED BACKGROUND IMAGE & READABILITY OVERLAY */}
      <section
        aria-label="Hero Banner"
        className="relative bg-[#173D2A] text-white overflow-hidden border-b border-[#245C3A]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none select-none"
        >
          <img
            src="/assets/hero-bamboo-background.svg"
            alt=""
            width={1920}
            height={1080}
            referrerPolicy="no-referrer"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2619]/95 via-[#173D2A]/88 to-[#173D2A]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2619]/90 via-[#173D2A]/25 to-[#0E2619]/50" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-22 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Proposition & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#A8D977] font-medium tracking-wide mb-4">
                <span>{t(COMPANY_INFO.name, 'TBStar Company Limited')}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {t(
                    'Kyauktada Township, Yangon, Myanmar',
                    'ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ'
                  )}
                </span>
              </div>

              <h1
                className={`text-3xl sm:text-5xl lg:text-[46px] font-extrabold text-white tracking-tight mb-5 ${
                  isMm ? 'font-myanmar leading-[1.38]' : 'leading-[1.12]'
                }`}
                style={{ textWrap: 'balance' }}
              >
                {t(
                  'Natural Bamboo Products & Professional Printing Solutions',
                  'သဘာဝဝါးထုတ်ကုန်များနှင့် အဆင့်မြင့် ပုံနှိပ်ဝန်ဆောင်မှုများ'
                )}
              </h1>

              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mb-8">
                {t(
                  'TB Star Company Limited manufactures bamboo products for local distribution and international markets while providing one-stop offset printing services.',
                  'TBStar Company Limited သည် သဘာဝဝါးထုတ်ကုန်များကို ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် နိုင်ငံတကာပို့ကုန်စျေးကွက်များအတွက် ထုတ်လုပ်တင်ပို့လျက်ရှိပြီး၊ တစ်နေရာတည်းတွင် အပြီးအစီး ရရှိနိုင်သော အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှု (One-Stop Offset Printing Services) ကိုလည်း ဆောင်ရွက်ပေးလျက်ရှိပါသည်။'
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <Button
                  type="button"
                  variant="primary-light"
                  size="lg"
                  href="/bamboo-products"
                  onClick={() => onNavigate('/bamboo-products')}
                >
                  {t('Explore Bamboo Products', 'ဝါးထုတ်ကုန်များ လေ့လာရန်')}
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button
                  type="button"
                  variant="outline-light"
                  size="lg"
                  href="/printing-services"
                  onClick={() => onNavigate('/printing-services')}
                >
                  {t('Printing Services', 'ပုံနှိပ်ဝန်ဆောင်မှုများ')}
                </Button>

                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="px-3 py-3 text-sm font-medium text-[#A8D977] hover:text-white underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {t('Contact Us', 'ဆက်သွယ်ရန်')}
                </a>
              </div>

              {/* Quick Summary Row */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-white/85">
                <div>
                  <p className="text-[#A8D977] font-semibold mb-0.5">
                    {t('Division A · Bamboo & Export', 'လုပ်ငန်းကဏ္ဍ (က) · ဝါးထုတ်ကုန်')}
                  </p>
                  <p>
                    {t(
                      'Bamboo Split (3 mm) & Bamboo Sticks (30 kg/bag)',
                      'ဝါးခြမ်းပြား (3 mm) နှင့် ဝါးတံ (တစ်အိတ် 30 kg)'
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-[#A8D977] font-semibold mb-0.5">
                    {t('Division B · Offset Printing', 'လုပ်ငန်းကဏ္ဍ (ခ) · ပုံနှိပ်လုပ်ငန်း')}
                  </p>
                  <p>
                    {t(
                      'Books Printing, Voucher Books & One-Stop Press',
                      'စာအုပ်၊ ဘောင်ချာစာအုပ်နှင့် အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း'
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-[#A8D977] font-semibold mb-0.5">
                    {t('Direct Telephone', 'ဆက်သွယ်ရန် ဖုန်းနံပါတ်')}
                  </p>
                  <a
                    href={COMPANY_INFO.telephoneHref}
                    className="font-mono-tabular text-white font-bold hover:underline"
                  >
                    {COMPANY_INFO.telephone}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Dual-Division Product & Service Showcase */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#173D2A]/85 backdrop-blur-xs border border-[#A8D977]/35 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-white/15">
                <div className="flex items-center gap-3">
                  <img
                    src={COMPANY_INFO.logoPath}
                    alt="TB Star Official Star Emblem"
                    width={40}
                    height={40}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-contain bg-white p-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">
                      {t(COMPANY_INFO.name, 'TBStar Company Limited')}
                    </p>
                    <p className="text-[11px] text-[#A8D977]">
                      {t(
                        'Core Products & Printing Showcase',
                        'အဓိက ထုတ်ကုန်နှင့် ပုံနှိပ်လုပ်ငန်း ပြကွက်'
                      )}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono-tabular text-[#A8D977] font-semibold">
                  {t('Myanmar Origin', 'မြန်မာနိုင်ငံထုတ်')}
                </span>
              </div>

              <VisualAssetFrame
                type="hero-bamboo"
                aspectClassName="aspect-[4/3]"
              />

              <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-white/85">
                <span className="truncate">
                  {t(
                    'Central Tower, Kyauktada Township, Yangon',
                    'Central Tower၊ ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့'
                  )}
                </span>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="text-[#A8D977] hover:underline font-semibold whitespace-nowrap shrink-0 cursor-pointer ml-2"
                >
                  {t('Inquire Now →', 'ဆက်သွယ်ရန် →')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE BUSINESS DIVISIONS */}
      <section className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Corporate Structure · Dual Business Divisions"
            kickerMm="ကုမ္ပဏီဖွဲ့စည်းပုံ · အဓိက စီးပွားရေးလုပ်ငန်းကဏ္ဍ (၂) ခု"
            title="Two Specialized Divisions Serving Local & International Markets"
            titleMm="ပြည်တွင်းနှင့် နိုင်ငံတကာစျေးကွက်များအတွက် အဓိက စီးပွားရေးလုပ်ငန်းကဏ္ဍကြီး (၂) ခု"
            description="TB Star Company Limited operates dedicated manufacturing and export for natural Myanmar bamboo products alongside commercial one-stop offset printing services."
            descriptionMm="TBStar Company Limited သည် မြန်မာ့သဘာဝဝါးထုတ်ကုန်များ ထုတ်လုပ်ဖြန့်ဖြူးခြင်းနှင့် ပြည်ပတင်ပို့ခြင်းလုပ်ငန်းအပြင် တစ်နေရာတည်းတွင် အပြီးအစီး ရရှိနိုင်သော အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုလုပ်ငန်းကိုပါ စနစ်တကျ ဆောင်ရွက်ပေးလျက်ရှိပါသည်။"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Division 1: Bamboo Production & Export */}
            <div className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-2xl overflow-hidden flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all duration-200">
              <div>
                <VisualAssetFrame
                  type="bamboo-split"
                  imagePath="/images/products/bamboo-split-natural.webp"
                  altText="Natural bamboo splits with authentic bamboo texture"
                  aspectClassName="aspect-[16/9]"
                  label={t(
                    '100% Natural Myanmar Bamboo · Split & Sticks Export',
                    '၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန် · ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်'
                  )}
                />
                <div className="p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-[#DDE5D9]">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9] flex items-center justify-center shrink-0">
                        <BambooProductIcon type="bamboo-split" className="w-6 h-6" />
                      </div>
                      <span className="text-xs text-[#245C3A] font-semibold">
                        {t(
                          'Division A · Manufacturing & Global Trade',
                          'လုပ်ငန်းကဏ္ဍ (က) · ထုတ်လုပ်ရေးနှင့် ပြည်ပပို့ကုန်'
                        )}
                      </span>
                    </div>
                    <span className="text-xs font-mono-tabular font-semibold text-[#173D2A]">
                      {t('100% Natural Bamboo', '၁၀၀% သဘာဝဝါးစစ်စစ်')}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#173D2A] mb-3">
                    {t(
                      '01. Bamboo Production & Export',
                      '၀၁။ ဝါးထုတ်ကုန် ထုတ်လုပ်ရေးနှင့် ပြည်ပပို့ကုန်လုပ်ငန်း'
                    )}
                  </h3>

                  <p className="text-sm text-[#26332B]/85 leading-relaxed mb-6">
                    {t(
                      'Manufacturing bamboo-related products in Myanmar, exporting to international markets, and distributing products locally across Myanmar.',
                      'မြန်မာနိုင်ငံထွက် သဘာဝဝါးနှင့် ဆက်စပ်ထုတ်ကုန်ပစ္စည်းများကို စံချိန်စံညွှန်းမီ ထုတ်လုပ်ပြီး ပြည်တွင်းစျေးကွက်သို့ ဖြန့်ဖြူးပေးခြင်းနှင့် နိုင်ငံတကာစျေးကွက်များသို့ တင်ပို့ရောင်းချခြင်းများ ဆောင်ရွက်ပါသည်။'
                    )}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
                    {[
                      { en: 'Bamboo Split (3 mm · 20"–48")', mm: 'ဝါးခြမ်းပြား (အထူ 3 mm · ၂၀"–၄၈")' },
                      { en: 'Bamboo Sticks (1.2–2.5 mm)', mm: 'ဝါးတံ (အထူ 1.2–2.5 mm)' },
                      { en: 'Standard 30 kg/bag packaging', mm: 'တစ်အိတ် 30 kg စံနှုန်းထုပ်ပိုးမှု' },
                      { en: 'Other Bamboo Products', mm: 'အခြား ဝါးထုတ်ကုန်များ' },
                      { en: 'Domestic Myanmar distribution', mm: 'ပြည်တွင်းဖြန့်ဖြူးရေး' },
                      { en: 'International export supply', mm: 'နိုင်ငံတကာ ပြည်ပပို့ကုန်' },
                    ].map((item) => (
                      <div
                        key={item.en}
                        className="flex items-start gap-2.5 text-[#173D2A] font-medium"
                      >
                        <Check className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                        <span>{isMm ? item.mm : item.en}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-7 sm:px-8 pb-7 pt-4 border-t border-[#DDE5D9] flex flex-wrap items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="primary-dark"
                  href="/bamboo-products"
                  onClick={() => onNavigate('/bamboo-products')}
                >
                  {t('Explore Bamboo Products', 'ဝါးထုတ်ကုန်များ ကြည့်ရှုရန်')}
                  <ArrowRight className="w-4 h-4 text-[#A8D977]" />
                </Button>
                <span className="text-xs text-[#26332B]/70 font-mono-tabular">
                  {t('Origin: Myanmar', 'မူရင်းနိုင်ငံ - မြန်မာ')}
                </span>
              </div>
            </div>

            {/* Division 2: Offset Printing Services */}
            <div className="bg-[#173D2A] text-white border border-[#245C3A] hover:border-[#A8D977]/60 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all duration-200">
              <div>
                <VisualAssetFrame
                  type="books-printing"
                  aspectClassName="aspect-[16/9]"
                  label={t(
                    'One-Stop Offset Printing · Books, Voucher Books & Commercial Print',
                    'တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း · စာအုပ်နှင့် ဘောင်ချာစာအုပ်များ'
                  )}
                />
                <div className="p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/15">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-white/95 border border-white/20 flex items-center justify-center shrink-0">
                        <PrintingServiceIcon type="books-printing" className="w-6 h-6" />
                      </div>
                      <span className="text-xs text-[#A8D977] font-semibold">
                        {t(
                          'Division B · Commercial Press Solutions',
                          'လုပ်ငန်းကဏ္ဍ (ခ) · စီးပွားရေးလုပ်ငန်းသုံး ပုံနှိပ်ဝန်ဆောင်မှု'
                        )}
                      </span>
                    </div>
                    <span className="text-xs font-mono-tabular text-[#A8D977]">
                      {t('Yangon, Myanmar', 'ရန်ကုန်မြို့')}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t(
                      '02. Offset Printing Services',
                      '၀၂။ အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှုလုပ်ငန်း'
                    )}
                  </h3>

                  <p className="text-sm text-white/85 leading-relaxed mb-6">
                    {t(
                      'Providing one-stop offset printing services for books, commercial voucher books, and custom business printing requirements.',
                      'စာအုပ်အမျိုးမျိုး၊ လုပ်ငန်းသုံး ဘောင်ချာစာအုပ်များနှင့် အခြားအော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း လိုအပ်ချက်များအတွက် တစ်နေရာတည်းတွင် အပြီးအစီး (One-Stop Offset Printing) ဝန်ဆောင်မှုပေးလျက်ရှိပါသည်။'
                    )}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
                    {[
                      { en: 'Books Printing', mm: 'စာအုပ်ပုံနှိပ်ခြင်းလုပ်ငန်း' },
                      { en: 'Voucher Books Printing', mm: 'ဘောင်ချာစာအုပ် ပုံနှိပ်ခြင်း' },
                      { en: 'Brochures & Pamphlets', mm: 'လက်ကမ်းစာစောင်နှင့် ကတ်တလောက်' },
                      { en: 'Business Cards & Stationery', mm: 'လိပ်စာကတ်နှင့် ရုံးသုံးပုံနှိပ်' },
                      { en: 'Other Offset Printing Services', mm: 'အခြား အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းများ' },
                      { en: 'One-stop printing workflow', mm: 'တစ်နေရာတည်း အပြီးအစီး ဝန်ဆောင်မှု' },
                    ].map((item) => (
                      <div
                        key={item.en}
                        className="flex items-start gap-2.5 text-white font-medium"
                      >
                        <Check className="w-4 h-4 text-[#A8D977] shrink-0 mt-0.5" />
                        <span>{isMm ? item.mm : item.en}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-7 sm:px-8 pb-7 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="primary-light"
                  href="/printing-services"
                  onClick={() => onNavigate('/printing-services')}
                >
                  {t('Explore Printing Services', 'ပုံနှိပ်ဝန်ဆောင်မှုများ ကြည့်ရှုရန်')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <span className="text-xs text-white/70 font-mono-tabular">
                  {t('One-Stop Offset Press', 'တစ်နေရာတည်း အပြီးအစီး ပုံနှိပ်လုပ်ငန်း')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BAMBOO PRODUCTS */}
      <section className="py-20 bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Division A · Bamboo Production & Export"
            kickerMm="လုပ်ငန်းကဏ္ဍ (က) · ဝါးထုတ်ကုန်နှင့် ပြည်ပပို့ကုန်"
            title="Featured Bamboo Products"
            titleMm="အဓိက ထုတ်လုပ်တင်ပို့သော သဘာဝဝါးထုတ်ကုန်များ"
            description="Review our core natural Myanmar bamboo products and technical specifications for local distribution and international export."
            descriptionMm="ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်စျေးကွက်များအတွက် ထုတ်လုပ်ထားသော မြန်မာ့သဘာဝဝါးထုတ်ကုန်များနှင့် စံချိန်စံညွှန်း အချက်အလက်များကို လေ့လာနိုင်ပါသည်။"
            action={
              <Button
                type="button"
                variant="outline-dark"
                href="/bamboo-products"
                onClick={() => onNavigate('/bamboo-products')}
              >
                {t('View All Bamboo Specifications', 'ဝါးထုတ်ကုန် စံချိန်စံညွှန်းအားလုံး ကြည့်ရန်')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {BAMBOO_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                useFeaturedImage={true}
                onInquireProduct={(type) => onInquireWithCategory(type, true)}
                onViewDetails={() => onNavigate('/bamboo-products')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* OFFSET PRINTING SERVICES */}
      <section className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Division B · One-Stop Offset Printing Services"
            kickerMm="လုပ်ငန်းကဏ္ဍ (ခ) · တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း"
            title="Offset Printing Services"
            titleMm="အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှုများ"
            description="TB Star Company Limited provides one-stop offset printing services for books, voucher books, and other printing needs."
            descriptionMm="TBStar Company Limited သည် စာအုပ်များ၊ ဘောင်ချာစာအုပ်များနှင့် အခြားပုံနှိပ်လုပ်ငန်း လိုအပ်ချက်များအတွက် တစ်နေရာတည်းတွင် အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုကို ဆောင်ရွက်ပေးလျက်ရှိပါသည်။"
            action={
              <Button
                type="button"
                variant="primary-dark"
                href="/printing-services"
                onClick={() => onNavigate('/printing-services')}
              >
                {t('View All Printing Services', 'ပုံနှိပ်ဝန်ဆောင်မှုအားလုံး ကြည့်ရန်')}
                <ArrowRight className="w-4 h-4 text-[#A8D977]" />
              </Button>
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRINTING_SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onInquireService={(type) => onInquireWithCategory(type, true)}
                onViewDetails={() => onNavigate('/printing-services')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY INTRODUCTION */}
      <section className="py-20 bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium text-[#245C3A] mb-2">
                {t('Company Introduction · Corporate Overview', 'ကုမ္ပဏီမိတ်ဆက် · လုပ်ငန်းအကျဉ်းချုပ်')}
              </p>
              <h2
                className="text-2xl sm:text-4xl font-bold text-[#173D2A] tracking-tight mb-5"
                style={{ textWrap: 'balance' }}
              >
                {t(`About ${COMPANY_INFO.name}`, 'TBStar Company Limited အကြောင်း မိတ်ဆက်')}
              </h2>

              <p className="text-base text-[#26332B]/90 leading-relaxed mb-4">
                {isMm ? (
                  <>
                    <strong>TBStar Company Limited</strong> သည် ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်ရှိ Central Tower တွင် ရုံးချုပ်တည်ရှိပြီး <strong>ဝါးထုတ်ကုန် ထုတ်လုပ်ရေးနှင့် ပြည်ပပို့ကုန်လုပ်ငန်း</strong> နှင့် <strong>အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှုလုပ်ငန်း</strong> ဟူသော အဓိက စီးပွားရေးလုပ်ငန်းကြီး (၂) ခုကို ဆောင်ရွက်လျက်ရှိပါသည်။
                  </>
                ) : (
                  <>
                    <strong>{COMPANY_INFO.name}</strong> is headquartered at Central Tower in Kyauktada Township, Yangon, Myanmar, operating across two core business divisions: <strong>Bamboo Production and Export</strong> and <strong>Offset Printing Services</strong>.
                  </>
                )}
              </p>

              <p className="text-base text-[#26332B]/85 leading-relaxed mb-6">
                {t(
                  'Our Bamboo Production and Export division manufactures 100% natural Myanmar bamboo products—including Bamboo Split and Bamboo Sticks—for distribution within Myanmar and export to international markets. Our Offset Printing Services division provides one-stop offset printing solutions for Books Printing, Voucher Books Printing, and other commercial printing needs.',
                  'ကျွန်ုပ်တို့၏ ဝါးထုတ်ကုန်ဌာနမှ ၁၀၀% သဘာဝမြန်မာ့ဝါးစစ်စစ်ဖြင့် ထုတ်လုပ်ထားသော ဝါးခြမ်းပြား (Bamboo Split) နှင့် ဝါးတံ (Bamboo Sticks) များကို ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်စျေးကွက်များသို့ တင်ပို့ပေးလျက်ရှိပြီး၊ အော့ဖ်ဆက်ပုံနှိပ်ဌာနမှ စာအုပ်များ၊ ဘောင်ချာစာအုပ်များနှင့် အခြားလုပ်ငန်းသုံးပုံနှိပ်ခြင်းများကို တစ်နေရာတည်းတွင် အပြီးအစီး ဆောင်ရွက်ပေးလျက်ရှိပါသည်။'
                )}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  type="button"
                  variant="primary-dark"
                  href="/about"
                  onClick={() => onNavigate('/about')}
                >
                  {t('Learn More About Us', 'ကုမ္ပဏီအကြောင်း အပြည့်အစုံ ဖတ်ရှုရန်')}
                  <ArrowRight className="w-4 h-4 text-[#A8D977]" />
                </Button>

                <a
                  href={COMPANY_INFO.telephoneHref}
                  className="px-5 py-2.5 border border-[#DDE5D9] hover:border-[#245C3A] text-[#173D2A] text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <Phone className="w-4 h-4 text-[#245C3A]" />
                  {COMPANY_INFO.telephone}
                </a>
              </div>
            </div>

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
                    {t('CORPORATE HEADQUARTERS', 'တရားဝင် ကုမ္ပဏီအချက်အလက်')}
                  </p>
                  <h3 className="text-lg font-bold text-[#173D2A]">
                    {t(COMPANY_INFO.name, 'TBStar Company Limited')}
                  </h3>
                </div>
              </div>

              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs text-[#26332B]/70 font-medium">
                    {t('Registered Office Address', 'ရုံးချုပ်လိပ်စာ')}
                  </dt>
                  <dd className="text-[#173D2A] font-medium mt-0.5 leading-snug">
                    {t(COMPANY_INFO.address.full, COMPANY_INFO.address.fullMm)}
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#DDE5D9] flex items-center justify-between">
                  <dt className="text-xs text-[#26332B]/70 font-medium">
                    {t('Contact Number', 'ဆက်သွယ်ရန် ဖုန်းနံပါတ်')}
                  </dt>
                  <dd className="font-mono-tabular font-bold text-[#173D2A]">
                    {COMPANY_INFO.telephone}
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#DDE5D9] flex items-center justify-between gap-4">
                  <dt className="text-xs text-[#26332B]/70 font-medium">
                    {t('Core Business Divisions', 'အဓိက လုပ်ငန်းကဏ္ဍများ')}
                  </dt>
                  <dd className="font-semibold text-[#173D2A] text-right">
                    {t(
                      'Bamboo Export & Offset Printing',
                      'ဝါးပို့ကုန်နှင့် အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း'
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Core Capabilities · Business Excellence"
            kickerMm="အဓိက လုပ်ငန်းစွမ်းဆောင်ရည်များ"
            title={`Why Partner With ${COMPANY_INFO.name}`}
            titleMm="TBStar Company Limited နှင့် လက်တွဲဆောင်ရွက်သင့်သည့် အချက်များ"
            description="Built on dependable manufacturing, domestic distribution, export supply, and one-stop offset printing operations."
            descriptionMm="သဘာဝဝါးထုတ်ကုန် ထုတ်လုပ်မှု၊ ပြည်တွင်းဖြန့်ဖြူးရေး၊ နိုင်ငံတကာပြည်ပပို့ကုန်နှင့် တစ်နေရာတည်းတွင် အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများကို စနစ်တကျ ဆောင်ရွက်ပေးလျက်ရှိပါသည်။"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US_ITEMS.map((pillar, idx) => (
              <div
                key={pillar.index}
                className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl p-6 flex flex-col justify-between shadow-2xs transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9] flex items-center justify-center shrink-0">
                      {idx === 0 ? (
                        <BambooProductIcon type="bamboo-split" className="w-6 h-6" />
                      ) : idx === 1 ? (
                        <BambooProductIcon type="bamboo-custom" className="w-6 h-6" />
                      ) : idx === 2 ? (
                        <BambooProductIcon type="bamboo-sticks" className="w-6 h-6" />
                      ) : (
                        <PrintingServiceIcon type="books-printing" className="w-6 h-6" />
                      )}
                    </div>
                    <span className="text-xs font-mono-tabular font-bold text-[#245C3A]">
                      {pillar.index}
                    </span>
                  </div>
                  <p className="text-xs text-[#245C3A] font-medium mb-1">
                    {isMm && pillar.divisionTagMm ? pillar.divisionTagMm : pillar.divisionTag}
                  </p>
                  <h3 className="text-lg font-bold text-[#173D2A] mb-2.5">
                    {isMm ? pillar.titleMm : pillar.title}
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed">
                    {isMm ? pillar.descriptionMm : pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section
        id="industries-served"
        aria-label="Industries Served by TB Star Company Limited"
        className="py-20 bg-white border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Industries We Serve · ဝန်ဆောင်မှုပေးနေသော လုပ်ငန်းကဏ္ဍများ"
            kickerMm="ကုမ္ပဏီဝန်ဆောင်မှုပေးနေသော လုပ်ငန်းကဏ္ဍများ · Industries We Serve"
            title="Serving Diverse Industrial, Agricultural & Commercial Sectors"
            titleMm="စိုက်ပျိုးရေး၊ ကုန်ထုတ်လုပ်ငန်း၊ စာပေထုတ်ဝေရေးနှင့် စီးပွားရေးလုပ်ငန်းကဏ္ဍများ"
            description="Our natural Myanmar bamboo products and one-stop offset printing services support key domestic and international industries."
            descriptionMm="သဘာဝဝါးထုတ်ကုန်များနှင့် One-Stop အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများဖြင့် ပြည်တွင်းနှင့် နိုင်ငံတကာရှိ အောက်ပါ လုပ်ငန်းကဏ္ဍအသီးသီးကို ဝန်ဆောင်မှုပေးလျက်ရှိပါသည်။"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES_SERVED.map((ind) => (
              <div
                key={ind.id}
                className="bg-[#F6F8F3] border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl p-6 flex flex-col justify-between transition-colors shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#EAF5E4] text-[#173D2A] border border-[#C3E4B5]">
                      {isMm ? ind.sectorMm : ind.sector}
                    </span>
                    <span className="text-xs font-mono-tabular font-bold text-[#245C3A]">
                      {ind.index}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#173D2A] mb-2">
                    {isMm ? ind.titleMm : ind.title}
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed mb-4">
                    {isMm ? ind.descriptionMm : ind.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-[#DDE5D9]">
                  <p className="text-xs font-semibold text-[#173D2A] mb-2.5 flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                    <span>{isMm ? ind.productsUsedMm : ind.productsUsed}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => onInquireWithCategory(ind.inquiryType, true)}
                    className="text-xs font-bold text-[#245C3A] hover:text-[#173D2A] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t('Inquire for This Sector', 'ဤလုပ်ငန်းကဏ္ဍအတွက် မေးမြန်းရန်')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPORT MARKETS (DOMESTIC / INTERNATIONAL) & QUALITY STANDARDS */}
      <section
        id="markets-and-quality"
        aria-label="Export Markets and Quality Standards"
        className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Export Markets & Quality Standards · ပြည်တွင်း/ပြည်ပ စျေးကွက်နှင့် စံချိန်စံညွှန်းများ"
            kickerMm="ပြည်တွင်း/ပြည်ပ စျေးကွက်များနှင့် ထုတ်ကုန်အရည်အသွေး စံနှုန်းများ"
            title="Domestic & International Supply Backed by Strict Quality Standards"
            titleMm="ပြည်တွင်းနှင့် ပြည်ပ စျေးကွက်ဖြန့်ဖြူးမှုနှင့် အရည်အသွေး စံချိန်စံညွှန်းများ"
            description="Supplying local commercial hubs across Myanmar and international export destinations with calibrated specifications."
            descriptionMm="မြန်မာနိုင်ငံ ပြည်တွင်းစျေးကွက်နှင့် နိုင်ငံတကာ ပြည်ပပို့ကုန်စျေးကွက်များသို့ တိကျသော အရည်အသွေးစံနှုန်းများဖြင့် ထုတ်လုပ်ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။"
          />

          {/* Domestic vs International Export Markets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-[#DDE5D9] rounded-2xl overflow-hidden shadow-2xs flex flex-col">
              <VisualAssetFrame
                type="bamboo-split"
                imagePath="/images/products/bamboo-split-wholesale.webp"
                altText="Bamboo splits arranged for commercial supply"
                aspectClassName="aspect-[16/9]"
                label={t(
                  'Bamboo Split · Wholesale & Commercial Supply (3 mm · 20"–48")',
                  'ဝါးခြမ်းပြား · ပြည်တွင်းနှင့် လက်ကားဖြန့်ဖြူးရေး (3 mm · ၂၀"–၄၈")'
                )}
              />
              <div className="p-6 sm:p-8 flex-1">
                <div className="flex items-center gap-2.5 mb-3">
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
                <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                  {isMm
                    ? EXPORT_AND_DOMESTIC_MARKETS.domestic.descriptionMm
                    : EXPORT_AND_DOMESTIC_MARKETS.domestic.description}
                </p>
                <ul className="space-y-2.5 text-sm text-[#173D2A] font-medium">
                  {EXPORT_AND_DOMESTIC_MARKETS.domestic.regions.map((reg) => (
                    <li key={reg.name} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                      <span>{isMm ? reg.nameMm : reg.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-[#173D2A] text-white border border-[#245C3A] rounded-2xl overflow-hidden shadow-2xs flex flex-col">
              <VisualAssetFrame
                type="bamboo-sticks"
                imagePath="/images/products/bamboo-sticks-wholesale.webp"
                altText="Bamboo sticks prepared for commercial supply"
                aspectClassName="aspect-[16/9]"
                label={t(
                  'Bamboo Sticks · Standardized 30 kg per Bag Export Supply',
                  'ဝါးတံ · တစ်အိတ်လျှင် 30 kg စံနှုန်း ပြည်ပပို့ကုန် ထုပ်ပိုးမှု'
                )}
              />
              <div className="p-6 sm:p-8 flex-1">
                <div className="flex items-center gap-2.5 mb-3">
                  <Globe2 className="w-5 h-5 text-[#A8D977]" />
                  <span className="text-xs font-mono-tabular font-bold text-[#A8D977]">
                    {EXPORT_AND_DOMESTIC_MARKETS.international.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5">
                  {isMm
                    ? EXPORT_AND_DOMESTIC_MARKETS.international.titleMm
                    : EXPORT_AND_DOMESTIC_MARKETS.international.title}
                </h3>
                <p className="text-sm text-white/85 leading-relaxed mb-5">
                  {isMm
                    ? EXPORT_AND_DOMESTIC_MARKETS.international.descriptionMm
                    : EXPORT_AND_DOMESTIC_MARKETS.international.description}
                </p>
                <ul className="space-y-2.5 text-sm text-white/95 font-medium">
                  {EXPORT_AND_DOMESTIC_MARKETS.international.regions.map((reg) => (
                    <li key={reg.name} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#A8D977] shrink-0 mt-0.5" />
                      <span>{isMm ? reg.nameMm : reg.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Quality & Standards 4-Pillar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUALITY_AND_STANDARDS.map((q) => (
              <div
                key={q.id}
                className="bg-white border border-[#DDE5D9] rounded-xl p-6 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-[#245C3A]" />
                    <span className="text-xs font-mono-tabular font-bold text-[#245C3A]">
                      {q.index}
                    </span>
                  </div>
                  <p className="text-xs text-[#245C3A] font-semibold mb-1">
                    {isMm ? q.categoryMm : q.category}
                  </p>
                  <h3 className="text-base font-bold text-[#173D2A] mb-2">
                    {isMm ? q.titleMm : q.title}
                  </h3>
                  <p className="text-xs text-[#26332B]/85 leading-relaxed mb-4">
                    {isMm ? q.descriptionMm : q.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#DDE5D9] text-[11px] font-semibold text-[#173D2A]">
                  {isMm ? q.standardSpecMm : q.standardSpec}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-20 bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Product & Service Showcase · Visual Portfolio"
            kickerMm="ဓာတ်ပုံမှတ်တမ်း · ကဏ္ဍအလိုက် ထုတ်ကုန်ပြခန်း"
            title="Products, Packaging & Printing Gallery"
            titleMm="ထုတ်ကုန်နှင့် လုပ်ငန်းဆောင်ရွက်မှု ဓာတ်ပုံမှတ်တမ်း"
            description="Explore our natural Myanmar bamboo products, 30 kg export bag packaging, and one-stop offset printing deliverables."
            descriptionMm="ဝါးထုတ်ကုန်များ၊ ထုတ်လုပ်မှုလုပ်ငန်းစဉ်၊ ထုပ်ပိုးမှုပုံစံနှင့် ပုံနှိပ်ထုတ်ကုန် အမျိုးအစားများကို ကဏ္ဍအလိုက် လေ့လာကြည့်ရှုနိုင်ပါသည်။"
            action={
              <Button
                type="button"
                variant="outline-dark"
                href="/gallery"
                onClick={() => onNavigate('/gallery')}
              >
                {t('Open Full Gallery Page', 'ဓာတ်ပုံပြခန်းအပြည့်အစုံ ကြည့်ရန်')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            }
          />

          <GalleryGrid
            items={GALLERY_PREVIEW_ITEMS}
            showCategoryFilters={true}
            onInquireFromGallery={(type) => onInquireWithCategory(type, true)}
          />
        </div>
      </section>

      {/* CONTACT CTA */}
      <ContactCTA
        onNavigate={onNavigate}
        onInquireWithCategory={onInquireWithCategory}
      />
    </div>
  );
};
