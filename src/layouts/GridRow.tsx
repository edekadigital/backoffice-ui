import * as React from 'react';
import { Grid } from '@material-ui/core';

export type GridVariant = 'auto' | 'narrowLeft' | 'narrowRight';

export interface GridRowProps {
  /**
   * Defines the grid layout.
   * `auto` makes the items (children) equitably share the available space,
   * while no more than four columns would be placed in one line. If more than 4 items are provided,
   * the following items will be wrapped into the next line automatically.
   * `narrowLeft` represents a static *4-8* and `narrowRight` a static *8-4* grid layout where only two
   * items are lined up in one line. Further items are wrapped into the next line automatically.
   * @default "auto"
   */
  gridVariant?: GridVariant;
}

type GridItemSize = 2 | 3 | 4 | 6 | 8 | 9 | 10 | 12 | 'auto';

export const GridRow: React.FC<GridRowProps> = (props) => {
  const { gridVariant = 'auto', children } = props;
  const renderGrid = () => {
    if (children && Array.isArray(children) && children.length > 1) {
      switch (gridVariant) {
        case 'auto': {
          let gridSize = Math.floor(12 / children.length) as GridItemSize;
          gridSize = gridSize < 3 ? 3 : gridSize;
          return children.map((child, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={gridSize}
              lg={gridSize}
              xl={gridSize}
            >
              {child}
            </Grid>
          ));
        }
        case 'narrowLeft':
          return children.map((child, index) =>
            index % 2 === 0 ? (
              <Grid item key={index} md={4} lg={4} xl={4} xs={12} sm={6}>
                {child}
              </Grid>
            ) : (
              <Grid item key={index} md={8} lg={8} xl={8} xs={12} sm={6}>
                {child}
              </Grid>
            )
          );
        case 'narrowRight':
          return children.map((child, index) =>
            index % 2 === 0 ? (
              <Grid item key={index} md={8} lg={8} xl={8} xs={12} sm={6}>
                {child}
              </Grid>
            ) : (
              <Grid item key={index} md={4} lg={4} xl={4} xs={12} sm={6}>
                {child}
              </Grid>
            )
          );
        default:
          return (
            <Grid item xs={12}>
              {children}
            </Grid>
          );
      }
    } else {
      return (
        <Grid item xs={12}>
          {children}
        </Grid>
      );
    }
  };
  return (
    <Grid container spacing={2}>
      {renderGrid()}
    </Grid>
  );
};
