import * as React from 'react';
import {
  createStyles,
  withStyles,
  WithStyles,
  Chip,
  Theme,
} from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ChipProps } from '@material-ui/core/Chip';
import { SUCCESS, ERROR, WARNING, PRIMARY } from '../constants/colors';

export type StatusChipColor =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface StatusChipProps {
  label: string;
  icon?: React.ReactType<SvgIconProps>;
  color?: StatusChipColor;
}

const statusChipStyles = (theme: Theme) => {
  return createStyles({
    root_default: {
      color: theme.palette.grey[600],
      borderColor: 'currentColor',
    },
    root_success: {
      color: SUCCESS,
      borderColor: 'currentColor',
    },
    root_error: {
      color: ERROR,
      borderColor: 'currentColor',
    },
    root_warning: {
      color: WARNING,
      borderColor: 'currentColor',
    },
    root_info: {
      color: PRIMARY,
      borderColor: 'currentColor',
    },
    icon: {
      color: 'inherit',
    },
  });
};

const StatusChipComponent: React.FC<StatusChipProps & WithStyles> = props => {
  const { label, icon, color = 'default', classes } = props;

  const chipProps: ChipProps = {
    label,
    variant: 'outlined',
    classes: { root: classes[`root_${color}`] },
  };

  if (icon) {
    const IconComponent = icon;
    const iconProps = {
      classes: { root: classes.icon },
    };
    chipProps.icon = <IconComponent {...iconProps} />;
  }

  return <Chip {...chipProps} />;
};

export const StatusChip = withStyles(statusChipStyles)(StatusChipComponent);
