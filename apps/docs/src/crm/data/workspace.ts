import type {
  AccountItemProps,
  ActivityItem,
  AvatarStackItem,
  BadgeVariant,
  BreakdownItem,
  ClientMarkTone,
  HealthDatum,
  MetricCardProps,
  ProgressRowProps,
  ProjectCardProps,
} from '@mah-works/larch';

type Pill = [label: string, variant: BadgeVariant];

export interface Contact {
  initials: string;
  tone: NonNullable<AvatarStackItem['tone']>;
  name: string;
  email: string;
  company: string;
  role: string;
  last: string;
  status: Pill;
  owner: string;
}

export interface Project {
  name: string;
  type: string;
  client: string;
  status: Pill;
  owner: string;
  due: string;
  progress: string;
}

export interface AcmeAccount {
  initial: string;
  mark: ClientMarkTone;
  name: string;
  meta: string;
  health: Pill;
  owner: string;
  projects: number;
  next: string;
  value: string;
}

export interface SavedReport {
  name: string;
  meta: string;
  badge?: Pill;
}

// Static demo data for the secondary pages. Swap these for API calls when wiring a backend.

export const OVERVIEW_METRICS: MetricCardProps[] = [
  { label: 'Active clients', value: '24', meta: [{ text: '↗ 8.3%', trend: 'up' }, { text: 'vs. last month' }] },
  { label: 'Projects in motion', value: '84', meta: [{ text: '↗ 12.5%', trend: 'up' }, { text: 'vs. last month' }] },
  { label: 'Open tasks', value: '327', meta: [{ text: '↘ 4.1%', trend: 'down' }, { text: 'vs. last month' }] },
  { label: 'Revenue this month', value: '$184.2k', meta: [{ text: '↗ 16.8%', trend: 'up' }, { text: 'vs. last month' }] },
];

// Client health bars: height is a % of the chart.
export const HEALTH: HealthDatum[] = [
  { label: 'Good', value: 24, height: 78, tone: 'green' },
  { label: 'Stable', value: 8, height: 58, tone: 'blue' },
  { label: 'Watch', value: 4, height: 34, tone: 'amber' },
  { label: 'Risk', value: 1, height: 18, tone: 'red' },
];

export const UPCOMING_RENEWALS: AccountItemProps[] = [
  { name: 'Aperture Labs', mark: 'sky', meta: 'Renews in 4 days', value: '$24.8k' },
  { name: 'Parallax Studio', mark: 'violet', meta: 'Renews in 11 days', value: '$16.2k' },
  { name: 'Northstar Health', mark: 'lime', meta: 'Renews in 21 days', value: '$8.4k' },
];

export const ACTIVITY: ActivityItem[] = [
  { icon: 'check', who: 'Jamie Chen', text: 'completed the onboarding brief for Aperture Labs.', time: '12 minutes ago' },
  { icon: 'plus', who: 'Maria Costa', text: 'added a new project to Parallax Studio.', time: '46 minutes ago' },
  { icon: 'checkSmall', who: 'You', text: 'moved Northstar Health to onboarding.', time: '2 hours ago' },
];

export const WORKLOAD: ProgressRowProps[] = [
  { label: 'Jamie Chen', value: 42, percent: 78, tone: 'blue' },
  { label: 'Maria Costa', value: 35, percent: 64, tone: 'green' },
  { label: 'Alex Singh', value: 26, percent: 48, tone: 'amber' },
  { label: 'Riley Brown', value: 19, percent: 35, tone: 'violet' },
];

export const CONTACTS: Contact[] = [
  { initials: 'JD', tone: 'blue', name: 'Jamie Davis', email: 'jamie@aperture.test', company: 'Aperture Labs', role: 'Head of Product', last: 'Today, 9:42 am', status: ['Active', 'active'], owner: 'Maria Costa' },
  { initials: 'MC', tone: 'coral', name: 'Maria Costa', email: 'maria@parallax.studio', company: 'Parallax Studio', role: 'Founder', last: 'Yesterday', status: ['VIP', 'vip'], owner: 'Alex Singh' },
  { initials: 'AS', tone: 'green', name: 'Alex Singh', email: 'alex@northstar.health', company: 'Northstar Health', role: 'Operations lead', last: 'Oct 21, 2026', status: ['Onboarding', 'onboarding'], owner: 'Jamie Chen' },
  { initials: 'KF', tone: 'sand', name: 'Kelly Foster', email: 'kelly@harborco.com', company: 'Harbor & Co.', role: 'Creative director', last: 'Oct 18, 2026', status: ['Active', 'active'], owner: 'Maria Costa' },
  { initials: 'RB', tone: 'purple', name: 'Riley Brown', email: 'riley@rivet.finance', company: 'Rivet Finance', role: 'VP Marketing', last: 'Oct 14, 2026', status: ['Trial', 'trial'], owner: 'Alex Singh' },
  { initials: 'TS', tone: 'blue', name: 'Taylor Smith', email: 'taylor@cedarfinch.co', company: 'Cedar & Finch', role: 'Account manager', last: 'Oct 10, 2026', status: ['Inactive', 'inactive'], owner: 'Jamie Chen' },
];

export const PROJECT_CARDS: ProjectCardProps[] = [
  { name: 'Website redesign', client: 'Aperture Labs · Product design', status: ['On track', 'active'], progress: 78, tone: 'blue', due: 'Due Nov 12', people: [{ initials: 'JD', tone: 'blue' }, { initials: 'MC', tone: 'coral' }, { initials: '+2', tone: 'muted' }] },
  { name: 'Brand system', client: 'Northstar Health · Strategy', status: ['Starting', 'onboarding'], progress: 34, tone: 'green', due: 'Due Nov 24', people: [{ initials: 'AS', tone: 'green' }, { initials: 'RB', tone: 'purple' }] },
  { name: 'Campaign launch', client: 'Harbor & Co. · Marketing', status: ['At risk', 'priority'], progress: 52, tone: 'amber', due: 'Due Nov 05', people: [{ initials: 'KF', tone: 'sand' }, { initials: 'TS', tone: 'blue' }] },
];

export const PROJECTS: Project[] = [
  { name: 'Website redesign', type: 'Product design', client: 'Aperture Labs', status: ['On track', 'active'], owner: 'Jamie Chen', due: 'Nov 12, 2026', progress: '78%' },
  { name: 'Brand system', type: 'Strategy', client: 'Northstar Health', status: ['Starting', 'onboarding'], owner: 'Alex Singh', due: 'Nov 24, 2026', progress: '34%' },
  { name: 'Campaign launch', type: 'Marketing', client: 'Harbor & Co.', status: ['At risk', 'priority'], owner: 'Maria Costa', due: 'Nov 05, 2026', progress: '52%' },
  { name: 'Mobile app audit', type: 'Research', client: 'Parallax Studio', status: ['Planning', 'trial'], owner: 'Riley Brown', due: 'Dec 02, 2026', progress: '14%' },
];

export const ACME_METRICS: MetricCardProps[] = [
  { label: 'Saved clients', value: '8', meta: [{ text: 'Across 5 owners' }] },
  { label: 'Open projects', value: '31', meta: [{ text: '↗ 3 this week', trend: 'up' }] },
  { label: 'Annual value', value: '$412k', meta: [{ text: '↗ 11.2%', trend: 'up' }, { text: 'vs. last quarter' }] },
  { label: 'Needs attention', value: '2', meta: [{ text: '2 accounts', trend: 'down' }, { text: 'need follow-up' }] },
];

export const ACME_ACCOUNTS: AcmeAccount[] = [
  { initial: 'A', mark: 'sky', name: 'Aperture Labs', meta: 'Enterprise · aperture.test', health: ['Healthy', 'active'], owner: 'Maria Costa', projects: 12, next: 'Today', value: '$124.8k' },
  { initial: 'P', mark: 'violet', name: 'Parallax Studio', meta: 'Growth · parallax.studio', health: ['Healthy', 'active'], owner: 'Alex Singh', projects: 8, next: 'Oct 28', value: '$96.2k' },
  { initial: 'N', mark: 'lime', name: 'Northstar Health', meta: 'Growth · northstar.health', health: ['Onboarding', 'onboarding'], owner: 'Jamie Chen', projects: 4, next: 'Oct 25', value: '$84.4k' },
  { initial: 'H', mark: 'rose', name: 'Harbor & Co.', meta: 'Enterprise · harborco.com', health: ['Watch', 'priority'], owner: 'Maria Costa', projects: 5, next: 'Oct 26', value: '$72.9k' },
];

export const RENEWAL_METRICS: MetricCardProps[] = [
  { label: 'Renewing soon', value: '12', meta: [{ text: 'Next 90 days' }] },
  { label: 'Renewal value', value: '$286k', meta: [{ text: '↗ 8.4%', trend: 'up' }, { text: 'vs. last quarter' }] },
  { label: 'At risk', value: '2', meta: [{ text: '$34.1k', trend: 'down' }, { text: 'annual value' }] },
  { label: 'Won this quarter', value: '$148k', meta: [{ text: '↗ 12.6%', trend: 'up' }, { text: 'vs. last quarter' }] },
];

export const RENEWAL_CALENDAR: AccountItemProps[] = [
  { name: 'Aperture Labs', mark: 'sky', meta: 'Oct 28 · Maria Costa · 4 days left', badge: ['Healthy', 'active'], value: '$24.8k' },
  { name: 'Parallax Studio', mark: 'violet', meta: 'Nov 04 · Alex Singh · 11 days left', badge: ['Healthy', 'active'], value: '$16.2k' },
  { name: 'Harbor & Co.', mark: 'rose', meta: 'Nov 09 · Maria Costa · 16 days left', badge: ['Watch', 'priority'], value: '$38.9k' },
  { name: 'Northstar Health', mark: 'lime', meta: 'Nov 14 · Jamie Chen · 21 days left', badge: ['Onboarding', 'onboarding'], value: '$8.4k' },
  { name: 'Cedar & Finch', mark: 'blue', meta: 'Dec 01 · Jamie Chen · 38 days left', badge: ['Inactive', 'inactive'], value: '$9.6k' },
];

export const PLAYBOOK: ProgressRowProps[] = [
  { label: 'Discovery', value: '86%', percent: 86, tone: 'green' },
  { label: 'Proposal', value: '64%', percent: 64, tone: 'blue' },
  { label: 'Negotiation', value: '42%', percent: 42, tone: 'amber' },
  { label: 'Contract', value: '28%', percent: 28, tone: 'violet' },
];

export const REPORT_METRICS: MetricCardProps[] = [
  { label: 'Net revenue', value: '$1.28m', meta: [{ text: '↗ 14.2%', trend: 'up' }, { text: 'year over year' }] },
  { label: 'Retention', value: '94.8%', meta: [{ text: '↗ 2.1%', trend: 'up' }, { text: 'year over year' }] },
  { label: 'Avg. project value', value: '$18.4k', meta: [{ text: '↗ 6.7%', trend: 'up' }, { text: 'year over year' }] },
  { label: 'Delivery on time', value: '87%', meta: [{ text: '↘ 1.4%', trend: 'down' }, { text: 'year over year' }] },
];

// Monthly recurring revenue bars (height = % of chart).
export const REVENUE_BARS: [label: string, heightPercent: number][] = [
  ['Nov', 44], ['Dec', 51], ['Jan', 49], ['Feb', 60], ['Mar', 58], ['Apr', 71],
  ['May', 68], ['Jun', 76], ['Jul', 73], ['Aug', 85], ['Sep', 81], ['Oct', 94],
];

export const REVENUE_MIX: BreakdownItem[] = [
  { label: 'Enterprise', amount: '$614k', share: 48, tone: 'blue' },
  { label: 'Growth', amount: '$320k', share: 25, tone: 'violet' },
  { label: 'Scale', amount: '$218k', share: 17, tone: 'green' },
  { label: 'Startup', amount: '$128k', share: 10, tone: 'amber' },
];

export const SAVED_REPORTS: SavedReport[] = [
  { name: 'Monthly client health', meta: 'Updated 2 hours ago · 4 viewers', badge: ['Ready', 'active'] },
  { name: 'Renewal forecast', meta: 'Updated yesterday · 6 viewers', badge: ['Shared', 'blue'] },
  { name: 'Delivery capacity', meta: 'Updated Oct 20 · 3 viewers', badge: ['Draft', 'inactive'] },
];

export const REPORT_HEALTH: ProgressRowProps[] = [
  { label: 'Client data', value: '100%', percent: 100, tone: 'green' },
  { label: 'Billing data', value: '96%', percent: 96, tone: 'green' },
  { label: 'Task data', value: '84%', percent: 84, tone: 'amber' },
];
