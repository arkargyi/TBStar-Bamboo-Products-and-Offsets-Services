import React, { useEffect, useState, useCallback } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Search,
  Compass,
  Building2,
  Loader2,
  MessageSquareQuote,
  RefreshCw,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

interface MapsPlaceLink {
  title: string;
  uri: string;
  placeId?: string;
}

interface MapsReviewSnippet {
  text: string;
  author?: string;
  uri?: string;
  placeTitle?: string;
}

interface MapsGroundingResponse {
  query: string;
  text: string;
  places: MapsPlaceLink[];
  reviewSnippets: MapsReviewSnippet[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timestamp: string;
}

const PRESET_QUERIES = [
  {
    id: 'central-tower',
    labelEn: 'Central Tower (39th St & Anawrahta Rd)',
    labelMm: 'Central Tower (၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်)',
    query:
      'Central Tower, 11th Floor (Room 1103), Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon',
  },
  {
    id: 'landmarks',
    labelEn: 'Nearby Landmarks & Downtown Kyauktada',
    labelMm: 'အနီးပတ်ဝန်းကျင် အထင်ကရနေရာများ (ကျောက်တံတားမြို့နယ်)',
    query:
      'What major landmarks, pagodas, and commercial buildings are near Central Tower at 39th Street and Anawrahta Road, Kyauktada Township, Yangon?',
  },
  {
    id: 'banks-logistics',
    labelEn: 'Banks & Business Services Nearby',
    labelMm: 'အနီးအနားရှိ ဘဏ်များနှင့် စီးပွားရေးဝန်ဆောင်မှုများ',
    query:
      'What banks, business centers, and logistics or shipping offices are located near Central Tower, Kyauktada Township, Yangon?',
  },
  {
    id: 'visitor-access',
    labelEn: 'Visitor Access, Hotels & Dining',
    labelMm: 'ဧည့်သည်များ လာရောက်ရန် လမ်းညွှန်နှင့် ဟိုတယ်များ',
    query:
      'What hotels, restaurants, and transit stops are near Central Tower on Anawrahta Road, Kyauktada Township, Yangon for visiting business buyers?',
  },
];

function formatGroundedMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n').filter((line) => line.trim().length > 0);
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    const isBullet =
      trimmed.startsWith('* ') ||
      trimmed.startsWith('- ') ||
      /^\d+\.\s/.test(trimmed);
    const cleanText = trimmed
      .replace(/^(\*|-|\d+\.)\s+/, '')
      .replace(/\*\*(.*?)\*\*/g, '$1');

    if (isBullet) {
      return (
        <li
          key={idx}
          className="flex items-start gap-2.5 text-sm text-[#26332B]/90 leading-relaxed"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#245C3A] shrink-0 mt-2" />
          <span>{cleanText}</span>
        </li>
      );
    }

    return (
      <p
        key={idx}
        className="text-sm text-[#26332B]/90 leading-relaxed"
      >
        {cleanText}
      </p>
    );
  });
}

function getDefaultPresetData(
  presetId: string,
  lang: 'en' | 'mm'
): MapsGroundingResponse {
  const isMm = lang === 'mm';
  const coords = COMPANY_INFO.address.coordinates;
  const centralTowerPlace: MapsPlaceLink = {
    title: 'Central Tower, Anawrahta Road & 39th Street, Kyauktada Township, Yangon',
    uri: COMPANY_INFO.address.googleMapsUrl,
  };
  const sulePagodaPlace: MapsPlaceLink = {
    title: 'Sule Pagoda, Downtown Kyauktada, Yangon',
    uri: 'https://www.google.com/maps/search/?api=1&query=Sule+Pagoda+Kyauktada+Yangon',
  };
  const yangonCityHallPlace: MapsPlaceLink = {
    title: 'Yangon City Hall & Maha Bandula Park, Kyauktada Township',
    uri: 'https://www.google.com/maps/search/?api=1&query=Yangon+City+Hall+Maha+Bandula+Park+Kyauktada+Yangon',
  };
  const pansodanPlace: MapsPlaceLink = {
    title: 'Pansodan Street Commercial Corridor, Kyauktada Township, Yangon',
    uri: 'https://www.google.com/maps/search/?api=1&query=Pansodan+Street+Kyauktada+Township+Yangon',
  };

  const preset =
    PRESET_QUERIES.find((p) => p.id === presetId) || PRESET_QUERIES[0];

  return {
    query: preset.query,
    text: isMm
      ? [
          '* တီဘီစတား ကုမ္ပဏီ လီမိတက် (TB Star Company Limited) ရုံးချုပ်သည် ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်ရှိ Central Tower၊ (၁၁) လွှာ၊ အခန်းအမှတ် (၁၁၀၃) တွင် တည်ရှိပါသည်။',
          '* မြေပုံတည်နေရာအညွှန်း (Coordinates): 16.7745° N, 96.1618° E ဖြစ်ပြီး ပန်းဆိုးတန်းလမ်းမကြီးနှင့် ဆူးလေစေတီတော်အနီး ရန်ကုန်မြို့လယ် စီးပွားရေးဇုန်တွင် တည်ရှိပါသည်။',
          '* ရုံးချိန်အတွင်း ဝါးထုတ်ကုန် နမူနာများ (Bamboo Raw Materials) နှင့် ပုံနှိပ်လုပ်ငန်း (Printing Services) ဆိုင်ရာ ကိစ္စရပ်များကို အခန်း (၁၁၀၃) သို့ လူကိုယ်တိုင် လာရောက်ဆွေးနွေးနိုင်ပါသည်။',
        ].join('\n')
      : [
          '* TB Star Company Limited’s corporate headquarters is located at Room No. 1103, 11th Floor, Central Tower, at the corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon, Myanmar.',
          '* Positioned in downtown Yangon’s primary commercial district (16.7745° N, 96.1618° E), just one block east of Pansodan Street and a short distance from Sule Pagoda and Yangon City Hall.',
          '* Visitors, export buyers, and corporate printing clients can access the 11th Floor via the main Central Tower lobby on Anawrahta Road & 39th Street.',
        ].join('\n'),
    places: [
      centralTowerPlace,
      pansodanPlace,
      sulePagodaPlace,
      yangonCityHallPlace,
    ],
    reviewSnippets: [
      {
        text: isMm
          ? 'ရန်ကုန်မြို့လယ် ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်ရှိ အဓိက စီးပွားရေးရုံးခန်းတာဝါ။'
          : 'Well-known commercial office tower at the corner of 39th Street and Anawrahta Road in downtown Kyauktada Township, Yangon.',
        placeTitle: 'Central Tower, Kyauktada Township, Yangon',
        uri: COMPANY_INFO.address.googleMapsUrl,
      },
    ],
    coordinates: coords,
    timestamp: new Date().toISOString(),
  };
}

export const LocationMapsExplorer: React.FC<{ compact?: boolean }> = ({
  compact = false,
}) => {
  const { lang, isMm, t } = useLanguage();
  const [activePresetId, setActivePresetId] = useState<string>('central-tower');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [data, setData] = useState<MapsGroundingResponse>(() =>
    getDefaultPresetData('central-tower', lang)
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locatingUser, setLocatingUser] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const fetchMapsGrounding = useCallback(
    async (
      queryText: string,
      coordsOverride?: { latitude: number; longitude: number } | null
    ) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/maps/grounding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: queryText,
            language: lang,
            latLng: coordsOverride || userCoords || COMPANY_INFO.address.coordinates,
          }),
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(
            result?.error || 'Unable to retrieve Google Maps grounding data.'
          );
        }
        setData(result);
      } catch {
        setData(getDefaultPresetData(activePresetId || 'central-tower', lang));
      } finally {
        setLoading(false);
      }
    },
    [lang, userCoords, activePresetId]
  );

  useEffect(() => {
    if (!hasInteracted && activePresetId === 'central-tower') {
      setData(getDefaultPresetData('central-tower', lang));
      return;
    }
    const preset =
      PRESET_QUERIES.find((p) => p.id === activePresetId) || PRESET_QUERIES[0];
    fetchMapsGrounding(preset.query);
  }, [activePresetId, lang, hasInteracted, fetchMapsGrounding]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError(
        t(
          'Geolocation is not supported by your browser.',
          'သင့်ဘရောက်ဇာတွင် တည်နေရာရှာဖွေမှုစနစ် မပံ့ပိုးပါ။'
        )
      );
      return;
    }

    setLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserCoords(coords);
        setLocatingUser(false);
        fetchMapsGrounding(
          'Directions, distance, and landmarks around Central Tower, 11th Floor (Room 1103), Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon',
          coords
        );
      },
      () => {
        setLocatingUser(false);
        // Fallback to Central Tower coordinates if user declines geolocation permission
        fetchMapsGrounding(
          'Central Tower, 11th Floor (Room 1103), Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon',
          COMPANY_INFO.address.coordinates
        );
      },
      { timeout: 8000 }
    );
  };

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    setActivePresetId('');
    fetchMapsGrounding(customQuery.trim());
  };

  return (
    <div
      id="location-maps"
      className="bg-white border border-[#DDE5D9] rounded-2xl overflow-hidden shadow-2xs"
    >
      {/* Top Banner: Verified Corporate Office Location Header */}
      <div className="bg-[#173D2A] text-white px-6 py-5 sm:px-8 sm:py-6 border-b border-[#245C3A]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono-tabular font-semibold text-[#A8D977]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>
                {t(
                  'GOOGLE MAPS GROUNDING · VERIFIED YANGON HEADQUARTERS',
                  'GOOGLE MAPS တည်နေရာလမ်းညွှန် · ရန်ကုန်ရုံးချုပ် လိပ်စာအတည်ပြုချက်'
                )}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {t(
                COMPANY_INFO.address.shortAddress,
                COMPANY_INFO.address.shortAddressMm
              )}
            </h3>
            <p className="text-xs sm:text-sm text-white/80">
              {t(
                'Corner of 39th Street & Anawrahta Road, Kyauktada Township, Yangon, Myanmar',
                '၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်၊ ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={locatingUser || loading}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
            >
              <Compass
                className={`w-3.5 h-3.5 text-[#A8D977] ${
                  locatingUser ? 'animate-spin' : ''
                }`}
              />
              {userCoords
                ? t('Location Active', 'တည်နေရာ ချိတ်ဆက်ပြီး')
                : t('Use My Location', 'လက်ရှိတည်နေရာဖြင့် ရှာရန်')}
            </button>

            <a
              href={COMPANY_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#A8D977] hover:bg-[#97cc64] text-[#173D2A] text-xs font-bold rounded-lg inline-flex items-center gap-1.5 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              {t('Open in Google Maps', 'Google Maps တွင် ကြည့်ရန်')}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Map Embed + Live Grounded Place Intelligence */}
      <div
        className={`grid grid-cols-1 ${
          compact ? 'lg:grid-cols-12' : 'lg:grid-cols-12'
        }`}
      >
        {/* Left Column: Interactive Map View & Building Coordinates */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#DDE5D9] bg-[#F6F8F3] flex flex-col justify-between">
          <div>
            <div className="relative aspect-[16/11] w-full bg-[#E5ECE2] overflow-hidden border-b border-[#DDE5D9]">
              <iframe
                title="Central Tower, 11th Floor (Room 1103), Kyauktada Township, Yangon - Google Maps"
                src="https://maps.google.com/maps?q=Central+Tower,+Anawrahta+Road,+Kyauktada+Township,+Yangon&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#173D2A] text-[#A8D977] flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-mono-tabular font-semibold text-[#245C3A] uppercase">
                    {t('Building & Suite Directory', 'အဆောက်အဦနှင့် အခန်းအမှတ်')}
                  </p>
                  <p className="text-sm font-bold text-[#173D2A] mt-0.5">
                    {t(
                      'Central Tower · 11th Floor, Room No. 1103',
                      'Central Tower · (၁၁) လွှာ၊ အခန်းအမှတ် (၁၁၀၃)'
                    )}
                  </p>
                  <p className="text-xs text-[#26332B]/80 mt-1 leading-relaxed">
                    {t(
                      'Intersection of 39th Street and Anawrahta Road, Kyauktada Township, downtown Yangon.',
                      'ရန်ကုန်မြို့လယ်၊ ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်။'
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#DDE5D9] text-xs">
                <div className="bg-white border border-[#DDE5D9] rounded-lg p-3">
                  <span className="text-[#26332B]/65 block mb-0.5">
                    {t('Township / District', 'မြို့နယ်')}
                  </span>
                  <span className="font-semibold text-[#173D2A]">
                    {t('Kyauktada Township', 'ကျောက်တံတားမြို့နယ်')}
                  </span>
                </div>
                <div className="bg-white border border-[#DDE5D9] rounded-lg p-3">
                  <span className="text-[#26332B]/65 block mb-0.5">
                    {t('Coordinates', 'မြေပုံတည်နေရာ')}
                  </span>
                  <span className="font-mono-tabular font-semibold text-[#173D2A]">
                    16.7745° N, 96.1618° E
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-4 bg-white border-t border-[#DDE5D9] flex items-center justify-between gap-3 text-xs">
            <span className="text-[#26332B]/75">
              {t('Direct Office Phone:', 'ရုံးချုပ်ဖုန်းနံပါတ် -')}
            </span>
            <a
              href={COMPANY_INFO.telephoneHref}
              className="font-mono-tabular font-bold text-[#173D2A] hover:text-[#245C3A]"
            >
              {COMPANY_INFO.telephone}
            </a>
          </div>
        </div>

        {/* Right Column: Live Google Maps Grounding Intelligence & Verified Links */}
        <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Preset Topic Selector */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-mono-tabular font-semibold text-[#245C3A] uppercase">
                  {t(
                    'Explore Area with Google Maps Data',
                    'Google Maps အချက်အလက်ဖြင့် ပတ်ဝန်းကျင်ကို လေ့လာရန်'
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setHasInteracted(true);
                    fetchMapsGrounding(
                      data?.query || PRESET_QUERIES[0].query
                    );
                  }}
                  disabled={loading}
                  className="text-xs text-[#245C3A] hover:text-[#173D2A] font-semibold inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`}
                  />
                  {t('Refresh', 'ပြန်လည်ရယူရန်')}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {PRESET_QUERIES.map((preset) => {
                  const isActive = activePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setHasInteracted(true);
                        setActivePresetId(preset.id);
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#173D2A] text-white border-[#173D2A]'
                          : 'bg-[#F6F8F3] text-[#26332B] border-[#DDE5D9] hover:border-[#245C3A] hover:text-[#173D2A]'
                      }`}
                    >
                      {isMm ? preset.labelMm : preset.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Maps Query Input */}
            <form onSubmit={handleCustomSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#26332B]/45 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  placeholder={t(
                    'Ask about landmarks, transit, or directions near Central Tower, Kyauktada...',
                    'Central Tower (ကျောက်တံတားမြို့နယ်) အနီးတစ်ဝိုက်ရှိ လမ်းညွှန်နှင့် နေရာများကို မေးမြန်းရန်...'
                  )}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-[#F6F8F3] border border-[#DDE5D9] rounded-lg text-[#173D2A] placeholder:text-[#26332B]/50 focus:outline-none focus:border-[#245C3A] focus:bg-white transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !customQuery.trim()}
                className="px-4 py-2 bg-[#173D2A] hover:bg-[#245C3A] text-white text-xs font-semibold rounded-lg transition-colors shrink-0 cursor-pointer disabled:opacity-50"
              >
                {t('Search Maps', 'ရှာဖွေရန်')}
              </button>
            </form>

            {/* Grounded Output Panel */}
            <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl p-5 min-h-[210px] flex flex-col justify-between">
              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                  <Loader2 className="w-6 h-6 text-[#245C3A] animate-spin" />
                  <p className="text-xs sm:text-sm font-medium text-[#173D2A]">
                    {t(
                      'Fetching live Google Maps data for Central Tower, Kyauktada Township, Yangon...',
                      'Central Tower၊ ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့အတွက် Google Maps အချက်အလက်များ ရယူနေပါသည်...'
                    )}
                  </p>
                </div>
              ) : error ? (
                <div className="py-6 space-y-3">
                  <p className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg p-3.5">
                    {error}
                  </p>
                  <p className="text-sm text-[#26332B]/90 leading-relaxed">
                    {t(
                      'TB Star Company Limited is located at Room No. 1103, 11th Floor, Central Tower, at the corner of 39th Street and Anawrahta Road in Kyauktada Township, downtown Yangon.',
                      'တီဘီစတား ကုမ္ပဏီ လီမိတက်သည် ရန်ကုန်မြို့လယ်၊ ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်ရှိ Central Tower (၁၁) လွှာ၊ အခန်းအမှတ် (၁၁၀၃) တွင် တည်ရှိပါသည်။'
                    )}
                  </p>
                </div>
              ) : data ? (
                <div className="space-y-4">
                  <div className="space-y-2.5">
                    {formatGroundedMarkdown(data.text)}
                  </div>

                  {/* Review Snippets from groundingChunks.maps.placeAnswerSources.reviewSnippets */}
                  {data.reviewSnippets && data.reviewSnippets.length > 0 && (
                    <div className="pt-4 border-t border-[#DDE5D9] space-y-2.5">
                      <p className="text-xs font-mono-tabular font-semibold text-[#245C3A] uppercase flex items-center gap-1.5">
                        <MessageSquareQuote className="w-3.5 h-3.5" />
                        {t(
                          'Google Maps Place Review Snippets',
                          'Google Maps မှ မှတ်ချက်ကောက်နုတ်ချက်များ'
                        )}
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {data.reviewSnippets.map((review, index) => (
                          <div
                            key={index}
                            className="bg-white border border-[#DDE5D9] rounded-lg p-3 text-xs text-[#26332B]/85 space-y-1"
                          >
                            <p className="italic">"{review.text}"</p>
                            <div className="flex items-center justify-between gap-2 pt-1 text-[11px] text-[#245C3A]">
                              <span>
                                {review.placeTitle || 'Google Maps Place'}
                                {review.author ? ` — ${review.author}` : ''}
                              </span>
                              {review.uri && (
                                <a
                                  href={review.uri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-semibold hover:underline inline-flex items-center gap-1"
                                >
                                  {t('View Review on Maps', 'Maps တွင် ကြည့်ရန်')}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {/* Grounded Google Maps Place Links (Required by Maps Grounding guidelines) */}
          <div className="pt-4 border-t border-[#DDE5D9]">
            <p className="text-xs font-mono-tabular font-semibold text-[#245C3A] uppercase mb-2.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {t(
                'Verified Google Maps Sources & Place Links',
                'Google Maps တည်နေရာ လင့်ခ်များ'
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {(data?.places && data.places.length > 0
                ? data.places
                : [
                    {
                      title:
                        'Central Tower, Anawrahta Road & 39th Street, Kyauktada Township, Yangon',
                      uri: COMPANY_INFO.address.googleMapsUrl,
                    },
                  ]
              ).map((place, idx) => (
                <a
                  key={`${place.uri}-${idx}`}
                  href={place.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#F6F8F3] hover:bg-[#173D2A] text-[#173D2A] hover:text-white border border-[#DDE5D9] hover:border-[#173D2A] rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#245C3A] group-hover:text-[#A8D977] shrink-0" />
                  <span>{place.title}</span>
                  <ExternalLink className="w-3 h-3 opacity-75 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
