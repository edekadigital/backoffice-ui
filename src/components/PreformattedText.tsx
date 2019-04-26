import * as React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core';

export interface PreformattedTextProps {
  children: React.ReactNode;
}

const preStyles = createStyles((theme: Theme) => ({
  root: {
    margin: 0,
    fontFamily:
      'Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
    fontSize: '0.875rem',
    lineHeight: 1.3,
    color: theme.palette.text.primary,
  },
}));

const PreformattedTextComponent: React.FC<
  PreformattedTextProps & WithStyles
> = ({ classes, children }) => {
  return <pre className={classes.root}>{children}</pre>;
};

export const PreformattedText = withStyles(preStyles)(
  PreformattedTextComponent
);
