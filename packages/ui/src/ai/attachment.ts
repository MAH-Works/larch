import { Button as BaseButton } from '@base-ui/react/button';
import { styled } from '../base-ui/styled.js';
import { button, FOCUS_RING } from '../base-ui/classes.js';
import { part } from './part.js';

export type AttachmentState = 'idle' | 'uploading' | 'processing' | 'error' | 'done';

const Root = part(
  'div',
  'group/attachment relative flex min-w-0 items-center gap-[10px] rounded-lg border border-line bg-surface p-2 pr-2.5 text-left ' +
    'data-[state=error]:border-[#ffd3d8] data-[state=error]:bg-[#fff8f8] dark:data-[state=error]:border-[#6b3039] dark:data-[state=error]:bg-[#26171a] ' +
    'data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:p-1.5',
  {
    variants: {
      state: { idle: '', uploading: '', processing: '', error: '', done: '' } satisfies Record<AttachmentState, string>,
      size: { default: 'w-[220px]', sm: 'w-[180px] gap-2 p-1.5', xs: 'w-[150px] gap-1.5 p-1' },
      orientation: { horizontal: '', vertical: 'w-[150px]' },
    },
    defaults: { state: 'done', size: 'default', orientation: 'horizontal' },
    name: 'Attachment.Root',
  },
);

const Media = part(
  'div',
  'grid size-9 shrink-0 place-items-center overflow-hidden rounded-md group-data-[orientation=vertical]/attachment:h-24 group-data-[orientation=vertical]/attachment:w-full',
  {
    variants: {
      variant: {
        icon: 'bg-hover text-soft *:size-[15px]',
        image: 'bg-hover *:size-full *:object-cover',
      },
    },
    defaults: { variant: 'icon' },
    name: 'Attachment.Media',
  },
);

const Content = part('div', 'min-w-0 flex-1 group-data-[orientation=vertical]/attachment:px-1 group-data-[orientation=vertical]/attachment:pb-1', {
  name: 'Attachment.Content',
});

const Title = part(
  'span',
  'block truncate text-xs font-semibold text-strong group-data-[state=processing]/attachment:shimmer-text group-data-[state=uploading]/attachment:shimmer-text',
  { name: 'Attachment.Title' },
);

// Keep the failure reason here in the error state, so colour isn't the only signal.
const Description = part('span', 'mt-px block truncate text-[10px] text-faint group-data-[state=error]/attachment:text-red', {
  name: 'Attachment.Description',
});

// Sits above the full-card Trigger, so actions stay separately clickable and focusable.
const Actions = part('div', 'relative z-1 flex shrink-0 items-center gap-0.5', { name: 'Attachment.Actions' });

const Action = styled(BaseButton, undefined, { ...button('iconSm'), name: 'Attachment.Action' });

const Trigger = part('button', `absolute inset-0 rounded-[inherit] outline-hidden ${FOCUS_RING}`, {
  attrs: { type: 'button' },
  name: 'Attachment.Trigger',
});

const Group = part('div', 'flex snap-x gap-2 overflow-x-auto overscroll-x-contain pb-1 *:shrink-0 *:snap-start', {
  name: 'Attachment.Group',
});

/** A file or image with metadata, upload state and actions. Uploading and processing titles shimmer. */
export const Attachment = { Root, Media, Content, Title, Description, Actions, Action, Trigger, Group };
