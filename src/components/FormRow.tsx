import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';

export type FormRowValue = string | number | boolean;

export type FormRowChildren = React.ReactNode | React.ReactNode[];

export interface FormRowProps {
  children: FormRowChildren;
}

const formRowStyles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
    },
    item: {
      marginLeft: 8,
      flex: 1,
    },
  });

const FormRowComponent: React.FC<FormRowProps & WithStyles> = ({
  children,
  classes,
}) => {
  const items = Array.isArray(children) ? children : [children];
  const renderedItems = items.map((tempChild, index) => (
    <div key={`form-row-item-${index}`}>{tempChild}</div>
  ));
  return <div className={classes.root}>{renderedItems}</div>;
};

export const FormRow = withStyles(formRowStyles)(FormRowComponent);
