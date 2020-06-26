import * as React from 'react';
import { AppBar, ExitToApp, Apps } from '..'; // @edekadigital/backoffice-ui
import { AppBarActions } from './AppBar';

export default {
  title: 'Components|AppBar',
  component: AppBar,
};

AppBar.defaultProps = {
  actions: [],
};

export const Default = () => <AppBar>Lorem Ipsum</AppBar>;

export const Transparent = () => (
  <AppBar color="transparent">Lorem Ipsum</AppBar>
);

export const WithActions = () => {
  const actions: AppBarActions = [
    {
      icon: Apps,
      menuType: 'list',
      items: [
        {
          label: 'Lorem',
          icon: Apps,
          handler: () => {
            console.log('sub');
          },
        },
      ],
    },
    {
      icon: ExitToApp,
      handler: () => console.log('signout'),
    },
  ];
  return <AppBar actions={actions}>Lorem Ipsum</AppBar>;
};

export const TransparentWithActions = () => {
  const actions: AppBarActions = [
    {
      icon: Apps,
      menuType: 'list',
      items: [
        {
          label: 'Lorem',
          icon: Apps,
          handler: () => {
            console.log('sub');
          },
        },
      ],
    },
    {
      icon: ExitToApp,
      handler: () => console.log('signout'),
    },
  ];
  return (
    <AppBar actions={actions} color="transparent">
      Lorem Ipsum
    </AppBar>
  );
};
