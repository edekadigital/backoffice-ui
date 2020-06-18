import * as React from 'react';
import {
  IconButton as MuiIconButton,
  CircularProgress,
} from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ButtonBaseProps } from '@material-ui/core/ButtonBase';

export type IconButtonColor = 'default' | 'primary' | 'inherit';

export type IconButtonComponent = React.ElementType<ButtonBaseProps>;

export type IconButtonType = 'submit' | 'reset' | 'button';

export interface IconButtonProps {
  icon: React.ElementType<SvgIconProps>;
  className?: string;
  color?: IconButtonColor;
  component?: IconButtonComponent;
  disabled?: boolean;
  download?: string | boolean;
  href?: string;
  onClick?: React.MouseEventHandler;
  target?: string;
  type?: IconButtonType;
  showProgress?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    icon,
    color = 'default',
    showProgress = false,
    ...additionalProps
  } = props;
  const IconComponent = icon;
  const content = !showProgress ? (
    <IconComponent />
  ) : (
    <CircularProgress size={24} color="inherit" />
  );
  return (
    <MuiIconButton color={color} {...additionalProps}>
      {content}
    </MuiIconButton>
  );
};
