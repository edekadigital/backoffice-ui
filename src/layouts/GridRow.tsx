import * as React from 'react';
import { Grid, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';

export type GridVariant = '12' | '6-6' | '4-8' | '8-4' | '4-4-4' | '3-3-3-3';

export type GridAlignment = 'center' | 'flex-start' | 'stretch';
export interface GridRowProps {
  /**
   * Defines the grid layout.
   * @default "12"
   */
  gridVariant?: GridVariant;
  /**
   * If `true`, the grid row will have a bottom margin.
   */
  gutterBottom?: boolean;
  /**
   * Aligns the grid items
   * @default "center"
   */
  alignItems?: GridAlignment;
}

const useStyles = makeStyles<Theme, GridRowProps>((theme) => ({
  container: ({ gutterBottom }) => ({
    marginBottom: theme.spacing(gutterBottom ? 1.5 : 0),
    overflowX: 'hidden',
  }),
}));

/**
 * | Test ID             | Description          |
 * | ------------------- | -------------------- |
 * | `gridRow`           | Grid container       |
 * | `gridRow-item-{n}`  | Grid item _n_        |
 */
export const GridRow: React.FC<GridRowProps> = (props) => {
  const { gridVariant = '12', alignItems = 'center' } = props;
  const classes = useStyles(props);
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
    <Grid
      container
      spacing={3}
      data-testid={'gridRow'}
      alignItems={alignItems}
      classes={classes}
    >
      {renderGrid()}
    </Grid>
  );
};
