import * as React from 'react';
import { useContext, useMemo, useState, useRef, ReactNode } from 'react';
// import { SnackbarProvider as OrigSnackbarProvider } from 'notistack';
import { Theme } from '@material-ui/core';
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
  | 'default'
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

export const SnackbarProvider: React.FC = (props: { children?: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarContent>();
  const queueRef = useRef<SnackbarContent[]>([]);

  const push = (message: string, options: SnackbarOptions = {}) => {
    // console.log(message, options);
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
      setSnackbarOptions(queueRef.current.shift());
      setOpen(true);
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log('handleClose - no clickaway');
    setOpen(false);
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
          message={`${snackbarOptions.message} + ${snackbarOptions.variant}`}
        />
      );
    } else {
      return null;
    }
  }, [snackbarOptions, open]);

  const classes = useStyles();
  const snackbarClasses = {
    base: classes.default,
    variantSuccess: classes.success,
    variantError: classes.error,
    variantWarning: classes.warning,
    variantInfo: classes.info,
  };
  return (
    <SnackbarContext.Provider
      value={value}
      // classes={snackbarClasses}
    >
      {props.children}
      {snackbar}
    </SnackbarContext.Provider>
  );
};
