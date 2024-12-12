import React from "react";

const NoDataFound = () => {
  return (
    <div className="w-full flex justify-center items-center flex-wrap   gap-10">
      {/* First Placeholder */}
      <div className="grid gap-4 w-60">
        <svg
          className="mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="124"
          viewBox="0 0 128 124"
          fill="none"
        >
          <g filter="url(#filter0_d_14133_718)">
            <path
              d="M4 61.0062C4 27.7823 30.9309 1 64.0062 1C97.0319 1 124 27.7699 124 61.0062C124 75.1034 119.144 88.0734 110.993 98.3057C99.7572 112.49 82.5878 121 64.0062 121C45.3007 121 28.2304 112.428 17.0071 98.3057C8.85599 88.0734 4 75.1034 4 61.0062Z"
              fill="#F9FAFB"
            />
          </g>
          <path
            d="M110.158 58.4715H110.658V57.9715V36.9888C110.658 32.749 107.226 29.317 102.986 29.317H51.9419C49.6719 29.317 47.5643 28.165 46.3435 26.2531L46.342 26.2509L43.7409 22.2253L43.7404 22.2246C42.3233 20.0394 39.8991 18.7142 37.2887 18.7142H20.8147C16.5749 18.7142 13.1429 22.1462 13.1429 26.386V57.9715V58.4715H13.6429H110.158Z"
            fill="#EEF2FF"
            stroke="#A67C52"
          />
          <path
            d="M49 20.2142C49 19.6619 49.4477 19.2142 50 19.2142H106.071C108.281 19.2142 110.071 21.0051 110.071 23.2142V25.6428H53C50.7909 25.6428 49 23.8519 49 21.6428V20.2142Z"
            fill="#A67C52"
          />
          <circle
            cx="1.07143"
            cy="1.07143"
            r="1.07143"
            transform="matrix(-1 0 0 1 36.1429 23.5)"
            fill="#A67C52"
          />
          <circle
            cx="1.07143"
            cy="1.07143"
            r="1.07143"
            transform="matrix(-1 0 0 1 29.7144 23.5)"
            fill="#A67C52"
          />
          <circle
            cx="1.07143"
            cy="1.07143"
            r="1.07143"
            transform="matrix(-1 0 0 1 23.2858 23.5)"
            fill="#A67C52"
          />
        </svg>
        <div>
          <h2 className="text-center text-charcoal text-base font-semibold pb-1">
            There’s no product here
          </h2>
          <p className="text-center text-charcoal/80 text-sm pb-4">
            Try changing your filters to <br />
            see results
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
