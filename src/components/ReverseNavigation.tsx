import * as React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Heading } from './Heading';
import { IconButton } from './IconButton';

export interface ReverseNavigationProps {
  children?: React.ReactNode;
  onBackClick?: React.MouseEventHandler;
}

const spacing = 24;

const styles = createStyles((theme: Theme) => ({
  root: {
    paddingLeft: spacing,
    paddingRight: spacing,
    background: theme.palette.background.paper,
  },
  outer: {
    margin: '0 auto',
    display: 'flex',
    width: '100%',
    maxWidth: 1400,
    height: 70,
    alignItems: 'center',
  },
  backButton: {
    marginLeft: -12,
    marginRight: theme.spacing.unit,
  },
}));

const ReverseNavigationComponent: React.FC<
  ReverseNavigationProps & WithStyles
> = ({ classes, onBackClick, children }) => {
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

  return (
    <div className={classes.root}>
      <div className={classes.outer}>
        {backButton}
        {title}
      </div>
    </div>
  );
};

export const ReverseNavigation = withStyles(styles)(ReverseNavigationComponent);
