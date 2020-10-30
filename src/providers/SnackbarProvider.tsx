import * as React from 'react';
import { useContext, useMemo, useState, useRef } from 'react';
import { Theme } from '@material-ui/core';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { Alert as MuiAlert, AlertProps, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Body } from '../typography/Body';
import { darken } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: theme.palette.success.light,
    color: darken(theme.palette.success.dark!, 0.5),
    '& > .MuiAlert-icon': {
      color: theme.palette.success.dark,
    },
  },
  error: {
    backgroundColor: theme.palette.error.light,
    color: darken(theme.palette.error.dark!, 0.5),
    '& > .MuiAlert-icon': {
      color: theme.palette.error.dark,
    },
  },
  warning: {
    backgroundColor: theme.palette.warning.light,
    color: darken(theme.palette.warning.dark!, 0.5),
    '& > .MuiAlert-icon': {
      color: theme.palette.warning.dark,
    },
  },
  info: {
    backgroundColor: theme.palette.primary.light,
    color: darken(theme.palette.primary.dark!, 0.5),
  },
  action: {
    paddingTop: theme.spacing(0.625),
    paddingBottom: theme.spacing(0.625),
    alignItems: 'flex-start',
  },
}));

export type SnackbarVariant = 'info' | 'success' | 'error' | 'warning';

export type SnackbarPosition = 'top' | 'bottom';

interface SnackbarOptions {
  variant?: SnackbarVariant;
  position?: SnackbarPosition;
  autoHideDuration?: number | null;
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
    action: classes.action,
  };

  const processQueue = React.useCallback(() => {
    if (queueRef.current.length > 0) {
      setSnackbarContent(queueRef.current.shift());
      setOpen(true);
    }
  }, []);

  const push: PushCallback = React.useCallback(
    (content, options = {}) => {
      const {
        variant = 'info',
        position = 'bottom',
        autoHideDuration = 6000,
      } = options;
      queueRef.current.push({
        ...content,
        variant,
        position,
        autoHideDuration,
      });

      if (open) {
        setOpen(false);
      } else {
        processQueue();
      }
    },
    [queueRef.current, processQueue]
  );

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
          autoHideDuration={snackbarContent.autoHideDuration}
          onClose={handleClose}
          onExited={handleExited}
        >
          <Alert
            severity={snackbarContent.variant}
            onClose={handleClose}
            classes={alertClasses}
          >
            {alertTitle}
            <Body variant={'body2'} data-testid="snackbar-message">
              {snackbarContent.message}
            </Body>
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
