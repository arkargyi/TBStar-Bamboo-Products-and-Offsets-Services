import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { COMPANY_INFO } from '../constants/companyData';
import { useLanguage } from '../context/LanguageContext';

export type VisualAssetType =
  | 'bamboo-split'
  | 'bamboo-sticks'
  | 'bamboo-custom'
  | 'activated-carbon'
  | 'books-printing'
  | 'voucher-printing'
  | 'commercial-printing'
  | 'hero-bamboo';

const PROMOTIONAL_PRINTING_BANNERS = new Set<string>([
  '/assets/aistudio/Books_Printing_for_a_Brighter_Future_c52d7121.webp',
  '/assets/aistudio/TBStar_Voucher_Book_Printing_1_16533922.png',
  '/assets/aistudio/TBStar_Offset_Printing_Services_Banner__2__3434b565.webp',
]);

const BRANDED_BAMBOO_SHOWCASE_ASSETS = new Set<string>([
  '/assets/aistudio/TB_Star_Bamboo_Product_Showcase.png',
  '/assets/aistudio/Bamboo_Splits_Product_Showcase_6112ef80.png',
  '/assets/aistudio/Bamboo_split_product_showcase_e09d33a9.webp',
  '/assets/aistudio/bamboo-sticks-main_49720bd6.webp',
  '/assets/aistudio/Natural_bamboo_sticks_packaging_showcase_02f33054.webp',
  '/assets/aistudio/Bamboo_Sticks_Wholesale_Product_Showcase_591af8f9.png',
  '/assets/aistudio/TBStar_Bamboo_Strips_Product_Banner_6aee4f1d.png',
  '/assets/aistudio/Bamboo_sticks_six-bundle_packaging_75ee48d2.webp',
]);

const WIDESCREEN_BAMBOO_BANNERS = new Set<string>([
  '/assets/aistudio/TB_Star_Bamboo_Product_Showcase.png',
  '/assets/aistudio/Bamboo_Splits_Product_Showcase_6112ef80.png',
  '/assets/aistudio/Bamboo_split_product_showcase_e09d33a9.webp',
  '/assets/aistudio/bamboo-sticks-main_49720bd6.webp',
  '/assets/aistudio/Natural_bamboo_sticks_packaging_showcase_02f33054.webp',
  '/assets/aistudio/TBStar_Bamboo_Strips_Product_Banner_6aee4f1d.png',
  '/assets/aistudio/Bamboo_sticks_six-bundle_packaging_75ee48d2.webp',
]);

const DEFAULT_IMAGE_BY_TYPE: Record<Exclude<VisualAssetType, 'hero-bamboo'>, string> = {
  'bamboo-split': '/assets/aistudio/Bamboo_Splits_Product_Showcase_6112ef80.png',
  'bamboo-sticks': '/assets/aistudio/bamboo-sticks-main_49720bd6.webp',
  'bamboo-custom': '/assets/aistudio/Bamboo_Splits_Product_Showcase_6112ef80.png',
  'activated-carbon': '',
  'books-printing': '/assets/aistudio/Books_Printing_for_a_Brighter_Future_c52d7121.webp',
  'voucher-printing': '/assets/aistudio/TBStar_Voucher_Book_Printing_1_16533922.png',
  'commercial-printing': '/assets/aistudio/TBStar_Offset_Printing_Services_Banner__2__3434b565.webp',
};

const DEFAULT_ALT_BY_TYPE: Record<Exclude<VisualAssetType, 'hero-bamboo'>, string> = {
  'bamboo-split':
    'TB Star Company Limited Natural Myanmar Bamboo Splits — with nodes (50pcs per bundle) and without nodes (100pcs per bundle)',
  'bamboo-sticks':
    'TB Star Company Limited Natural Myanmar Bamboo Sticks — 1 KG Per Bundle / 30 Bundles Per Bag export packaging',
  'bamboo-custom':
    'TB Star Company Limited Natural Myanmar Bamboo Splits — with nodes (50pcs per bundle) and without nodes (100pcs per bundle)',
  'activated-carbon': '',
  'books-printing':
    'TB Star Company Limited Books Printing — One-stop offset printing for books, educational publications, manuals, and multi-page editions with clean typography and durable binding',
  'voucher-printing':
    'TB Star Company Limited Voucher Books Printing — Commercial voucher books, invoice pads, receipt books, and business forms customized for daily retail and B2B operations',
  'commercial-printing':
    'TB Star Company Limited Other Offset Printing Services — Commercial offset printing for brochures, pamphlets, catalogs, business cards, letterheads, and office forms',
};

/**
 * Low-resolution Base64 SVG placeholders tailored to the color palette
 * of the Bamboo Split & Bamboo Sticks product images and Offset Printing assets.
 */
export const PRODUCT_IMAGE_BASE64_PLACEHOLDERS: Record<string, string> = {
  // Bamboo Split Assets
  '/assets/aistudio/TB_Star_Bamboo_Product_Showcase.png':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRjRGN0YwIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNFOEVFRTIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM5Q0I2NzgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==',
  '/assets/aistudio/Bamboo_Splits_Product_Showcase_6112ef80.png':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRjRGN0YwIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNFOEVFRTIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM5Q0I2NzgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==',
  '/assets/aistudio/Bamboo_split_product_showcase_e09d33a9.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRjRGN0YwIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNFOEVFRTIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM5Q0I2NzgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==',
  '/images/products/bamboo-split-wholesale.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzJBNDQzMiIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjOEI5Rjc2Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRDhDRkI4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/images/products/bamboo-split-featured.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0VBRjNFNiIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjQzdEOEI1Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQjhBQTg2Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/images/products/bamboo-split-texture.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0UyRDhDMiIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjQzhCOUEwIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjN0M5NDY0Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/assets/aistudio/TBStar_Bamboo_Strips_Product_Banner_6aee4f1d.png':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRjRGN0YwIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNFNUVDRUQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNDREUwQkUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==',

  // Bamboo Sticks Assets
  '/assets/aistudio/bamboo-sticks-main_49720bd6.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRjRGN0YwIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNENUUzQzQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM4QTlCNjgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==',
  '/assets/aistudio/Natural_bamboo_sticks_packaging_showcase_02f33054.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRjRGN0YwIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNENUUzQzQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM4QTlCNjgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==',
  '/assets/aistudio/Bamboo_Sticks_Wholesale_Product_Showcase_591af8f9.png':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZGRkZGRiIvPjxzdG9wIG9mZnNldD0iNjAlIiBzdG9wLWNvbG9yPSIjRjRGNkYwIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRTJFOEQwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/assets/aistudio/Bamboo_sticks_six-bundle_packaging_75ee48d2.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZCRkFGNSIvPjxzdG9wIG9mZnNldD0iNjAlIiBzdG9wLWNvbG9yPSIjRjJFRUUyIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjREJDRkJBIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',

  // Ball Pen Stationery Assets
  '/assets/aistudio/Branding_Image_V1_c6c098a8.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRjdGM0U4Ii8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNGMkVDRDAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNFNURGQzMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==',
  '/assets/aistudio/Branding_Image_V2_cc9a2035.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRjdGM0U4Ii8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNGMkVDRDAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNFNURGQzMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==',

  // Offset Printing Promotional Assets
  '/assets/aistudio/Books_Printing_for_a_Brighter_Future_c52d7121.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNSAxMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZGRkZGRiIvPjxzdG9wIG9mZnNldD0iNzUlIiBzdG9wLWNvbG9yPSIjRjRGN0YyIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMTczRDJBIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE1IiBoZWlnaHQ9IjEwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/assets/aistudio/TBStar_Voucher_Book_Printing_1_16533922.png':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNSAxMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZGRkZGRiIvPjxzdG9wIG9mZnNldD0iNzUlIiBzdG9wLWNvbG9yPSIjRjRGN0YyIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMTczRDJBIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE1IiBoZWlnaHQ9IjEwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  '/assets/aistudio/TBStar_Offset_Printing_Services_Banner__2__3434b565.webp':
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNSAxMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZGRkZGRiIvPjxzdG9wIG9mZnNldD0iNzUlIiBzdG9wLWNvbG9yPSIjRjRGN0YyIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMTczRDJBIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE1IiBoZWlnaHQ9IjEwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
};

const DEFAULT_BASE64_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzE3M0QyQSIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjMjQ1QzNBIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjM0E3NTUwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+';

export interface ProductImageSkeletonProps {
  placeholderDataUrl?: string;
  isLoaded: boolean;
}

/**
 * Reusable Skeleton Loader & Low-Resolution Base64 Placeholder overlay
 * that provides a smooth visual transition while product images load.
 */
export const ProductImageSkeleton: React.FC<ProductImageSkeletonProps> = ({
  placeholderDataUrl = DEFAULT_BASE64_PLACEHOLDER,
  isLoaded,
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-10 overflow-hidden pointer-events-none transition-opacity duration-500 ease-out ${
        isLoaded ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Low-resolution Base64 blur-up backdrop */}
      <img
        src={placeholderDataUrl}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover scale-110 blur-md"
      />

      {/* Subtle brand-tinted surface & GPU-accelerated shimmer sweep */}
      <div className="absolute inset-0 bg-[#173D2A]/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-skeleton-shimmer" />
    </div>
  );
};

interface ProgressiveProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  imgClassName?: string;
  preserveNaturalLuminance?: boolean;
  onClick?: () => void;
}

const ProgressiveProductImage: React.FC<ProgressiveProductImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  imgClassName = 'w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]',
  preserveNaturalLuminance = false,
  onClick,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [computedFilter, setComputedFilter] = useState<string>(
    preserveNaturalLuminance
      ? 'none'
      : 'brightness(0.95) contrast(1.04) saturate(0.98)'
  );

  const evaluateProductImageFilter = (imgEl: HTMLImageElement) => {
    if (preserveNaturalLuminance) {
      setComputedFilter('none');
      return;
    }
    try {
      const sampleSize = 12;
      const canvas = document.createElement('canvas');
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(imgEl, 0, 0, sampleSize, sampleSize);
      const { data } = ctx.getImageData(0, 0, sampleSize, sampleSize);
      let totalLum = 0;
      const count = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i] / 255;
        const g = data[i + 1] / 255;
        const b = data[i + 2] / 255;
        totalLum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }

      const avgLum = count > 0 ? totalLum / count : 0.65;
      if (avgLum > 0.68) {
        const brightness = Number(
          Math.max(0.88, 1 - (avgLum - 0.62) * 0.28).toFixed(2)
        );
        const contrast = Number(
          Math.min(1.1, 1 + (1 - brightness) * 0.55).toFixed(2)
        );
        const saturate = Number(
          Math.max(0.93, 1 - (avgLum - 0.65) * 0.16).toFixed(2)
        );
        setComputedFilter(
          `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`
        );
      } else {
        setComputedFilter('brightness(0.96) contrast(1.04) saturate(0.98)');
      }
    } catch {
      setComputedFilter('brightness(0.94) contrast(1.05) saturate(0.97)');
    }
  };

  useEffect(() => {
    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      setIsLoaded(true);
      evaluateProductImageFilter(imgEl);
    } else {
      setIsLoaded(false);
    }
  }, [src, preserveNaturalLuminance]);

  const placeholderDataUrl =
    PRODUCT_IMAGE_BASE64_PLACEHOLDERS[src] || DEFAULT_BASE64_PLACEHOLDER;

  return (
    <>
      <ProductImageSkeleton
        placeholderDataUrl={placeholderDataUrl}
        isLoaded={isLoaded}
      />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        referrerPolicy="no-referrer"
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onClick={onClick}
        onLoad={(e) => {
          setIsLoaded(true);
          evaluateProductImageFilter(e.currentTarget);
        }}
        onError={() => setIsLoaded(true)}
        style={{
          filter:
            isLoaded && computedFilter !== 'none' ? computedFilter : undefined,
          WebkitFilter:
            isLoaded && computedFilter !== 'none' ? computedFilter : undefined,
        }}
        className={`${imgClassName} transition-all duration-500 ease-out ${
          isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xs scale-[1.01]'
        }`}
      />
    </>
  );
};

interface VisualAssetFrameProps {
  type: VisualAssetType;
  imagePath?: string;
  altText?: string;
  label?: string;
  aspectClassName?: string;
  imgClassName?: string;
  objectFit?: 'cover' | 'contain';
  hideOverlayBar?: boolean;
  enableLightbox?: boolean;
  showReplacementNote?: boolean;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export const VisualAssetFrame: React.FC<VisualAssetFrameProps> = ({
  type,
  imagePath,
  altText,
  label,
  aspectClassName = 'aspect-[4/3]',
  imgClassName,
  objectFit,
  hideOverlayBar,
  enableLightbox,
  loading = 'lazy',
  fetchPriority,
}) => {
  const { t } = useLanguage();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Hero Dual-Division 3-Photo Showcase
  if (type === 'hero-bamboo' && !imagePath) {
    return (
      <div
        className={`relative w-full ${aspectClassName} overflow-hidden rounded-lg bg-[#112E1F] border border-white/15 p-2 grid grid-cols-2 grid-rows-2 gap-2 select-none`}
      >
        {/* Top-Left: Bamboo Split */}
        <div className="relative overflow-hidden rounded-md border border-white/15 group bg-white">
          <ProgressiveProductImage
            src="/assets/aistudio/Bamboo_Splits_Product_Showcase_6112ef80.png"
            alt="TB Star Company Limited Natural Myanmar Bamboo Splits — with nodes (50pcs per bundle) and without nodes (100pcs per bundle)"
            width={400}
            height={300}
            loading="eager"
            fetchPriority="high"
            preserveNaturalLuminance={true}
            imgClassName="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 z-20 bg-[#081F14]/90 backdrop-blur-[2px] border-t border-white/15 px-2.5 py-1.5 flex items-center justify-between text-[10px] text-white">
            <span className="font-semibold truncate">
              {t('Bamboo Split (3mm)', 'ဝါးခြမ်းပြား (3mm)')}
            </span>
            <span className="text-[#A8D977] font-mono-tabular shrink-0">20&quot;–48&quot;</span>
          </div>
        </div>

        {/* Top-Right: Bamboo Sticks (1 KG Per Bundle / 30 Bundles Per Bag) */}
        <div className="relative overflow-hidden rounded-md border border-white/15 group bg-white">
          <ProgressiveProductImage
            src="/assets/aistudio/bamboo-sticks-main_49720bd6.webp"
            alt="TB Star Company Limited Natural Myanmar Bamboo Sticks — 1 KG Per Bundle / 30 Bundles Per Bag export packaging"
            width={400}
            height={300}
            loading="eager"
            preserveNaturalLuminance={true}
            imgClassName="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 z-20 bg-[#081F14]/90 backdrop-blur-[2px] border-t border-white/15 px-2.5 py-1.5 flex items-center justify-between text-[10px] text-white">
            <span className="font-semibold truncate">
              {t('Bamboo Sticks', 'ဝါးတံ (Bamboo Sticks)')}
            </span>
            <span className="text-[#A8D977] font-mono-tabular shrink-0">30 Bundles/Bag</span>
          </div>
        </div>

        {/* Bottom Span: One-Stop Offset Printing Services */}
        <div className="col-span-2 relative overflow-hidden rounded-md border border-white/15 group bg-white">
          <ProgressiveProductImage
            src="/assets/aistudio/TBStar_Offset_Printing_Services_Banner__2__3434b565.webp"
            alt="TB Star Company Limited Offset Printing Services — Commercial offset printing for books, voucher books, brochures, pamphlets, catalogs, business cards, letterheads, and office forms"
            width={800}
            height={300}
            preserveNaturalLuminance={true}
            imgClassName="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 z-20 bg-[#081F14]/90 backdrop-blur-[2px] border-t border-white/15 px-3 py-1.5 flex items-center justify-between text-[11px] text-white">
            <span className="font-semibold truncate">
              {t(
                'One-Stop Offset Printing · Books, Vouchers & Commercial Print',
                'တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက် ပုံနှိပ်လုပ်ငန်း'
              )}
            </span>
            <span className="text-[#A8D977] font-mono-tabular shrink-0">
              {t('One-Stop Press', 'အော့ဖ်ဆက် ပုံနှိပ်')}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const resolvedImage =
    imagePath !== undefined
      ? imagePath
      : DEFAULT_IMAGE_BY_TYPE[type as Exclude<VisualAssetType, 'hero-bamboo'>] ?? '';

  // Render an empty placeholder container when image field is intentionally left empty for future product images
  if (!resolvedImage) {
    return (
      <div
        className={`relative w-full ${aspectClassName} overflow-hidden bg-[#F6F8F3] border-b border-[#DDE5D9] select-none`}
        aria-hidden="true"
      />
    );
  }

  const isSvgPlaceholder = resolvedImage.endsWith('.svg');
  const isPromotionalPrintingBanner = PROMOTIONAL_PRINTING_BANNERS.has(resolvedImage);
  const isBrandedBambooShowcase = BRANDED_BAMBOO_SHOWCASE_ASSETS.has(resolvedImage);
  const isWidescreenBambooBanner = WIDESCREEN_BAMBOO_BANNERS.has(resolvedImage);
  const isBrandedVisualAsset = isPromotionalPrintingBanner || isBrandedBambooShowcase;

  const resolvedObjectFit =
    objectFit || (isBrandedVisualAsset ? 'contain' : 'cover');
  const resolvedAspectClass =
    isPromotionalPrintingBanner &&
    (aspectClassName === 'aspect-[4/3]' ||
      aspectClassName === 'aspect-[16/10]' ||
      aspectClassName === 'aspect-[16/9]')
      ? 'aspect-[3/2]'
      : isWidescreenBambooBanner &&
        (aspectClassName === 'aspect-[4/3]' || aspectClassName === 'aspect-[16/10]')
      ? 'aspect-[16/9]'
      : aspectClassName;
  const shouldHideOverlayBar =
    hideOverlayBar !== undefined ? hideOverlayBar : isBrandedVisualAsset;
  const isLightboxEnabled =
    enableLightbox !== undefined ? enableLightbox : isBrandedVisualAsset;

  const defaultAlt =
    DEFAULT_ALT_BY_TYPE[type as Exclude<VisualAssetType, 'hero-bamboo'>] ||
    'Natural Myanmar bamboo splits with nodes';

  const resolvedAlt = altText || defaultAlt;

  const defaultLabel = isSvgPlaceholder
    ? t(
        "Placeholder — To be replaced with TB Star's own photos",
        'TB Star ၏ ကိုယ်ပိုင်ဓာတ်ပုံများဖြင့် အစားထိုးရန် ယာယီပုံစံ (Placeholder)'
      )
    : type === 'bamboo-split'
    ? t(
        'TB Star Company · Bamboo Split (3 mm · 20"–48")',
        'TBStar Company Limited · ဝါးခြမ်းပြား (အထူ 3 mm · ၂၀"–၄၈")'
      )
    : type === 'bamboo-sticks'
    ? t(
        'TB Star Company · Bamboo Sticks (1.2–2.5 mm · 1 KG Per Bundle / 30 Bundles Per Bag)',
        'TBStar Company Limited · ဝါးတံ (1.2–2.5 mm · တစ်စည်းလျှင် ၁ ကီလိုဂရမ် / တစ်အိတ်လျှင် ၃၀ စည်း)'
      )
    : type === 'bamboo-custom'
    ? t(
        'TB Star Company · 100% Natural Myanmar Bamboo Products',
        'TBStar Company Limited · ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များ'
      )
    : type === 'activated-carbon'
    ? t(
        "Placeholder — To be replaced with TB Star's own photos",
        'TB Star ၏ ကိုယ်ပိုင်ဓာတ်ပုံများဖြင့် အစားထိုးရန် ယာယီပုံစံ (Placeholder)'
      )
    : t(
        'TB Star Company · One-Stop Offset Printing Services',
        'TBStar Company Limited · တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက်ပုံနှိပ်လုပ်ငန်း'
      );

  const resolvedLabel = label || defaultLabel;

  const badgeText = isSvgPlaceholder
    ? t('Placeholder', 'ယာယီပုံစံ')
    : type === 'books-printing' ||
      type === 'voucher-printing' ||
      type === 'commercial-printing'
    ? t('One-Stop Press', 'အော့ဖ်ဆက် ပုံနှိပ်')
    : t('Myanmar Origin', 'မြန်မာနိုင်ငံထုတ်');

  const imageFitClass =
    resolvedObjectFit === 'contain'
      ? `w-full ${imgClassName || 'h-full'} object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.015] ${
          isLightboxEnabled ? 'cursor-zoom-in' : ''
        }`
      : `w-full ${imgClassName || 'h-full'} object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02] ${
          isLightboxEnabled ? 'cursor-zoom-in' : ''
        }`;

  return (
    <div
      className={`relative w-full ${resolvedAspectClass} overflow-hidden ${
        isBrandedVisualAsset || resolvedObjectFit === 'contain'
          ? 'bg-white'
          : 'bg-[#173D2A]'
      } text-white select-none`}
    >
      <ProgressiveProductImage
        src={resolvedImage}
        alt={resolvedAlt}
        width={1536}
        height={1024}
        loading={loading}
        fetchPriority={fetchPriority}
        preserveNaturalLuminance={isBrandedVisualAsset}
        imgClassName={imageFitClass}
        onClick={isLightboxEnabled ? () => setIsLightboxOpen(true) : undefined}
      />

      {isLightboxEnabled && (
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          aria-label={t(`Enlarge preview: ${resolvedLabel}`, `ပုံကြီးချဲ့ကြည့်ရန် - ${resolvedLabel}`)}
          title={t('Click to enlarge preview', 'ပုံကြီးချဲ့ကြည့်ရန် နှိပ်ပါ')}
          className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1.5 rounded-md bg-[#173D2A]/85 hover:bg-[#173D2A] text-white text-[11px] font-semibold inline-flex items-center gap-1.5 border border-[#F4B940]/60 shadow-sm opacity-90 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5 text-[#F4B940]" />
          <span className="hidden sm:inline">{t('Enlarge', 'ချဲ့ကြည့်ရန်')}</span>
        </button>
      )}

      {!shouldHideOverlayBar && (
        <div className="absolute inset-x-0 bottom-0 z-20 bg-[#081F14]/90 backdrop-blur-[2px] border-t border-white/15 px-4 py-2.5 flex items-center justify-between gap-2 text-[11px] text-white">
          <span className="truncate font-semibold">{resolvedLabel}</span>
          <span className="shrink-0 font-mono-tabular text-[#A8D977] font-semibold">
            {badgeText}
          </span>
        </div>
      )}

      {isLightboxEnabled && isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#071A10]/85 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={resolvedLabel}
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="bg-white border border-[#DDE5D9] rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 bg-[#173D2A] text-white border-b-2 border-[#F4B940] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-mono-tabular text-[#F4B940] font-semibold truncate">
                  {type === 'bamboo-split' ||
                  type === 'bamboo-sticks' ||
                  type === 'bamboo-custom'
                    ? t(
                        `${COMPANY_INFO.name} · 100% Natural Myanmar Bamboo Products`,
                        'TBStar Company Limited · ၁၀၀% သဘာဝ မြန်မာ့ဝါးထုတ်ကုန်များ'
                      )
                    : t(
                        `${COMPANY_INFO.name} · One-Stop Offset Printing Services`,
                        'TBStar Company Limited · တစ်နေရာတည်း အပြီးအစီး အော့ဖ်ဆက် ပုံနှိပ်လုပ်ငန်း'
                      )}
                </p>
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {resolvedLabel}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer shrink-0"
                aria-label={t('Close enlarged image preview', 'ပုံကြီးချဲ့ကြည့်ရှုမှုကို ပိတ်ရန်')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#F6F8F3] p-2 sm:p-4 flex items-center justify-center max-h-[78vh] overflow-auto">
              <img
                src={resolvedImage}
                alt={resolvedAlt}
                width={1536}
                height={1024}
                decoding="async"
                className="w-full h-auto max-h-[72vh] object-contain rounded-lg shadow-sm bg-white"
              />
            </div>

            <div className="px-5 py-3.5 bg-white border-t border-[#DDE5D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-[#26332B]/85 leading-relaxed">
                {resolvedAlt}
              </p>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#173D2A] hover:bg-[#245C3A] text-white transition-colors cursor-pointer self-end sm:self-auto shrink-0"
              >
                {t('Close Preview', 'ပိတ်ရန်')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

