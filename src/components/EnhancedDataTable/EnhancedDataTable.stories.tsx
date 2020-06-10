import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  EnhancedDataTable,
  EnhancedDataTableColumn,
  Filter,
  FetchResult,
  FetchProps,
  RowClickCallback,
  Order,
} from './EnhancedDataTable';
import { GetApp, Delete } from '../../icons';
import { EnhancedDataTableSelectionMenuActions } from './EnhancedDataTableSelectionMenu';
import { StatusChip } from '../StatusChip';

interface TestData {
  city: string;
  age?: number;
  name: string;
  type: string | React.ReactElement;
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

const compareValues = (key?: string, order?: Order) => {
  if (!key || !order) return;
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
};

function fetchData({
  pageSize = 10,
  pageIndex = 0,
  filters,
  order,
  orderBy,
}: FetchProps): Promise<FetchResult<TestData>> {
  let data = [
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

  data = data.sort(compareValues(orderBy, order));

  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;
  let result: TestData[] = data.slice(startRow, endRow);
  const totalCount = data.length;

  const renderStatusChip = (type: string) =>
    type === 'Automatic' ? (
      <StatusChip label={type} color={'success'} size={'small'} />
    ) : (
      <StatusChip label={type} color={'warning'} size={'small'} />
    );

  result = result.map(entry => ({
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
    handler: (data: TestData[]) =>
      console.log(data, 'Make api call to get zip file'),
  },
  {
    icon: Delete,
    handler: (data: TestData[]) => {
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
