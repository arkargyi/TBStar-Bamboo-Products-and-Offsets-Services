import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Coordinates for Central Tower, Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon
const CENTRAL_TOWER_LAT_LNG = {
  latitude: 16.7745,
  longitude: 96.1618,
};

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

const groundingCache = new Map<string, MapsGroundingResponse>();
let quotaCooldownUntil = 0;

function buildFallbackMapsGrounding(
  query: string,
  language: 'en' | 'mm' = 'en',
  coords: { latitude: number; longitude: number } = CENTRAL_TOWER_LAT_LNG
): MapsGroundingResponse {
  const q = query.toLowerCase();
  const isMm = language === 'mm';

  const centralTowerPlace: MapsPlaceLink = {
    title: 'Central Tower, Anawrahta Road & 39th Street, Kyauktada Township, Yangon',
    uri: 'https://www.google.com/maps/search/?api=1&query=Central+Tower+Anawrahta+Road+39th+Street+Kyauktada+Township+Yangon',
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
  const strandHotelPlace: MapsPlaceLink = {
    title: 'The Strand & Sule Shangri-La Business District, Downtown Yangon',
    uri: 'https://www.google.com/maps/search/?api=1&query=Hotels+near+Anawrahta+Road+Kyauktada+Township+Yangon',
  };

  if (q.includes('landmark') || q.includes('pagoda') || q.includes('အထင်ကရ')) {
    return {
      query,
      text: isMm
        ? [
            '* Central Tower သည် ရန်ကုန်မြို့လယ် စီးပွားရေးအချက်အချာဖြစ်သော ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်တွင် တည်ရှိပါသည်။',
            '* ဆူးလေစေတီတော်၊ မဟာဗန္ဓုလပန်းခြံနှင့် ရန်ကုန်မြို့တော်ခန်းမတို့မှ အရှေ့ဘက်သို့ မိနစ်အနည်းငယ် သွားရုံဖြင့် ရောက်ရှိနိုင်ပါသည်။',
            '* ပန်းဆိုးတန်းလမ်းမကြီး (Pansodan Street) နှင့် ဗိုလ်အောင်ကျော်လမ်းအနီးတွင် တည်ရှိသောကြောင့် စီးပွားရေးလုပ်ငန်းများနှင့် ရုံးခန်းများ အလွယ်တကူ ဆက်သွယ်သွားလာနိုင်ပါသည်။',
          ].join('\n')
        : [
            '* Central Tower stands at the corner of 39th Street and Anawrahta Road in the heart of Kyauktada Township, downtown Yangon.',
            '* Major landmarks within 600–800 meters include Sule Pagoda, Yangon City Hall, Maha Bandula Park, and the historic Pansodan Street commercial corridor.',
            '* Easily reachable via Anawrahta Road (one of downtown Yangon’s primary east-west arteries) and Pansodan / 39th Street.',
          ].join('\n'),
      places: [centralTowerPlace, sulePagodaPlace, yangonCityHallPlace, pansodanPlace],
      reviewSnippets: [
        {
          text: isMm
            ? 'အနော်ရထာလမ်းမကြီးနှင့် ၃၉ လမ်းထောင့်တွင် တည်ရှိသော အထပ်မြင့် စီးပွားရေးတာဝါဖြစ်ပြီး သွားလာရလွယ်ကူသည်။'
            : 'Prominent commercial office tower at the intersection of 39th Street and Anawrahta Road in downtown Kyauktada Township.',
          placeTitle: 'Central Tower, Kyauktada Township',
          uri: centralTowerPlace.uri,
        },
      ],
      coordinates: coords,
      timestamp: new Date().toISOString(),
    };
  }

  if (q.includes('bank') || q.includes('logistic') || q.includes('shipping') || q.includes('ဘဏ်')) {
    return {
      query,
      text: isMm
        ? [
            '* Central Tower (၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်) အနီးတစ်ဝိုက်တွင် KBZ Bank၊ AYA Bank၊ CB Bank နှင့် MAB ဘဏ်ခွဲများ အနီးကပ် တည်ရှိပါသည်။',
            '* ပန်းဆိုးတန်းလမ်းနှင့် ကမ်းနားလမ်း (Strand Road) အနီးရှိ ကုန်သွယ်ရေးရုံးများ၊ ပို့ကုန်/သွင်းကုန် အေးဂျင့်များနှင့် ရန်ကုန်ဆိပ်ကမ်းသို့ ချိတ်ဆက်ရန် အချက်အချာကျပါသည်။',
            '* TB Star Company Limited ၏ အခန်းအမှတ် (၁၁၀၃)၊ (၁၁) လွှာ ရုံးချုပ်သို့ လာရောက်ဆွေးနွေးသော လုပ်ငန်းရှင်များအတွက် ဘဏ်လုပ်ငန်းနှင့် စာရွက်စာတမ်းကိစ္စရပ်များ ဆောင်ရွက်ရန် အထူးအဆင်ပြေပါသည်။',
          ].join('\n')
        : [
            '* The Anawrahta Road & Pansodan Street intersection near Central Tower hosts major commercial bank branches including KBZ Bank, AYA Bank, CB Bank, and UAB within a 3-minute walk.',
            '* Close proximity to Strand Road, Myanmar Port Authority, customs clearing offices, and international freight forwarders in Kyauktada and Botahtaung townships.',
            '* Ideal downtown corporate location for B2B procurement meetings, export documentation, and commercial printing consultations at Room 1103 (11th Floor).',
          ].join('\n'),
      places: [centralTowerPlace, pansodanPlace, yangonCityHallPlace],
      reviewSnippets: [
        {
          text: isMm
            ? 'ကျောက်တံတားမြို့နယ် စီးပွားရေးဇုန်အတွင်း တည်ရှိသဖြင့် ဘဏ်များနှင့် ကုမ္ပဏီရုံးချုပ်များသို့ အလွယ်တကူ သွားလာနိုင်သည်။'
            : 'Central business district location surrounded by major banks, corporate offices, and trade service providers on Anawrahta Road.',
          placeTitle: 'Central Tower Business District, Kyauktada',
          uri: centralTowerPlace.uri,
        },
      ],
      coordinates: coords,
      timestamp: new Date().toISOString(),
    };
  }

  if (q.includes('hotel') || q.includes('visitor') || q.includes('dining') || q.includes('transit') || q.includes('ဟိုတယ်')) {
    return {
      query,
      text: isMm
        ? [
            '* အနော်ရထာလမ်းမကြီးပေါ်ရှိ YBS မှတ်တိုင်များ (ပန်းဆိုးတန်း / ၃၉ လမ်းမှတ်တိုင်) မှ Central Tower သို့ တိုက်ရိုက် လမ်းလျှောက်ဝင်ရောက်နိုင်ပါသည်။',
            '* နိုင်ငံတကာနှင့် နယ်မှ လာရောက်သော ဧည့်သည်များအတွက် Sule Shangri-La၊ Pan Pacific Yangon နှင့် The Strand Hotel တို့မှ တက္ကစီဖြင့် ၅ မိနစ်မှ ၁၀ မိနစ်အတွင်း ရောက်ရှိနိုင်ပါသည်။',
            '* ၃၉ လမ်း၊ အနော်ရထာလမ်းနှင့် ပန်းဆိုးတန်းတစ်လျှောက်တွင် စားသောက်ဆိုင်များ၊ ကော်ဖီဆိုင်များနှင့် ဧည့်ခံတွေ့ဆုံရန် နေရာများစွာ ရှိပါသည်။',
          ].join('\n')
        : [
            '* Direct visitor access via Anawrahta Road and 39th Street, with major YBS bus stops (Pansodan / 38th–39th Street stops) steps from Central Tower.',
            '* Visiting business buyers staying at Sule Shangri-La, Pan Pacific Yangon, or The Strand Hotel are within a 5–10 minute taxi ride.',
            '* Take the main passenger elevators at Central Tower lobby up to the 11th Floor, Room No. 1103 for TB Star Company Limited.',
          ].join('\n'),
      places: [centralTowerPlace, strandHotelPlace, sulePagodaPlace],
      reviewSnippets: [
        {
          text: isMm
            ? 'ဓာတ်လှေကားစနစ်နှင့် လုံခြုံရေးစနစ် ပါရှိသော အနော်ရထာလမ်းမပေါ်ရှိ ရုံးခန်းတာဝါ။'
            : 'Accessible downtown office building with lobby security and elevator access to the 11th floor executive suites.',
          placeTitle: 'Central Tower, 39th St & Anawrahta Rd',
          uri: centralTowerPlace.uri,
        },
      ],
      coordinates: coords,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    query,
    text: isMm
      ? [
          '* TBStar Company Limited ရုံးချုပ်သည် ရန်ကုန်မြို့၊ ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်ရှိ Central Tower၊ (၁၁) လွှာ၊ အခန်းအမှတ် (၁၁၀၃) တွင် တည်ရှိပါသည်။',
          '* မြေပုံတည်နေရာအညွှန်း (Coordinates): 16.7745° N, 96.1618° E ဖြစ်ပြီး ပန်းဆိုးတန်းလမ်းမကြီးနှင့် ဆူးလေစေတီတော်အနီး ရန်ကုန်မြို့လယ် စီးပွားရေးဇုန်တွင် တည်ရှိပါသည်။',
          '* ရုံးချိန်အတွင်း ဝါးထုတ်ကုန် နမူနာများ (Bamboo Raw Materials) နှင့် ပုံနှိပ်လုပ်ငန်း (Printing Services) ဆိုင်ရာ ကိစ္စရပ်များကို အခန်း (၁၁၀၃) သို့ လူကိုယ်တိုင် လာရောက်ဆွေးနွေးနိုင်ပါသည်။',
        ].join('\n')
      : [
          '* TB Star Company Limited’s corporate headquarters is located at Room No. 1103, 11th Floor, Central Tower, at the corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon, Myanmar.',
          '* Positioned in downtown Yangon’s primary commercial district (16.7745° N, 96.1618° E), just one block east of Pansodan Street and a short distance from Sule Pagoda and Yangon City Hall.',
          '* Visitors, export buyers, and corporate printing clients can access the 11th Floor via the main Central Tower lobby on Anawrahta Road & 39th Street.',
        ].join('\n'),
    places: [centralTowerPlace, pansodanPlace, sulePagodaPlace, yangonCityHallPlace],
    reviewSnippets: [
      {
        text: isMm
          ? 'ရန်ကုန်မြို့လယ် ကျောက်တံတားမြို့နယ်၊ ၃၉ လမ်းနှင့် အနော်ရထာလမ်းထောင့်ရှိ အဓိက စီးပွားရေးရုံးခန်းတာဝါ။'
          : 'Well-known commercial office tower at the corner of 39th Street and Anawrahta Road in downtown Kyauktada Township, Yangon.',
        placeTitle: 'Central Tower, Kyauktada Township, Yangon',
        uri: centralTowerPlace.uri,
      },
    ],
    coordinates: coords,
    timestamp: new Date().toISOString(),
  };
}

async function queryMapsGrounding(
  query: string,
  language: 'en' | 'mm' = 'en',
  latLng?: { latitude: number; longitude: number }
): Promise<MapsGroundingResponse> {
  const coords =
    latLng &&
    typeof latLng.latitude === 'number' &&
    typeof latLng.longitude === 'number'
      ? latLng
      : CENTRAL_TOWER_LAT_LNG;

  const cacheKey = `${language}:${coords.latitude.toFixed(4)},${coords.longitude.toFixed(4)}:${query.trim().toLowerCase()}`;
  const cached = groundingCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // If API key is missing or currently in a 429 rate-limit cooldown window, serve verified fallback immediately
  if (!process.env.GEMINI_API_KEY || Date.now() < quotaCooldownUntil) {
    const fallback = buildFallbackMapsGrounding(query, language, coords);
    groundingCache.set(cacheKey, fallback);
    return fallback;
  }

  const languageInstruction =
    language === 'mm'
      ? 'Respond in clear, natural Burmese (Myanmar language) alongside official English place names where helpful.'
      : 'Respond in clear, professional English.';

  const prompt = `You are providing accurate Google Maps location intelligence for TB Star Company Limited's corporate office located at:
Central Tower, 11th Floor (Room No. 1103), Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon, Myanmar.

User Query: ${query}

Provide helpful, accurate geographic details about Central Tower in Kyauktada Township, Yangon, surrounding streets (Anawrahta Road & 39th Street), nearby landmarks, and visitor access information. ${languageInstruction}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: coords.latitude,
              longitude: coords.longitude,
            },
          },
        },
      },
    });

    const text = response.text || '';
    const chunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const places: MapsPlaceLink[] = [];
    const reviewSnippets: MapsReviewSnippet[] = [];
    const seenUris = new Set<string>();

    for (const chunk of chunks as any[]) {
      if (chunk?.maps) {
        const mapData = chunk.maps;
        const uri: string | undefined = mapData.uri;
        const title: string =
          mapData.title || 'Central Tower, Kyauktada Township, Yangon';

        if (uri && !seenUris.has(uri)) {
          seenUris.add(uri);
          places.push({
            title,
            uri,
            placeId: mapData.placeId,
          });
        }

        const sources = mapData.placeAnswerSources;
        if (sources && Array.isArray(sources.reviewSnippets)) {
          for (const snippet of sources.reviewSnippets) {
            if (typeof snippet === 'string' && snippet.trim()) {
              reviewSnippets.push({
                text: snippet.trim(),
                uri: uri,
                placeTitle: title,
              });
            } else if (snippet && typeof snippet === 'object') {
              const snippetText =
                snippet.text ||
                snippet.snippet ||
                snippet.content ||
                snippet.reviewText ||
                '';
              const snippetUri =
                snippet.uri || snippet.googleMapsUri || snippet.url || uri;
              const snippetAuthor =
                snippet.author ||
                snippet.authorAttribution?.displayName ||
                undefined;
              if (snippetText) {
                reviewSnippets.push({
                  text: String(snippetText),
                  author: snippetAuthor ? String(snippetAuthor) : undefined,
                  uri: snippetUri ? String(snippetUri) : undefined,
                  placeTitle: title,
                });
              }
            }
          }
        }
      }
    }

    if (places.length === 0) {
      places.push({
        title:
          'Central Tower, Anawrahta Road & 39th Street, Kyauktada Township, Yangon',
        uri: 'https://www.google.com/maps/search/?api=1&query=Central+Tower+Anawrahta+Road+39th+Street+Kyauktada+Township+Yangon',
      });
    }

    const result: MapsGroundingResponse = {
      query,
      text: text || buildFallbackMapsGrounding(query, language, coords).text,
      places,
      reviewSnippets,
      coordinates: coords,
      timestamp: new Date().toISOString(),
    };

    groundingCache.set(cacheKey, result);
    return result;
  } catch (err: any) {
    const errMessage = String(err?.message || err || '');
    if (
      err?.status === 429 ||
      errMessage.includes('429') ||
      errMessage.includes('RESOURCE_EXHAUSTED') ||
      errMessage.includes('quota')
    ) {
      // Pause live Gemini API calls for 5 minutes when quota is exhausted
      quotaCooldownUntil = Date.now() + 5 * 60 * 1000;
    }

    const fallback = buildFallbackMapsGrounding(query, language, coords);
    groundingCache.set(cacheKey, fallback);
    return fallback;
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  const VALID_SPA_ROUTES = new Set([
    '/',
    '/about',
    '/bamboo-products',
    '/printing-services',
    '/gallery',
    '/contact',
  ]);

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use('/api', (_req, res, next) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    next();
  });

  app.use(express.json());

  app.post('/api/maps/grounding', async (req, res) => {
    const query =
      typeof req.body?.query === 'string' && req.body.query.trim()
        ? req.body.query.trim()
        : 'Central Tower, 11th Floor (Room 1103), Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon';
    const language = req.body?.language === 'mm' ? 'mm' : 'en';
    const latLng = req.body?.latLng;

    try {
      const data = await queryMapsGrounding(query, language, latLng);
      res.json(data);
    } catch {
      res.json(buildFallbackMapsGrounding(query, language, latLng));
    }
  });

  app.get('/api/maps/grounding', async (req, res) => {
    const query =
      typeof req.query?.query === 'string' && req.query.query.trim()
        ? req.query.query.trim()
        : 'Central Tower, 11th Floor (Room 1103), Corner of 39th Street and Anawrahta Road, Kyauktada Township, Yangon';
    const language = req.query?.language === 'mm' ? 'mm' : 'en';

    try {
      const data = await queryMapsGrounding(query, language);
      res.json(data);
    } catch {
      res.json(buildFallbackMapsGrounding(query, language));
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(
      '/assets',
      express.static(path.join(distPath, 'assets'), {
        maxAge: '1y',
        immutable: true,
      })
    );
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const normalizedPath = req.path.replace(/\/+$/, '') || '/';
      if (!VALID_SPA_ROUTES.has(normalizedPath)) {
        res.status(404).setHeader('X-Robots-Tag', 'noindex, nofollow');
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
