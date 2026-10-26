import { Checkpoint } from '@mah-works/larch/ai';
import { Toast } from '@mah-works/larch';

export const title = 'Basic';
export const layout = 'padded';

export default function Basic() {
  const toastManager = Toast.useToastManager();
  return (
    <div className="max-w-[520px]">
      <Checkpoint label="Button renamed" onRestore={() => toastManager.add({ title: 'Restored to “Button renamed”' })} />
    </div>
  );
}
