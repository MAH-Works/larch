import { useState } from 'react';
import { Questionnaire } from '@mah-works/larch/ai';

export const title = 'One question at a time';
export const description = 'Letter shortcuts pick a choice and Enter moves on. The agent receives the answers when the form submits.';
export const layout = 'padded';

// Root.items mirrors the Items below so the questionnaire knows every question before it mounts.
const ITEMS = [
  { name: 'audience', required: true, choices: [{ value: 'customers' }, { value: 'team' }, { value: 'investors' }] },
  { name: 'tone', required: true, choices: [{ value: 'formal' }, { value: 'friendly' }] },
];

export default function Basic() {
  const [answers, setAnswers] = useState<string | null>(null);
  return (
    <div className="max-w-[420px]">
      <Questionnaire.Root
        items={ITEMS}
        shortcuts="letters"
        onSubmit={(e) => {
          e.preventDefault();
          setAnswers(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))));
        }}
      >
        <Questionnaire.Progress />
        <Questionnaire.Item name="audience" required>
          <Questionnaire.Title>Who is the update for?</Questionnaire.Title>
          <Questionnaire.Choices>
            {['customers', 'team', 'investors'].map((value) => (
              <Questionnaire.Choice key={value} value={value}>
                <Questionnaire.ChoiceInput />
                <Questionnaire.ChoiceShortcut />
                <Questionnaire.ChoiceLabel className="capitalize">{value}</Questionnaire.ChoiceLabel>
              </Questionnaire.Choice>
            ))}
          </Questionnaire.Choices>
        </Questionnaire.Item>
        <Questionnaire.Item name="tone" required>
          <Questionnaire.Title>Which tone?</Questionnaire.Title>
          <Questionnaire.Choices>
            {['formal', 'friendly'].map((value) => (
              <Questionnaire.Choice key={value} value={value}>
                <Questionnaire.ChoiceInput />
                <Questionnaire.ChoiceShortcut />
                <Questionnaire.ChoiceLabel className="capitalize">{value}</Questionnaire.ChoiceLabel>
              </Questionnaire.Choice>
            ))}
          </Questionnaire.Choices>
        </Questionnaire.Item>
        <div className="flex justify-end gap-2">
          <Questionnaire.Previous>Back</Questionnaire.Previous>
          <Questionnaire.Next>Next</Questionnaire.Next>
          <Questionnaire.Submit>Send answers</Questionnaire.Submit>
        </div>
      </Questionnaire.Root>
      {answers && <p className="mb-0 mt-3 font-mono text-[11px] text-muted">{answers}</p>}
    </div>
  );
}
