import { Legend } from '../components/Legend.jsx';

const BAR = {
  blue: 'from-[#77a0ff] to-[#1d5bff]',
  green: 'from-[#6cdbab] to-[#16845b]',
  amber: 'from-[#f1cb79] to-[#b77916]',
  red: 'from-[#ff9aa4] to-[#c63d4f]',
  violet: 'from-[#c4b0f5] to-[#7052bb]',
};

/**
 * Category bar chart with gridlines and an optional legend (client health, pipeline stages).
 * `data`: [{ label, value, height (0–100), tone }].
 */
export function HealthChart({ data, legend = true }) {
  return (
    <>
      <div
        className="grid h-[188px] items-end gap-[14px] border-b border-line pt-3 [background:repeating-linear-gradient(to_bottom,transparent_0,transparent_46px,var(--line)_47px)]"
        style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
      >
        {data.map((d) => (
          <div key={d.label} className="flex h-full flex-col justify-end gap-2">
            <div
              role="img"
              aria-label={`${d.label}: ${d.value}`}
              className={`min-h-3 rounded-t-[5px] bg-gradient-to-b ${BAR[d.tone]}`}
              style={{ height: `${d.height}%` }}
            />
            <div className="flex justify-between text-[10px] text-[#9399a2] dark:text-[#858e9a]">
              <span>{d.label}</span>
              <strong>{d.value}</strong>
            </div>
          </div>
        ))}
      </div>
      {legend && <Legend className="pt-[15px]" items={data.map((d) => ({ label: d.label, tone: d.tone }))} />}
    </>
  );
}

/** Time-series bar chart: `bars` is [[label, heightPercent], …]. */
export function BarChart({ bars, tone = 'blue' }) {
  return (
    <div className="mb-6 flex h-[260px] items-end gap-[14px] border-b border-line px-[3px] pt-[15px] [background:repeating-linear-gradient(to_bottom,transparent_0,transparent_60px,var(--line)_61px)] mobile:gap-2">
      {bars.map(([label, height]) => (
        <div
          key={label}
          role="img"
          aria-label={`${label}: ${height}%`}
          className={`relative min-w-4 flex-1 rounded-t-[5px] bg-gradient-to-b ${BAR[tone]}`}
          style={{ height: `${height}%` }}
        >
          <span className="absolute left-1/2 top-[calc(100%+9px)] -translate-x-1/2 text-[10px] text-[#999ea7]">{label}</span>
        </div>
      ))}
    </div>
  );
}
