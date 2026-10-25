import {
  BarChart,
  Breakdown,
  Button,
  Icon,
  Legend,
  MetricGrid,
  PageHeading,
  PageWrap,
  Panel,
  PanelGrid,
  PanelSelect,
  ProgressList,
  StatusList,
  useToast,
} from '@mah-works/larch';
import { REPORT_HEALTH, REPORT_METRICS, REVENUE_BARS, REVENUE_MIX, SAVED_REPORTS } from '../data/workspace.js';

export default function Reports() {
  const { showToast } = useToast();
  return (
    <PageWrap>
      <PageHeading eyebrow="Manage / Performance" title="Reports" description="A clear read on revenue, retention, and delivery velocity.">
        <Button onClick={() => showToast('Date range menu')}>
          <Icon name="calendar" size="sm" />
          Oct 2026
        </Button>
        <Button variant="primary" onClick={() => showToast('Report export started')}>
          <Icon name="download" size="sm" />
          Export
        </Button>
      </PageHeading>

      <MetricGrid items={REPORT_METRICS} />

      <PanelGrid columns="report">
        <Panel
          title="Revenue performance"
          subtitle="Monthly recurring revenue · $k"
          action={<PanelSelect label="Report period" options={['Last 12 months', 'Last 6 months']} />}
        >
          <BarChart bars={REVENUE_BARS} />
          <Legend
            className="pt-[17px]"
            items={[
              { label: 'Recognized revenue', tone: 'blue' },
              { label: 'Expansion', tone: 'violet' },
            ]}
          />
        </Panel>

        <Panel title="Revenue mix" subtitle="By client segment">
          <Breakdown items={REVENUE_MIX} />
        </Panel>
      </PanelGrid>

      <PanelGrid>
        <Panel
          title="Saved reports"
          subtitle="Shared with your workspace."
          action={
            <Button variant="ghost" onClick={() => showToast('Report builder')}>
              Create report <Icon name="plus" size="xs" />
            </Button>
          }
        >
          <StatusList items={SAVED_REPORTS} />
        </Panel>
        <Panel title="Report health" subtitle="Data freshness checks">
          <ProgressList items={REPORT_HEALTH} />
        </Panel>
      </PanelGrid>
    </PageWrap>
  );
}
