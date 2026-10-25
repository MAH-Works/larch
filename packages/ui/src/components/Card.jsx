/** Base surface: hairline border, 10px radius, barely-there shadow. Polymorphic via `as`. */
export function Card({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`rounded-[10px] border border-line bg-surface shadow-card ${className}`} {...props}>
      {children}
    </Tag>
  );
}

/** Titled content panel with an optional right-aligned `action`. */
export function Panel({ title, subtitle, action, children, className = '' }) {
  return (
    <Card className={`min-w-0 p-5 mobile:p-[17px] ${className}`}>
      <div className="mb-[22px] flex items-start justify-between gap-3">
        <div>
          <h2 className="m-0 text-sm font-[650] tracking-[-.02em] text-ink">{title}</h2>
          {subtitle && <p className="mb-0 mt-[5px] text-[11px] text-[#989da5] dark:text-[#858e9a]">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </Card>
  );
}

const PANEL_COLUMNS = {
  wide: 'grid-cols-[minmax(0,1.6fr)_minmax(300px,.9fr)]',
  report: 'grid-cols-[minmax(0,1.5fr)_minmax(290px,.8fr)]',
  even: 'grid-cols-2',
};

/** Two-column row of panels (wide + narrow by default). Stacks below 980px; consecutive grids get a 16px gap. */
export function PanelGrid({ columns = 'wide', children, className = '' }) {
  return (
    <div className={`grid ${PANEL_COLUMNS[columns]} gap-4 narrow:grid-cols-1 [&+&]:mt-4 ${className}`}>
      {children}
    </div>
  );
}

/** Compact native select for a panel header (period / horizon pickers). */
export function PanelSelect({ label, options, className = '', ...props }) {
  return (
    <select
      aria-label={label}
      className={`rounded-[5px] border border-line-strong bg-surface px-2 py-[5px] text-[11px] text-[#777d87] dark:text-soft ${className}`}
      {...props}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}
