import * as React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core';
import { ArrowBack } from '../icons';
import { Heading } from '../typography/Heading';
import { IconButton } from './IconButton';
import {
  GRID_SPACING_DEFAULT,
  TOP_BAR_HEIGHT,
  LAYOUT_MAX_WIDTH_DEFAULT,
  LAYOUT_MAX_WIDTH_NARROW,
} from '../constants/dimensions';

export type ReverseNavigationVariant = 'default' | 'narrow';

export interface ReverseNavigationProps {
  variant?: ReverseNavigationVariant;
  children?: React.ReactNode;
  onBackClick?: React.MouseEventHandler;
}

const styles = createStyles((theme: Theme) => ({
  root: {
    paddingLeft: GRID_SPACING_DEFAULT,
    paddingRight: GRID_SPACING_DEFAULT,
    background: theme.palette.background.paper,
  },
  outer: {
    margin: '0 auto',
    display: 'flex',
    width: '100%',
    maxWidth: LAYOUT_MAX_WIDTH_DEFAULT,
    height: TOP_BAR_HEIGHT,
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
  const backButton = onBackClick ? (
    <IconButton
      icon={ArrowBack}
      onClick={onBackClick}
      className={classes.backButton}
    />
  ) : null;

  const title = children ? (
    <Heading component="h2" variant="h5">
      {children}
    </Heading>
  ) : null;

  let outerClassName = classes.outer;
  if (variant === 'narrow') {
    outerClassName = `${outerClassName} ${classes.outerNarrow}`;
  }

  return (
    <div className={classes.root}>
      <div className={outerClassName}>
        {backButton}
        {title}
      </div>
    </div>
  );
};

export const ReverseNavigation = withStyles(styles)(ReverseNavigationComponent);
