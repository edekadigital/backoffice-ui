import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { EnhancedDataTable } from './EnhancedDataTable';

storiesOf('Components|EnhancedDataTable', module).add('default', () => (
  <EnhancedDataTable headline={'Optional Headline'} />
));
