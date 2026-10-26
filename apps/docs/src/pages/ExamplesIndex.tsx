import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, Icon, type IconName } from '@mah-works/larch';
import { DocHeader } from '../docs/Prose.js';
import { CRM_PAGES } from '../crm/routes.js';
import { AUTH_PAGES } from '../auth/routes.js';

function ExampleCard({ to, icon, title, summary, uses }: { to: string; icon: IconName; title: string; summary: string; uses: string[] }) {
  return (
    <Card as={Link} to={to} className="group block p-5 no-underline transition-colors hover:border-line-strong">
      <div className="flex items-start justify-between gap-3">
        <div className="grid size-9 place-items-center rounded-[10px] bg-blue-soft text-blue">
          <Icon name={icon} />
        </div>
        <Icon name="arrowRight" size="sm" className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>
      <h3 className="mb-1 mt-4 text-sm font-[650] tracking-[-.02em] text-ink">{title}</h3>
      <p className="m-0 text-xs leading-relaxed text-muted">{summary}</p>
      <div className="mt-4 flex flex-wrap gap-[6px]">
        {uses.map((u) => (
          <Badge key={u} variant="inactive">
            {u}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

function Section({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-1 mt-0 text-lg font-[650] tracking-[-.03em] text-ink">{title}</h2>
      <p className="mb-4 mt-0 text-[13px] text-muted">{description}</p>
      <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">{children}</div>
    </section>
  );
}

export default function ExamplesIndex() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-[33px] pb-16 pt-[29px] tablet:px-5 mobile:px-[13px]">
      <DocHeader
        eyebrow="Examples"
        title="Example pages"
        description="Complete screens built only from Larch UI components and blocks. Each opens full-screen; the source is in apps/docs/src/crm and apps/docs/src/auth."
      />

      <Section title="AI assistant" description="An agent chat built from Larch AI Elements, streaming from a scripted stand-in for useChat.">
        <ExampleCard
          to="/examples/assistant"
          icon="sparkles"
          title="Compass assistant"
          summary="Streaming replies with reasoning, a tool call, markdown with highlighted code and sources; attachments, a model menu, stop and retry."
          uses={['ChatThread', 'PromptInput', 'ModelSelector', 'Suggestion', 'Context', 'Markdown']}
        />
      </Section>

      <Section title="Authentication" description="Three sign-in layouts. Submitting any of them lands you in the CRM example.">
        {AUTH_PAGES.map((p) => (
          <ExampleCard key={p.path} to={`/examples/auth/${p.path}`} {...p} />
        ))}
      </Section>

      <Section title="Compass CRM" description="A client-operations app with its own sidebar and topbar.">
        {CRM_PAGES.map((p) => (
          <ExampleCard key={p.path} to={`/examples/crm/${p.path}`} {...p} />
        ))}
      </Section>
    </div>
  );
}
