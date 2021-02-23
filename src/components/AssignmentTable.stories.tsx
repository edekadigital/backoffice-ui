import * as React from 'react';

import { AssignmentTable, AssignmentTableProps } from './AssignmentTable';

export default {
  title: 'Components/AssignmentTable',
  component: AssignmentTable,
};

/*
{ accessor: 'BB', label: 'Brandenburg', sortable: false },
    { accessor: 'BE', label: 'Berlin', sortable: false },
    { accessor: 'BW', label: 'Baden-Württemberg', sortable: false },
    { accessor: 'BY', label: 'Bayern', sortable: false },
    { accessor: 'HB', label: 'Bremen', sortable: false },
    { accessor: 'HE', label: 'Hessen', sortable: false },
    { accessor: 'HH', label: 'Hamburg', sortable: false },
    { accessor: 'MV', label: 'Mecklenburg-Vorpommern', sortable: false },
    { accessor: 'NI', label: 'Niedersachsen', sortable: false },
    { accessor: 'NW', label: 'Nordrhein-Westfalen', sortable: false },
    { accessor: 'RP', label: 'Rheinland-Pfalz', sortable: false },
    { accessor: 'SH', label: 'Schleswig-Holstein', sortable: false },
    { accessor: 'SL', label: 'Saarland', sortable: false },
    { accessor: 'SN', label: 'Sachsen', sortable: false },
    { accessor: 'ST', label: 'Sachsen-Anhalt', sortable: false },
    { accessor: 'TH', label: 'Thüringen', sortable: false },
    */

export const Default = () => {
  type State =
    | 'BB'
    | 'BE'
    | 'BW'
    | 'BY'
    | 'HB'
    | 'HE'
    | 'HH'
    | 'MV'
    | 'NI'
    | 'NW'
    | 'RP'
    | 'SH'
    | 'SL'
    | 'SN'
    | 'ST'
    | 'TH';

  type Data = Record<State, boolean>;

  const columns: AssignmentTableProps<Data>['columns'] = [
    { accessor: 'BB' },
    { accessor: 'BE' },
    { accessor: 'BW' },
    { accessor: 'BY' },
    { accessor: 'HB' },
    { accessor: 'HE' },
    { accessor: 'HH' },
    { accessor: 'MV' },
    { accessor: 'NI' },
    { accessor: 'NW' },
    { accessor: 'RP' },
    { accessor: 'SH' },
    { accessor: 'SL' },
    { accessor: 'SN' },
    { accessor: 'ST' },
    { accessor: 'TH' },
  ];

  return <AssignmentTable columns={columns} rows={[]} />;
};
