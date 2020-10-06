import * as React from 'react';
import { DrawerNavigation, DrawerNavigationItem } from '..';

export default {
  title: 'Components/DrawerNavigation',
  component: DrawerNavigation,
};

export const Default = () => {
  const items: Array<DrawerNavigationItem<string>> = [
    { label: 'Lorem', value: 'lorem' },
  ];
  return <DrawerNavigation items={items} />;
};
