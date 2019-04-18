import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { TextButton, Delete, ArrowForward } from '..';

storiesOf('Components|TextButton', module)
  .add('default', () => <TextButton>Some Label</TextButton>)
  .add('with icon', () => <TextButton icon={Delete}>Some Label</TextButton>)
  .add('with icon (right)', () => (
    <TextButton icon={ArrowForward} iconPosition="right">
      Some Label
    </TextButton>
  ));
