import { Separator as BaseSeparator } from '@base-ui/react/separator';
import { styled } from './styled.js';

/** Base UI Separator drawn as a Larch hairline. Add margin with `className` (e.g. `my-[19px]`). */
export const Separator = styled(
  BaseSeparator,
  'shrink-0 bg-line data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
  { name: 'Separator' },
);
