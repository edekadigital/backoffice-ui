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

const useStyles = makeStyles<Theme, BodyProps>((theme: Theme) => ({
  gutterBottom: {
    marginBottom: '0.5em',
  },
  root: ({ color }) => {
    const sanitizedColorName: BodyColor = color || 'initial';
    const colorMap: { [k: string]: string } = {
      info: theme.palette.primary.main,
      warning: theme.palette.warning.dark,
      success: theme.palette.success.main,
      error: theme.palette.error.dark,
      primary: theme.palette.primary.main,
      textPrimary: theme.palette.text.primary,
      textSecondary: theme.palette.text.secondary,
    };
    return {
      color:
        sanitizedColorName in colorMap
          ? colorMap[sanitizedColorName]
          : theme.palette.text.primary,
    };
  },
}));

export const Body: React.FC<BodyProps> = (props) => {
  const {
    variant = 'body1',
    component = 'p',
    children,
    color,
    ...additionalProps
  } = props;
  const classes = useStyles({ color });
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
