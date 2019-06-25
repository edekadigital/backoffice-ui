import * as React from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export interface PreformattedTextProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    fontFamily:
      'Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
    fontSize: '0.875rem',
    lineHeight: 1.3,
    color: theme.palette.text.primary,
  },
}));

export const PreformattedText: React.FC<PreformattedTextProps> = ({
  children,
}) => {
  const classes = useStyles();
  return <pre className={classes.root}>{children}</pre>;
};
