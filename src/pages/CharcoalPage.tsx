import React from 'react';
import { ArrowRight, Check, Mail, MessageCircle, Phone } from 'lucide-react';
import {
  BAMBOO_PRODUCTS,
  CHARCOAL_PRODUCT_INFO,
  COMPANY_INFO,
  InquiryTypeOption,
  PageRoute,
} from '../data/companyData';
import { VisualAssetFrame } from '../components/VisualAssetFrame';
import { Button, HeroSection, SectionHeading } from '../components/SharedUI';
import { ContactCTA, ProductSpecificationTable } from '../components/CatalogComponents';
import { BambooProductIcon, PrintingServiceIcon } from '../components/PrintingIcons';
import { useLanguage } from '../context/LanguageContext';

interface CharcoalPageProps {
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

export const CharcoalPage: React.FC<CharcoalPageProps> = ({
  onNavigate,
  onInquireWithCategory,
}) => {
  const { isMm, t } = useLanguage();

  return (
    <div>
      {/* Page Hero */}
      <HeroSection
        breadcrumbs={[
          { label: 'Home', route: '/' },
          { label: 'Charcoal', route: '/charcoal' },
        ]}
        onNavigate={onNavigate}
        kicker="TB Star Company Limited · Charcoal Supply & Trade Inquiries"
        kickerMm="TBStar Company Limited · မီးသွေးထုတ်ကုန် ဖြန့်ဖြူးရေးနှင့် ဆက်သွယ်စုံစမ်းရန်"
        title="Charcoal Products & Commercial Inquiries"
        titleMm="မီးသွေးထုတ်ကုန်များနှင့် လုပ်ငန်းသုံး ဆက်သွယ်စုံစမ်းရန်"
        description="Contact TB Star Company Limited in Yangon, Myanmar for Charcoal product inquiries. Our team coordinates directly with buyers regarding current availability and commercial requirements."
        descriptionMm="မီးသွေးထုတ်ကုန် (Charcoal) နှင့် ပတ်သက်၍ ပြည်တွင်းနှင့် စီးပွားရေးလုပ်ငန်းသုံး လိုအပ်ချက်များအတွက် TBStar Company Limited ၏ ရန်ကုန်ရုံးချုပ်သို့ တိုက်ရိုက် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။"
        actions={
          <>
            <Button
              type="button"
              variant="primary-light"
              href="/contact?inquiry=Charcoal"
              onClick={() => onInquireWithCategory('Charcoal', true)}
            >
              {t('Inquire About Charcoal', 'မီးသွေးထုတ်ကုန် မေးမြန်းရန်')}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline-light"
              onClick={() => onInquireWithCategory('Charcoal', false)}
            >
              {t('Quick Inquiry Modal', 'အမြန် မေးမြန်းရန်')}
            </Button>
            <Button
              type="button"
              variant="outline-light"
              href="/bamboo-products"
              onClick={() => onNavigate('/bamboo-products')}
            >
              {t('View Bamboo Products', 'ဝါးထုတ်ကုန်များ ကြည့်ရန်')}
            </Button>
          </>
        }
      />

      {/* Quick Product & Cross-Catalog Navigation Bar */}
      <div className="bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#245C3A] mr-2">
              {t('Related Product & Service Catalog:', 'ဆက်စပ် ထုတ်ကုန်နှင့် ဝန်ဆောင်မှုများ -')}
            </span>
            <a
              href="/bamboo-products#product-bamboo-split"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/bamboo-products');
              }}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977]/40 text-[#173D2A] border border-[#DDE5D9] hover:border-[#245C3A] transition-colors inline-flex items-center gap-2"
            >
              <BambooProductIcon type="bamboo-split" className="w-4 h-4 shrink-0" />
              <span>{t('Bamboo Split (3 mm)', 'ဝါးခြမ်းပြား (3 mm)')}</span>
            </a>
            <a
              href="/bamboo-products#product-bamboo-sticks"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/bamboo-products');
              }}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977]/40 text-[#173D2A] border border-[#DDE5D9] hover:border-[#245C3A] transition-colors inline-flex items-center gap-2"
            >
              <BambooProductIcon type="bamboo-sticks" className="w-4 h-4 shrink-0" />
              <span>{t('Bamboo Sticks (30 kg/bag)', 'ဝါးတံ (တစ်အိတ် 30 kg)')}</span>
            </a>
            <a
              href="/printing-services"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/printing-services');
              }}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977]/40 text-[#173D2A] border border-[#DDE5D9] hover:border-[#245C3A] transition-colors inline-flex items-center gap-2"
            >
              <PrintingServiceIcon type="books-printing" className="w-4 h-4 shrink-0" />
              <span>{t('Offset Printing Services', 'အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှု')}</span>
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

      {/* Main Charcoal Product Information & Verified Details Section */}
      <section
        id="charcoal-overview"
        aria-labelledby="charcoal-heading"
        className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Visual Showcase & Direct Inquiry Card */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-[#DDE5D9] bg-white">
                <VisualAssetFrame
                  type="charcoal"
                  imagePath={CHARCOAL_PRODUCT_INFO.imagePath}
                  altText={CHARCOAL_PRODUCT_INFO.imageAlt}
                  aspectClassName="aspect-[4/3]"
                  loading="eager"
                  label={
                    isMm && CHARCOAL_PRODUCT_INFO.placeholderNoteMm
                      ? CHARCOAL_PRODUCT_INFO.placeholderNoteMm
                      : CHARCOAL_PRODUCT_INFO.placeholderNote
                  }
                />
              </div>

              <div className="mt-6 bg-white border border-[#DDE5D9] rounded-xl p-6 shadow-2xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9] flex items-center justify-center shrink-0">
                    <BambooProductIcon type="charcoal" className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold">
                      {t('VERIFIED PRODUCT LINE · ORIGIN: MYANMAR', 'တရားဝင် ထုတ်ကုန်ကဏ္ဍ · မြန်မာနိုင်ငံ')}
                    </p>
                    <h2 id="charcoal-heading" className="text-2xl font-bold text-[#173D2A]">
                      {isMm ? CHARCOAL_PRODUCT_INFO.nameMm : CHARCOAL_PRODUCT_INFO.name}
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                  {isMm
                    ? CHARCOAL_PRODUCT_INFO.detailedDescriptionMm
                    : CHARCOAL_PRODUCT_INFO.detailedDescription}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant="primary-dark"
                    href="/contact?inquiry=Charcoal"
                    onClick={() => onInquireWithCategory('Charcoal', true)}
                  >
                    {t('Send Charcoal Inquiry', 'မီးသွေးထုတ်ကုန် မေးမြန်းရန်')}
                    <ArrowRight className="w-4 h-4 text-[#A8D977]" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline-dark"
                    onClick={() => onInquireWithCategory('Charcoal', false)}
                  >
                    {t('Open Quick Inquiry', 'အမြန် မေးမြန်းရန်')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Verified Product Information Table & How to Inquire */}
            <div className="lg:col-span-7 space-y-6">
              <ProductSpecificationTable
                title="Charcoal — Verified Product Information"
                titleMm="မီးသွေးထုတ်ကုန် (Charcoal) — တရားဝင် အချက်အလက်ဇယား"
                subtitle="VERIFIED CORPORATE PRODUCT INFORMATION · MYANMAR"
                subtitleMm="တရားဝင် ကုန်ပစ္စည်းအချက်အလက် · TBStar Company Limited"
                specifications={CHARCOAL_PRODUCT_INFO.specifications}
                onInquire={() => onInquireWithCategory('Charcoal', true)}
                inquireLabel="Inquire: Charcoal"
                inquireLabelMm="မီးသွေးထုတ်ကုန် မေးမြန်းရန်"
              />

              {/* Direct Consultation Guidelines */}
              <div className="bg-white border border-[#DDE5D9] rounded-xl p-6 md:p-8 shadow-2xs">
                <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1.5">
                  {t(
                    'DIRECT TRADE CONSULTATION · YANGON HEADQUARTERS',
                    'တိုက်ရိုက် ဆက်သွယ်ဆွေးနွေးရန် · ရန်ကုန်ရုံးချုပ်'
                  )}
                </p>
                <h3 className="text-xl font-bold text-[#173D2A] mb-3">
                  {t(
                    'How to Inquire About Charcoal Supply',
                    'မီးသွေးထုတ်ကုန် မှာယူရန်နှင့် အသေးစိတ် ဆက်သွယ်မေးမြန်းရန် လမ်းညွှန်'
                  )}
                </h3>
                <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                  {t(
                    'To ensure accurate commercial coordination, TB Star Company Limited provides specific charcoal supply details directly in response to buyer inquiries. Please share your intended application and order requirements with our Yangon office:',
                    'ဝယ်ယူသူများ၏ လုပ်ငန်းလိုအပ်ချက်နှင့် တိကျစွာ ကိုက်ညီစေရန် မီးသွေးထုတ်ကုန်ဆိုင်ရာ အသေးစိတ်အချက်အလက်များကို ရန်ကုန်ရုံးချုပ်မှ တိုက်ရိုက် ဖြေကြားဆောင်ရွက်ပေးပါသည်။ ဆက်သွယ်မေးမြန်းရာတွင် အောက်ပါအချက်များကို ထည့်သွင်းပေးပို့နိုင်ပါသည် -'
                  )}
                </p>

                <ul className="space-y-3 text-sm text-[#173D2A] font-medium mb-6">
                  {[
                    {
                      en: 'Specify your required application (commercial, domestic distribution, or trade inquiry)',
                      mm: 'အသုံးပြုမည့် လုပ်ငန်းကဏ္ဍ (ပြည်တွင်းဖြန့်ဖြူးရေး သို့မဟုတ် လုပ်ငန်းသုံး လိုအပ်ချက်)',
                    },
                    {
                      en: 'Indicate your preferred order quantity, delivery destination, and schedule',
                      mm: 'မှာယူလိုသည့် ပမာဏ၊ ပို့ဆောင်ရမည့် ဒေသနှင့် အချိန်ကာလ',
                    },
                    {
                      en: 'Reach our Kyauktada Township, Yangon office via the online inquiry form, telephone, WhatsApp, or email',
                      mm: 'ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ် ရုံးချုပ်သို့ Online Inquiry Form၊ ဖုန်း၊ WhatsApp သို့မဟုတ် အီးမေးလ်ဖြင့် တိုက်ရိုက်ဆက်သွယ်နိုင်ခြင်း',
                    },
                  ].map((item) => (
                    <li key={item.en} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                      <span>{isMm ? item.mm : item.en}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t border-[#DDE5D9] flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant="primary-dark"
                    size="sm"
                    href="/contact?inquiry=Charcoal"
                    onClick={() => onInquireWithCategory('Charcoal', true)}
                  >
                    {t('Submit Charcoal Inquiry Form', 'မေးမြန်းလွှာ ဖောင်ဖြည့်ရန်')}
                    <ArrowRight className="w-3.5 h-3.5 text-[#A8D977]" />
                  </Button>
                  <a
                    href={COMPANY_INFO.telephoneHref}
                    className="px-4 py-2 bg-[#F6F8F3] hover:bg-[#EAF5E4] border border-[#DDE5D9] text-[#173D2A] text-xs font-semibold rounded-lg inline-flex items-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#245C3A]" />
                    <span>{COMPANY_INFO.telephone}</span>
                  </a>
                  <a
                    href={COMPANY_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-bold rounded-lg inline-flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={COMPANY_INFO.emailHref}
                    className="px-4 py-2 bg-[#F6F8F3] hover:bg-[#EAF5E4] border border-[#DDE5D9] text-[#173D2A] text-xs font-semibold rounded-lg inline-flex items-center gap-2 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#245C3A]" />
                    <span>{COMPANY_INFO.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Natural Bamboo Products Cross-Links Section */}
      <section className="py-20 bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Related Product Lines · 100% Natural Myanmar Bamboo"
            kickerMm="ဆက်စပ် ထုတ်ကုန်များ · ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များ"
            title="Explore Our Natural Bamboo Split & Bamboo Sticks"
            titleMm="ကျွန်ုပ်တို့၏ သဘာဝ ဝါးခြမ်းပြား (Bamboo Split) နှင့် ဝါးတံ (Bamboo Sticks) များ"
            description="In addition to Charcoal inquiries, review our verified dimensional specifications for 100% natural Myanmar Bamboo Split and Bamboo Sticks."
            descriptionMm="မီးသွေးထုတ်ကုန်များအပြင် ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်အတွက် ထုတ်လုပ်ထားသော ဝါးခြမ်းပြားနှင့် ဝါးတံ စံချိန်စံညွှန်းများကိုလည်း လေ့လာနိုင်ပါသည်။"
            action={
              <Button
                type="button"
                variant="outline-dark"
                href="/bamboo-products"
                onClick={() => onNavigate('/bamboo-products')}
              >
                {t('View All Bamboo Products', 'ဝါးထုတ်ကုန်အားလုံး ကြည့်ရှုရန်')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BAMBOO_PRODUCTS.slice(0, 2).map((prod) => (
              <div
                key={prod.id}
                className="bg-[#F6F8F3] border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl p-6 flex flex-col justify-between transition-colors shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-mono-tabular font-bold text-[#245C3A]">
                      {prod.index} · {t('100% Natural Bamboo', '၁၀၀% သဘာဝဝါး')}
                    </span>
                    <span className="text-xs font-mono-tabular text-[#173D2A] font-semibold">
                      {t('Origin: Myanmar', 'မြန်မာနိုင်ငံထုတ်')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#173D2A] mb-2">
                    {isMm ? prod.nameMm : prod.name}
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                    {isMm ? prod.shortDescriptionMm : prod.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DDE5D9] flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant="primary-dark"
                    size="sm"
                    href={`/bamboo-products#${
                      prod.id === 'bamboo-split'
                        ? 'product-bamboo-split'
                        : 'product-bamboo-sticks'
                    }`}
                    onClick={() => onNavigate('/bamboo-products')}
                  >
                    {t(`View ${prod.name} Specs`, `${prod.nameMm} စံချိန်စံညွှန်း ကြည့်ရန်`)}
                    <ArrowRight className="w-3.5 h-3.5 text-[#A8D977]" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline-dark"
                    size="sm"
                    href={`/contact?inquiry=${encodeURIComponent(prod.inquiryType)}`}
                    onClick={() => onInquireWithCategory(prod.inquiryType, true)}
                  >
                    {t(`Inquire: ${prod.name}`, 'ဆက်သွယ်မေးမြန်းရန်')}
                  </Button>
                </div>
              </div>
            ))}
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
