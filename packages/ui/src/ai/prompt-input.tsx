import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { merge, styled } from '../base-ui/styled.js';
import { button } from '../base-ui/classes.js';
import Icon from '../components/Icon.js';
import { Attachment } from './attachment.js';
import type { ChatStatus } from './types.js';

export interface PromptFile {
  id: string;
  file: File;
  /** Object URL for image previews; revoked when the file is removed. */
  preview?: string;
}

export interface PromptInputMessage {
  text: string;
  /** Pass straight to `sendMessage({ text, files })` — the AI SDK accepts File objects. */
  files: File[];
}

export type PromptInputError = { code: 'max_files' | 'max_file_size' | 'accept'; message: string; file?: File };

interface PromptInputContextValue {
  files: PromptFile[];
  add: (files: FileList | File[]) => void;
  remove: (id: string) => void;
  clear: () => void;
  openFileDialog: () => void;
  hasText: boolean;
  setHasText: (value: boolean) => void;
  setControlled: (value: boolean) => void;
}

const PromptInputContext = createContext<PromptInputContextValue | null>(null);

/** Files, text state and the file dialog of the surrounding PromptInput.Root. */
export function usePromptInput(): PromptInputContextValue {
  const ctx = use(PromptInputContext);
  if (!ctx) throw new Error('usePromptInput must be used inside <PromptInput.Root>');
  return ctx;
}

const accepts = (file: File, accept?: string) =>
  !accept ||
  accept.split(',').some((rule) => {
    const r = rule.trim().toLowerCase();
    if (r.startsWith('.')) return file.name.toLowerCase().endsWith(r);
    if (r.endsWith('/*')) return file.type.toLowerCase().startsWith(r.slice(0, -1));
    return file.type.toLowerCase() === r;
  });

export type PromptInputRootProps = Omit<ComponentProps<'form'>, 'onSubmit' | 'onError'> & {
  onSubmit: (message: PromptInputMessage, event: FormEvent<HTMLFormElement>) => void;
  /** File types for the picker, drop and paste, e.g. "image/*,.pdf". */
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  /** Bytes. */
  maxFileSize?: number;
  onError?: (error: PromptInputError) => void;
};

/**
 * A message field for talking to an agent: an autosizing textarea, attachments (picker, drag-and-drop
 * and paste) and a toolbar with the send button. Enter sends, Shift+Enter starts a new line.
 *
 *   <PromptInput.Root onSubmit={({ text, files }) => sendMessage({ text, files })}>
 *     <PromptInput.Attachments />
 *     <PromptInput.Textarea placeholder="Ask anything" />
 *     <PromptInput.Footer>
 *       <PromptInput.AttachButton />
 *       <PromptInput.Submit status={status} onStop={stop} />
 *     </PromptInput.Footer>
 *   </PromptInput.Root>
 */
function Root({
  onSubmit,
  accept,
  multiple = true,
  maxFiles,
  maxFileSize,
  onError,
  className,
  children,
  ...props
}: PromptInputRootProps) {
  const [files, setFiles] = useState<PromptFile[]>([]);
  const [hasText, setHasText] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const controlled = useRef(false);
  const filesRef = useRef(files);
  filesRef.current = files;

  // Revoke preview URLs on unmount.
  useEffect(() => () => filesRef.current.forEach((f) => f.preview && URL.revokeObjectURL(f.preview)), []);

  const add = useCallback(
    (incoming: FileList | File[]) => {
      const list = Array.from(incoming);
      const valid: PromptFile[] = [];
      for (const file of list) {
        if (!accepts(file, accept)) {
          onError?.({ code: 'accept', message: `${file.name} isn't an accepted file type.`, file });
          continue;
        }
        if (maxFileSize != null && file.size > maxFileSize) {
          onError?.({ code: 'max_file_size', message: `${file.name} is too large.`, file });
          continue;
        }
        valid.push({
          id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
          file,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        });
      }
      // Work from the latest files via the ref so errors are reported here, not inside a state updater
      // (updaters must stay pure — React may run them twice).
      const base = multiple ? filesRef.current : [];
      const room = maxFiles == null ? Infinity : maxFiles - base.length;
      if (valid.length > room) onError?.({ code: 'max_files', message: `You can attach up to ${maxFiles} files.` });
      const kept = valid.slice(0, Math.max(0, multiple ? room : 1));
      valid.slice(kept.length).forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
      if (!multiple) filesRef.current.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
      const next = [...base, ...kept];
      filesRef.current = next;
      setFiles(next);
    },
    [accept, maxFileSize, maxFiles, multiple, onError],
  );

  const remove = useCallback((id: string) => {
    const target = filesRef.current.find((f) => f.id === id);
    if (target?.preview) URL.revokeObjectURL(target.preview);
    filesRef.current = filesRef.current.filter((f) => f.id !== id);
    setFiles(filesRef.current);
  }, []);

  const clear = useCallback(() => {
    filesRef.current.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    filesRef.current = [];
    setFiles([]);
  }, []);

  const value = useMemo<PromptInputContextValue>(
    () => ({
      files,
      add,
      remove,
      clear,
      openFileDialog: () => inputRef.current?.click(),
      hasText,
      setHasText,
      setControlled: (v) => {
        controlled.current = v;
      },
    }),
    [files, add, remove, clear, hasText],
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const text = String(new FormData(form).get('message') ?? '').trim();
    if (!text && files.length === 0) return;
    onSubmit({ text, files: files.map((f) => f.file) }, event);
    clear();
    // A controlled textarea is cleared by its owner; an uncontrolled one is reset here.
    if (!controlled.current) {
      form.reset();
      setHasText(false);
    }
  };

  return (
    <PromptInputContext value={value}>
      <form
        data-dragging={dragging || undefined}
        className={merge(
          'group/prompt relative flex min-w-0 flex-col rounded-[12px] border border-line-strong bg-surface shadow-card transition ' +
            'focus-within:border-blue focus-within:shadow-[0_0_0_3px_var(--blue-soft)] data-dragging:border-blue data-dragging:bg-selected',
          className,
        )}
        onSubmit={submit}
        onDragOver={(e) => {
          if (!e.dataTransfer.types.includes('Files')) return;
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false);
        }}
        onDrop={(e) => {
          if (!e.dataTransfer.files.length) return;
          e.preventDefault();
          setDragging(false);
          add(e.dataTransfer.files);
        }}
        onPaste={(e) => {
          if (e.clipboardData.files.length) {
            e.preventDefault();
            add(e.clipboardData.files);
          }
        }}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          hidden
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            if (e.currentTarget.files) add(e.currentTarget.files);
            e.currentTarget.value = '';
          }}
        />
        {children}
      </form>
    </PromptInputContext>
  );
}
Root.displayName = 'PromptInput.Root';

const formatSize = (bytes: number) =>
  bytes < 1024 ? `${bytes} B` : bytes < 1024 ** 2 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 ** 2).toFixed(1)} MB`;

/** The attached files as removable chips above the text. Pass a function to render each file yourself. */
function Attachments({ children, className }: { children?: (file: PromptFile) => ReactNode; className?: string }) {
  const { files, remove } = usePromptInput();
  if (files.length === 0) return null;
  return (
    <Attachment.Group className={merge('px-2 pt-2', className)}>
      {files.map((f) =>
        children ? (
          children(f)
        ) : (
          <Attachment.Root key={f.id} size="sm">
            <Attachment.Media variant={f.preview ? 'image' : 'icon'}>
              {f.preview ? <img src={f.preview} alt="" /> : <Icon name="file" />}
            </Attachment.Media>
            <Attachment.Content>
              <Attachment.Title>{f.file.name}</Attachment.Title>
              <Attachment.Description>{formatSize(f.file.size)}</Attachment.Description>
            </Attachment.Content>
            <Attachment.Actions>
              <Attachment.Action aria-label={`Remove ${f.file.name}`} onClick={() => remove(f.id)}>
                <Icon name="close" size="xs" />
              </Attachment.Action>
            </Attachment.Actions>
          </Attachment.Root>
        ),
      )}
    </Attachment.Group>
  );
}
Attachments.displayName = 'PromptInput.Attachments';

/** Grows with its content (CSS field-sizing) up to `max-h-48`. Enter sends; Shift+Enter and IME input don't. */
function Textarea({ className, onKeyDown, onChange, value, ...props }: ComponentProps<'textarea'>) {
  const { setHasText, setControlled } = usePromptInput();
  const isControlled = value !== undefined;
  useEffect(() => {
    setControlled(isControlled);
    if (isControlled) setHasText(String(value).trim().length > 0);
  }, [isControlled, value, setControlled, setHasText]);

  const keyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <textarea
      name="message"
      rows={1}
      value={value}
      onKeyDown={keyDown}
      onChange={(e) => {
        if (!isControlled) setHasText(e.currentTarget.value.trim().length > 0);
        onChange?.(e);
      }}
      className={merge(
        'field-sizing-content block max-h-48 min-h-[52px] w-full resize-none border-0 bg-transparent px-3.5 pb-1.5 pt-3 text-[13px] leading-relaxed text-ink outline-hidden placeholder:text-faint',
        className,
      )}
      {...props}
    />
  );
}
Textarea.displayName = 'PromptInput.Textarea';

const Footer = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={merge('flex items-center gap-1 px-2 pb-2', className)} {...props} />
);
Footer.displayName = 'PromptInput.Footer';

const Tools = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={merge('flex min-w-0 items-center gap-0.5', className)} {...props} />
);
Tools.displayName = 'PromptInput.Tools';

/** A compact ghost toolbar button. Takes Larch Button variants. */
const ToolButton = styled(BaseButton, 'h-7 px-2 text-[11px]', { ...button('ghost'), name: 'PromptInput.Button' });

/** Opens the file picker. */
function AttachButton({ children, ...props }: ComponentProps<typeof ToolButton>) {
  const { openFileDialog } = usePromptInput();
  return (
    <ToolButton aria-label="Attach files" onClick={openFileDialog} {...props}>
      {children ?? <Icon name="paperclip" size="sm" />}
    </ToolButton>
  );
}
AttachButton.displayName = 'PromptInput.AttachButton';

const SubmitButton = styled(BaseButton, 'ml-auto size-7 justify-center rounded-full p-0', { ...button('primary'), name: 'PromptInput.Submit' });

export type PromptInputSubmitProps = ComponentProps<typeof SubmitButton> & {
  /** `useChat().status`. While submitted or streaming the button becomes Stop (if `onStop` is given). */
  status?: ChatStatus;
  onStop?: () => void;
};

/** Send — or Stop while a reply is in flight. Disabled until there is text or a file. */
function Submit({ status = 'ready', onStop, disabled, children, ...props }: PromptInputSubmitProps) {
  const { hasText, files } = usePromptInput();
  const busy = status === 'submitted' || status === 'streaming';
  if (busy && onStop) {
    return (
      <SubmitButton type="button" aria-label="Stop" onClick={onStop} {...props}>
        <Icon name="stop" size="xs" className="fill-current" />
      </SubmitButton>
    );
  }
  return (
    <SubmitButton
      type="submit"
      aria-label={status === 'error' ? 'Retry' : 'Send'}
      disabled={disabled ?? (busy || (!hasText && files.length === 0))}
      {...props}
    >
      {children ?? <Icon name={status === 'error' ? 'refresh' : 'arrowUp'} size="sm" />}
    </SubmitButton>
  );
}
Submit.displayName = 'PromptInput.Submit';

export const PromptInput = { Root, Attachments, Textarea, Footer, Tools, Button: ToolButton, AttachButton, Submit };
