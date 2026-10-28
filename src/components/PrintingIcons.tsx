import React from 'react';

export type PrintingIconType =
  | 'books-printing'
  | 'voucher-printing'
  | 'commercial-printing'
  | 'business-cards'
  | 'brochures-pamphlets'
  | 'prepress-finishing';

export type BambooIconType =
  | 'bamboo-split'
  | 'bamboo-sticks'
  | 'bamboo-custom'
  | 'charcoal';

export type EcoAdvantageType =
  | 'rapid-regeneration'
  | 'zero-chemical'
  | 'biodegradable'
  | 'tensile-durability'
  | 'low-waste'
  | 'sustainable-packaging';

interface PrintingServiceIconProps {
  type: PrintingIconType;
  className?: string;
}

interface BambooProductIconProps {
  type: BambooIconType;
  className?: string;
}

interface EcoAdvantageIconProps {
  type: EcoAdvantageType;
  className?: string;
}

/**
 * Custom, domain-crafted SVG icons highlighting the Eco-Advantages &
 * Sustainability of TB Star Company Limited's 100% Natural Myanmar Bamboo.
 */
export const EcoAdvantageIcon: React.FC<EcoAdvantageIconProps> = ({
  type,
  className = 'w-7 h-7',
}) => {
  switch (type) {
    case 'rapid-regeneration':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Soft Renewal Halo */}
          <circle
            cx="20"
            cy="20"
            r="14"
            fill="#A8D977"
            fillOpacity="0.22"
            stroke="#245C3A"
            strokeWidth="1.4"
            strokeDasharray="3 2.5"
          />
          {/* Left & Center Bamboo Culm Stems */}
          <path
            d="M15 31V13M22 31V9"
            stroke="#173D2A"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Culm Node Rings */}
          <path
            d="M13 19H17M13 25H17M20 15H24M20 22H24"
            stroke="#245C3A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Fresh Bamboo Leaves */}
          <path
            d="M22 12C25.5 9.5 29.5 9.5 31.5 11.5C29.5 14 25.5 14.5 22 12Z"
            fill="#A8D977"
            stroke="#173D2A"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M15 16C11.5 13.5 8 14 6.5 16C8.5 18 12 18.5 15 16Z"
            fill="#245C3A"
          />
          {/* Ground Root Line */}
          <path
            d="M10 31.5H30"
            stroke="#173D2A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'zero-chemical':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Botanical Shield Outline */}
          <path
            d="M20 6L31 10.5V19.5C31 26.8 26.2 32.2 20 34.5C13.8 32.2 9 26.8 9 19.5V10.5L20 6Z"
            fill="#F6F8F3"
            stroke="#173D2A"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Inner Natural Leaf Accent */}
          <path
            d="M20 9.5L28 12.8V19.2C28 24.6 24.5 28.8 20 30.8V9.5Z"
            fill="#A8D977"
            fillOpacity="0.35"
          />
          {/* Verification Checkmark */}
          <path
            d="M15.5 20.2L18.6 23.3L25 16.5"
            stroke="#173D2A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'biodegradable':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Circular Eco Cycle Arrows */}
          <path
            d="M20 7C27.1797 7 33 12.8203 33 20C33 24.8 30.4 29 26.5 31.2"
            stroke="#173D2A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 33C12.8203 33 7 27.1797 7 20C7 15.2 9.6 11 13.5 8.8"
            stroke="#245C3A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Arrowheads */}
          <path
            d="M26 28V31.5H29.5"
            stroke="#173D2A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 12V8.5H10.5"
            stroke="#245C3A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Center Organic Leaf */}
          <path
            d="M15 24.5C15 18.5 19.5 14 25.5 14C25.5 20 21 24.5 15 24.5Z"
            fill="#A8D977"
            stroke="#173D2A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M15 24.5L21.5 18"
            stroke="#173D2A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'tensile-durability':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Flexed Resilient Bamboo Strip */}
          <path
            d="M8 26C14 14 26 14 32 26"
            stroke="#173D2A"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M8 30C14 18 26 18 32 30"
            stroke="#245C3A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Node & Strength Diamond */}
          <rect
            x="20"
            y="8"
            width="7"
            height="7"
            rx="1.2"
            transform="rotate(45 20 8)"
            fill="#A8D977"
            stroke="#173D2A"
            strokeWidth="1.8"
          />
          {/* Support Base Indicators */}
          <circle cx="8" cy="28" r="2" fill="#173D2A" />
          <circle cx="32" cy="28" r="2" fill="#173D2A" />
        </svg>
      );

    case 'low-waste':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Outer Bamboo Culm Cross-Section Ring */}
          <circle
            cx="20"
            cy="20"
            r="13"
            fill="#A8D977"
            fillOpacity="0.38"
            stroke="#173D2A"
            strokeWidth="2"
          />
          {/* Inner Hollow Culm Core */}
          <circle
            cx="20"
            cy="20"
            r="6.5"
            fill="#F6F8F3"
            stroke="#173D2A"
            strokeWidth="1.8"
          />
          {/* Radial Precision Splitting Lines */}
          <path
            d="M20 7V13.5M20 26.5V33M7 20H13.5M26.5 20H33M10.8 10.8L15.4 15.4M24.6 24.6L29.2 29.2M29.2 10.8L24.6 15.4M15.4 24.6L10.8 29.2"
            stroke="#245C3A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'sustainable-packaging':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* 30KG Export Sack Body */}
          <path
            d="M11 14C11 12.3431 12.3431 11 14 11H26C27.6569 11 29 12.3431 29 14L31 30C31 31.6569 29.6569 33 28 33H12C10.3431 33 9 31.6569 9 30L11 14Z"
            fill="#F6F8F3"
            stroke="#173D2A"
            strokeWidth="2"
          />
          {/* Tied Sack Top Crest */}
          <path
            d="M15 11L13.5 7H26.5L25 11"
            fill="#A8D977"
            fillOpacity="0.5"
            stroke="#173D2A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Eco Leaf Emblem on Bag */}
          <path
            d="M16.5 24.5C16.5 20 19.8 17 23.5 17C23.5 21.5 20.2 24.5 16.5 24.5Z"
            fill="#A8D977"
            stroke="#245C3A"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M15 28.5H25"
            stroke="#173D2A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

/**
 * Custom, domain-crafted SVG icons for TB Star Company Limited's
 * Bamboo Production & Export division.
 */
export const BambooProductIcon: React.FC<BambooProductIconProps> = ({
  type,
  className = 'w-7 h-7',
}) => {
  switch (type) {
    case 'bamboo-split':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Three Parallel Split Bamboo Strips (3mm uniform profile) */}
          <rect
            x="7"
            y="6"
            width="6.5"
            height="28"
            rx="1.8"
            fill="#A8D977"
            fillOpacity="0.4"
            stroke="#173D2A"
            strokeWidth="1.9"
          />
          <rect
            x="16.75"
            y="6"
            width="6.5"
            height="28"
            rx="1.8"
            fill="#F6F8F3"
            stroke="#173D2A"
            strokeWidth="1.9"
          />
          <rect
            x="26.5"
            y="6"
            width="6.5"
            height="28"
            rx="1.8"
            fill="#A8D977"
            fillOpacity="0.65"
            stroke="#173D2A"
            strokeWidth="1.9"
          />
          {/* Bamboo Node Rings */}
          <path
            d="M7 14.5H13.5M7 25.5H13.5M16.75 18.5H23.25M26.5 13H33M26.5 24H33"
            stroke="#245C3A"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'bamboo-sticks':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Precision Bamboo Sticks Bundle */}
          <path
            d="M11 7V33M15.5 6V34M20 6V34M24.5 6V34M29 7V33"
            stroke="#173D2A"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Binding Band (30KG Export Bundle) */}
          <rect
            x="8"
            y="16.5"
            width="24"
            height="7"
            rx="2"
            fill="#A8D977"
            stroke="#173D2A"
            strokeWidth="1.9"
          />
          <path
            d="M13 20H27"
            stroke="#173D2A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'bamboo-custom':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Export Package / Natural Bamboo Supply */}
          <rect
            x="7"
            y="11"
            width="26"
            height="21"
            rx="2.5"
            fill="#F6F8F3"
            stroke="#173D2A"
            strokeWidth="2"
          />
          <path
            d="M7 17.5H33"
            stroke="#245C3A"
            strokeWidth="1.8"
          />
          <rect
            x="16"
            y="14"
            width="8"
            height="7"
            rx="1.2"
            fill="#A8D977"
            stroke="#173D2A"
            strokeWidth="1.6"
          />
          {/* Natural Bamboo Leaf Accent */}
          <path
            d="M20 6C23.5 6 26.5 8 27.5 11H12.5C13.5 8 16.5 6 20 6Z"
            fill="#245C3A"
          />
          <path
            d="M13 25.5H27"
            stroke="#173D2A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'charcoal':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Carbonized Charcoal Logs Stack */}
          <rect
            x="9"
            y="22"
            width="22"
            height="8"
            rx="3.5"
            fill="#173D2A"
            stroke="#173D2A"
            strokeWidth="1.8"
          />
          <rect
            x="11"
            y="14"
            width="18"
            height="7.5"
            rx="3.2"
            fill="#245C3A"
            stroke="#173D2A"
            strokeWidth="1.8"
          />
          {/* Cross-Section Rings */}
          <circle cx="13" cy="26" r="2" fill="#A8D977" />
          <circle cx="15" cy="17.8" r="1.8" fill="#A8D977" />
          {/* Warm Energy / Clean Flame Crest */}
          <path
            d="M20 6C22.2 8.5 23 10.5 21.5 12.2C20.2 13.5 18.2 12.8 18.2 10.8C18.2 9.2 19.2 7.5 20 6Z"
            fill="#A8D977"
            stroke="#173D2A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

/**
 * Custom, domain-crafted SVG icons for TB Star Company Limited's
 * One-Stop Offset Printing Services division.
 */
export const PrintingServiceIcon: React.FC<PrintingServiceIconProps> = ({
  type,
  className = 'w-7 h-7',
}) => {
  switch (type) {
    case 'books-printing':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Crop / Registration Marks */}
          <path
            d="M5 9V6H8M35 9V6H32M5 31V34H8M35 31V34H32"
            stroke="#245C3A"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
          {/* Left & Right Open Book Pages */}
          <path
            d="M20 11C16.5 9.2 11.5 9 7.5 10.2V28.8C11.5 27.6 16.5 27.8 20 29.6C23.5 27.8 28.5 27.6 32.5 28.8V10.2C28.5 9 23.5 9.2 20 11Z"
            fill="#F6F8F3"
            stroke="#173D2A"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Highlighted Page Layer */}
          <path
            d="M20 11C23.5 9.2 28.5 9 32.5 10.2V26.2C28.5 25 23.5 25.2 20 27V11Z"
            fill="#A8D977"
            fillOpacity="0.32"
          />
          {/* Center Spine */}
          <path
            d="M20 11V29.6"
            stroke="#173D2A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Left Page Typography Lines */}
          <path
            d="M10.5 15H16.5M10.5 18.5H16.5M10.5 22H14.5"
            stroke="#173D2A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Right Page Layout Block & Lines */}
          <rect
            x="23.5"
            y="14"
            width="6"
            height="4.5"
            rx="1"
            fill="#245C3A"
          />
          <path
            d="M23.5 21.5H29.5M23.5 24.2H27.5"
            stroke="#173D2A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Bottom Book Cover Edge */}
          <path
            d="M6.5 31.2C11.2 30 16.2 30.2 20 32C23.8 30.2 28.8 30 33.5 31.2"
            stroke="#245C3A"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'voucher-printing':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Duplicate Carbon Copy Sheet Behind */}
          <rect
            x="11"
            y="6"
            width="21"
            height="26"
            rx="2.5"
            fill="#A8D977"
            fillOpacity="0.45"
            stroke="#245C3A"
            strokeWidth="1.6"
          />
          {/* Primary Voucher Pad Sheet */}
          <rect
            x="7"
            y="9"
            width="21"
            height="26"
            rx="2.5"
            fill="#F6F8F3"
            stroke="#173D2A"
            strokeWidth="2"
          />
          {/* Top Bound Spine Header Bar */}
          <path
            d="M7 11.5C7 10.1193 8.11929 9 9.5 9H25.5C26.8807 9 28 10.1193 28 11.5V14.5H7V11.5Z"
            fill="#173D2A"
          />
          {/* Perforation Dotted Line */}
          <path
            d="M9.5 17.5H25.5"
            stroke="#245C3A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="2 2.5"
          />
          {/* Voucher Table Rows */}
          <path
            d="M10.5 21.5H20.5M10.5 25H18.5M10.5 28.5H16.5"
            stroke="#173D2A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Amount Column Pill / Stamp */}
          <rect
            x="20"
            y="27"
            width="5"
            height="4"
            rx="1"
            fill="#A8D977"
            stroke="#173D2A"
            strokeWidth="1.4"
          />
          {/* Serial Number Dots in Header */}
          <circle cx="11" cy="11.8" r="1" fill="#A8D977" />
          <circle cx="14" cy="11.8" r="1" fill="#A8D977" />
        </svg>
      );

    case 'commercial-printing':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Back Print Sheet / Brochure */}
          <rect
            x="7"
            y="7"
            width="19"
            height="23"
            rx="2"
            fill="#F6F8F3"
            stroke="#173D2A"
            strokeWidth="1.8"
          />
          <path
            d="M11 12H22M11 15.5H19M11 19H16"
            stroke="#245C3A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Overlapping Business Card / Commercial Deliverable */}
          <rect
            x="14"
            y="20"
            width="20"
            height="13"
            rx="2"
            fill="#173D2A"
            stroke="#173D2A"
            strokeWidth="1.8"
          />
          {/* Emblem & Lines on Business Card */}
          <rect
            x="17.5"
            y="23.5"
            width="4.5"
            height="4.5"
            rx="1"
            fill="#A8D977"
          />
          <path
            d="M24.5 24.5H30.5M24.5 27.5H28.5"
            stroke="#F6F8F3"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Offset Registration Target Mark (Top Right) */}
          <circle
            cx="31.5"
            cy="11.5"
            r="3.2"
            fill="#A8D977"
            fillOpacity="0.35"
            stroke="#245C3A"
            strokeWidth="1.5"
          />
          <path
            d="M31.5 7V16M27 11.5H36"
            stroke="#173D2A"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'business-cards':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Back Card */}
          <rect
            x="9"
            y="9"
            width="24"
            height="15"
            rx="2.5"
            fill="#A8D977"
            fillOpacity="0.4"
            stroke="#245C3A"
            strokeWidth="1.6"
          />
          {/* Front Card */}
          <rect
            x="6"
            y="15"
            width="25"
            height="16"
            rx="2.5"
            fill="#F6F8F3"
            stroke="#173D2A"
            strokeWidth="2"
          />
          {/* Brand Badge */}
          <rect
            x="10"
            y="19"
            width="5.5"
            height="5.5"
            rx="1.2"
            fill="#173D2A"
          />
          <circle cx="12.75" cy="21.75" r="1.2" fill="#A8D977" />
          {/* Card Text Lines */}
          <path
            d="M18.5 20.5H27M18.5 23.5H24.5M10 27.5H27"
            stroke="#173D2A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'brochures-pamphlets':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Left Panel */}
          <path
            d="M6 10.5L15 8V29.5L6 32V10.5Z"
            fill="#F6F8F3"
            stroke="#173D2A"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
          {/* Center Panel */}
          <path
            d="M15 8L25 10.5V32L15 29.5V8Z"
            fill="#A8D977"
            fillOpacity="0.35"
            stroke="#173D2A"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
          {/* Right Panel */}
          <path
            d="M25 10.5L34 8V29.5L25 32V10.5Z"
            fill="#F6F8F3"
            stroke="#173D2A"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />
          {/* Detail Lines */}
          <path
            d="M9 15H12.5M9 18.5H12.5M18 14.5H22M18 18H22M28 15H31.5M28 18.5H31.5"
            stroke="#245C3A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'prepress-finishing':
      return (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Offset Press Roller Cylinder */}
          <rect
            x="7"
            y="8"
            width="26"
            height="9"
            rx="4.5"
            fill="#173D2A"
            stroke="#173D2A"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="12.5" r="1.6" fill="#A8D977" />
          <path
            d="M16.5 12.5H29"
            stroke="#A8D977"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Printed Sheet Emerging */}
          <path
            d="M10 17H30L32 32H8L10 17Z"
            fill="#F6F8F3"
            stroke="#173D2A"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* CMYK / Color Bars on Sheet */}
          <rect x="13" y="21" width="3.5" height="3.5" rx="0.6" fill="#173D2A" />
          <rect x="18.25" y="21" width="3.5" height="3.5" rx="0.6" fill="#245C3A" />
          <rect x="23.5" y="21" width="3.5" height="3.5" rx="0.6" fill="#A8D977" />
          <path
            d="M13 27.5H27"
            stroke="#173D2A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};
