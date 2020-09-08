import * as React from 'react';
import { TextEditor } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Components|TextEditor',
  component: TextEditor,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <div style={{ margin: 120 }}>{storyFn()}</div>
    ),
  ],
};

export const Default = () => {
  const [markdown, setMarkdown] = React.useState<string | undefined>('');
  const onChange = (markdownString?: string) => {
    setMarkdown(markdownString);
  };
  const renderMarkdownOutput = markdown ? (
    <pre style={{ border: 'dotted 1px' }}>{markdown}</pre>
  ) : null;
  return (
    <>
      <TextEditor onChange={onChange} />
      {renderMarkdownOutput}
    </>
  );
};

export const Controlled = () => {
  const defaultValue = `## Hello World!
  **I** am a _Markdown_ String!`;
  const [markdown, setMarkdown] = React.useState<string | undefined>(
    defaultValue
  );
  const onChange = (markdownString?: string) => {
    setMarkdown(markdownString);
  };
  const renderMarkdownOutput = markdown ? (
    <pre style={{ border: 'dotted 1px' }}>{markdown}</pre>
  ) : null;
  return (
    <>
      <TextEditor onChange={onChange} value={markdown} />
      {renderMarkdownOutput}
    </>
  );
};
