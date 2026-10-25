import React from 'react';
import { ArrowRight } from 'lucide-react';
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
        kicker="Visual Documentation · Verified Brand Assets & Replaceable Product Slots"
        kickerMm="ဓာတ်ပုံမှတ်တမ်း · တရားဝင် အမှတ်တံဆိပ်နှင့် ထုတ်ကုန်ပြခန်း"
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

      {/* Verified Official Asset Section */}
      <section className="py-16 bg-white border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center justify-center bg-white border border-[#DDE5D9] rounded-xl p-6">
              <img
                src={COMPANY_INFO.logoPath}
                alt="Official TB Star Company Limited (TUN BROTHERS) Star Emblem Logo"
                referrerPolicy="no-referrer"
                className="w-40 h-40 object-contain"
              />
              <p className="mt-3 text-xs font-mono-tabular text-[#245C3A] font-semibold">
                {t('Verified Official Brand Asset', 'တရားဝင် အမှတ်တံဆိပ် လိုဂို')}
              </p>
            </div>

            <div className="lg:col-span-8">
              <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1.5">
                {t(
                  'ASSET TRANSPARENCY & AUTHENTICITY POLICY',
                  'ပုံရိပ်နှင့် အမှတ်တံဆိပ် စစ်မှန်မှု မူဝါဒ'
                )}
              </p>
              <h2 className="text-2xl font-bold text-[#173D2A] mb-3">
                {t(
                  'Verified Corporate Emblem & Replaceable Category Previews',
                  'တရားဝင် ကုမ္ပဏီအမှတ်တံဆိပ်နှင့် ကဏ္ဍအလိုက် ထုတ်ကုန်ပုံစံငယ်များ'
                )}
              </h2>
              <p className="text-sm text-[#26332B]/85 leading-relaxed mb-4">
                {isMm ? (
                  <>
                    ဤနေရာတွင် ဖော်ပြထားသော <strong>{COMPANY_INFO.logoEmblemText}</strong> ကြယ်ပုံသဏ္ဌာန် အမှတ်တံဆိပ်သည် <strong>{COMPANY_INFO.nameMm}</strong> ၏ တရားဝင် လိုဂိုဖြစ်ပြီး မူရင်းအချိုးအစားအတိုင်း ထိန်းသိမ်းဖော်ပြထားပါသည်။
                  </>
                ) : (
                  <>
                    The circular <strong>{COMPANY_INFO.logoEmblemText}</strong> star emblem shown here is the official verified logo asset supplied by <strong>{COMPANY_INFO.name}</strong>, preserved in its exact original proportions.
                  </>
                )}
              </p>
              <p className="text-sm text-[#26332B]/85 leading-relaxed">
                {t(
                  'For the product and operational gallery slots below, clearly labeled temporary technical graphics are displayed instead of unverified stock photographs, ensuring no external stock photos are misrepresented as actual TB Star factory facilities, employees, or machinery.',
                  'အောက်ပါ ထုတ်ကုန်နှင့် လုပ်ငန်းဆောင်တာပြကွက်များတွင် ပြင်ပမှ သက်ဆိုင်ခြင်းမရှိသော ဓာတ်ပုံများကို ကုမ္ပဏီ၏ စက်ရုံ သို့မဟုတ် ထုတ်ကုန်အဖြစ် မှားယွင်းဖော်ပြခြင်း မပြုဘဲ၊ ကုမ္ပဏီ၏ တရားဝင် ဓာတ်ပုံများဖြင့် အလွယ်တကူ အစားထိုးထည့်သွင်းနိုင်ရန် စနစ်တကျ ပုံစံထုတ်ထားပါသည်။'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filterable Gallery Grid with Lightbox */}
      <section className="py-20 bg-[#F6F8F3] border-b border-[#DDE5D9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Categorized Visual Showcase · Click 'Inspect' or 'Enlarge' for Lightbox View"
            kickerMm="ကဏ္ဍအလိုက် ဓာတ်ပုံပြခန်း · ပုံများကို အကြီးချဲ့၍ ကြည့်ရှုနိုင်ပါသည်"
            title="Product, Packaging & Printing Gallery"
            titleMm="ဝါးထုတ်ကုန်၊ ထုပ်ပိုးမှုနှင့် ပုံနှိပ်လုပ်ငန်း ပြခန်း"
            description="Filter by category to preview slots for Bamboo Products, Bamboo Production, Packaging, Printing Products, and Other Company Activities."
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
