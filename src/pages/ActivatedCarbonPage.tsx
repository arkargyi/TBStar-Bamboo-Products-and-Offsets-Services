import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, MessageCircle, Phone } from 'lucide-react';
import {
  ACTIVATED_CARBON_PRODUCTS,
  BAMBOO_PRODUCTS,
  COMPANY_INFO,
  filterProductsBySearchQuery,
  InquiryTypeOption,
  PageRoute,
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
import { BambooProductIcon, PrintingServiceIcon } from '../components/PrintingIcons';
import { useLanguage } from '../context/LanguageContext';
import { AnimatedHeading } from '../components/AnimatedHeading';

interface ActivatedCarbonPageProps {
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

export const ActivatedCarbonPage: React.FC<ActivatedCarbonPageProps> = ({
  onNavigate,
  onInquireWithCategory,
}) => {
  const { isMm, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivatedCarbonProducts = useMemo(
    () =>
      filterProductsBySearchQuery(
        ACTIVATED_CARBON_PRODUCTS,
        searchQuery,
        'activated-carbon'
      ),
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
          { label: 'Activated Carbon', route: '/activated-carbon' },
        ]}
        onNavigate={onNavigate}
        kicker="TB Star Company Limited · Myanmar Activated Carbon Supplier & B2B Exporter"
        kickerMm="TBStar Company Limited · မြန်မာ့ အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon) ပြည်ပပို့ကုန်နှင့် လက်ကားဖြန့်ဖြူးရေး"
        title="Nut Shell & Coconut Shell Activated Carbon Export Supply"
        titleMm="Nut Shell နှင့် Coconut Shell အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon) ပြည်ပပို့ကုန်များ"
        description="As a B2B exporter and wholesale supplier in Yangon, Myanmar, TB Star Company Limited supplies Nut Shell Activated Carbon (Raw Material: Jujube Seed) and Coconut Shell Activated Carbon (Raw Material: Coconut Shell), packed in standardized 25 Kg per bag export packaging for international buyers and bulk importers."
        descriptionMm="ရန်ကုန်မြို့အခြေစိုက် TBStar Company Limited သည် မြန်မာနိုင်ငံထွက် ဇီးစေ့ခွံ (Jujube Seed) ကုန်ကြမ်းဖြင့် ထုတ်လုပ်ထားသော Nut Shell Activated Carbon နှင့် အုန်းမှုတ်ခွံ (Coconut Shell) ကုန်ကြမ်းဖြင့် ထုတ်လုပ်ထားသော Coconut Shell Activated Carbon တို့ကို တစ်အိတ်လျှင် ၂၅ ကီလိုဂရမ် (25 Kg per Bag) ပို့ကုန်စံနှုန်းဖြင့် ပြည်တွင်းနှင့် နိုင်ငံတကာ B2B ဝယ်ယူသူများထံ တင်ပို့ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။"
        actions={
          <>
            <Button
              type="button"
              variant="primary-light"
              href="/contact?inquiry=Activated%20Carbon"
              onClick={() => onInquireWithCategory('Activated Carbon', true)}
            >
              {t('Inquire About Activated Carbon', 'Activated Carbon မေးမြန်းရန်')}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline-light"
              onClick={() => onInquireWithCategory('Activated Carbon', false)}
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
              {t('Jump to Product:', 'ထုတ်ကုန်အလိုက် ကြည့်ရှုရန် -')}
            </span>
            {ACTIVATED_CARBON_PRODUCTS.map((product) => (
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
            <a
              href="/bamboo-products"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/bamboo-products');
              }}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#F6F8F3] hover:bg-[#A8D977]/40 text-[#173D2A] border border-[#DDE5D9] hover:border-[#245C3A] transition-colors inline-flex items-center gap-2"
            >
              <BambooProductIcon type="bamboo-split" className="w-4 h-4 shrink-0" />
              <span>{t('Natural Bamboo Products →', 'သဘာဝဝါးထုတ်ကုန်များ →')}</span>
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
              <span>{t('Printing Services & Stationery', 'ပုံနှိပ်နှင့် စာရေးကိရိယာ')}</span>
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

      {/* Product Overview Cards with Real-Time Centralized Search */}
      <section
        id="activated-carbon-overview"
        aria-label="Activated Carbon Product Line Overview"
        className="py-16 bg-[#F6F8F3] border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Wholesale & Export Activated Carbon · Country of Origin: Myanmar"
            kickerMm="ပြည်ပပို့ကုန်နှင့် လက်ကား အက်တီဗိတ်တက် ကာဗွန် · မူရင်းနိုင်ငံ - မြန်မာ"
            title="Nut Shell Activated Carbon & Coconut Shell Activated Carbon"
            titleMm="Nut Shell Activated Carbon နှင့် Coconut Shell Activated Carbon"
            description="Explore our two Myanmar Activated Carbon export offerings—Nut Shell Activated Carbon (Jujube Seed Activated Carbon) and Coconut Shell Activated Carbon—each supplied in standardized 25 Kg per bag bulk packaging for B2B commercial trade and international export."
            descriptionMm="မြန်မာနိုင်ငံထွက် ဇီးစေ့ခွံ (Jujube Seed) ကုန်ကြမ်းဖြင့် ထုတ်လုပ်ထားသော Nut Shell Activated Carbon နှင့် အုန်းမှုတ်ခွံ (Coconut Shell) ကုန်ကြမ်းဖြင့် ထုတ်လုပ်ထားသော Coconut Shell Activated Carbon ထုတ်ကုန် (၂) မျိုးကို တစ်အိတ်လျှင် ၂၅ ကီလိုဂရမ် (25 Kg per Bag) ပို့ကုန်စံနှုန်းဖြင့် လေ့လာကြည့်ရှုနိုင်ပါသည်။"
          />

          <SearchBar
            query={searchQuery}
            onSearch={setSearchQuery}
            totalCount={ACTIVATED_CARBON_PRODUCTS.length}
            resultCount={filteredActivatedCarbonProducts.length}
            showCategoryTabs={false}
            placeholder="Search Activated Carbon products by product name, raw material, or packaging (e.g., Nut Shell, Jujube Seed, Coconut Shell, 25 Kg)..."
            placeholderMm="Activated Carbon ထုတ်ကုန်အမည်၊ ကုန်ကြမ်း သို့မဟုတ် ထုပ်ပိုးမှုဖြင့် ရှာဖွေပါ (ဥပမာ - Nut Shell, Jujube Seed, Coconut Shell, 25 Kg)..."
            suggestions={[
              {
                label: 'Nut Shell Activated Carbon',
                labelMm: 'Nut Shell Activated Carbon',
                query: 'Nut Shell',
              },
              {
                label: 'Raw Material: Jujube Seed',
                labelMm: 'ဇီးစေ့ခွံ (Jujube Seed)',
                query: 'Jujube Seed',
              },
              {
                label: 'Coconut Shell Activated Carbon',
                labelMm: 'Coconut Shell Activated Carbon',
                query: 'Coconut Shell',
              },
              {
                label: '25 Kg per Bag',
                labelMm: 'တစ်အိတ် 25 Kg',
                query: '25 Kg',
              },
            ]}
            inputId="activated-carbon-page-search"
            className="mb-8"
          />

          {filteredActivatedCarbonProducts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {filteredActivatedCarbonProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  imageLoading="eager"
                  onInquireProduct={(type) => onInquireWithCategory(type, true)}
                  onViewDetails={() => scrollToProductSection(product.sectionId)}
                />
              ))}
            </div>
          ) : (
            <ProductSearchEmptyState
              query={searchQuery}
              onReset={() => setSearchQuery('')}
            />
          )}
        </div>
      </section>

      {/* Dynamic Detailed Sections for Each Activated Carbon Product */}
      {filteredActivatedCarbonProducts.map((product, idx) => {
        const isEvenSection = idx % 2 !== 0;

        return (
          <section
            key={product.id}
            id={product.sectionId}
            aria-labelledby={`${product.sectionId}-heading`}
            className={`py-20 border-b border-[#DDE5D9] ${
              isEvenSection ? 'bg-[#F6F8F3]' : 'bg-white'
            }`}
          >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: 16:9 Studio Product Image Frame & Product Overview Card */}
                <div className="lg:col-span-5">
                  <div className="rounded-xl overflow-hidden border border-[#DDE5D9] bg-white shadow-2xs">
                    <VisualAssetFrame
                      type={product.visualType}
                      imagePath={product.imagePath}
                      altText={product.imageAlt}
                      aspectClassName="aspect-[16/9]"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      label={
                        isMm && product.placeholderNoteMm
                          ? product.placeholderNoteMm
                          : product.placeholderNote
                      }
                    />
                  </div>

                  <div
                    className={`mt-6 border border-[#DDE5D9] rounded-xl p-6 shadow-2xs ${
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
                            `ACTIVATED CARBON PRODUCT ${product.index} · ORIGIN: MYANMAR`,
                            `အက်တီဗိတ်တက် ကာဗွန် ထုတ်ကုန် ${product.index} · မူရင်းနိုင်ငံ - မြန်မာ`
                          )}
                        </p>
                        <AnimatedHeading
                          tag="h2"
                          id={`${product.sectionId}-heading`}
                          className="text-2xl font-bold text-[#173D2A] justify-start"
                        >
                          {isMm ? product.nameMm : product.name}
                        </AnimatedHeading>
                      </div>
                    </div>

                    <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                      {isMm ? product.detailedDescriptionMm : product.detailedDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        variant="primary-dark"
                        href="/contact?inquiry=Activated%20Carbon"
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

                {/* Right Column: Verified Product Specification Table & B2B Export Consultation */}
                <div className="lg:col-span-7 space-y-6">
                  <ProductSpecificationTable
                    title={`${product.name} — Product Specifications`}
                    titleMm={`${product.nameMm} — ကုန်ပစ္စည်း စံချိန်စံညွှန်းဇယား`}
                    subtitle={`ACTIVATED CARBON PRODUCT ${product.index} · ORIGIN: MYANMAR`}
                    subtitleMm={`ထုတ်ကုန် ${product.index} · မူရင်းနိုင်ငံ - မြန်မာ`}
                    specifications={product.specifications}
                    onInquire={() => onInquireWithCategory(product.inquiryType, true)}
                    inquireLabel={`Inquire: ${product.name}`}
                    inquireLabelMm={`${product.nameMm} မေးမြန်းရန်`}
                  />

                  <div
                    className={`border border-[#DDE5D9] rounded-xl p-6 md:p-8 shadow-2xs ${
                      isEvenSection ? 'bg-white' : 'bg-[#F6F8F3]'
                    }`}
                  >
                    <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1.5">
                      {t(
                        'B2B EXPORT & COMMERCIAL SUPPLY · YANGON HEADQUARTERS',
                        'ပြည်ပပို့ကုန်နှင့် လက်ကားဖြန့်ဖြူးရေး · ရန်ကုန်ရုံးချုပ်'
                      )}
                    </p>
                    <AnimatedHeading
                      tag="h3"
                      className="text-xl font-bold text-[#173D2A] mb-3 justify-start"
                    >
                      {isMm
                        ? `${product.nameMm} — စီးပွားရေးလုပ်ငန်းသုံး ဆက်သွယ်မှာယူရန်`
                        : `${product.name} — B2B & Export Inquiries`}
                    </AnimatedHeading>
                    <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                      {isMm
                        ? `TBStar Company Limited သည် ${product.name} ကို တစ်အိတ်လျှင် ၂၅ ကီလိုဂရမ် (25 Kg per Bag) စံနှုန်းဖြင့် ပြည်တွင်းနှင့် နိုင်ငံတကာ ဝယ်ယူသူများထံ တင်ပို့ဖြန့်ဖြူးပေးလျက်ရှိပါသည်။ မှာယူလိုသော ပမာဏနှင့် ပို့ဆောင်ရေးအချက်အလက်များအတွက် ရန်ကုန်ရုံးချုပ်သို့ တိုက်ရိုက် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။`
                        : `TB Star Company Limited coordinates commercial supply and export inquiries for ${product.name} (25 Kg per Bag, Country of Origin: Myanmar) directly from our corporate headquarters at Central Tower, Kyauktada Township, Yangon.`}
                    </p>

                    <ul className="space-y-2.5 text-sm text-[#173D2A] font-medium mb-6">
                      {product.specifications.map((spec) => (
                        <li
                          key={`${product.id}-${spec.parameter}`}
                          className="flex items-start gap-2.5"
                        >
                          <Check className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
                          <span>
                            <strong>
                              {isMm && spec.parameterMm ? spec.parameterMm : spec.parameter}:
                            </strong>{' '}
                            {isMm && spec.valueMm ? spec.valueMm : spec.value}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-5 border-t border-[#DDE5D9] flex flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        variant="primary-dark"
                        size="sm"
                        href="/contact?inquiry=Activated%20Carbon"
                        onClick={() => onInquireWithCategory('Activated Carbon', true)}
                      >
                        {t('Submit Commercial Inquiry', 'ဆက်သွယ်မေးမြန်းလွှာ ပေးပို့ရန်')}
                        <ArrowRight className="w-3.5 h-3.5 text-[#A8D977]" />
                      </Button>
                      <a
                        href={COMPANY_INFO.telephoneHref}
                        className="px-4 py-2 bg-white hover:bg-[#EAF5E4] border border-[#DDE5D9] text-[#173D2A] text-xs font-semibold rounded-lg inline-flex items-center gap-2 transition-colors"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Related Natural Bamboo Products Cross-Links Section */}
      {BAMBOO_PRODUCTS.length > 0 && (
        <section className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              kicker="Related Product Lines · 100% Natural Myanmar Bamboo"
              kickerMm="ဆက်စပ် ထုတ်ကုန်များ · ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များ"
              title="Explore Our Natural Bamboo Split & Bamboo Sticks"
              titleMm="ကျွန်ုပ်တို့၏ သဘာဝ ဝါးခြမ်းပြား (Bamboo Split) နှင့် ဝါးတံ (Bamboo Sticks) များ"
              description="Review our verified specifications for 100% natural Myanmar Bamboo Split (3 mm thickness, 20 to 48 inches, with nodes or without nodes) and Bamboo Sticks (1 KG Per Bundle / 30 Bundles Per Bag)."
              descriptionMm="ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်အတွက် ထုတ်လုပ်ထားသော ဝါးခြမ်းပြား (အထူ 3 mm၊ အရှည် ၂၀&quot; မှ ၄၈&quot;၊ အဆစ်ပါ / အဆစ်မပါ) နှင့် ဝါးတံ (တစ်စည်းလျှင် ၁ ကီလိုဂရမ် / တစ်အိတ်လျှင် ၃၀ စည်း) စံချိန်စံညွှန်းများကိုလည်း လေ့လာနိုင်ပါသည်။"
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
              {BAMBOO_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl p-6 flex flex-col justify-between transition-colors shadow-2xs"
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
                    <AnimatedHeading
                      tag="h3"
                      className="text-xl font-bold text-[#173D2A] mb-2 justify-start"
                    >
                      {isMm ? prod.nameMm : prod.name}
                    </AnimatedHeading>
                    <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                      {isMm ? prod.shortDescriptionMm : prod.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#DDE5D9] flex flex-wrap items-center gap-3">
                    <Button
                      type="button"
                      variant="primary-dark"
                      size="sm"
                      href={prod.href}
                      onClick={() => onNavigate(prod.route)}
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
      )}

      <ContactCTA
        onNavigate={onNavigate}
        onInquireWithCategory={onInquireWithCategory}
      />
    </div>
  );
};
