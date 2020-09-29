import * as React from 'react';
import { StatusChip, Delete, Schedule, Check, FormRow } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Components/StatusChip',
  component: StatusChip,
};

export const Default = () => <StatusChip label="Some label" />;
export const Naked = () => <StatusChip label="Some label" variant={'naked'} />;
export const Small = () => <StatusChip size={'small'} label="Some label" />;
export const WithIcon = () => <StatusChip label="Some label" icon={Check} />;
export const Info = () => <StatusChip label="Some label" color="info" />;
export const Success = () => <StatusChip label="Some label" color="success" />;
export const Warning = () => <StatusChip label="Some label" color="warning" />;
export const Error = () => <StatusChip label="Some label" color="error" />;
export const MultipleChips = () => (
  <FormRow gridLayout={['auto', 'auto', 'auto', 'auto']}>
    <StatusChip label="Active" color="success" icon={Check} />
    <StatusChip label="Inactive" color="error" icon={Schedule} />
    <StatusChip label="Deleted" icon={Delete} />
    <StatusChip label="Deleted" icon={Delete} variant={'naked'} />
  </FormRow>
);
