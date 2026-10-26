import { Slider } from '@mah-works/larch/slider';

export const title = 'Range';
export const description = 'Pass an array to get one thumb per value. Larch adds a visual `tone` prop to Slider.Indicator.';
export const layout = 'padded';

export default function Range() {
  return (
    <Slider.Root defaultValue={[20, 65]} className="max-w-[320px]" format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0, notation: 'compact' }} max={100000} step={1000} largeStep={10000} minStepsBetweenValues={5}>
      <Slider.Label>Contract value</Slider.Label>
      <Slider.Value />
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator tone="green" />
          <Slider.Thumb index={0} aria-label="Minimum value" />
          <Slider.Thumb index={1} aria-label="Maximum value" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
