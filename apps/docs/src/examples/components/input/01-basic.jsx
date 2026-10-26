import { Input, TextArea } from '@mah-works/larch/input';

export const title = 'Input and TextArea';
export const description =
  'Input is Base UI’s Input with Larch’s 35px control. TextArea is a Larch extension — Base UI’s Input rendered as a `<textarea>` — because Base UI ships no textarea.';
export const layout = 'padded';

export default function Basic() {
  return (
    <div className="flex max-w-[340px] flex-col gap-3">
      <Input aria-label="Search" placeholder="Search clients" />
      <Input aria-label="Invalid" aria-invalid defaultValue="jamie@" />
      <Input aria-label="Disabled" disabled defaultValue="Read only" />
      <TextArea aria-label="Note" placeholder="Add a short note..." />
    </div>
  );
}
