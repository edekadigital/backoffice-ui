import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { FormRow } from '..'; // @edekadigital/backoffice-ui

storiesOf('Components|FormRow', module).add('default', () => (
  <FormRow>
    <div style={{ background: 'red' }}>Lorem</div>
    <div style={{ background: 'green' }}>Lorem</div>
  </FormRow>
));
