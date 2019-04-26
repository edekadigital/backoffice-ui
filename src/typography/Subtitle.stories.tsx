import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Subtitle } from '..'; // @edekadigital/backoffice-ui

storiesOf('Typography|Subtitle', module)
  .add('default', () => (
    <Subtitle>
      Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Subtitle>
  ))
  .add('primary', () => (
    <Subtitle color="primary">
      Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Subtitle>
  ))
  .add('secondary', () => (
    <Subtitle color="secondary">
      Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Subtitle>
  ))
  .add('subtitle1', () => (
    <Subtitle variant="subtitle1">
      Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Subtitle>
  ))
  .add('subtitle2', () => (
    <Subtitle variant="subtitle2">
      Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Subtitle>
  ));
