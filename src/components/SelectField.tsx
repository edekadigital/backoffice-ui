import * as React from 'react';
import { TextFieldValue, TextField } from './TextField';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { SelectProps } from '@material-ui/core';

export interface SelectFieldProps {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: TextFieldValue;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  menuItems: Array<{ value: string | number; label: string }>;
}

const useStyles = makeStyles(() => ({
  select: { '&:focus': { backgroundColor: 'rgba(0, 0, 0, 0.0)' } },
}));

export const SelectField: React.FC<SelectFieldProps> = props => {
  const { menuItems, ...additionalProps } = props;
  const classes = useStyles();
  const MuiSelectProps: SelectProps = {
    classes: { select: classes.select },
  };

  const menuItemList = menuItems
    ? menuItems.map((item, index) => (
        <MenuItem
          key={`menu-item-${index}`}
          value={item.value}
          data-testid={'selectField-item-' + index}
        >
          {item.label}
        </MenuItem>
      ))
    : null;

  return (
    <TextField SelectProps={MuiSelectProps} select={true} {...additionalProps}>
      {menuItemList}
    </TextField>
  );
};
