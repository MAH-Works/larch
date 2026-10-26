import { Tabs } from '@mah-works/larch/tabs';

export const title = 'Basic';
export const description = 'Arrow keys move between tabs. Tabs.Indicator draws Larch’s sliding blue underline.';
export const layout = 'padded';

export default function Basic() {
  return (
    <Tabs.Root defaultValue="overview">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="activity">Activity</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="overview">A compact panel keeps the primary summary visible without competing with the data surface.</Tabs.Panel>
      <Tabs.Panel value="activity">Activity panels work well for chronological updates, comments, and audit history.</Tabs.Panel>
      <Tabs.Panel value="settings">Settings panels group secondary controls without taking over the main workflow.</Tabs.Panel>
    </Tabs.Root>
  );
}
