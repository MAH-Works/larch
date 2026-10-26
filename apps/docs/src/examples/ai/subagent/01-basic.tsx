import { Subagent } from '@mah-works/larch/ai';

export const title = 'Basic';
export const layout = 'padded';

export default function Basic() {
  return (
    <div className="max-w-[480px]">
      <Subagent
        name="research"
        status="done"
        duration="14s"
        model="claude-sonnet-5-5"
        tools={['web_search', 'read_file']}
        task="Find which plans churned most last quarter and why."
        calls={[
          { title: 'Searched billing events for cancellations', status: 'done' },
          { title: 'Read cancellation survey export', status: 'done' },
        ]}
        result="Starter plans churned 2.3× more than Growth, mostly citing missing SSO."
      />
    </div>
  );
}
