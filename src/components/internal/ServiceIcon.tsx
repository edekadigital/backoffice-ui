import * as React from 'react';
import { SvgIconProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

export interface ServiceIconProps {
  icon: React.ElementType<SvgIconProps>;
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    flexShrink: 0,
    padding: theme.spacing(1),
    borderWidth: 1,
    borderColor: theme.palette.grey[300],
    borderStyle: 'solid',
    borderRadius: theme.shape.borderRadius,
  },
}));

export const ServiceIcon: React.FC<ServiceIconProps> = (props) => {
  const classes = useStyles();
  const rootClassName = clsx(classes.root, props.className);
  const IconComponent = props.icon;
  return (
    <div className={rootClassName}>
      <IconComponent fontSize="small" color="primary" />
    </div>
  );
};
