import * as React from 'react';
import { TextField, TextFieldValue } from './TextField';
import MenuItem from '@material-ui/core/MenuItem';

export interface SelectFieldProps {
  label: string;
  menuItems: Array<{ value: string | number; label: string }>;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  id?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  value?: TextFieldValue;
}

export const SelectField: React.FC<SelectFieldProps> = props => {
  const { menuItems, ...additionalProps } = props;

  const menuItemList = menuItems
    ? menuItems.map((item, index) => (
        <MenuItem
          key={index}
          value={item.value}
          data-testid={'selectField-item-' + index}
        >
          {item.label}
        </MenuItem>
      ))
    : null;

  return (
    <TextField select={true} {...additionalProps}>
      {menuItemList}
    </TextField>
  );
};
