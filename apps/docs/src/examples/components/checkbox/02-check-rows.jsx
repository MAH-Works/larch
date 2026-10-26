import { Checkbox } from '@mah-works/larch/checkbox';

export const title = 'Labelled options';
export const description = 'Wrap the Root in a `<label>` (Base UI’s pattern) — the whole row toggles it.';
export const layout = 'padded';

export default function CheckRows() {
  return (
    <div className="flex flex-col gap-[10px]">
      {[
        ['Include archived clients', true],
        ['Only overdue tasks', false],
        ['Show billing in USD', false],
      ].map(([label, checked]) => (
        <label key={label} className="flex items-center gap-2 text-xs text-[#656b74] dark:text-muted">
          <Checkbox.Root defaultChecked={checked}>
            <Checkbox.Indicator />
          </Checkbox.Root>
          {label}
        </label>
      ))}
    </div>
  );
}
