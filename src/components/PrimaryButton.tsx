import * as React from 'react';
import MaterialButton from '@material-ui/core/Button';

export interface PrimaryButtonProps {
  label: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label }) => (
  <MaterialButton variant="contained" color="primary">
    {label}
  </MaterialButton>
);
