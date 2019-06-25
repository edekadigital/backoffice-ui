import * as React from 'react';
import {
  default as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export type ButtonVariant = 'contained' | 'text' | 'outlined';

export type ButtonComponent = React.ReactType<MuiButtonProps>;

export type ButtonType = 'submit' | 'reset' | 'button';

export type ButtonIcon = React.ReactType<SvgIconProps>;

export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: ButtonIcon;
  iconPosition?: ButtonIconPosition;
  component?: ButtonComponent;
  disabled?: boolean;
  type?: ButtonType;
  href?: string;
  target?: string;
  className?: string;
  download?: string | boolean;
  onClick?: React.MouseEventHandler;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    iconLeft: {
      marginRight: theme.spacing(),
    },
    iconRight: {
      marginLeft: theme.spacing(),
    },
  };
});

export const Button: React.FC<ButtonProps> = props => {
  const {
    variant = 'contained',
    icon,
    iconPosition = 'left',
    children,
    ...additionalProps
  } = props;
  const classes = useStyles();

  let content = children;
  if (icon) {
    const IconComponent = icon;
    if (iconPosition === 'left') {
      content = (
        <>
          <IconComponent className={classes.iconLeft} />
          {children}
        </>
      );
    } else {
      content = (
        <>
          {children}
          <IconComponent className={classes.iconRight} />
        </>
      );
    }
  }

  return (
    <MuiButton variant={variant} color="primary" {...additionalProps}>
      {content}
    </MuiButton>
  );
};
