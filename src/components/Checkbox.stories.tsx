import * as React from 'react';
import { CheckboxDark, CheckboxLight } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Components|Checkbox',
  component: [CheckboxDark, CheckboxLight],
};

export const DarkAndLight = () => (
  <>
    <CheckboxDark />
    <CheckboxLight />
  </>
);
