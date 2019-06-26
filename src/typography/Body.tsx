import * as React from 'react';
import { Typography as MuiTypography } from '@material-ui/core';

export type BodyVariant = 'body1' | 'body2';

export type BodyComponent = 'p' | 'span' | 'div';

export type BodyColor = 'initial' | 'primary' | 'secondary' | 'error';

export interface BodyProps {
  variant?: BodyVariant;
  component?: BodyComponent;
  color?: BodyColor;
  gutterBottom?: boolean;
  children: React.ReactNode;
}

export const Body: React.FC<BodyProps> = props => {
  const {
    variant = 'body1',
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
