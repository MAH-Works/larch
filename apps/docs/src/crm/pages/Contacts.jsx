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
  PageHeading,
  PageWrap,
  Pagination,
  Row,
  TableFooter,
  ToolbarDivider,
  useToast,
} from '@compass/ui';
import { CONTACTS } from '../data/workspace.js';

export default function Contacts() {
  const { showToast } = useToast();
  return (
    <PageWrap>
      <PageHeading eyebrow="Workspace / People" title="Contacts" description="The people behind every client relationship.">
        <Button onClick={() => showToast('Import contacts')}>
          <Icon name="download" size="sm" />
          Import
        </Button>
        <Button variant="primary" onClick={() => showToast('New contact form')}>
          <Icon name="plus" size="sm" />
          Add contact
        </Button>
      </PageHeading>

      <DirectoryCard>
        <DirectoryToolbar>
          <div className="flex items-center gap-[3px]">
            <Button variant="ghost" onClick={() => showToast('Contact filters')}>
              <Icon name="filter" size="sm" />
              Filter
              <Badge variant="blue" count>
                3
              </Badge>
            </Button>
            <Button variant="ghost" onClick={() => showToast('Sorted by last contact')}>
              <Icon name="sort" size="sm" />
              Sort
            </Button>
            <ToolbarDivider />
            <span className="text-[11px] text-[#969ba4]">142 contacts</span>
          </div>
          <Button variant="ghost" aria-label="Contact fields settings" onClick={() => showToast('Contact fields settings')}>
            <Icon name="settings" size="sm" />
          </Button>
        </DirectoryToolbar>

        <DirectoryTable headers={['Contact', 'Company', 'Role', 'Last contact', 'Status', 'Owner', '']}>
          {CONTACTS.map((c) => (
            <Row key={c.email}>
              <Cell>
                <CellTitle leading={<Avatar size="md" initials={c.initials} tone={c.tone} />} title={c.name} caption={c.email} />
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

        <TableFooter pagination={<Pagination onNext={() => showToast('Next contacts page')} />}>
          <span>1 to {CONTACTS.length} of 142 contacts</span>
        </TableFooter>
      </DirectoryCard>
    </PageWrap>
  );
}
