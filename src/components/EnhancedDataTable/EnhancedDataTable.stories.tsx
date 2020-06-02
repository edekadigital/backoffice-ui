import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  EnhancedDataTable,
  EnhancedDataTableColumn,
} from './EnhancedDataTable';

const columnsDefault: EnhancedDataTableColumn[] = [
  { accessor: 'columnA', label: 'Column A' },
  { accessor: 'columnB', label: 'Column B' },
  { accessor: 'columnC', label: 'Column C' },
  { accessor: 'columnD', label: 'Column D' },
];

const columnsFilterable: EnhancedDataTableColumn[] = [
  { accessor: 'columnA', label: 'Column A', filterable: true },
  { accessor: 'columnB', label: 'Column B', filterable: true },
  { accessor: 'columnC', label: 'Column C', filterable: true },
  { accessor: 'columnD', label: 'Column D', filterable: false },
];

const fetchData = () => {};

storiesOf('Components|EnhancedDataTable', module)
  .add('default', () => (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Optional Headline'}
      columns={columnsDefault}
    />
  ))
  .add('filterable', () => (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Optional Headline'}
      columns={columnsFilterable}
    />
  ));
