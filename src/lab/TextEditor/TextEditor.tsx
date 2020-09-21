import * as React from 'react';
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  DraftDecorator,
  ContentBlock,
  ContentState,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TextEditorToolbar } from './TextEditorToolbar';

export interface TextEditorProps {
  /**
   * List of allowed block type options to be provided in the editors toolbar
   */
  blockTypeOptions?: BlockType[];
  /**
   * The size of the rich text editor
   * @default "small"
   */
  editorSize?: 'small' | 'large';
  /**
   * List of allowed heading type options to be provided in the editors toolbar
   */
  headingTypeOptions?: HeadingType[];
  /**
   * List of allowed inline style options to be provided in the editors toolbar
   */
  inlineStyleOptions?: InlineStyleType[];
  /**
   * Allows the option to add links by providing an according option in the editors toolbar
   */
  linkOption?: boolean;
  /**
   * Callback fired when the value is changed.
   */
  onChange: (markdown: string) => void;
  /**
   * The short hint displayed in the input before the user enters a value.
   */
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

const extendedStyleItems = {
  UNDERLINE: {
    open: function open() {
      return '++';
    },

    close: function close() {
      return '++';
    },
  },
  ITALIC: {
    open: function open() {
      return '*';
    },

    close: function close() {
      return '*';
    },
  },
};

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
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: LinkDecoratorComponent,
    },
  ] as DraftDecorator[]);
  const [editorState, setEditorState] = React.useState<EditorState>(
    EditorState.createEmpty(decorator)
  );

  React.useEffect(() => {
    // Convert markdown to draftjs state
    if (props.value && props.value.length > 0) {
      const rawData = markdownToDraft(props.value, {
        blockStyles: {
          ins_open: 'UNDERLINE',
        },
        remarkableOptions: {
          enable: {
            inline: 'ins',
          },
        },
      });
      const contentState = convertFromRaw(rawData);
      const newEditorState = EditorState.createWithContent(
        contentState,
        decorator
      );
      setEditorState(newEditorState);
      onChange(newEditorState);
    }
  }, []);

  const onChange = React.useCallback(
    (editorState: EditorState) => {
      // Convert draftjs state to markdown
      const content = editorState.getCurrentContent();
      const rawObject = convertToRaw(content);
      const markdownString = draftToMarkdown(rawObject, {
        styleItems: extendedStyleItems,
      });
      console.log('markdownString: ', markdownString);
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

  const focusOnEditor = () => editor?.current?.focus();

  return (
    <div className={classes.root} data-testid="textEditor">
      <TextEditorToolbar
        onChange={onChange}
        editorState={editorState}
        blockTypeOptions={props.blockTypeOptions}
        headingTypeOptions={props.headingTypeOptions}
        inlineStyleOptions={props.inlineStyleOptions}
        linkOption={props.linkOption}
      />
      <div
        className={classes.editor}
        onClick={() => focusOnEditor()}
        data-testid="textEditor-editorWrapper"
      >
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

const findLinkEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
};

const LinkDecoratorComponent: React.FC<{
  contentState: ContentState;
  entityKey: string;
}> = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} data-testid="textEditor-linkDecorator">
      {props.children}
    </a>
  );
};
