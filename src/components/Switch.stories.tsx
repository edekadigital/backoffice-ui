import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Switch } from '..'; // @edekadigital/backoffice-ui

storiesOf('Components|Switch', module)
  .add('default', () => <Switch label="Some label" value="someValue" />)
  .add('controlled', () => (
    <Switch label="Some label" value="someValue" checked={true} />
  ))
  .add('disabled', () => (
    <Switch label="Some label" value="someValue" disabled={true} />
  ));
