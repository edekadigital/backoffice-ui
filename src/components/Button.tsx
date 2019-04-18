import * as React from 'react';
import MUIButton from '@material-ui/core/Button';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';

export type ButtonVariant = 'contained' | 'text' | 'outlined';

export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps {
  variant?: ButtonVariant;
  icon?: React.ComponentType<SvgIconProps>;
  iconPosition?: ButtonIconPosition;
}

export interface IconProps {
  icon: React.ComponentType<SvgIconProps>;
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

export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  icon,
  iconPosition = 'left',
  children,
}) => {
  let content = children;
  if (icon) {
    content = (
      <WithIcon icon={icon} position={iconPosition}>
        {children}
      </WithIcon>
    );
  }
  return (
    <MUIButton variant={variant} color="primary">
      {content}
    </MUIButton>
  );
};
