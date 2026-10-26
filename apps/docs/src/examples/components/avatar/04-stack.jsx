import { AvatarStack } from '@mah-works/larch';

export const title = 'Stack (Larch)';
export const description =
  'AvatarStack is a Larch layout helper, not a Base UI part: it renders Avatar.Root + Avatar.Fallback for each entry with an overlap and a surface ring.';

export default function Stack() {
  return (
    <div className="flex items-center gap-3">
      <AvatarStack
        avatars={[
          { initials: 'JD', tone: 'blue' },
          { initials: 'MC', tone: 'coral' },
          { initials: 'AS', tone: 'green' },
          { initials: '+2', tone: 'muted' },
        ]}
      />
      <span className="text-xs text-muted">Project team</span>
    </div>
  );
}
