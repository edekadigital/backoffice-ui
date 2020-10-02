import * as React from 'react';
import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Close } from '../icons';

export interface DialogProps {
  /**
   * The elements (children) to be rendered in the dialog content container
   */
  children: React.ReactNode;
  /**
   * Handles the visibility of the dialog. If set to `true` the dialog will be visible.
   */
  open: boolean;
  /**
   * The size of the dialog. On small viewports the size is set to full width automatically.
   * @default "sm"
   */
  size?: 'xs' | 'sm' | 'md';
  /**
   * The title text to show.
   */
  title: React.ReactNode | string;
  /**
   * If set, a close button will be displayed in the dialogs header.
   * The callback is getting fired when the close button has been clicked.
   */
  onClose?: React.ReactEventHandler<{}>;
}

const useDialogStyles = makeStyles((theme: Theme) => ({
  dialogDividers: {
    borderBottom: 'none',
    padding: theme.spacing(3, 3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

/**
 * | Test ID          | Description                |
 * | ---------------- | -------------------------- |
 * | `dialog`         | dialog container           |
 * | `dialog-title`   | dialog title               |
 * | `dialog-content` | dialog content container   |
 */
export const Dialog: React.FC<DialogProps> = (props) => {
  const { open, title, children, onClose, size = 'sm' } = props;

  const classes = useDialogStyles();
  const theme = useTheme<Theme>();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dialogTestId = { 'data-testid': 'dialog' } as React.InputHTMLAttributes<
    HTMLInputElement
  >;

  return (
    <MuiDialog
      open={open}
      aria-labelledby="dialog-title"
      maxWidth={size}
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{ ...dialogTestId }}
    >
      <DialogTitle id="dialog-title" data-testid="dialog-title">
        {title}
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
            data-testid="dialog-close"
          >
            <Close />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent
        dividers
        classes={{
          dividers: classes.dialogDividers,
        }}
        data-testid="dialog-content"
      >
        {children}
      </DialogContent>
    </MuiDialog>
  );
};
