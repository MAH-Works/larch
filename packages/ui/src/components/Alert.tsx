import type { ReactNode } from 'react';
import Icon, { type IconName } from './Icon.js';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

const ALERTS: Record<AlertTone, [IconName, string]> = {
  info: ['info', 'border-[#d6e2ff] bg-[#f2f6ff] text-[#3564c5] dark:border-[#2c427b] dark:bg-[#18264a] dark:text-[#8eafff]'],
  success: ['check', 'border-[#c9ecd9] bg-[#f0fbf5] text-[#19734f] dark:border-[#235d46] dark:bg-[#173c2e] dark:text-[#69d3a4]'],
  warning: ['warning', 'border-[#f2dfae] bg-[#fff9e9] text-[#976515] dark:border-[#6d5122] dark:bg-[#40311b] dark:text-[#f0c56d]'],
  danger: ['error', 'border-[#ffd3d8] bg-[#fff4f5] text-[#b64150] dark:border-[#6b3039] dark:bg-[#432129] dark:text-[#ff8e9a]'],
};

export interface AlertProps {
  tone?: AlertTone;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Inline message. `tone`: info · success · warning · danger. Stacked alerts get an 8px gap. */
export function Alert({ tone = 'info', title, children, className = '' }: AlertProps) {
  const [icon, look] = ALERTS[tone];
  return (
    <div
      role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}
      className={`flex items-start gap-[10px] rounded-[7px] border px-3 py-[11px] text-[11px] leading-[1.45] [&+&]:mt-2 ${look} ${className}`}
    >
      <Icon name={icon} size="sm" className="mt-px" />
      <div>
        {title && <strong className="mb-[2px] block text-xs font-semibold">{title}</strong>}
        {children}
      </div>
    </div>
  );
}
