import { createContext, use, type ComponentProps } from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { merge, styled } from '../base-ui/styled.js';
import { button } from '../base-ui/classes.js';

const SelectContext = createContext<((value: string) => void) | undefined>(undefined);

/** A row of one-click prompts that scrolls sideways when it doesn't fit. */
function Root({ onSelect, className, ...props }: Omit<ComponentProps<'div'>, 'onSelect'> & { onSelect?: (value: string) => void }) {
  return (
    <SelectContext value={onSelect}>
      <div
        className={merge(
          'flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          className,
        )}
        {...props}
      />
    </SelectContext>
  );
}
Root.displayName = 'Suggestion.Root';

const ItemButton = styled(BaseButton, 'h-7 shrink-0 rounded-full px-3 text-[11px]', { ...button('outline'), name: 'Suggestion.Item' });

/** Sends its `value` through the Root's `onSelect` (e.g. `sendMessage({ text: value })`). */
function Item({ value, children, onClick, ...props }: ComponentProps<typeof ItemButton> & { value: string }) {
  const onSelect = use(SelectContext);
  return (
    <ItemButton
      onClick={(e) => {
        onClick?.(e);
        onSelect?.(value);
      }}
      {...props}
    >
      {children ?? value}
    </ItemButton>
  );
}
Item.displayName = 'Suggestion.Item';

export const Suggestion = { Root, Item };
