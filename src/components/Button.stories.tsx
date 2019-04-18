import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button, Delete, ArrowForward } from '..';

storiesOf('Components|Button', module)
  .add('contained', () => <Button>Some Label</Button>)
  .add('contained with icon', () => (
    <Button type="contained" icon={Delete}>
      Some Label
    </Button>
  ))
  .add('contained with icon (right)', () => (
    <Button type="contained" icon={ArrowForward} iconPosition="right">
      Some Label
    </Button>
  ))
  .add('text', () => <Button type="text">Some Label</Button>)
  .add('text with icon', () => (
    <Button type="text" icon={Delete}>
      Some Label
    </Button>
  ))
  .add('text with icon (right)', () => (
    <Button type="text" icon={ArrowForward} iconPosition="right">
      Some Label
    </Button>
  ))
  .add('outlined', () => <Button type="outlined">Some Label</Button>)
  .add('outlined with icon', () => (
    <Button type="outlined" icon={Delete}>
      Some Label
    </Button>
  ))
  .add('outlined with icon (right)', () => (
    <Button type="outlined" icon={ArrowForward} iconPosition="right">
      Some Label
    </Button>
  ));
