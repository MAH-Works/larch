import { Attachment } from '@mah-works/larch/ai';
import { Icon } from '@mah-works/larch';

export const title = 'States and layouts';
export const description = 'Uploading and processing titles shimmer; the error state keeps its reason in the description. The full-card Trigger sits under the actions.';
export const layout = 'padded';

export default function States() {
  return (
    <div className="flex flex-col gap-4">
      <Attachment.Group aria-label="Attachments" role="group" tabIndex={0}>
        <Attachment.Root>
          <Attachment.Media>
            <Icon name="document" />
          </Attachment.Media>
          <Attachment.Content>
            <Attachment.Title>q3-report.pdf</Attachment.Title>
            <Attachment.Description>PDF · 2.4 MB</Attachment.Description>
          </Attachment.Content>
          <Attachment.Actions>
            <Attachment.Action aria-label="Remove q3-report.pdf">
              <Icon name="close" size="xs" />
            </Attachment.Action>
          </Attachment.Actions>
          <Attachment.Trigger aria-label="Open q3-report.pdf" render={<a href="#q3-report" />} />
        </Attachment.Root>
        <Attachment.Root state="uploading">
          <Attachment.Media>
            <Icon name="table" />
          </Attachment.Media>
          <Attachment.Content>
            <Attachment.Title>accounts.csv</Attachment.Title>
            <Attachment.Description>Uploading · 64%</Attachment.Description>
          </Attachment.Content>
        </Attachment.Root>
        <Attachment.Root state="error">
          <Attachment.Media>
            <Icon name="image" />
          </Attachment.Media>
          <Attachment.Content>
            <Attachment.Title>logo.heic</Attachment.Title>
            <Attachment.Description>HEIC isn’t supported</Attachment.Description>
          </Attachment.Content>
        </Attachment.Root>
      </Attachment.Group>
      <Attachment.Root orientation="vertical">
        <Attachment.Media variant="image">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=60" alt="Office desk" />
        </Attachment.Media>
        <Attachment.Content>
          <Attachment.Title>office.jpg</Attachment.Title>
          <Attachment.Description>JPG · 940 KB</Attachment.Description>
        </Attachment.Content>
      </Attachment.Root>
    </div>
  );
}
