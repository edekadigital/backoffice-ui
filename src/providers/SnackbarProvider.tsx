import * as React from 'react';
import { useContext, useMemo, useState, useRef, ReactNode } from 'react';
import { Theme } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { PRIMARY, SUCCESS, ERROR, WARNING } from '../constants/colors';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  default: { backgroundColor: theme.palette.grey[600] },
  success: { backgroundColor: SUCCESS },
  error: { backgroundColor: ERROR },
  warning: { backgroundColor: WARNING },
  info: { backgroundColor: PRIMARY },
}));

export type SnackbarVariant =
  | undefined
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

interface SnackbarOptions {
  variant?: SnackbarVariant;
}

interface SnackbarContextValue {
  push: (message: string, options?: SnackbarOptions) => void;
}

interface SnackbarContent {
  message: string;
  variant?: SnackbarVariant;
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
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarContent>();
  const queueRef = useRef<SnackbarContent[]>([]);

  const classes = useStyles();
  const snackbarClasses = {
    filledSuccess: classes.success,
    filledError: classes.error,
    filledWarning: classes.warning,
    filledInfo: classes.info,
  };

  const push = (message: string, options: SnackbarOptions = {}) => {
    console.log(message, options);
    console.log(open);
    const { variant = undefined } = options;
    queueRef.current.push({ message, variant });

    if (open) {
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setSnackbarOptions(queueRef.current.shift());
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
    if (snackbarOptions) {
      return (
        <Snackbar
          open={open}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          autoHideDuration={5000}
          onClose={handleClose}
          onExited={handleExited}
        >
          <Alert
            severity={snackbarOptions.variant}
            onClose={handleClose}
            classes={snackbarClasses}
          >
            {snackbarOptions.message}
          </Alert>
        </Snackbar>
      );
    } else {
      return null;
    }
  }, [snackbarOptions, open]);

  return (
    <SnackbarContext.Provider value={value}>
      {props.children}
      {snackbar}
    </SnackbarContext.Provider>
  );
};
