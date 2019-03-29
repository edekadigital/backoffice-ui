import * as React from 'react';

export interface ButtonProps {
  label: string;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => (
  <button>{props.label}</button>
);
