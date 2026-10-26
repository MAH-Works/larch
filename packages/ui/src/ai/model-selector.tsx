import type { ComponentProps, ReactNode } from 'react';
import { Menu } from '../base-ui/menu.js';
import { extend } from '../base-ui/styled.js';
import Icon from '../components/Icon.js';

/** A compact ghost trigger with a chevron, sized for a PromptInput footer. */
function Trigger({ className, children, ...props }: ComponentProps<typeof Menu.Trigger>) {
  return (
    <Menu.Trigger variant="ghost" className={extend('h-7 gap-1 px-2 text-[11px]', className)} {...props}>
      {children}
      <Icon name="chevronDown" size="xs" className="text-faint" />
    </Menu.Trigger>
  );
}
Trigger.displayName = 'ModelSelector.Trigger';

export type ModelSelectorContentProps = ComponentProps<typeof Menu.Popup> &
  Pick<ComponentProps<typeof Menu.Positioner>, 'side' | 'align' | 'sideOffset'>;

/** Portal + Positioner + Popup in one; opens upward from a prompt by default. */
function Content({ side = 'top', align = 'start', sideOffset = 6, className, ...props }: ModelSelectorContentProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner side={side} align={align} sideOffset={sideOffset}>
        <Menu.Popup className={extend('min-w-[200px]', className)} {...props} />
      </Menu.Positioner>
    </Menu.Portal>
  );
}
Content.displayName = 'ModelSelector.Content';

/** A model (or effort level) with an optional caption. Must sit inside a RadioGroup. */
function Item({ children, description, ...props }: ComponentProps<typeof Menu.RadioItem> & { description?: ReactNode }) {
  return (
    <Menu.RadioItem closeOnClick {...props}>
      <Menu.RadioItemIndicator />
      <span className="flex min-w-0 flex-col py-1">
        <span className="truncate">{children}</span>
        {description && <span className="truncate text-[10px] text-faint">{description}</span>}
      </span>
    </Menu.RadioItem>
  );
}
Item.displayName = 'ModelSelector.Item';

/**
 * Pick a model, and separately a reasoning effort — two of these side by side in a PromptInput footer.
 * Built on Larch's Menu, so groups, keyboard navigation and type-ahead come from Base UI.
 *
 *   <ModelSelector.Root>
 *     <ModelSelector.Trigger>{label}</ModelSelector.Trigger>
 *     <ModelSelector.Content>
 *       <ModelSelector.RadioGroup value={model} onValueChange={setModel}>
 *         <ModelSelector.Label>OpenAI</ModelSelector.Label>
 *         <ModelSelector.Item value="gpt-5">GPT-5</ModelSelector.Item>
 *       </ModelSelector.RadioGroup>
 *     </ModelSelector.Content>
 *   </ModelSelector.Root>
 */
export const ModelSelector = {
  Root: Menu.Root,
  Trigger,
  Content,
  RadioGroup: Menu.RadioGroup,
  Group: Menu.Group,
  Label: Menu.GroupLabel,
  Separator: Menu.Separator,
  Item,
};
