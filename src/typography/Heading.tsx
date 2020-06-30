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
  /**
   * The variant to use.
   * @default "h2"
   */
  variant?: HeadingVariant;
  /**
   * The component to be used for rendering the Headline
   * @default "h2"
   */
  component?: HeadingComponent;
  /**
   * Defines the text color. Only theme colors are allowed.
   */
  color?: HeadingColor;
  /**
   * Defines how the headline should be aligned.
   */
  align?: HeadingAlign;
  /**
   * If `true`, the headline will have a bottom margin.
   */
  gutterBottom?: boolean;
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
