import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Subtitle } from '..'; // @edekadigital/backoffice-ui

storiesOf('Components|Subtitle', module)
  .add('default', () => <Subtitle>Subtitle</Subtitle>)
  .add('primary', () => <Subtitle color="primary">Subtitle</Subtitle>)
  .add('secondary', () => <Subtitle color="secondary">Subtitle</Subtitle>)
  .add('subtitle1', () => (
    <Subtitle variant="subtitle1">Subtitle (subtitle1)</Subtitle>
  ))
  .add('subtitle2', () => (
    <Subtitle variant="subtitle2">Subtitle (subtitle2)</Subtitle>
  ));
