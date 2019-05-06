import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from './SnackbarProvider';
import { ThemeProvider } from './ThemeProvider';

export const BackofficeUiProvider: React.FC = ({ children }) => (
  <CssBaseline>
    <ThemeProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  </CssBaseline>
);
