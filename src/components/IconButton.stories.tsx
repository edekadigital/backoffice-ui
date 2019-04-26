import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { IconButton, ArrowForward } from '..'; // @edekadigital/backoffice-ui

storiesOf('Components|IconButton', module)
  .add('default', () => <IconButton icon={ArrowForward} />)
  .add('default (disabled)', () => (
    <IconButton icon={ArrowForward} disabled={true} />
  ))
  .add('primary', () => <IconButton color="primary" icon={ArrowForward} />)
  .add('primary (disabled)', () => (
    <IconButton color="primary" icon={ArrowForward} disabled={true} />
  ));
