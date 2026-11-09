import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';
import {
  GalleryCategoryName,
  GalleryPreviewItem,
  InquiryTypeOption,
} from '../constants/companyData';
import { GALLERY_CATEGORY_LABELS, useLanguage } from '../context/LanguageContext';

interface GalleryGridProps {
  items: GalleryPreviewItem[];
  showCategoryFilters?: boolean;
  onInquireFromGallery?: (type: InquiryTypeOption) => void;
}

const focusStyle =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245C3A]';
const isEquipment = (item: GalleryPreviewItem) =>
  ['Industrial Machinery', 'Offset Printing'].includes(item.category);
const inquiryType = (item: GalleryPreviewItem): InquiryTypeOption =>
  item.visualType === 'activated-carbon'
    ? 'Activated Carbon'
    : item.category === 'Printing Products'
    ? 'Books Printing'
    : item.visualType === 'bamboo-sticks'
    ? 'Bamboo Sticks'
    : 'Bamboo Split';

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  showCategoryFilters = true,
  onInquireFromGallery,
}) => {
  const { isMm, t } = useLanguage();
  const [category, setCategory] = useState<'All' | GalleryCategoryName>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const categoryId = useId();
  const filtered =
    category === 'All' ? items : items.filter((item) => item.category === category);
  const selected = filtered.find((item) => item.id === selectedId);
  const categories: ('All' | GalleryCategoryName)[] = [
    'All',
    ...new Set<GalleryCategoryName>([
      'Bamboo Products',
      'Bamboo Production',
      'Packaging',
      'Printing Products',
      'Other Company Activities',
      'Industrial Machinery',
      'Offset Printing',
      ...items.map((item) => item.category),
    ]),
  ];
  const label = (value: 'All' | GalleryCategoryName) =>
    GALLERY_CATEGORY_LABELS[value][isMm ? 'mm' : 'en'];
  const title = (item: GalleryPreviewItem) => (isMm ? item.titleMm : item.title);
  const open = (item: GalleryPreviewItem, element: HTMLElement) => {
    trigger.current = element;
    setSelectedId(item.id);
  };
  const close = () => setSelectedId(null);
  const move = (direction: number) => {
    const index = filtered.findIndex((item) => item.id === selectedId);
    if (filtered.length) {
      setSelectedId(
        filtered[(index + direction + filtered.length) % filtered.length].id
      );
    }
  };

  // Native modal semantics keep focus inside the lightbox and make the page inert.
  useEffect(() => {
    if (!selectedId) return;
    const modal = dialog.current;
    const overflow = document.body.style.overflow;
    modal?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      modal?.close();
      document.body.style.overflow = overflow;
      trigger.current?.focus();
    };
  }, [Boolean(selectedId)]);

  return (
    <div>
      {showCategoryFilters && (
        <div
          role="group"
          aria-label="Gallery categories"
          className="mb-8 flex flex-wrap gap-2 p-2 border border-[#DDE5D9] rounded-lg w-fit max-w-full"
        >
          {categories.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
              className={`min-h-11 px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${focusStyle} ${
                category === value
                  ? 'bg-[#173D2A] text-white'
                  : 'text-[#26332B] hover:bg-white'
              }`}
            >
              {label(value)}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" role="status">
        {filtered.length} {t('images shown', 'ပုံများ ပြသထားသည်')}
      </p>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-gallery-grid
      >
        {filtered.map((item) => (
          <article
            key={item.id}
            data-gallery-category={item.category}
            className="bg-white border border-[#DDE5D9] hover:border-[#245C3A] rounded-xl overflow-hidden flex flex-col shadow-2xs hover:shadow-sm transition-shadow"
          >
            <button
              type="button"
              onClick={(event) => open(item, event.currentTarget)}
              aria-label={`Enlarge ${title(item)}`}
              className={`relative block w-full aspect-video bg-[#F6F8F3] cursor-pointer ${focusStyle}`}
            >
              <img
                src={item.imagePath}
                srcSet={item.imageSrcSet}
                sizes="(min-width: 1024px) 390px, (min-width: 768px) 46vw, 92vw"
                width={item.imageWidth}
                height={item.imageHeight}
                alt={item.altText}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
              <span
                aria-hidden="true"
                className="absolute top-3 right-3 p-2 rounded-md bg-[#173D2A]/85 text-white"
              >
                <Maximize2 className="w-4 h-4" />
              </span>
            </button>
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-xs text-[#245C3A] font-medium mb-2">
                {label(item.category)}
              </p>
              <h3 className="text-base font-bold text-[#173D2A] mb-2">
                {title(item)}
              </h3>
              {item.caption && (
                <p className="text-xs text-[#26332B]/80 leading-relaxed mb-3">
                  {isMm ? item.captionMm : item.caption}
                </p>
              )}
              <div className="mt-auto pt-3 border-t border-[#DDE5D9] flex flex-wrap justify-between gap-3 text-xs">
                {onInquireFromGallery && !isEquipment(item) && (
                  <button
                    type="button"
                    onClick={() => onInquireFromGallery(inquiryType(item))}
                    className={`min-h-11 font-semibold text-[#245C3A] cursor-pointer ${focusStyle}`}
                  >
                    {t('Inquire Now', 'ဆက်သွယ်မေးမြန်းရန်')}
                  </button>
                )}
                <button
                  type="button"
                  onClick={(event) => open(item, event.currentTarget)}
                  className={`min-h-11 font-semibold text-[#173D2A] underline cursor-pointer ${focusStyle}`}
                >
                  {t('Enlarge Photo', 'ပုံကြီးချဲ့ကြည့်ရန်')}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        aria-describedby={categoryId}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={close}
        onKeyDown={(event) => {
          if (event.key === 'Tab') {
            const controls = Array.from(
              event.currentTarget.querySelectorAll<HTMLButtonElement>(
                'button:not([disabled])'
              )
            );
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
        className="m-auto p-0 w-[calc(100%-2rem)] max-w-5xl max-h-[90dvh] overflow-y-auto rounded-xl border border-[#DDE5D9] bg-white text-[#173D2A] shadow-xl backdrop:bg-[#173D2A]/80"
      >
        {selected && (
          <>
            <div className="px-5 py-4 bg-[#173D2A] text-white flex justify-between gap-4 items-start">
              <div aria-live="polite">
                <p id={categoryId} className="text-xs text-[#A8D977] mb-1">
                  {label(selected.category)}
                </p>
                <h2 id={titleId} className="text-lg font-bold">
                  {title(selected)}
                </h2>
              </div>
              <button
                autoFocus
                type="button"
                onClick={close}
                aria-label="Close enlarged gallery view"
                className="min-h-11 min-w-11 rounded-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
              >
                <X className="w-5 h-5 mx-auto" />
              </button>
            </div>
            <img
              src={selected.imagePath}
              srcSet={selected.imageSrcSet}
              sizes="90vw"
              alt={selected.altText}
              width={selected.imageWidth}
              height={selected.imageHeight}
              decoding="async"
              className="w-full h-auto max-h-[60dvh] object-contain bg-[#F6F8F3]"
            />
            <div className="p-5">
              {selected.caption && (
                <p className="text-sm mb-3">
                  {isMm ? selected.captionMm : selected.caption}
                </p>
              )}
              {selected.editedBackground && (
                <p className="text-sm text-[#245C3A] font-medium mb-3">
                  Equipment shown with an edited background
                </p>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  aria-label="Previous photograph"
                  onClick={() => move(-1)}
                  className={`min-h-11 min-w-11 p-3 rounded-lg border border-[#DDE5D9] cursor-pointer ${focusStyle}`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <p className="text-xs">
                  {filtered.findIndex((item) => item.id === selectedId) + 1} /{' '}
                  {filtered.length}
                </p>
                <button
                  type="button"
                  aria-label="Next photograph"
                  onClick={() => move(1)}
                  className={`min-h-11 min-w-11 p-3 rounded-lg border border-[#DDE5D9] cursor-pointer ${focusStyle}`}
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
};
