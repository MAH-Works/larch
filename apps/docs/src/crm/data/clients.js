// Helpers keep the table rows readable.
const av = (initials, tone) => ({ initials, tone });
const row = (name, domain, mark, status, tag, avatars, projects, tasks, billing, extra = {}) => ({
  id: name,
  name,
  domain,
  mark,
  status, // [label, badge variant]
  tag, // [label, badge variant] | null
  avatars,
  projects,
  tasks,
  billing,
  ...extra,
});

const BASE = [
  row('Aperture Labs', 'aperture.test', 'sky', ['Active', 'active'], ['VIP', 'vip'], [av('JD', 'blue'), av('MC', 'coral')], 12, 48, '$24.8k'),
  row('Northstar Health', 'northstar.health', 'lime', ['Onboarding', 'onboarding'], ['High Priority', 'priority'], [av('AS', 'green')], 4, 17, '$8.4k'),
  row('Parallax Studio', 'parallax.studio', 'violet', ['Active', 'active'], ['Long-term', 'longterm'], [av('RB', 'purple'), av('+1', 'sand')], 8, 31, '$16.2k', { selected: true }),
  row('Vercel Systems', 'vercel.systems', 'yellow', ['Trial', 'trial'], ['Growth', 'blue'], [av('LM', 'coral')], 2, 8, '$2.1k'),
  row('Harbor & Co.', 'harborco.com', 'rose', ['Active', 'active'], ['Low Priority', 'low'], [av('KF', 'sand'), av('+2', 'blue')], 19, 74, '$38.9k'),
  row('Cedar & Finch', 'cedarfinch.co', 'blue', ['Inactive', 'inactive'], ['VIP', 'vip'], [av('TS', 'green')], 6, 12, '$9.6k'),
  row('Meridian Works', 'meridian.works', 'slate', ['Archived', 'archived'], null, [av('-', 'purple')], 3, '-', '$4.2k'),
  row('Orbit Goods', 'orbitgoods.io', 'sky', ['Active', 'active'], ['High Priority', 'priority'], [av('EC', 'blue'), av('+2', 'green')], 15, 56, '$21.3k'),
  row('Rivet Finance', 'rivet.finance', 'violet', ['Onboarding', 'onboarding'], ['Long-term', 'longterm'], [av('JM', 'coral')], 5, 22, '$12.7k'),
  row('Fieldwork', 'fieldwork.design', 'lime', ['Trial', 'trial'], ['Low Priority', 'low'], [av('NL', 'sand')], 1, 4, '$1.8k'),
];

// The original script appended these ten rows so the table always shows 20.
// [name, mark, status, tag, avatar tone, initials, projects, tasks, billing]
const EXTRA = [
  ['Clover Point', 'yellow', ['Active', 'active'], ['VIP', 'vip'], 'blue', 'CP', 7, 29, '$14.5k'],
  ['Juniper House', 'lime', ['Onboarding', 'onboarding'], ['Long-term', 'longterm'], 'green', 'JH', 3, 11, '$6.9k'],
  ['Morrow Labs', 'slate', ['Inactive', 'inactive'], null, 'sand', 'ML', 2, 5, '$3.1k'],
  ['Sonder Retail', 'rose', ['Active', 'active'], ['High Priority', 'priority'], 'coral', 'SR', 11, 42, '$19.8k'],
  ['Tangent AI', 'blue', ['Trial', 'trial'], ['Growth', 'blue'], 'purple', 'TA', 1, 6, '$2.4k'],
  ['Vale Partners', 'violet', ['Active', 'active'], ['Low Priority', 'low'], 'blue', 'VP', 9, 36, '$17.2k'],
  ['Westward Media', 'sky', ['Onboarding', 'onboarding'], ['VIP', 'vip'], 'coral', 'WM', 5, 18, '$7.8k'],
  ['Yarrow Group', 'yellow', ['Archived', 'archived'], null, 'green', 'YG', 2, '-', '$1.9k'],
  ['Zephyr Mobile', 'lime', ['Active', 'active'], ['Long-term', 'longterm'], 'sand', 'ZM', 14, 61, '$27.6k'],
  ['Atlas North', 'violet', ['Trial', 'trial'], ['High Priority', 'priority'], 'purple', 'AN', 2, 9, '$4.8k'],
].map(([name, mark, status, tag, tone, initials, projects, tasks, billing]) =>
  row(name, `${name.toLowerCase().replaceAll(' ', '')}.co`, mark, status, tag, [av(initials, tone)], projects, tasks, billing),
);

export const CLIENTS = [...BASE, ...EXTRA];
export const CLIENT_TOTAL = 37;
