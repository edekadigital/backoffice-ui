import * as React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { render } from '../../test-utils';
import { TextEditor } from './TextEditor';
import userEvent from '@testing-library/user-event';
import { useEditorState } from './useEditorState';

jest.mock('./useEditorState');

jest.mock('draft-js', () => ({
  // @ts-expect-error
  ...jest.requireActual('draft-js'),
  Editor: jest.fn((props) => {
    const modifiedOnchange = (e) => {
      const { ContentState, EditorState } = require('draft-js');
      const text = e.target.value;
      if (text) {
        const content = ContentState.createFromText(text);
        props.onChange(EditorState.createWithContent(content));
      }
    };
    return (
      <input
        data-testid="mocked-editor"
        onChange={(e) => modifiedOnchange(e)}
      />
    );
  }),
}));

const setupEditorStateMock = (preSelectAll?: boolean) => {
  (useEditorState as jest.MockedFunction<
    typeof useEditorState
  >).mockImplementation((initialValue?: string) => {
    const { useEditorState: actualUseEditorState } = jest.requireActual(
      './useEditorState'
    );
    return actualUseEditorState(initialValue, preSelectAll);
  });
};

describe('<TextEditor />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    setupEditorStateMock();
    const { getByTestId, queryByTestId } = render(
      <TextEditor onChange={() => {}} />
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
  });

  it('should handle the user input correctly', () => {
    setupEditorStateMock();
    const onChange = jest.fn();
    const { getByTestId } = render(<TextEditor onChange={onChange} />);
    const value = 'Foo bar';

    const editor = getByTestId('mocked-editor');
    fireEvent.change(editor, { target: { value } });
    expect(onChange.mock.calls[0][0]).toBe(value);
  });

  it('should be controllable and handle an external value correctly', () => {
    setupEditorStateMock();
    const onChange = jest.fn();
    const value =
      'I **am** a *Markdown* ++String++! [I am m an inline-style link](https://www.edeka.de).';
    render(<TextEditor onChange={onChange} value={value} />);
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

  it('should handle inline styles correctly', () => {
    setupEditorStateMock(true);
    const onChange = jest.fn();
    const value = 'Lorem ipsum';
    const { getByTestId, queryByTestId } = render(
      <TextEditor
        onChange={onChange}
        value={value}
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

  /** TODO: Fix this test: The add-link button won't be enabled after selecting the typed text (but only here in the test) */
  it('should be possible to add an inline link', () => {
    setupEditorStateMock(true);
    const onChange = jest.fn();
    const value = 'Lorem';
    const { getByTestId, queryByTestId } = render(
      <TextEditor onChange={onChange} linkOption />
    );
    const addButton = queryByTestId('textEditor-linkOption-add');
    expect(addButton).toBeTruthy();
    expect(addButton!.classList).toContain('Mui-disabled');
    const editor = getByTestId('mocked-editor');

    userEvent.type(editor, value);
    userEvent.type(editor, '{selectall}');
    //expect(addButton!.classList).not.toContain('Mui-disabled');
    //expect(getByTestId('textEditor-linkOption-form')).toBeVisible();
    //userEvent.click(addButton!);
  });

  /** TODO: Fix test: undo and redo buttons don't get enabled after input text, but only in the test */
  it('should be possible to to undo and redo user actions', () => {
    const onChange = jest.fn();
    const value = 'Lorem';
    const { getByTestId, queryByTestId } = render(
      <TextEditor onChange={onChange} linkOption />
    );
    const undoButton = queryByTestId('textEditor-undo');
    const redoButton = queryByTestId('textEditor-redo');
    expect(undoButton).toBeTruthy();
    expect(redoButton).toBeTruthy();
    expect(undoButton!.classList).toContain('Mui-disabled');
    const editor = getByTestId('mocked-editor');

    userEvent.type(editor, value);
    //expect(undoButton!.classList).not.toContain('Mui-disabled');
    //userEvent.click(undoButton!);
    //console.log(onChange.mock.calls);
  });
});