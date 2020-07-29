import * as React from 'react';
import { Typography as MuiTypography, makeStyles } from '@material-ui/core';

export type BodyVariant = 'body1' | 'body2' | 'caption';

export type BodyComponent = 'p' | 'span' | 'div';

export type BodyColor =
  | 'initial'
  | 'primary'
  | 'error'
  | 'textPrimary'
  | 'textSecondary';

export type BodyAlign = 'left' | 'center' | 'right';

export interface BodyProps {
  /**
   * The variant to use (controls size)
   * @default "body1"
   */
  variant?: BodyVariant;
  /**
   * Defines the component where the text should be rendered in
   * @default p
   */
  component?: BodyComponent;
  /**
   * Defines the text color. Only theme colors are allowed.
   */
  color?: BodyColor;
  /**
   * If `true`, the body text will have a bottom margin.
   */
  gutterBottom?: boolean;
  /**
   * Defines how the body text should be aligned.
   */
  align?: BodyAlign;
}

const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: '0.5em',
  },
});

export const Body: React.FC<BodyProps> = (props) => {
  const {
    variant = 'body1',
    component = 'p',
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
