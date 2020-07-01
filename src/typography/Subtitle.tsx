import * as React from 'react';
import { Typography as MuiTypography, makeStyles } from '@material-ui/core';

export type SubtitleVariant = 'subtitle1' | 'subtitle2';

export type SubtitleComponent = 'p' | 'span' | 'div';

export type SubtitleColor =
  | 'initial'
  | 'primary'
  | 'textPrimary'
  | 'textSecondary';

export type SubtitleAlign = 'left' | 'center' | 'right';

export interface SubtitleProps {
  /**
   * The variant to use.
   * @default "subtitle1"
   */
  variant?: SubtitleVariant;
  /**
   * The component to be used for rendering the Headline
   * @default "p"
   */
  component?: SubtitleComponent;
  /**
   * Defines the text color. Only theme colors are allowed.
   */
  color?: SubtitleColor;
  /**
   * Defines how the subtitle should be aligned.
   */
  align?: SubtitleAlign;
  /**
   * If `true`, the subitle will have a bottom margin.
   */
  gutterBottom?: boolean;
}

const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: '0.5em',
  },
});

export const Subtitle: React.FC<SubtitleProps> = (props) => {
  const {
    variant = 'subtitle1',
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
