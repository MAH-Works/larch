import type { SVGProps } from 'react';

const GEAR = (
  <>
    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
    <path
      d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4v.3a2 2 0 1 1-4 0v-.2A2 2 0 0 0 5.8 18l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a2 2 0 0 0-1.4-3.4h-.3a2 2 0 1 1 0-4h.2A2 2 0 0 0 3 4.4l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A2 2 0 0 0 9.2.2h.3a2 2 0 1 1 4 0v.2A2 2 0 0 0 17 3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a2 2 0 0 0 1.4 3.4h.3a2 2 0 1 1 0 4h-.2a2 2 0 0 0-1.9 1.8Z"
      transform="translate(1 1) scale(.92)"
    />
  </>
);

const USERS = (
  <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm5-6.5a3.5 3.5 0 0 1 0 6.8M17.5 15a3.5 3.5 0 0 1 2.5 3.5V20" />
);

const DOWNLOAD = <path d="M12 4v11M8 11l4 4 4-4M5 20h14" />;

/** Every glyph is a 24×24 stroke icon; `currentColor` drives the colour. */
const GLYPHS = {
  overview: <path d="M4 13h6V4H4v9Zm0 7h6v-4H4v4Zm10 0h6v-9h-6v9Zm0-16v4h6V4h-6Z" />,
  table: (
    <>
      <path d="M4 5h16v14H4z" />
      <path d="M4 9h16M9 5v14" />
    </>
  ),
  users: USERS,
  home: <path d="M4 19.5V14l8-9 8 9v5.5h-5v-4h-6v4H4Z" />,
  star: <path d="m12 4 2.2 4.7 5.1.7-3.7 3.6.9 5.1-4.5-2.4-4.5 2.4.9-5.1-3.7-3.6 5.1-.7L12 4Z" />,
  list: <path d="M4 6h16M4 12h16M4 18h16" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  chart: <path d="M5 20V9m7 11V4m7 16v-7" />,
  settings: GEAR,
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4 4" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
  bell: <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />,
  download: DOWNLOAD,
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </>
  ),
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  sort: <path d="M8 6h12M8 12h8M8 18h4M4 6h.01M4 12h.01M4 18h.01" />,
  tag: <path d="m8 12 3 3 8-8M4 5h16v14H4z" />,
  car: (
    <>
      <path d="M5 17H4v-4l2-5a2 2 0 0 1 1.9-1.3h8.2A2 2 0 0 1 18 8l2 5v4h-1M4 13h16M9 17h6" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  sidebar: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16" />
    </>
  ),
  money: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6.5 9.5h.01M17.5 14.5h.01" />
    </>
  ),
  trash: <path d="M5 7h14M10 11v5M14 11v5M6 7l1 12h10l1-12M9 7V4h6v3" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="m3 3 18 18" />
      <path d="M10.6 5.6a9.7 9.7 0 0 1 1.4-.1c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3 3.8M6.6 6.6A17 17 0 0 0 2.5 12S6 18.5 12 18.5a9.4 9.4 0 0 0 4.4-1.1" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  checkSmall: <path d="m7 12 3 3 7-7" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  warning: (
    <>
      <path d="m12 4 9 16H3L12 4Z" />
      <path d="M12 9v4M12 16h.01" />
    </>
  ),
  error: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  keyboard: (
    <>
      <path d="M4 6h16v12H4z" />
      <path d="M7 10h.01M10 10h.01M13 10h.01M16 10h.01M7 14h10" />
    </>
  ),
  window: <path d="M4 5h16v12H4zM8 21h8M12 17v4" />,
  assign: USERS,
  copy: (
    <>
      <path d="M8 12h8M12 8v8M4 5h16v14H4z" />
    </>
  ),
  document: (
    <>
      <path d="M4 5h16v14H4z" />
      <path d="M8 10h8M8 14h5" />
    </>
  ),

  // Agent UIs (AI Elements)
  sparkles: <path d="M12 3.5 13.6 8.4 18.5 10 13.6 11.6 12 16.5 10.4 11.6 5.5 10 10.4 8.4 12 3.5ZM18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />,
  terminal: (
    <>
      <path d="M4 5h16v14H4z" />
      <path d="m8 10 2.5 2L8 14M12.5 15h3.5" />
    </>
  ),
  wrench: <path d="M14.5 5.5a4 4 0 0 0 4.9 4.9L20 11a5.5 5.5 0 0 1-7.4 1.9l-6.1 6.1a2 2 0 0 1-2.8-2.8l6.1-6.1A5.5 5.5 0 0 1 13 4l.6.6Z" />,
  brain: (
    <>
      <path d="M12 5.5a3 3 0 0 0-5.6-1.4A3 3 0 0 0 4 8.5a3 3 0 0 0 .8 5.3A3.2 3.2 0 0 0 9 18.5a3 3 0 0 0 3 1V5.5Z" />
      <path d="M12 5.5a3 3 0 0 1 5.6-1.4A3 3 0 0 1 20 8.5a3 3 0 0 1-.8 5.3 3.2 3.2 0 0 1-4.2 4.7 3 3 0 0 1-3 1" />
    </>
  ),
  paperclip: <path d="m18.5 11.5-6.8 6.8a4.5 4.5 0 0 1-6.4-6.4l7.4-7.4a3 3 0 0 1 4.2 4.2l-7.3 7.3a1.5 1.5 0 0 1-2.1-2.1l6.6-6.6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  arrowUpRight: <path d="M8 16 16 8M9 8h7v7" />,
  stop: <rect x="7" y="7" width="10" height="10" rx="1.5" />,
  refresh: <path d="M19 12a7 7 0 1 1-2.1-5M19 4.5V9h-4.5" />,
  thumbsUp: <path d="M8 20H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3m0 9V11m0 9h8.7a2 2 0 0 0 2-1.6l1.1-5.5A2 2 0 0 0 16.8 10H13V6a2 2 0 0 0-2-2l-3 7" />,
  thumbsDown: <path d="M16 4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-3m0-9v9m0-9H7.3a2 2 0 0 0-2 1.6l-1.1 5.5A2 2 0 0 0 6.2 14H11v4a2 2 0 0 0 2 2l3-7" />,
  folder: <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5H10l2 2.5h6.5A1.5 1.5 0 0 1 20 9v8.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11Z" />,
  file: (
    <>
      <path d="M14 4H7a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 7 20h10a1.5 1.5 0 0 0 1.5-1.5V8.5L14 4Z" />
      <path d="M14 4v4.5h4.5" />
    </>
  ),
  fileCode: (
    <>
      <path d="M14 4H7a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 7 20h10a1.5 1.5 0 0 0 1.5-1.5V8.5L14 4Z" />
      <path d="M14 4v4.5h4.5M10 12l-2 2 2 2M14 12l2 2-2 2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.2 2.2 3.3 4.9 3.3 8s-1.1 5.8-3.3 8c-2.2-2.2-3.3-4.9-3.3-8S9.8 6.2 12 4Z" />
    </>
  ),
  link: <path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-.8.8M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l.8-.8" />,
  loader: <path d="M12 4a8 8 0 1 0 8 8" />,
  circle: <circle cx="12" cy="12" r="7.5" />,
  circleDot: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  circleCheck: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="m9 12.2 2.1 2.1L15.2 10" />
    </>
  ),
  circleX: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="m9.5 9.5 5 5M14.5 9.5l-5 5" />
    </>
  ),
  circleDashed: <path d="M10.6 4.6a7.5 7.5 0 0 1 2.8 0M17.3 6.7a7.5 7.5 0 0 1 1.4 2.4M19.4 13.4a7.5 7.5 0 0 1-1.4 2.6M15.4 18.6a7.5 7.5 0 0 1-2.8.8M8.6 18.6a7.5 7.5 0 0 1-2.2-1.6M4.6 13.4a7.5 7.5 0 0 1 0-2.8M6.7 6.7a7.5 7.5 0 0 1 2-1.5" />,
  listTodo: <path d="M11 6h9M11 12h9M11 18h9M4 5.5h3.5V9H4zM4 15.5l1.5 1.5L8 14.5" />,
  flask: <path d="M9.5 4h5M10 4v5.5L5.2 17.6A1.6 1.6 0 0 0 6.6 20h10.8a1.6 1.6 0 0 0 1.4-2.4L14 9.5V4M7.5 14.5h9" />,
  layers: <path d="m12 4 8 4-8 4-8-4 8-4ZM4 12l8 4 8-4M4 16l8 4 8-4" />,
  route: (
    <>
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 18h7.5a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H16" />
    </>
  ),
  pencil: <path d="M14.5 5.5 18.5 9.5M5 19l1-4L15.5 5.5a1.4 1.4 0 0 1 2 0l1 1a1.4 1.4 0 0 1 0 2L9 18l-4 1Z" />,
  image: (
    <>
      <path d="M4 5h16v14H4z" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m20 15-4.5-4.5L6 19" />
    </>
  ),
  bookmark: <path d="M7 4h10v16l-5-3.5L7 20V4Z" />,
  bot: (
    <>
      <path d="M5 9h14v10H5zM12 5v4M9.5 14h.01M14.5 14h.01" />
      <circle cx="12" cy="4.5" r="1" />
    </>
  ),
};

const SIZES = { md: 'size-[17px]', sm: 'size-[15px]', xs: 'size-[13px]' };

export type IconName = keyof typeof GLYPHS;
export type IconSize = keyof typeof SIZES;

export const ICON_NAMES = Object.keys(GLYPHS) as IconName[];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: IconSize;
}

/** Stroke icon from the Larch set. `size`: md 17px · sm 15px · xs 13px. */
export default function Icon({ name, size = 'md', className = '', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
      className={`${SIZES[size]} shrink-0 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] stroke-[1.65] ${className}`}
    >
      {GLYPHS[name]}
    </svg>
  );
}
