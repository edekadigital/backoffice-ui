import * as React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { render } from '../../test-utils';
import { TextEditor } from './TextEditor';

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

const onChange = jest.fn();

describe('<EnhancedDataTable />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { getByTestId, queryByTestId } = render(
      <TextEditor onChange={onChange} />
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

  it('should be controlled and handle an external value correctly', () => {
    const { getByTestId } = render(<TextEditor onChange={onChange} />);
    const value =
      'I **am** a *Markdown* ++String++! [I am m an inline-style link](https://www.edeka.de).';

    const editor = getByTestId('mocked-editor');
    fireEvent.change(editor, { target: { value } });
    expect(onChange.mock.calls[0][0]).toBe(value);
  });
});
