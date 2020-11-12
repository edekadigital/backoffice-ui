import * as React from 'react';
import { Spacer } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Components/Spacer',
  component: Spacer,
};

export const Vertical = () => (
  <>
    <span style={{ border: 'solid 1px blue' }}>Content before Spacer</span>
    <Spacer vertical={4} />
    <span style={{ border: 'solid 1px red' }}>Content after Spacer</span>
  </>
);

export const Horizontal = () => (
  <div style={{ display: 'flex' }}>
    <span style={{ border: 'solid 1px blue' }}>Content before Spacer</span>
    <Spacer horizontal={4} />
    <span style={{ border: 'solid 1px red' }}>Content after Spacer</span>
  </div>
);
