import { Meter } from '@mah-works/larch/meter';

export const title = 'Basic';
export const description = 'A Meter shows a static measurement within a known range (storage, quota, health). Indicator takes a `tone`.';
export const layout = 'padded';

export default function Basic() {
  return (
    <div className="flex max-w-[360px] flex-col gap-5">
      <Meter.Root value={72}>
        <Meter.Label>Seats used</Meter.Label>
        <Meter.Value />
        <Meter.Track>
          <Meter.Indicator />
        </Meter.Track>
      </Meter.Root>
      <Meter.Root value={91}>
        <Meter.Label>API quota</Meter.Label>
        <Meter.Value />
        <Meter.Track>
          <Meter.Indicator tone="red" />
        </Meter.Track>
      </Meter.Root>
    </div>
  );
}
