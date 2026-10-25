export const AVATAR_TONES = {
  blue: 'from-[#6a9bea] to-[#32467e]',
  coral: 'from-[#ff9b78] to-[#bb4e66]',
  green: 'from-[#98d29b] to-[#39806d]',
  sand: 'from-[#ebc984] to-[#a85d43]',
  purple: 'from-[#bb9bf2] to-[#6853a6]',
};

const SIZES = {
  sm: 'size-[25px] text-[9px] font-bold', // stacked contact avatars
  md: 'size-[30px] text-[10px] font-bold', // contact photo in directory rows
  lg: 'size-[35px] text-[11px] font-semibold', // design-system specimen
};

/** Gradient initials avatar. Pass `stacked` inside <AvatarStack> to get the overlap + ring. */
export default function Avatar({ initials, tone = 'blue', size = 'sm', stacked = false, more = false, className = '' }) {
  const look = more
    ? 'bg-[#f0f1f3] text-[#7b8089] dark:bg-[#272d36] dark:text-[#aab2bd]'
    : `bg-gradient-to-br text-white ${AVATAR_TONES[tone]}`;
  const ring = stacked ? '-ml-[5px] border-2 border-surface first:ml-0' : '';
  return (
    <span className={`grid shrink-0 place-items-center rounded-full ${SIZES[size]} ${look} ${ring} ${className}`}>
      {initials}
    </span>
  );
}

export function AvatarStack({ avatars = [], className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      {avatars.map((a, i) => (
        <Avatar key={i} stacked {...a} />
      ))}
    </div>
  );
}
