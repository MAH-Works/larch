import { Radio } from '@mah-works/larch/radio';
import { RadioGroup } from '@mah-works/larch/radio-group';

export const title = 'Basic';
export const description = 'RadioGroup holds the value; each Radio.Root sits in a label. Arrow keys move the selection.';
export const layout = 'padded';

const PLANS = [
  ['monthly', 'Monthly', '$24 per seat'],
  ['annual', 'Annual', '$19 per seat · billed yearly'],
];

export default function Basic() {
  return (
    <RadioGroup defaultValue="annual" aria-labelledby="billing">
      <span id="billing" className="text-[11px] font-semibold text-[#5f656e] dark:text-[#8a939f]">
        Billing cycle
      </span>
      {PLANS.map(([value, label, caption]) => (
        <label key={value} className="flex items-start gap-2 text-xs text-ink">
          <Radio.Root value={value} className="mt-px">
            <Radio.Indicator />
          </Radio.Root>
          <span>
            <span className="block font-semibold">{label}</span>
            <span className="text-[11px] text-muted">{caption}</span>
          </span>
        </label>
      ))}
    </RadioGroup>
  );
}
