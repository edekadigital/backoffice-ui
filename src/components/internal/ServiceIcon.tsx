import * as React from 'react';
import { SvgIconProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

export interface ServiceIconProps {
  icon: React.ElementType<SvgIconProps> | string;
  className?: string;
  iconTestId?: string;
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
  const { className, icon, iconTestId = 'servicIcon' } = props;
  const classes = useStyles();
  const rootClassName = clsx(classes.root, className);

  const content =
    typeof icon === 'string' ? (
      <img
        src={icon}
        className={classes.image}
        data-testid={`${iconTestId}-img`}
      />
    ) : (
      <props.icon
        fontSize="small"
        color="primary"
        data-testid={`${iconTestId}-icon`}
      />
    );
  return (
    <div className={rootClassName} data-testid={iconTestId}>
      {content}
    </div>
  );
};
