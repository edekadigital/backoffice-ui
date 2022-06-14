import * as React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { render } from '../../test-utils';
import { TextEditor } from './TextEditor';
import userEvent from '@testing-library/user-event';
import { useEditorState } from './useEditorState';

jest.mock('./useEditorState');

jest.mock('draft-js', () => ({
  ...jest.requireActual('draft-js'),
  Editor: jest.fn((props) => {
    const modifiedOnchange = (e: any) => {
      const { ContentState, EditorState } = require('draft-js');
      const text = e.target.value;
      if (text) {
        const content = ContentState.createFromText(text);
        props.onChange(EditorState.createWithContent(content));
      }
    };
    return (
      <input
        placeholder={props.placeholder}
        data-testid="mocked-editor"
        onChange={(e) => modifiedOnchange(e)}
      />
    );
  }),
}));

const setupEditorStateMock = (preSelectAll?: boolean) => {
  (
    useEditorState as jest.MockedFunction<typeof useEditorState>
  ).mockImplementation((initialValue?: string) => {
    const { useEditorState: actualUseEditorState } =
      jest.requireActual('./useEditorState');
    return actualUseEditorState(initialValue, preSelectAll);
  });
};

describe('<TextEditor />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    setupEditorStateMock();
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <TextEditor
        onChange={() => {}}
        editorSize="large"
        placeholder="placeholder"
      />
    );
    expect(getByTestId('textEditor')).toBeTruthy();
    expect(getByTestId('textEditor-editorWrapper')).toBeTruthy();
    expect(getByTestId('textEditor-toolbar')).toBeTruthy();
    expect(getByTestId('textEditor-undo')).toBeTruthy();
    expect(getByTestId('textEditor-redo')).toBeTruthy();
    expect(queryByTestId('textEditor-headingOptions')).toBeFalsy();
    expect(queryByTestId('textEditor-inlineStyleOptions')).toBeFalsy();
    expect(queryByTestId('textEditor-blockTypeOptions')).toBeFalsy();
    expect(queryByTestId('textEditor-linkOption-add')).toBeFalsy();
    expect(queryByTestId('textEditor-linkOption-remove')).toBeFalsy();
    expect(queryByTestId('textEditor-linkOption-form')).toBeFalsy();
    expect(getByPlaceholderText('placeholder')).toBeTruthy();
  });

  it('should handle the user input correctly', () => {
    setupEditorStateMock();
    const onChange = jest.fn();
    const { getByTestId } = render(<TextEditor onChange={onChange} />);
    const value = 'Foo bar';

    const editor = getByTestId('mocked-editor');
    userEvent.click(getByTestId('textEditor-editorWrapper'));
    fireEvent.change(editor, { target: { value } });
    expect(onChange.mock.calls[0][0]).toBe(value);
  });

  it('should handle heading types correctly', () => {
    setupEditorStateMock();
    const onChange = jest.fn();
    const value = 'Lorem ipsum';
    const { getByTestId, queryByTestId } = render(
      <TextEditor
        onChange={onChange}
        headingTypeOptions={['header-one', 'header-two', 'header-three']}
      />
    );
    expect(getByTestId('textEditor-headingOptions')).toBeTruthy();

    const h1Button = queryByTestId('textEditor-headingOption-header-one');
    const h2Button = queryByTestId('textEditor-headingOption-header-two');
    const h3Button = queryByTestId('textEditor-headingOption-header-three');
    expect(h1Button).toBeTruthy();
    expect(h2Button).toBeTruthy();
    expect(h3Button).toBeTruthy();
    const editor = getByTestId('mocked-editor');
    fireEvent.change(editor, { target: { value } });
    userEvent.click(h1Button!);
    userEvent.click(h2Button!);
    userEvent.click(h3Button!);
    expect(onChange.mock.calls[1][0]).toBe(`# ${value}`);
    expect(onChange.mock.calls[2][0]).toBe(`## ${value}`);
    expect(onChange.mock.calls[3][0]).toBe(`### ${value}`);
  });

  it('should handle block types correctly', () => {
    setupEditorStateMock();
    const onChange = jest.fn();
    const value = 'Lorem ipsum';
    const { getByTestId, queryByTestId } = render(
      <TextEditor
        onChange={onChange}
        blockTypeOptions={[
          'ordered-list-item',
          'unordered-list-item',
          'blockquote',
        ]}
      />
    );
    expect(getByTestId('textEditor-blockTypeOptions')).toBeTruthy();

    const orderedButton = queryByTestId(
      'textEditor-blockTypeOption-ordered-list-item'
    );
    const unorderedButton = queryByTestId(
      'textEditor-blockTypeOption-unordered-list-item'
    );
    const blockquoteButton = queryByTestId(
      'textEditor-blockTypeOption-blockquote'
    );
    expect(orderedButton).toBeTruthy();
    expect(unorderedButton).toBeTruthy();
    expect(blockquoteButton).toBeTruthy();
    const editor = getByTestId('mocked-editor');
    fireEvent.change(editor, { target: { value } });
    userEvent.click(orderedButton!);
    userEvent.click(unorderedButton!);
    userEvent.click(blockquoteButton!);
    expect(onChange.mock.calls[1][0]).toBe(`1. ${value}`);
    expect(onChange.mock.calls[2][0]).toBe(`- ${value}`);
    expect(onChange.mock.calls[3][0]).toBe(`> ${value}`);
  });

  it('should remove placeholder if the user changes block type before entering any text', () => {
    setupEditorStateMock();
    const { queryByPlaceholderText, getByTestId } = render(
      <TextEditor
        onChange={() => {}}
        blockTypeOptions={['ordered-list-item']}
        placeholder="placeholder"
      />
    );
    const orderedButton = getByTestId(
      'textEditor-blockTypeOption-ordered-list-item'
    );
    userEvent.click(orderedButton!);
    expect(queryByPlaceholderText('placeholder')).toBeFalsy();
  });

  it('should handle inline styles correctly', () => {
    setupEditorStateMock(true);
    const onChange = jest.fn();
    const value = 'Lorem ipsum';
    const { getByTestId, queryByTestId } = render(
      <TextEditor
        onChange={onChange}
        initialValue={value}
        inlineStyleOptions={['BOLD', 'ITALIC', 'UNDERLINE']}
      />
    );
    expect(getByTestId('textEditor-inlineStyleOptions')).toBeTruthy();

    const boldButton = queryByTestId('textEditor-inlineStyleOption-BOLD');
    const italicButton = queryByTestId('textEditor-inlineStyleOption-ITALIC');
    const underlineButton = queryByTestId(
      'textEditor-inlineStyleOption-UNDERLINE'
    );
    expect(boldButton).toBeTruthy();
    expect(italicButton).toBeTruthy();
    expect(underlineButton).toBeTruthy();

    userEvent.click(boldButton!);
    userEvent.click(boldButton!);
    userEvent.click(italicButton!);
    userEvent.click(italicButton!);
    userEvent.click(underlineButton!);
    userEvent.click(underlineButton!);

    expect(onChange.mock.calls[0][0]).toBe(`**${value}**`);
    expect(onChange.mock.calls[1][0]).toBe(`${value}`);
    expect(onChange.mock.calls[2][0]).toBe(`*${value}*`);
    expect(onChange.mock.calls[3][0]).toBe(`${value}`);
    expect(onChange.mock.calls[4][0]).toBe(`++${value}++`);
    expect(onChange.mock.calls[5][0]).toBe(`${value}`);
  });

  it('should be possible to add an inline link', () => {
    setupEditorStateMock(true);
    const onChange = jest.fn();
    const value = 'Lorem';
    const url = 'www.edeka.de';
    const { getByTestId, queryByTestId } = render(
      <TextEditor onChange={onChange} initialValue={value} linkOption />
    );
    const addButton = queryByTestId('textEditor-linkOption-add');
    expect(addButton).toBeTruthy();
    expect(addButton!.classList).not.toContain('Mui-disabled');
    expect(queryByTestId('textEditor-linkOption-form')).toBeFalsy();
    userEvent.click(addButton!);
    expect(queryByTestId('textEditor-linkOption-form')).toBeTruthy();
    expect(queryByTestId('textEditor-linkOption-form-input')).toBeTruthy();
    userEvent.type(
      getByTestId('textEditor-linkOption-form-input').querySelector('input')!,
      url
    );
    userEvent.click(getByTestId('textEditor-linkOption-form-submit'));
    expect(onChange.mock.calls[0][0]).toBe(`[${value}](${url})`);
  });

  it('should be possible to close link form modal', () => {
    setupEditorStateMock(true);
    const value = 'Lorem';
    const { getByTestId } = render(
      <TextEditor onChange={() => jest.fn()} initialValue={value} linkOption />
    );
    const addButton = getByTestId('textEditor-linkOption-add');
    userEvent.click(addButton!);
    expect(getByTestId('textEditor-linkOption-form')).toBeVisible();
    userEvent.click(addButton!);
    expect(getByTestId('textEditor-linkOption-form')).not.toBeVisible();

    userEvent.click(addButton!);
    expect(getByTestId('textEditor-linkOption-form')).toBeVisible();
    userEvent.click(getByTestId('textEditor-linkOption-form-cancel'));
    expect(getByTestId('textEditor-linkOption-form')).not.toBeVisible();

    userEvent.click(addButton!);
    expect(getByTestId('textEditor-linkOption-form')).toBeVisible();
    fireEvent.keyDown(getByTestId('textEditor-linkOption-form'), {
      key: 'Esc',
      code: 'Esc',
    });
    expect(getByTestId('textEditor-linkOption-form')).not.toBeVisible();
  });

  it('should be possible to remove a link', () => {
    setupEditorStateMock(true);
    const onChange = jest.fn();
    const value = '[Lorem](http://edeka.de)';
    const { getByTestId } = render(
      <TextEditor onChange={onChange} initialValue={value} linkOption />
    );
    const removeButton = getByTestId('textEditor-linkOption-remove');
    expect(removeButton).toBeVisible();
    userEvent.click(removeButton);
    expect(onChange.mock.calls[0][0]).toBe('Lorem');
  });

  it('should not be able to edit content when disabled prop is set to true', () => {
    setupEditorStateMock();
    const onChange = jest.fn();
    const value = 'Bar Foo';
    const initialValue = 'Foo Bar';
    const { getByTestId, queryByTestId } = render(
      <TextEditor
        onChange={onChange}
        disabled={true}
        initialValue={initialValue}
        inlineStyleOptions={['BOLD']}
        blockTypeOptions={['ordered-list-item']}
        headingTypeOptions={['header-one']}
      />
    );

    const editor = getByTestId('mocked-editor');
    const h1Button = queryByTestId('textEditor-headingOption-header-one');
    const orderedButton = queryByTestId(
      'textEditor-blockTypeOption-ordered-list-item'
    );
    const boldButton = queryByTestId('textEditor-inlineStyleOption-BOLD');
    userEvent.click(getByTestId('textEditor-editorWrapper'));
    fireEvent.change(editor, { target: { value } });
    userEvent.click(orderedButton!);
    userEvent.click(h1Button!);
    userEvent.click(boldButton!);
    expect(onChange.mock.calls.length).toBe(1);
  });
});
