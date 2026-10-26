import type { ReactNode } from 'react';

export const CLIENT_MARK_TONES = {
  sky: 'bg-[#dff2ff] text-[#1783c0]',
  lime: 'bg-[#e4f4d5] text-[#5e972f]',
  yellow: 'bg-[#fff0c7] text-[#bc8004]',
  violet: 'bg-[#eee5ff] text-[#7856c0]',
  rose: 'bg-[#ffe4e4] text-[#c25261]',
  blue: 'bg-[#e1eaff] text-[#3568cf]',
  slate: 'bg-[#e9ebee] text-[#66707c]',
};

export type ClientMarkTone = keyof typeof CLIENT_MARK_TONES;

export interface ClientMarkProps {
  tone?: ClientMarkTone;
  size?: 'md' | 'lg';
  className?: string;
  children?: ReactNode;
}

/** Rounded-square monogram for a client. `size="lg"` is the 30px variant used in lists. */
export default function ClientMark({ tone = 'sky', size = 'md', className = '', children }: ClientMarkProps) {
  const dim = size === 'lg' ? 'size-[30px]' : 'size-[29px]';
  return (
    <span className={`grid shrink-0 place-items-center rounded-lg text-[10px] font-bold ${dim} ${CLIENT_MARK_TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}
