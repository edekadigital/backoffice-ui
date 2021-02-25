import * as React from 'react';
import { SvgIcon, makeStyles, Theme, SvgIconProps } from '@material-ui/core';

type IconColor =
  | 'inherit'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

type IconSize = 'inherit' | 'default' | 'small' | 'large';

export interface IconProps {
  color?: IconColor;
  icon: React.ElementType<SvgIconProps>;
  size?: IconSize;
}

const useStyles = makeStyles<Theme, { color: IconColor }>((theme: Theme) => {
  const iconColorMap: Record<IconColor, string> = {
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    default: theme.palette.action.active,
    inherit: 'inherit',
  };
  return {
    root: ({ color }) => {
      return {
        color: iconColorMap[color],
        margin: theme.spacing(0.5),
      };
    },
  };
});

export const Icon: React.FC<IconProps> = (props) => {
  const { color = 'default', icon, size = 'default' } = props;
  const classes = useStyles({ color });
  const IconComponent = icon;
  return (
    <SvgIcon classes={classes} fontSize={size} data-testid="icon">
      <IconComponent />
    </SvgIcon>
  );
};
