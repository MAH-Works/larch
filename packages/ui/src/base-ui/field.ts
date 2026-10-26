import { Field as BaseField } from '@base-ui/react/field';
import { theme } from './styled.js';
import { CONTROL, ERROR, HINT, LABEL } from './classes.js';

/** Base UI Field with Larch styles: 11px label, 35px control, 10px description and error. */
export const Field = theme(BaseField, 'Field', {
  // Stacked fields get Larch's 12px rhythm.
  Root: 'flex flex-col gap-[6px] [&+&]:mt-3',
  Label: LABEL,
  Control: `${CONTROL} h-[35px] px-[10px]`,
  Description: HINT,
  Error: ERROR,
  // A labelled checkbox / radio / switch row inside a group.
  Item: 'flex items-center gap-2 text-xs text-[#656b74] dark:text-muted',
});
