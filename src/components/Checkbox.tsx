import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiCheckbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { grey } from '@material-ui/core/colors';
// TODO: Refactor
export const CheckboxLight = withStyles({
  root: {
    color: grey[100],
    '&$checked': {
      color: grey[100],
    },
  },
  checked: {},
})((props: CheckboxProps) => <MuiCheckbox {...props} />);

export const CheckboxDark = withStyles({
  root: {
    color: grey[600],
    '&$checked': {
      color: grey[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <MuiCheckbox {...props} />);
