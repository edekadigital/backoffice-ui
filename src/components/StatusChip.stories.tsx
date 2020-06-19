import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { StatusChip, Delete, Schedule, Check, FormRow } from '..'; // @edekadigital/backoffice-ui

storiesOf('Components|StatusChip', module)
  .add('default', () => <StatusChip label="Some label" />)
  .add('default small', () => <StatusChip size={'small'} label="Some label" />)
  .add('with icon', () => <StatusChip label="Some label" icon={Check} />)
  .add('info', () => <StatusChip label="Some label" color="info" />)
  .add('success', () => <StatusChip label="Some label" color="success" />)
  .add('error', () => <StatusChip label="Some label" color="error" />)
  .add('warning', () => <StatusChip label="Some label" color="warning" />)
  .add('multiple chips', () => (
    <FormRow gridLayout={['auto', 'auto', 'auto']}>
      <StatusChip label="Active" color="success" icon={Check} />
      <StatusChip label="Inactive" color="error" icon={Schedule} />
      <StatusChip label="Deleted" icon={Delete} />
    </FormRow>
  ));
