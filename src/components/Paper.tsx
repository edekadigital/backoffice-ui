import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { default as MuiPaper } from '@material-ui/core/Paper';

export interface PaperProps {
  /**
   * If `true`, the paper component will have a bottom margin.
   */
  gutterBottom?: boolean;
}

const useStyles = makeStyles<Theme, PaperProps>((theme) => ({
  root: ({ gutterBottom }) => ({
    marginBottom: theme.spacing(gutterBottom ? 3 : 0),
    padding: theme.spacing(3),
  }),
}));

/**
 * | Test ID           | Description          |
 * | ----------------- | -------------------- |
 * | `paper`           | Paper container      |
 */
export const Paper: React.FC<PaperProps> = (props) => {
  const classes = useStyles(props);

  return (
    <MuiPaper variant={'outlined'} classes={classes} data-testId={'paper'}>
      {props.children}
    </MuiPaper>
  );
};
