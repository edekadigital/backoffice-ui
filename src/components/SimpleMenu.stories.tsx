import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { SimpleMenu } from '..';

const noop = () => {};
const storyItems = [
  { label: 'Lorem Ipsum', action: noop },
  { label: 'Lorem Ipsum', action: noop },
  { label: 'Lorem Ipsum', action: noop },
];

storiesOf('Components|Menu', module).add('default', () => (
  <SimpleMenu items={storyItems} />
));
