import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import { theme } from './styled.js';
import { CONTROL } from './classes.js';

/** Base UI OTPField with Larch styles: one square control per character. */
export const OTPField = theme(BaseOTPField, 'OTPField', {
  Root: 'flex items-center gap-2',
  Input: `${CONTROL} size-[38px] p-0 text-center text-sm font-semibold`,
  Separator: 'h-px w-2 shrink-0 bg-line-strong',
});
