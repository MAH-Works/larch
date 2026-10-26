// Shared Larch looks for Base UI parts. Every value here comes from the original Larch components, so
// Base UI–backed parts and the remaining Larch components render identically side by side.

/** Keyboard focus ring used by every interactive part. */
export const FOCUS_RING =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue';

/** Base UI sets data-disabled (and the native attribute where one exists). */
export const DISABLED = 'data-disabled:pointer-events-none data-disabled:opacity-50';

const BUTTON_BASE = `inline-flex items-center whitespace-nowrap no-underline transition-colors ${DISABLED} ${FOCUS_RING}`;

/** Visual-only button variants (Button, and every trigger / close part that renders a button). */
export const BUTTON_VARIANTS = {
  ghost: 'h-8 gap-[7px] rounded-md px-[9px] text-xs font-medium text-soft hover:bg-hover hover:text-ink data-popup-open:bg-hover data-popup-open:text-ink',
  ghostDanger: 'h-8 gap-[7px] rounded-md px-[9px] text-xs font-medium text-red hover:bg-red-soft',
  outline:
    'h-8 gap-[7px] rounded-md border border-line-strong bg-surface px-[11px] text-xs text-soft hover:bg-hover hover:text-ink data-popup-open:bg-hover data-popup-open:text-ink',
  primary:
    'h-8 gap-[7px] rounded-md border border-blue-border bg-blue px-3 text-xs font-semibold text-white hover:bg-blue-hover',
  danger:
    'h-8 gap-[7px] rounded-md border border-[#ffd9dc] bg-[#fff8f8] px-[11px] text-xs text-red dark:border-[#51272d] dark:bg-[#26171a]',
  // Taller primary used for the topbar "create" action.
  create:
    'h-9 gap-[7px] rounded-[7px] border border-blue-border bg-blue px-3 text-xs font-semibold text-white shadow-[0_1px_1px_rgba(24,73,201,.14)] hover:bg-blue-hover mobile:px-[10px]',
  // Square 36px icon button (topbar, toolbars). Always pass `aria-label`.
  icon: 'size-9 justify-center rounded-[7px] border border-line-strong bg-surface text-soft hover:bg-hover hover:text-ink data-popup-open:bg-hover data-popup-open:text-ink',
  // Square 25px quiet icon button (dialog / popover close).
  iconSm: 'size-[25px] justify-center rounded-[5px] text-[#8e949d] hover:bg-hover hover:text-ink',
};

/** Values of the `variant` prop on Button and button-like parts. */
export type ButtonVariant = keyof typeof BUTTON_VARIANTS | 'unstyled';

const withBase = Object.fromEntries(
  Object.entries(BUTTON_VARIANTS).map(([k, v]) => [k, `${BUTTON_BASE} ${v}`]),
) as Record<keyof typeof BUTTON_VARIANTS, string>;

/** The full class string for a button variant — for elements that aren't styled through `styled()`. */
export const buttonClasses = (variant: ButtonVariant): string => (variant === 'unstyled' ? '' : withBase[variant]);

/** `styled()` options for anything that renders a button. `variant="unstyled"` opts out entirely. */
export const button = (defaultVariant: ButtonVariant = 'outline') => ({
  variants: { variant: { ...withBase, unstyled: '' } },
  defaults: { variant: defaultVariant as ButtonVariant },
});

/** Text input / textarea / select trigger. Field's data-invalid (or aria-invalid) switches to red. */
export const CONTROL =
  'w-full rounded-md border border-line-strong bg-surface text-xs text-ink outline-hidden transition placeholder:text-[#a0a5ad] ' +
  'focus:border-blue focus:shadow-[0_0_0_3px_var(--blue-soft)] ' +
  'data-invalid:border-red data-invalid:focus:shadow-[0_0_0_3px_var(--red-soft)] ' +
  'aria-invalid:border-red aria-invalid:focus:shadow-[0_0_0_3px_var(--red-soft)] ' +
  'disabled:cursor-not-allowed disabled:opacity-60 data-disabled:cursor-not-allowed data-disabled:opacity-60';

/** Floating layer wrapper (Positioner parts). */
export const POSITIONER = 'z-50 outline-hidden';

/** Enter / exit animation shared by floating popups, driven by Base UI's starting / ending style attributes. */
export const POP_MOTION =
  'origin-(--transform-origin) transition-[opacity,scale] duration-150 ease-out data-starting-style:scale-[.97] data-starting-style:opacity-0 data-ending-style:scale-[.97] data-ending-style:opacity-0 data-instant:transition-none';

/** Popover-like surface (menus, select, popover, preview card). */
export const POPUP = `rounded-lg border border-line bg-surface text-ink shadow-pop outline-hidden dark:shadow-[0_14px_30px_rgba(0,0,0,.3)] ${POP_MOTION}`;

/** Popup arrow: a rotated square that inherits the surface + hairline. */
export const ARROW =
  "relative block h-1.5 w-3 overflow-clip data-[side=bottom]:-top-1.5 data-[side=top]:-bottom-1.5 data-[side=top]:rotate-180 data-[side=left]:-right-[9px] data-[side=left]:rotate-90 data-[side=right]:-left-[9px] data-[side=right]:-rotate-90 before:absolute before:bottom-0 before:left-1/2 before:size-[calc(6px*sqrt(2))] before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45 before:border before:border-line before:bg-surface before:content-['']";

/** Row inside a menu / select / combobox list. */
export const ITEM =
  'flex min-h-[31px] cursor-default select-none items-center gap-2 rounded-[5px] px-2 text-[11px] text-[#626872] outline-hidden dark:text-[#abb3be] data-highlighted:bg-hover data-highlighted:text-ink data-disabled:pointer-events-none data-disabled:opacity-50';

/** Small uppercase heading inside a list. */
export const GROUP_LABEL = 'px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[.105em] text-[#a2a6ae] dark:text-[#707987]';

/** Hairline between list groups. */
export const LIST_SEPARATOR = '-mx-[5px] my-[5px] h-px bg-line';

/** Modal scrim. */
export const BACKDROP =
  'fixed inset-0 bg-[rgba(16,21,29,.52)] transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute';

/** Dialog-like heading + caption. */
export const TITLE = 'm-0 text-[15px] font-[650] tracking-[-.025em] text-ink';
export const DESCRIPTION = 'mb-0 mt-[5px] text-[11px] leading-[1.45] text-[#8f959e]';

/**
 * Modal dialog surface. Centred on its own (`fixed`), or laid out by a Dialog.Viewport when one wraps it —
 * the viewport resets its direct child to static flow so tall dialogs scroll inside it.
 */
export const DIALOG_POPUP =
  'fixed left-1/2 top-1/2 max-h-[calc(100dvh-40px)] w-[min(440px,calc(100vw-40px))] -translate-1/2 overflow-y-auto rounded-[10px] border border-line bg-surface px-[19px] pb-[18px] pt-[18px] text-ink shadow-dialog outline-hidden ' +
  'scale-[calc(1-.04*var(--nested-dialogs,0))] transition-[opacity,scale] duration-200 ease-out data-starting-style:scale-[.97] data-starting-style:opacity-0 data-ending-style:scale-[.97] data-ending-style:opacity-0 data-nested-dialog-open:brightness-[.97]';
export const DIALOG_VIEWPORT =
  'fixed inset-0 grid place-items-center overflow-y-auto p-5 mobile:p-[13px] *:relative *:left-auto *:top-auto *:max-h-none *:translate-none';

/** Field label / caption / error text. */
export const LABEL = 'text-[11px] font-semibold text-[#5f656e] dark:text-[#8a939f]';
export const HINT = 'text-[10px] text-[#9298a1] dark:text-[#8a939f]';
export const ERROR = 'text-[10px] text-red';

/** Fill tones shared by Progress, Meter and Slider indicators. */
export const TONES = {
  blue: 'bg-blue',
  green: 'bg-[#36a978]',
  amber: 'bg-[#c99537]',
  violet: 'bg-[#8061c4]',
  red: 'bg-[#d45d6b]',
};

/** A fill tone name. */
export type Tone = keyof typeof TONES;

/** 7px rounded track used by Progress and Meter. */
export const TRACK = 'block h-[7px] w-full overflow-hidden rounded-full bg-[#eef0f3] dark:bg-[#252b34]';
