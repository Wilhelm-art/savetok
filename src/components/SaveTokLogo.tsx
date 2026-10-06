interface SaveTokLogoProps {
  className?: string;
  size?: number;
}

export default function SaveTokLogo({ className = "", size = 36 }: SaveTokLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="SaveTok Logo"
    >
      <defs>
        {/* Outer squircle gradient */}
        <linearGradient id="st-badge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0F172A" />
          <stop offset="100%" stop-color="#1E1B4B" />
        </linearGradient>

        {/* Primary kinetic crimson gradient */}
        <linearGradient id="st-crimson-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF2D55" />
          <stop offset="100%" stop-color="#FF5252" />
        </linearGradient>

        {/* Secondary electric cyan/blue gradient */}
        <linearGradient id="st-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00F2FE" />
          <stop offset="100%" stop-color="#4FACFE" />
        </linearGradient>

        {/* Subtle inner shadow / glow filter */}
        <filter id="st-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#FF2D55" flood-opacity="0.35" />
        </filter>
      </defs>

      {/* Modern Squircle Badge Base */}
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="16"
        fill="url(#st-badge-grad)"
        stroke="#334155"
        stroke-width="1.5"
      />

      {/* TikTok-inspired cyan back-glitch ribbon */}
      <path
        d="M23 18C18.5 18 16 21.5 16 26C16 32 23 33 27 35C30.5 36.8 33 38.5 33 42C33 45.5 30 47 26 47C22 47 18.5 44.5 17 42"
        stroke="url(#st-cyan-grad)"
        stroke-width="4.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.85"
      />

      {/* Main Kinetic "S" Ribbon terminating in downward Arrow */}
      <g filter="url(#st-glow)">
        {/* Upper S-curve */}
        <path
          d="M26 17C35 17 41 20 41 25.5C41 31 34 32.5 28 34.5C23.5 36 21 38 21 42C21 45 23.5 47 28 47"
          stroke="url(#st-crimson-grad)"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        {/* Dynamic Downward Arrow Fast-Download Vector */}
        <path
          d="M42 27V45M42 45L36 39M42 45L48 39"
          stroke="url(#st-crimson-grad)"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      {/* Optical Speed Dash in center */}
      <circle cx="32" cy="25" r="2.5" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}
