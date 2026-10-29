import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { GalleryCategoryName, InquiryTypeOption } from '../constants/companyData';

export type LanguageCode = 'en' | 'mm';

interface LanguageContextValue {
  lang: LanguageCode;
  isMm: boolean;
  setLang: (lang: LanguageCode) => void;
  toggleLang: () => void;
  t: (en: string, mm?: string) => string;
}

const STORAGE_KEY = 'tbstar_preferred_language';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'mm') {
        return saved;
      }
    } catch {
      // Ignore storage access errors in restricted environments
    }
    return 'en';
  });

  const setLang = useCallback((nextLang: LanguageCode) => {
    setLangState(nextLang);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLang);
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'en' ? 'mm' : 'en';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore storage access errors
      }
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'mm' ? 'my' : 'en';
  }, [lang]);

  const t = useCallback(
    (en: string, mm?: string): string => {
      if (lang === 'mm' && mm) {
        return mm;
      }
      return en;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        isMm: lang === 'mm',
        setLang,
        toggleLang,
        t,
      }}
    >
      <div className={lang === 'mm' ? 'font-myanmar' : ''}>{children}</div>
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}

export const INQUIRY_TYPE_LABELS: Record<
  InquiryTypeOption,
  { en: string; mm: string }
> = {
  'Bamboo Split': {
    en: 'Bamboo Split',
    mm: 'ဝါးခြမ်းပြား (Bamboo Split)',
  },
  'Bamboo Sticks': {
    en: 'Bamboo Sticks',
    mm: 'ဝါးတံ (Bamboo Sticks)',
  },
  'Activated Carbon': {
    en: 'Activated Carbon',
    mm: 'အက်တီဗိတ်တက် ကာဗွန် (Activated Carbon)',
  },
  'Books Printing': {
    en: 'Books Printing',
    mm: 'စာအုပ်ပုံနှိပ်ခြင်းလုပ်ငန်း',
  },
  'Voucher Books Printing': {
    en: 'Voucher Books Printing',
    mm: 'ဘောင်ချာစာအုပ် ပုံနှိပ်ခြင်းလုပ်ငန်း',
  },
  'Other Offset Printing Services': {
    en: 'Other Offset Printing Services',
    mm: 'အခြား အော့ဖ်ဆက်ပုံနှိပ်ဝန်ဆောင်မှုများ',
  },
  'Ball Pen': {
    en: 'Ball Pen (Klick / Plano)',
    mm: 'ဘောပင် (Ball Pen · Klick / Plano)',
  },
  'General Inquiry': {
    en: 'General Inquiry',
    mm: 'အထွေထွေ စုံစမ်းမေးမြန်းခြင်း',
  },
};

export const GALLERY_CATEGORY_LABELS: Record<
  'All' | GalleryCategoryName,
  { en: string; mm: string }
> = {
  All: {
    en: 'All Categories',
    mm: 'ကဏ္ဍအားလုံး',
  },
  'Bamboo Products': {
    en: 'Bamboo Products',
    mm: 'ဝါးထုတ်ကုန်များ',
  },
  'Bamboo Production': {
    en: 'Bamboo Production',
    mm: 'ဝါးထုတ်လုပ်မှုလုပ်ငန်း',
  },
  Packaging: {
    en: 'Packaging',
    mm: 'ထုပ်ပိုးမှုပုံစံ',
  },
  'Printing Products': {
    en: 'Printing Products',
    mm: 'ပုံနှိပ်ထုတ်ကုန်များ',
  },
  'Other Company Activities': {
    en: 'Other Company Activities',
    mm: 'အခြားလုပ်ငန်းဆောင်ရွက်မှုများ',
  },
};
