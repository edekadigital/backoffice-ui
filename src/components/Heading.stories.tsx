import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Heading } from '..'; // @edekadigital/backoffice-ui

storiesOf('Components|Heading', module)
  .add('default', () => <Heading>Heading</Heading>)
  .add('primary', () => <Heading color="primary">Heading</Heading>)
  .add('secondary', () => <Heading color="secondary">Heading</Heading>)
  .add('h1', () => <Heading variant="h1">Heading (h1)</Heading>)
  .add('h2', () => <Heading variant="h2">Heading (h2)</Heading>)
  .add('h3', () => <Heading variant="h3">Heading (h3)</Heading>)
  .add('h4', () => <Heading variant="h4">Heading (h4)</Heading>)
  .add('h5', () => <Heading variant="h5">Heading (h5)</Heading>)
  .add('h6', () => <Heading variant="h6">Heading (h6)</Heading>);
