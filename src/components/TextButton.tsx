import * as React from 'react';
import MUIButton from '@material-ui/core/Button';

export interface TextButtonProps {
  label: string;
}

export const TextButton: React.FC<TextButtonProps> = ({ label }) => (
  <MUIButton variant="text" color="primary">
    {label}
  </MUIButton>
);
