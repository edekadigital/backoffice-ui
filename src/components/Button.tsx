import * as React from 'react';
import {
  ButtonProps as MuiButtonProps,
  default as MuiButton,
} from '@material-ui/core/Button';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export type ButtonVariant = 'contained' | 'text' | 'outlined';

export type ButtonComponent = React.ElementType<MuiButtonProps>;

export type ButtonType = 'submit' | 'reset' | 'button';

export type ButtonIcon = React.ElementType<SvgIconProps>;

export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: ButtonIcon;
  iconPosition?: ButtonIconPosition;
  showProgress?: boolean;
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
    showProgress = false,
    children,
    ...additionalProps
  } = props;
  const classes = useStyles();

  const IconComponent = React.useMemo(() => {
    if (showProgress) {
      return (props: {}) => <CircularProgress size={24} {...props} />;
    } else if (icon) {
      return icon;
    } else {
      return null;
    }
  }, [icon, showProgress]);

  const content = React.useMemo(() => {
    if (IconComponent) {
      if (iconPosition === 'left') {
        return (
          <>
            <IconComponent className={classes.iconLeft} />
            {children}
          </>
        );
      } else {
        return (
          <>
            {children}
            <IconComponent className={classes.iconRight} />
          </>
        );
      }
    } else {
      return children;
    }
  }, [IconComponent, iconPosition, children, classes]);

  return (
    <MuiButton variant={variant} color="primary" {...additionalProps}>
      {content}
    </MuiButton>
  );
};
