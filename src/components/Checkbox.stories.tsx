import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { CheckboxDark, CheckboxLight } from '..'; // @edekadigital/backoffice-ui

storiesOf('Components|Checkbox', module).add('dark & light', () => (
  <>
    <CheckboxDark />
    <CheckboxLight />
  </>
));
