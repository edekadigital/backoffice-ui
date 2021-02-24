import * as React from 'react';
import { Add } from '../icons';

import { AssignmentTable } from './AssignmentTable';

export default {
  title: 'Components/AssignmentTable',
  component: AssignmentTable,
};

export const Default = () => {
  const columns = React.useMemo(
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

  const initialsRows = React.useMemo(
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
    ],
    []
  );

  const [rows, setRows] = React.useState(initialsRows);

  const handleChange = (
    rowIndex: number,
    accessor: string,
    newValue: boolean
  ) => {
    setRows((prevRows) =>
      prevRows.map((row, index) => {
        let updatedRow = row;
        if (index === rowIndex && accessor in updatedRow.values) {
          updatedRow = { ...row };
          // TODO improve types
          (updatedRow.values as Record<string, boolean>)[accessor] = newValue;
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
