import * as React from 'react';
import { Typography as MuiTypography, makeStyles } from '@material-ui/core';

export type SubtitleVariant = 'subtitle1' | 'subtitle2';

export type SubtitleComponent = 'p' | 'span' | 'div';

export type SubtitleColor =
  | 'initial'
  | 'primary'
  | 'secondary'
  | 'textPrimary'
  | 'textSecondary';

export type SubtitleAlign = 'left' | 'center' | 'right';

export interface SubtitleProps {
  variant?: SubtitleVariant;
  component?: SubtitleComponent;
  color?: SubtitleColor;
  align?: SubtitleAlign;
  gutterBottom?: boolean;
  children: React.ReactNode;
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
