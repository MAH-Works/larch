import Badge from '../components/Badge.jsx';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import { ToolbarDivider } from '../components/Typography.jsx';

/**
 * Bulk-action strip above a selectable table.
 * `actions` / `tools`: [{ label, icon?, danger?, badge?, iconOnly?, onClick }].
 * Actions sit left with the "N selected" count; tools (filter, sort, view) sit right.
 */
export function SelectionToolbar({ actions = [], tools = [], selectedCount = 0, emptyLabel = 'Select rows', className = '' }) {
  const render = (a) => (
    <Button
      key={a.label}
      variant={a.danger ? 'ghostDanger' : 'ghost'}
      aria-label={a.iconOnly ? a.label : undefined}
      onClick={a.onClick}
    >
      {a.icon && <Icon name={a.icon} size="sm" />}
      {!a.iconOnly && a.label}
      {a.badge != null && (
        <Badge variant="blue" count>
          {a.badge}
        </Badge>
      )}
    </Button>
  );

  return (
    <div
      className={`flex min-h-[52px] flex-none items-center justify-between gap-[18px] border-b border-line px-[18px] mobile:flex-col mobile:items-start mobile:gap-[3px] mobile:px-[13px] mobile:py-2 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-[3px]">
        {actions.map(render)}
        {actions.length > 0 && (
          <>
            <ToolbarDivider />
            <span className="text-[11px] text-[#a0a4ab]">{selectedCount ? `${selectedCount} selected` : emptyLabel}</span>
          </>
        )}
      </div>
      {tools.length > 0 && <div className="flex flex-wrap items-center gap-[3px]">{tools.map(render)}</div>}
    </div>
  );
}
