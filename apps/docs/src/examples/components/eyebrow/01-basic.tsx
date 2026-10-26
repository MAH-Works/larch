import { Eyebrow } from '@mah-works/larch';

export const title = 'Basic';
export const layout = 'padded';

export default function Basic() {
  return (
    <div className="max-w-[420px]">
      <Eyebrow>Form fields</Eyebrow>
      <p className="mb-0 mt-2 text-xs text-muted">Group related controls under a quiet uppercase label.</p>
    </div>
  );
}
