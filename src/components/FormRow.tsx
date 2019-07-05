import * as React from 'react';
import { Grid, Theme, Box } from '@material-ui/core';
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
    marginLeft: theme.spacing(-1),
    marginRight: theme.spacing(-1),
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
      <Box mx={1}>{tempChild}</Box>
    </Grid>
  ));
  return (
    <div className={classes.root}>
      <Grid container={true} spacing={0} alignItems="center" wrap="nowrap">
        {renderedItems}
      </Grid>
    </div>
  );
};
