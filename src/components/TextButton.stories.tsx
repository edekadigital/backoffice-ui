import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { TextButton } from '..';

storiesOf('Components|TextButton', module).add('default', () => (
  <TextButton label="Label" />
));
