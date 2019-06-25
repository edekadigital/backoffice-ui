import * as React from 'react';
import { Theme, Typography } from '@material-ui/core';
import { ArrowBack } from '../icons';
import { IconButton } from './IconButton';
import {
  LAYOUT_MAX_WIDTH_DEFAULT,
  LAYOUT_MAX_WIDTH_NARROW,
  OUTER_MARGIN,
} from '../constants/dimensions';
import { makeStyles } from '@material-ui/styles';

export type ReverseNavigationVariant = 'default' | 'narrow';

export interface ReverseNavigationProps {
  variant?: ReverseNavigationVariant;
  children?: React.ReactNode;
  onBackClick: React.MouseEventHandler;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: OUTER_MARGIN,
    paddingRight: OUTER_MARGIN,
  },
  outer: {
    margin: '0 auto',
    display: 'flex',
    width: '100%',
    maxWidth: LAYOUT_MAX_WIDTH_DEFAULT,
    height: 70,
    alignItems: 'center',
  },
  outerNarrow: {
    maxWidth: LAYOUT_MAX_WIDTH_NARROW,
  },
  backButton: {
    marginLeft: -12,
    marginRight: theme.spacing(),
  },
}));

export const ReverseNavigation: React.FC<ReverseNavigationProps> = ({
  variant = 'default',
  onBackClick,
  children,
}) => {
  const classes = useStyles();

  const title = children ? (
    <Typography component="h2" variant="h5">
      {children}
    </Typography>
  ) : null;

  let outerClassName = classes.outer;
  if (variant === 'narrow') {
    outerClassName = `${outerClassName} ${classes.outerNarrow}`;
  }

  return (
    <div className={classes.root}>
      <div className={outerClassName}>
        <IconButton
          icon={ArrowBack}
          onClick={onBackClick}
          className={classes.backButton}
        />
        {title}
      </div>
    </div>
  );
};
