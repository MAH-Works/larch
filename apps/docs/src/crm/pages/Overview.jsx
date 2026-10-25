import { Link } from 'react-router-dom';
import {
  AccountItem,
  ActivityList,
  Button,
  HealthChart,
  Icon,
  MetricGrid,
  PageHeading,
  PageWrap,
  Panel,
  PanelGrid,
  PanelLink,
  PanelSelect,
  ProgressList,
  useToast,
} from '@mah-works/larch';
import { ACTIVITY, HEALTH, OVERVIEW_METRICS, UPCOMING_RENEWALS, WORKLOAD } from '../data/workspace.js';

export default function Overview() {
  const { showToast } = useToast();
  return (
    <PageWrap>
      <PageHeading
        eyebrow="Monday, October 24, 2026"
        title="Good morning, Mohamad"
        description="Here is what is happening across your client workspace."
      >
        <Button onClick={() => showToast('Date range menu')}>
          <Icon name="calendar" size="sm" />
          Last 30 days
        </Button>
        <Button variant="primary" onClick={() => showToast('Report export started')}>
          <Icon name="download" size="sm" />
          Export
        </Button>
      </PageHeading>

      <MetricGrid items={OVERVIEW_METRICS} />

      <PanelGrid>
        <Panel
          title="Client health"
          subtitle="Portfolio sentiment across the last four weeks."
          action={<PanelSelect label="Health period" options={['4 weeks', '3 months']} />}
        >
          <HealthChart data={HEALTH} />
        </Panel>
        <Panel
          title="Upcoming renewals"
          subtitle="Next 30 days"
          action={
            <PanelLink as={Link} to="/examples/crm/renewals">
              View all
            </PanelLink>
          }
        >
          {UPCOMING_RENEWALS.map((r) => (
            <AccountItem key={r.name} {...r} />
          ))}
        </Panel>
      </PanelGrid>

      <PanelGrid>
        <Panel
          title="Recent activity"
          subtitle="Latest updates from your team."
          action={
            <PanelLink as={Link} to="/examples/crm/contacts">
              See activity
            </PanelLink>
          }
        >
          <ActivityList items={ACTIVITY} />
        </Panel>
        <Panel title="Team workload" subtitle="Tasks by owner">
          <ProgressList items={WORKLOAD} />
        </Panel>
      </PanelGrid>
    </PageWrap>
  );
}
