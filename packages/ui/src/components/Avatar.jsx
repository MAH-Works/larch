import { Avatar } from '../base-ui/avatar.js';

/**
 * Overlapping row of avatars with a surface-coloured ring, built from Base UI Avatar parts.
 * `avatars`: [{ initials, tone?, size?, src? }] — use `tone: 'muted'` for a "+N" overflow avatar.
 */
export function AvatarStack({ avatars = [], className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      {avatars.map(({ initials, src, tone, size }, i) => (
        <Avatar.Root key={i} tone={tone} size={size} className="-ml-[5px] border-2 border-surface first:ml-0">
          {src && <Avatar.Image src={src} alt="" />}
          <Avatar.Fallback>{initials}</Avatar.Fallback>
        </Avatar.Root>
      ))}
    </div>
  );
}
