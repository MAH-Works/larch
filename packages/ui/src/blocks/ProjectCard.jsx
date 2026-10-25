import { AvatarStack } from '../components/Avatar.jsx';
import Badge from '../components/Badge.jsx';
import { Card } from '../components/Card.jsx';

const FILL = { blue: 'bg-blue', green: 'bg-[#39a978]', amber: 'bg-[#c99537]', violet: 'bg-[#8061c4]', red: 'bg-[#d45d6b]' };

/** Compact progress card for a project in motion. `status` is [label, badge variant]. */
export function ProjectCard({ name, client, status, progress, tone = 'blue', due, people = [] }) {
  return (
    <Card className="p-[18px]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="m-0 text-sm font-[650] tracking-[-.02em] text-ink">{name}</h3>
        {status && <Badge variant={status[1]}>{status[0]}</Badge>}
      </div>
      <p className="mb-[18px] mt-[6px] text-[11px] text-[#9298a1] dark:text-[#858e9a]">{client}</p>
      <div className="flex justify-between gap-[10px] text-[10px] text-[#8d929b]">
        <span>Progress</span>
        <strong>{progress}%</strong>
      </div>
      <div className="mb-[13px] mt-[9px] h-[6px] overflow-hidden rounded-full bg-[#eef0f3] dark:bg-[#252b34]">
        <span className={`block h-full rounded-[inherit] ${FILL[tone]}`} style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center justify-between gap-[10px] text-[10px] text-[#8d929b]">
        <AvatarStack avatars={people} />
        <span>{due}</span>
      </div>
    </Card>
  );
}

/** Three-up grid of ProjectCards (2-up below 980px, stacked on mobile). */
export function ProjectGrid({ children, className = '' }) {
  return <div className={`mb-4 grid grid-cols-3 gap-[14px] narrow:grid-cols-2 mobile:grid-cols-1 ${className}`}>{children}</div>;
}
