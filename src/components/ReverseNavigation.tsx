import * as React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { ArrowBack } from '../icons';
import { IconButton } from './IconButton';
import {
  LAYOUT_MAX_WIDTH_DEFAULT,
  LAYOUT_MAX_WIDTH_NARROW,
  OUTER_MARGIN,
} from '../constants/dimensions';

export type ReverseNavigationVariant = 'default' | 'narrow';

export interface ReverseNavigationProps {
  variant?: ReverseNavigationVariant;
  children?: React.ReactNode;
  onBackClick: React.MouseEventHandler;
}

const styles = createStyles((theme: Theme) => ({
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
    marginRight: theme.spacing.unit,
  },
}));

const ReverseNavigationComponent: React.FC<
  ReverseNavigationProps & WithStyles
> = ({ classes, variant = 'default', onBackClick, children }) => {
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

export const ReverseNavigation = withStyles(styles)(ReverseNavigationComponent);
