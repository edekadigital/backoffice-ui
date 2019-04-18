import * as React from 'react';
import MUIButton from '@material-ui/core/Button';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { WithInlineIcon, InlineIconPosition } from './InlineIcon';

export interface ButtonProps {
  icon?: React.ComponentType<SvgIconProps>;
  iconPosition?: InlineIconPosition;
}

export const Button: React.FC<ButtonProps> = ({
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
    <MUIButton variant="contained" color="primary">
      {content}
    </MUIButton>
  );
};
