import * as React from 'react';
import {
  Grid,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';

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

const formRowStyles = createStyles((theme: Theme) => ({
  root: {
    width: '100%',
    overflow: 'hidden',
    '& + &': {
      marginTop: theme.spacing.unit * 2,
    },
  },
}));

const FormRowComponent: React.FC<FormRowProps & WithStyles> = ({
  widths = [],
  children,
  classes,
}) => {
  const items = Array.isArray(children) ? children : [children];
  const renderedItems = items.map((tempChild, index) => (
    <Grid item={true} xs={widths[index] || true} key={`form-row-item-${index}`}>
      {tempChild}
    </Grid>
  ));
  return (
    <div className={classes.root}>
      <Grid container={true} spacing={16} alignItems="flex-start" wrap="nowrap">
        {renderedItems}
      </Grid>
    </div>
  );
};

export const FormRow = withStyles(formRowStyles)(FormRowComponent);
