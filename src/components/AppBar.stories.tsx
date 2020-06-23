import * as React from 'react';
import { AppBar, ExitToApp, Apps } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Components|AppBar',
  component: AppBar,
};

AppBar.defaultProps = {
  actions: [],
};

export const Default = () => (
  <AppBar>
    <strong>Lorem</strong>Ipsum
  </AppBar>
);

export const WithActions = () => {
  const actions = [
    {
      icon: Apps,
      handler: () => console.log('to dashboard'),
    },
    {
      icon: ExitToApp,
      handler: () => console.log('signout'),
    },
  ];
  return (
    <AppBar actions={actions}>
      <strong>Lorem</strong>Ipsum
    </AppBar>
  );
};
