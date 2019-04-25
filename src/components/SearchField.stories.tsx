import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { SearchField } from '..'; // @edekadigital/backoffice-ui

const handleChange = (value: string) => {
  console.log(`Change: ${value}`);
};

const handleSubmit = (value: string) => {
  console.log(`Submit: ${value}`);
};

storiesOf('Components|SearchField', module).add('default', () => (
  <SearchField
    placeholder="Search"
    onChange={handleChange}
    onSubmit={handleSubmit}
  />
));
