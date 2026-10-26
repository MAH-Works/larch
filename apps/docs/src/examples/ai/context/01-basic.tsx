import { Context } from '@mah-works/larch/ai';

export const title = 'Basic';
export const description = 'Hover or focus for the breakdown. The ring turns amber past 75% and red past 90%.';

export default function Basic() {
  return (
    <>
      <Context
        used={41_200}
        limit={200_000}
        details={[
          { label: 'Input', value: '36.8K' },
          { label: 'Output', value: '3.1K' },
          { label: 'Reasoning', value: '1.3K' },
          { label: 'Cost', value: '$0.21' },
        ]}
      />
      <Context used={186_000} limit={200_000} />
    </>
  );
}
