import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Body } from '..'; // @edekadigital/backoffice-ui

storiesOf('Components|Body', module)
  .add('default', () => <Body>Body</Body>)
  .add('primary', () => <Body color="primary">Body</Body>)
  .add('secondary', () => <Body color="secondary">Body</Body>)
  .add('error', () => <Body color="error">Body</Body>)
  .add('body1', () => <Body variant="body1">Body (body1)</Body>)
  .add('body2', () => <Body variant="body2">Body (body2)</Body>);
