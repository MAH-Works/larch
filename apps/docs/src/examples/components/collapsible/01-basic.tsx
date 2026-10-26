import { Collapsible } from '@mah-works/larch/collapsible';

export const title = 'Basic';
export const description = 'A single disclosure. The panel animates from `--collapsible-panel-height`.';
export const layout = 'padded';

export default function Basic() {
  return (
    <Collapsible.Root className="max-w-[360px]">
      <Collapsible.Trigger>3 archived projects</Collapsible.Trigger>
      <Collapsible.Panel>
        <ul className="m-0 flex list-disc flex-col gap-1 pb-1 pl-5 pt-3">
          <li>Brand refresh 2023</li>
          <li>Holiday campaign</li>
          <li>Legacy CRM migration</li>
        </ul>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
