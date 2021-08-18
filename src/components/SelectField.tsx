import * as React from 'react';
import { TextField, TextFieldColor, TextFieldValue } from './TextField';
import MenuItem from '@material-ui/core/MenuItem';

export interface SelectFieldMenuItem {
  value: string | number;
  label: string;
}
export interface SelectFieldProps {
  /**
   * The label content.
   */
  label?: string;
  /**
   * If `true`, the input element will be `disabled`.
   */
  disabled?: boolean;
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error?: boolean;
  /**
   * The helper text content.
   */
  helperText?: string;
  /**
   * The `id` of the input element. Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id?: string;
  /**
   * Pass a ref to the input element.
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * Overwrites the default `data-testid` for the input element.
   */
  inputTestId?: string;
  /**
   * The menu items for the select input field (see `SelectFieldMenuItem`)
   */
  menuItems: SelectFieldMenuItem[];
  /**
   * Name attribute of the input element.
   */
  name?: string;
  /**
   * Callback fired when the value is changed.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * If `true`, the label is displayed as required and the input element will be required
   * @default false
   */
  required?: boolean;
  /**
   * The value of the input element, required for a controlled component.
   */
  value?: TextFieldValue;
  /**
   * Textfield color, available are primary and primaryContrast.
   * @default primary
   */
  color?: TextFieldColor;
  /**
   * The value of the input element that is set per default.
   */
  defaultValue?: TextFieldValue;
  /**
   * You normally should not have to use this, but in special cases
   * use className to override specific styles.
   */
  className?: string;
}

/**
 * | Test ID                      | Description          |
 * | ---------------------------- | -------------------- |
 * | `selectField-item-{index}`   | Select item          |
 */
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
