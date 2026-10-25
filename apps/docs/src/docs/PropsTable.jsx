import { C, md } from './CodeBlock.jsx';

/** `props`: [[name, type, default, description]]. */
export function PropsTable({ name, props }) {
  return (
    <div className="mb-8">
      {name && <h3 className="mb-3 mt-0 font-mono text-[13px] font-medium text-ink">{`<${name}>`}</h3>}
      <div className="overflow-x-auto rounded-[10px] border border-line bg-surface">
        <table className="w-full min-w-[620px] border-collapse text-left text-xs">
          <thead>
            <tr className="bg-head text-[11px] text-label">
              {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                <th key={h} className="h-9 border-b border-line px-[14px] font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.map(([prop, type, def, desc]) => (
              <tr key={prop} className="align-top [&:last-child>td]:border-b-0">
                <td className="whitespace-nowrap border-b border-line px-[14px] py-[10px] font-mono text-[11.5px] font-medium text-strong">{prop}</td>
                <td className="border-b border-line px-[14px] py-[10px] font-mono text-[11px] text-violet">{type}</td>
                <td className="whitespace-nowrap border-b border-line px-[14px] py-[10px]">{def ? <C>{def}</C> : <span className="text-faint">—</span>}</td>
                <td className="border-b border-line px-[14px] py-[10px] leading-relaxed text-body">{md(desc)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
