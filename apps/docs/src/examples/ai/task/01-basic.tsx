import { Task } from '@mah-works/larch/ai';

export const title = 'Basic';
export const description = 'Steps can link to what they touched. Present tense while running, past tense when done.';
export const layout = 'padded';

export default function Basic() {
  return (
    <div className="max-w-[440px]">
      <Task
        title="Updating the page metadata"
        steps={[
          { title: 'Searched for generateMetadata', icon: 'search' },
          { title: 'Read app/clients/page.tsx', icon: 'file', href: '#clients-page' },
          { title: 'Updating the title template', status: 'running' },
        ]}
      />
    </div>
  );
}
