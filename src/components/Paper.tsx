import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { default as MuiPaper } from '@material-ui/core/Paper';
import { Heading } from '../typography/Heading';
import { Divider } from '@material-ui/core';
import { Spacer } from '..';

export type PaperColor = 'initial' | 'primary';

export interface PaperProps {
  /**
   * If `true`, the paper component will have a bottom margin.
   */
  gutterBottom?: boolean;
  /**
   * Optional paper headline
   */
  headline?: string;
  /**
   * Optional background color, allowed are theme colors primary and secondary
   * @default initial
   */
  backgroundColor?: PaperColor;
  /**
   * If false divider is not shown underneath the headline
   * @default true
   */
  divider?: boolean;
}

const useStyles = makeStyles<Theme, PaperProps>((theme) => ({
  paperRoot: ({ gutterBottom, backgroundColor = 'initial' }) => {
    const colorMap = {
      primary: theme.palette.primary.main,
      initial: theme.palette.background.paper,
    };
    return {
      marginBottom: theme.spacing(gutterBottom ? 3 : 0),
      padding: theme.spacing(3),
      backgroundColor: colorMap[backgroundColor],
      color:
        backgroundColor === 'primary'
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
    };
  },
  headingRoot: {
    marginTop: theme.spacing(-1),
  },
  dividerRoot: {
    margin: theme.spacing(2, -3),
  },
}));

/**
 * | Test ID           | Description          |
 * | ----------------- | -------------------- |
 * | `paper`           | Paper container      |
 * | `paper-headline`  | Paper headline       |
 */
export const Paper: React.FC<PaperProps> = (props) => {
  const classes = useStyles(props);
  const { divider = true } = props;

  const headline = props.headline ? (
    <>
      <div className={classes.headingRoot}>
        <Heading variant={'h6'} data-testid={'paper-headline'}>
          {props.headline}
        </Heading>
      </div>
      {divider ? (
        <Divider classes={{ root: classes.dividerRoot }} />
      ) : (
        <Spacer vertical={3} />
      )}
    </>
  ) : null;

  return (
    <MuiPaper
      variant={'outlined'}
      classes={{ root: classes.paperRoot }}
      data-testid={'paper'}
    >
      {headline}
      {props.children}
    </MuiPaper>
  );
};
