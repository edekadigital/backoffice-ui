import * as React from 'react';
import { default as MuiIconButton } from '@material-ui/core/IconButton';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ButtonBaseProps } from '@material-ui/core/ButtonBase';

export type IconButtonColor = 'default' | 'primary';

export type IconButtonComponent = React.ReactType<ButtonBaseProps>;

export type IconButtonType = 'submit' | 'reset' | 'button';

export interface IconButtonProps {
  icon: React.ReactType<SvgIconProps>;
  color?: IconButtonColor;
  component?: IconButtonComponent;
  disabled?: boolean;
  type?: IconButtonType;
  href?: string;
  target?: string;
  className?: string;
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
