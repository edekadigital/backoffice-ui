import * as React from 'react';
import {
  FormControlLabel as MuiFormControlLabel,
  Switch as MuiSwitch,
} from '@material-ui/core';

export type SwitchValue = string | number | boolean;

export interface SwitchProps {
  /**
   * The label content.
   */
  label: string;
  /**
   * Controls wether the switch should be checked per default
   */
  checked?: boolean;
  /**
   * If `true`, the switch element will be `disabled`.
   */
  disabled?: boolean;
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
   * Name attribute of the input element.
   */
  name?: string;
  /**
   * The value of the input element, required for a controlled component.
   */
  value?: SwitchValue;
  /**
   * Callback fired when the switch toggle is being clicked.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

/**
 * | Test ID          | Description                |
 * | ---------------- | -------------------------- |
 * | `switch-input`   | switch input field/button  |
 */
export const Switch: React.FC<SwitchProps> = (props) => {
  const { label, inputTestId = 'switch-input', ...additionalProps } = props;
  const inputProps = {
    'data-testid': inputTestId,
  } as React.InputHTMLAttributes<HTMLInputElement>;
  const control = (
    <MuiSwitch color="primary" inputProps={inputProps} {...additionalProps} />
  );
  return <MuiFormControlLabel control={control} label={label} />;
};
