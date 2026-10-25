import { BarChart, Legend, Panel, PanelSelect } from '@mah-works/larch';

export const title = 'Monthly series';
export const layout = 'canvas';

const BARS = [
  ['Nov', 44], ['Dec', 51], ['Jan', 49], ['Feb', 60], ['Mar', 58], ['Apr', 71],
  ['May', 68], ['Jun', 76], ['Jul', 73], ['Aug', 85], ['Sep', 81], ['Oct', 94],
];

export default function Revenue() {
  return (
    <Panel
      title="Revenue performance"
      subtitle="Monthly recurring revenue · $k"
      action={<PanelSelect label="Report period" options={['Last 12 months', 'Last 6 months']} />}
    >
      <BarChart bars={BARS} />
      <Legend className="pt-[17px]" items={[{ label: 'Recognized revenue', tone: 'blue' }]} />
    </Panel>
  );
}
