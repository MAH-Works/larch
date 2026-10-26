import { Autocomplete } from '@mah-works/larch/autocomplete';

export const title = 'Search suggestions';
export const description = 'Unlike Combobox, the value is the free text; suggestions only fill it in. The Input works standalone.';
export const layout = 'padded';

const SEARCHES = ['renewals this quarter', 'at-risk clients', 'overdue invoices', 'onboarding projects', 'VIP contacts'];

export default function Basic() {
  return (
    <Autocomplete.Root items={SEARCHES}>
      <label className="flex max-w-[320px] flex-col gap-[6px] text-[11px] font-semibold text-[#5f656e] dark:text-[#8a939f]">
        Search the workspace
        <Autocomplete.Input placeholder="e.g. renewals" />
      </label>
      <Autocomplete.Portal>
        <Autocomplete.Positioner sideOffset={6}>
          <Autocomplete.Popup>
            <Autocomplete.Empty>No suggestions.</Autocomplete.Empty>
            <Autocomplete.List>
              {(item) => (
                <Autocomplete.Item key={item} value={item}>
                  {item}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}
