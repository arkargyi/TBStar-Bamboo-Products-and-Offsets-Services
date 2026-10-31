import React from 'react';
import { MapPin, Phone, Building2, MessageCircle, Navigation } from 'lucide-react';
import {
  COMPANY_INFO,
  INQUIRY_TYPE_OPTIONS,
  InquiryTypeOption,
  PageRoute,
} from '../constants/companyData';
import { HeroSection } from '../components/SharedUI';
import { ContactForm } from '../components/InquiryModal';
import {
  OfficeLocationMap,
  GET_DIRECTIONS_URL,
  PRIMARY_COORDINATES_TEXT,
} from '../components/OfficeLocationMap';
import { INQUIRY_TYPE_LABELS, useLanguage } from '../context/LanguageContext';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
  selectedInquiryType: InquiryTypeOption;
  onSelectInquiryType: (type: InquiryTypeOption) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  selectedInquiryType,
  onSelectInquiryType,
}) => {
  const { isMm, t } = useLanguage();

  return (
    <div>
      {/* Page Hero */}
      <HeroSection
        breadcrumbs={[
          { label: 'Home', route: '/' },
          { label: 'Contact Us', route: '/contact' },
        ]}
        onNavigate={onNavigate}
        kicker="Corporate Office & Official Location · Kyauktada Township, Yangon"
        kickerMm="ရုံးချုပ်တည်နေရာနှင့် ဆက်သွယ်စုံစမ်းရေးဌာန · ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့"
        title={`Contact ${COMPANY_INFO.name}`}
        titleMm="TBStar Company Limited သို့ ဆက်သွယ်ရန်"
        description="Visit or contact our official Yangon headquarters at the Corner of 39th Street and Anawrahta Road, Kyauktada Township for Bamboo Split, Bamboo Sticks, Activated Carbon, Offset Printing services, and Ball Pen stationery inquiries."
        descriptionMm="ဝါးခြမ်းပြား (Bamboo Split)၊ ဝါးတံ (Bamboo Sticks)၊ Activated Carbon၊ အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှုများနှင့် ဘောပင် (Ball Pen) စာရေးကိရိယာများအတွက် ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်ရှိ ကျွန်ုပ်တို့၏ ရန်ကုန်ရုံးချုပ်သို့ တိုက်ရိုက် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={GET_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Directions to TB Star Company Limited in Google Maps"
              className="px-5 py-3 bg-[#A8D977] hover:bg-[#97cc64] text-[#173D2A] text-sm font-bold rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Navigation className="w-4 h-4" />
              {t('Get Directions', 'လမ်းညွှန် ရယူရန်')}
            </a>
            <a
              href={COMPANY_INFO.telephoneHref}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-sm font-bold rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 text-[#A8D977]" />
              {t(`Call ${COMPANY_INFO.telephone}`, `ဖုန်းခေါ်ဆိုရန် ${COMPANY_INFO.telephone}`)}
            </a>
            <a
              href={COMPANY_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#25D366] hover:bg-[#1fb855] text-white text-sm font-bold rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              {t('Chat on WhatsApp', 'WhatsApp ဖြင့် ဆက်သွယ်ရန်')}
            </a>
          </div>
        }
      />

      {/* Primary Focus Section: Official Company Location & Interactive Google Map */}
      <section
        id="company-location-map"
        aria-labelledby="location-map-heading"
        className="py-14 sm:py-16 bg-[#F6F8F3] border-b border-[#DDE5D9]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#245C3A] font-semibold mb-2">
              {t(
                `PRIMARY COMPANY LOCATION · GPS ${PRIMARY_COORDINATES_TEXT}`,
                `ပင်မ ကုမ္ပဏီတည်နေရာ · GPS ${PRIMARY_COORDINATES_TEXT}`
              )}
            </p>
            <h2
              id="location-map-heading"
              className="text-2xl sm:text-3xl font-bold text-[#173D2A] tracking-tight mb-3"
            >
              {t(
                'Our Location at Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon',
                'ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်ရှိ ကျွန်ုပ်တို့၏ ရုံးချုပ်တည်နေရာ'
              )}
            </h2>
            <p className="text-sm sm:text-base text-[#26332B]/85 leading-relaxed">
              {t(
                'Use the interactive Google Map and Location Information Card below to view our exact office pin, copy our address or GPS coordinates, or launch turn-by-turn directions in Google Maps.',
                'အောက်ပါ အပြန်အလှန်အသုံးပြုနိုင်သော Google မြေပုံနှင့် တည်နေရာအချက်အလက်ကတ်မှတစ်ဆင့် ရုံးချုပ်တည်နေရာအတိအကျကို ကြည့်ရှုခြင်း၊ လိပ်စာနှင့် ကိုသြဒိနိတ်များ ကူးယူခြင်း သို့မဟုတ် Google Maps လမ်းညွှန် ফွင့်ခြင်းများ ပြုလုပ်နိုင်ပါသည်။'
              )}
            </p>
          </div>

          <OfficeLocationMap />
        </div>
      </section>

      {/* Secondary Section: Direct Contact Channels & Validated Inquiry Form */}
      <section className="py-16 sm:py-20 bg-[#F6F8F3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Official Company Information & Verified Location Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#DDE5D9] rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-4 pb-5 mb-6 border-b border-[#DDE5D9]">
                  <img
                    src={COMPANY_INFO.logoPath}
                    alt="TB Star Company Limited Official Logo"
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full object-contain bg-white p-0.5 border border-[#DDE5D9] shrink-0"
                  />
                  <div>
                    <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold">
                      {t('OFFICIAL CONTACT DETAILS', 'တရားဝင် ဆက်သွယ်ရန် အချက်အလက်များ')}
                    </p>
                    <h2 className="text-xl font-bold text-[#173D2A]">
                      {t(COMPANY_INFO.name, 'TBStar Company Limited')}
                    </h2>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Office Address */}
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#245C3A] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xs font-semibold text-[#245C3A] uppercase tracking-wider mb-1">
                        {t('Registered Office Address', 'ရုံးချုပ်လိပ်စာ')}
                      </h3>
                      <address className="not-italic text-sm text-[#173D2A] font-medium leading-relaxed">
                        {isMm ? (
                          <span>{COMPANY_INFO.address.fullMm}</span>
                        ) : (
                          <>
                            Corner of 39th Street and Anawrahta Road,
                            <br />
                            Kyauktada Township, Yangon, Myanmar.
                            <br />
                            <span className="text-xs text-[#26332B]/80">
                              ({COMPANY_INFO.address.line1})
                            </span>
                          </>
                        )}
                      </address>
                    </div>
                  </div>

                  {/* Telephone & WhatsApp */}
                  <div className="pt-5 border-t border-[#DDE5D9] flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#245C3A] shrink-0 mt-1" />
                    <div className="w-full">
                      <h3 className="text-xs font-semibold text-[#245C3A] uppercase tracking-wider mb-1">
                        {t('Phone & WhatsApp Contact', 'ဖုန်း နှင့် WhatsApp ဆက်သွယ်ရန်')}
                      </h3>
                      <a
                        href={COMPANY_INFO.telephoneHref}
                        className="text-lg font-mono-tabular font-bold text-[#173D2A] hover:text-[#245C3A] transition-colors block mb-3"
                      >
                        {COMPANY_INFO.telephone}
                      </a>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <a
                          href={COMPANY_INFO.telephoneHref}
                          className="px-4 py-2 bg-[#173D2A] hover:bg-[#245C3A] text-white text-xs font-semibold rounded-lg inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#A8D977]" />
                          {t('Call Office', 'ဖုန်းခေါ်ဆိုရန်')}
                        </a>
                        <a
                          href={COMPANY_INFO.whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-bold rounded-lg inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          {t('WhatsApp Chat', 'WhatsApp ပို့ရန်')}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Verified Location Landmark Context */}
                  <div className="pt-5 border-t border-[#DDE5D9] flex items-start gap-3.5">
                    <Building2 className="w-5 h-5 text-[#245C3A] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xs font-semibold text-[#245C3A] uppercase tracking-wider mb-1">
                        {t('Location & Landmark Reference', 'တည်နေရာ လမ်းညွှန်')}
                      </h3>
                      <p className="text-xs text-[#26332B]/85 leading-relaxed">
                        {t(
                          'Located at the Corner of 39th Street and Anawrahta Road (Central Tower, 11th Floor, Room No. 1103) in downtown Kyauktada Township, Yangon (GPS: 16.776671, 96.163664).',
                          'ရန်ကုန်မြို့လယ်၊ ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်ရှိ Central Tower (၁၁) လွှာ၊ အခန်းအမှတ် (၁၁၀၃) တွင် တည်ရှိပါသည် (GPS: 16.776671, 96.163664)။'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Preselect Category Selector */}
              <div className="bg-white border border-[#DDE5D9] rounded-xl p-6">
                <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                  {t('PRESELECTED INQUIRY CATEGORY', 'မေးမြန်းလိုသည့် ကဏ္ဍရွေးချယ်ရန်')}
                </p>
                <p className="text-xs text-[#26332B]/80 mb-3">
                  {t(
                    'Your selected inquiry category is preserved across pages. Click any topic below to switch:',
                    'မေးမြန်းလိုသည့် ကဏ္ဍကို အောက်ပါခလုတ်များနှိပ်၍ အလွယ်တကူ ပြောင်းလဲရွေးချယ်နိုင်ပါသည် -'
                  )}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {INQUIRY_TYPE_OPTIONS.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => onSelectInquiryType(type)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                        selectedInquiryType === type
                          ? 'bg-[#173D2A] text-white'
                          : 'bg-[#F6F8F3] text-[#26332B] hover:text-[#173D2A] border border-[#DDE5D9]'
                      }`}
                    >
                      {isMm ? INQUIRY_TYPE_LABELS[type].mm : INQUIRY_TYPE_LABELS[type].en}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Validated 6-Field Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm
                selectedInquiryType={selectedInquiryType}
                onSelectInquiryType={onSelectInquiryType}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
