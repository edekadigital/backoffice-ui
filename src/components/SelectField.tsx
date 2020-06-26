import * as React from 'react';
import { TextField, TextFieldProps } from './TextField';
import MenuItem from '@material-ui/core/MenuItem';

export interface SelectFieldProps
  extends Pick<
    TextFieldProps,
    | 'disabled'
    | 'error'
    | 'helperText'
    | 'id'
    | 'label'
    | 'name'
    | 'onChange'
    | 'required'
    | 'value'
  > {
  /**
   * The menu items for the select input field
   */
  menuItems: Array<{ value: string | number; label: string }>;
}

export const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { menuItems, ...additionalProps } = props;

  const menuItemList = menuItems.map((item, index) => (
    <MenuItem
      key={index}
      value={item.value}
      data-testid={'selectField-item-' + index}
    >
      {item.label}
    </MenuItem>
  ));

  return (
    <TextField select={true} {...additionalProps}>
      {menuItemList}
    </TextField>
  );
};
