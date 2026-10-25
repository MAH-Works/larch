import { Panel, PanelGrid } from '@compass/ui';

export const title = 'PanelGrid';
export const description = 'wide (1.6fr / .9fr) is the default; report and even are alternatives. Grids stack below 980px and consecutive grids get a 16px gap.';
export const layout = 'canvas';

const Box = () => <div className="h-20 rounded-[7px] border border-dashed border-line-strong" />;

export default function Grid() {
  return (
    <>
      <PanelGrid>
        <Panel title="wide · main"><Box /></Panel>
        <Panel title="wide · side"><Box /></Panel>
      </PanelGrid>
      <PanelGrid columns="even">
        <Panel title="even"><Box /></Panel>
        <Panel title="even"><Box /></Panel>
      </PanelGrid>
    </>
  );
}
