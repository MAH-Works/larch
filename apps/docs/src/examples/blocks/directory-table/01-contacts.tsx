import {
  Avatar,
  Badge,
  Button,
  Cell,
  CellTitle,
  DirectoryCard,
  DirectoryTable,
  DirectoryToolbar,
  Icon,
  MoreButton,
  Pagination,
  Row,
  Separator,
  TableFooter,
} from '@mah-works/larch';

export const title = 'Contacts directory';
export const layout = 'canvas';

const CONTACTS = [
  { initials: 'JD', tone: 'blue', name: 'Jamie Davis', email: 'jamie@aperture.test', company: 'Aperture Labs', role: 'Head of Product', last: 'Today, 9:42 am', status: ['Active', 'active'], owner: 'Maria Costa' },
  { initials: 'MC', tone: 'coral', name: 'Maria Costa', email: 'maria@parallax.studio', company: 'Parallax Studio', role: 'Founder', last: 'Yesterday', status: ['VIP', 'vip'], owner: 'Alex Singh' },
  { initials: 'AS', tone: 'green', name: 'Alex Singh', email: 'alex@northstar.health', company: 'Northstar Health', role: 'Operations lead', last: 'Oct 21, 2026', status: ['Onboarding', 'onboarding'], owner: 'Jamie Chen' },
  { initials: 'TS', tone: 'blue', name: 'Taylor Smith', email: 'taylor@cedarfinch.co', company: 'Cedar & Finch', role: 'Account manager', last: 'Oct 10, 2026', status: ['Inactive', 'inactive'], owner: 'Jamie Chen' },
] as const;

export default function Contacts() {
  return (
    <DirectoryCard>
      <DirectoryToolbar>
        <div className="flex items-center gap-[3px]">
          <Button variant="ghost">
            <Icon name="filter" size="sm" />
            Filter
            <Badge variant="blue" count>
              3
            </Badge>
          </Button>
          <Button variant="ghost">
            <Icon name="sort" size="sm" />
            Sort
          </Button>
          <Separator orientation="vertical" className="mx-[7px] h-[17px] self-center mobile:hidden" />
          <span className="text-[11px] text-[#969ba4]">142 contacts</span>
        </div>
        <Button variant="ghost" aria-label="Contact fields settings">
          <Icon name="settings" size="sm" />
        </Button>
      </DirectoryToolbar>

      <DirectoryTable headers={['Contact', 'Company', 'Role', 'Last contact', 'Status', 'Owner', '']}>
        {CONTACTS.map((c) => (
          <Row key={c.email}>
            <Cell>
              <CellTitle
                leading={
                  <Avatar.Root size="md" tone={c.tone}>
                    <Avatar.Fallback>{c.initials}</Avatar.Fallback>
                  </Avatar.Root>
                }
                title={c.name}
                caption={c.email}
              />
            </Cell>
            <Cell>{c.company}</Cell>
            <Cell>{c.role}</Cell>
            <Cell>{c.last}</Cell>
            <Cell>
              <Badge variant={c.status[1]}>{c.status[0]}</Badge>
            </Cell>
            <Cell>{c.owner}</Cell>
            <Cell>
              <MoreButton label={`More actions for ${c.name}`} />
            </Cell>
          </Row>
        ))}
      </DirectoryTable>

      <TableFooter pagination={<Pagination onNext={() => {}} />}>
        <span>1 to {CONTACTS.length} of 142 contacts</span>
      </TableFooter>
    </DirectoryCard>
  );
}
