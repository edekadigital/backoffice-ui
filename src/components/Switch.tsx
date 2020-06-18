import * as React from 'react';
import {
  FormControlLabel as MuiFormControlLabel,
  Switch as MuiSwitch,
} from '@material-ui/core';

export type SwitchValue = string | number | boolean;

export interface SwitchProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  value?: SwitchValue;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

export const Switch: React.FC<SwitchProps> = (props) => {
  const { label, ...additionalProps } = props;
  const inputProps = {
    'data-testid': 'switch-input',
  } as React.InputHTMLAttributes<HTMLInputElement>;
  const control = (
    <MuiSwitch color="primary" inputProps={inputProps} {...additionalProps} />
  );
  return <MuiFormControlLabel control={control} label={label} />;
};
