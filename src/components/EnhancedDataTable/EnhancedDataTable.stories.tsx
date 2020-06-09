import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  EnhancedDataTable,
  EnhancedDataTableColumn,
  Filter,
  FetchResult,
  FetchProps,
} from './EnhancedDataTable';
import { GetApp, Delete } from '../../icons';
import { EnhancedDataTableSelectionMenuActions } from './EnhancedDataTableSelectionMenu';

interface TestData {
  city: string;
  age?: number;
  name: string;
  type: string;
}

const columnsDefault: EnhancedDataTableColumn[] = [
  { accessor: 'name', label: 'Name' },
  { accessor: 'city', label: 'City' },
  { accessor: 'age', label: 'Age' },
  { accessor: 'type', label: 'Type' },
];

const columnsSortable: EnhancedDataTableColumn[] = [
  { accessor: 'name', label: 'Name', sortable: true },
  { accessor: 'city', label: 'City', sortable: true },
  { accessor: 'age', label: 'Age', sortable: true },
  { accessor: 'type', label: 'Type', sortable: false },
];

const filters: Filter[] = [
  {
    accessor: 'type',
    label: 'Type',
    selectorValues: ['Manual', 'Automatic'],
  },
  {
    accessor: 'name',
    label: 'Name',
  },
  {
    accessor: 'age',
    label: 'Age',
  },
];

function fetchData({
  pageSize = 10,
  pageIndex = 0,
}: FetchProps): Promise<FetchResult<TestData>> {
  const data = [
    {
      city: 'Hamburg',
      age: 35,
      name: 'Kane David',
      type: 'Automatic',
    },
    {
      city: 'Hamburg',
      name: 'Marianne Lamb',
      type: 'Automatic',
    },
    {
      city: 'Berlin',
      age: 22,
      name: 'Dyer Ortiz',
      type: 'Automatic',
    },
    {
      city: 'Stockholm',
      age: 32,
      name: 'Cain Ward',
      type: 'Manual',
    },
    {
      city: 'Göteborg',
      age: 23,
      name: 'Mullins Clemons',
      type: 'Manual',
    },
    {
      city: 'Malmö',
      age: 37,
      name: 'Williamson William',
      type: 'Automatic',
    },
    {
      city: 'Poznan',
      age: 22,
      name: 'Hinton Weiss',
      type: 'Automatic',
    },
    {
      city: 'Oldenburg',
      age: 39,
      name: 'Raymond Horne',
      type: 'Manual',
    },
    {
      city: 'Hamburg',
      age: 37,
      name: 'Jannie Knight',
      type: 'Automatic',
    },
    {
      city: 'Hamburg',
      age: 21,
      name: 'Hancock Dunlap',
      type: 'Manual',
    },
    {
      city: 'Kiel',
      age: 32,
      name: 'Florence Hale',
      type: 'Manual',
    },
    {
      city: 'Köln',
      age: 24,
      name: 'Inez Mccall',
      type: 'Automatic',
    },
    {
      city: 'Kiel',
      age: 26,
      name: 'Mia Blair',
      type: 'Automatic',
    },
    {
      city: 'Göteborg',
      age: 39,
      name: 'Ashley Casey',
      type: 'Automatic',
    },
    {
      city: 'Oslo',
      age: 39,
      name: 'Spence Mathews',
      type: 'Automatic',
    },
  ];

  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;
  const result = data.slice(startRow, endRow);
  const totalCount = data.length;

  return new Promise(resolve => {
    setTimeout(() => resolve({ data: result, totalCount, pageIndex }), 500);
  });
}

const actions: Array<EnhancedDataTableSelectionMenuActions<TestData>> = [
  {
    icon: GetApp,
    // tslint:disable-next-line: no-any
    handler: (data: any[]) =>
      console.log(data, 'Make api call to get zip file'),
  },
  {
    icon: Delete,
    // tslint:disable-next-line: no-any
    handler: (data: any[]) => {
      console.log(data, 'Delete Rows');
    },
  },
];

storiesOf('Components|EnhancedDataTable', module)
  .add('default', () => (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Paginatable and sortable table'}
      columns={columnsDefault}
    />
  ))
  .add('selectable', () => (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Selectable table'}
      columns={columnsDefault}
      selectable={true}
      selectionActions={actions}
    />
  ))
  .add('filterable', () => (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Filterable table'}
      columns={columnsDefault}
      filters={filters}
    />
  ));
