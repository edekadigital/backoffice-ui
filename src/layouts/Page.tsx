import * as React from 'react';
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
  Grid,
} from '@material-ui/core';

export type PageVariant = 'default' | 'narrow';

export type PageChildren = React.ReactNode | React.ReactNode[];

export interface PageProps {
  variant?: PageVariant;
  children: PageChildren;
}

interface ItemSizingProps {
  xs: boolean | 3 | 4 | 6 | 12;
  md: boolean | 3 | 4 | 6 | 12;
  lg: boolean | 3 | 4 | 6 | 12;
  xl: boolean | 3 | 4 | 6 | 12;
}

const spacing = 24;

const pageStyles = (theme: Theme) =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      padding: spacing,
      minHeight: '100vh',
      background: theme.palette.grey[200],
    },
    outer: {
      margin: '0 auto',
      width: '100%',
      maxWidth: 1400,
    },
    outerNarrow: {
      maxWidth: 800,
    },
  });

export const PageComponent: React.FC<PageProps & WithStyles> = props => {
  const { variant = 'default', children, classes } = props;
  const items = Array.isArray(children) ? children : [children];

  const itemSizingProps: ItemSizingProps = {
    xs: false,
    md: true,
    lg: true,
    xl: true,
  };

  if (items.length < 5) {
    itemSizingProps.xl = true;
  }

  if (items.length < 4) {
    itemSizingProps.lg = true;
  }

  let outerClassName = classes.outer;
  if (variant === 'narrow') {
    outerClassName = `${outerClassName} ${classes.outerNarrow}`;
  }

  const gridContent = items.map((tempItem, index) => (
    <Grid item={true} key={`page-item-${index}`} {...itemSizingProps}>
      {tempItem}
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <div className={outerClassName}>
        <Grid container={true} spacing={24} justify="center" component="main">
          {gridContent}
        </Grid>
      </div>
    </div>
  );
};

export const Page = withStyles(pageStyles)(PageComponent);
