import { ChainOfThought } from '@mah-works/larch/ai';
import { Badge } from '@mah-works/larch';

export const title = 'Basic';
export const description = 'A step with `detail` expands — here into search-result hosts.';
export const layout = 'padded';

export default function Basic() {
  return (
    <div className="max-w-[460px]">
      <ChainOfThought
        running={false}
        steps={[
          { title: 'Read the build log for dpl_8Kx2', icon: 'document' },
          {
            title: 'Searched the web for next.js image cache key',
            icon: 'globe',
            detail: ['nextjs.org', 'github.com', 'vercel.com'].map((host) => <Badge key={host}>{host}</Badge>),
          },
          { title: 'Searched the code for cacheKey', icon: 'search' },
        ]}
      />
    </div>
  );
}
