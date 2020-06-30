import * as React from 'react';
import {
  IconButton as MuiIconButton,
  CircularProgress,
} from '@material-ui/core';
import { ButtonColor, ButtonComponent, ButtonIcon, ButtonType } from './Button';

export interface IconButtonProps {
  className?: string;
  /**
   * The color of the button. It supports those theme colors that make sense for this component.
   * @default "default"
   */
  color?: ButtonColor;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: ButtonComponent;
  /**
   * If `true`, the button will be disabled.
   */
  disabled?: boolean;
  /**
   * The download file name
   */
  download?: string | boolean;
  /**
   * If given, uses a negative margin to counteract the padding on one side
   * (this is often helpful for aligning the left or right side of the icon
   * with content above or below, without ruining the border size and shape).
   * @default false
   */
  edge?: 'start' | 'end' | false;
  /**
   * The URL to link to when the button is clicked.
   * If defined, an a element will be used as the root node.
   */
  href?: string;
  /**
   * If set the given icon will be rendered in the button component
   */
  icon: ButtonIcon;
  /**
   * Callback fired when the button has been clicked.
   */
  onClick?: React.MouseEventHandler;
  /**
   * If `true` a loading spinner will be shown.
   * @default false
   */
  showProgress?: boolean;
  /**
   * Target where to open the linked URL resource
   */
  target?: string;
  /**
   * The button type
   */
  type?: ButtonType;
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
