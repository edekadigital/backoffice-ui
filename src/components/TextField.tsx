import * as React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';

export type TextFieldValue = string | number;

export type TextFieldType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export interface TextFieldProps {
  label: string;
  placeholder?: string;
  type?: TextFieldType;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  autoComplete?: string;
  defaultValue?: TextFieldValue;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: TextFieldValue;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const TextField: React.FC<TextFieldProps> = props => {
  const { label, type = 'text', required = false, ...additionalProps } = props;
  const modifiedLabel = required ? label : `${label} (optional)`;
  const InputLabelProps = {
    shrink: true,
    required: false,
  };
  return (
    <MuiTextField
      {...additionalProps}
      label={modifiedLabel}
      type={type}
      required={required}
      InputLabelProps={InputLabelProps}
      fullWidth={true}
      variant="filled"
    />
  );
};
