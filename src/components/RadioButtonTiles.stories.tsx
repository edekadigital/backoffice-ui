import * as React from 'react';
import { Launch, Star, History, CloudDownload, Check } from '../icons';
import { RadioButtonTiles } from './RadioButtonTiles';
import { Page } from '..';

export default {
  title: 'Components/RadioButtonTiles',
  component: RadioButtonTiles,
};

export const Default = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined);
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
    <Page variant="narrow">
      <RadioButtonTiles
        items={[
          { label: 'Option A', value: 'a', icon: Launch },
          { label: 'Option B', value: 'b', icon: Star },
          { label: 'Option C', value: 'c', icon: History },
          { label: 'Option D', value: 'd', icon: CloudDownload },
          { label: 'Option E', value: 'e', icon: Check },
        ]}
        onChange={handleChange}
        value={value}
      />
    </Page>
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
    <Page variant="narrow">
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
    </Page>
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
    <Page variant="narrow">
      <RadioButtonTiles
        items={[
          { label: 'Option A', value: 'a', icon: Launch },
          { label: 'Option B', value: 'b', icon: Star },
          { label: 'Option C', value: 'c', icon: History },
          { value: 'd', icon: CloudDownload },
          { value: 'e', icon: Check },
        ]}
        onChange={handleChange}
        value={value}
        tilesPerLine={4}
      />
    </Page>
  );
};
