import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { ReverseNavigation } from '..'; // @edekadigital/backoffice-ui

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
  });
