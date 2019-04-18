import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button, Delete, ArrowForward } from '..';

storiesOf('Components|Button', module)
  .add('default', () => <Button>Some Label</Button>)
  .add('with icon', () => <Button icon={Delete}>Some Label</Button>)
  .add('with icon (right)', () => (
    <Button icon={ArrowForward} iconPosition="right">
      Some Label
    </Button>
  ));
