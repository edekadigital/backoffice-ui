import * as React from 'react';
import { Grid } from '@material-ui/core';

export type GridVariant = '12' | '6-6' | '4-8' | '8-4' | '4-4-4' | '3-3-3-3';
export interface GridRowProps {
  /**
   * Defines the grid layout.
   * @default "12"
   */
  gridVariant?: GridVariant;
}

/**
 * | Test ID             | Description          |
 * | ------------------- | -------------------- |
 * | `gridRow`           | Grid container       |
 * | `gridRow-item-{n}`  | Grid item _n_        |
 */
export const GridRow: React.FC<GridRowProps> = (props) => {
  const { gridVariant = '12' } = props;
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];

  const renderGrid = () => {
    switch (gridVariant) {
      case '6-6':
        return children.map((child, index) => (
          <Grid
            item
            key={index}
            xs={12}
            md={6}
            data-testid={`gridRow-item-${index}`}
          >
            {child}
          </Grid>
        ));
      case '4-4-4':
        return children.map((child, index) => (
          <Grid
            item
            key={index}
            xs={12}
            md={4}
            data-testid={`gridRow-item-${index}`}
          >
            {child}
          </Grid>
        ));
      case '3-3-3-3':
        return children.map((child, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={3}
            data-testid={`gridRow-item-${index}`}
          >
            {child}
          </Grid>
        ));
      case '4-8':
      case '8-4':
        return children.map((child, index) => {
          const i = gridVariant === '4-8' ? index : index + 1;
          return i % 2 === 0 ? (
            <Grid
              item
              key={index}
              xs={12}
              md={4}
              data-testid={`gridRow-item-${index}`}
            >
              {child}
            </Grid>
          ) : (
            <Grid
              item
              key={index}
              xs={12}
              md={8}
              data-testid={`gridRow-item-${index}`}
            >
              {child}
            </Grid>
          );
        });
      default:
        return children.map((child, index) => (
          <Grid item key={index} xs={12} data-testid={`gridRow-item-${index}`}>
            {child}
          </Grid>
        ));
    }
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Grid container spacing={3} data-testid={'gridRow'}>
        {renderGrid()}
      </Grid>
    </div>
  );
};
