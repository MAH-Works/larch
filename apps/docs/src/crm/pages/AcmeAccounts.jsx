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
  MetricGrid,
  MoreButton,
  PageHeading,
  PageWrap,
  Row,
  ToolbarTitle,
  useToast,
} from '@compass/ui';
import { ACME_ACCOUNTS, ACME_METRICS } from '../data/workspace.js';

export default function AcmeAccounts() {
  const { showToast } = useToast();
  return (
    <PageWrap>
      <PageHeading eyebrow="Favorites / Saved view" title="Acme accounts" description="Your highest-priority client relationships in one focused view.">
        <Button onClick={() => showToast('Favorite view settings')}>
          <Icon name="settings" size="sm" />
          Customize
        </Button>
      </PageHeading>

      <MetricGrid items={ACME_METRICS} />

      <DirectoryCard>
        <DirectoryToolbar>
          <ToolbarTitle title="Saved accounts" subtitle="A curated view of the accounts your team checks most." />
          <Button variant="ghost" aria-label="Account view settings" onClick={() => showToast('Account view settings')}>
            <Icon name="settings" size="sm" />
          </Button>
        </DirectoryToolbar>

        <DirectoryTable headers={['Account', 'Health', 'Owner', 'Open projects', 'Next touch', 'Annual value', '']}>
          {ACME_ACCOUNTS.map((a) => (
            <Row key={a.name}>
              <Cell>
                <CellTitle leading={<ClientMark tone={a.mark}>{a.initial}</ClientMark>} title={a.name} caption={a.meta} />
              </Cell>
              <Cell>
                <Badge variant={a.health[1]}>{a.health[0]}</Badge>
              </Cell>
              <Cell>{a.owner}</Cell>
              <Cell>{a.projects}</Cell>
              <Cell>{a.next}</Cell>
              <Cell>{a.value}</Cell>
              <Cell>
                <MoreButton label={`More actions for ${a.name}`} />
              </Cell>
            </Row>
          ))}
        </DirectoryTable>
      </DirectoryCard>
    </PageWrap>
  );
}
