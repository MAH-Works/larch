import { Tabs } from '@mah-works/larch';

export const title = 'Basic';
export const description = 'Arrow keys move between tabs.';
export const layout = 'padded';

export default function Basic() {
  return (
    <Tabs
      tabs={[
        { id: 'overview', label: 'Overview', content: 'A compact panel keeps the primary summary visible without competing with the data surface.' },
        { id: 'activity', label: 'Activity', content: 'Activity panels work well for chronological updates, comments, and audit history.' },
        { id: 'settings', label: 'Settings', content: 'Settings panels group secondary controls without taking over the main workflow.' },
      ]}
    />
  );
}
