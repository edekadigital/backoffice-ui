import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';

import {
  DataTable,
  GetApp,
  Delete,
  Page,
  FetchProps,
  FetchResult,
} from '../..';

interface ImageRenderer {
  value: string;
}

const columns = [
  { accessor: 'name', Header: 'Name' },
  { accessor: 'age', Header: 'Age' },
  {
    accessor: 'picture',
    Header: 'Picture',
    Cell: ({ value }: ImageRenderer) => (
      <Box style={{ display: 'flex', alignItems: 'center', padding: '3px' }}>
        <img src={value} />
      </Box>
    ),
  },
  {
    accessor: 'registered',
    Header: 'Registration Date',
  },
];

function getData({
  pageSize = 10,
  pageIndex = 0,
}: FetchProps): Promise<FetchResult<{}>> {
  const data = [
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 35,
      name: 'Kane David',
      registered: '2015-03-14T04:03:07 -01:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 23,
      name: 'Marianne Lamb',
      registered: '2019-11-22T03:21:57 -01:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 22,
      name: 'Dyer Ortiz',
      registered: '2014-09-12T10:42:20 -02:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 32,
      name: 'Cain Ward',
      registered: '2019-04-19T02:31:51 -02:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 23,
      name: 'Mullins Clemons',
      registered: '2016-12-13T11:07:45 -01:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 37,
      name: 'Williamson William',
      registered: '2014-04-22T06:38:42 -02:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 22,
      name: 'Hinton Weiss',
      registered: '2015-11-28T11:23:05 -01:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 39,
      name: 'Raymond Horne',
      registered: '2017-10-09T09:45:10 -02:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 37,
      name: 'Jannie Knight',
      registered: '2017-09-13T06:27:23 -02:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 21,
      name: 'Hancock Dunlap',
      registered: '2014-06-18T09:54:08 -02:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 32,
      name: 'Florence Hale',
      registered: '2017-01-17T05:19:46 -01:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 24,
      name: 'Inez Mccall',
      registered: '2015-07-13T02:30:29 -02:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 26,
      name: 'Mia Blair',
      registered: '2016-04-16T07:29:09 -02:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 39,
      name: 'Ashley Casey',
      registered: '2016-11-13T02:50:34 -01:00',
    },
    {
      picture: 'https://via.placeholder.com/50/1E90FF/FFFFFF?Text=IMG',
      age: 39,
      name: 'Spence Mathews',
      registered: '2019-12-28T01:32:18 -01:00',
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

storiesOf('Components|DataTable', module).add('default', () => {
  return (
    <DataTable
      columns={columns}
      fetchData={getData}
      pagination={{ labelRowsPerPage: 'Zeilen', rowsPerPageOptions: [5, 10] }}
    />
  );
});

storiesOf('Components|DataTable', module).add('with checkboxes', () => {
  const actions = [
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

  const pagination = {
    labelRowsPerPage: 'Zeilen pro Seite',
    rowsPerPageOptions: [10, 20, 30],
  };

  return (
    <Page paddingBottom={true}>
      <DataTable
        columns={columns}
        fetchData={getData}
        selectionActions={actions}
        pagination={pagination}
      />
    </Page>
  );
});
