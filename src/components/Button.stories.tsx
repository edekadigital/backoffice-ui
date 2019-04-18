import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from '..';

storiesOf('Components|Button', module).add('default', () => (
  <Button label="Label" />
));
