import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Body } from '../..';
import { TextEditor } from './TextEditor';

export default {
  title: 'Components/TextEditor',
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
      <TextEditor
        onChange={onChange}
        blockTypeOptions={[
          'ordered-list-item',
          'unordered-list-item',
          'blockquote',
        ]}
        headingTypeOptions={['header-one', 'header-two', 'header-three']}
        inlineStyleOptions={['BOLD', 'ITALIC', 'UNDERLINE']}
        linkOption
        placeholder="Write a text..."
      />
      {renderMarkdownOutput}
    </>
  );
};

export const WithoutOptions = () => {
  const [markdown, setMarkdown] = React.useState<string | undefined>('');
  const onChange = (markdownString?: string) => {
    setMarkdown(markdownString);
  };
  const renderMarkdownOutput = markdown ? (
    <pre style={{ border: 'dotted 1px' }}>{markdown}</pre>
  ) : null;
  return (
    <>
      <TextEditor onChange={onChange} placeholder="Write a text..." />
      {renderMarkdownOutput}
    </>
  );
};

export const LargeSize = () => {
  const [markdown, setMarkdown] = React.useState<string | undefined>('');
  const onChange = (markdownString?: string) => {
    setMarkdown(markdownString);
  };
  const renderMarkdownOutput = markdown ? (
    <pre style={{ border: 'dotted 1px' }}>{markdown}</pre>
  ) : null;
  return (
    <>
      <TextEditor
        onChange={onChange}
        blockTypeOptions={[
          'ordered-list-item',
          'unordered-list-item',
          'blockquote',
        ]}
        headingTypeOptions={['header-one', 'header-two', 'header-three']}
        inlineStyleOptions={['BOLD', 'ITALIC', 'UNDERLINE']}
        linkOption
        editorSize={'large'}
        placeholder="Write a text..."
      />
      {renderMarkdownOutput}
    </>
  );
};

export const WithInitialValue = () => {
  const defaultValue = `## Hello World!
  I **am** a *Markdown* ++String++! [I'm an inline-style link](https://www.google.com).`;
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
      <div>
        Input: <pre style={{ border: 'dotted 1px' }}>{defaultValue}</pre>
      </div>
      <TextEditor
        onChange={onChange}
        initialValue={markdown}
        blockTypeOptions={[
          'ordered-list-item',
          'unordered-list-item',
          'blockquote',
        ]}
        headingTypeOptions={['header-one', 'header-two', 'header-three']}
        inlineStyleOptions={['BOLD', 'ITALIC', 'UNDERLINE']}
        linkOption
        editorSize={'large'}
        placeholder="Write a text..."
      />
      <div>Output: {renderMarkdownOutput}</div>
    </>
  );
};

export const Multiple = () => {
  return (
    <>
      <TextEditor
        onChange={() => {}}
        blockTypeOptions={[
          'ordered-list-item',
          'unordered-list-item',
          'blockquote',
        ]}
        headingTypeOptions={['header-one', 'header-two', 'header-three']}
        linkOption
        placeholder="Write a text..."
      />
      <br />
      <TextEditor
        onChange={() => {}}
        blockTypeOptions={[
          'ordered-list-item',
          'unordered-list-item',
          'blockquote',
        ]}
        inlineStyleOptions={['BOLD', 'ITALIC', 'UNDERLINE']}
        placeholder="Write a text..."
      />
    </>
  );
};

export const Disabled = () => {
  const defaultValue = 'This editor is read only.';
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
      <TextEditor
        onChange={onChange}
        initialValue={markdown}
        blockTypeOptions={[
          'ordered-list-item',
          'unordered-list-item',
          'blockquote',
        ]}
        headingTypeOptions={['header-one', 'header-two', 'header-three']}
        inlineStyleOptions={['BOLD', 'ITALIC', 'UNDERLINE']}
        linkOption
        placeholder="Write a text..."
        disabled={true}
      />
      {renderMarkdownOutput}
    </>
  );
};

export const ReactHookFormExample = () => {
  const { control, handleSubmit, watch } = useForm<{ text: string }>();
  const [submittedValue, setSubmittedValue] = React.useState<
    string | undefined
  >();

  const watchedValue = watch('text');
  return (
    <>
      <Body gutterBottom={3} variant="body2" backgroundColor="primary">
        <strong>For further information see:</strong>{' '}
        https://react-hook-form.com/
      </Body>
      <form onSubmit={handleSubmit((d) => setSubmittedValue(d.text))}>
        <Controller
          render={({ onChange }) => (
            <TextEditor
              placeholder="Write a text..."
              inlineStyleOptions={['BOLD', 'ITALIC', 'UNDERLINE']}
              onChange={onChange}
            />
          )}
          name="text"
          defaultValue=""
          control={control}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <pre>
        Watched value:{' '}
        {watchedValue !== undefined ? watchedValue.toString() : ''}
      </pre>
      <pre>
        Submitted value:{' '}
        {submittedValue !== undefined ? submittedValue.toString() : ''}
      </pre>
    </>
  );
};
