import * as React from 'react';
import { Typography as MuiTypography } from '@material-ui/core';

export type SubtitleVariant = 'subtitle1' | 'subtitle2';

export type SubtitleComponent = 'p' | 'span' | 'div';

export type SubtitleColor = 'default' | 'primary' | 'secondary';

export type SubtitleAlign = 'left' | 'center' | 'right';

export interface SubtitleProps {
  variant?: SubtitleVariant;
  component?: SubtitleComponent;
  color?: SubtitleColor;
  align?: SubtitleAlign;
  gutterBottom?: boolean;
  children: React.ReactNode;
}

export const Subtitle: React.FC<SubtitleProps> = props => {
  const {
    variant = 'subtitle1',
    component = 'p',
    children,
    ...additionalProps
  } = props;
  return (
    <MuiTypography variant={variant} component={component} {...additionalProps}>
      {children}
    </MuiTypography>
  );
};
