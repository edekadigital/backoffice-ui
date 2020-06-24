import * as React from 'react';
import { Typography as MuiTypography, makeStyles } from '@material-ui/core';

export type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingComponent =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'div';

export type HeadingColor =
  | 'initial'
  | 'primary'
  | 'textPrimary'
  | 'textSecondary';

export type HeadingAlign = 'left' | 'center' | 'right';

export interface HeadingProps {
  variant?: HeadingVariant;
  component?: HeadingComponent;
  color?: HeadingColor;
  align?: HeadingAlign;
  gutterBottom?: boolean;
  children: React.ReactNode;
}

const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: '0.5em',
  },
});

export const Heading: React.FC<HeadingProps> = (props) => {
  const {
    variant = 'h2',
    component = 'h2',
    children,
    ...additionalProps
  } = props;
  const classes = useStyles();
  return (
    <MuiTypography
      variant={variant}
      component={component}
      classes={classes}
      {...additionalProps}
    >
      {children}
    </MuiTypography>
  );
};
