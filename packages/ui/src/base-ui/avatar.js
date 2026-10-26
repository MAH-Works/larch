import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { theme } from './styled.js';

/** Gradient tones for initials avatars. `muted` is the neutral "+N" overflow look. */
export const AVATAR_TONES = {
  blue: 'bg-linear-to-br/srgb from-[#6a9bea] to-[#32467e] text-white',
  coral: 'bg-linear-to-br/srgb from-[#ff9b78] to-[#bb4e66] text-white',
  green: 'bg-linear-to-br/srgb from-[#98d29b] to-[#39806d] text-white',
  sand: 'bg-linear-to-br/srgb from-[#ebc984] to-[#a85d43] text-white',
  purple: 'bg-linear-to-br/srgb from-[#bb9bf2] to-[#6853a6] text-white',
  muted: 'bg-[#f0f1f3] text-[#7b8089] dark:bg-[#272d36] dark:text-[#aab2bd]',
};

export const AVATAR_SIZES = {
  sm: 'size-[25px] text-[9px] font-bold', // stacked contact avatars
  md: 'size-[30px] text-[10px] font-bold', // contact photo in directory rows
  lg: 'size-[35px] text-[11px] font-semibold', // design-system specimen
};

/** Base UI Avatar with Larch styles. Root adds two visual props: `tone` and `size`. */
export const Avatar = theme(BaseAvatar, 'Avatar', {
  Root: {
    base: 'relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full align-middle leading-none select-none',
    variants: { tone: AVATAR_TONES, size: AVATAR_SIZES },
    defaults: { tone: 'blue', size: 'sm' },
  },
  Image: 'size-full object-cover',
  Fallback: 'grid size-full place-items-center',
});
