import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  EnhancedDataTable,
  EnhancedDataTableColumn,
  Filter,
} from './EnhancedDataTable';

const columnsDefault: EnhancedDataTableColumn[] = [
  { accessor: 'columnA', label: 'Column A' },
  { accessor: 'columnB', label: 'Column B' },
  { accessor: 'columnC', label: 'Column C' },
  { accessor: 'columnD', label: 'Column D' },
];

const columnsSortable: EnhancedDataTableColumn[] = [
  { accessor: 'columnA', label: 'Column A', sortable: true },
  { accessor: 'columnB', label: 'Column B', sortable: true },
  { accessor: 'columnC', label: 'Column C', sortable: true },
  { accessor: 'columnD', label: 'Column D', sortable: false },
];

const filters: Filter[] = [
  {
    accessor: 'columnA',
    label: 'Spalte A',
    selectorValues: ['Manual', 'Automatic'],
  },
  {
    accessor: 'columnB',
    label: 'Spalte B',
  },
  {
    accessor: 'columnC',
    label: 'Spalte C',
  },
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
      columns={columnsDefault}
      filters={filters}
    />
  ));
