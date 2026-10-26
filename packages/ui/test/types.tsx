// Type-level tests, checked by `pnpm typecheck` (never bundled). Each `@ts-expect-error` must fail to compile.
import { useRef } from 'react';
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Dialog,
  Form,
  Menu,
  PanelSelect,
  Progress,
  Select,
  Slider,
  Toast,
  Tooltip,
  useSelection,
} from '../src/index.js';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';

export function Examples() {
  const ref = useRef<HTMLButtonElement>(null);
  const toastManager = Toast.useToastManager();
  const { toggle } = useSelection<string>();

  return (
    <>
      {/* Base UI props and Larch variants on the same part; ref is a plain prop in React 19. */}
      <Button ref={ref} variant="primary" focusableWhenDisabled disabled onClick={() => toastManager.add({ title: 'Saved' })}>
        Save
      </Button>
      {/* @ts-expect-error unknown variant */}
      <Button variant="huge">Nope</Button>
      <Button className={(state) => (state.disabled ? 'opacity-20' : undefined)}>State className</Button>

      {/* Untouched parts are Base UI's own objects. */}
      <Dialog.Root onOpenChange={(open) => open satisfies boolean}>
        <Dialog.Trigger variant="ghost">Open</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Popup className="w-[560px]">
            <Dialog.Title>Title</Dialog.Title>
            {/* @ts-expect-error Close does not accept a tone */}
            <Dialog.Close tone="red">Close</Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
      {(Dialog.Root satisfies typeof BaseDialog.Root) && null}

      <Avatar.Root tone="coral" size="lg">
        <Avatar.Fallback>AB</Avatar.Fallback>
      </Avatar.Root>
      {/* @ts-expect-error unknown tone */}
      <Avatar.Root tone="pink" />

      <Checkbox.Root onCheckedChange={(checked) => toggle('a', checked)}>
        <Checkbox.Indicator />
      </Checkbox.Root>

      <Progress.Root value={40}>
        <Progress.Track>
          <Progress.Indicator tone="green" />
        </Progress.Track>
      </Progress.Root>

      <Slider.Root defaultValue={[10, 40]}>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator tone="amber" />
            <Slider.Thumb index={0} />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>

      <Select.Root items={[{ label: 'A', value: 'a' }]} onValueChange={(value) => value}>
        <Select.Trigger>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>
      </Select.Root>

      <Menu.Root>
        <Menu.Trigger variant="icon" aria-label="More" />
      </Menu.Root>
      <Tooltip.Root>
        <Tooltip.Trigger variant="unstyled">?</Tooltip.Trigger>
      </Tooltip.Root>

      {/* Larch components: polymorphic Card takes the rendered component's props. */}
      <Card as={Form} onFormSubmit={(values) => values} className="p-4" />
      <PanelSelect label="Period" options={['A', 'B']} onValueChange={(value) => value} />
    </>
  );
}
