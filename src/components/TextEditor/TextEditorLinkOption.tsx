import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FormRow, TextField, Switch, ButtonBar, Button } from '../..';
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
  const [link, setLink] = React.useState<{
    url: string;
    blank: boolean;
  }>({ url: '', blank: false });
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
      const blank =
        linkInstance && linkInstance.getData().target === '_blank'
          ? true
          : false;
      setAnchorEl(event.currentTarget);
      setLink({ url, blank });
    }
  };

  const handleConfirm = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: link.url, target: link.blank ? '_blank' : '_self' }
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
    setLink({ url: '', blank: false });
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <Tooltip title="Link hinzufügen" placement={'top'} enterDelay={500} arrow>
        <span>
          <StyledToggleButton
            onClick={handleClick}
            selected={!!getLinkInstanceOfSelection()}
            disabled={editorState.getSelection().isCollapsed()}
          >
            <Link />
          </StyledToggleButton>
        </span>
      </Tooltip>
      <Tooltip title="Link einfügen" placement={'top'} enterDelay={500} arrow>
        <span>
          <StyledToggleButton
            onClick={removeLink}
            disabled={
              editorState.getSelection().isCollapsed() ||
              !getLinkInstanceOfSelection()
            }
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
        <FormRow>
          <TextField
            label="Ziel URL"
            margin="dense"
            value={link.url}
            onChange={(e) => setLink({ ...link, url: e.target.value })}
          />
        </FormRow>
        <FormRow>
          <Switch
            label="In neuem Fenster öffnen"
            checked={link.blank}
            onChange={() => setLink({ ...link, blank: !link.blank })}
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
            onClick={handleConfirm}
          >
            Link setzen
          </Button>
        </ButtonBar>
      </Popover>
    </>
  );
};
