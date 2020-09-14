import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FormRow, TextField, ButtonBar, Button } from '../..';
import { Link, LinkOffIcon } from '../../icons';
import { EditorState, RichUtils } from 'draft-js';
import { Tooltip, Popover } from '@material-ui/core';
import { StyledToggleButton } from './TextEditorToolbar';

const useLinkButtonStyles = makeStyles<Theme>((theme) => ({
  paper: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up(theme.breakpoints.width('sm'))]: {
      minWidth: 400,
    },
    '& > button': {
      marginTop: theme.spacing(2),
      marginLeft: 'auto',
      display: 'block',
    },
  },
}));

export const TextEditorLinkOption: React.FC<{
  editorState: EditorState;
  onChange(editorState: EditorState): void;
}> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [url, setUrl] = React.useState<string>('');
  const classes = useLinkButtonStyles();
  const { editorState, onChange } = props;

  const getLinkInstanceOfSelection = () => {
    const contentState = editorState.getCurrentContent();
    const startKey = editorState.getSelection().getStartKey();
    const startOffset = editorState.getSelection().getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    if (linkKey && contentState.getEntity(linkKey).getType() === 'LINK') {
      const linkInstance = contentState.getEntity(linkKey);
      return linkInstance;
    }
    return false;
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl) {
      closePopover();
      return;
    }
    event.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const linkInstance = getLinkInstanceOfSelection();
      const url = linkInstance ? linkInstance.getData().url : '';
      setAnchorEl(event.currentTarget);
      setUrl(url);
    }
  };

  const handleConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    onChange(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
    closePopover();
  };

  const removeLink = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      onChange(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  const closePopover = () => {
    setAnchorEl(null);
    setUrl('');
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Link einfügen" placement={'top'} enterDelay={500} arrow>
        <span>
          <StyledToggleButton
            onClick={handleClick}
            selected={!!getLinkInstanceOfSelection()}
            disabled={editorState.getSelection().isCollapsed()}
            value={getLinkInstanceOfSelection()}
          >
            <Link />
          </StyledToggleButton>
        </span>
      </Tooltip>
      <Tooltip title="Link entfernen" placement={'top'} enterDelay={500} arrow>
        <span>
          <StyledToggleButton
            onClick={removeLink}
            disabled={
              editorState.getSelection().isCollapsed() ||
              !getLinkInstanceOfSelection()
            }
            value={getLinkInstanceOfSelection()}
          >
            <LinkOffIcon />
          </StyledToggleButton>
        </span>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => closePopover()}
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
        <form onSubmit={handleConfirm}>
          <FormRow gutterBottom>
            <TextField
              label="Ziel URL"
              margin="dense"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoFocus
            />
          </FormRow>
          <ButtonBar align={'right'}>
            <Button
              variant={'text'}
              color={'primary'}
              onClick={() => closePopover()}
            >
              Abbrechen
            </Button>
            <Button
              variant={'contained'}
              color={'primary'}
              type={'submit'}
              disabled={!url}
            >
              Link setzen
            </Button>
          </ButtonBar>
        </form>
      </Popover>
    </>
  );
};
