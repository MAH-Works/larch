import {
  Badge,
  Button,
  Cell,
  CellTitle,
  DirectoryCard,
  DirectoryTable,
  DirectoryToolbar,
  Icon,
  Pagination,
  Row,
  TableFooter,
  ToolbarTitle,
} from '@larch/ui';

export const title = 'With toolbar and footer';
export const layout = 'canvas';

const PROJECTS = [
  { name: 'Website redesign', type: 'Product design', client: 'Aperture Labs', status: ['On track', 'active'], due: 'Nov 12' },
  { name: 'Campaign launch', type: 'Marketing', client: 'Harbor & Co.', status: ['At risk', 'priority'], due: 'Nov 05' },
];

export default function ToolbarFooter() {
  return (
    <DirectoryCard>
      <DirectoryToolbar>
        <ToolbarTitle title="All projects" subtitle="28 active engagements across 19 clients." />
        <Button variant="ghost" aria-label="Project view settings">
          <Icon name="settings" size="sm" />
        </Button>
      </DirectoryToolbar>
      <DirectoryTable headers={['Project', 'Client', 'Status', 'Due date']} minWidth={560}>
        {PROJECTS.map((p) => (
          <Row key={p.name}>
            <Cell>
              <CellTitle title={p.name} caption={p.type} />
            </Cell>
            <Cell>{p.client}</Cell>
            <Cell>
              <Badge variant={p.status[1]}>{p.status[0]}</Badge>
            </Cell>
            <Cell>{p.due}</Cell>
          </Row>
        ))}
      </DirectoryTable>
      <TableFooter pagination={<Pagination onNext={() => {}} />}>
        <span>1 to 2 of 28 projects</span>
      </TableFooter>
    </DirectoryCard>
  );
}
