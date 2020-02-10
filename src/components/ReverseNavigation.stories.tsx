import * as React from 'react';

import { storiesOf } from '@storybook/react';
// @edekadigital/backoffice-ui
import { ReverseNavigation, StatusChip, Check, Button, Delete, Page } from '..';

storiesOf('Components|ReverseNavigation', module)
  .add('default (floating back button)', () => {
    const handleBackClick = () => {
      console.log('handleBackClick');
    };
    return (
      <Page>
        <ReverseNavigation onBackClick={handleBackClick}>
          Lorem ipsum dolor <strong>sit amet</strong>
        </ReverseNavigation>
        <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
      </Page>
    );
  })
  .add('default (not floating back button)', () => {
    const handleBackClick = () => {
      console.log('handleBackClick');
    };
    return (
      <Page>
        <ReverseNavigation
          onBackClick={handleBackClick}
          floatingBackButton={false}
        >
          Lorem ipsum dolor <strong>sit amet</strong>
        </ReverseNavigation>
        <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
      </Page>
    );
  })
  .add('infobar', () => {
    const handleBackClick = () => {
      console.log('handleBackClick');
    };
    const label = 'Some Label';
    const status = <StatusChip label={label} icon={Check} />;
    return (
      <Page>
        <ReverseNavigation
          onBackClick={handleBackClick}
          infoBarContent={status}
        >
          Lorem ipsum dolor <strong>sit amet</strong>
        </ReverseNavigation>
      </Page>
    );
  })
  .add('info- and actionbar', () => {
    const handleBackClick = () => {
      console.log('handleBackClick');
    };
    const label = 'Some Label';
    const status = <StatusChip label={label} icon={Check} />;
    const action = <Button children={label} icon={Delete} variant="outlined" />;
    return (
      <Page>
        <ReverseNavigation
          onBackClick={handleBackClick}
          infoBarContent={status}
          action={action}
        >
          Lorem ipsum dolor <strong>sit amet</strong>
        </ReverseNavigation>
      </Page>
    );
  });
