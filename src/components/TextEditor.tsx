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

const HEADING_TYPES: Array<{
  label: string;
  style: HeadingType;
  icon: React.ReactElement;
}> = [
  {
    label: 'H1',
    style: 'header-one',
    icon: <LooksOneIcon />,
  },
  { label: 'H2', style: 'header-two', icon: <LooksTwoIcon /> },
  { label: 'H3', style: 'header-three', icon: <LooksThreeIcon /> },
];

const INLINE_STYLES: Array<{
  label: string;
  style: InlineStyleType;
  icon: React.ReactElement;
}> = [
  { label: 'Bold', style: 'BOLD', icon: <FormatBoldIcon /> },
  { label: 'Italic', style: 'ITALIC', icon: <FormatItalicIcon /> },
  { label: 'Underline', style: 'UNDERLINE', icon: <FormatUnderlinedIcon /> },
];

const BLOCK_TYPES: Array<{
  label: string;
  style: BlockType;
  icon: React.ReactElement;
}> = [
  {
    label: 'UL',
    style: 'unordered-list-item',
    icon: <FormatListBulletedIcon />,
  },
  { label: 'OL', style: 'ordered-list-item', icon: <FormatListNumberedIcon /> },
  { label: 'Blockquote', style: 'blockquote', icon: <FormatQuoteIcon /> },
];

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

  const renderHeadingTypeOptions = React.useMemo(() => {
    if (!props.headingTypeOptions || props.headingTypeOptions.length < 1)
      return null;
    return (
      <>
        {HEADING_TYPES.filter((ht) =>
          props.headingTypeOptions?.includes(ht.style)
        ).map((type) => (
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
    );
  }, [props.headingTypeOptions, toggleBlockType]);

  const renderInlineStyleOptions = React.useMemo(() => {
    if (!props.inlineStyleOptions || props.inlineStyleOptions.length < 1)
      return null;
    return (
      <>
        {INLINE_STYLES.filter((is) =>
          props.inlineStyleOptions?.includes(is.style)
        ).map((type) => (
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
    );
  }, [props.inlineStyleOptions, toggleInlineStyle]);

  const renderBlockTypeOptions = React.useMemo(() => {
    if (!props.blockTypeOptions || props.blockTypeOptions.length < 1)
      return null;
    return (
      <>
        {BLOCK_TYPES.filter((bt) =>
          props.blockTypeOptions?.includes(bt.style)
        ).map((type) => (
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
    );
  }, [props.blockTypeOptions]);

  const toolbar =
    (!props.blockTypeOptions || props.blockTypeOptions?.length < 1) &&
    (!props.headingTypeOptions || props.headingTypeOptions?.length < 1) &&
    (!props.inlineStyleOptions ||
      props.inlineStyleOptions?.length < 1) ? null : (
      <div className={classes.toolbar}>
        {renderHeadingTypeOptions}
        {renderInlineStyleOptions}
        {renderBlockTypeOptions}
      </div>
    );

  return (
    <div className={classes.root}>
      {toolbar}
      <div className={classes.editor}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder={props.placeholder}
        />
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
