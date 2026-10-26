import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { styled } from './styled.js';

/** Base UI CheckboxGroup, stacking its options with Larch's 10px rhythm. */
export const CheckboxGroup = styled(BaseCheckboxGroup, 'flex flex-col items-start gap-[10px]', { name: 'CheckboxGroup' });
