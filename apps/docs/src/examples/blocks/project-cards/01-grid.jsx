import { ProjectCard, ProjectGrid } from '@larch/ui';

export const title = 'Project grid';
export const layout = 'canvas';

const PROJECTS = [
  { name: 'Website redesign', client: 'Aperture Labs · Product design', status: ['On track', 'active'], progress: 78, tone: 'blue', due: 'Due Nov 12', people: [{ initials: 'JD', tone: 'blue' }, { initials: 'MC', tone: 'coral' }, { initials: '+2', more: true }] },
  { name: 'Brand system', client: 'Northstar Health · Strategy', status: ['Starting', 'onboarding'], progress: 34, tone: 'green', due: 'Due Nov 24', people: [{ initials: 'AS', tone: 'green' }, { initials: 'RB', tone: 'purple' }] },
  { name: 'Campaign launch', client: 'Harbor & Co. · Marketing', status: ['At risk', 'priority'], progress: 52, tone: 'amber', due: 'Due Nov 05', people: [{ initials: 'KF', tone: 'sand' }, { initials: 'TS', tone: 'blue' }] },
];

export default function Grid() {
  return (
    <ProjectGrid className="mb-0">
      {PROJECTS.map((p) => (
        <ProjectCard key={p.name} {...p} />
      ))}
    </ProjectGrid>
  );
}
