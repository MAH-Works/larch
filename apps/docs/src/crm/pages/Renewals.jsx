import {
  AccountItem,
  Button,
  Icon,
  MetricGrid,
  PageHeading,
  PageWrap,
  Panel,
  PanelGrid,
  PanelSelect,
  ProgressList,
  useToast,
} from '@mah-works/larch';
import { PLAYBOOK, RENEWAL_CALENDAR, RENEWAL_METRICS } from '../data/workspace.js';

export default function Renewals() {
  const { showToast } = useToast();
  return (
    <PageWrap>
      <PageHeading eyebrow="Favorites / Customer success" title="Renewals" description="Stay ahead of every contract conversation and expansion opportunity.">
        <Button onClick={() => showToast('Renewal filters')}>
          <Icon name="filter" size="sm" />
          Filter
        </Button>
        <Button variant="primary" onClick={() => showToast('Renewal export started')}>
          <Icon name="download" size="sm" />
          Export
        </Button>
      </PageHeading>

      <MetricGrid items={RENEWAL_METRICS} />

      <PanelGrid>
        <Panel
          title="Renewal calendar"
          subtitle="Prioritized by date and account health."
          action={<PanelSelect label="Renewal horizon" options={['Next 90 days', 'Next 6 months']} />}
        >
          {RENEWAL_CALENDAR.map((r) => (
            <AccountItem key={r.name} {...r} />
          ))}
        </Panel>
        <Panel title="Playbook progress" subtitle="Renewals with next steps assigned.">
          <ProgressList items={PLAYBOOK} />
        </Panel>
      </PanelGrid>
    </PageWrap>
  );
}
