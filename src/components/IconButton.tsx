import * as React from 'react';
import { IconButton as MuiIconButton } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ButtonBaseProps } from '@material-ui/core/ButtonBase';

export type IconButtonColor = 'default' | 'primary';

export type IconButtonComponent = React.ReactType<ButtonBaseProps>;

export type IconButtonType = 'submit' | 'reset' | 'button';

export interface IconButtonProps {
  icon: React.ReactType<SvgIconProps>;
  className?: string;
  color?: IconButtonColor;
  component?: IconButtonComponent;
  disabled?: boolean;
  download?: string | boolean;
  href?: string;
  onClick?: React.MouseEventHandler;
  target?: string;
  type?: IconButtonType;
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
