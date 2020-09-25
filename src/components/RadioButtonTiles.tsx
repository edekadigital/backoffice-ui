import {
  Grid,
  makeStyles,
  SvgIconProps,
  Theme,
  Typography,
} from '@material-ui/core';
import * as React from 'react';

export interface RadioButtonTilesProps {
  items: Array<{
    value: string | number | boolean;
    label: string;
    icon?: React.ElementType<SvgIconProps>;
  }>;
  value?: string | number | boolean;
  onChange?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string | number | boolean
  ) => void;
}

export const RadioButtonTiles: React.FC<RadioButtonTilesProps> = (props) => {
  const { items, value, onChange = () => {} } = props;

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
};

interface RadioButtonTile {
  label: string;
  value: string | number | boolean;
  icon?: React.ElementType<SvgIconProps>;
  checked?: boolean;
  onChange: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string | number | boolean
  ) => void;
}

const useTileStyles = makeStyles<Theme, RadioButtonTile>((theme: Theme) => ({
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
}));

const RadioButtonTile: React.FC<RadioButtonTile> = (props) => {
  const classes = useTileStyles(props);
  const icon = props.icon ? (
    <props.icon fontSize="large" className={classes.icon} />
  ) : undefined;
  return (
    <div
      className={classes.root}
      onClick={(e) => props.onChange(e, props.value)}
    >
      {icon}
      <Typography variant="caption">{props.label}</Typography>
    </div>
  );
};
