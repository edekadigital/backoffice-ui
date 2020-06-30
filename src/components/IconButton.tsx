import * as React from 'react';
import {
  IconButton as MuiIconButton,
  CircularProgress,
} from '@material-ui/core';
import { ButtonProps } from './Button';

type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export interface IconButtonProps
  extends RequiredBy<
    Omit<ButtonProps, 'size' | 'variant' | 'iconPosition'>,
    'icon'
  > {
  /**
   * If given, uses a negative margin to counteract the padding on one side
   * (this is often helpful for aligning the left or right side of the icon
   * with content above or below, without ruining the border size and shape).
   */
  edge?: 'start' | 'end' | false;
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
