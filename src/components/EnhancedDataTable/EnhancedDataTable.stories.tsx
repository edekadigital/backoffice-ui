import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  EnhancedDataTable,
  EnhancedDataTableColumn,
  Filter,
  EnhancedDataTableFetchResult,
  EnhancedDataTableFetchProps,
  RowClickCallback,
} from './EnhancedDataTable';
import { GetApp, Delete } from '../../icons';
import { EnhancedDataTableSelectionMenuActions } from './EnhancedDataTableSelectionMenu';
import { StatusChip } from '../StatusChip';
import { sortTable, paginateTable } from '../../utils/tableUtils';

interface TestData {
  city: string;
  age?: number;
  name: string;
  type: string | React.ReactElement;
}

const columnsDefault: Array<EnhancedDataTableColumn<TestData>> = [
  { accessor: 'name', label: 'Name' },
  { accessor: 'city', label: 'City', sortable: false },
  { accessor: 'age', label: 'Age' },
  { accessor: 'type', label: 'Type' },
];

const filters: Array<Filter<TestData>> = [
  {
    accessor: 'type',
    label: 'Type',
    selectorValues: ['Manual', 'Automatic'],
    value: 'Manual',
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
  filters,
  order,
  orderBy,
}: EnhancedDataTableFetchProps<TestData>): Promise<
  EnhancedDataTableFetchResult<TestData>
> {
  let data: TestData[] = [
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

  if (filters && filters.length > 0) {
    data = data.filter(item =>
      filters.every(filter =>
        item[filter.accessor as keyof typeof item]
          ?.toString()
          .includes(filter.value)
      )
    );
  }

  data = sortTable(data, orderBy, order);

  const { paginatedResult, totalCount } = paginateTable(
    pageSize,
    pageIndex,
    data
  );

  const renderStatusChip = (type: string) =>
    type === 'Automatic' ? (
      <StatusChip label={type} color={'success'} size={'small'} />
    ) : (
      <StatusChip label={type} color={'warning'} size={'small'} />
    );

  const result = paginatedResult.map(entry => ({
    ...entry,
    type: renderStatusChip(entry.type as string),
  }));

  return new Promise(resolve => {
    setTimeout(() => resolve({ data: result, totalCount, pageIndex }), 500);
  });
}

const selectionActions: Array<EnhancedDataTableSelectionMenuActions<
  TestData
>> = [
  {
    icon: GetApp,
    handler: data => console.log(data, 'Make api call to get zip file'),
  },
  {
    icon: Delete,
    handler: data => {
      console.log(data, 'Delete Rows');
    },
  },
];

const clickAction: RowClickCallback<TestData> = (data: TestData) => {
  console.log(data, 'Clicked row');
};

storiesOf('Components|EnhancedDataTable', module)
  .add('default', () => (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Paginatable and sortable table'}
      columns={columnsDefault}
    />
  ))
  .add('selectable', () => (
    <div style={{ width: 700, margin: 'auto' }}>
      <EnhancedDataTable
        fetchData={fetchData}
        headline={'Table with selectable rows'}
        columns={columnsDefault}
        selectionActions={selectionActions}
      />
    </div>
  ))
  .add('clickable', () => (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Table with clickable rows'}
      columns={columnsDefault}
      onRowClick={clickAction}
    />
  ))
  .add('filterable', () => (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Filterable table'}
      columns={columnsDefault}
      filters={filters}
    />
  ))
  .add('all functionalities', () => (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Table with all functionalities'}
      columns={columnsDefault}
      selectionActions={selectionActions}
      filters={filters}
      onRowClick={clickAction}
    />
  ));
