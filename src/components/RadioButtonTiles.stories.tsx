import * as React from 'react';
import { Launch, Star, History, CloudDownload } from '../icons';
import { RadioButtonTiles } from './RadioButtonTiles';

export default {
  title: 'Components/RadioButtonTiles',
  component: RadioButtonTiles,
};

export const Default = () => {
  const [value, setValue] = React.useState<string>('a');
  const handleChange = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    setValue(value);
  };
  return (
    <RadioButtonTiles
      items={[
        { label: 'Option A', value: 'a', icon: Launch },
        { label: 'Option B', value: 'b', icon: Launch },
      ]}
      onChange={handleChange}
      value={value}
    />
  );
};

export const ThreeTilesPerLine = () => {
  const [value, setValue] = React.useState<string>('a');
  const handleChange = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    setValue(value);
  };
  return (
    <div style={{ width: 554, border: 'solid 1px #ddd' }}>
      <RadioButtonTiles
        items={[
          { label: 'Option A', value: 'a', icon: Launch },
          { label: 'Option B', value: 'b', icon: Star },
          { label: 'Option C', value: 'c', icon: History },
          { label: 'Option D', value: 'd', icon: CloudDownload },
          { label: 'Option E', value: 'e' },
        ]}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export const TwoTilesPerLine = () => {
  const [value, setValue] = React.useState<string>('a');
  const handleChange = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    setValue(value);
  };
  return (
    <div style={{ width: 554, border: 'solid 1px #ddd' }}>
      <RadioButtonTiles
        items={[
          { label: 'Option A', value: 'a', icon: Launch },
          { label: 'Option B', value: 'b', icon: Star },
          { label: 'Option C', value: 'c', icon: History },
        ]}
        onChange={handleChange}
        value={value}
        tilesPerLine={2}
      />
    </div>
  );
};
export const FourTilesPerLine = () => {
  const [value, setValue] = React.useState<string>('a');
  const handleChange = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    setValue(value);
  };
  return (
    <div style={{ width: 554, border: 'solid 1px #ddd' }}>
      <RadioButtonTiles
        items={[
          { label: 'Option A', value: 'a', icon: Launch },
          { label: 'Option B', value: 'b', icon: Star },
          { label: 'Option C', value: 'c', icon: History },
          { label: 'Option D', value: 'd', icon: CloudDownload },
          { label: 'Option E', value: 'e' },
        ]}
        onChange={handleChange}
        value={value}
        tilesPerLine={4}
      />
    </div>
  );
};
