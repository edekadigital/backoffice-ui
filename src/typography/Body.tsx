import * as React from 'react';
import {
  Typography as MuiTypography,
  makeStyles,
  Theme,
} from '@material-ui/core';

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
  gutterBottom?: boolean | number;
  /**
   * Defines how the body text should be aligned.
   */
  align?: BodyAlign;
}

const useStyles = makeStyles<Theme, { gutterBottom: number }>((theme) => ({
  root: ({ gutterBottom }) => {
    return { marginBottom: theme.spacing(gutterBottom) };
  },
}));

export const Body: React.FC<BodyProps> = (props) => {
  const {
    variant = 'body1',
    component = 'p',
    children,
    gutterBottom = 0,
    ...additionalProps
  } = props;
  const classes = useStyles({
    gutterBottom: gutterBottom === true ? 0.5 : +gutterBottom,
  });
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
