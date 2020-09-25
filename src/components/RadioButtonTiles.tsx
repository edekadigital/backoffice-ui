import {
  Grid,
  makeStyles,
  SvgIconProps,
  Theme,
  Typography,
} from '@material-ui/core';
import * as React from 'react';

export interface RadioButtonTilesProps<D> {
  items: Array<{
    value: D;
    label: string;
    icon?: React.ElementType<SvgIconProps>;
  }>;
  value?: D;
  onChange: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: D
  ) => void;
}
export function RadioButtonTiles<D>(props: RadioButtonTilesProps<D>) {
  //export const RadioButtonTiles: React.FC<RadioButtonTilesProps<D>> = (props) => {
  const { items, value, onChange } = props;

  const renderItems = items.map((item, index) => (
    <Grid key={index} item xs={12} sm={6} md={4}>
      <RadioButtonTile
        onChange={onChange}
        icon={item.icon}
        label={item.label}
        value={item.value}
        checked={item.value === value}
      />
    </Grid>
  ));

  return (
    <Grid container spacing={2} alignItems={'stretch'}>
      {renderItems}
    </Grid>
  );
}

interface RadioButtonTileProps<D> {
  label: string;
  value: D;
  icon?: React.ElementType<SvgIconProps>;
  checked?: boolean;
  onChange: (
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
  const { checked, label, onChange, value } = props;
  const classes = useTileStyles({ checked });
  const icon = props.icon ? (
    <props.icon fontSize="large" className={classes.icon} />
  ) : undefined;
  return (
    <div className={classes.root} onClick={(e) => onChange(e, value)}>
      {icon}
      <Typography variant="caption">{label}</Typography>
    </div>
  );
}
