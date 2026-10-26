/** Shimmering placeholder bar. `width` is a Tailwind width class. */
export function Skeleton({ width = 'w-full', className = '' }: { width?: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-[10px] rounded-full animate-shimmer bg-size-[200%_100%] bg-linear-90/srgb from-[#eef0f3] from-25% via-[#f8f9fa] via-50% to-[#eef0f3] to-75% dark:from-[#20262e] dark:via-[#2b323c] dark:to-[#20262e] ${width} ${className}`}
    />
  );
}
