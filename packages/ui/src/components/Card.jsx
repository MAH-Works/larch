import { Select } from '../base-ui/select.jsx';

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

/**
 * Compact select for a panel header (period / horizon pickers), built on Base UI Select. Starts on the
 * first option; other props (`value`, `defaultValue`, `onValueChange`…) go to Select.Root.
 */
export function PanelSelect({ label, options, className = '', ...props }) {
  return (
    <Select.Root defaultValue={options[0]} {...props}>
      <Select.Trigger
        aria-label={label}
        className={`h-auto w-auto gap-[6px] rounded-[5px] py-[5px] pl-2 pr-[7px] text-[11px] text-[#777d87] dark:text-soft ${className}`}
      >
        <Select.Value />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              {options.map((o) => (
                <Select.Item key={o} value={o}>
                  <Select.ItemText>{o}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
