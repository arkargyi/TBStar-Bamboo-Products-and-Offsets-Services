import React from 'react';
import { MapPin, Phone, Building2, Mail, MessageCircle } from 'lucide-react';
import {
  COMPANY_INFO,
  INQUIRY_TYPE_OPTIONS,
  InquiryTypeOption,
  PageRoute,
} from '../constants/companyData';
import { HeroSection } from '../components/SharedUI';
import { ContactForm } from '../components/InquiryModal';
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
        kicker="Corporate Office & Inquiry Desk · Kyauktada Township, Yangon"
        kickerMm="ရုံးချုပ်နှင့် ဆက်သွယ်စုံစမ်းရေးဌာန · ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့"
        title={`Contact ${COMPANY_INFO.name}`}
        titleMm="TBStar Company Limited သို့ ဆက်သွယ်ရန်"
        description="Get in touch with our Yangon office for Bamboo Split, Bamboo Sticks, Activated Carbon, one-stop Offset Printing services, and Ball Pen stationery inquiries."
        descriptionMm="ဝါးခြမ်းပြား (Bamboo Split)၊ ဝါးတံ (Bamboo Sticks)၊ Activated Carbon၊ အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှုများနှင့် ဘောပင် (Ball Pen) စာရေးကိရိယာများအတွက် ကျွန်ုပ်တို့၏ ရန်ကုန်ရုံးချုပ်သို့ တိုက်ရိုက် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={COMPANY_INFO.telephoneHref}
              className="px-5 py-3 bg-[#A8D977] hover:bg-[#97cc64] text-[#173D2A] text-sm font-bold rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4" />
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
            <a
              href={COMPANY_INFO.emailHref}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/25 text-white text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Mail className="w-4 h-4 text-[#A8D977]" />
              {COMPANY_INFO.email}
            </a>
          </div>
        }
      />

      {/* Main Contact Workspace */}
      <section className="py-20 bg-[#F6F8F3]">
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
                            {COMPANY_INFO.address.line1},<br />
                            {COMPANY_INFO.address.line2},<br />
                            {COMPANY_INFO.address.township}, {COMPANY_INFO.address.city},{' '}
                            {COMPANY_INFO.address.country}.
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

                  {/* Official Email */}
                  <div className="pt-5 border-t border-[#DDE5D9] flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#245C3A] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xs font-semibold text-[#245C3A] uppercase tracking-wider mb-1">
                        {t('Official Email Address', 'တရားဝင် အီးမေးလ်လိပ်စာ')}
                      </h3>
                      <a
                        href={COMPANY_INFO.emailHref}
                        className="text-base font-mono-tabular font-bold text-[#173D2A] hover:text-[#245C3A] transition-colors block mb-1"
                      >
                        {COMPANY_INFO.email}
                      </a>
                      <p className="text-xs text-[#26332B]/75">
                        {t(
                          'For export quotations, specifications, and offset printing files',
                          'ပြည်ပပို့ကုန် စျေးနှုန်းမေးမြန်းရန်နှင့် ပုံနှိပ်ဖိုင်များ ပေးပို့ရန်'
                        )}
                      </p>
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
                          'Located on the 11th Floor (Room No. 1103) of Central Tower at the intersection of 39th Street and Anawrahta Road in downtown Kyauktada Township, Yangon.',
                          'ရန်ကုန်မြို့လယ်၊ ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်ရှိ Central Tower (၁၁) လွှာ၊ အခန်းအမှတ် (၁၁၀၃) တွင် တည်ရှိပါသည်။'
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
