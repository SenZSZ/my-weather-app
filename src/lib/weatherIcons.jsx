// Minimal single-stroke icon set — no emoji, no filled illustration.
// Deliberately monochrome so each icon reads as a station glyph, not decor.
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconSun({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  );
}

export function IconMoon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z" />
    </svg>
  );
}

export function IconCloud({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M7 18.5a4.2 4.2 0 0 1-.6-8.36 5.2 5.2 0 0 1 10.02-1.9A4.3 4.3 0 0 1 17.2 18.5H7Z" />
    </svg>
  );
}

export function IconCloudSun({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M9 4.6v2M4.6 9H6.6M12.8 6.2l-1.3 1.3M4.9 12.9l1.4-1.4" />
      <circle cx="9" cy="10" r="3" />
      <path d="M9.6 18.5h6.9a4 4 0 0 0 .6-7.95 4.9 4.9 0 0 0-2.86-3.03" />
    </svg>
  );
}

export function IconCloudMoon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M14.8 5.3a4.6 4.6 0 1 0 3.9 6.4" />
      <path d="M9.4 18.5h7.2a4 4 0 0 0 .5-7.97 5.2 5.2 0 0 0-9.68 1.62 4.2 4.2 0 0 0 1.98 6.35Z" />
    </svg>
  );
}

export function IconCloudRain({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M6.6 15.5a4.2 4.2 0 0 1-.6-8.36 5.2 5.2 0 0 1 10.02-1.9A4.3 4.3 0 0 1 16.8 15.5H6.6Z" />
      <path d="M8 18.2 7 20.5M12 18.2l-1 2.3M16 18.2l-1 2.3" />
    </svg>
  );
}

export function IconStorm({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M6.6 13.5a4.2 4.2 0 0 1-.6-8.36 5.2 5.2 0 0 1 10.02-1.9A4.3 4.3 0 0 1 16.8 13.5H6.6Z" />
      <path d="M13 13.5 10.4 18h2.7l-1.6 4.5 5.3-6.7h-3l1.7-2.3Z" />
    </svg>
  );
}

export function IconHaze({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 8h9M3.5 12h17M3.5 16h13M18.5 8h2M18 16h3.5" />
    </svg>
  );
}

export function IconWind({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M3 8h11a2.5 2.5 0 1 0-2.4-3.2M3 12h15a2.5 2.5 0 1 1-2.4 3.2M3 16h9a2.2 2.2 0 1 1-2.1 2.9" />
    </svg>
  );
}

const RAIN = /rain|shower|drizzle|hujan/i;
const STORM = /thunder|storm|ribut|petir/i;
const HAZE = /haz|mist|fog|smoke|jerebu/i;
const CLEAR = /fine|clear|sunny|cerah|hot|panas/i;
const WINDY = /wind|angin|breez/i;

/**
 * Picks an icon component for a forecast phrase + time-of-day period.
 * period: "morning" | "afternoon" | "night"
 */
export function conditionIcon(text = "", period = "afternoon") {
  const isNight = period === "night";

  if (STORM.test(text)) return IconStorm;
  if (RAIN.test(text)) return IconCloudRain;
  if (HAZE.test(text)) return IconHaze;
  if (WINDY.test(text)) return IconWind;
  if (CLEAR.test(text)) return isNight ? IconMoon : IconSun;
  if (isNight) return IconCloudMoon;
  return IconCloudSun;
}
