import { MessageScroller as Headless } from '@shadcn/react/message-scroller';
import { theme } from '../base-ui/styled.js';
import { FOCUS_RING } from '../base-ui/classes.js';
import Icon from '../components/Icon.js';

export {
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
  type MessageScrollerScrollOptions,
} from '@shadcn/react/message-scroller';

// @shadcn/react parts take a plain className; their state is styled through data attributes.
const plain = (base: string) => ({ base, plainClassName: true });

/**
 * A chat transcript scroller: anchors each new turn near the top, follows a streaming reply while the
 * reader is at the live edge, keeps their place when history is prepended, and can jump to a message.
 * Behaviour comes from `@shadcn/react`; Larch adds the styles. Fill a height-constrained parent.
 *
 *   <MessageScroller.Provider autoScroll defaultScrollPosition="last-anchor">
 *     <MessageScroller.Root>
 *       <MessageScroller.Viewport>
 *         <MessageScroller.Content>
 *           <MessageScroller.Item messageId={m.id} scrollAnchor={m.role === 'user'}>…</MessageScroller.Item>
 *         </MessageScroller.Content>
 *       </MessageScroller.Viewport>
 *       <MessageScroller.Button />
 *     </MessageScroller.Root>
 *   </MessageScroller.Provider>
 */
export const MessageScroller = theme(Headless, 'MessageScroller', {
  Root: plain('relative flex size-full min-h-0 flex-col'),
  Viewport: plain(`min-h-0 flex-1 overflow-y-auto overscroll-contain outline-hidden ${FOCUS_RING} focus-visible:-outline-offset-2`),
  Content: plain('mx-auto flex w-full max-w-[760px] flex-col gap-5 px-5 py-6 mobile:px-[13px]'),
  Item: plain('min-w-0'),
  // Fades out (and goes inert) when there is nothing further in its direction.
  Button: {
    ...plain(
      'absolute bottom-4 left-1/2 z-10 grid size-8 -translate-x-1/2 place-items-center rounded-full border border-line-strong bg-surface text-soft shadow-pop transition-opacity hover:text-ink ' +
        `not-data-active:pointer-events-none not-data-active:opacity-0 ${FOCUS_RING}`,
    ),
    children: <Icon name="chevronDown" size="sm" />,
  },
});
