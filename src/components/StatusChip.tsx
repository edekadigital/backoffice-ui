import * as React from 'react';
import { Chip, Theme } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ChipProps } from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/styles';

export type StatusChipColor =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface StatusChipProps {
  /**
   * The label content.
   */
  label: string;
  /**
   * The color of the status chip.
   */
  color?: StatusChipColor;
  /**
   * Additional icon to show.
   */
  icon?: React.ElementType<SvgIconProps>;
  /**
   * The size of the chip.
   * @default "medium"
   */
  size?: 'small' | 'medium';
  /**
   * The variant to use
   * @default "outlined"
   */
  variant?: 'outlined' | 'naked';
}

const useStyles = makeStyles((theme: Theme) => ({
  root: (props: StatusChipProps) => {
    const sanitizedColorName: StatusChipColor = props.color || 'default';
    const colorMap: { [k: string]: string } = {
      info: theme.palette.primary.main,
      warning: theme.palette.warning.dark,
      success: theme.palette.success.main,
      error: theme.palette.error.dark,
    };
    return {
      color:
        sanitizedColorName in colorMap
          ? colorMap[sanitizedColorName]
          : theme.palette.grey[500],
      borderColor: 'currentColor',
      border: props.variant === 'naked' ? 'none' : undefined,
    };
  },
  icon: {
    color: 'inherit',
  },
}));

/**
 * | Test ID             | Description          |
 * | ------------------- | -------------------- |
 * | `statusChip-icon`   | icon                 |
 */
export const StatusChip: React.FC<StatusChipProps> = (props) => {
  const { label, icon, size = 'medium' } = props;
  const classes = useStyles(props);

  const chipProps: ChipProps = {
    size,
    label,
    variant: 'outlined',
    classes: { root: classes.root }, // TODO
  };

  if (icon) {
    const IconComponent = icon;
    const iconProps = {
      classes: { root: classes.icon },
    };
    chipProps.icon = (
      <IconComponent data-testid={'statusChip-icon'} {...iconProps} />
    );
  }

  return <Chip {...chipProps} />;
};
