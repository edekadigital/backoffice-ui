import * as React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles/';
import shadows from '@material-ui/core/styles/shadows';
import { grey, red, common, orange, green } from '@material-ui/core/colors';
import { deDE } from '@material-ui/core/locale';
import { edekaBlue } from '../constants';

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: edekaBlue.main, light: edekaBlue[50] },
      secondary: { main: '#fff' },
      warning: {
        main: orange[500],
        light: orange[50],
        dark: orange[700],
      },
      error: {
        main: red[700],
        light: red[50],
        dark: red[900],
      },
      success: { main: green[500], light: green[50], dark: green[700] },
      background: { default: grey[100], paper: common.white },
    },
    typography: {
      h1: { fontWeight: 'normal', lineHeight: 1, letterSpacing: -0.66 },
      h2: { fontWeight: 'normal', lineHeight: 1, letterSpacing: -0.5 },
      h3: { fontWeight: 'normal', lineHeight: 1.02, letterSpacing: 'normal' },
      h4: { fontWeight: 'normal', lineHeight: 1.15, letterSpacing: 0.07 },
      h5: { fontWeight: 'normal', lineHeight: 1.33, letterSpacing: 'normal' },
      h6: { fontWeight: 500, lineHeight: 1.6, letterSpacing: 0.07 },
      subtitle1: {
        fontWeight: 'normal',
        fontSize: '1rem',
        lineHeight: 1.75,
        letterSpacing: 0.09,
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.57,
        letterSpacing: 0.07,
      },
      body1: {
        letterSpacing: 0.09,
      },
      body2: {
        letterSpacing: 0.1,
      },
      caption: {
        letterSpacing: 0.3,
        fontWeight: 'normal',
      },
      button: {
        lineHeight: 1.71,
      },
      overline: {
        fontWeight: 500,
        letterSpacing: 0.83,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 2520,
      },
    },
    overrides: {
      MuiButton: {
        contained: {
          '&:hover': {
            boxShadow: shadows[8],
          },
        },
      },
      MuiSelect: {
        select: { '&:focus': { backgroundColor: 'rgba(0, 0, 0, 0.0)' } },
      },
      MuiTableRow: {
        root: {
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: edekaBlue[50],
          },
        },
      },
    },
  },
  deDE
);

export const ThemeProvider: React.FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);
