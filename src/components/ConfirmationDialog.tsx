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
  /**
   * The label for the cancel button
   */
  cancelLabel: string;
  /**
   * The label for the confirm button
   */
  confirmLabel: string;
  /**
   * The message to show.
   */
  message: React.ReactNode | string;
  /**
   * Handles the visibility of the dialog. If set to `true` the dialog will be visible.
   */
  open: boolean;
  /**
   * The title text to show.
   */
  title: React.ReactNode | string;
  /**
   * Callback fired when the cancel button has been clicked.
   */
  onCancel?: React.ReactEventHandler<{}>;
  /**
   * Callback fired when the close button has been clicked.
   */
  onClose?: React.ReactEventHandler<{}>;
  /**
   * Callback fired when the confirm button has been clicked.
   */
  onConfirm?: React.ReactEventHandler<{}>;
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

/**
 * | Test ID                                     | Description                 |
 * | ------------------------------------------- | --------------------------- |
 * | `confirmationDialog-title`                  | Dialog title                |
 * | `confirmationDialog-message`                | Dialog message              |
 * | `confirmationDialog-cancel`                 | Cancel button               |
 * | `confirmationDialog-confirm`                | Confirm button              |
 */
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (
  props
) => {
  const {
    cancelLabel,
    confirmLabel,
    message,
    onClose,
    onConfirm,
    onCancel,
    open,
    title,
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
