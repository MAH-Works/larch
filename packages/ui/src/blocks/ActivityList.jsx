import Icon from '../components/Icon.jsx';

/** Vertical timeline of events. `items`: [{ icon, who, text, time }]. */
export function ActivityList({ items }) {
  return (
    <ol className="m-0 flex list-none flex-col p-0">
      {items.map((a, i) => {
        const last = i === items.length - 1;
        return (
          <li key={i} className={`relative flex gap-3 ${last ? '' : 'pb-[17px]'}`}>
            <span className="z-1 grid size-[25px] shrink-0 place-items-center rounded-full bg-blue-soft text-blue">
              <Icon name={a.icon} size="xs" />
            </span>
            {!last && <span aria-hidden="true" className="absolute bottom-0 left-3 top-[27px] w-px bg-line" />}
            <div className="pt-[2px]">
              <span className="text-xs leading-[1.45] text-[#7d838d]">
                <strong className="font-semibold text-[#3a3f47] dark:text-[#e0e5eb]">{a.who}</strong> {a.text}
              </span>
              <small className="mt-1 block text-[10px] text-[#a0a5ad] dark:text-[#858e9a]">{a.time}</small>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
