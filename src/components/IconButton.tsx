import * as React from 'react';
import {
  IconButton as MuiIconButton,
  CircularProgress,
} from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ButtonProps } from './Button';

export interface IconButtonProps
  extends Omit<ButtonProps, 'icon' | 'size' | 'variant' | 'iconPosition'> {
  /**
   * The icon to show
   */
  icon: React.ElementType<SvgIconProps>;
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
