import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { AppBar, ExitToApp, Apps, HorizontalMenu } from '..'; // @edekadigital/backoffice-ui
import { BrowserRouter } from 'react-router-dom';

storiesOf('Components|AppBar', module)
  .add('default', () => (
    <AppBar>
      <strong>Lorem</strong>Ipsum
    </AppBar>
  ))
  .add('with actions', () => {
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
  })
  .add('with horizontal menu', () => {
    const menu = {
      items: [
        { title: 'Simple', to: '/simple' },
        { title: 'Dot as badge', to: '/dot-as-badge', badge: true },
        { title: 'Number as badge', to: '/number-as-badge', badge: 4 },
        { title: 'Disabled' },
      ],
    };

    return (
      <BrowserRouter>
        <AppBar>
          <strong>Lorem</strong>Ipsum
          <HorizontalMenu items={menu.items} />
        </AppBar>
      </BrowserRouter>
    );
  });
