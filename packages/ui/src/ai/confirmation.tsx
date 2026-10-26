import type { ReactNode } from 'react';
import { Button } from '../base-ui/button.js';
import Icon, { type IconName } from '../components/Icon.js';

export interface ConfirmationProps {
  /** Ask about the action, e.g. "Run pnpm build?". */
  title: ReactNode;
  description?: ReactNode;
  icon?: IconName;
  onApprove: () => void;
  onDeny: () => void;
  approveLabel?: ReactNode;
  denyLabel?: ReactNode;
  disabled?: boolean;
}

/**
 * Approve or deny a tool before it runs — render it for a tool part in `approval-requested` and answer
 * with `addToolApprovalResponse({ id: part.approval.id, approved })`. Once answered, show the call as a Tool.
 */
export function Confirmation({ title, description, icon = 'terminal', onApprove, onDeny, approveLabel = 'Approve', denyLabel = 'Deny', disabled }: ConfirmationProps) {
  return (
    <div role="group" className="flex min-w-0 items-center gap-3 rounded-lg border border-line bg-surface p-3 shadow-card mobile:flex-wrap">
      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-hover text-soft">
        <Icon name={icon} size="sm" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-semibold text-strong">{title}</div>
        {description && <div className="mt-px text-[11px] text-muted">{description}</div>}
      </div>
      <div className="flex shrink-0 gap-1.5 mobile:ml-auto">
        <Button variant="outline" onClick={onDeny} disabled={disabled}>
          {denyLabel}
        </Button>
        <Button variant="primary" onClick={onApprove} disabled={disabled}>
          {approveLabel}
        </Button>
      </div>
    </div>
  );
}
