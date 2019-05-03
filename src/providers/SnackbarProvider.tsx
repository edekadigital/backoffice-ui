import * as React from 'react';
import { SnackbarProvider as OrigSnackbarProvider } from 'notistack';
import { withStyles, WithStyles } from '@material-ui/core';
import { PRIMARY, SUCCESS, ERROR, WARNING } from '../constants/colors';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';

const styles = {
  success: { backgroundColor: SUCCESS },
  error: { backgroundColor: ERROR },
  warning: { backgroundColor: WARNING },
  info: { backgroundColor: PRIMARY },
};

export const SnackbarProviderComponent: React.FC<WithStyles> = ({
  children,
  classes,
}) => {
  const snackbarOrigin: SnackbarOrigin = {
    horizontal: 'left',
    vertical: 'bottom',
  };
  const snackbarClasses = {
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

export const SnackbarProvider = withStyles(styles)(SnackbarProviderComponent);
