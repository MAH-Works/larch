import { Questionnaire as Headless } from '@shadcn/react/questionnaire';
import { theme, type Themed } from '../base-ui/styled.js';
import { buttonClasses, CONTROL, ERROR } from '../base-ui/classes.js';

export type { QuestionnaireItemDefinition, QuestionnaireItemStatus } from '@shadcn/react/questionnaire';

const plain = (base: string) => ({ base, plainClassName: true });

const styles = {
  Root: plain('flex flex-col gap-4'),
  Progress: plain('text-[11px] text-faint tabular-nums'),
  Item: plain('m-0 flex min-w-0 flex-col gap-3 border-0 p-0'),
  Title: plain('mb-1 p-0 text-sm font-[650] tracking-[-.02em] text-ink'),
  Description: plain('m-0 text-xs leading-relaxed text-muted'),
  Choices: plain('flex flex-col gap-1.5'),
  Choice: plain(
    'group/choice flex cursor-pointer items-center gap-[10px] rounded-lg border border-line bg-surface px-3 py-[9px] text-xs text-body transition-colors hover:bg-row-hover ' +
      'data-checked:border-blue data-checked:bg-selected data-checked:text-ink has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue',
  ),
  ChoiceInput: plain('sr-only'),
  ChoiceLabel: plain('min-w-0 flex-1'),
  ChoiceShortcut: plain(
    'grid size-5 shrink-0 place-items-center rounded-[4px] border border-line-strong font-mono text-[10px] uppercase text-faint group-data-checked/choice:border-blue group-data-checked/choice:text-blue',
  ),
  Input: plain(`${CONTROL} h-[35px] px-[10px]`),
  Error: plain(ERROR),
  Previous: plain(buttonClasses('ghost')),
  Skip: plain(buttonClasses('ghost')),
  Next: plain(buttonClasses('primary')),
  Submit: plain(buttonClasses('primary')),
};

/**
 * A short multi-step form an agent asks the person to fill in — one question at a time, with keyboard
 * shortcuts for choices. Behaviour comes from `@shadcn/react`; Larch adds the styles.
 */
// Annotated so the published declaration names only @shadcn/react's public exports.
export const Questionnaire: Themed<typeof Headless, typeof styles> = theme(Headless, 'Questionnaire', styles);
