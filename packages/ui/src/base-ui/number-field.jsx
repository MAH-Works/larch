import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { theme } from './styled.js';
import Icon from '../components/Icon.jsx';

const STEPPER =
  'grid w-[30px] shrink-0 place-items-center border-line-strong text-[#8c929b] select-none hover:bg-hover hover:text-ink data-disabled:pointer-events-none data-disabled:opacity-50';

/** Base UI NumberField with Larch styles: one 35px box with − / + steppers. */
export const NumberField = theme(BaseNumberField, 'NumberField', {
  Root: 'flex flex-col items-start gap-[6px]',
  ScrubArea: 'cursor-ew-resize select-none',
  ScrubAreaCursor: 'drop-shadow-[0_1px_1px_#0008]',
  Group:
    'flex h-[35px] items-stretch overflow-hidden rounded-md border border-line-strong bg-surface transition ' +
    'focus-within:border-blue focus-within:shadow-[0_0_0_3px_var(--blue-soft)] data-invalid:border-red data-disabled:opacity-60',
  Input: 'w-[9ch] min-w-0 flex-1 border-0 bg-transparent px-[10px] text-center text-xs tabular-nums text-ink outline-hidden',
  Decrement: { base: `${STEPPER} border-r`, children: <Icon name="minus" size="xs" /> },
  Increment: { base: `${STEPPER} border-l`, children: <Icon name="plus" size="xs" /> },
});
