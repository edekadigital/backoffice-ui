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
  | 'warning'
  | 'success'
  | 'info'
  | 'textPrimary'
  | 'textSecondary'
  | 'secondary';

export type BodyBackgroundColor =
  | 'initial'
  | 'primary'
  | 'error'
  | 'warning'
  | 'success'
  | 'info'
  | 'secondary';

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
   * @default initial
   */
  color?: BodyColor;
  /**
   * Defines the background color of the component.
   * @default initial
   */
  backgroundColor?: BodyBackgroundColor;
  /**
   * Defines padding of component, if set to false padding will be added.
   * @default true
   */
  dense?: boolean;
  /**
   * If `true`, the body text will have a bottom margin.
   */
  gutterBottom?: boolean | number;
  /**
   * Defines how the body text should be aligned.
   */
  align?: BodyAlign;
}

interface BodyPropsStyles {
  gutterBottom: number;
  color?: BodyColor;
  backgroundColor?: BodyBackgroundColor;
  dense?: boolean;
}

const useStyles = makeStyles<Theme, BodyPropsStyles>((theme: Theme) => ({
  root: ({
    color = 'initial',
    gutterBottom,
    backgroundColor = 'initial',
    dense = true,
  }) => {
    const colorMap: Record<BodyColor, string> = {
      info: theme.palette.primary.main,
      warning: theme.palette.warning.dark,
      success: theme.palette.success.main,
      error: theme.palette.error.dark,
      primary: theme.palette.primary.main,
      textPrimary: theme.palette.text.primary,
      textSecondary: theme.palette.text.secondary,
      secondary: theme.palette.secondary.main,
      initial: theme.palette.text.primary,
    };

    const backgroundColorMap: Record<BodyBackgroundColor, string> = {
      info: theme.palette.info.light,
      warning: theme.palette.warning.light,
      success: theme.palette.success.light,
      error: theme.palette.error.light,
      primary: theme.palette.primary.light,
      secondary: theme.palette.secondary.light,
      initial: theme.palette.background.default,
    };
    return {
      color: colorMap[color],
      backgroundColor: backgroundColorMap[backgroundColor],
      padding: dense ? 0 : theme.spacing(2.5),
      marginBottom: theme.spacing(gutterBottom),
    };
  },
}));

export const Body: React.FC<BodyProps> = (props) => {
  const {
    variant = 'body1',
    component = 'p',
    children,
    gutterBottom = 0,
    color,
    backgroundColor,
    dense,
    ...additionalProps
  } = props;

  const classes = useStyles({
    color,
    gutterBottom: gutterBottom === true ? 0.5 : +gutterBottom,
    backgroundColor,
    dense,
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
