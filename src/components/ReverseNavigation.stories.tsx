import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ReverseNavigation, StatusChip, Check, Button, Delete } from '..';

storiesOf('Components|ReverseNavigation', module)
  .add('default', () => {
    const handleBackClick = () => {
      console.log('handleBackClick');
    };
    return (
      <ReverseNavigation onBackClick={handleBackClick}>
        Lorem ipsum dolor <strong>sit amet</strong>
      </ReverseNavigation>
    );
  })
  .add('narrow', () => {
    const handleBackClick = () => {
      console.log('handleBackClick');
    };
    return (
      <ReverseNavigation variant="narrow" onBackClick={handleBackClick}>
        Lorem ipsum dolor <strong>sit amet</strong>
      </ReverseNavigation>
    );
  })
  .add('infobar', () => {
    const handleBackClick = () => {
      console.log('handleBackClick');
    };
    const label = 'Some Label';
    const status = <StatusChip label={label} icon={Check} />;
    return (
      <ReverseNavigation onBackClick={handleBackClick} infoBarContent={status}>
        Lorem ipsum dolor <strong>sit amet</strong>
      </ReverseNavigation>
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
      <ReverseNavigation
        onBackClick={handleBackClick}
        infoBarContent={status}
        action={action}
      >
        Lorem ipsum dolor <strong>sit amet</strong>
      </ReverseNavigation>
    );
  });
