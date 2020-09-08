import * as React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  FormatBoldIcon,
  FormatItalicIcon,
  FormatUnderlinedIcon,
  LooksOneIcon,
  LooksTwoIcon,
  LooksThreeIcon,
  FormatQuoteIcon,
  FormatListBulletedIcon,
  FormatListNumberedIcon,
} from '../icons';
import { IconButton, Tooltip } from '@material-ui/core';

export interface TextEditorProps {
  /**
   * Callback fired when the value is changed.
   */
  onChange: (markdown: string) => void;
  /**
   * The value of the input element, required for a controlled component.
   */
  value?: string;
}

const HEADING_TYPES = [
  {
    label: 'H1',
    style: 'header-one',
    icon: <LooksOneIcon />,
  },
  { label: 'H2', style: 'header-two', icon: <LooksTwoIcon /> },
  { label: 'H3', style: 'header-three', icon: <LooksThreeIcon /> },
];

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: <FormatBoldIcon /> },
  { label: 'Italic', style: 'ITALIC', icon: <FormatItalicIcon /> },
  { label: 'Underline', style: 'UNDERLINE', icon: <FormatUnderlinedIcon /> },
];

const BLOCK_TYPES = [
  { label: 'Blockquote', style: 'blockquote', icon: <FormatQuoteIcon /> },
  {
    label: 'UL',
    style: 'unordered-list-item',
    icon: <FormatListBulletedIcon />,
  },
  { label: 'OL', style: 'ordered-list-item', icon: <FormatListNumberedIcon /> },
];

const useTextEditorStyles = makeStyles<Theme>((theme) => ({
  root: {
    border: `solid 1px ${theme.palette.grey[300]}`,
    background: theme.palette.common.white,
  },
  toolbar: {
    borderBottom: `solid 1px ${theme.palette.grey[300]}`,
  },
  editor: {
    padding: theme.spacing(1.5),
    '& blockquote': {
      borderLeft: `${theme.spacing(0.5)}px solid ${theme.palette.grey[300]}`,
      paddingLeft: theme.spacing(1),
    },
  },
}));

export const TextEditor: React.FC<TextEditorProps> = (props) => {
  const classes = useTextEditorStyles();
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

  const onChange = (editorState: EditorState) => {
    // Convert draftjs state to markdown
    const content = editorState.getCurrentContent();
    const rawObject = convertToRaw(content);
    const markdownString = draftToMarkdown(rawObject);
    props.onChange(markdownString);

    setEditorState(editorState);
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const selection = editorState.getSelection();
  const currentInlineStyle = editorState.getCurrentInlineStyle();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <>
          {HEADING_TYPES.map((type) => (
            <StyleButton
              key={type.label}
              active={type.style === blockType}
              label={type.label}
              onToggle={toggleBlockType}
              style={type.style}
              icon={type.icon}
            />
          ))}
        </>
        <>
          {INLINE_STYLES.map((type) => (
            <StyleButton
              key={type.label}
              active={currentInlineStyle.has(type.style)}
              label={type.label}
              onToggle={toggleInlineStyle}
              style={type.style}
              icon={type.icon}
            />
          ))}
        </>
        <>
          {BLOCK_TYPES.map((type) => (
            <StyleButton
              key={type.label}
              active={type.style === blockType}
              label={type.label}
              onToggle={toggleBlockType}
              style={type.style}
              icon={type.icon}
            />
          ))}
        </>
      </div>
      <div className={classes.editor}>
        <Editor editorState={editorState} onChange={onChange} />
      </div>
    </div>
  );
};

/** Style Buttons */

const useStyles = makeStyles<Theme, StyleButtonProps>((theme) => ({
  styleButton: ({ active }) => ({
    color: active ? theme.palette.primary.main : theme.palette.grey[500],
    borderRadius: 0,
  }),
}));

interface StyleButtonProps {
  active?: boolean;
  label: string;
  onToggle: (inlineStyle: string) => void;
  style: string;
  icon: React.ReactElement;
}

const StyleButton: React.FC<StyleButtonProps> = (props) => {
  const styleButtonClasses = useStyles(props);

  const onToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onToggle(props.style);
  };
  return (
    <Tooltip title={props.label} placement={'top'} arrow>
      <IconButton
        classes={{ root: styleButtonClasses.styleButton }}
        onMouseDown={onToggle}
        aria-label={props.label}
      >
        {props.icon}
      </IconButton>
    </Tooltip>
  );
};
