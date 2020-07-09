import * as React from 'react';
import { ServiceTile } from './ServiceTile';
import { Star, MyLocation } from '../icons';
import { GridRow } from '../layouts/GridRow';

export default {
  title: 'Components|ServiceTile',
  component: ServiceTile,
};

export const Default = () => (
  <ServiceTile
    title={'Tile A'}
    icon={Star}
    description={
      'Description - Lorem Ipsum dolor sit amet dolor lorem Ipsum dolor avec sit amet'
    }
    buttonLabel={'open'}
    info={'1.2.2'}
    onClick={() => console.log('Button clicked')}
  />
);

export const Minimal = () => (
  <ServiceTile
    title={'Tile A'}
    buttonLabel={'open'}
    onClick={() => console.log('Button clicked')}
  />
);

export const MultipleInGridRow = () => (
  <GridRow gridVariant={'3-3-3-3'}>
    <ServiceTile
      title={'Tile A'}
      icon={Star}
      description={
        'Description - Lorem Ipsum dolor sit amet dolor lorem Ipsum dolor avec sit amet'
      }
      buttonLabel={'open'}
      info={'1.2.2'}
      onClick={() => console.log('Button clicked')}
    />
    <ServiceTile
      title={'Tile B'}
      icon={MyLocation}
      description={
        'Description - Lorem Ipsum dolor sit amet dolor lorem Ipsum dolor avec sit amet'
      }
      buttonLabel={'open'}
      info={'1.2.2'}
      onClick={() => console.log('Button clicked')}
    />
  </GridRow>
);
