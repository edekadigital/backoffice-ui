import { CircularProgress, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { Body } from '../typography/Body';

export interface LoaderProps {
  /**
   * optional message will be displayed above the circular loader
   */
  message?: string;
  /**
   * optional padding
   */
  padding?: boolean | number;
}

const useStyles = makeStyles<Theme, { padding: number }>((theme) => ({
  container: ({ padding }) => ({
    paddingTop: theme.spacing(padding),
    paddingBottom: theme.spacing(padding),
    textAlign: 'center',
  }),
}));

export const Loader: React.FC<LoaderProps> = (props) => {
  const { message, padding = 0 } = props;
  const classes = useStyles({ padding: padding === true ? 2 : +padding });
  return (
    <div className={classes.container}>
      {message ? (
        <Body color="textSecondary" gutterBottom={3} data-testid="message">
          {message}
        </Body>
      ) : null}
      <CircularProgress data-testid="circular-progress" />
    </div>
  );
};
