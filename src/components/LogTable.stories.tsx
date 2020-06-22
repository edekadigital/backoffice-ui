import * as React from 'react';
import { LogTable } from './LogTable';
import { FormFieldSet } from '..';

export default {
  title: 'Components|LogTable',
  component: LogTable,
};

export const Default = () => {
  const tableHeadCells = ['Column A', 'Column B', 'Column C'];
  const tableBodyCells = [
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
  ];

  return (
    <FormFieldSet title="Protocol">
      <LogTable columns={tableHeadCells} rows={tableBodyCells} />
    </FormFieldSet>
  );
};
