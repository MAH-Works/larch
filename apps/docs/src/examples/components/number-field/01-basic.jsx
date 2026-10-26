import { NumberField } from '@mah-works/larch/number-field';

export const title = 'Basic';
export const description = 'One 35px box with − / + steppers (Larch glyphs by default). Drag the label (ScrubArea) to scrub the value.';
export const layout = 'padded';

export default function Basic() {
  return (
    <NumberField.Root defaultValue={12} min={1} max={500}>
      <NumberField.ScrubArea>
        <label className="text-[11px] font-semibold text-[#5f656e] dark:text-[#8a939f]">Seats</label>
      </NumberField.ScrubArea>
      <NumberField.Group>
        <NumberField.Decrement aria-label="Remove a seat" />
        <NumberField.Input />
        <NumberField.Increment aria-label="Add a seat" />
      </NumberField.Group>
    </NumberField.Root>
  );
}
