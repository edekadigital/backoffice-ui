import {
  Grid,
  makeStyles,
  SvgIconProps,
  Theme,
  Typography,
} from '@material-ui/core';
import * as React from 'react';

export interface RadioButtonTilesProps<D> {
  /**
   * Radio button tiles to show. Each tile can be displayed with an additional icon
   */
  items: Array<{
    value: D;
    label?: string;
    icon: React.ElementType<SvgIconProps>;
  }>;
  /**
   * Callback function for clicking a button tile
   */
  onChange?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: D
  ) => void;
  /** Number of tiles to displayed in a row
   * @default 3
   */
  tilesPerLine?: 2 | 3 | 4;
  /**
   * The value of the radio group, required for a controlled component.
   */
  value?: D;
}

/**
 * | Test ID                               | Description          |
 * | ------------------------------------- | -------------------- |
 * | `radioButtonTiles`                    | container            |
 * | `radioButtonTiles-item-${index}`      | tile item            |
 * | `radioButtonTiles-item-${index}-label`| label of tile item   |
 * | `radioButtonTiles-item-${index}-icon` | icon of tile item    |
 */
export function RadioButtonTiles<D>(props: RadioButtonTilesProps<D>) {
  const { items, value, onChange, tilesPerLine = 3 } = props;

  const renderItems = items.map((item, index) => (
    <Grid key={index} item xs={12} sm={6} md={(12 / tilesPerLine) as 3 | 4 | 6}>
      <RadioButtonTile
        onChange={onChange}
        icon={item.icon}
        label={item.label}
        value={item.value}
        checked={item.value === value}
        index={index}
      />
    </Grid>
  ));

  return (
    <Grid
      container
      spacing={2}
      alignItems={'stretch'}
      data-testid="radioButtonTiles"
    >
      {renderItems}
    </Grid>
  );
}

interface RadioButtonTileProps<D> {
  label?: string;
  value: D;
  icon: React.ElementType<SvgIconProps>;
  checked?: boolean;
  index: number;
  onChange?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: D
  ) => void;
}

const useTileStyles = makeStyles<Theme, { checked?: boolean }>(
  (theme: Theme) => ({
    root: ({ checked }) => ({
      cursor: 'pointer',
      height: theme.spacing(13),
      background: checked
        ? theme.palette.primary.main
        : theme.palette.common.white,
      border: `solid 1px ${
        checked ? theme.palette.primary.main : theme.palette.grey[300]
      }`,
      color: checked ? theme.palette.common.white : theme.palette.text.primary,
      boxShadow: checked ? theme.shadows[16] : 'none',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    }),
    icon: ({ checked }) => ({
      marginBottom: theme.spacing(1),
      color: !checked ? theme.palette.primary.main : theme.palette.common.white,
    }),
  })
);

function RadioButtonTile<D>(props: RadioButtonTileProps<D>) {
  const { checked, label, onChange, value, index } = props;
  const classes = useTileStyles({ checked });
  const icon = (
    <props.icon
      fontSize="large"
      className={classes.icon}
      data-testid={`radioButtonTiles-item-${index}-icon`}
    />
  );

  return (
    <div
      className={classes.root}
      onClick={(e) => (onChange ? onChange(e, value) : null)}
      data-testid={`radioButtonTiles-item-${index}`}
      aria-selected={checked}
    >
      {icon}
      <Typography
        variant="caption"
        data-testid={`radioButtonTiles-item-${index}-label`}
      >
        {label}
      </Typography>
    </div>
  );
}
