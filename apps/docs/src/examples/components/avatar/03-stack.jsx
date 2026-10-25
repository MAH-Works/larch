import { AvatarStack } from '@larch/ui';

export const title = 'Stack';
export const description = 'AvatarStack overlaps avatars with a surface-colored ring. Use `more` for the overflow count.';

export default function Stack() {
  return (
    <div className="flex items-center gap-3">
      <AvatarStack
        avatars={[
          { initials: 'JD', tone: 'blue' },
          { initials: 'MC', tone: 'coral' },
          { initials: 'AS', tone: 'green' },
          { initials: '+2', more: true },
        ]}
      />
      <span className="text-xs text-muted">Project team</span>
    </div>
  );
}
