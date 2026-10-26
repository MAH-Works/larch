import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { styled } from './styled.js';

/** Base UI ToggleGroup with Larch styles: a segmented control around its Toggles. */
export const ToggleGroup = styled(
  BaseToggleGroup,
  'inline-flex items-center gap-[2px] rounded-lg border border-line-strong bg-surface p-[2px] data-[orientation=vertical]:flex-col *:h-7',
  { name: 'ToggleGroup' },
);
