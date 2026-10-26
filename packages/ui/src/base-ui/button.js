import { Button as BaseButton } from '@base-ui/react/button';
import { styled } from './styled.js';
import { button } from './classes.js';

/**
 * Base UI Button. Larch adds one visual prop, `variant` (see BUTTON_VARIANTS). To render a link, use
 * Base UI's composition: `<Button render={<a href="…" />} nativeButton={false}>`.
 */
export const Button = styled(BaseButton, undefined, { ...button(), name: 'Button' });
