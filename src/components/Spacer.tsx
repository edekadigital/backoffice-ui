import { makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';

export interface SpacerProps {
  /**
   * Sets vertical margin by themes spacings definitions-
   * e.g.: 1 equals a margin of 8px, 2 equals 16px.
   * @default 2
   */
  vertical?: number;
}

const useStyles = makeStyles<Theme, SpacerProps>((theme) => ({
  root: ({ vertical = 2 }) => ({
    marginBottom: theme.spacing(vertical),
  }),
}));

export const Spacer: React.FC<SpacerProps> = (props) => {
  const classes = useStyles(props);
  return <div className={classes.root} data-testid="spacer" />;
};
