import * as React from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { de } from 'date-fns/locale';
import { format } from 'date-fns';

export interface DatePickerProps {
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
  inputRef?: React.RefObject<HTMLInputElement>;
  /**
   * Callback fired when the value is changed.
   */
  onChange: (date: Date | null) => void;
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
   * The value of the input element, required for a controlled component.
   */
  value: Date | null;
  /**
   *  If `true`, the date picker will not allow dates in the future
   * @default false
   */
  disableFuture?: boolean;
  /**
   *  If `true`, the date picker will not allow dates in the past
   * @default false
   */
  disablePast?: boolean;
  /**
   * The minimum selectable date.
   */
  minDate?: Date;
  /**
   * The maximum selectable date
   */
  maxDate?: Date;
}

const useInputStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
}));

const useLabelStyles = makeStyles((theme: Theme) => ({
  root: { color: theme.palette.text.primary },
}));

/**
 * | Test ID             | Description              |
 * | ------------------- | ------------------------ |
 * | `datePicker-input`   | input field              |
 * | `datePicker-label`   | input label              |
 */
export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const inputClasses = useInputStyles();
  const labelClasses = useLabelStyles();

  const formatStr = 'dd.MM.yyyy';
  const invalidDateMessage = `Ungültige Eingabe. Bitte folgendes Format ${formatStr} verwenden.`;
  let minDateMessage = 'Das Datum darf nicht in der Vergangenheit liegen!';
  if (props.minDate) {
    minDateMessage = `Das Datum darf nicht vor dem ${format(
      props.minDate,
      formatStr
    )} liegen!`;
  }
  let maxDateMessage = 'Das Datum darf nicht in der Zukunft liegen!';
  if (props.maxDate) {
    maxDateMessage = `Das Datum darf nicht nach dem ${format(
      props.maxDate!,
      formatStr
    )} liegen!`;
  }

  const inputTestId = { 'data-testid': 'datePicker-input' };
  const labelTestId = { 'data-testid': 'datePicker-label' };

  return (
    <MuiPickersUtilsProvider locale={de} utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...props}
        fullWidth={true}
        format={formatStr}
        variant="inline"
        inputVariant="outlined"
        disableToolbar={true}
        invalidDateMessage={invalidDateMessage}
        minDateMessage={minDateMessage}
        maxDateMessage={maxDateMessage}
        PopoverProps={{
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          transformOrigin: { vertical: 'top', horizontal: 'left' },
        }}
        InputLabelProps={{
          shrink: true,
          classes: labelClasses,
          ...labelTestId,
        }}
        InputProps={{ classes: inputClasses }}
        inputProps={{ ...inputTestId }}
      />
    </MuiPickersUtilsProvider>
  );
};
