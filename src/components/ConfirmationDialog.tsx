import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  withMobileDialog,
} from '@material-ui/core';
import { Button } from './Button';
import { InjectedProps } from '@material-ui/core/withMobileDialog';

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

const ConfirmationDialogComponent: React.FC<ConfirmationDialogProps &
  InjectedProps> = props => {
  const {
    open,
    title,
    message,
    confirmLabel,
    cancelLabel,
    onClose,
    onConfirm,
    onCancel,
    fullScreen,
  } = props;
  return (
    <Dialog open={open} fullScreen={fullScreen} onClose={onClose}>
      <DialogTitle data-testid="confirmationDialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          variant="body1"
          data-testid="confirmationDialog-message"
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
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

export const ConfirmationDialog = withMobileDialog<ConfirmationDialogProps>()(
  ConfirmationDialogComponent
);
