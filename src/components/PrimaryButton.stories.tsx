import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { PrimaryButton } from '../';

storiesOf('Components|PrimaryButton', module).add('default', () => (
  <PrimaryButton label="Label" />
));
