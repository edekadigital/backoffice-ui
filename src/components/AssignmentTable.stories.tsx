import * as React from 'react';
import { Add } from '../icons';

import { AssignmentTable, AssignmentTableProps } from './AssignmentTable';

export default {
  title: 'Components/AssignmentTable',
  component: AssignmentTable,
};

export const Default = () => {
  type Key =
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

  type TableProps = AssignmentTableProps<Key>;

  const columns = React.useMemo<TableProps['columns']>(
    () => [
      { accessor: 'BB', abbreviation: 'BB', label: 'Brandenburg' },
      { accessor: 'BE', abbreviation: 'BE', label: 'Berlin' },
      { accessor: 'BW', abbreviation: 'BW', label: 'Baden-Württemberg' },
      { accessor: 'BY', abbreviation: 'BY', label: 'Bayern' },
      { accessor: 'HB', abbreviation: 'HB', label: 'Bremen' },
      { accessor: 'HE', abbreviation: 'HE', label: 'Hessen' },
      { accessor: 'HH', abbreviation: 'HH', label: 'Hamburg' },
      {
        accessor: 'MV',
        abbreviation: 'MV',
        label: 'Mecklenburg-Vorpommern',
      },
      { accessor: 'NI', abbreviation: 'NI', label: 'Niedersachsen' },
      { accessor: 'NW', abbreviation: 'NW', label: 'Nordrhein-Westfalen' },
      { accessor: 'RP', abbreviation: 'RP', label: 'Rheinland-Pfalz' },
      { accessor: 'SH', abbreviation: 'SH', label: 'Schleswig-Holstein' },
      { accessor: 'SL', abbreviation: 'SL', label: 'Saarland' },
      { accessor: 'SN', abbreviation: 'SN', label: 'Sachsen' },
      { accessor: 'ST', abbreviation: 'ST', label: 'Sachsen-Anhalt' },
      { accessor: 'TH', abbreviation: 'TH', label: 'Thüringen' },
    ],
    []
  );

  const initialsRows = React.useMemo<TableProps['rows']>(
    () => [
      {
        label: 'Loremipsum',
        values: {
          BB: false,
          BE: false,
          BW: false,
          BY: false,
          HB: false,
          HE: false,
          HH: false,
          MV: false,
          NI: false,
          NW: false,
          RP: false,
          SH: false,
          SL: false,
          SN: false,
          ST: false,
          TH: false,
        },
      },
      {
        label: 'Lorem ipsum dolor',
        values: {
          BB: false,
          BE: false,
          BW: false,
          BY: false,
          HB: false,
          HE: false,
          HH: false,
          MV: false,
          NI: false,
          NW: false,
          RP: false,
          SH: false,
          SL: false,
          SN: false,
          ST: false,
          TH: false,
        },
      },
      {
        label: 'Lorem ipsum dolor 2',
        values: {
          BB: false,
          BE: false,
          BW: false,
          BY: false,
          HB: false,
          HE: false,
          HH: false,
          MV: false,
          NI: false,
          NW: false,
          RP: false,
          SH: false,
          SL: false,
          SN: false,
          ST: false,
          TH: false,
        },
      },
    ],
    []
  );

  const [rows, setRows] = React.useState(initialsRows);

  const handleChange: TableProps['onChange'] = (
    rowIndex,
    accessor,
    newValue
  ) => {
    setRows((prevRows) =>
      prevRows.map((row, index) => {
        let updatedRow = row;
        if (index === rowIndex) {
          updatedRow = { ...row };
          updatedRow.values[accessor] = newValue;
        }
        return updatedRow;
      })
    );
  };

  return (
    <AssignmentTable
      columns={columns}
      rows={rows}
      onChange={handleChange}
      headline="Lorem ipsum dolor"
      actions={[
        {
          icon: Add,
          label: 'Some Action',
          handler: () => console.log('Some Action is called'),
        },
      ]}
    />
  );
};
