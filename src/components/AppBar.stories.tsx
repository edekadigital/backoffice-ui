import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { AppBar, ExitToApp, Apps } from '..'; // @edekadigital/backoffice-ui

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
  });
