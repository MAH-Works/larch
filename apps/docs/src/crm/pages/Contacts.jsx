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
  Separator,
  TableFooter,
  Toast,
} from '@mah-works/larch';
import { CONTACTS } from '../data/workspace.js';

export default function Contacts() {
  const toastManager = Toast.useToastManager();
  return (
    <PageWrap>
      <PageHeading eyebrow="Workspace / People" title="Contacts" description="The people behind every client relationship.">
        <Button onClick={() => toastManager.add({ title: 'Import contacts' })}>
          <Icon name="download" size="sm" />
          Import
        </Button>
        <Button variant="primary" onClick={() => toastManager.add({ title: 'New contact form' })}>
          <Icon name="plus" size="sm" />
          Add contact
        </Button>
      </PageHeading>

      <DirectoryCard>
        <DirectoryToolbar>
          <div className="flex items-center gap-[3px]">
            <Button variant="ghost" onClick={() => toastManager.add({ title: 'Contact filters' })}>
              <Icon name="filter" size="sm" />
              Filter
              <Badge variant="blue" count>
                3
              </Badge>
            </Button>
            <Button variant="ghost" onClick={() => toastManager.add({ title: 'Sorted by last contact' })}>
              <Icon name="sort" size="sm" />
              Sort
            </Button>
            <Separator orientation="vertical" className="mx-[7px] h-[17px] self-center mobile:hidden" />
            <span className="text-[11px] text-[#969ba4]">142 contacts</span>
          </div>
          <Button variant="ghost" aria-label="Contact fields settings" onClick={() => toastManager.add({ title: 'Contact fields settings' })}>
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

        <TableFooter pagination={<Pagination onNext={() => toastManager.add({ title: 'Next contacts page' })} />}>
          <span>1 to {CONTACTS.length} of 142 contacts</span>
        </TableFooter>
      </DirectoryCard>
    </PageWrap>
  );
}
