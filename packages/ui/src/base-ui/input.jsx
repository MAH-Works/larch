import { forwardRef } from 'react';
import { Input as BaseInput } from '@base-ui/react/input';
import { styled } from './styled.js';
import { CONTROL } from './classes.js';

/** Base UI Input with Larch's 35px control style. Inside a Field it picks up the field's invalid state. */
export const Input = styled(BaseInput, `${CONTROL} h-[35px] px-[10px]`, { name: 'Input' });

const StyledTextArea = styled(BaseInput, `${CONTROL} h-[66px] resize-y px-[10px] py-[9px]`, { name: 'TextArea' });

/**
 * Larch extension — Base UI has no textarea component. This is Base UI's Input rendered as a <textarea>
 * (the documented `render` composition), so it takes Input's props and works inside a Field.
 */
export const TextArea = forwardRef(function TextArea(props, ref) {
  return <StyledTextArea ref={ref} render={<textarea />} {...props} />;
});
