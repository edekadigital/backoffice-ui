import * as React from 'react';
import MUIButton from '@material-ui/core/Button';

export interface ButtonProps {
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ label }) => (
  <MUIButton variant="contained" color="primary">
    {label}
  </MUIButton>
);
