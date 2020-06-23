import * as React from 'react';
import { TextField as MuiTextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
  autoComplete?: string;
  defaultValue?: TextFieldValue;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  id?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  select?: boolean;
  type?: TextFieldType;
  value?: TextFieldValue;
}

const useInputStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

const useLabelStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export const TextField: React.FC<TextFieldProps> = (props) => {
  const { type = 'text', required = false, ...additionalProps } = props;
  const inputClasses = useInputStyles();
  const labelClasses = useLabelStyles();
  const InputProps = {
    classes: inputClasses,
  };
  const InputLabelProps = {
    classes: labelClasses,
    shrink: true,
    required,
  };
  return (
    <MuiTextField
      {...additionalProps}
      type={type}
      required={required}
      InputProps={InputProps}
      InputLabelProps={InputLabelProps}
      fullWidth={true}
      inputProps={{ 'data-testid': 'textField-input' }}
    />
  );
};
