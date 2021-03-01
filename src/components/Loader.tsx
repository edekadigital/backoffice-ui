import { CircularProgress, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Body } from '../typography/Body';

export interface LoaderProps {
  /**
   * optional message will be displayed above the circular loader
   */
  message?: string;
}

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
  },
}));

export const Loader: React.FC<LoaderProps> = (props) => {
  const { message } = props;
  const classes = useStyles();
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
