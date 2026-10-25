import React, { useState } from 'react';
import {
  Quote,
  Star,
  CheckCircle2,
  Globe2,
  Building2,
  ShieldCheck,
  ArrowRight,
  Phone,
  Sparkles,
} from 'lucide-react';
import {
  CLIENT_TESTIMONIALS,
  ClientTestimonialItem,
  COMPANY_INFO,
  InquiryTypeOption,
  PageRoute,
} from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';
import { Button, SectionHeading } from './SharedUI';

interface ClientTestimonialsProps {
  onNavigate?: (route: PageRoute) => void;
  onInquireWithCategory?: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

type FilterDivision = 'ALL' | 'Bamboo Export' | 'Offset Printing' | 'Domestic Distribution';

export const ClientTestimonials: React.FC<ClientTestimonialsProps> = ({
  onNavigate,
  onInquireWithCategory,
}) => {
  const { isMm, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterDivision>('ALL');

  const filterOptions: { id: FilterDivision; label: string; labelMm: string }[] = [
    { id: 'ALL', label: 'All Partners', labelMm: 'အားလုံး' },
    { id: 'Bamboo Export', label: 'Bamboo Export', labelMm: 'ဝါးထုတ်ကုန် ပြည်ပပို့ကုန်' },
    { id: 'Offset Printing', label: 'Offset Printing', labelMm: 'အော့ဖ်ဆက် ပုံနှိပ်လုပ်ငန်း' },
    { id: 'Domestic Distribution', label: 'Domestic Supply', labelMm: 'ပြည်တွင်းဖြန့်ဖြူးရေး' },
  ];

  const filteredTestimonials = CLIENT_TESTIMONIALS.filter((item) => {
    if (activeFilter === 'ALL') return true;
    return item.division === activeFilter;
  });

  const getDivisionBadgeColor = (division: ClientTestimonialItem['division']) => {
    switch (division) {
      case 'Bamboo Export':
        return 'bg-[#EAF5E4] text-[#173D2A] border-[#C3E4B5]';
      case 'Offset Printing':
        return 'bg-[#EBF2EE] text-[#1B432E] border-[#CFDFD6]';
      case 'Domestic Distribution':
        return 'bg-[#F4F6EA] text-[#2F441E] border-[#D9E1B8]';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAvatarBg = (initials: string) => {
    const palette = [
      'bg-[#173D2A] text-[#A8D977]',
      'bg-[#245C3A] text-white',
      'bg-[#2D6A4F] text-[#EAF5E4]',
      'bg-[#1E3F20] text-[#D8F3DC]',
    ];
    const index = initials.charCodeAt(0) % palette.length;
    return palette[index];
  };

  return (
    <section
      aria-label="Client Testimonials and Partner Trust"
      className="py-20 bg-[#FBFDF9] border-b border-[#DDE5D9] relative overflow-hidden"
    >
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-[#A8D977]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-[#245C3A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="Trust & Verified Partnerships · ဖောက်သည်များနှင့် မိတ်ဖက်များ၏ ယုံကြည်မှု"
          kickerMm="ယုံကြည်စိတ်ချရမှု · လုပ်ငန်းမိတ်ဖက်များနှင့် ဖောက်သည်များ၏ သုံးသပ်ချက်များ"
          title="What Our Partners & Clients Say"
          titleMm="လုပ်ငန်းမိတ်ဖက်များနှင့် ဖောက်သည်များ၏ မှတ်ချက်စကားများ"
          description="Direct perspectives from overseas commodity importers, domestic publishers, and commercial enterprises collaborating with TB Star Company Limited."
          descriptionMm="သဘာဝဝါးထုတ်ကုန် ပြည်ပတင်ပို့မှု၊ ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် One-Stop အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းများတွင် TB Star နှင့် လက်တွဲဆောင်ရွက်နေသော ပြည်တွင်းပြည်ပ မိတ်ဖက်များ၏ လက်တွေ့သုံးသပ်ချက်များ။"
          action={
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#245C3A] font-semibold bg-white border border-[#DDE5D9] px-3.5 py-2 rounded-full shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#245C3A]" />
              <span>
                {t(
                  'Verified B2B Client Partnerships',
                  'အသိအမှတ်ပြု B2B လုပ်ငန်းမိတ်ဖက်များ'
                )}
              </span>
            </div>
          }
        />

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-[#DDE5D9]/70">
          <span className="text-xs font-semibold text-[#26332B]/70 mr-2 uppercase tracking-wider">
            {t('Filter by Division:', 'ကဏ္ဍအလိုက် ရွေးချယ်ရန်:')}
          </span>
          {filterOptions.map((opt) => {
            const count =
              opt.id === 'ALL'
                ? CLIENT_TESTIMONIALS.length
                : CLIENT_TESTIMONIALS.filter((t) => t.division === opt.id).length;
            const isActive = activeFilter === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setActiveFilter(opt.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#173D2A] text-white shadow-xs'
                    : 'bg-white text-[#26332B] hover:bg-[#F0F4EC] border border-[#DDE5D9]'
                }`}
              >
                <span>{isMm ? opt.labelMm : opt.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-tabular ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F0F4EC] text-[#245C3A]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#DDE5D9] hover:border-[#A8D977] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200 relative group"
            >
              {/* Decorative Quote Watermark */}
              <Quote
                aria-hidden="true"
                className="w-10 h-10 text-[#A8D977]/25 absolute top-5 right-5 pointer-events-none group-hover:text-[#A8D977]/40 transition-colors"
              />

              <div>
                {/* Top Card Metadata Row: Division Badge & Star Rating */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-md border ${getDivisionBadgeColor(
                      item.division
                    )}`}
                  >
                    {isMm ? item.divisionMm : item.division}
                  </span>

                  {/* 5-Star Rating display */}
                  <div
                    className="flex items-center gap-0.5 text-amber-400"
                    aria-label={`Rating: ${item.rating} out of 5 stars`}
                  >
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <blockquote className="mb-5">
                  <p
                    className={`text-[#173D2A] text-sm sm:text-[14.5px] leading-relaxed font-normal ${
                      isMm ? 'font-myanmar leading-[1.65]' : ''
                    }`}
                  >
                    “{isMm ? item.quoteMm : item.quote}”
                  </p>
                </blockquote>

                {/* Highlight Metric Badge */}
                <div className="mb-6 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F6F8F3] border border-[#DDE5D9] rounded-md text-[11px] text-[#245C3A] font-semibold">
                  <Sparkles className="w-3 h-3 text-[#5A9B32] shrink-0" />
                  <span>{isMm ? item.highlightMetricMm : item.highlightMetric}</span>
                </div>
              </div>

              {/* Author & Organization Profile Footer */}
              <div className="pt-4 border-t border-[#DDE5D9]/80 flex items-start gap-3.5">
                {/* Monogram Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${getAvatarBg(
                    item.avatarInitials
                  )}`}
                  aria-hidden="true"
                >
                  {item.avatarInitials}
                </div>

                {/* Identity Information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-[#173D2A] truncate">
                      {isMm ? item.clientNameMm : item.clientName}
                    </p>
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-[#245C3A] shrink-0"
                      aria-label="Verified partner"
                    />
                  </div>

                  <p className="text-xs text-[#26332B]/80 font-medium truncate mt-0.5">
                    {isMm ? item.roleMm : item.role}
                  </p>

                  <p className="text-xs text-[#245C3A] font-semibold truncate mt-0.5">
                    {isMm ? item.organizationMm : item.organization}
                  </p>

                  <div className="flex items-center gap-1 text-[11px] text-[#26332B]/60 mt-1">
                    {item.division === 'Bamboo Export' ? (
                      <Globe2 className="w-3 h-3 text-[#245C3A]/70 shrink-0" />
                    ) : (
                      <Building2 className="w-3 h-3 text-[#245C3A]/70 shrink-0" />
                    )}
                    <span className="truncate">
                      {isMm ? item.locationMm : item.location} · {item.yearOfPartnership}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Highlights & Quality Assurance Row */}
        <div className="bg-white border border-[#DDE5D9] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EAF5E4] text-[#173D2A] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#245C3A]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#173D2A]">
                  {t('100% Natural Material', '၁၀၀% သဘာဝဝါးစစ်စစ်')}
                </h4>
                <p className="text-xs text-[#26332B]/75 mt-0.5 leading-relaxed">
                  {t(
                    'Precision split & stick sizing from raw Myanmar bamboo.',
                    'မြန်မာနိုင်ငံထွက် သဘာဝဝါးဖြင့် စံချိန်မီ ထုတ်လုပ်ထားပါသည်။'
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EAF5E4] text-[#173D2A] flex items-center justify-center shrink-0">
                <Globe2 className="w-5 h-5 text-[#245C3A]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#173D2A]">
                  {t('Standard 30KG Packaging', '၃၀ ကီလိုဂရမ် စံနှုန်းထုပ်ပိုးမှု')}
                </h4>
                <p className="text-xs text-[#26332B]/75 mt-0.5 leading-relaxed">
                  {t(
                    'Export-ready bagging optimized for international container freight.',
                    'ပြည်ပတင်ပို့မှု လွယ်ကူစေရန် စနစ်တကျ ထုပ်ပိုးထားရှိပါသည်။'
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EAF5E4] text-[#173D2A] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-[#245C3A]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#173D2A]">
                  {t('One-Stop Offset Press', 'One-Stop အော့ဖ်ဆက်ပုံနှိပ်')}
                </h4>
                <p className="text-xs text-[#26332B]/75 mt-0.5 leading-relaxed">
                  {t(
                    'Books, voucher books, and commercial form production.',
                    'စာအုပ်များနှင့် ဘောင်ချာစာအုပ်များ အပြီးအစီး ဆောင်ရွက်ပေးခြင်း။'
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EAF5E4] text-[#173D2A] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#245C3A]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#173D2A]">
                  {t('Central Tower Headquarters', 'Central Tower ရုံးချုပ်')}
                </h4>
                <p className="text-xs text-[#26332B]/75 mt-0.5 leading-relaxed">
                  {t(
                    'Direct B2B coordination in Kyauktada, Yangon.',
                    'ရန်ကုန်မြို့ ကျောက်တံတားမြို့နယ်တွင် တိုက်ရိုက်ဆက်သွယ်နိုင်ပါသည်။'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-8 pt-6 border-t border-[#DDE5D9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-[#173D2A]">
                {t(
                  'Interested in partnering with TB Star Company Limited?',
                  'TB Star Company Limited နှင့် လက်တွဲဆောင်ရွက်လိုပါသလား။'
                )}
              </p>
              <p className="text-xs text-[#26332B]/70 mt-0.5">
                {t(
                  'Reach our Yangon team for sample requests, export container quotes, or offset printing consultations.',
                  'ဝါးထုတ်ကုန် နမူနာ၊ ပြည်ပပို့ကုန် ကွန်တိန်နာမှာယူမှုနှင့် ပုံနှိပ်လုပ်ငန်းများအတွက် ဆက်သွယ်နိုင်ပါသည်။'
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {onNavigate && (
                <Button
                  type="button"
                  variant="primary-dark"
                  size="sm"
                  onClick={() => onNavigate('/contact')}
                >
                  {t('Contact Our Team', 'ဆက်သွယ်မေးမြန်းရန်')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              )}

              <a
                href={COMPANY_INFO.telephoneHref}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#173D2A] bg-[#F6F8F3] hover:bg-[#EAF5E4] border border-[#DDE5D9] rounded-lg transition-colors font-mono-tabular"
              >
                <Phone className="w-3.5 h-3.5 text-[#245C3A]" />
                <span>{COMPANY_INFO.telephone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
