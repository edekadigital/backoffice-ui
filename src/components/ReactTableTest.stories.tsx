import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { useTable, Column } from 'react-table';

interface FetchProps {
  // TODO pageSize
  // TODO pageIndex
}

interface FetchResult<D extends object> {
  data: D[];
}

interface TestTableProps<D extends object> {
  columns: Array<Column<D>>;
  fetchData: (fetchProps: FetchProps) => Promise<FetchResult<D>>;
}

function TestTable<D extends object>(props: TestTableProps<D>) {
  const { columns, fetchData } = props;
  const [data, setData] = React.useState<D[]>([]);
  const { headerGroups, rows, prepareRow } = useTable<D>({ columns, data });

  React.useEffect(() => {
    fetchData({}).then(result => {
      setData(result.data);
    });
  }, [fetchData]);

  const renderedTableHeader = headerGroups.map(
    (tempHeaderGroup, headerGroupIndex) => {
      const renderedHeaderColumns = tempHeaderGroup.headers.map(
        (tempHeaderColumn, headerColumn) => (
          <th key={`header-${headerGroupIndex}-${headerColumn}`}>
            {tempHeaderColumn.render('Header')}
          </th>
        )
      );
      return (
        <tr key={`header-${headerGroupIndex}`}>{renderedHeaderColumns}</tr>
      );
    }
  );

  const renderedTableRows = rows.map((tempRow, rowIndex) => {
    prepareRow(tempRow);

    const renderedRows = tempRow.cells.map((tempCell, cellIndex) => {
      return (
        <td key={`cell-${rowIndex}-${cellIndex}`}>{tempCell.render('Cell')}</td>
      );
    });

    return <tr key={`row-${rowIndex}`}>{renderedRows}</tr>;
  });

  return (
    <table>
      <thead>{renderedTableHeader}</thead>
      <tbody>{renderedTableRows}</tbody>
    </table>
  );
}

/**
 * Usage
 */
storiesOf('Test|React Table', module).add(
  'React Table with TypeScript example',
  () => {
    interface Data {
      id: number;
      label: string;
    }

    const tableProps: TestTableProps<Data> = {
      columns: [
        {
          accessor: 'id',
          Header: 'Identifier',
        },
        {
          accessor: 'label',
          Header: 'Bezeichnung',
        },
      ],
      fetchData: () =>
        new Promise(resolve => {
          setTimeout(
            () =>
              resolve({
                data: [
                  { id: 1, label: 'Lorem' },
                  { id: 2, label: 'Ipsum' },
                ],
              }),
            500
          );
        }),
    };

    return <TestTable {...tableProps} />;
  }
);
