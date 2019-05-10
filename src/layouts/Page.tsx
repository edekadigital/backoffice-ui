import * as React from 'react';
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
  Grid,
} from '@material-ui/core';
import {
  GRID_SPACING_DEFAULT,
  TOP_BAR_HEIGHT,
  LAYOUT_MAX_WIDTH_DEFAULT,
  LAYOUT_MAX_WIDTH_NARROW,
} from '../constants/dimensions';

export type PageVariant = 'default' | 'narrow';

export type PageChildren = React.ReactNode | React.ReactNode[];

export interface PageProps {
  bar?: React.ReactNode;
  stickyBar?: boolean;
  variant?: PageVariant;
  children: PageChildren;
}

interface ItemSizingProps {
  xs: boolean | 3 | 4 | 6 | 12;
  md: boolean | 3 | 4 | 6 | 12;
  lg: boolean | 3 | 4 | 6 | 12;
  xl: boolean | 3 | 4 | 6 | 12;
}

const pageStyles = (theme: Theme) =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      minHeight: '100vh',
    },
    outer: {
      padding: GRID_SPACING_DEFAULT,
    },
    inner: {
      margin: '0 auto',
      width: '100%',
      maxWidth: LAYOUT_MAX_WIDTH_DEFAULT,
    },
    innerNarrow: {
      maxWidth: LAYOUT_MAX_WIDTH_NARROW,
    },
    innerWithStickyBar: {
      paddingTop: TOP_BAR_HEIGHT,
    },
    stickyBarWrapper: {
      position: 'fixed',
      zIndex: 1,
      width: '100vw',
    },
  });

export const PageComponent: React.FC<PageProps & WithStyles> = props => {
  const {
    bar,
    stickyBar = false,
    variant = 'default',
    children,
    classes,
  } = props;
  const hasBar = !!bar;
  const items = Array.isArray(children) ? children : [children];
  const itemSizingProps: ItemSizingProps = {
    xs: 12,
    md: true,
    lg: false,
    xl: false,
  };

  if (items.length < 5) {
    itemSizingProps.xl = true;
  }

  if (items.length < 4) {
    itemSizingProps.lg = true;
  }

  const gridContent = items.map((tempItem, index) => (
    <Grid item={true} key={`page-item-${index}`} {...itemSizingProps}>
      {tempItem}
    </Grid>
  ));

  let innerClassName = classes.inner;
  if (variant === 'narrow') {
    innerClassName = `${innerClassName} ${classes.innerNarrow}`;
  }
  if (hasBar && stickyBar) {
    innerClassName = `${innerClassName} ${classes.innerWithStickyBar}`;
  }

  const barWrapperClassName = stickyBar ? classes.stickyBarWrapper : undefined;
  const top = hasBar ? <div className={barWrapperClassName}>{bar}</div> : null;

  return (
    <div className={classes.root}>
      {top}
      <div className={classes.outer}>
        <div className={innerClassName}>
          <Grid
            container={true}
            spacing={GRID_SPACING_DEFAULT}
            justify="center"
            component="main"
          >
            {gridContent}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export const Page = withStyles(pageStyles)(PageComponent);
