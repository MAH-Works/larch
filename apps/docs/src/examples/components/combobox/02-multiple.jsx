import { Combobox } from '@mah-works/larch/combobox';
import { Field } from '@mah-works/larch/field';

export const title = 'Multiple with chips';
export const description = '`multiple` keeps an array value; Combobox.Chips render the selection as Larch pills with a remove button.';
export const layout = 'padded';

const TAGS = ['VIP', 'High priority', 'Low priority', 'Long-term', 'Enterprise', 'Agency', 'Healthcare'];

export default function Multiple() {
  return (
    <Field.Root className="max-w-[360px]">
      <Field.Label>Tags</Field.Label>
      <Combobox.Root items={TAGS} multiple defaultValue={['VIP', 'Enterprise']}>
        <Combobox.InputGroup>
          <Combobox.Chips>
            <Combobox.Value>
              {(values) => (
                <>
                  {values.map((tag) => (
                    <Combobox.Chip key={tag} aria-label={tag}>
                      {tag}
                      <Combobox.ChipRemove aria-label={`Remove ${tag}`} />
                    </Combobox.Chip>
                  ))}
                  <Combobox.Input placeholder={values.length ? '' : 'Add tags'} />
                </>
              )}
            </Combobox.Value>
          </Combobox.Chips>
        </Combobox.InputGroup>
        <Combobox.Portal>
          <Combobox.Positioner sideOffset={6}>
            <Combobox.Popup>
              <Combobox.Empty>No tags match.</Combobox.Empty>
              <Combobox.List>
                {(tag) => (
                  <Combobox.Item key={tag} value={tag}>
                    {tag}
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </Field.Root>
  );
}
