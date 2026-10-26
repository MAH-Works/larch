import Icon, { type IconName } from '../components/Icon.js';
import type { TraceStatus } from './trace.js';

/** A step's progress, as the patterns describe it. `done` maps to a Trace line with no status. */
export type StepStatus = 'pending' | 'running' | 'done' | 'error';

/** StepStatus → Trace.Line `status`. */
export const traceStatus = (status: StepStatus): TraceStatus | undefined => (status === 'done' ? undefined : status);

const ICONS: Record<StepStatus, IconName> = { pending: 'circle', running: 'loader', done: 'circleCheck', error: 'circleX' };

/** The default icon for a step: an open circle, a spinning arc, a check or a cross. */
export function StatusIcon({ status, name }: { status: StepStatus; name?: IconName }) {
  return <Icon name={name ?? ICONS[status]} className={status === 'running' && !name ? 'animate-spin' : undefined} />;
}
