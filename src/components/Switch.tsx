import * as React from 'react';
import {
  FormControlLabel as MuiFormControlLabel,
  Switch as MuiSwitch,
} from '@material-ui/core';

export type SwitchValue = string | number | boolean;

export interface SwitchProps {
  label: string;
  value?: SwitchValue;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

export const Switch: React.FC<SwitchProps> = props => {
  const { label, ...additionalProps } = props;
  return (
    <MuiFormControlLabel
      control={<MuiSwitch color="primary" {...additionalProps} />}
      label={label}
    />
  );
};
