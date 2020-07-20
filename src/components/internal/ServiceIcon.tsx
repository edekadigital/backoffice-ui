import * as React from 'react';
import { SvgIconProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

export interface ServiceIconProps {
  icon: React.ElementType<SvgIconProps> | string;
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
  image: {
    display: 'block',
    width: 20,
    height: 20,
  },
}));

export const ServiceIcon: React.FC<ServiceIconProps> = (props) => {
  const classes = useStyles();
  const rootClassName = clsx(classes.root, props.className);
  const content =
    typeof props.icon === 'string' ? (
      <img
        src={props.icon}
        className={classes.image}
        data-testid="serviceIcon-image"
      />
    ) : (
      <props.icon
        fontSize="small"
        color="primary"
        data-testid="serviceIcon-icon"
      />
    );
  return (
    <div className={rootClassName} data-testid="serviceIcon">
      {content}
    </div>
  );
};
