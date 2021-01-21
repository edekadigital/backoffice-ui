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
   */
  color?: BodyColor;
  /**
   * Defines the background color of the component, if set padding will be added.
   */
  backgroundColor?: BodyBackgroundColor;
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
  backgroundColor?: BodyColor;
}

const useStyles = makeStyles<Theme, BodyPropsStyles>((theme: Theme) => ({
  root: ({ color, gutterBottom, backgroundColor }) => {
    const sanitizedColorName: BodyColor = color || 'initial';
    const colorMap: { [k: string]: string } = {
      info: theme.palette.primary.main,
      warning: theme.palette.warning.dark,
      success: theme.palette.success.main,
      error: theme.palette.error.dark,
      primary: theme.palette.primary.main,
      textPrimary: theme.palette.text.primary,
      textSecondary: theme.palette.text.secondary,
      secondary: theme.palette.secondary.main,
    };
    const sanitizedBackgroundColorName: BodyColor =
      backgroundColor || 'initial';
    const backgroundColorMap: { [k: string]: string } = {
      info: theme.palette.info.light,
      warning: theme.palette.warning.light,
      success: theme.palette.success.light,
      error: theme.palette.error.light,
      primary: theme.palette.primary.light,
      secondary: theme.palette.secondary.light,
    };
    return {
      color:
        sanitizedColorName in colorMap
          ? colorMap[sanitizedColorName]
          : theme.palette.text.primary,
      backgroundColor:
        sanitizedBackgroundColorName in backgroundColorMap
          ? backgroundColorMap[sanitizedBackgroundColorName]
          : theme.palette.background.default,
      padding: backgroundColor ? '20px' : '0px',
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
    ...additionalProps
  } = props;

  const classes = useStyles({
    color,
    gutterBottom: gutterBottom === true ? 0.5 : +gutterBottom,
    backgroundColor,
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
