import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button, ButtonBar } from '..'; // @edekadigital/backoffice-ui

storiesOf('Components|ButtonBar', module).add('default', () => (
  <ButtonBar>
    <Button>Lorem ipsum</Button>
    <Button variant="text">Lorem ipsum</Button>
  </ButtonBar>
));
