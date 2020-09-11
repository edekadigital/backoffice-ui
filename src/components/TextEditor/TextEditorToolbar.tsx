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
} from '../../icons';
import { EditorState, RichUtils } from 'draft-js';
import { Tooltip, Divider } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import { withStyles } from '@material-ui/styles';
import { TextEditorLinkOption } from './TextEditorLinkOption';

interface TextEditorToolbarProps
  extends Pick<
    TextEditorProps,
    'headingTypeOptions' | 'blockTypeOptions' | 'inlineStyleOptions'
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
            >
              {type.icon}
            </StyledToggleButton>
          </Tooltip>
        ))}
      </>
    );
  }, [props.headingTypeOptions, handleBlockType]);

  const renderInlineStyleOptions = React.useMemo(() => {
    if (!props.inlineStyleOptions || props.inlineStyleOptions.length < 1)
      return null;
    return (
      <>
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
              onMouseDown={(e) => handleInlineStyle(e, type.style)}
              value={type.style}
              selected={props.editorState
                .getCurrentInlineStyle()
                .has(type.style)}
            >
              {type.icon}
            </StyledToggleButton>
          </Tooltip>
        ))}
      </>
    );
  }, [props.inlineStyleOptions, handleInlineStyle]);

  const renderBlockTypeOptions = React.useMemo(() => {
    if (!props.inlineStyleOptions || props.inlineStyleOptions.length < 1)
      return null;
    return (
      <>
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
            >
              {type.icon}
            </StyledToggleButton>
          </Tooltip>
        ))}
      </>
    );
  }, [props.blockTypeOptions, handleBlockType]);

  return (!props.blockTypeOptions || props.blockTypeOptions?.length < 1) &&
    (!props.headingTypeOptions || props.headingTypeOptions?.length < 1) &&
    (!props.inlineStyleOptions || props.inlineStyleOptions?.length < 1) ? (
    <></>
  ) : (
    <div className={classes.toolbar}>
      {renderHeadingTypeOptions}
      <Divider flexItem orientation="vertical" className={classes.divider} />
      {renderInlineStyleOptions}
      <Divider flexItem orientation="vertical" className={classes.divider} />
      {renderBlockTypeOptions}
      <Divider flexItem orientation="vertical" className={classes.divider} />
      <TextEditorLinkOption
        editorState={props.editorState}
        onChange={props.onChange}
      />
    </div>
  );
};
