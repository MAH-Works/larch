import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { styled } from './styled.js';

/** Base UI RadioGroup, stacking its options with Larch's 10px rhythm. */
export const RadioGroup = styled(BaseRadioGroup, 'flex flex-col items-start gap-[10px]', { name: 'RadioGroup' });
