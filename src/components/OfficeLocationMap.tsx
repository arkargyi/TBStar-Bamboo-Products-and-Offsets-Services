import React, { useState, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useAdvancedMarkerRef,
  useApiIsLoaded,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import {
  Building2,
  Check,
  Compass,
  Copy,
  ExternalLink,
  Loader2,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react';
import { COMPANY_INFO } from '../constants/companyData';
import { useLanguage } from '../context/LanguageContext';

export interface MapCoordinates {
  lat: number;
  lng: number;
}

/**
 * Official Primary Coordinates for TB Star Company Limited:
 * Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon, Myanmar.
 */
export const PRIMARY_OFFICE_COORDINATES: MapCoordinates = {
  lat: 16.776671,
  lng: 96.163664,
};

export const PRIMARY_COORDINATES_TEXT = '16.776671, 96.163664';
export const PRIMARY_ADDRESS_TEXT =
  'Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon, Myanmar.';
export const GET_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=16.776671,96.163664';
export const VIEW_LARGER_MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=16.776671,96.163664';

const DEFAULT_MAP_ZOOM = 17;

const OfficeMapCanvas: React.FC = () => {
  const { isMm, t } = useLanguage();
  const map = useMap();
  const isLoaded = useApiIsLoaded();
  const apiStatus = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowOpen, setInfoWindowOpen] = useState<boolean>(true);
  const [tilesLoaded, setTilesLoaded] = useState<boolean>(false);

  const handleRecenter = useCallback(() => {
    if (map) {
      map.panTo(PRIMARY_OFFICE_COORDINATES);
      map.setZoom(DEFAULT_MAP_ZOOM);
      setInfoWindowOpen(true);
    }
  }, [map]);

  const handleMarkerClick = useCallback(() => {
    setInfoWindowOpen((prev) => !prev);
    if (map) {
      map.panTo(PRIMARY_OFFICE_COORDINATES);
    }
  }, [map]);

  // Fallback UI if Google Maps API fails to load or experiences auth failure
  if (
    apiStatus === APILoadingStatus.FAILED ||
    apiStatus === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <div
        role="region"
        aria-label="TB Star Company Limited Location Map Fallback"
        className="w-full h-full min-h-[400px] sm:min-h-[480px] bg-[#F6F8F3] flex flex-col items-center justify-center p-6 sm:p-8 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-[#173D2A]/10 border border-[#245C3A]/20 flex items-center justify-center mb-4">
          <MapPin className="w-7 h-7 text-[#245C3A]" />
        </div>
        <p className="text-xs font-mono-tabular font-semibold uppercase tracking-wider text-[#245C3A] mb-1">
          {t('OFFICIAL COMPANY LOCATION', 'တရားဝင် ကုမ္ပဏီတည်နေရာ')}
        </p>
        <h4 className="text-base sm:text-lg font-bold text-[#173D2A] mb-1">
          {COMPANY_INFO.name}
        </h4>
        <p className="text-sm font-medium text-[#173D2A] mb-1 max-w-md">
          {PRIMARY_ADDRESS_TEXT}
        </p>
        <p className="text-xs text-[#26332B]/80 mb-2 max-w-md">
          {COMPANY_INFO.address.line1} · {COMPANY_INFO.address.fullMm}
        </p>
        <p className="text-xs font-mono-tabular font-semibold text-[#245C3A] bg-white border border-[#DDE5D9] px-3 py-1 rounded-md mb-5">
          {t('Coordinates:', 'မြေပုံကိုသြဒိနိတ် -')} {PRIMARY_COORDINATES_TEXT}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
          <a
            href={GET_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get Directions to TB Star Company Limited on Google Maps"
            className="w-full sm:w-auto px-4 py-2.5 bg-[#173D2A] hover:bg-[#245C3A] text-white text-xs font-bold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-[#A8D977]" />
            <span>{t('Get Directions', 'လမ်းညွှန် ရယူရန်')}</span>
          </a>
          <a
            href={VIEW_LARGER_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open TB Star Company Limited location in Google Maps"
            className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-[#F6F8F3] text-[#173D2A] border border-[#DDE5D9] text-xs font-bold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
          >
            <span>{t('Open in Google Maps', 'Google Maps တွင် ဖွင့်ရန်')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#245C3A]" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Interactive Google Map showing TB Star Company Limited at Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon"
      className="relative w-full h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[540px] bg-[#EBF0E6]"
    >
      {/* Loading State Overlay while Map Initializes */}
      {(!isLoaded || !tilesLoaded) && (
        <div
          aria-live="polite"
          className="absolute inset-0 z-20 bg-[#F6F8F3]/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center transition-opacity"
        >
          <Loader2 className="w-8 h-8 text-[#245C3A] animate-spin mb-3" />
          <p className="text-sm font-bold text-[#173D2A] mb-1">
            {t(
              'Loading TB Star Company Limited Map...',
              'TB Star Company Limited တည်နေရာမြေပုံ ဖွင့်နေပါသည်...'
            )}
          </p>
          <p className="text-xs font-mono-tabular text-[#245C3A]">
            {PRIMARY_COORDINATES_TEXT} · Kyauktada Township, Yangon
          </p>
        </div>
      )}

      <Map
        mapId="DEMO_MAP_ID"
        defaultZoom={DEFAULT_MAP_ZOOM}
        defaultCenter={PRIMARY_OFFICE_COORDINATES}
        gestureHandling="cooperative"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        onTilesLoaded={() => setTilesLoaded(true)}
        style={{ width: '100%', height: '100%', minHeight: '420px' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={PRIMARY_OFFICE_COORDINATES}
          onClick={handleMarkerClick}
          title="TB Star Company Limited — Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon, Myanmar"
        >
          <div className="flex flex-col items-center cursor-pointer group">
            {/* Prominent Branded Company Label Above Pin */}
            <div className="mb-1 px-2.5 py-1 rounded-md bg-[#173D2A] text-white border border-[#A8D977] shadow-md flex items-center gap-1.5 whitespace-nowrap group-hover:bg-[#245C3A] transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#A8D977] shrink-0" />
              <span className="text-[11px] font-bold tracking-tight">
                {COMPANY_INFO.name}
              </span>
            </div>
            <Pin
              background="#173D2A"
              borderColor="#A8D977"
              glyphColor="#A8D977"
              scale={1.35}
            />
          </div>
        </AdvancedMarker>

        {infoWindowOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={320}
            onCloseClick={() => setInfoWindowOpen(false)}
          >
            <div className="p-1.5 text-left text-[#26332B]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#245C3A] shrink-0" />
                <p className="text-xs sm:text-sm font-bold text-[#173D2A] leading-tight">
                  TB Star Company Limited
                </p>
              </div>

              <p className="text-xs font-semibold text-[#173D2A] leading-snug">
                Corner of 39th Street and Anawrahta Road
              </p>
              <p className="text-xs text-[#26332B] leading-snug mb-1.5">
                Kyauktada Township, Yangon, Myanmar.
              </p>

              <p className="text-[11px] text-[#26332B]/80 leading-snug mb-2">
                {isMm
                  ? COMPANY_INFO.address.fullMm
                  : `${COMPANY_INFO.address.line1}`}
              </p>

              <div className="px-2 py-1 bg-[#F6F8F3] border border-[#DDE5D9] rounded text-[10px] font-mono-tabular text-[#245C3A] font-semibold mb-2">
                Lat: {PRIMARY_OFFICE_COORDINATES.lat} · Lng:{' '}
                {PRIMARY_OFFICE_COORDINATES.lng}
              </div>

              <div className="pt-1.5 border-t border-[#DDE5D9] flex items-center justify-between gap-2">
                <a
                  href={GET_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get Directions to TB Star Company Limited"
                  className="text-[11px] font-bold text-[#173D2A] hover:text-[#245C3A] underline inline-flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3 text-[#245C3A]" />
                  <span>{isMm ? 'လမ်းညွှန်ရယူရန်' : 'Get Directions'}</span>
                </a>
                <a
                  href={VIEW_LARGER_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Larger Map on Google Maps"
                  className="text-[11px] font-semibold text-[#245C3A] hover:text-[#173D2A] inline-flex items-center gap-1"
                >
                  <span>{isMm ? 'မြေပုံအကြီးကြည့်ရန်' : 'View Larger Map'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-[10px] text-[#26332B]/60 mt-1">Google Maps</p>
            </div>
          </InfoWindow>
        )}
      </Map>

      {/* Floating Map Overlay Controls */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-xs border border-[#DDE5D9] rounded-lg px-3 py-1.5 shadow-sm flex items-center gap-2 pointer-events-auto">
          <Building2 className="w-4 h-4 text-[#245C3A] shrink-0" />
          <span className="text-xs font-bold text-[#173D2A]">
            {isMm
              ? 'TB Star Company Limited · ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်'
              : 'TB Star Company Limited · 39th St & Anawrahta Rd'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleRecenter}
          aria-label="Recenter map on TB Star Company Limited coordinates 16.776671, 96.163664"
          className="bg-[#173D2A] hover:bg-[#245C3A] focus:outline-none focus:ring-2 focus:ring-[#A8D977] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer pointer-events-auto"
        >
          <LocateFixed className="w-3.5 h-3.5 text-[#A8D977]" />
          <span>{t('Center on Company Pin', 'ကုမ္ပဏီတည်နေရာသို့ ပြန်ချိန်ရန်')}</span>
        </button>
      </div>
    </div>
  );
};

interface OfficeLocationMapProps {
  className?: string;
}

export const OfficeLocationMap: React.FC<OfficeLocationMapProps> = ({
  className = '',
}) => {
  const { isMm, t } = useLanguage();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const [copiedField, setCopiedField] = useState<'address' | 'coordinates' | null>(
    null
  );

  const copyToClipboard = useCallback(
    async (text: string, field: 'address' | 'coordinates') => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        setCopiedField(field);
        window.setTimeout(() => {
          setCopiedField((current) => (current === field ? null : current));
        }, 2500);
      } catch {
        // Ignore clipboard errors in restricted environments
      }
    },
    []
  );

  return (
    <div
      className={`bg-white border border-[#DDE5D9] rounded-2xl overflow-hidden shadow-2xs ${className}`}
    >
      {/* Top Section Banner */}
      <div className="p-5 sm:p-6 bg-[#173D2A] text-white border-b border-[#245C3A]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 text-[#A8D977]" />
            </div>
            <div>
              <p className="text-xs font-mono-tabular text-[#A8D977] font-semibold uppercase tracking-wider mb-1">
                {t(
                  'OFFICIAL HEADQUARTERS LOCATION · YANGON, MYANMAR',
                  'တရားဝင် ရုံးချုပ်တည်နေရာ · ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့'
                )}
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug mb-1">
                {COMPANY_INFO.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                {PRIMARY_ADDRESS_TEXT} ({COMPANY_INFO.address.line1})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs font-mono-tabular text-[#A8D977] font-semibold inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>{PRIMARY_COORDINATES_TEXT}</span>
            </span>
            <a
              href={GET_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Directions to TB Star Company Limited in Google Maps"
              className="px-4 py-2 bg-[#A8D977] hover:bg-[#97cc64] text-[#173D2A] text-xs font-bold rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{t('Get Directions', 'လမ်းညွှန် ရယူရန်')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Two-Column Desktop Layout / Stacked Mobile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left/Main Column: Interactive Google Map (7 cols on desktop) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#DDE5D9]">
          {apiKey ? (
            <APIProvider
              apiKey={apiKey}
              language={isMm ? 'my' : 'en'}
              region="MM"
            >
              <OfficeMapCanvas />
            </APIProvider>
          ) : (
            <div
              role="region"
              aria-label="TB Star Company Limited Static Location Details"
              className="w-full h-full min-h-[420px] bg-[#F6F8F3] flex flex-col items-center justify-center p-6 text-center"
            >
              <MapPin className="w-10 h-10 text-[#245C3A] mb-3" />
              <h4 className="text-base font-bold text-[#173D2A] mb-1">
                {COMPANY_INFO.name}
              </h4>
              <p className="text-sm font-medium text-[#173D2A] mb-1">
                {PRIMARY_ADDRESS_TEXT}
              </p>
              <p className="text-xs text-[#26332B]/80 mb-3">
                {COMPANY_INFO.address.fullMm}
              </p>
              <p className="text-xs font-mono-tabular text-[#245C3A] font-semibold mb-4">
                {PRIMARY_COORDINATES_TEXT}
              </p>
              <a
                href={GET_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#173D2A] hover:bg-[#245C3A] text-white text-xs font-bold rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#A8D977]" />
                <span>{t('Get Directions', 'လမ်းညွှန် ရယူရန်')}</span>
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Location Information Card (5 cols on desktop) */}
        <div className="lg:col-span-5 p-6 sm:p-7 bg-white flex flex-col justify-between">
          <div className="space-y-5">
            {/* Card Title */}
            <div className="pb-4 border-b border-[#DDE5D9] flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-mono-tabular font-semibold uppercase tracking-wider text-[#245C3A]">
                  {t('LOCATION INFORMATION CARD', 'တည်နေရာ အချက်အလက်ကတ်')}
                </p>
                <h4 className="text-base sm:text-lg font-bold text-[#173D2A]">
                  {t('Verified Map & GPS Details', 'အတည်ပြုထားသော မြေပုံနှင့် တည်နေရာ')}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#F6F8F3] border border-[#DDE5D9] text-[11px] font-mono-tabular font-semibold text-[#173D2A]">
                MM · YGN
              </span>
            </div>

            {/* Company Name */}
            <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl p-4">
              <p className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#245C3A] font-semibold mb-1">
                {t('Company', 'ကုမ္ပဏီအမည်')}
              </p>
              <p className="text-base font-bold text-[#173D2A]">
                TB Star Company Limited
              </p>
            </div>

            {/* Official Address */}
            <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl p-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <p className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#245C3A] font-semibold">
                  {t('Address', 'လိပ်စာ')}
                </p>
                {copiedField === 'address' && (
                  <span
                    role="status"
                    aria-live="polite"
                    className="text-[11px] font-semibold text-[#173D2A] bg-[#A8D977]/40 px-2 py-0.5 rounded inline-flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 text-[#173D2A]" />
                    {t('Address Copied', 'လိပ်စာ ကူးယူပြီးပါပြီ')}
                  </span>
                )}
              </div>
              <address className="not-italic text-sm font-bold text-[#173D2A] leading-relaxed mb-1.5">
                Corner of 39th Street and Anawrahta Road,
                <br />
                Kyauktada Township,
                <br />
                Yangon, Myanmar.
              </address>
              <p className="text-xs text-[#26332B]/85 leading-relaxed mb-1">
                {COMPANY_INFO.address.line1}
              </p>
              <p className="text-xs text-[#26332B]/85 leading-relaxed">
                {COMPANY_INFO.address.fullMm}
              </p>
            </div>

            {/* Exact GPS Coordinates */}
            <div className="bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl p-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#245C3A] font-semibold">
                  {t('Coordinates', 'မြေပုံကိုသြဒိနိတ် (GPS Coordinates)')}
                </p>
                {copiedField === 'coordinates' && (
                  <span
                    role="status"
                    aria-live="polite"
                    className="text-[11px] font-semibold text-[#173D2A] bg-[#A8D977]/40 px-2 py-0.5 rounded inline-flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 text-[#173D2A]" />
                    {t('Coordinates Copied', 'ကိုသြဒိနိတ် ကူးယူပြီးပါပြီ')}
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base font-mono-tabular font-bold text-[#173D2A] mb-1">
                {PRIMARY_COORDINATES_TEXT}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono-tabular text-[#26332B]/80">
                <span>Latitude: {PRIMARY_OFFICE_COORDINATES.lat}</span>
                <span>Longitude: {PRIMARY_OFFICE_COORDINATES.lng}</span>
              </div>
            </div>
          </div>

          {/* Interactive Action Buttons (Full-width on mobile, responsive grid on tablet/desktop) */}
          <div className="mt-6 pt-5 border-t border-[#DDE5D9] space-y-2.5">
            {/* Primary CTA: Get Directions */}
            <a
              href={GET_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Directions to TB Star Company Limited (16.776671, 96.163664) on Google Maps"
              className="w-full py-3 px-4 bg-[#173D2A] hover:bg-[#245C3A] focus:outline-none focus:ring-2 focus:ring-[#A8D977] text-white text-xs sm:text-sm font-bold rounded-xl shadow-2xs inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Navigation className="w-4 h-4 text-[#A8D977] shrink-0" />
              <span>
                {t(
                  'Get Directions in Google Maps',
                  'Google Maps ဖြင့် လမ်းညွှန်ရယူရန်'
                )}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#A8D977] shrink-0" />
            </a>

            {/* Secondary CTA: View Larger Map */}
            <a
              href={VIEW_LARGER_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Larger Map of TB Star Company Limited on Google Maps"
              className="w-full py-2.5 px-4 bg-[#A8D977] hover:bg-[#97cc64] focus:outline-none focus:ring-2 focus:ring-[#173D2A] text-[#173D2A] text-xs sm:text-sm font-bold rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#173D2A] shrink-0" />
              <span>{t('View Larger Map', 'မြေပုံအကြီး ကြည့်ရှုရန်')}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#173D2A] shrink-0" />
            </a>

            {/* Copy Utility Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    `${COMPANY_INFO.name}, ${PRIMARY_ADDRESS_TEXT} (${COMPANY_INFO.address.line1})`,
                    'address'
                  )
                }
                aria-label="Copy TB Star Company Limited address to clipboard"
                className="w-full py-2.5 px-3 bg-[#F6F8F3] hover:bg-[#EBF0E6] focus:outline-none focus:ring-2 focus:ring-[#245C3A] text-[#173D2A] border border-[#DDE5D9] text-xs font-semibold rounded-lg inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedField === 'address' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#245C3A] shrink-0" />
                    <span>{t('Copied Address!', 'လိပ်စာ ကူးယူပြီး!')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#245C3A] shrink-0" />
                    <span>{t('Copy Address', 'လိပ်စာ ကူးယူရန်')}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  copyToClipboard(PRIMARY_COORDINATES_TEXT, 'coordinates')
                }
                aria-label="Copy GPS coordinates 16.776671, 96.163664 to clipboard"
                className="w-full py-2.5 px-3 bg-[#F6F8F3] hover:bg-[#EBF0E6] focus:outline-none focus:ring-2 focus:ring-[#245C3A] text-[#173D2A] border border-[#DDE5D9] text-xs font-semibold rounded-lg inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedField === 'coordinates' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#245C3A] shrink-0" />
                    <span>{t('Copied GPS!', 'ကိုသြဒိနိတ် ကူးယူပြီး!')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#245C3A] shrink-0" />
                    <span>{t('Copy Coordinates', 'ကိုသြဒိနိတ် ကူးယူရန်')}</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Phone Assistance Link */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#26332B]/80">
              <span>{t('Need arrival assistance?', 'လမ်းညွှန် အကူအညီ လိုအပ်ပါသလား?')}</span>
              <a
                href={COMPANY_INFO.telephoneHref}
                aria-label={`Call TB Star Company Limited at ${COMPANY_INFO.telephone}`}
                className="font-mono-tabular font-bold text-[#173D2A] hover:text-[#245C3A] inline-flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-[#245C3A]" />
                <span>{COMPANY_INFO.telephone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Landmark & Attribution Bar */}
      <div className="px-5 py-3.5 bg-[#F6F8F3] border-t border-[#DDE5D9] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#26332B]/85">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#245C3A] shrink-0" />
          <span>
            {t(
              'Primary Official Location: Corner of 39th Street and Anawrahta Road (Central Tower, 11th Floor, Room No. 1103), Kyauktada Township, Yangon, Myanmar',
              'ပင်မရုံးချုပ်တည်နေရာ - ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့် (Central Tower၊ ၁၁ လွှာ၊ အခန်း ၁၁၀၃)၊ ကျောက်တံတားမြို့နယ်၊ ရန်ကုန်မြို့'
            )}
          </span>
        </div>
        <a
          href={VIEW_LARGER_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono-tabular text-[11px] text-[#245C3A] hover:text-[#173D2A] font-semibold shrink-0 underline"
        >
          Google Maps ({PRIMARY_COORDINATES_TEXT})
        </a>
      </div>
    </div>
  );
};
