import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import { theme } from './styled.js';

/** Base UI Fieldset with Larch styles. The legend uses Larch's eyebrow look. */
export const Fieldset = theme(BaseFieldset, 'Fieldset', {
  Root: 'm-0 flex min-w-0 flex-col gap-3 border-0 p-0',
  Legend: 'mb-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[#979ca5] dark:text-[#858e9a]',
});
