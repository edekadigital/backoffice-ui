import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    minHeight: '100vh',
    background: theme.palette.background.default,
  },
}));

export const PageWrapper: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};
