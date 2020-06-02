import * as React from 'react';
import { Paper, createStyles, makeStyles, Theme } from '@material-ui/core';
import { EnhancedDataTableToolbar } from './EnhancedDataTableToolbar';

export interface EnhancedDataTableColumn {
  accessor: string;
  label: string;
  filterable?: boolean;
  sortable?: boolean;
}
export interface EnhancedDataTableProps {
  fetchData: () => void;
  headline?: string;
  columns: EnhancedDataTableColumn[];
}

export interface Filter
  extends Pick<EnhancedDataTableColumn, 'accessor' | 'label'> {}

export interface ActiveFilter extends Filter {
  value?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  })
);

export const EnhancedDataTable = (props: EnhancedDataTableProps) => {
  const { headline, columns } = props;
  const [activeFilters, setActiveFilters] = React.useState<ActiveFilter[] | []>(
    []
  );
  const classes = useStyles();

  const handleActiveFilters = (filters: ActiveFilter[]) => {
    setActiveFilters(filters);
  };

  const filterableColumns: Filter[] | null = React.useMemo(() => {
    const foundFilterableColumns = columns.filter(column => column.filterable);
    if (foundFilterableColumns.length < 1) return null;
    return foundFilterableColumns
      .filter(
        filter =>
          activeFilters.filter(
            activeFilter => activeFilter.accessor === filter.accessor
          ).length < 1
      )
      .map(item => ({ accessor: item.accessor, label: item.label }));
  }, [activeFilters, columns]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedDataTableToolbar
          filters={filterableColumns}
          setActiveFilters={handleActiveFilters}
          activeFilters={activeFilters}
          headline={headline}
        />
        Table
      </Paper>
    </div>
  );
};
