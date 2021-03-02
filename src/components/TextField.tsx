import * as React from 'react';
import {
  TextField as MuiTextField,
  Theme,
  InputAdornment,
  SelectProps as MuiSelectProps,
  Grid,
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

export type TextFieldColor = 'primary' | 'secondary';

export type StartAdornmentPosition = 'inside' | 'outside';

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
   * Start InputAdornment for this component, e.g an icon Button or a text
   */
  startAdornment?: React.ReactElement;
  /**
   * Position of start adornment, can either be inside or outside
   * @default start
   */
  startAdornmentPosition?: StartAdornmentPosition;
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
   * Textfield color, available are primary and secondary.
   * @default primary
   */
  color?: TextFieldColor;
}

const useInputStyles = makeStyles<Theme, { color: TextFieldColor }>(
  (theme: Theme) => ({
    root: ({ color }) => ({
      background:
        color === 'secondary'
          ? theme.palette.primary.main
          : theme.palette.background.paper,
      '&.MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: theme.palette.grey[400],
        },
        '&:hover fieldset': {
          borderColor:
            color === 'secondary'
              ? theme.palette.secondary.main
              : theme.palette.text.primary,
        },
        '&.Mui-focused fieldset': {
          borderColor:
            color === 'secondary'
              ? theme.palette.secondary.main
              : theme.palette.primary.main,
        },
      },

      '& .MuiInputBase-input:not(.Mui-disabled)': {
        color:
          color === 'secondary'
            ? theme.palette.secondary.main
            : theme.palette.text.primary,
      },
      '& .MuiSelect-icon:not(.Mui-disabled)': {
        color:
          color === 'secondary'
            ? theme.palette.secondary.main
            : theme.palette.text.primary,
      },
    }),
  })
);

const useStyles = makeStyles(() => ({
  startAdornment: {
    flexGrow: 2,
  },
}));

const useLabelStyles = makeStyles<Theme, { color: TextFieldColor }>(
  (theme: Theme) => ({
    root: ({ color }) => ({
      color:
        color === 'secondary'
          ? theme.palette.secondary.main
          : theme.palette.text.primary,
      '&.Mui-focused': {
        color:
          color === 'secondary'
            ? theme.palette.secondary.main
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
    startAdornment,
    startAdornmentPosition = 'inside',
    type = 'text',
    required = false,
    inputTestId = 'textField-input',
    color = 'primary',
    ...additionalProps
  } = props;
  const inputClasses = useInputStyles({ color });
  const labelClasses = useLabelStyles({ color });
  const classes = useStyles();
  const InputProps = {
    classes: inputClasses,
    endAdornment: endAdornment ? (
      <InputAdornment position="end">{endAdornment}</InputAdornment>
    ) : undefined,
    startAdornment:
      startAdornment && startAdornmentPosition === 'inside' ? (
        <InputAdornment position="start">{startAdornment}</InputAdornment>
      ) : null,
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

  return startAdornmentPosition === 'inside' ? (
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
  ) : (
    <Grid
      container
      spacing={3}
      alignItems="center"
      alignContent="stretch"
      data-testid="grid-container-textfield"
    >
      <Grid item>{startAdornment}</Grid>
      <Grid item className={classes.startAdornment}>
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
      </Grid>
    </Grid>
  );
};
