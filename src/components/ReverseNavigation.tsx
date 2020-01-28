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
  infoBarContent?: React.ReactNode;
  actionBarContent?: React.ReactNode;
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
    justifyContent: 'space-between',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  outerNarrow: {
    maxWidth: LAYOUT_MAX_WIDTH_NARROW,
  },
  backButton: {
    marginLeft: -12,
    marginRight: theme.spacing(),
  },
  actionBar: {
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
    marginLeft: theme.spacing(4.5),
  },
}));

export const ReverseNavigation: React.FC<ReverseNavigationProps> = ({
  variant = 'default',
  onBackClick,
  children,
  infoBarContent,
  actionBarContent,
}) => {
  const classes = useStyles();

  const title = children ? (
    <Typography component="h2" variant="h5">
      {children}
    </Typography>
  ) : null;

  const navStatus = infoBarContent ? infoBarContent : null;
  const navAction = actionBarContent ? actionBarContent : null;

  let outerClassName = classes.outer;
  if (variant === 'narrow') {
    outerClassName = `${outerClassName} ${classes.outerNarrow}`;
  }

  return (
    <div className={classes.root}>
      <div className={outerClassName}>
        <div className={classes.wrapper}>
          <IconButton
            icon={ArrowBack}
            onClick={onBackClick}
            className={classes.backButton}
          />
          {title}
        </div>
        {navAction}
      </div>
      <div className={classes.actionBar}>{navStatus}</div>
    </div>
  );
};
