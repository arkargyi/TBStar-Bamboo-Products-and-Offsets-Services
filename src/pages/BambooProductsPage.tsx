import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Phone } from 'lucide-react';
import {
  BAMBOO_PRODUCTS,
  COMPANY_INFO,
  InquiryTypeOption,
  PageRoute,
} from '../data/companyData';
import { VisualAssetFrame } from '../components/VisualAssetFrame';
import { Button, HeroSection, SectionHeading } from '../components/SharedUI';
import {
  ContactCTA,
  ProductCard,
  ProductSpecificationTable,
} from '../components/CatalogComponents';
import { useLanguage } from '../context/LanguageContext';

interface BambooProductsPageProps {
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

export const BambooProductsPage: React.FC<BambooProductsPageProps> = ({
  onNavigate,
  onInquireWithCategory,
}) => {
  const [otherExpanded, setOtherExpanded] = useState(true);
  const { isMm, t } = useLanguage();

  const bambooSplit = BAMBOO_PRODUCTS[0];
  const bambooSticks = BAMBOO_PRODUCTS[1];
  const otherBamboo = BAMBOO_PRODUCTS[2];

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
        description="TB Star Company Limited manufactures and supplies Bamboo Split, Bamboo Sticks, and other bamboo products for domestic distribution within Myanmar and export to international markets."
        descriptionMm="တီဘီစတား ကုမ္ပဏီ လီမိတက်သည် မြန်မာနိုင်ငံတွင်း ဖြန့်ဖြူးရောင်းချရန်နှင့် နိုင်ငံတကာဈေးကွက်သို့ တင်ပို့ရန် ဝါးခြမ်းပြား (Bamboo Split)၊ ဝါးတံ (Bamboo Sticks) နှင့် အခြားဝါးထုတ်ကုန်များကို ထုတ်လုပ်ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။"
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

      {/* Product Navigation Bar */}
      <div className="bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#245C3A] mr-2">
              {t('Jump to Product Section:', 'ကုန်ပစ္စည်းအလိုက် ကြည့်ရှုရန် -')}
            </span>
            <button
              type="button"
              onClick={() => scrollToProductSection('product-bamboo-split')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977] text-[#173D2A] border border-[#DDE5D9] transition-colors cursor-pointer"
            >
              {t('01. Bamboo Split', '၀၁။ ဝါးခြမ်းပြား (Bamboo Split)')}
            </button>
            <button
              type="button"
              onClick={() => scrollToProductSection('product-bamboo-sticks')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977] text-[#173D2A] border border-[#DDE5D9] transition-colors cursor-pointer"
            >
              {t('02. Bamboo Sticks', '၀၂။ ဝါးတံ (Bamboo Sticks)')}
            </button>
            <button
              type="button"
              onClick={() => scrollToProductSection('product-other-bamboo')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977] text-[#173D2A] border border-[#DDE5D9] transition-colors cursor-pointer"
            >
              {t('03. Other Bamboo Products', '၀၃။ အခြား ဝါးထုတ်ကုန်များ')}
            </button>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {BAMBOO_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onInquireProduct={(type) => onInquireWithCategory(type, true)}
                onViewDetails={() =>
                  scrollToProductSection(
                    product.id === 'bamboo-split'
                      ? 'product-bamboo-split'
                      : product.id === 'bamboo-sticks'
                      ? 'product-bamboo-sticks'
                      : 'product-other-bamboo'
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT A: BAMBOO SPLIT */}
      <section
        id="product-bamboo-split"
        className="py-20 bg-white border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <VisualAssetFrame
                type="bamboo-split"
                aspectClassName="aspect-[4/3]"
                label={bambooSplit.placeholderNote}
              />

              <div className="mt-6 bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl p-5">
                <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                  {t('PRODUCT A · ORIGIN: MYANMAR', 'ထုတ်ကုန် (က) · မူရင်းနိုင်ငံ - မြန်မာ')}
                </p>
                <h2 className="text-2xl font-bold text-[#173D2A] mb-2">
                  {isMm ? bambooSplit.nameMm : bambooSplit.name}
                </h2>
                <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                  {isMm ? bambooSplit.detailedDescriptionMm : bambooSplit.detailedDescription}
                </p>

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
                    {t('Quick Modal Form', 'အမြန် မေးမြန်းရန်')}
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ProductSpecificationTable
                title="Bamboo Split — Technical Specification Table"
                titleMm="ဝါးခြမ်းပြား (Bamboo Split) — အသေးစိတ်အချက်အလက်ဇယား"
                subtitle="PRODUCT A · VERIFIED SPECIFICATIONS"
                subtitleMm="ထုတ်ကုန် (က) · တရားဝင် စံချိန်စံညွှန်းများ"
                specifications={bambooSplit.specifications}
                onInquire={() => onInquireWithCategory('Bamboo Split', true)}
                inquireLabel="Inquire: Bamboo Split"
                inquireLabelMm="ဝါးခြမ်းပြား မေးမြန်းရန်"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT B: BAMBOO STICKS */}
      <section
        id="product-bamboo-sticks"
        className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <VisualAssetFrame
                type="bamboo-sticks"
                aspectClassName="aspect-[4/3]"
                label={bambooSticks.placeholderNote}
              />

              <div className="mt-6 bg-white border border-[#DDE5D9] rounded-xl p-5">
                <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                  {t('PRODUCT B · ORIGIN: MYANMAR', 'ထုတ်ကုန် (ခ) · မူရင်းနိုင်ငံ - မြန်မာ')}
                </p>
                <h2 className="text-2xl font-bold text-[#173D2A] mb-2">
                  {isMm ? bambooSticks.nameMm : bambooSticks.name}
                </h2>
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
                    {t('Quick Modal Form', 'အမြန် မေးမြန်းရန်')}
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ProductSpecificationTable
                title="Bamboo Sticks — Technical Specification Table"
                titleMm="ဝါးတံ (Bamboo Sticks) — အသေးစိတ်အချက်အလက်ဇယား"
                subtitle="PRODUCT B · VERIFIED SPECIFICATIONS"
                subtitleMm="ထုတ်ကုန် (ခ) · တရားဝင် စံချိန်စံညွှန်းများ"
                specifications={bambooSticks.specifications}
                onInquire={() => onInquireWithCategory('Bamboo Sticks', true)}
                inquireLabel="Inquire: Bamboo Sticks"
                inquireLabelMm="ဝါးတံ မေးမြန်းရန်"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT C: OTHER BAMBOO PRODUCTS (Expandable & Reusable Section) */}
      <section
        id="product-other-bamboo"
        className="py-20 bg-white border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5D9]">
              <div>
                <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                  {t('PRODUCT C · EXPANDABLE PRODUCT CATEGORY', 'ထုတ်ကုန် (ဂ) · အခြား ဝါးထုတ်ကုန် အမျိုးအစား')}
                </p>
                <h2 className="text-2xl font-bold text-[#173D2A]">
                  {isMm ? otherBamboo.nameMm : otherBamboo.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOtherExpanded(!otherExpanded)}
                aria-expanded={otherExpanded}
                className="px-4 py-2 bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-lg text-xs font-semibold text-[#173D2A] inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                {otherExpanded ? (
                  <>
                    {t('Collapse Section', 'အချက်အလက် ပိတ်ရန်')} <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    {t('Expand Details', 'အသေးစိတ် ဖွင့်ကြည့်ရန်')} <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {otherExpanded && (
              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5">
                  <VisualAssetFrame
                    type="bamboo-custom"
                    aspectClassName="aspect-[16/10]"
                    label={otherBamboo.placeholderNote}
                  />
                </div>

                <div className="lg:col-span-7">
                  <p className="text-base font-semibold text-[#173D2A] mb-3">
                    {t(
                      'Contact us to learn more about our other bamboo products.',
                      'အခြားသော ဝါးထုတ်ကုန်များအကြောင်း ပိုမိုသိရှိလိုပါက ကျွန်ုပ်တို့ထံ ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။'
                    )}
                  </p>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed mb-6">
                    {isMm ? otherBamboo.detailedDescriptionMm : otherBamboo.detailedDescription}
                  </p>

                  <div className="p-4 bg-white border border-[#DDE5D9] rounded-lg text-xs text-[#26332B]/80 mb-6">
                    {isMm ? (
                      <p>
                        <strong>ဆက်သွယ်မေးမြန်းရန် လမ်းညွှန်ချက် -</strong> လူကြီးမင်းတို့ လိုအပ်သော ဝါးထုတ်ကုန်အမျိုးအစား၊ အရွယ်အစား၊ ထုပ်ပိုးမှုပုံစံနှင့် ပြည်တွင်းဖြန့်ဖြူးရန် သို့မဟုတ် ပြည်ပတင်ပို့ရန် လိုအပ်ချက်များကို ထည့်သွင်းမေးမြန်းနိုင်ပါသည်။
                      </p>
                    ) : (
                      <p>
                        <strong>Direct Inquiry Guidance:</strong> Please let our team know your required bamboo product type, dimensions, packaging format, and whether your order is for domestic Myanmar distribution or international export.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      type="button"
                      variant="primary-dark"
                      onClick={() =>
                        onInquireWithCategory('Other Bamboo Products', true)
                      }
                    >
                      {t('Inquire About Other Bamboo Products', 'အခြား ဝါးထုတ်ကုန်များ မေးမြန်းရန်')}
                      <ArrowRight className="w-4 h-4 text-[#A8D977]" />
                    </Button>
                    <a
                      href={COMPANY_INFO.telephoneHref}
                      className="px-4 py-2.5 bg-[#A8D977] hover:bg-[#97cc64] text-[#173D2A] text-xs font-bold rounded-lg inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <Phone className="w-4 h-4" />
                      {t(`Call ${COMPANY_INFO.telephone}`, `ဖုန်းခေါ်ဆိုရန် ${COMPANY_INFO.telephone}`)}
                    </a>
                  </div>
                </div>
              </div>
            )}
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
