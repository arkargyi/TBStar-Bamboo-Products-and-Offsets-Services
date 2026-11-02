import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { COMPANY_INFO, InquiryTypeOption, PageRoute } from '../constants/companyData';
import { BambooProductIcon, PrintingServiceIcon } from './PrintingIcons';
import { Button, SectionHeading } from './SharedUI';
import { useLanguage } from '../context/LanguageContext';

export interface GrowthMilestoneItem {
  id: string;
  step: string;
  year: string;
  yearMm: string;
  phaseTag: string;
  phaseTagMm: string;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  highlights: string[];
  highlightsMm: string[];
  metricLabel: string;
  metricLabelMm: string;
  iconType:
    | 'bamboo-split'
    | 'bamboo-sticks'
    | 'bamboo-custom'
    | 'books-printing'
    | 'press-finishing';
  ctaLabel: string;
  ctaLabelMm: string;
  ctaRoute?: PageRoute;
  ctaInquiryType?: InquiryTypeOption;
}

export const CORPORATE_GROWTH_MILESTONES: GrowthMilestoneItem[] = [
  {
    id: 'milestone-2013-foundation',
    step: '01',
    year: '2013',
    yearMm: '၂၀၁၃ ခုနှစ်',
    phaseTag: 'CORPORATE FOUNDATION · YANGON, MYANMAR',
    phaseTagMm: 'ကုမ္ပဏီ စတင်တည်ထောင်ခြင်း · ရန်ကုန်မြို့',
    title: 'Establishment of TB Star Company Limited',
    titleMm: 'TBStar Company Limited စတင်တည်ထောင်ခြင်း',
    description:
      'Founded in 2013 in Yangon, Myanmar, TB Star Company Limited (TUN BROTHERS) began operations focused on sourcing, processing, and supplying 100% natural Myanmar bamboo raw materials alongside commercial printing services.',
    descriptionMm:
      '၂၀၁၃ ခုနှစ်တွင် ရန်ကုန်မြို့၌ TBStar Company Limited (TUN BROTHERS) ကို စတင်တည်ထောင်ခဲ့ပြီး မြန်မာနိုင်ငံထွက် ၁၀၀% သဘာဝဝါးကုန်ကြမ်းများ စုဆောင်းထုတ်လုပ်ခြင်းနှင့် ပုံနှိပ်ဝန်ဆောင်မှုလုပ်ငန်းများကို စတင်ဆောင်ရွက်ခဲ့ပါသည်။',
    highlights: [
      'Established corporate operations in Yangon, Myanmar in 2013',
      'Direct sourcing of 100% natural bamboo from mature groves in Myanmar',
      'Foundation of dual-division commercial trade and B2B supply operations',
    ],
    highlightsMm: [
      '၂၀၁၃ ခုနှစ်တွင် ရန်ကုန်မြို့၌ ကုမ္ပဏီလုပ်ငန်းများ စတင်တည်ထောင်ခဲ့ခြင်း',
      'မြန်မာနိုင်ငံရှိ သဘာဝဝါးတောများမှ ၁၀၀% သဘာဝဝါးစစ်စစ် တိုက်ရိုက်ရယူခြင်း',
      'ပြည်တွင်းနှင့် ပြည်ပ စီးပွားရေးလုပ်ငန်းများအတွက် အခြေခံကုန်ထုတ်လုပ်မှု စတင်ခြင်း',
    ],
    metricLabel: 'Est. 2013 · Yangon, Myanmar',
    metricLabelMm: '၂၀၁၃ ခုနှစ် စတင်တည်ထောင် · ရန်ကုန်မြို့',
    iconType: 'bamboo-custom',
    ctaLabel: 'Explore Bamboo Products',
    ctaLabelMm: 'ဝါးထုတ်ကုန်များ လေ့လာရန်',
    ctaRoute: '/bamboo-products',
  },
  {
    id: 'milestone-2015-bamboo-split',
    step: '02',
    year: '2015 – 2016',
    yearMm: '၂၀၁၅ – ၂၀၁၆',
    phaseTag: 'STANDARDIZED BAMBOO SPLIT PRODUCTION',
    phaseTagMm: 'စံချိန်မီ သဘာဝဝါးခြမ်းပြား ထုတ်လုပ်မှု တိုးချဲ့ခြင်း',
    title: '3 mm Natural Bamboo Split Calibration (20" to 48")',
    titleMm: 'အထူ 3 mm သဘာဝဝါးခြမ်းပြား (၂၀"–၄၈") စံချိန်မီ ထုတ်လုပ်မှု',
    description:
      'Expanded mechanical splitting, node grading, and natural seasoning lines to supply calibrated 3 mm Bamboo Split across 20 to 48 inch lengths—available both With Nodes (50 pcs per bundle) and Without Nodes (100 pcs per bundle).',
    descriptionMm:
      'အထူ 3 mm နှင့် အရှည် ၂၀ လက်မမှ ၄၈ လက်မရှိသော သဘာဝဝါးခြမ်းပြား (Bamboo Split) များကို အဆစ်ပါ (တစ်စည်း ၅၀ ချောင်း) နှင့် အဆစ်မပါ (တစ်စည်း ၁၀၀ ချောင်း) ပုံစံနှစ်မျိုးဖြင့် စံချိန်စံညွှန်းမီ တိုးချဲ့ထုတ်လုပ်ခဲ့ပါသည်။',
    highlights: [
      'Calibrated 3 mm thickness across 20 to 48 inch lengths',
      'With Nodes specification packed at 50 pcs per bundle',
      'Without Nodes specification packed at 100 pcs per bundle',
    ],
    highlightsMm: [
      'အထူ 3 mm နှင့် အရှည် ၂၀ လက်မမှ ၄၈ လက်မအထိ တိကျသော အရွယ်အစား',
      'အဆစ်ပါ (With Nodes) — တစ်စည်းလျှင် ၅၀ ချောင်း (50 pcs/bundle) စံနှုန်း',
      'အဆစ်မပါ (Without Nodes) — တစ်စည်းလျှင် ၁၀၀ ချောင်း (100 pcs/bundle) စံနှုန်း',
    ],
    metricLabel: '3 mm · 20"–48" · With / Without Nodes',
    metricLabelMm: 'အထူ 3 mm · ၂၀"–၄၈" · အဆစ်ပါ / အဆစ်မပါ',
    iconType: 'bamboo-split',
    ctaLabel: 'Inquire About Bamboo Split',
    ctaLabelMm: 'ဝါးခြမ်းပြား မေးမြန်းရန်',
    ctaInquiryType: 'Bamboo Split',
  },
  {
    id: 'milestone-2018-export-packaging',
    step: '03',
    year: '2018 – 2019',
    yearMm: '၂၀၁၈ – ၂၀၁၉',
    phaseTag: 'BAMBOO STICKS & 30KG EXPORT BAGGING',
    phaseTagMm: 'ဝါးတံထုတ်လုပ်မှုနှင့် 30KG ပြည်ပပို့ကုန် ထုပ်ပိုးမှုစနစ်',
    title: 'Precision Bamboo Sticks & Standardized 30 kg Export Supply',
    titleMm: 'သဘာဝဝါးတံ (Bamboo Sticks) နှင့် တစ်အိတ် 30 kg ပို့ကုန်ထုပ်ပိုးမှု',
    description:
      'Scaled high-volume production of 1.2 to 2.5 mm Bamboo Sticks in 8, 9, and 10 inch sizes with standardized 30 kg per bag woven export packaging (6 bundles × 5 kg = 30 kg), serving both domestic Myanmar distribution and international export buyers.',
    descriptionMm:
      'အထူ 1.2 မှ 2.5 mm၊ အရွယ်အစား ၈ လက်မ၊ ၉ လက်မနှင့် ၁၀ လက်မရှိသော သဘာဝဝါးတံများကို တစ်စည်း 5 kg × ၆ စည်း (တစ်အိတ်လျှင် 30 kg) စံနှုန်းဖြင့် ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် နိုင်ငံတကာ ပြည်ပပို့ကုန်စျေးကွက်များသို့ တိုးချဲ့တင်ပို့ခဲ့ပါသည်။',
    highlights: [
      'Bamboo Sticks sized at 1.2–2.5 mm thickness in 8", 9", and 10" lengths',
      'Standardized 5 kg bundles packed 6 bundles per 30 kg woven export bag',
      'Coordinated domestic Myanmar distribution and international export logistics',
    ],
    highlightsMm: [
      'အထူ 1.2–2.5 mm နှင့် အရွယ်အစား ၈"၊ ၉"၊ ၁၀" သဘာဝဝါးတံများ ထုတ်လုပ်မှု',
      'တစ်စည်း 5 kg ဖြင့် တစ်အိတ်လျှင် ၆ စည်း (စုစုပေါင်း 30 kg) ပို့ကုန်ထုပ်ပိုးမှု',
      'ပြည်တွင်းဖြန့်ဖြူးရေးနှင့် နိုင်ငံတကာ ပြည်ပပို့ကုန် တင်ပို့မှုကွန်ရက် ချဲ့ထွင်ခြင်း',
    ],
    metricLabel: '1.2–2.5 mm · 8", 9", 10" · 30 kg/bag',
    metricLabelMm: '1.2–2.5 mm · ၈"၊ ၉"၊ ၁၀" · တစ်အိတ် 30 kg',
    iconType: 'bamboo-sticks',
    ctaLabel: 'Inquire About Bamboo Sticks',
    ctaLabelMm: 'ဝါးတံ မေးမြန်းရန်',
    ctaInquiryType: 'Bamboo Sticks',
  },
  {
    id: 'milestone-2021-offset-printing',
    step: '04',
    year: '2021 – 2022',
    yearMm: '၂၀၂၁ – ၂၀၂၂',
    phaseTag: 'DIVISION B · ONE-STOP OFFSET PRINTING',
    phaseTagMm: 'လုပ်ငန်းကဏ္ဍ (ခ) · တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း',
    title: 'One-Stop Commercial Offset Printing Workflow',
    titleMm: 'One-Stop အော့ဖ်ဆက် ပုံနှိပ်ဝန်ဆောင်မှုလုပ်ငန်း အဆင့်မြှင့်တင်ခြင်း',
    description:
      'Strengthened our commercial press division in Yangon to deliver end-to-end offset printing solutions—covering multi-page Books Printing, perforated Voucher Books Printing, corporate brochures, catalogs, and office forms under one roof.',
    descriptionMm:
      'စာအုပ်ပုံနှိပ်ခြင်း (Books Printing)၊ လုပ်ငန်းသုံး ဘောင်ချာနှင့် ပြေစာစာအုပ်များ (Voucher Books Printing)၊ ကုမ္ပဏီပရိုဖိုင်၊ လက်ကမ်းစာစောင်နှင့် ရုံးသုံးပုံနှိပ်ပစ္စည်းများကို တစ်နေရာတည်းတွင် အပြီးအစီး ပုံနှိပ်ချုပ်လုပ်ပေးနိုင်သည့် One-Stop ဝန်ဆောင်မှုအဖြစ် တိုးချဲ့ခဲ့ပါသည်။',
    highlights: [
      'Books Printing for publications, magazines, manuals, and company profiles',
      'Voucher Books Printing with numbering, perforation, and multi-copy pad binding',
      'Commercial offset printing for brochures, pamphlets, business cards, and forms',
    ],
    highlightsMm: [
      'စာပေထုတ်ဝေမှု စာအုပ်များ၊ မဂ္ဂဇင်းနှင့် ကုမ္ပဏီပရိုဖိုင်စာအုပ်များ ပုံနှိပ်ခြင်း',
      'နံပါတ်ရိုက်ခြင်းနှင့် အပေါက်ဖောက်ချုပ်လုပ်ထားသော လုပ်ငန်းသုံး ဘောင်ချာစာအုပ်များ',
      'လက်ကမ်းစာစောင်၊ ကတ်တလောက်၊ လိပ်စာကတ်နှင့် ရုံးသုံးပုံစံစာရွက်အမျိုးမျိုး',
    ],
    metricLabel: 'One-Stop Offset Press · Books & Vouchers',
    metricLabelMm: 'တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း',
    iconType: 'books-printing',
    ctaLabel: 'Explore Printing Services',
    ctaLabelMm: 'ပုံနှိပ်ဝန်ဆောင်မှုများ ကြည့်ရန်',
    ctaRoute: '/printing-services',
  },
  {
    id: 'milestone-2024-present',
    step: '05',
    year: '2024 – Present',
    yearMm: '၂၀၂၄ – လက်ရှိ',
    phaseTag: 'CENTRAL TOWER HQ · MULTI-DIVISION B2B PORTFOLIO',
    phaseTagMm: 'Central Tower ရုံးချုပ် · ကဏ္ဍစုံ စီးပွားရေးလုပ်ငန်းစု',
    title: 'Integrated Bamboo Export, Activated Carbon, Printing & Stationery Supply',
    titleMm: 'သဘာဝဝါးပို့ကုန်၊ Activated Carbon၊ ပုံနှိပ်နှင့် Ball Pen စာရေးကိရိယာ ဖြန့်ဖြူးရေး',
    description:
      'Operating from Central Tower (Room No. 1103, 11th Floor, Corner of 39th Street & Anawrahta Road, Kyauktada Township, Yangon), TB Star Company Limited serves domestic and international partners across Natural Myanmar Bamboo, Activated Carbon commercial inquiries, One-Stop Offset Printing, and boxed Ball Pen stationery (Klick & Plano).',
    descriptionMm:
      'ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ်၊ Central Tower (၁၁ လွှာ၊ အခန်း ၁၁၀၃) ရုံးချုပ်မှတစ်ဆင့် မြန်မာ့သဘာဝဝါးထုတ်ကုန် ပြည်တွင်း/ပြည်ပ ဖြန့်ဖြူးရေး၊ Activated Carbon စုံစမ်းမေးမြန်းမှုကဏ္ဍ၊ အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းနှင့် Ball Pen (Klick တစ်ဘူး 30 pcs / Plano တစ်ဘူး 50 pcs) စာရေးကိရိယာ ဖြန့်ဖြူးရေးတို့ကို အရှိန်အဟုန်မြှင့် ဆောင်ရွက်လျက်ရှိပါသည်။',
    highlights: [
      'Ball Pen stationery supply: Klick (30 pcs per box) & Plano (50 pcs per box)',
      'Dedicated commercial inquiry coordination for Activated Carbon buyers',
      'Direct B2B trade desk at Central Tower, Kyauktada Township, Yangon',
    ],
    highlightsMm: [
      'Ball Pen စာရေးကိရိယာ — Klick (တစ်ဘူး 30 pcs) နှင့် Plano (တစ်ဘူး 50 pcs)',
      'Activated Carbon ကုန်ပစ္စည်းကဏ္ဍအတွက် တိုက်ရိုက် ဆက်သွယ်စုံစမ်းနိုင်မှု',
      'ရန်ကုန်မြို့ Central Tower ရုံးချုပ်မှ ပြည်တွင်းနှင့် နိုင်ငံတကာ မိတ်ဖက်များအား ဝန်ဆောင်မှုပေးခြင်း',
    ],
    metricLabel: 'Central Tower, Yangon · Active Global & Local Trade',
    metricLabelMm: 'Central Tower ရုံးချုပ် · ပြည်တွင်းနှင့် ပြည်ပ ကုန်သွယ်မှု',
    iconType: 'press-finishing',
    ctaLabel: 'Contact Our Yangon Office',
    ctaLabelMm: 'ရန်ကုန်ရုံးချုပ်သို့ ဆက်သွယ်ရန်',
    ctaRoute: '/contact',
  },
];

interface CorporateGrowthTimelineProps {
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

export const CorporateGrowthTimeline: React.FC<CorporateGrowthTimelineProps> = ({
  onNavigate,
  onInquireWithCategory,
}) => {
  const { isMm, t } = useLanguage();
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    () => new Set([0])
  );
  const [scrollFillPercent, setScrollFillPercent] = useState<number>(18);

  useEffect(() => {
    const elements = itemRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setRevealedIndices((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const idxAttr = entry.target.getAttribute('data-milestone-index');
            if (idxAttr !== null && entry.isIntersecting) {
              next.add(Number(idxAttr));
            }
          });
          return next;
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.15,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateTimelineScrollState = () => {
      const container = timelineContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 800;
      const triggerPoint = viewportHeight * 0.58;

      const totalHeight = Math.max(rect.height, 1);
      const progressedPx = triggerPoint - rect.top;
      const clampedRatio = Math.min(1, Math.max(0.08, progressedPx / totalHeight));
      setScrollFillPercent(Math.round(clampedRatio * 100));

      let closestIndex = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const itemRect = el.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height * 0.35;
        const distance = Math.abs(itemCenter - triggerPoint);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
      setRevealedIndices((prev) => {
        if (prev.has(closestIndex)) return prev;
        const next = new Set(prev);
        for (let i = 0; i <= closestIndex; i += 1) {
          next.add(i);
        }
        return next;
      });
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateTimelineScrollState);
    };

    updateTimelineScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleSelectMilestone = (index: number) => {
    setActiveIndex(index);
    setRevealedIndices((prev) => {
      const next = new Set(prev);
      for (let i = 0; i <= index; i += 1) {
        next.add(i);
      }
      return next;
    });

    const targetEl = itemRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="corporate-growth-timeline"
      aria-label="Corporate Growth Milestones Timeline (2013 to Present)"
      className="py-20 bg-white border-b border-[#DDE5D9]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="03. Corporate Journey · Growth Milestones (2013 – Present)"
          kickerMm="၀၃။ ကုမ္ပဏီ၏ တိုးတက်မှုမှတ်တိုင်များ · ၂၀၁၃ ခုနှစ်မှ လက်ရှိအထိ"
          title="Over a Decade of Operational Growth in Myanmar"
          titleMm="၂၀၁၃ ခုနှစ်မှ လက်ရှိအထိ ကုမ္ပဏီ၏ လုပ်ငန်းတိုးတက်မှု မှတ်တိုင်များ"
          description="Trace TB Star Company Limited’s progression from its 2013 foundation in Yangon to a dual-division B2B supplier of 100% natural Myanmar bamboo products, Activated Carbon, one-stop offset printing, and Ball Pen stationery."
          descriptionMm="၂၀၁၃ ခုနှစ်တွင် စတင်တည်ထောင်ချိန်မှစ၍ သဘာဝမြန်မာ့ဝါးထုတ်ကုန် ပြည်တွင်း/ပြည်ပ ဖြန့်ဖြူးရေး၊ Activated Carbon၊ တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းနှင့် Ball Pen စာရေးကိရိယာ ဖြန့်ဖြူးရေးအထိ အဆင့်ဆင့် တိုးတက်လာမှု မှတ်တမ်း။"
        />

        {/* Interactive Year Milestone Navigation Bar */}
        <div className="mb-12 bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs font-mono-tabular font-semibold text-[#173D2A] shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#245C3A]" />
            <span>
              {t(
                'SCROLL OR SELECT A MILESTONE YEAR:',
                'ခုနှစ်အလိုက် လုပ်ငန်းမှတ်တိုင်များ ရွေးချယ်ကြည့်ရှုရန် -'
              )}
            </span>
          </div>

          <div
            role="tablist"
            aria-label={t('Company growth milestones by year', 'ခုနှစ်အလိုက် ကုမ္ပဏီ မှတ်တိုင်များ')}
            className="flex flex-wrap items-center gap-2"
          >
            {CORPORATE_GROWTH_MILESTONES.map((milestone, idx) => {
              const isCurrent = activeIndex === idx;
              const isPassed = idx <= activeIndex;
              return (
                <button
                  key={milestone.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => handleSelectMilestone(idx)}
                  className={`px-3 py-2 rounded-lg text-xs font-mono-tabular font-bold border transition-all duration-200 cursor-pointer inline-flex items-center gap-2 ${
                    isCurrent
                      ? 'bg-[#173D2A] text-white border-[#173D2A] shadow-2xs'
                      : isPassed
                      ? 'bg-white text-[#173D2A] border-[#245C3A]/50 hover:border-[#173D2A]'
                      : 'bg-white/70 text-[#26332B]/75 border-[#DDE5D9] hover:border-[#245C3A] hover:text-[#173D2A]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCurrent
                        ? 'bg-[#A8D977]'
                        : isPassed
                        ? 'bg-[#245C3A]'
                        : 'bg-[#DDE5D9]'
                    }`}
                  />
                  <span>{isMm ? milestone.yearMm : milestone.year}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vertical Scroll-Activated Timeline Container */}
        <div ref={timelineContainerRef} className="relative">
          {/* Background Vertical Spine Track (Left on Mobile/Tablet, Center on Desktop) */}
          <div
            aria-hidden="true"
            className="absolute top-4 bottom-4 left-6 lg:left-1/2 -translate-x-1/2 w-1 bg-[#DDE5D9] rounded-full overflow-hidden"
          >
            {/* Dynamic Scroll-Activated Progress Fill */}
            <div
              className="w-full bg-gradient-to-b from-[#173D2A] via-[#245C3A] to-[#A8D977] transition-all duration-300 ease-out rounded-full"
              style={{ height: `${scrollFillPercent}%` }}
            />
          </div>

          <div className="space-y-10 lg:space-y-14 relative z-10">
            {CORPORATE_GROWTH_MILESTONES.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const isRevealed = revealedIndices.has(index);
              const isCurrent = activeIndex === index;
              const isCompleted = index <= activeIndex;

              return (
                <div
                  key={milestone.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  data-milestone-index={index}
                  className="relative grid grid-cols-1 lg:grid-cols-12 items-start lg:items-center gap-6 lg:gap-8"
                >
                  {/* Desktop Left Column (Odd index shows year badge on left; Even index shows card on left) */}
                  <div
                    className={`pl-16 lg:pl-0 ${
                      isEven
                        ? 'lg:col-span-5 lg:pr-8 lg:order-1'
                        : 'lg:col-span-5 lg:pr-8 lg:text-right lg:order-1 hidden lg:block'
                    }`}
                  >
                    {isEven ? (
                      <MilestoneCard
                        milestone={milestone}
                        isMm={isMm}
                        isRevealed={isRevealed}
                        isCurrent={isCurrent}
                        onNavigate={onNavigate}
                        onInquireWithCategory={onInquireWithCategory}
                      />
                    ) : (
                      <MilestoneSideSummary
                        milestone={milestone}
                        isMm={isMm}
                        isCurrent={isCurrent}
                        isCompleted={isCompleted}
                        align="right"
                      />
                    )}
                  </div>

                  {/* Center Spine Node Indicator */}
                  <div className="absolute left-6 lg:static lg:left-auto lg:col-span-2 lg:order-2 flex justify-center -translate-x-1/2 lg:translate-x-0 top-6 lg:top-auto">
                    <button
                      type="button"
                      onClick={() => handleSelectMilestone(index)}
                      aria-label={`${isMm ? milestone.yearMm : milestone.year} — ${
                        isMm ? milestone.titleMm : milestone.title
                      }`}
                      className={`w-12 h-12 rounded-xl border-2 flex flex-col items-center justify-center font-mono-tabular transition-all duration-300 cursor-pointer shadow-sm ${
                        isCurrent
                          ? 'bg-[#173D2A] border-[#A8D977] text-white scale-110 ring-4 ring-[#A8D977]/25'
                          : isCompleted
                          ? 'bg-[#245C3A] border-[#173D2A] text-white hover:scale-105'
                          : 'bg-white border-[#DDE5D9] text-[#173D2A] hover:border-[#245C3A]'
                      }`}
                    >
                      <span className="text-[10px] leading-none opacity-80">STEP</span>
                      <span className="text-xs font-extrabold leading-tight">
                        {milestone.step}
                      </span>
                    </button>
                  </div>

                  {/* Desktop Right Column (Even index shows year summary on right; Odd index shows card on right) */}
                  <div
                    className={`pl-16 lg:pl-0 ${
                      isEven
                        ? 'lg:col-span-5 lg:pl-8 lg:order-3 hidden lg:block'
                        : 'lg:col-span-5 lg:pl-8 lg:order-3'
                    }`}
                  >
                    {isEven ? (
                      <MilestoneSideSummary
                        milestone={milestone}
                        isMm={isMm}
                        isCurrent={isCurrent}
                        isCompleted={isCompleted}
                        align="left"
                      />
                    ) : (
                      <MilestoneCard
                        milestone={milestone}
                        isMm={isMm}
                        isRevealed={isRevealed}
                        isCurrent={isCurrent}
                        onNavigate={onNavigate}
                        onInquireWithCategory={onInquireWithCategory}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Timeline Summary Footer Strip */}
        <div className="mt-14 bg-[#173D2A] text-white border border-[#245C3A] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
          <div className="max-w-3xl">
            <p className="text-xs font-mono-tabular text-[#A8D977] font-semibold mb-1.5">
              {t(
                `CONTINUOUS OPERATIONS SINCE ${COMPANY_INFO.establishedYear} · CENTRAL TOWER, YANGON`,
                `${COMPANY_INFO.establishedYear} ခုနှစ်မှစတင်သော စဉ်ဆက်မပြတ် လုပ်ငန်းအတွေ့အကြုံ · ရန်ကုန်မြို့`
              )}
            </p>
            <h3 className="text-xl font-bold text-white mb-2">
              {t(
                'Partner With TB Star Company Limited for Your Next Order',
                'လူကြီးမင်းတို့၏ လုပ်ငန်းလိုအပ်ချက်များအတွက် TBStar Company Limited နှင့် လက်တွဲဆောင်ရွက်ပါ'
              )}
            </h3>
            <p className="text-sm text-white/85 leading-relaxed">
              {t(
                'From 100% natural Myanmar Bamboo Split and 30 kg/bag Bamboo Sticks to Activated Carbon inquiries, One-Stop Offset Printing, and Ball Pen stationery, our Yangon team is ready to support your requirements.',
                'သဘာဝ မြန်မာ့ဝါးခြမ်းပြားနှင့် တစ်အိတ် 30 kg ဝါးတံများ၊ Activated Carbon၊ တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်းနှင့် Ball Pen စာရေးကိရိယာများအတွက် ရန်ကုန်ရုံးချုပ်သို့ တိုက်ရိုက် ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              type="button"
              variant="primary-light"
              href="/contact"
              onClick={() => onNavigate('/contact')}
            >
              {t('Request Commercial Inquiry', 'ဆက်သွယ်မေးမြန်းရန်')}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline-light"
              href="/bamboo-products"
              onClick={() => onNavigate('/bamboo-products')}
            >
              {t('View Product Catalog', 'ထုတ်ကုန်စာရင်း ကြည့်ရန်')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

interface MilestoneSideSummaryProps {
  milestone: GrowthMilestoneItem;
  isMm: boolean;
  isCurrent: boolean;
  isCompleted: boolean;
  align: 'left' | 'right';
}

const MilestoneSideSummary: React.FC<MilestoneSideSummaryProps> = ({
  milestone,
  isMm,
  isCurrent,
  isCompleted,
  align,
}) => {
  return (
    <div
      className={`flex flex-col ${
        align === 'right' ? 'items-end text-right' : 'items-start text-left'
      }`}
    >
      <span
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-mono-tabular font-extrabold border transition-colors ${
          isCurrent
            ? 'bg-[#173D2A] text-[#A8D977] border-[#173D2A]'
            : isCompleted
            ? 'bg-[#EAF5E4] text-[#173D2A] border-[#C3E4B5]'
            : 'bg-[#F6F8F3] text-[#26332B]/75 border-[#DDE5D9]'
        }`}
      >
        <span>{isMm ? milestone.yearMm : milestone.year}</span>
      </span>
      <p className="mt-2 text-xs font-mono-tabular font-semibold text-[#245C3A]">
        {isMm ? milestone.phaseTagMm : milestone.phaseTag}
      </p>
      <p className="mt-1 text-xs text-[#26332B]/75 font-medium">
        {isMm ? milestone.metricLabelMm : milestone.metricLabel}
      </p>
    </div>
  );
};

interface MilestoneCardProps {
  milestone: GrowthMilestoneItem;
  isMm: boolean;
  isRevealed: boolean;
  isCurrent: boolean;
  onNavigate: (route: PageRoute) => void;
  onInquireWithCategory: (type: InquiryTypeOption, navigateToContact?: boolean) => void;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  isMm,
  isRevealed,
  isCurrent,
  onNavigate,
  onInquireWithCategory,
}) => {
  const highlights = isMm ? milestone.highlightsMm : milestone.highlights;

  const renderIcon = () => {
    if (
      milestone.iconType === 'books-printing' ||
      milestone.iconType === 'press-finishing'
    ) {
      return <PrintingServiceIcon type={milestone.iconType} className="w-6 h-6" />;
    }
    return <BambooProductIcon type={milestone.iconType} className="w-6 h-6" />;
  };

  return (
    <article
      className={`rounded-2xl p-6 sm:p-7 border transition-all duration-500 ${
        isRevealed
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      } ${
        isCurrent
          ? 'bg-[#F6F8F3] border-[#245C3A] shadow-md ring-1 ring-[#245C3A]/20'
          : 'bg-white border-[#DDE5D9] hover:border-[#245C3A] shadow-2xs'
      }`}
    >
      {/* Top Row: Icon + Year Badge + Milestone Step */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#DDE5D9]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-white border border-[#DDE5D9] flex items-center justify-center shrink-0">
            {renderIcon()}
          </div>
          <div>
            <span className="inline-block text-xs font-mono-tabular font-extrabold text-[#245C3A]">
              {isMm ? milestone.yearMm : milestone.year}
            </span>
            <p className="text-[11px] font-mono-tabular font-semibold text-[#26332B]/75">
              {isMm ? milestone.phaseTagMm : milestone.phaseTag}
            </p>
          </div>
        </div>

        <span
          className={`px-2.5 py-1 rounded text-xs font-mono-tabular font-bold ${
            isCurrent
              ? 'bg-[#173D2A] text-[#A8D977]'
              : 'bg-[#F6F8F3] text-[#245C3A] border border-[#DDE5D9]'
          }`}
        >
          {milestone.step}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-bold text-[#173D2A] mb-2.5">
        {isMm ? milestone.titleMm : milestone.title}
      </h3>
      <p className="text-sm text-[#26332B]/85 leading-relaxed mb-5">
        {isMm ? milestone.descriptionMm : milestone.description}
      </p>

      {/* Verified Milestone Highlights */}
      <ul className="space-y-2.5 pt-4 border-t border-[#DDE5D9] text-xs text-[#173D2A] font-medium mb-5">
        {highlights.map((point) => (
          <li key={point} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-[#245C3A] shrink-0 mt-0.5" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* Card Footer: Metric & Action Button */}
      <div className="pt-3.5 border-t border-[#DDE5D9] flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-mono-tabular font-semibold text-[#245C3A]">
          {isMm ? milestone.metricLabelMm : milestone.metricLabel}
        </span>

        {milestone.ctaInquiryType ? (
          <button
            type="button"
            onClick={() =>
              onInquireWithCategory(milestone.ctaInquiryType!, true)
            }
            className="text-xs font-bold text-[#173D2A] hover:text-[#245C3A] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{isMm ? milestone.ctaLabelMm : milestone.ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#245C3A]" />
          </button>
        ) : milestone.ctaRoute ? (
          <a
            href={milestone.ctaRoute}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(milestone.ctaRoute!);
            }}
            className="text-xs font-bold text-[#173D2A] hover:text-[#245C3A] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{isMm ? milestone.ctaLabelMm : milestone.ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#245C3A]" />
          </a>
        ) : null}
      </div>
    </article>
  );
};
