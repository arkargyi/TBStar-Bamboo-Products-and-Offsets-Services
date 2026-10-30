import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ProductCategoryId } from '../constants/companyData';

export interface SearchSuggestionItem {
  label: string;
  labelMm: string;
  query: string;
}

export interface SearchBarProps {
  /** Callback invoked in real-time whenever the search query changes */
  onSearch: (query: string) => void;
  /** Optional controlled search query value */
  query?: string;
  /** Optional initial query when used in uncontrolled or hybrid mode */
  initialQuery?: string;
  /** Optional category filter value */
  selectedCategory?: 'all' | ProductCategoryId;
  /** Optional callback when category tab changes */
  onCategoryChange?: (category: 'all' | ProductCategoryId) => void;
  /** Whether to show category filter tabs when onCategoryChange is provided */
  showCategoryTabs?: boolean;
  /** Current number of matching items */
  resultCount?: number;
  /** Total number of items before filtering */
  totalCount?: number;
  /** English placeholder text */
  placeholder?: string;
  /** Myanmar placeholder text */
  placeholderMm?: string;
  /** Quick search suggestion chips */
  suggestions?: SearchSuggestionItem[];
  /** Custom input element ID for accessibility and focus management */
  inputId?: string;
  /** Additional wrapper class names */
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  query: controlledQuery,
  initialQuery = '',
  selectedCategory = 'all',
  onCategoryChange,
  showCategoryTabs = false,
  resultCount,
  totalCount,
  placeholder = 'Search products by name, description, or specification (e.g., Bamboo Split, 30 kg, Klick, Plano)...',
  placeholderMm = 'ထုတ်ကုန်အမည်၊ အချက်အလက် သို့မဟုတ် အရွယ်အစားဖြင့် ရှာဖွေပါ (ဥပမာ - ဝါးခြမ်းပြား၊ 30 kg, Klick, Plano)...',
  suggestions = [
    { label: 'Bamboo Split (3 mm)', labelMm: 'ဝါးခြမ်းပြား (3 mm)', query: 'Bamboo Split' },
    { label: 'Bamboo Sticks (30 kg)', labelMm: 'ဝါးတံ (30 kg)', query: 'Bamboo Sticks' },
    { label: 'With Nodes', labelMm: 'အဆစ်ပါ (With Nodes)', query: 'With Nodes' },
    { label: 'Ball Pen (Klick / Plano)', labelMm: 'ဘောပင် (Klick / Plano)', query: 'Ball Pen' },
  ],
  inputId = 'catalog-product-search',
  className = '',
}) => {
  const { isMm, t } = useLanguage();
  const [internalQuery, setInternalQuery] = useState<string>(controlledQuery ?? initialQuery);

  useEffect(() => {
    if (controlledQuery !== undefined) {
      setInternalQuery(controlledQuery);
    }
  }, [controlledQuery]);

  const activeQuery = controlledQuery !== undefined ? controlledQuery : internalQuery;
  const hasActiveFilter = activeQuery.trim().length > 0 || selectedCategory !== 'all';

  const handleQueryChange = (nextValue: string) => {
    if (controlledQuery === undefined) {
      setInternalQuery(nextValue);
    }
    onSearch(nextValue);
  };

  const handleClear = () => {
    handleQueryChange('');
    if (onCategoryChange) {
      onCategoryChange('all');
    }
  };

  const categoryTabs: Array<{ id: 'all' | ProductCategoryId; label: string; labelMm: string }> = [
    { id: 'all', label: 'All Categories', labelMm: 'အားလုံး' },
    { id: 'bamboo', label: 'Bamboo Products', labelMm: 'ဝါးထုတ်ကုန်များ' },
    { id: 'stationery', label: 'Stationery Products', labelMm: 'စာရေးကိရိယာများ' },
  ];

  return (
    <div
      className={`bg-white border border-[#DDE5D9] rounded-2xl p-4 sm:p-5 shadow-xs transition-all ${className}`}
      role="search"
      aria-label={t('Product catalog search', 'ထုတ်ကုန် ရှာဖွေရေး')}
    >
      <div className="flex flex-col lg:flex-row gap-3.5 items-stretch lg:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <label htmlFor={inputId} className="sr-only">
            {t(placeholder, placeholderMm)}
          </label>
          <Search
            className="w-5 h-5 text-[#245C3A] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id={inputId}
            type="search"
            value={activeQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && activeQuery) {
                e.preventDefault();
                handleQueryChange('');
              }
            }}
            placeholder={t(placeholder, placeholderMm)}
            className={`w-full pl-11 pr-24 py-3 bg-[#F6F8F3] border border-[#DDE5D9] rounded-xl text-[#122019] placeholder-[#526358]/75 focus:outline-none focus:bg-white focus:border-[#245C3A] focus:ring-2 focus:ring-[#245C3A]/15 transition-all ${
              isMm ? 'text-sm leading-relaxed' : 'text-sm sm:text-base'
            }`}
          />
          {activeQuery.trim().length > 0 && (
            <button
              type="button"
              onClick={() => handleQueryChange('')}
              aria-label={t('Clear search query', 'ရှာဖွေမှု ရှင်းလင်းရန်')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EAF5E4] hover:bg-[#d8ecd0] text-[#173D2A] text-xs font-semibold transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t('Clear', 'ရှင်းရန်')}</span>
            </button>
          )}
        </div>

        {/* Category Filter Pills (Optional) */}
        {showCategoryTabs && onCategoryChange && (
          <div
            className="flex flex-wrap items-center gap-1.5 bg-[#F6F8F3] p-1.5 rounded-xl border border-[#DDE5D9]"
            role="group"
            aria-label={t('Filter by product category', 'ထုတ်ကုန် အမျိုးအစားအလိုက် စစ်ထုတ်ရန်')}
          >
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onCategoryChange(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#173D2A] text-white shadow-xs'
                      : 'text-[#526358] hover:text-[#173D2A] hover:bg-white/70'
                  }`}
                >
                  {t(tab.label, tab.labelMm)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Suggestions & Live Result Counter */}
      <div className="mt-3.5 pt-3 border-t border-[#DDE5D9]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {suggestions.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#526358] mr-1">
              {t('Quick Search:', 'အမြန်ရှာရန် -')}
            </span>
            {suggestions.map((item) => {
              const isSelected = activeQuery.trim().toLowerCase() === item.query.toLowerCase();
              return (
                <button
                  key={item.query}
                  type="button"
                  onClick={() => handleQueryChange(isSelected ? '' : item.query)}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#245C3A] text-white border-[#245C3A] font-semibold'
                      : 'bg-[#F6F8F3] text-[#173D2A] border-[#DDE5D9] hover:border-[#245C3A]/40 hover:bg-[#EAF5E4]/50'
                  }`}
                >
                  {t(item.label, item.labelMm)}
                </button>
              );
            })}
          </div>
        ) : (
          <div />
        )}

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-[#526358] shrink-0">
          {typeof resultCount === 'number' && typeof totalCount === 'number' && (
            <span aria-live="polite" className="font-medium">
              {isMm
                ? `စုစုပေါင်း ${totalCount} ခုအနက် ${resultCount} ခု ပြသထားသည်`
                : `Showing ${resultCount} of ${totalCount} items`}
            </span>
          )}
          {hasActiveFilter && (
            <button
              type="button"
              onClick={handleClear}
              className="text-[#245C3A] hover:text-[#173D2A] font-semibold underline underline-offset-2 cursor-pointer"
            >
              {t('Reset filters', 'အားလုံးပြန်ပြရန်')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
