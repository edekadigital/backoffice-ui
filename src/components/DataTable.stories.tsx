import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { DataTable } from '..';

const columns = [
  { accessor: 'name', Header: 'Name' },
  { accessor: 'age', Header: 'Age' },
  {
    accessor: 'picture',
    Header: 'Picture',
    Cell: () => <img src="" />,
  },
  {
    accessor: 'registered',
    Header: 'Registration Date',
  },
];

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

storiesOf('Components|DataTable', module).add('default', () => {
  return <DataTable headline="This is a table" data={data} columns={columns} />;
});

storiesOf('Components|DataTable', module).add('with checkboxes', () => {
  return (
    <DataTable
      headline="This is a table"
      data={data}
      columns={columns}
      showCheckbox={true}
    />
  );
});
