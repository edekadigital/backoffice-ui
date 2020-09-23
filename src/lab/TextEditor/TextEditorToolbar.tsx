import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  TextEditorProps,
  HeadingType,
  InlineStyleType,
  BlockType,
} from './TextEditor';
import {
  LooksOneIcon,
  LooksTwoIcon,
  LooksThreeIcon,
  FormatBoldIcon,
  FormatItalicIcon,
  FormatUnderlinedIcon,
  FormatListBulletedIcon,
  FormatListNumberedIcon,
  FormatQuoteIcon,
  Undo,
  Redo,
} from '../../icons';
import { EditorState, RichUtils } from 'draft-js';
import { Tooltip, Divider, IconButton } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import { withStyles } from '@material-ui/styles';
import { TextEditorLinkOption } from './TextEditorLinkOption';

interface TextEditorToolbarProps
  extends Pick<
    TextEditorProps,
    | 'headingTypeOptions'
    | 'blockTypeOptions'
    | 'inlineStyleOptions'
    | 'linkOption'
  > {
  editorState: EditorState;
  onChange(editorState: EditorState): void;
}

const useTextEditorToolbarStyles = makeStyles<Theme>((theme) => ({
  toolbar: {
    borderBottom: `solid 1px ${theme.palette.grey[300]}`,
    display: 'flex',
  },
  divider: {
    margin: theme.spacing(1, 0.25),
  },
  iconButton: {
    borderRadius: theme.spacing(0.5),
    margin: theme.spacing(0.25),
  },
}));

export const StyledToggleButton = withStyles((theme) => ({
  root: {
    border: 'none',
    margin: theme.spacing(0.25),
    '&.Mui-selected': {
      marginLeft: `${theme.spacing(0.25)}px!important`,
    },
  },
  selected: {
    marginLeft: theme.spacing(0.25),
  },
}))(ToggleButton);

interface EditorBase {
  label: string;
  icon: React.ReactElement;
}

interface EditorHeadingType extends EditorBase {
  style: HeadingType;
}

interface EditorInlineStyle extends EditorBase {
  style: InlineStyleType;
}

interface EditorBlockType extends EditorBase {
  style: BlockType;
}

const HEADING_TYPES: Array<EditorHeadingType> = [
  {
    label: 'H1',
    style: 'header-one',
    icon: <LooksOneIcon />,
  },
  { label: 'H2', style: 'header-two', icon: <LooksTwoIcon /> },
  { label: 'H3', style: 'header-three', icon: <LooksThreeIcon /> },
];

const INLINE_STYLES: Array<EditorInlineStyle> = [
  { label: 'Fett', style: 'BOLD', icon: <FormatBoldIcon /> },
  { label: 'Kursiv', style: 'ITALIC', icon: <FormatItalicIcon /> },
  {
    label: 'Unterstrichen',
    style: 'UNDERLINE',
    icon: <FormatUnderlinedIcon />,
  },
];

const BLOCK_TYPES: Array<EditorBlockType> = [
  {
    label: 'Aufzählungszeichen',
    style: 'unordered-list-item',
    icon: <FormatListBulletedIcon />,
  },
  {
    label: 'Nummerierung',
    style: 'ordered-list-item',
    icon: <FormatListNumberedIcon />,
  },
  { label: 'Blockzitat', style: 'blockquote', icon: <FormatQuoteIcon /> },
];

export const TextEditorToolbar: React.FC<TextEditorToolbarProps> = (props) => {
  const classes = useTextEditorToolbarStyles();
  const selection = props.editorState.getSelection();
  const blockType = props.editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const handleInlineStyle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    inlineStyle: string
  ) => {
    e.preventDefault();
    props.onChange(RichUtils.toggleInlineStyle(props.editorState, inlineStyle));
  };

  const handleBlockType = (
    e: React.MouseEvent<HTMLElement>,
    blockType: string
  ) => {
    e.preventDefault();
    props.onChange(RichUtils.toggleBlockType(props.editorState, blockType));
  };

  const renderHeadingTypeOptions = React.useMemo(() => {
    if (!props.headingTypeOptions || props.headingTypeOptions.length < 1)
      return null;
    return (
      <>
        <span data-testid="textEditor-headingOptions">
          {HEADING_TYPES.filter((ht) =>
            props.headingTypeOptions?.includes(ht.style)
          ).map((type) => (
            <Tooltip
              key={type.label}
              title={type.label}
              placement={'top'}
              enterDelay={500}
              arrow
            >
              <StyledToggleButton
                value={type.style}
                selected={type.style === blockType}
                onMouseDown={(e) => handleBlockType(e, type.style)}
                data-testid={`textEditor-headingOption-${type.style}`}
              >
                {type.icon}
              </StyledToggleButton>
            </Tooltip>
          ))}
        </span>
        <Divider flexItem orientation="vertical" className={classes.divider} />
      </>
    );
  }, [props.headingTypeOptions, handleBlockType]);

  const renderInlineStyleOptions = React.useMemo(() => {
    if (!props.inlineStyleOptions || props.inlineStyleOptions.length < 1)
      return null;
    return (
      <>
        <span data-testid="textEditor-inlineStyleOptions">
          {INLINE_STYLES.filter((is) =>
            props.inlineStyleOptions?.includes(is.style)
          ).map((type) => (
            <Tooltip
              key={type.label}
              title={type.label}
              placement={'top'}
              enterDelay={500}
              arrow
            >
              <StyledToggleButton
                onMouseDown={(e) => {
                  handleInlineStyle(e, type.style);
                }}
                value={type.style}
                selected={props.editorState
                  .getCurrentInlineStyle()
                  .has(type.style)}
                data-testid={`textEditor-inlineStyleOption-${type.style}`}
              >
                {type.icon}
              </StyledToggleButton>
            </Tooltip>
          ))}
        </span>
        <Divider flexItem orientation="vertical" className={classes.divider} />
      </>
    );
  }, [props.inlineStyleOptions, handleInlineStyle]);

  const renderBlockTypeOptions = React.useMemo(() => {
    if (!props.blockTypeOptions || props.blockTypeOptions.length < 1)
      return null;
    return (
      <>
        <span data-testid="textEditor-blockTypeOptions">
          {BLOCK_TYPES.filter((bt) =>
            props.blockTypeOptions?.includes(bt.style)
          ).map((type) => (
            <Tooltip
              key={type.label}
              title={type.label}
              placement={'top'}
              enterDelay={500}
              arrow
            >
              <StyledToggleButton
                value={type.style}
                selected={type.style === blockType}
                onMouseDown={(e) => handleBlockType(e, type.style)}
                data-testid={`textEditor-blockTypeOption-${type.style}`}
              >
                {type.icon}
              </StyledToggleButton>
            </Tooltip>
          ))}
        </span>
        <Divider flexItem orientation="vertical" className={classes.divider} />
      </>
    );
  }, [props.blockTypeOptions, handleBlockType]);

  const renderLinkOption = React.useMemo(() => {
    if (!props.linkOption) {
      return null;
    }
    return (
      <>
        <TextEditorLinkOption
          editorState={props.editorState}
          onChange={props.onChange}
        />
        <Divider flexItem orientation="vertical" className={classes.divider} />
      </>
    );
  }, [props.linkOption, props.onChange, props.editorState]);

  return (
    <div className={classes.toolbar} data-testid="textEditor-toolbar">
      {renderHeadingTypeOptions}
      {renderInlineStyleOptions}
      {renderBlockTypeOptions}
      {renderLinkOption}
      <Tooltip title="Rückgängig" placement={'top'} enterDelay={500} arrow>
        <span>
          <IconButton
            onClick={() => props.onChange(EditorState.undo(props.editorState))}
            disabled={props.editorState.getUndoStack().size < 1}
            classes={{ root: classes.iconButton }}
            data-testid="textEditor-undo"
          >
            <Undo />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Wiederholen" placement={'top'} enterDelay={500} arrow>
        <span>
          <IconButton
            onClick={() => props.onChange(EditorState.redo(props.editorState))}
            disabled={props.editorState.getRedoStack().size < 1}
            classes={{ root: classes.iconButton }}
            data-testid="textEditor-redo"
          >
            <Redo />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
};
