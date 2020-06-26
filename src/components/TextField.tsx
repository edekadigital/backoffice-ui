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
  /**
   * The label content.
   */
  label?: string;
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   */
  autoComplete?: string;
  /**
   * The default value of the input element.
   */
  defaultValue?: TextFieldValue;
  /**
   * If `true`, the input element will be `disabled`.
   */
  disabled?: boolean;
  /**
   * End InputAdornment for this component, e.g an icon Button
   */
  endAdornment?: React.ReactElement;
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
  inputRef?: React.RefObject<HTMLInputElement>;
  /**
   * Overwrites the default `data-testid` for the input element.
   */
  inputTestId?: string;
  /**
   * Name attribute of the input element.
   */
  name?: string;
  /**
   * Callback fired when the value is changed.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder?: string;
  /**
   * If `true`, the label is displayed as required and the input element will be required
   */
  required?: boolean;
  /**
   * Render a `Select` element while passing the Input element to Select as input parameter.
   * If this option is set you must pass the options of the select as children.
   * Attention: Please use the `SelectField` component instead to render a select field.
   */
  select?: boolean;
  /**
   * Type of the input element. It should be a valid HTML5 input type.
   */
  type?: TextFieldType;
  /**
   * The value of the input element, required for a controlled component.
   */
  value?: TextFieldValue;
}

const useInputStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
}));

const useLabelStyles = makeStyles((theme: Theme) => ({
  root: { color: theme.palette.text.primary },
}));

export const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    endAdornment,
    type = 'text',
    required = false,
    inputTestId = 'textField-input',
    ...additionalProps
  } = props;
  const inputClasses = useInputStyles();
  const labelClasses = useLabelStyles();
  const InputProps = {
    classes: inputClasses,
    endAdornment: endAdornment,
  };
  const InputLabelProps = {
    classes: labelClasses,
    shrink: true,
    required,
    'data-testid': 'textField-label',
  };
  return (
    <MuiTextField
      {...additionalProps}
      type={type}
      required={required}
      InputProps={InputProps}
      InputLabelProps={InputLabelProps}
      fullWidth={true}
      inputProps={{ 'data-testid': inputTestId }}
      variant={'outlined'}
    />
  );
};
