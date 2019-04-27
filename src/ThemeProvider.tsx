import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  // TODO define theme: https://material-ui.com/customization/themes/
  palette: {
    primary: { main: '#1b66b3' },
    secondary: { main: '#fce531' },
    error: { main: '#d0021b' },
  },
  typography: {
    useNextVariants: true,
    h1: { fontWeight: 300 },
    h2: { fontWeight: 300 },
    h3: { fontWeight: 300 },
    h4: { fontWeight: 300 },
    h5: { fontWeight: 300 },
    h6: { fontWeight: 300 },
    subtitle1: {
      fontWeight: 400,
      fontSize: '1.6rem',
      lineHeight: 1.33,
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: '1.3rem',
      lineHeight: 1.6,
    },
  },
});

export const ThemeProvider: React.FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);
