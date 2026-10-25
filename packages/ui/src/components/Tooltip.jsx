/** CSS-only tooltip above its child; shows on hover and keyboard focus. */
export function Tooltip({ text, children }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-7 w-max max-w-[190px] -translate-x-1/2 translate-y-1 rounded-[5px] bg-[#252a32] px-2 py-[6px] text-[10px] leading-[1.3] text-white opacity-0 transition duration-150 after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#252a32] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}
