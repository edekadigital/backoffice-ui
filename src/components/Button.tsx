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

export type ButtonColor = 'inherit' | 'default' | 'primary' | 'secondary';

export type ButtonComponent = React.ElementType<MuiButtonProps>;

export type ButtonType = 'submit' | 'reset' | 'button';

export type ButtonIcon = React.ElementType<SvgIconProps>;

export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps {
  className?: string;
  /**
   * The color of the button. It supports those theme colors that make sense for this component.
   */
  color?: ButtonColor;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: ButtonComponent;
  /**
   * If `true`, the button will be disabled.
   */
  disabled?: boolean;
  /**
   * The download file name
   */
  download?: string | boolean;
  /**
   * The URL to link to when the button is clicked.
   * If defined, an a element will be used as the root node.
   */
  href?: string;
  /**
   * If set the given icon will be rendered in the button component
   */
  icon?: ButtonIcon;
  /**
   * Sets the postion of the provided icon in the button compontent
   */
  iconPosition?: ButtonIconPosition;
  /**
   * Callback fired when the button has been clicked.
   */
  onClick?: React.MouseEventHandler;
  /**
   * If `true` a loading spinner will be shown.
   */
  showProgress?: boolean;
  /**
   * The size of the button.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Target where to open the linked URL resource
   */
  target?: string;
  /**
   * The button type
   */
  type?: ButtonType;
  /**
   * The variant to use.
   */
  variant?: ButtonVariant;
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

export const Button: React.FC<ButtonProps> = (props) => {
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
    <MuiButton variant={variant} {...additionalProps}>
      {content}
    </MuiButton>
  );
};
