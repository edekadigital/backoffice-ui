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
  options?: SnackbarOptions;
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

  const push = (message: string, options?: SnackbarOptions) => {
    console.log(message, options);
    queueRef.current.push({ message, options });

    const processQueue = () => {
      if (queueRef.current.length > 0) {
        setSnackbarOptions(queueRef.current.shift());
        setOpen(true);
      }
    };

    if (open) {
      setOpen(false);
      processQueue();
    } else {
      processQueue();
    }
  };

  const value = useMemo(() => ({ push }), [push]);

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
      <Snackbar
        open={open}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        autoHideDuration={3000}
        message={`${snackbarOptions?.message} + ${snackbarOptions?.options?.variant}`}
      />
    </SnackbarContext.Provider>
  );
};
