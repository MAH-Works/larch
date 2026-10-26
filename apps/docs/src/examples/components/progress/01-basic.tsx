import { Progress } from '@mah-works/larch/progress';

export const title = 'Basic';
export const description = 'Progress is for work in motion. Larch’s 7px track with a `tone` on the Indicator.';
export const layout = 'padded';

const PROJECTS = [
  ['Website redesign', 78, 'blue'],
  ['Campaign launch', 52, 'amber'],
  ['Brand system', 34, 'green'],
  ['At-risk renewals', 18, 'red'],
] as const;

export default function Basic() {
  return (
    <div className="flex max-w-[420px] flex-col gap-4">
      {PROJECTS.map(([label, value, tone]) => (
        <Progress.Root key={label} value={value}>
          <Progress.Label>{label}</Progress.Label>
          <Progress.Value />
          <Progress.Track>
            <Progress.Indicator tone={tone} />
          </Progress.Track>
        </Progress.Root>
      ))}
    </div>
  );
}
