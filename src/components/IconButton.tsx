import * as React from 'react';
import { IconButton as MuiIconButton } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ButtonBaseProps } from '@material-ui/core/ButtonBase';

export type IconButtonColor = 'default' | 'primary';

export type IconButtonComponent = React.ElementType<ButtonBaseProps>;

export type IconButtonType = 'submit' | 'reset' | 'button';

export interface IconButtonProps {
  icon: React.ElementType<SvgIconProps>;
  color?: IconButtonColor;
  component?: IconButtonComponent;
  disabled?: boolean;
  type?: IconButtonType;
  href?: string;
  target?: string;
  className?: string;
  download?: string | boolean;
  onClick?: React.MouseEventHandler;
}

export const IconButton: React.FC<IconButtonProps> = props => {
  const { icon, color = 'default', ...additionalProps } = props;
  const IconComponent = icon;
  return (
    <MuiIconButton color={color} {...additionalProps}>
      <IconComponent />
    </MuiIconButton>
  );
};
