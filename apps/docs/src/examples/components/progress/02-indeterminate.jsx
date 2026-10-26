import { Progress } from '@mah-works/larch/progress';

export const title = 'Indeterminate';
export const description = 'Pass `value={null}` when the duration is unknown; the indicator sweeps across the track.';
export const layout = 'padded';

export default function Indeterminate() {
  return (
    <Progress.Root value={null} className="max-w-[420px]">
      <Progress.Label>Importing contacts…</Progress.Label>
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  );
}
