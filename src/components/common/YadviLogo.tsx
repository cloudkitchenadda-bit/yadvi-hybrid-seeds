import React from 'react';

interface YadviLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'dark' | 'light' | 'white';
}

export const YadviLogo: React.FC<YadviLogoProps> = ({
  size = 'md',
  showTagline = true,
  variant = 'dark',
}) => {
  const isLight = variant === 'light' || variant === 'white';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-base font-bold tracking-tight',
    md: 'text-xl font-black tracking-tight',
    lg: 'text-2xl font-black tracking-normal',
    xl: 'text-3xl font-black tracking-wide',
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-widest font-semibold',
    md: 'text-[11px] tracking-widest font-semibold',
    lg: 'text-[13px] tracking-widest font-semibold',
    xl: 'text-[15px] tracking-widest font-semibold',
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Emblem */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer circle accent */}
          <circle cx="50" cy="50" r="46" stroke={isLight ? '#34d399' : '#16a34a'} strokeWidth="4" strokeDasharray="6 4" opacity="0.4" />
          {/* Seed Base */}
          <path
            d="M50 78C38 78 28 68 28 54C28 42 38 34 50 34C62 34 72 42 72 54C72 68 62 78 50 78Z"
            fill={isLight ? '#22c55e' : '#0b3b2c'}
            opacity="0.15"
          />
          {/* Golden Seed Germination */}
          <path
            d="M48 68C42 66 38 60 40 52C42 44 49 40 54 44C59 48 57 60 51 67C50.2 67.8 49.1 68.2 48 68Z"
            fill="#ea580c"
          />
          {/* Left Sprout Leaf (Forest Green) */}
          <path
            d="M50 48C42 42 30 40 24 48C20 54 24 64 34 62C42 60 48 54 50 48Z"
            fill="#15803d"
          />
          {/* Right Sprout Leaf (Fresh Lime Green) */}
          <path
            d="M48 48C54 38 66 32 74 38C80 44 76 56 66 58C58 60 50 54 48 48Z"
            fill="#22c55e"
          />
          {/* Central Vitality Sprout */}
          <path
            d="M49 38C48 26 53 18 56 16C57 24 54 32 51 38H49Z"
            fill="#f59e0b"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`${titleSizes[size]} ${isLight ? 'text-white' : 'text-slate-900'} font-black`}>
            YADVI
          </span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
            isLight ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-emerald-100 text-emerald-800'
          }`}>
            Seeds
          </span>
        </div>
        <span className={`${subtitleSizes[size]} ${isLight ? 'text-emerald-300' : 'text-yadvi-primary'} font-bold mt-0.5 uppercase`}>
          HYBRID SEEDS
        </span>
        {showTagline && size !== 'sm' && (
          <span className={`text-[10px] font-medium tracking-tight mt-1 ${isLight ? 'text-emerald-100/70' : 'text-slate-500'}`}>
            Growing Together, Harvesting the Future
          </span>
        )}
      </div>
    </div>
  );
};
