import * as React from 'react';
import {
  ServiceTiles,
  ServiceTileItem,
  ServiceTileItemProps,
} from './ServiceTiles';
import {
  Star,
  MyLocation,
  Notifications,
  Public,
  FavoriteBorder,
} from '../icons';

export default {
  title: 'Components|ServiceTiles',
  component: ServiceTiles,
  subcomponents: { ServiceTileProps: ServiceTileItem },
};

export const Default = () => {
  const services: ServiceTileItemProps[] = [
    {
      title: 'Tile A',
      icon: Star,
      description:
        'Description - Lorem Ipsum dolor sit amet dolor lorem Ipsum dolor avec sit amet',
      buttonLabel: 'open',
      info: '1.2.2',
      onClick: () => console.log('Button clicked'),
    },
  ];
  return <ServiceTiles services={services} />;
};

export const Minimal = () => {
  const services: ServiceTileItemProps[] = [
    {
      title: 'Tile A',
      buttonLabel: 'open',
      onClick: () => console.log('Button clicked'),
    },
  ];
  return <ServiceTiles services={services} />;
};

export const MultipleInGridRow = () => {
  const services: ServiceTileItemProps[] = [
    {
      title: 'Tile A',
      icon: Star,
      description:
        'Description - Lorem Ipsum dolor sit amet dolor lorem Ipsum dolor avec sit amet',
      buttonLabel: 'open',
      info: 'V 1.2.2',
      onClick: () => console.log('Button clicked'),
    },
    {
      title: 'Tile B',
      icon: MyLocation,
      description: 'Description - Lorem Ipsum',
      buttonLabel: 'open',
      info: 'V 1.2.2',
      onClick: () => console.log('Button clicked'),
    },
    {
      title: 'Tile C',
      icon: FavoriteBorder,
      description:
        'Description - Lorem Ipsum dolor sit amet dolor lorem Ipsum dolor avec sit amet dolor lorem Ipsum dolor avec sit amet dolor lorem',
      buttonLabel: 'open',
      info: 'V 11.1.0',
      onClick: () => console.log('Button clicked'),
    },
    {
      title: 'Tile D',
      icon: Public,
      description:
        'Description - Lorem Ipsum dolor sit amet dolor lorem Ipsum dolor avec sit amet',
      buttonLabel: 'open',
      info: 'V 0.1.2',
      onClick: () => console.log('Button clicked'),
    },
    {
      title: 'Tile E',
      icon: Notifications,
      description:
        'Description - Lorem Ipsum dolor sit amet dolor lorem Ipsum dolor avec sit amet',
      buttonLabel: 'open',
      info: 'V 10.1.1',
      onClick: () => console.log('Button clicked'),
    },
  ];
  return <ServiceTiles services={services} />;
};
