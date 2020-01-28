import * as React from 'react';
import { useContext, useMemo, useState, useRef, ReactNode } from 'react';
import { Theme } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { PRIMARY, SUCCESS, ERROR, WARNING } from '../constants/colors';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  default: { backgroundColor: theme.palette.grey[600] },
  success: { backgroundColor: SUCCESS },
  error: { backgroundColor: ERROR },
  warning: { backgroundColor: WARNING },
  info: { backgroundColor: PRIMARY },
}));

export type SnackbarVariant =
  | 'default'
  | 'info'
  | 'success'
  | 'error'
  | 'warning';

interface SnackbarOptions {
  variant?: SnackbarVariant;
}

interface SnackbarContextValue {
  push: (message: string, options?: SnackbarOptions) => void;
}

interface SnackbarContent {
  message: string;
  variant: SnackbarVariant;
}

const noop = () => {};

const SnackbarContext = React.createContext<SnackbarContextValue>({
  push: noop,
});

export const useSnackbar = () => useContext(SnackbarContext);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={4} variant="filled" {...props} />;
}

export const SnackbarProvider: React.FC = (props: { children?: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState<SnackbarContent>();
  const queueRef = useRef<SnackbarContent[]>([]);

  const classes = useStyles();
  const alertClasses = {
    filledSuccess: classes.success,
    filledError: classes.error,
    filledWarning: classes.warning,
    filledInfo: classes.info,
  };

  const push = (message: string, options: SnackbarOptions = {}) => {
    const { variant = 'default' } = options;
    queueRef.current.push({ message, variant });

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
    if (snackbarContent && snackbarContent.variant !== 'default') {
      return (
        <Snackbar
          open={open}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          autoHideDuration={5000}
          onClose={handleClose}
          onExited={handleExited}
        >
          <Alert
            severity={snackbarContent.variant}
            onClose={handleClose}
            classes={alertClasses}
          >
            {snackbarContent.message}
          </Alert>
        </Snackbar>
      );
    } else if (snackbarContent) {
      const action = (
        <IconButton
          aria-label="close"
          color="inherit"
          onClick={handleClose}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      );

      return (
        <Snackbar
          open={open}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          autoHideDuration={5000}
          onClose={handleClose}
          onExited={handleExited}
          action={action}
          ContentProps={{ message: snackbarContent.message }}
        />
      );
    } else {
      return null;
    }
  }, [snackbarContent, open]);

  return (
    <SnackbarContext.Provider value={value}>
      {props.children}
      {snackbar}
    </SnackbarContext.Provider>
  );
};
