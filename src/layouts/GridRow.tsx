import * as React from 'react';
import { Grid, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';

export type GridVariant = '12' | '6-6' | '4-8' | '8-4' | '4-4-4' | '3-3-3-3';
export interface GridRowProps {
  /**
   * Defines the grid layout.
   * @default "12"
   */
  gridVariant?: GridVariant;
  /**
   * If `true`, the grid row will have a bottom margin.
   */
  gutterBottom?: boolean | number;
  /**
   * If `true`, the grid row will have a top margin.
   */
  gutterTop?: boolean | number;
}

const useStyles = makeStyles<
  Theme,
  { gutterBottom: number; gutterTop: number }
>((theme) => ({
  container: ({ gutterBottom, gutterTop }) => ({
    marginBottom: theme.spacing(gutterBottom),
    marginTop: theme.spacing(gutterTop),
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
  const { gridVariant = '12', gutterBottom = 0, gutterTop = 0 } = props;
  const classes = useStyles({
    gutterBottom: gutterBottom === true ? 1.5 : +gutterBottom,
    gutterTop: gutterTop === true ? 1.5 : +gutterTop,
  });
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
      alignItems={'center'}
      classes={classes}
    >
      {renderGrid()}
    </Grid>
  );
};
