import { Avatar, Badge, Cell, CellTitle, DirectoryCard, DirectoryTable, MoreButton, Row } from '@mah-works/larch';

export const title = 'Basic table';
export const description = 'Headers are an array; rows are composed from Row and Cell. CellTitle handles the avatar + two-line pattern.';
export const layout = 'canvas';

const PEOPLE = [
  { initials: 'JD', tone: 'blue', name: 'Jamie Davis', email: 'jamie@aperture.test', company: 'Aperture Labs', status: ['Active', 'active'] },
  { initials: 'MC', tone: 'coral', name: 'Maria Costa', email: 'maria@parallax.studio', company: 'Parallax Studio', status: ['VIP', 'vip'] },
  { initials: 'AS', tone: 'green', name: 'Alex Singh', email: 'alex@northstar.health', company: 'Northstar Health', status: ['Onboarding', 'onboarding'] },
];

export default function Basic() {
  return (
    <DirectoryCard>
      <DirectoryTable headers={['Contact', 'Company', 'Status', '']} minWidth={560}>
        {PEOPLE.map((p) => (
          <Row key={p.email}>
            <Cell>
              <CellTitle
                leading={
                  <Avatar.Root size="md" tone={p.tone}>
                    <Avatar.Fallback>{p.initials}</Avatar.Fallback>
                  </Avatar.Root>
                }
                title={p.name}
                caption={p.email}
              />
            </Cell>
            <Cell>{p.company}</Cell>
            <Cell>
              <Badge variant={p.status[1]}>{p.status[0]}</Badge>
            </Cell>
            <Cell className="w-[60px] text-center">
              <MoreButton label={`More actions for ${p.name}`} />
            </Cell>
          </Row>
        ))}
      </DirectoryTable>
    </DirectoryCard>
  );
}
