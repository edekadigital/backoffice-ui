import * as React from 'react';
import { Hide } from './Hide';

export default {
  title: 'Components|Hide',
  component: Hide,
};

export const HideOnDesktop = () => (
  <Hide viewport={'desktop'}>
    <div style={{ color: 'red' }}>Hide me on desktop, show me on mobile</div>
  </Hide>
);

export const HideOnMobile = () => (
  <Hide viewport={'mobile'}>
    <div style={{ color: 'blue' }}>Hide me on mobile, show me on desktop</div>
  </Hide>
);
