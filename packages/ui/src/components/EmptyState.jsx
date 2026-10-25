import Icon from './Icon.jsx';

/** A quiet answer when there is no data. `action` renders below the copy. */
export function EmptyState({ icon = 'document', title, description, action, className = '' }) {
  return (
    <div
      className={`flex min-h-[173px] flex-col items-center justify-center rounded-[7px] border border-dashed border-[#dfe2e6] p-5 text-center text-[#989da5] dark:border-[#3b444f] dark:text-[#858e9a] ${className}`}
    >
      <div className="mb-[11px] grid size-9 place-items-center rounded-[10px] bg-[#f2f3f5] text-[#90959e] dark:bg-[#20262e] dark:text-[#9ca5b1]">
        <Icon name={icon} />
      </div>
      <strong className="text-xs text-[#646972] dark:text-[#c2c9d2]">{title}</strong>
      {description && <span className="mt-1 text-[11px]">{description}</span>}
      {action && <div className="mt-[14px]">{action}</div>}
    </div>
  );
}
