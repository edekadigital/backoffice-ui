import * as React from 'react';
import { useContext, useMemo, useState, useRef } from 'react';
import { Theme } from '@material-ui/core';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { Alert as MuiAlert, AlertProps, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  success: { backgroundColor: theme.palette.success.main },
  error: { backgroundColor: theme.palette.error.main },
  warning: { backgroundColor: theme.palette.warning.main },
  info: { backgroundColor: theme.palette.primary.main },
}));

export type SnackbarVariant = 'info' | 'success' | 'error' | 'warning';

export type SnackbarPosition = 'top' | 'bottom';

interface SnackbarOptions {
  variant?: SnackbarVariant;
  position?: SnackbarPosition;
}

interface SnackbarContent {
  title?: string;
  message: string;
}

type PushCallback = (
  content: SnackbarContent,
  options?: SnackbarOptions
) => void;

interface SnackbarContextValue {
  push: PushCallback;
}

interface SnackbarProps extends SnackbarContent, SnackbarOptions {}

const noop = () => {};

const SnackbarContext = React.createContext<SnackbarContextValue>({
  push: noop,
});

export const useSnackbar = () => useContext(SnackbarContext);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={4} variant="filled" {...props} />;
}

export const SnackbarProvider: React.FC = (props) => {
  const [open, setOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState<SnackbarProps>();
  const queueRef = useRef<SnackbarProps[]>([]);

  const classes = useStyles();
  const alertClasses = {
    filledSuccess: classes.success,
    filledError: classes.error,
    filledWarning: classes.warning,
    filledInfo: classes.info,
  };

  const push: PushCallback = (content, options = {}) => {
    const { variant = 'info', position = 'bottom' } = options;
    queueRef.current.push({ ...content, variant, position });

    if (open) {
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setSnackbarContent(queueRef.current.shift());
      setOpen(true);
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    processQueue();
  };

  const value = useMemo(() => ({ push }), [push]);

  const snackbar = useMemo(() => {
    if (snackbarContent) {
      let anchorOrigin: SnackbarOrigin;
      switch (snackbarContent?.position) {
        case 'top':
          anchorOrigin = { horizontal: 'center', vertical: 'top' };
          break;
        case 'bottom':
        default:
          anchorOrigin = { horizontal: 'left', vertical: 'bottom' };
      }

      const alertTitle = snackbarContent.title ? (
        <AlertTitle>{snackbarContent.title}</AlertTitle>
      ) : null;

      return (
        <Snackbar
          open={open}
          anchorOrigin={anchorOrigin}
          autoHideDuration={5000}
          onClose={handleClose}
          onExited={handleExited}
        >
          <Alert
            severity={snackbarContent.variant}
            onClose={handleClose}
            classes={alertClasses}
          >
            {alertTitle}
            <span data-testid="snackbar-message">
              {snackbarContent.message}
            </span>
          </Alert>
        </Snackbar>
      );
    } else return null;
  }, [snackbarContent, open]);

  return (
    <SnackbarContext.Provider value={value}>
      {props.children}
      {snackbar}
    </SnackbarContext.Provider>
  );
};
