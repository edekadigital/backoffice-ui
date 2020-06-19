import * as React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { deDE } from '@material-ui/core/locale';
import { ERROR, PRIMARY, SECONDARY, SECONDARY_TEXT } from '../constants';

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: PRIMARY },
      secondary: { main: SECONDARY },
      error: { main: ERROR },
      background: { default: '#f5f5f5', paper: '#ffffff' },
      text: { secondary: SECONDARY_TEXT },
    },
    typography: {
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
    overrides: {
      MuiFormHelperText: {
        root: {
          paddingLeft: 8,
          paddingRight: 8,
        },
      },
      MuiSelect: {
        select: { '&:focus': { backgroundColor: 'rgba(0, 0, 0, 0.0)' } },
      },
      MuiMenuItem: {
        root: {
          '&:hover': { backgroundColor: 'rgba(234, 234, 234, 0.4)' },
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: PRIMARY,
            color: '#fff',
          },
        },
      },
      MuiTableRow: {
        root: {
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: 'rgb(227, 236, 245)',
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
