import React from 'react';

export type PrintingIconType =
  | 'books-printing'
  | 'voucher-printing'
  | 'commercial-printing'
  | 'business-cards'
  | 'brochures-pamphlets'
  | 'prepress-finishing';

interface PrintingServiceIconProps {
  type: PrintingIconType;
  className?: string;
}

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
