import * as React from 'react';
import {
  default as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';

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

interface IconProps {
  icon: ButtonIcon;
  position: ButtonIconPosition;
}

const iconStyles = (theme: Theme) =>
  createStyles({
    left: {
      marginRight: theme.spacing.unit,
    },
    right: {
      marginLeft: theme.spacing.unit,
    },
  });

const Icon: React.FC<IconProps> = ({ icon, position }) => {
  const IconComponent = icon;
  const StyledIconComponent = withStyles(iconStyles)((props: WithStyles) => (
    <IconComponent className={props.classes[position]} />
  ));
  return <StyledIconComponent />;
};

const WithIcon: React.FC<IconProps> = props =>
  props.position === 'left' ? (
    <>
      <Icon {...props} />
      {props.children}
    </>
  ) : (
    <>
      {props.children}
      <Icon {...props} />
    </>
  );

export const Button: React.FC<ButtonProps> = props => {
  const {
    variant = 'contained',
    icon,
    iconPosition = 'left',
    children,
    ...additionalProps
  } = props;
  const content = icon ? (
    <WithIcon icon={icon} position={iconPosition}>
      {children}
    </WithIcon>
  ) : (
    children
  );

  return (
    <MuiButton variant={variant} color="primary" {...additionalProps}>
      {content}
    </MuiButton>
  );
};
