import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button, Delete, ArrowForward } from '..';

storiesOf('Components|Button', module)
  .add('contained', () => <Button>Some Label</Button>)
  .add('contained with icon', () => (
    <Button variant="contained" icon={Delete}>
      Some Label
    </Button>
  ))
  .add('contained with icon (right)', () => (
    <Button variant="contained" icon={ArrowForward} iconPosition="right">
      Some Label
    </Button>
  ))
  .add('text', () => <Button variant="text">Some Label</Button>)
  .add('text with icon', () => (
    <Button variant="text" icon={Delete}>
      Some Label
    </Button>
  ))
  .add('text with icon (right)', () => (
    <Button variant="text" icon={ArrowForward} iconPosition="right">
      Some Label
    </Button>
  ))
  .add('outlined', () => <Button variant="outlined">Some Label</Button>)
  .add('outlined with icon', () => (
    <Button variant="outlined" icon={Delete}>
      Some Label
    </Button>
  ))
  .add('outlined with icon (right)', () => (
    <Button variant="outlined" icon={ArrowForward} iconPosition="right">
      Some Label
    </Button>
  ));
