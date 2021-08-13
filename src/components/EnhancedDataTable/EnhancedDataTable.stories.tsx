import * as React from 'react';
import {
  EnhancedDataTable,
  EnhancedDataTableColumn,
  Filter,
  RowClickCallback,
  EnhancedDataTableFetchData,
  ActiveFilter,
  RowActionItem,
} from './EnhancedDataTable';
import {
  sortTable,
  paginateTable,
  StatusChip,
  GetApp,
  Delete,
  Subtitle,
  Image,
  Add,
  Edit,
  CloudDownload,
  MoreVert,
} from '../..';
import { EnhancedDataTableSelectionMenuActions } from './EnhancedDataTableSelectionMenu';
import { ToolbarActionItem } from './EnhancedDataTableToolbar';
import { Button } from '../Button';

export default {
  title: 'Components/EnhancedDataTable',
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
    size = 10,
    page = 0,
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
    return new Promise((resolve) => {
      setTimeout(() => resolve(paginateTable(size, page, data)), 500);
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
    size = 10,
    page = 0,
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
    return new Promise((resolve) => {
      setTimeout(() => resolve(paginateTable(size, page, data)), 500);
    });
  };

  const columns: Array<EnhancedDataTableColumn<TestData>> = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'city', label: 'City' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'type', label: 'Type' },
  ];

  const selectionActions: Array<
    EnhancedDataTableSelectionMenuActions<TestData>
  > = [
    {
      icon: GetApp,
      handler: (data) => console.log(data, 'Make api call to get zip file'),
    },
    {
      icon: Delete,
      handler: (data) => {
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
    size = 10,
    page = 0,
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
    return new Promise((resolve) => {
      setTimeout(() => resolve(paginateTable(size, page, data)), 500);
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
      initialValue: 'Manual',
      multiple: true,
    },
    {
      accessor: 'name',
      label: 'Name',
      multiple: true,
    },
    {
      accessor: 'age',
      label: 'Age',
    },
  ];

  const fetchData: EnhancedDataTableFetchData<TestData> = ({
    size = 10,
    page = 0,
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
      const groupedFilters = filters.reduce(
        (entryMap, filter) =>
          entryMap.set(filter.accessor, [
            ...(entryMap.get(filter.accessor) || []),
            filter,
          ]),
        new Map<string, ActiveFilter<TestData>[]>()
      );
      groupedFilters.forEach((element, key) => {
        const auxData = new Map<string, TestData>();
        const filterValues = element.map((filter) => filter.value);
        data.forEach((item) => {
          filterValues.forEach((filterValue) => {
            const itemValue = item[key as keyof typeof item]?.toString();
            if (itemValue?.includes(filterValue)) {
              auxData.set(JSON.stringify(item), item);
            }
          });
        });
        data = Array.from(auxData.values());
      });
    }

    // import {sortTable} from 'utils/tableUtils'
    data = sortTable(data, orderBy, order);

    // import {paginateTable} from 'utils/tableUtils'
    return new Promise((resolve) => {
      setTimeout(() => resolve(paginateTable(size, page, data)), 500);
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

export const WithAlternativeBody = () => {
  const [activeFilters, setActiveFilters] = React.useState<
    Array<ActiveFilter<TestData>> | undefined
  >();
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
    size = 10,
    page = 0,
    filters,
    order,
    orderBy,
  }) => {
    setActiveFilters(filters);
    if (!filters) {
      return new Promise((resolve) => {
        resolve({ data: [], totalCount: 0, page: 0 });
      });
    }
    let data: TestData[] = [
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
      data = data.filter((item) =>
        filters.every((filter) =>
          item[filter.accessor as keyof typeof item]
            ?.toString()
            .includes(filter.value)
        )
      );
    }

    // import {sortTable} from 'utils/tableUtils'
    data = sortTable(data, orderBy, order);

    // import {paginateTable} from 'utils/tableUtils'
    return new Promise((resolve) => {
      setTimeout(() => resolve(paginateTable(size, page, data)), 500);
    });
  };

  const columns: Array<EnhancedDataTableColumn<TestData>> = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'city', label: 'City' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'type', label: 'Type' },
  ];

  const alternativeTableBody = React.useMemo(
    () =>
      !!activeFilters && activeFilters.length < 1 ? (
        <>
          <Subtitle gutterBottom={true} color={'textSecondary'}>
            No active filter has been set
          </Subtitle>
          <Image
            src="https://via.placeholder.com/150"
            alt="placeholder"
            mode={'height'}
          />
        </>
      ) : undefined,
    [activeFilters]
  );

  return (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Table with minumum one active filter required'}
      columns={columns}
      filters={filters}
      alternativeTableBody={alternativeTableBody}
    />
  );
};

export const WithCustomEmptyResultDisplay = () => {
  interface TestData {
    city: string;
    age?: number;
    name: string;
    type: string;
  }

  const fetchData: EnhancedDataTableFetchData<TestData> = ({
    size = 10,
    page = 0,
    order,
    orderBy,
  }) => {
    let data: TestData[] = [];

    // import {sortTable} from 'utils/tableUtils'
    data = sortTable(data, orderBy, order);

    // import {paginateTable} from 'utils/tableUtils'
    return new Promise((resolve) => {
      setTimeout(() => resolve(paginateTable(size, page, data)), 500);
    });
  };

  const columns: Array<EnhancedDataTableColumn<TestData>> = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'city', label: 'City' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'type', label: 'Type' },
  ];

  const nullResult = (
    <>
      <Button color="primary">Add new items</Button>
      <Subtitle gutterBottom={true} color={'textSecondary'}>
        No items found
      </Subtitle>
      <Image
        src="https://via.placeholder.com/150"
        alt="placeholder"
        mode={'height'}
      />
    </>
  );

  return (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Table with minumum one active filter required'}
      columns={columns}
      customNullResult={nullResult}
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
      initialValue: 'Manual',
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
    size = 10,
    page = 0,
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
      data = data.filter((item) =>
        filters.every((filter) =>
          item[filter.accessor as keyof typeof item]
            ?.toString()
            .includes(filter.value)
        )
      );
    }

    // import {sortTable} from 'utils/tableUtils'
    data = sortTable(data, orderBy, order);

    // import {paginateTable} from 'utils/tableUtils'
    return new Promise((resolve) => {
      setTimeout(() => resolve(paginateTable(size, page, data)), 500);
    });
  };

  const TypeChipComponent: React.FC<{ row: TestData }> = (props) => {
    if (!props.children) return <></>;
    return props.children === 'Automatic' ? (
      <StatusChip
        label={props.children.toString()}
        color={'success'}
        size={'small'}
      />
    ) : (
      <StatusChip
        label={`${props.children.toString()} - ${props.row.city}`}
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

  const selectionActions: Array<
    EnhancedDataTableSelectionMenuActions<TestData>
  > = [
    {
      icon: GetApp,
      handler: (data) => console.log(data, 'Make api call to get zip file'),
    },
    {
      icon: Delete,
      handler: (data) => {
        console.log(data, 'Delete Rows');
      },
    },
  ];

  const clickAction: RowClickCallback<TestData> = (data: TestData) => {
    console.log(data, 'Clicked row');
  };

  const toolbarActions: Array<ToolbarActionItem> = [
    {
      icon: Add,
      label: 'Outlined Button',
      handler: (data) => console.log(data, 'Outlined Button is called'),
    },
  ];

  return (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Table with all functionalities'}
      columns={columns}
      selectionActions={selectionActions}
      filters={filters}
      onRowClick={clickAction}
      toolbarActions={toolbarActions}
    />
  );
};

export const WithToolbarActions = () => {
  interface TestData {
    city: string;
    age?: number;
    name: string;
    type: string;
  }

  const fetchData: EnhancedDataTableFetchData<TestData> = ({
    size = 10,
    page = 0,
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
    return new Promise((resolve) => {
      setTimeout(() => resolve(paginateTable(size, page, data)), 500);
    });
  };

  const columns: Array<EnhancedDataTableColumn<TestData>> = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'city', label: 'City' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'type', label: 'Type' },
  ];

  const selectionActions: Array<
    EnhancedDataTableSelectionMenuActions<TestData>
  > = [
    {
      icon: GetApp,
      handler: (data) => console.log(data, 'Make api call to get zip file'),
    },
    {
      icon: Delete,
      handler: (data) => {
        console.log(data, 'Delete Rows');
      },
    },
  ];

  const toolbarActions: Array<ToolbarActionItem> = [
    {
      icon: Add,
      label: 'Some Action 1',
      handler: (data) => console.log(data, 'Some Action 1 is called'),
    },
    {
      icon: Add,
      disabled: true,
      label: 'Some Action 2',
      handler: (data) => console.log(data, 'Some Action 2 is called'),
    },
    {
      type: 'list',
      icon: MoreVert,
      label: 'More',
      items: [
        {
          icon: Add,
          label: 'Sub Action 1',
          handler: (data) => console.log(data, 'Sub Action 1 is called'),
        },
        {
          icon: Add,
          label: 'Sub Action 2',
          disabled: true,
          handler: (data) => console.log(data, 'Sub Action 2 is called'),
        },
      ],
    },
  ];

  const filters: Array<Filter<TestData>> = [
    {
      accessor: 'age',
      label: 'Age',
    },
  ];

  return (
    <EnhancedDataTable
      fetchData={fetchData}
      filters={filters}
      headline={'Table with selectable rows'}
      columns={columns}
      selectionActions={selectionActions}
      toolbarActions={toolbarActions}
      toolbarButtonVariant="text"
      toolbarBackgroundColor="primary"
    />
  );
};

export const WithRowActions = () => {
  interface TestData {
    city: string;
    age?: number;
    name: string;
    type: string;
  }

  const fetchData: EnhancedDataTableFetchData<TestData> = ({
    size = 10,
    page = 0,
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
    return new Promise((resolve) => {
      setTimeout(() => resolve(paginateTable(size, page, data)), 500);
    });
  };

  const columns: Array<EnhancedDataTableColumn<TestData>> = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'city', label: 'City' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'type', label: 'Type' },
  ];

  const selectionActions: Array<
    EnhancedDataTableSelectionMenuActions<TestData>
  > = [
    {
      icon: GetApp,
      handler: (data) => console.log(data, 'Make api call to get zip file'),
    },
    {
      icon: Delete,
      handler: (data) => {
        console.log(data, 'Delete Rows');
      },
    },
  ];

  const rowActions: Array<RowActionItem<TestData>> = [
    {
      icon: Delete,
      handler: (row) => console.log(row, 'Some action is called'),
    },
    {
      icon: Edit,
      handler: (row) => console.log(row, 'Some other action is called'),
    },
  ];

  return (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Table with selectable rows'}
      columns={columns}
      selectionActions={selectionActions}
      rowActions={rowActions}
    />
  );
};

export const WithRowActionsAndClickableWithCustomIcon = () => {
  interface TestData {
    city: string;
    age?: number;
    name: string;
    type: string;
  }

  const fetchData: EnhancedDataTableFetchData<TestData> = ({
    size = 10,
    page = 0,
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
    return new Promise((resolve) => {
      setTimeout(() => resolve(paginateTable(size, page, data)), 500);
    });
  };

  const columns: Array<EnhancedDataTableColumn<TestData>> = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'city', label: 'City' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'type', label: 'Type' },
  ];

  const selectionActions: Array<
    EnhancedDataTableSelectionMenuActions<TestData>
  > = [
    {
      icon: GetApp,
      handler: (data) => console.log(data, 'Make api call to get zip file'),
    },
    {
      icon: Delete,
      handler: (data) => {
        console.log(data, 'Delete Rows');
      },
    },
  ];

  const rowActions: Array<RowActionItem<TestData>> = [
    {
      icon: Delete,
      handler: (row) => console.log(row, 'Some action is called'),
    },
    {
      icon: Edit,
      handler: (row) => console.log(row, 'Some other action is called'),
    },
  ];

  const clickAction: RowClickCallback<TestData> = (data: TestData) => {
    console.log(data, 'Clicked row');
  };

  return (
    <EnhancedDataTable
      fetchData={fetchData}
      headline={'Table with selectable rows'}
      columns={columns}
      selectionActions={selectionActions}
      rowActions={rowActions}
      onRowClick={clickAction}
      rowClickIcon={CloudDownload}
    />
  );
};
