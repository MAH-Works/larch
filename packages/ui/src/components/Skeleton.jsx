/** Shimmering placeholder bar. `width` is a Tailwind width class. */
export function Skeleton({ width = 'w-full', className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`h-[10px] rounded-full bg-[length:200%_100%] animate-shimmer [background-image:linear-gradient(90deg,#eef0f3_25%,#f8f9fa_50%,#eef0f3_75%)] dark:[background-image:linear-gradient(90deg,#20262e_25%,#2b323c_50%,#20262e_75%)] ${width} ${className}`}
    />
  );
}
