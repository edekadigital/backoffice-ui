import * as React from 'react';
import MUIButton from '@material-ui/core/Button';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { WithInlineIcon, InlineIconPosition } from './InlineIcon';

export type ButtonVariant = 'contained' | 'text' | 'outlined';

export interface ButtonProps {
  variant?: ButtonVariant;
  icon?: React.ComponentType<SvgIconProps>;
  iconPosition?: InlineIconPosition;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  icon,
  iconPosition = 'left',
  children,
}) => {
  let content = children;
  if (icon) {
    content = (
      <WithInlineIcon icon={icon} position={iconPosition}>
        {children}
      </WithInlineIcon>
    );
  }
  return (
    <MUIButton variant={variant} color="primary">
      {content}
    </MUIButton>
  );
};
