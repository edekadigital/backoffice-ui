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
  action?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: OUTER_MARGIN,
    paddingRight: OUTER_MARGIN,
  },
  outer: {
    margin: '0 auto',
    width: '100%',
    maxWidth: LAYOUT_MAX_WIDTH_DEFAULT,
  },
  inner: {
    display: 'flex',
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
    marginLeft: theme.spacing(-1.5),
    marginRight: theme.spacing(),
  },
  infoBar: {
    paddingLeft: theme.spacing(),
    marginLeft: theme.spacing(4.5),
  },
}));

export const ReverseNavigation: React.FC<ReverseNavigationProps> = ({
  variant = 'default',
  onBackClick,
  children,
  infoBarContent,
  action,
}) => {
  const classes = useStyles();

  const title = children ? (
    <Typography component="h2" variant="h5">
      {children}
    </Typography>
  ) : null;

  const infoBar = infoBarContent ? (
    <div className={classes.infoBar}>{infoBarContent}</div>
  ) : null;
  const actions = action ? <div>{action}</div> : null;

  let outerClassName = classes.outer;
  if (variant === 'narrow') {
    outerClassName = `${outerClassName} ${classes.outerNarrow}`;
  }

  return (
    <div className={classes.root}>
      <div className={outerClassName}>
        <div className={classes.inner}>
          <div className={classes.wrapper}>
            <IconButton
              icon={ArrowBack}
              onClick={onBackClick}
              className={classes.backButton}
            />
            {title}
          </div>
          {actions}
        </div>
        {infoBar}
      </div>
    </div>
  );
};
