import {
  Badge,
  Button,
  Cell,
  CellTitle,
  ClientMark,
  DirectoryCard,
  DirectoryTable,
  DirectoryToolbar,
  Icon,
  MoreButton,
  Row,
  ToolbarTitle,
} from '@mah-works/larch';

export const title = 'Accounts with a titled toolbar';
export const layout = 'canvas';

const ACCOUNTS = [
  { initial: 'A', mark: 'sky', name: 'Aperture Labs', meta: 'Enterprise · aperture.test', health: ['Healthy', 'active'], owner: 'Maria Costa', projects: 12, value: '$124.8k' },
  { initial: 'N', mark: 'lime', name: 'Northstar Health', meta: 'Growth · northstar.health', health: ['Onboarding', 'onboarding'], owner: 'Jamie Chen', projects: 4, value: '$84.4k' },
  { initial: 'H', mark: 'rose', name: 'Harbor & Co.', meta: 'Enterprise · harborco.com', health: ['Watch', 'priority'], owner: 'Maria Costa', projects: 5, value: '$72.9k' },
] as const;

export default function Accounts() {
  return (
    <DirectoryCard>
      <DirectoryToolbar>
        <ToolbarTitle title="Saved accounts" subtitle="A curated view of the accounts your team checks most." />
        <Button variant="ghost" aria-label="Account view settings">
          <Icon name="settings" size="sm" />
        </Button>
      </DirectoryToolbar>
      <DirectoryTable headers={['Account', 'Health', 'Owner', 'Open projects', 'Annual value', '']}>
        {ACCOUNTS.map((a) => (
          <Row key={a.name}>
            <Cell>
              <CellTitle leading={<ClientMark tone={a.mark}>{a.initial}</ClientMark>} title={a.name} caption={a.meta} />
            </Cell>
            <Cell>
              <Badge variant={a.health[1]}>{a.health[0]}</Badge>
            </Cell>
            <Cell>{a.owner}</Cell>
            <Cell>{a.projects}</Cell>
            <Cell>{a.value}</Cell>
            <Cell>
              <MoreButton label={`More actions for ${a.name}`} />
            </Cell>
          </Row>
        ))}
      </DirectoryTable>
    </DirectoryCard>
  );
}
