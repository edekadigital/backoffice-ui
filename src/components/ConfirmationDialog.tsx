import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

import { Button } from './Button';

export interface ConfirmationDialogProps {
  open: boolean;
  title: React.ReactNode | string;
  message: React.ReactNode | string;
  confirmLabel: string;
  cancelLabel: string;
  onClose?: React.ReactEventHandler<{}>;
  onConfirm?: React.ReactEventHandler<{}>;
  onCancel?: React.ReactEventHandler<{}>;
}

const useDialogStyles = makeStyles((theme: Theme) => ({
  spacing: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    ['& > :not(:first-child)']: {
      marginLeft: theme.spacing(2),
    },
  },
}));

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = props => {
  const {
    open,
    title,
    message,
    confirmLabel,
    cancelLabel,
    onClose,
    onConfirm,
    onCancel,
  } = props;
  const theme = useTheme<Theme>();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dialogClasses = useDialogStyles();
  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle data-testid="confirmationDialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          variant="body1"
          data-testid="confirmationDialog-message"
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions classes={dialogClasses}>
        <Button
          variant="outlined"
          onClick={onCancel}
          data-testid="confirmationDialog-cancel"
        >
          {cancelLabel}
        </Button>
        <Button onClick={onConfirm} data-testid="confirmationDialog-confirm">
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
