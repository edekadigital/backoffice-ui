import * as React from 'react';
import { Checkbox } from '..'; // @edekadigital/backoffice-ui
import { edekaBlue } from '../constants/colors';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};

export const Default = () => <Checkbox />;
export const Inverted = () => (
  <div style={{ background: `${edekaBlue.main}` }}>
    <Checkbox inverted={true} />
  </div>
);
export const Disabled = () => <Checkbox disabled={true} />;
