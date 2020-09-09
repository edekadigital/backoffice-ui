import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  TextEditorProps,
  HeadingType,
  InlineStyleType,
  BlockType,
} from './TextEditor';
import { FormRow, TextField, Switch, ButtonBar, Button } from '../..';
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
import { Tooltip, Popover, IconButton } from '@material-ui/core';

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
  },
}));

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

  const toggleInlineStyle = (inlineStyle: string) => {
    props.onChange(RichUtils.toggleInlineStyle(props.editorState, inlineStyle));
  };

  const toggleBlockType = (blockType: string) => {
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
            active={props.editorState.getCurrentInlineStyle().has(type.style)}
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

  return (!props.blockTypeOptions || props.blockTypeOptions?.length < 1) &&
    (!props.headingTypeOptions || props.headingTypeOptions?.length < 1) &&
    (!props.inlineStyleOptions || props.inlineStyleOptions?.length < 1) ? (
    <></>
  ) : (
    <div className={classes.toolbar}>
      {renderHeadingTypeOptions}
      {renderInlineStyleOptions}
      {renderBlockTypeOptions}
      <LinkButton />
    </div>
  );
};

/** Style Buttons */

const useToolbarButtonStyles = makeStyles<Theme, StyleButtonProps>((theme) => ({
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
  const styleButtonClasses = useToolbarButtonStyles(props);

  const onToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onToggle(props.style);
  };
  return (
    <Tooltip title={props.label} placement={'top'} enterDelay={500} arrow>
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

const useLinkButtonStyles = makeStyles<Theme>((theme) => ({
  paper: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up(theme.breakpoints.width('sm'))]: {
      minWidth: 500,
    },
    '& > button': {
      marginTop: theme.spacing(2),
      marginLeft: 'auto',
      display: 'block',
    },
  },
}));

const LinkButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useLinkButtonStyles();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  return (
    <>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Link einfügen
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{ paper: classes.paper }}
      >
        <FormRow>
          <TextField label="Ziel URL" margin="dense" />
        </FormRow>
        <FormRow>
          <Switch label="In neuem Fenster öffnen" />
        </FormRow>
        <ButtonBar align={'right'}>
          <Button
            variant={'text'}
            color={'primary'}
            onClick={() => setAnchorEl(null)}
          >
            Abbrechen
          </Button>
          <Button variant={'contained'} color={'primary'}>
            Link setzen
          </Button>
        </ButtonBar>
      </Popover>
    </>
  );
};
