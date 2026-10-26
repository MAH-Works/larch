import { Slider } from '@mah-works/larch/slider';

export const title = 'Basic';
export const description = 'Label and Value sit on one row above the track; the thumb takes Larch’s focus ring.';
export const layout = 'padded';

export default function Basic() {
  return (
    <Slider.Root defaultValue={30} className="max-w-[320px]" format={{ style: 'unit', unit: 'day' }} max={90}>
      <Slider.Label>Reminder window</Slider.Label>
      <Slider.Value />
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb aria-label="Reminder window" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
