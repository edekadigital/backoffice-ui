import * as React from 'react';
import { SnackbarProvider as OrigSnackbarProvider } from 'notistack';
import { Theme } from '@material-ui/core';
import { PRIMARY, SUCCESS, ERROR, WARNING } from '../constants/colors';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  default: { backgroundColor: theme.palette.grey[600] },
  success: { backgroundColor: SUCCESS },
  error: { backgroundColor: ERROR },
  warning: { backgroundColor: WARNING },
  info: { backgroundColor: PRIMARY },
}));

/**
 * TODO: remove notistack and use native material-ui snackbars instead
 * see: https://material-ui.com/components/snackbars/
 */
export const SnackbarProvider: React.FC = ({ children }) => {
  const classes = useStyles();
  const snackbarOrigin: SnackbarOrigin = {
    horizontal: 'left',
    vertical: 'bottom',
  };
  const snackbarClasses = {
    base: classes.default,
    variantSuccess: classes.success,
    variantError: classes.error,
    variantWarning: classes.warning,
    variantInfo: classes.info,
  };
  return (
    <OrigSnackbarProvider
      maxSnack={4}
      anchorOrigin={snackbarOrigin}
      classes={snackbarClasses}
    >
      {children}
    </OrigSnackbarProvider>
  );
};
