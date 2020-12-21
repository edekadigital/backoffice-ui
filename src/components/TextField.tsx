import * as React from 'react';
import {
  TextField as MuiTextField,
  Theme,
  InputAdornment,
  SelectProps as MuiSelectProps,
} from '@material-ui/core';
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

export type TextFieldColor = 'primary' | 'primaryContrast';

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
   * If `true`, the input element will be focused during the first mount.
   */
  autoFocus?: boolean;
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
   * @default "textField-input"
   */
  inputTestId?: string;
  /**
   * If dense or normal, will adjust vertical spacing of this and contained components.
   * @default "normal"
   */
  margin?: 'dense' | 'normal';
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
   * @default false
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
   * @default "text"
   */
  type?: TextFieldType;
  /**
   * The value of the input element, required for a controlled component.
   */
  value?: TextFieldValue;
  /**
   * If `true`, a textarea element will be rendered instead of an input.
   */
  multiline?: boolean;
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number;
  /**
   * Textfield color, available are primary and primaryContrast.
   * @default primary
   */
  color?: TextFieldColor;
}

const useInputStyles = makeStyles<Theme, { color: TextFieldColor }>(
  (theme: Theme) => ({
    root: ({ color }) => ({
      background:
        color === 'primaryContrast'
          ? theme.palette.primary.main
          : theme.palette.background.paper,
      '& fieldset': {
        borderColor:
          color === 'primaryContrast'
            ? theme.palette.primary.contrastText
            : theme.palette.grey[400],
      },
      '&.Mui-focused MuiOutlinedInput-notchedOutline': {
        borderColor:
          color === 'primaryContrast'
            ? theme.palette.grey[200]
            : theme.palette.primary.main,
      },
    }),
  })
);

const useLabelStyles = makeStyles<Theme, { color: TextFieldColor }>(
  (theme: Theme) => ({
    root: ({ color }) => ({
      color:
        color === 'primaryContrast'
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
      '&.Mui-focused': {
        color:
          color === 'primaryContrast'
            ? theme.palette.grey[200]
            : theme.palette.primary.main,
      },
    }),
  })
);

/**
 * | Test ID             | Description              |
 * | ------------------- | ------------------------ |
 * | `textField-input`   | input field              |
 * | `textField-label`   | input label              |
 */
export const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    endAdornment,
    type = 'text',
    required = false,
    inputTestId = 'textField-input',
    color = 'primary',
    ...additionalProps
  } = props;
  const inputClasses = useInputStyles({ color });
  const labelClasses = useLabelStyles({ color });
  const InputProps = {
    classes: inputClasses,
    endAdornment: endAdornment ? (
      <InputAdornment position="end">{endAdornment}</InputAdornment>
    ) : undefined,
  };
  const InputLabelProps = {
    classes: labelClasses,
    shrink: true,
    required,
    'data-testid': 'textField-label',
  };

  const SelectProps = props.select
    ? ({
        SelectDisplayProps: { 'data-testid': inputTestId },
      } as MuiSelectProps)
    : {};

  const inputProps = !props.select ? { 'data-testid': inputTestId } : {};

  return (
    <MuiTextField
      {...additionalProps}
      SelectProps={SelectProps}
      type={type}
      required={required}
      InputProps={InputProps}
      InputLabelProps={InputLabelProps}
      fullWidth={true}
      inputProps={inputProps}
      variant={'outlined'}
    />
  );
};
