import * as React from 'react';
import {
  EnhancedDataTable,
  EnhancedDataTableColumn,
  Filter,
  RowClickCallback,
  EnhancedDataTableFetchData,
} from './EnhancedDataTable';
import { sortTable, paginateTable, StatusChip, GetApp, Delete } from '../..';
import { EnhancedDataTableSelectionMenuActions } from './EnhancedDataTableSelectionMenu';

export default {
  title: 'Components|EnhancedDataTable',
  component: EnhancedDataTable,
};

export const Default = () => {
  interface TestData {
    city: string;
    age?: number;
    name: string;
    type: string;
  }

  const fetchData: EnhancedDataTableFetchData<TestData> = ({
    pageSize = 10,
    pageIndex = 0,
    order,
    orderBy,
  }) => {
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

    // import {sortTable} from 'utils/tableUtils'
    data = sortTable(data, orderBy, order);

    // import {paginateTable} from 'utils/tableUtils'
    const { paginatedResult, totalCount } = paginateTable(
      pageSize,
      pageIndex,
      data
    );

    return new Promise(resolve => {
      setTimeout(
        () => resolve({ data: paginatedResult, totalCount, pageIndex }),
        500
      );
    });
  };

  const TypeChipComponent: React.FC = ({ children }) => {
    if (!children) return <></>;
    return children === 'Automatic' ? (
      <StatusChip
        label={children.toString()}
        color={'success'}
        size={'small'}
      />
    ) : (
      <StatusChip
        label={children.toString()}
        color={'warning'}
        size={'small'}
      />
    );
  };

  const columns: Array<EnhancedDataTableColumn<TestData>> = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'city', label: 'City', sortable: false },
    { accessor: 'age', label: 'Age' },
    { accessor: 'type', label: 'Type', component: TypeChipComponent },
  ];

  return (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Paginatable and sortable table'}
      columns={columns}
      defaultPageSize={5}
      rowsPerPageOptions={[5, 10]}
    />
  );
};

export const Selectable = () => {
  interface TestData {
    city: string;
    age?: number;
    name: string;
    type: string;
  }

  const fetchData: EnhancedDataTableFetchData<TestData> = ({
    pageSize = 10,
    pageIndex = 0,
    order,
    orderBy,
  }) => {
    let data: TestData[] = [
      {
        city: 'Hamburg',
        age: 35,
        name: 'Kane David',
        type: 'Automatic',
      },
      {
        city: 'Göteborg',
        age: 23,
        name: 'Mullins Clemons',
        type: 'Manual',
      },
    ];

    // import {sortTable} from 'utils/tableUtils'
    data = sortTable(data, orderBy, order);

    // import {paginateTable} from 'utils/tableUtils'
    const { paginatedResult, totalCount } = paginateTable(
      pageSize,
      pageIndex,
      data
    );

    return new Promise(resolve => {
      setTimeout(
        () => resolve({ data: paginatedResult, totalCount, pageIndex }),
        500
      );
    });
  };

  const columns: Array<EnhancedDataTableColumn<TestData>> = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'city', label: 'City' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'type', label: 'Type' },
  ];

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

  return (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Table with selectable rows'}
      columns={columns}
      selectionActions={selectionActions}
    />
  );
};

export const Clickable = () => {
  interface TestData {
    city: string;
    age?: number;
    name: string;
    type: string;
  }

  const fetchData: EnhancedDataTableFetchData<TestData> = ({
    pageSize = 10,
    pageIndex = 0,
    order,
    orderBy,
  }) => {
    let data: TestData[] = [
      {
        city: 'Hamburg',
        age: 35,
        name: 'Kane David',
        type: 'Automatic',
      },
      {
        city: 'Göteborg',
        age: 23,
        name: 'Mullins Clemons',
        type: 'Manual',
      },
    ];

    // import {sortTable} from 'utils/tableUtils'
    data = sortTable(data, orderBy, order);

    // import {paginateTable} from 'utils/tableUtils'
    const { paginatedResult, totalCount } = paginateTable(
      pageSize,
      pageIndex,
      data
    );

    return new Promise(resolve => {
      setTimeout(
        () => resolve({ data: paginatedResult, totalCount, pageIndex }),
        500
      );
    });
  };

  const columns: Array<EnhancedDataTableColumn<TestData>> = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'city', label: 'City' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'type', label: 'Type' },
  ];

  const clickAction: RowClickCallback<TestData> = (data: TestData) => {
    console.log(data, 'Clicked row');
  };

  return (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Table with clickable rows'}
      columns={columns}
      onRowClick={clickAction}
    />
  );
};

export const Filterable = () => {
  interface TestData {
    city: string;
    age?: number;
    name: string;
    type: string;
  }

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

  const fetchData: EnhancedDataTableFetchData<TestData> = ({
    pageSize = 10,
    pageIndex = 0,
    filters,
    order,
    orderBy,
  }) => {
    let data: TestData[] = [
      {
        city: 'Hamburg',
        age: 35,
        name: 'Kane David',
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

    // import {sortTable} from 'utils/tableUtils'
    data = sortTable(data, orderBy, order);

    // import {paginateTable} from 'utils/tableUtils'
    const { paginatedResult, totalCount } = paginateTable(
      pageSize,
      pageIndex,
      data
    );

    return new Promise(resolve => {
      setTimeout(
        () => resolve({ data: paginatedResult, totalCount, pageIndex }),
        500
      );
    });
  };

  const columns: Array<EnhancedDataTableColumn<TestData>> = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'city', label: 'City' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'type', label: 'Type' },
  ];
  return (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Filterable table'}
      columns={columns}
      filters={filters}
    />
  );
};

export const AllFunctionalities = () => {
  interface TestData {
    city: string;
    age?: number;
    name: string;
    type: string;
  }

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

  const fetchData: EnhancedDataTableFetchData<TestData> = ({
    pageSize = 10,
    pageIndex = 0,
    filters,
    order,
    orderBy,
  }) => {
    let data: TestData[] = [
      {
        city: 'Hamburg',
        age: 35,
        name: 'Kane David',
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

    // import {sortTable} from 'utils/tableUtils'
    data = sortTable(data, orderBy, order);

    // import {paginateTable} from 'utils/tableUtils'
    const { paginatedResult, totalCount } = paginateTable(
      pageSize,
      pageIndex,
      data
    );

    return new Promise(resolve => {
      setTimeout(
        () => resolve({ data: paginatedResult, totalCount, pageIndex }),
        500
      );
    });
  };

  const TypeChipComponent: React.FC = ({ children }) => {
    if (!children) return <></>;
    return children === 'Automatic' ? (
      <StatusChip
        label={children.toString()}
        color={'success'}
        size={'small'}
      />
    ) : (
      <StatusChip
        label={children.toString()}
        color={'warning'}
        size={'small'}
      />
    );
  };

  const columns: Array<EnhancedDataTableColumn<TestData>> = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'city', label: 'City', sortable: false },
    { accessor: 'age', label: 'Age' },
    { accessor: 'type', label: 'Type', component: TypeChipComponent },
  ];

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

  return (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Table with all functionalities'}
      columns={columns}
      selectionActions={selectionActions}
      filters={filters}
      onRowClick={clickAction}
    />
  );
};
