import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import {
  COMPANY_INFO,
  GALLERY_PREVIEW_ITEMS,
  InquiryTypeOption,
  PageRoute,
} from '../data/companyData';
import { Button, HeroSection, SectionHeading } from '../components/SharedUI';
import { ContactCTA, GalleryGrid } from '../components/CatalogComponents';
import { useLanguage } from '../context/LanguageContext';

interface GalleryPageProps {
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
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
          { label: 'Projects / Gallery', route: '/gallery' },
        ]}
        onNavigate={onNavigate}
        kicker="Corporate Visual Portfolio · Products, Packaging & Printing"
        kickerMm="ဓာတ်ပုံမှတ်တမ်း · ကုမ္ပဏီ၏ ထုတ်ကုန်နှင့် လုပ်ငန်းဆောင်ရွက်မှု ပြခန်း"
        title="Projects & Product Gallery"
        titleMm="လုပ်ငန်းနှင့် ထုတ်ကုန် မှတ်တမ်းဓာတ်ပုံများ ကဏ္ဍ"
        description="Explore visual categories across Bamboo Products, Bamboo Production, Packaging, Printing Products, and Other Company Activities."
        descriptionMm="ဝါးထုတ်ကုန်များ၊ ဝါးထုတ်လုပ်မှုလုပ်ငန်းစဉ်၊ ထုပ်ပိုးမှုပုံစံများ၊ အော့ဖ်ဆက် ပုံနှိပ်ထုတ်ကုန်များနှင့် အခြားကုမ္ပဏီလုပ်ငန်းဆောင်တာများကို ကဏ္ဍအလိုက် လေ့လာကြည့်ရှုနိုင်ပါသည်။"
        actions={
          <>
            <Button
              type="button"
              variant="primary-light"
              onClick={() => onNavigate('/bamboo-products')}
            >
              {t('View Bamboo Specifications', 'ဝါးထုတ်ကုန် စံချိန်စံညွှန်း ကြည့်ရန်')}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline-light"
              onClick={() => onNavigate('/contact')}
            >
              {t('Contact Our Office', 'ရုံးသို့ ဆက်သွယ်ရန်')}
            </Button>
          </>
        }
      />

      {/* Official Corporate Brand Showcase */}
      <section className="py-16 bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-2xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xs">
            <div className="lg:col-span-4 flex flex-col items-center justify-center bg-white border border-[#DDE5D9] rounded-xl p-6">
              <img
                src={COMPANY_INFO.logoPath}
                alt="Official TB Star Company Limited (TUN BROTHERS) Star Emblem Logo"
                referrerPolicy="no-referrer"
                className="w-36 h-36 object-contain"
              />
              <p className="mt-3 text-xs font-mono-tabular text-[#245C3A] font-semibold">
                {t('Official Corporate Emblem', 'တရားဝင် အမှတ်တံဆိပ် လိုဂို')}
              </p>
            </div>

            <div className="lg:col-span-8">
              <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1.5">
                {t(
                  'TB STAR COMPANY LIMITED · YANGON, MYANMAR',
                  'တီဘီစတား ကုမ္ပဏီ လီမိတက် · ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ'
                )}
              </p>
              <h2 className="text-2xl font-bold text-[#173D2A] mb-3">
                {t(
                  '100% Natural Myanmar Bamboo & One-Stop Offset Printing Portfolio',
                  '၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်နှင့် အော့ဖ်ဆက် ပုံနှိပ်လုပ်ငန်း ပြခန်း'
                )}
              </h2>
              <p className="text-sm text-[#26332B]/85 leading-relaxed mb-4">
                {isMm ? (
                  <>
                    <strong>{COMPANY_INFO.nameMm}</strong> သည် မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးစစ်စစ်ဖြင့် ထုတ်လုပ်ထားသော ဝါးခြမ်းပြား (Bamboo Split) နှင့် တစ်အိတ်လျှင် ၃၀ ကီလိုဂရမ် (30 kg) စံနှုန်းဖြင့် ထုပ်ပိုးထားသော ဝါးတံ (Bamboo Sticks) များကို ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် ပြည်ပပို့ကုန်စျေးကွက်များသို့ တင်ပို့ရောင်းချလျက်ရှိပါသည်။
                  </>
                ) : (
                  <>
                    <strong>{COMPANY_INFO.name}</strong> manufactures 100% natural Myanmar Bamboo Split (3 mm thickness, 20&quot;–48&quot;) and Bamboo Sticks (1.2–2.5 mm, 8&quot;/9&quot;/10&quot;, packed at 30 kg per bag) for domestic distribution and international export.
                  </>
                )}
              </p>
              <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
                {t(
                  'Alongside bamboo production and export, our commercial press division delivers one-stop offset printing services for books, commercial voucher books, corporate brochures, and office stationery.',
                  'ထို့အပြင် စာအုပ်များ၊ လုပ်ငန်းသုံးဘောင်ချာစာအုပ်များ၊ လက်ကမ်းစာစောင်များနှင့် ရုံးသုံးပုံနှိပ်ပစ္စည်းအမျိုးမျိုးကိုလည်း တစ်နေရာတည်းတွင် အပြီးအစီး (One-Stop Offset Printing Service) တာဝန်ယူ ဆောင်ရွက်ပေးလျက်ရှိပါသည်။'
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="primary-dark"
                  size="sm"
                  onClick={() => onNavigate('/contact')}
                >
                  {t('Request Product Inquiry', 'ထုတ်ကုန်နှင့် ဝန်ဆောင်မှု မေးမြန်းရန်')}
                  <ArrowRight className="w-3.5 h-3.5 text-[#A8D977]" />
                </Button>
                <a
                  href={COMPANY_INFO.telephoneHref}
                  className="px-4 py-2 bg-white border border-[#DDE5D9] hover:border-[#245C3A] text-[#173D2A] text-xs font-semibold rounded-lg inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#245C3A]" />
                  <span>{COMPANY_INFO.telephone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filterable Gallery Grid with Lightbox */}
      <section className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Categorized Visual Showcase · Click 'View' or 'Enlarge Photo' for Full View"
            kickerMm="ကဏ္ဍအလိုက် ဓာတ်ပုံပြခန်း · ပုံများကို အကြီးချဲ့၍ ကြည့်ရှုနိုင်ပါသည်"
            title="Product, Packaging & Printing Gallery"
            titleMm="ဝါးထုတ်ကုန်၊ ထုပ်ပိုးမှုနှင့် ပုံနှိပ်လုပ်ငန်း ပြခန်း"
            description="Filter by category to inspect our Bamboo Products, Bamboo Production, 30 kg Export Packaging, and Offset Printing deliverables."
            descriptionMm="ဝါးထုတ်ကုန်များ၊ ဝါးထုတ်လုပ်မှုလုပ်ငန်းစဉ်၊ ထုပ်ပိုးမှု၊ ပုံနှိပ်ထုတ်ကုန်များနှင့် အခြားကုမ္ပဏီလုပ်ငန်းဆောင်တာများကို ကဏ္ဍအလိုက် ရွေးချယ်ကြည့်ရှုနိုင်ပါသည်။"
          />

          <GalleryGrid
            items={GALLERY_PREVIEW_ITEMS}
            showCategoryFilters={true}
            onInquireFromGallery={(type) => onInquireWithCategory(type, true)}
          />
        </div>
      </section>

      <ContactCTA
        onNavigate={onNavigate}
        onInquireWithCategory={onInquireWithCategory}
      />
    </div>
  );
};
