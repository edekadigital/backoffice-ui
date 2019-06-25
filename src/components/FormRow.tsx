import * as React from 'react';
import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export type FormRowItemWidth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 'auto';

export type FormRowChildren = React.ReactNode | React.ReactNode[];

export interface FormRowProps {
  widths?: FormRowItemWidth[];
  children: FormRowChildren;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    overflow: 'hidden',
    '& + &': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const FormRow: React.FC<FormRowProps> = ({ widths = [], children }) => {
  const classes = useStyles();
  const items = Array.isArray(children) ? children : [children];
  const renderedItems = items.map((tempChild, index) => (
    <Grid item={true} xs={widths[index] || true} key={`form-row-item-${index}`}>
      {tempChild}
    </Grid>
  ));
  return (
    <div className={classes.root}>
      <Grid container={true} spacing={2} alignItems="flex-start" wrap="nowrap">
        {renderedItems}
      </Grid>
    </div>
  );
};
