import * as React from 'react';
import {
  Toolbar,
  makeStyles,
  Theme,
  createStyles,
  Chip,
  Popover,
  PopoverOrigin,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { ActiveFilter, Filter } from './EnhancedDataTable';
import { Add, Close } from '../../icons';
import { Heading } from '../../typography/Heading';
import { LIGHT_GREY, WHITE, PRIMARY } from '../../constants/colors';
import { Button } from '../Button';
import { TextField } from '../TextField';
import clsx from 'clsx';
import { IconButton } from '../IconButton';

export interface EnhancedDataTableToolbarProps {
  activeFilters: ActiveFilter[];
  setActiveFilters: (filters: ActiveFilter[]) => void;
  filters?: Filter[];
  headline?: string;
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      borderBottom: `solid 1px ${LIGHT_GREY}`,
    },
    chipRoot: {
      marginLeft: theme.spacing(2),
      '&:first-child': {
        marginLeft: 0,
      },
    },
    chipOutlined: {
      borderStyle: 'dashed',
    },
    popoverPaper: {
      minWidth: 250,
    },
    popoverFormPaper: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      '& > button': {
        marginTop: theme.spacing(2),
        marginLeft: 'auto',
        display: 'block',
      },
    },
    filterTitleToolbar: {
      color: `${WHITE}`,
      background: `${PRIMARY}`,
      fontSize: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      flexGrow: 1,
    },
    filterTitleToolbarLabel: {
      flexGrow: 1,
    },
    gutterTop: {
      marginTop: theme.spacing(1),
    },
    negativeMarginTop: {
      marginTop: -theme.spacing(1),
    },
  })
);

export const EnhancedDataTableToolbar = (
  props: EnhancedDataTableToolbarProps
) => {
  const { filters, activeFilters, setActiveFilters, headline } = props;

  const classes = useToolbarStyles();

  const [selectableFilters, setSelectableFilters] = React.useState<
    Filter[] | undefined
  >(filters);
  const [selectedFilter, setSelectedFilter] = React.useState<
    ActiveFilter | undefined
  >();

  const [
    popoverAnchorEl,
    setPopoverAnchorEl,
  ] = React.useState<HTMLDivElement | null>(null);

  const isPopoverOpened = Boolean(popoverAnchorEl);

  const handleOpenFilterSelectorClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedFilter(undefined);
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleCloseFilterSelectorClick = () => {
    setPopoverAnchorEl(null);
  };

  const handleDeleteFilterClick = (filter: ActiveFilter) => () => {
    const newActiveFilters = activeFilters.filter(
      activeFilter => activeFilter !== filter
    );
    setActiveFilters(newActiveFilters as ActiveFilter[] | []);
  };

  const handleFilterSelectClick = (selectedFilter: Filter) => {
    setSelectedFilter(selectedFilter);
  };

  const handleFilterValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFilter({ ...selectedFilter!, value: event.target.value });
  };

  const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFilter) {
      setActiveFilters(activeFilters.concat(selectedFilter));
      setPopoverAnchorEl(null);
    }
  };

  React.useEffect(() => {
    if (filters) {
      setSelectableFilters(
        filters
          .filter(
            filter =>
              activeFilters.filter(
                activeFilter => activeFilter.accessor === filter.accessor
              ).length < 1
          )
          .map(item => ({ accessor: item.accessor, label: item.label }))
      );
    }
  }, [activeFilters, filters]);

  const renderHeadline = headline ? (
    <Toolbar className={classes.toolbar}>
      <Heading variant={'h5'}>{headline}</Heading>
    </Toolbar>
  ) : (
    <></>
  );

  const renderActiveFilters = React.useMemo(() => {
    return activeFilters ? (
      activeFilters.map((filter: ActiveFilter) => (
        <Chip
          classes={{ root: classes.chipRoot }}
          key={filter.accessor}
          color={'primary'}
          label={`${filter.label}: "${filter.value}"`}
          onDelete={handleDeleteFilterClick(filter)}
          onClick={handleDeleteFilterClick(filter)}
        />
      ))
    ) : (
      <></>
    );
  }, [activeFilters]);

  const renderFilterList = selectableFilters ? (
    selectableFilters.map(filter => (
      <ListItem
        key={filter.accessor}
        button={true}
        onClick={() => handleFilterSelectClick(filter)}
      >
        <ListItemText primary={filter.label} />
      </ListItem>
    ))
  ) : (
    <></>
  );

  const renderPopoverContent = selectedFilter ? (
    <>
      <Toolbar
        classes={{ root: classes.filterTitleToolbar }}
        variant={'dense'}
        disableGutters={true}
      >
        <div className={classes.filterTitleToolbarLabel}>
          {selectedFilter.label}
        </div>
        <IconButton
          icon={Close}
          color={'inherit'}
          onClick={handleCloseFilterSelectorClick}
        />
      </Toolbar>
      <form onSubmit={handleFilterSubmit}>
        <Paper className={classes.popoverFormPaper}>
          <TextField label="Enthält..." onChange={handleFilterValueChange} />
          <Button
            variant={'text'}
            type={'submit'}
            disabled={!selectedFilter.value}
          >
            Anwenden
          </Button>
        </Paper>
      </form>
    </>
  ) : (
    <List>{renderFilterList}</List>
  );

  const popoverAnchorOrigin: PopoverOrigin = {
    vertical: selectedFilter ? 'top' : 'bottom',
    horizontal: 'left',
  };

  const popoverTransformOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'left',
  };

  const classNamePopoverpaper = clsx(classes.popoverPaper, {
    [classes.gutterTop]: !selectedFilter,
    [classes.negativeMarginTop]: selectedFilter,
  });

  const renderFilterBar = filters ? (
    <Toolbar className={classes.toolbar}>
      {renderActiveFilters}
      <Chip
        classes={{ outlined: classes.chipOutlined, root: classes.chipRoot }}
        color={'primary'}
        label={'Filter hinzufügen'}
        variant={'outlined'}
        onClick={handleOpenFilterSelectorClick}
        icon={<Add />}
        disabled={!selectableFilters || selectableFilters?.length < 1}
      />
      <Popover
        open={isPopoverOpened}
        anchorEl={popoverAnchorEl}
        onClose={handleCloseFilterSelectorClick}
        anchorOrigin={popoverAnchorOrigin}
        transformOrigin={popoverTransformOrigin}
        classes={{ paper: classNamePopoverpaper }}
      >
        {renderPopoverContent}
      </Popover>
    </Toolbar>
  ) : (
    <></>
  );

  return (
    <>
      {renderHeadline}
      {renderFilterBar}
    </>
  );
};
