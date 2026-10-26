import type { ReactNode } from 'react';
import { AvatarStack, type AvatarStackItem } from '../components/Avatar.js';
import Badge, { type BadgeVariant } from '../components/Badge.js';
import { Card } from '../components/Card.js';
import type { Tone } from '../base-ui/classes.js';
import { Progress } from '../base-ui/progress.js';

export interface ProjectCardProps {
  name: string;
  client: ReactNode;
  status?: [label: string, variant: BadgeVariant];
  /** 0–100. */
  progress: number;
  tone?: Tone;
  due?: ReactNode;
  people?: AvatarStackItem[];
}

/** Compact progress card for a project in motion. `status` is [label, badge variant]. */
export function ProjectCard({ name, client, status, progress, tone = 'blue', due, people = [] }: ProjectCardProps) {
  return (
    <Card className="p-[18px]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="m-0 text-sm font-[650] tracking-[-.02em] text-ink">{name}</h3>
        {status && <Badge variant={status[1]}>{status[0]}</Badge>}
      </div>
      <p className="mb-[18px] mt-[6px] text-[11px] text-[#9298a1] dark:text-[#858e9a]">{client}</p>
      <Progress.Root value={progress} className="mb-[13px] gap-y-[9px]">
        <Progress.Label className="text-[10px] text-[#8d929b]">Progress</Progress.Label>
        <Progress.Value className="text-[10px] font-bold text-[#8d929b] dark:text-[#8d929b]" />
        <Progress.Track className="h-[6px]">
          <Progress.Indicator tone={tone} />
        </Progress.Track>
      </Progress.Root>
      <div className="flex items-center justify-between gap-[10px] text-[10px] text-[#8d929b]">
        <AvatarStack avatars={people} />
        <span>{due}</span>
      </div>
    </Card>
  );
}

/** Three-up grid of ProjectCards (2-up below 980px, stacked on mobile). */
export function ProjectGrid({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return <div className={`mb-4 grid grid-cols-3 gap-[14px] narrow:grid-cols-2 mobile:grid-cols-1 ${className}`}>{children}</div>;
}
