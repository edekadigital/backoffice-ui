import * as React from 'react';
import { AppBar, Logout, Apps, OpenInNew, Person, Star } from '..'; // @edekadigital/backoffice-ui
import { AppBarActions } from './AppBar';

export default {
  title: 'Components|AppBar',
  component: AppBar,
};

export const Default = () => <AppBar>Lorem Ipsum</AppBar>;

export const Transparent = () => (
  <AppBar color="transparent">Lorem Ipsum</AppBar>
);

export const WithActions = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const bitmapIcon = require('../assets/bitmap-icon.png');

  const actions: AppBarActions = [
    {
      icon: Star,
      handler: () => console.log('some action'),
    },
    {
      icon: Apps,
      menuType: 'grid',
      items: [
        {
          label: 'Lorem ipsum',
          icon: bitmapIcon,
          handler: () => {
            console.log('app 1');
          },
        },
        {
          label: 'Lorem ipsum dolor',
          icon: Star,
          handler: () => {
            console.log('app 2');
          },
        },
        {
          label: 'Lorem ipsum dolor sit amet',
          icon: bitmapIcon,
          handler: () => {
            console.log('app 3');
          },
        },
        {
          label: 'Lorem ipsum',
          icon: Star,
          handler: () => {
            console.log('app 4');
          },
        },
        {
          label: 'Lorem ipsum dolor',
          icon: bitmapIcon,
          handler: () => {
            console.log('app 5');
          },
        },
      ],
    },
    {
      icon: Person,
      menuType: 'list',
      items: [
        {
          label: 'Lorem ipsum',
          icon: OpenInNew,
          handler: () => {
            console.log('change password');
          },
        },
        {
          label: 'Lorem ipsum',
          icon: Logout,
          handler: () => {
            console.log('signout');
          },
        },
      ],
    },
  ];
  return <AppBar actions={actions}>Lorem Ipsum</AppBar>;
};

export const TransparentWithActions = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const bitmapIcon = require('../assets/bitmap-icon.png');

  const actions: AppBarActions = [
    {
      icon: Star,
      handler: () => console.log('some action'),
    },
    {
      icon: Apps,
      menuType: 'grid',
      items: [
        {
          label: 'Lorem ipsum',
          icon: bitmapIcon,
          handler: () => {
            console.log('app 1');
          },
        },
        {
          label: 'Lorem ipsum dolor',
          icon: Star,
          handler: () => {
            console.log('app 2');
          },
        },
        {
          label: 'Lorem ipsum dolor sit amet',
          icon: bitmapIcon,
          handler: () => {
            console.log('app 3');
          },
        },
        {
          label: 'Lorem ipsum',
          icon: Star,
          handler: () => {
            console.log('app 4');
          },
        },
        {
          label: 'Lorem ipsum dolor',
          icon: bitmapIcon,
          handler: () => {
            console.log('app 5');
          },
        },
      ],
    },
    {
      icon: Person,
      menuType: 'list',
      items: [
        {
          label: 'Lorem ipsum',
          icon: OpenInNew,
          handler: () => {
            console.log('change password');
          },
        },
        {
          label: 'Lorem ipsum',
          icon: Logout,
          handler: () => {
            console.log('signout');
          },
        },
      ],
    },
  ];
  return (
    <AppBar actions={actions} color="transparent">
      Lorem Ipsum
    </AppBar>
  );
};
