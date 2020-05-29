import * as React from 'react';
import { Paper, createStyles, makeStyles, Theme } from '@material-ui/core';
import { EnhancedDataTableToolbar } from './EnhancedDataTableToolbar';

export interface EnhancedDataTableProps {
  fetchData: () => void;
  headline?: string;
}

export interface ActiveFilter {
  accessor: string;
  label: string;
  value: string;
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
  const { headline } = props;
  const [activeFilters, setActiveFilters] = React.useState<ActiveFilter[] | []>(
    []
  );
  const classes = useStyles();

  const handleActiveFilters = (filters: ActiveFilter[]) => {
    setActiveFilters(filters);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedDataTableToolbar
          setActiveFilters={handleActiveFilters}
          activeFilters={activeFilters}
          headline={headline}
        />
        Table
      </Paper>
    </div>
  );
};
