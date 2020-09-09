import * as React from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TextEditorToolbar } from './TextEditorToolbar';

export interface TextEditorProps {
  blockTypeOptions?: BlockType[];
  editorSize?: 'small' | 'large';
  headingTypeOptions?: HeadingType[];
  inlineStyleOptions?: InlineStyleType[];
  /**
   * Callback fired when the value is changed.
   */
  onChange: (markdown: string) => void;
  placeholder?: string;
  /**
   * The value of the input element, required for a controlled component.
   */
  value?: string;
}

export type HeadingType = 'header-one' | 'header-two' | 'header-three';
export type InlineStyleType = 'BOLD' | 'ITALIC' | 'UNDERLINE';
export type BlockType =
  | 'blockquote'
  | 'unordered-list-item'
  | 'ordered-list-item';

const useTextEditorStyles = makeStyles<Theme, TextEditorProps>((theme) => ({
  root: {
    border: `solid 1px ${theme.palette.grey[300]}`,
    background: theme.palette.common.white,
  },
  toolbar: {
    borderBottom: `solid 1px ${theme.palette.grey[300]}`,
  },
  editor: ({ editorSize = 'small' }) => ({
    minHeight: editorSize === 'small' ? 100 : 400,
    overflowY: 'scroll',
    padding: theme.spacing(1.5),
    '& blockquote': {
      borderLeft: `${theme.spacing(0.5)}px solid ${theme.palette.grey[300]}`,
      paddingLeft: theme.spacing(1),
    },
  }),
}));

export const TextEditor: React.FC<TextEditorProps> = (props) => {
  const classes = useTextEditorStyles(props);
  const editor = React.useRef<Editor | null>(null);
  const [editorState, setEditorState] = React.useState<EditorState>(
    EditorState.createEmpty()
  );

  React.useEffect(() => {
    // Convert markdown to draftjs state
    if (props.value && props.value.length > 0) {
      const rawData = markdownToDraft(props.value);
      const contentState = convertFromRaw(rawData);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  const onChange = React.useCallback(
    (editorState: EditorState) => {
      // Convert draftjs state to markdown
      const content = editorState.getCurrentContent();
      const rawObject = convertToRaw(content);
      const markdownString = draftToMarkdown(rawObject);
      props.onChange(markdownString);

      setEditorState(editorState);
    },
    [props.onChange, editorState]
  );

  const placeholderText = () => {
    /** If the user changes block type before entering any text, we hide the placholder */
    return !editorState.getCurrentContent().hasText() &&
      editorState.getCurrentContent().getBlockMap().first().getType() !==
        'unstyled'
      ? undefined
      : props.placeholder;
  };

  return (
    <div className={classes.root}>
      <TextEditorToolbar
        onChange={onChange}
        editorState={editorState}
        blockTypeOptions={props.blockTypeOptions}
        headingTypeOptions={props.headingTypeOptions}
        inlineStyleOptions={props.inlineStyleOptions}
      />
      <div className={classes.editor} onClick={() => editor?.current?.focus()}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder={placeholderText()}
          ref={editor}
        />
      </div>
    </div>
  );
};
