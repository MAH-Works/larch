const green = 'bg-[#e5f7ed] text-[#14764f] dark:bg-[#173c2e] dark:text-[#69d3a4]';
const blue = 'bg-[#e8f0ff] text-[#2d63cc] dark:bg-[#1b2c56] dark:text-[#8eafff]';
const red = 'bg-[#ffeaec] text-[#b64150] dark:bg-[#432129] dark:text-[#ff8e9a]';

/** Pill variants — hue communicates state (status) or tag. */
export const BADGE_VARIANTS = {
  active: green,
  green,
  low: green,
  trial: blue,
  blue,
  vip: 'bg-[#e8f0ff] text-[#3462b7] dark:bg-[#1b2c56] dark:text-[#8eafff]',
  onboarding: 'bg-[#e6f5fa] text-[#397b9f] dark:bg-[#173746] dark:text-[#78c4de]',
  inactive: 'bg-[#eef0f2] text-[#71767f] dark:bg-[#282e36] dark:text-[#a0a8b3]',
  archived: red,
  red,
  priority: red,
  longterm: 'bg-[#f0eaff] text-[#6d4ca9] dark:bg-[#302652] dark:text-[#c0a6ff]',
};

export default function Badge({ variant = 'inactive', count = false, className = '', children }) {
  const size = count ? 'min-h-[17px] px-[5px] text-[9px]' : 'min-h-[23px] px-2 text-[11px]';
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full font-medium leading-none ${size} ${BADGE_VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
