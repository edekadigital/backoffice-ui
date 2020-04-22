import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiCheckbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { blueGrey } from '@material-ui/core/colors';

export const CheckboxLight = withStyles({
  root: {
    color: blueGrey[100],
    '&$checked': {
      color: blueGrey[100],
    },
  },
  checked: {},
})((props: CheckboxProps) => <MuiCheckbox {...props} />);

export const CheckboxDark = withStyles({
  root: {
    color: blueGrey[500],
    '&$checked': {
      color: blueGrey[500],
    },
  },
  checked: {},
})((props: CheckboxProps) => <MuiCheckbox {...props} />);
