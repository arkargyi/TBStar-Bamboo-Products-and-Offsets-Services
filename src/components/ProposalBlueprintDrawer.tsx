import React, { useState } from 'react';
import {
  REFERENCE_WEBSITE_ANALYSIS,
  PROPOSED_SITEMAP,
  MISSING_INFORMATION_CHECKLIST,
  COMPANY_INFO,
} from '../data/companyData';
import { Eye, Layers, Map, Layout, Palette, FileCheck, HelpCircle } from 'lucide-react';

interface ProposalBlueprintDrawerProps {
  onSwitchToPrototype: () => void;
}

type DeliverableTab =
  | 'all'
  | 'reference'
  | 'strategy'
  | 'sitemap'
  | 'wireframe'
  | 'design-system'
  | 'missing-info';

export const ProposalBlueprintDrawer: React.FC<ProposalBlueprintDrawerProps> = ({
  onSwitchToPrototype,
}) => {
  const [activeTab, setActiveTab] = useState<DeliverableTab>('all');

  const tabs: { id: DeliverableTab; label: string }[] = [
    { id: 'all', label: 'All Deliverables (1–7)' },
    { id: 'reference', label: '1. Reference Site Analysis' },
    { id: 'strategy', label: '2. Redesign Strategy' },
    { id: 'sitemap', label: '3. Website Sitemap' },
    { id: 'wireframe', label: '4. Homepage Wireframe' },
    { id: 'design-system', label: '5. Light Green System' },
    { id: 'missing-info', label: '7. Missing Info Checklist' },
  ];

  const showSection = (id: DeliverableTab) => activeTab === 'all' || activeTab === id;

  return (
    <div className="bg-[#F6F8F3] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-[#26332B]">
      <div className="max-w-[1200px] mx-auto">
        {/* Top Proposal Header */}
        <div className="bg-[#173D2A] text-white rounded-xl p-8 md:p-10 mb-8 border border-[#245C3A]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <img
                src={COMPANY_INFO.logoPath}
                alt="TB Star Company Limited Logo"
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-contain bg-white p-1 shrink-0"
              />
              <div>
                <p className="text-xs font-mono-tabular text-[#A8D977] mb-1.5">
                  PHASE 1 &amp; PHASE 2 DELIVERABLE PACKAGE · AWAITING CLIENT APPROVAL
                </p>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-2">
                  TB Star Company Limited — Corporate Website Redesign Proposal
                </h1>
                <p className="text-sm md:text-base text-white/80 max-w-2xl leading-relaxed">
                  Reference inspection of <span className="underline">myanmar-su-tech-company-limited.vercel.app</span>, dual-division architecture strategy, 6-page sitemap, 10-section homepage wireframe, Light Green design system, and missing information checklist.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onSwitchToPrototype}
              className="px-5 py-3 bg-[#A8D977] hover:bg-[#97cc64] text-[#173D2A] font-semibold text-sm rounded-lg transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              View Live Homepage Prototype (Deliverable #8)
            </button>
          </div>

          {/* Interactive Section Filter Bar */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap gap-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#A8D977] text-[#173D2A]'
                    : 'bg-white/10 text-white/85 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {/* 1. REFERENCE WEBSITE ANALYSIS */}
          {showSection('reference') && (
            <section className="bg-white border border-[#DDE5D9] rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <Layers className="w-5 h-5 text-[#245C3A]" />
                <h2 className="text-xl md:text-2xl font-bold text-[#173D2A]">
                  01. Reference Website Analysis (myanmar-su-tech-company-limited.vercel.app)
                </h2>
              </div>
              <p className="text-sm text-[#26332B]/80 mb-6 leading-relaxed">
                Direct inspection of the reference site’s HTML, CSS, and compiled React 19 bundle was conducted. Below is a clear separation between <strong>Observed Reference Features</strong>, <strong>Why Each Pattern Is Useful</strong>, and <strong>How It Is Adapted for TB Star Company Limited</strong>.
              </p>

              <div className="space-y-4">
                {REFERENCE_WEBSITE_ANALYSIS.map((row) => (
                  <div
                    key={row.id}
                    className="border border-[#DDE5D9] rounded-lg p-5 bg-[#F6F8F3]/50"
                  >
                    <h3 className="text-base font-bold text-[#173D2A] mb-3">{row.area}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-white p-4 rounded-lg border border-[#DDE5D9]">
                        <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1.5">
                          OBSERVED ON REFERENCE SITE
                        </p>
                        <p className="text-[#26332B]/85 leading-relaxed">{row.observedOnReference}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-[#DDE5D9]">
                        <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1.5">
                          WHY THIS PATTERN IS USEFUL
                        </p>
                        <p className="text-[#26332B]/85 leading-relaxed">{row.whyUseful}</p>
                      </div>
                      <div className="bg-[#173D2A] text-white p-4 rounded-lg">
                        <p className="text-xs font-mono-tabular text-[#A8D977] font-semibold mb-1.5">
                          ADAPTATION FOR TB STAR CO., LTD.
                        </p>
                        <p className="text-white/90 leading-relaxed">{row.adaptationForTBStar}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 2. REDESIGN STRATEGY */}
          {showSection('strategy') && (
            <section className="bg-white border border-[#DDE5D9] rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <FileCheck className="w-5 h-5 text-[#245C3A]" />
                <h2 className="text-xl md:text-2xl font-bold text-[#173D2A]">
                  02. Redesign Strategy for TB Star Company Limited
                </h2>
              </div>
              <p className="text-sm text-[#26332B]/80 mb-6 leading-relaxed">
                TB Star Company Limited operates two distinct yet complementary B2B activities from its Central Tower office in Yangon: <strong>Division A (Bamboo Production &amp; Export)</strong> and <strong>Division B (One-Stop Offset Printing Services)</strong>. Our architectural strategy resolves the dual-division challenge cleanly:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-[#DDE5D9] rounded-lg p-5">
                  <h3 className="text-base font-bold text-[#173D2A] mb-2">
                    A. Dual-Division Visual Equilibrium
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed">
                    Instead of mixing bamboo sticks and printed books in a single cluttered grid, the homepage introduces both divisions in the Hero and immediately provides a side-by-side <strong>Business Divisions Split (Section 3)</strong>. Subsequent sections dedicate structured deep-dive zones to Bamboo Products (Section 4) and Offset Printing Services (Section 5).
                  </p>
                </div>

                <div className="border border-[#DDE5D9] rounded-lg p-5">
                  <h3 className="text-base font-bold text-[#173D2A] mb-2">
                    B. Specification-First Layout for International Buyers
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed">
                    International buyers sourcing Myanmar bamboo need immediate verification of thickness (3 mm Split; 1.2–2.5 mm Sticks), length ranges (20"–48" Split; 8"/9"/10" Sticks), node options (With Nodes / Without Nodes), and export packaging (30 kg per bag). We surface these exact tabular specs directly on product cards.
                  </p>
                </div>

                <div className="border border-[#DDE5D9] rounded-lg p-5">
                  <h3 className="text-base font-bold text-[#173D2A] mb-2">
                    C. Frictionless Local Inquiry Flow for Yangon Customers
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed">
                    Local commercial customers looking for Books Printing, Voucher Books Printing, or domestic bamboo distribution can call <strong>+95 9 450048547</strong> with one tap or select their exact service category in the pre-populated Inquiry Form.
                  </p>
                </div>

                <div className="border border-[#DDE5D9] rounded-lg p-5">
                  <h3 className="text-base font-bold text-[#173D2A] mb-2">
                    D. Strict Content Accuracy &amp; Zero Fabrication Policy
                  </h3>
                  <p className="text-sm text-[#26332B]/85 leading-relaxed">
                    Every statement strictly reflects client-verified data. Unsupplied factory photos are represented by clearly labeled replaceable visual frames, and no unverified certifications, founding years, turnaround promises, or pricing are invented.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 3. PROPOSED WEBSITE SITEMAP */}
          {showSection('sitemap') && (
            <section className="bg-white border border-[#DDE5D9] rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <Map className="w-5 h-5 text-[#245C3A]" />
                <h2 className="text-xl md:text-2xl font-bold text-[#173D2A]">
                  03. Proposed 6-Page Corporate Website Sitemap
                </h2>
              </div>
              <p className="text-sm text-[#26332B]/80 mb-6">
                Planned URL hierarchy for <strong>tbstar.com</strong> across Phase 2 (Homepage Prototype) and Phase 3 (Full Multi-Page Development):
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {PROPOSED_SITEMAP.map((page) => (
                  <div
                    key={page.route}
                    className="border border-[#DDE5D9] rounded-lg p-5 flex flex-col justify-between bg-[#F6F8F3]/40"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono-tabular text-[#245C3A] mb-2">
                        <span>{page.pageNumber}</span>
                        <span>{page.route}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#173D2A] mb-2">{page.title}</h3>
                      <p className="text-xs text-[#26332B]/80 leading-relaxed mb-4">{page.purpose}</p>
                      <ul className="space-y-1.5 border-t border-[#DDE5D9] pt-3 text-xs text-[#26332B]">
                        {page.sections.map((sec, idx) => (
                          <li key={idx} className="leading-snug">
                            • {sec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#DDE5D9] text-[11px] font-mono-tabular text-[#173D2A] font-semibold">
                      Status: {page.status}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 4. HOMEPAGE WIREFRAME */}
          {showSection('wireframe') && (
            <section className="bg-white border border-[#DDE5D9] rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <Layout className="w-5 h-5 text-[#245C3A]" />
                <h2 className="text-xl md:text-2xl font-bold text-[#173D2A]">
                  04. Homepage Structural Wireframe (Sections 1 to 10)
                </h2>
              </div>
              <p className="text-sm text-[#26332B]/80 mb-6">
                Architectural schematic of the 10 homepage sections implemented in the live Phase 2 Visual Prototype:
              </p>

              <div className="border-2 border-dashed border-[#245C3A]/40 rounded-xl p-4 md:p-6 bg-[#F6F8F3] space-y-3 font-mono-tabular text-xs">
                <div className="bg-white border border-[#DDE5D9] p-3.5 rounded flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-[#173D2A]">[SECTION 1: STICKY HEADER]</span>
                  <span>[Logo: TB Star Emblem + Wordmark] — [Home · About Us · Bamboo Products · Printing Services · Gallery · Contact Us] — [CTA: Request Inquiry]</span>
                </div>

                <div className="bg-[#173D2A] text-white p-5 rounded grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-7 space-y-2">
                    <div className="text-[#A8D977]">[SECTION 2: DUAL-DIVISION HERO — LEFT COLUMN (7 COLS)]</div>
                    <div className="font-bold text-sm">H1: &quot;Natural Bamboo Products &amp; Professional Printing Solutions&quot;</div>
                    <div className="text-white/80">Subtext: Manufacturing bamboo products for local &amp; global markets + one-stop offset printing.</div>
                    <div className="pt-1">[Primary CTA: Explore Bamboo Products] [Secondary CTA: Printing Services] [Direct Tel: +95 9 450048547]</div>
                  </div>
                  <div className="lg:col-span-5 border border-[#A8D977]/40 p-3 rounded bg-[#245C3A]/40 flex flex-col justify-center">
                    <div className="text-[#A8D977]">[HERO VISUAL SHOWCASE — RIGHT COLUMN (5 COLS)]</div>
                    <div>Bamboo Split (3mm) + Sticks (30kg bag) + Offset Print Preview (Marked Replaceable)</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white border border-[#DDE5D9] p-4 rounded">
                    <div className="font-bold text-[#173D2A] mb-1">[SECTION 3 — BLOCK A: BAMBOO PRODUCTION &amp; EXPORT]</div>
                    <div>• Bamboo Split • Bamboo Sticks • Other Bamboo Products • Domestic &amp; International Export → [Explore Bamboo Products]</div>
                  </div>
                  <div className="bg-white border border-[#DDE5D9] p-4 rounded">
                    <div className="font-bold text-[#173D2A] mb-1">[SECTION 3 — BLOCK B: OFFSET PRINTING SERVICES]</div>
                    <div>• Books Printing • Voucher Books Printing • Other Offset Printing • One-Stop Service → [Explore Printing Services]</div>
                  </div>
                </div>

                <div className="bg-white border border-[#DDE5D9] p-4 rounded">
                  <div className="font-bold text-[#173D2A] mb-2">[SECTION 4: FEATURED BAMBOO PRODUCTS — 3 TECHNICAL CARDS]</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="border border-[#DDE5D9] p-2.5 rounded">01. Bamboo Split (3mm, 20&quot;–48&quot;, With/Without Nodes, Myanmar) + [Inquire]</div>
                    <div className="border border-[#DDE5D9] p-2.5 rounded">02. Bamboo Sticks (1.2–2.5mm, 8&quot;/9&quot;/10&quot;, 30kg/bag, Myanmar) + [Inquire]</div>
                    <div className="border border-[#DDE5D9] p-2.5 rounded">03. Other Bamboo Products (Custom B2B Supply &amp; Export) + [Inquire]</div>
                  </div>
                </div>

                <div className="bg-white border border-[#DDE5D9] p-4 rounded">
                  <div className="font-bold text-[#173D2A] mb-1">[SECTION 5: OFFSET PRINTING SERVICES — EDITORIAL 3-COLUMN GRID]</div>
                  <div>01. Books Printing | 02. Voucher Books Printing | 03. Other Offset Printing Services + [CTA: Discuss Your Printing Requirements]</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white border border-[#DDE5D9] p-4 rounded">
                    <div className="font-bold text-[#173D2A] mb-1">[SECTION 6: COMPANY INTRODUCTION]</div>
                    <div>Concise overview of TB Star Company Limited, Central Tower Yangon headquarters, and dual-division synergy + [Learn More About Us]</div>
                  </div>
                  <div className="bg-white border border-[#DDE5D9] p-4 rounded">
                    <div className="font-bold text-[#173D2A] mb-1">[SECTION 7: WHY CHOOSE US — 4 VERIFIED PILLARS]</div>
                    <div>01. Bamboo Manufacturing · 02. Domestic Distribution · 03. International Export · 04. One-Stop Offset Printing</div>
                  </div>
                </div>

                <div className="bg-white border border-[#DDE5D9] p-4 rounded">
                  <div className="font-bold text-[#173D2A] mb-1">[SECTION 8: CURATED GALLERY PREVIEW]</div>
                  <div>Interactive Filter Tabs (All · Bamboo Products · Production · Packaging · Printing · Other Activities) + 6 Replaceable Asset Cards</div>
                </div>

                <div className="bg-[#173D2A] text-white p-4 rounded">
                  <div className="text-[#A8D977] font-bold mb-1">[SECTION 9: CONTACT CTA &amp; VALIDATED INQUIRY WORKSPACE]</div>
                  <div>&quot;Let&apos;s Discuss Your Business Requirements&quot; + Direct Tel (+95 9 450048547) + Central Tower Address + 6-Field Validated Inquiry Form</div>
                </div>

                <div className="bg-[#112E1F] text-white/80 p-3.5 rounded">
                  <span className="font-bold text-white">[SECTION 10: CORPORATE FOOTER]</span> — Official Logo, Description, Navigation Links, Division Links, Central Tower Yangon Address, +95 9 450048547, Copyright.
                </div>
              </div>
            </section>
          )}

          {/* 5. LIGHT GREEN DESIGN SYSTEM */}
          {showSection('design-system') && (
            <section className="bg-white border border-[#DDE5D9] rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <Palette className="w-5 h-5 text-[#245C3A]" />
                <h2 className="text-xl md:text-2xl font-bold text-[#173D2A]">
                  05. Light Green Corporate Design System
                </h2>
              </div>
              <p className="text-sm text-[#26332B]/80 mb-6">
                Calibrated to complement the official <strong>TB Star Company Limited (&quot;TUN BROTHERS&quot; star emblem)</strong> logo while maintaining strict 60-30-10 color restraint and WCAG AA contrast:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
                {[
                  { name: 'Primary Light Green', hex: '#A8D977', role: '10% Accent / Primary CTAs', darkText: true },
                  { name: 'Dark Forest Green', hex: '#245C3A', role: 'Interactive States / Borders', darkText: false },
                  { name: 'Deep Green', hex: '#173D2A', role: 'Hero & Footer Anchor', darkText: false },
                  { name: 'Light Background', hex: '#F6F8F3', role: '60% Dominant Canvas', darkText: true },
                  { name: 'Pure White', hex: '#FFFFFF', role: '30% Elevated Card Surface', darkText: true },
                  { name: 'Body Text', hex: '#26332B', role: 'High-Contrast Prose', darkText: false },
                  { name: 'Hairline Border', hex: '#DDE5D9', role: '1px Structural Dividers', darkText: true },
                ].map((swatch) => (
                  <div key={swatch.hex} className="border border-[#DDE5D9] rounded-lg overflow-hidden">
                    <div
                      className="h-16 w-full flex items-end p-2 font-mono-tabular text-xs font-bold"
                      style={{
                        backgroundColor: swatch.hex,
                        color: swatch.darkText ? '#173D2A' : '#FFFFFF',
                      }}
                    >
                      {swatch.hex}
                    </div>
                    <div className="p-2.5 bg-white">
                      <p className="text-xs font-bold text-[#173D2A]">{swatch.name}</p>
                      <p className="text-[11px] text-[#26332B]/70 mt-0.5">{swatch.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9]">
                  <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                    DISPLAY &amp; HEADLINE FONT
                  </p>
                  <p className="text-lg font-bold text-[#173D2A] mb-1">Plus Jakarta Sans (600–800)</p>
                  <p className="text-xs text-[#26332B]/80">
                    Crisp geometric structure for corporate headlines, paired with <code>text-wrap: balance</code>.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9]">
                  <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                    BODY &amp; BILINGUAL FALLBACK
                  </p>
                  <p className="text-lg font-bold text-[#173D2A] mb-1">DM Sans + Noto Sans Myanmar</p>
                  <p className="text-xs text-[#26332B]/80">
                    High-legibility body prose (15px–16px) with native Myanmar Unicode font support ready for Burmese localization.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F6F8F3] border border-[#DDE5D9]">
                  <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-1">
                    TECHNICAL SPECIFICATIONS FONT
                  </p>
                  <p className="text-lg font-bold font-mono-tabular text-[#173D2A] mb-1">JetBrains Mono (tabular-nums)</p>
                  <p className="text-xs text-[#26332B]/80">
                    Used strictly for dimensional specs (3 mm, 1.2–2.5 mm, 30 kg/bag, +95 9 450048547).
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 7. MISSING INFORMATION CHECKLIST */}
          {showSection('missing-info') && (
            <section className="bg-white border border-[#DDE5D9] rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="w-5 h-5 text-[#245C3A]" />
                <h2 className="text-xl md:text-2xl font-bold text-[#173D2A]">
                  07. Missing Information Checklist (For Client Confirmation Before Phase 3)
                </h2>
              </div>
              <p className="text-sm text-[#26332B]/80 mb-6">
                To maintain 100% factual accuracy without inventing company history, prices, or unverified claims, the following items are requested from TB Star Company Limited prior to full multi-page coding in Phase 3:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {MISSING_INFORMATION_CHECKLIST.map((group) => (
                  <div
                    key={group.category}
                    className="border border-[#DDE5D9] rounded-lg p-5 bg-[#F6F8F3]/50"
                  >
                    <h3 className="text-sm font-bold text-[#173D2A] mb-3">{group.category}</h3>
                    <ul className="space-y-2 text-xs text-[#26332B]/90">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="font-mono-tabular text-[#245C3A] font-bold">[ ]</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
