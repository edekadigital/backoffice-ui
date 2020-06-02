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
import { Add } from '../../icons';
import { Heading } from '../../typography/Heading';
import { LIGHT_GREY } from '../../constants/colors';
import { Button } from '../Button';
import { TextField } from '../TextField';

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
  })
);

export const EnhancedDataTableToolbar = (
  props: EnhancedDataTableToolbarProps
) => {
  const { filters, activeFilters, setActiveFilters, headline } = props;

  const classes = useToolbarStyles();

  const [selectedFilter, setSelectedFilter] = React.useState<Filter | null>();
  const [filterValue, setFilterValue] = React.useState<string | undefined>();

  const [
    popoverAnchorEl,
    setPopoverAnchorEl,
  ] = React.useState<HTMLDivElement | null>(null);

  const isPopoverOpened = Boolean(popoverAnchorEl);

  const handleOpenFilterSelectorClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedFilter(null);
    setFilterValue(undefined);
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
    setFilterValue(event.target.value);
  };

  const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (filterValue) {
      setActiveFilters(
        activeFilters.concat({ ...selectedFilter!, value: filterValue })
      );
      setPopoverAnchorEl(null);
    }
  };

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

  const renderFilterList = filters ? (
    filters.map(filter => (
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
      <Toolbar>{selectedFilter.label}</Toolbar>
      <form onSubmit={handleFilterSubmit}>
        <TextField label="Enthält..." onChange={handleFilterValueChange} />
        <Button variant={'text'} type={'submit'} disabled={!filterValue}>
          Anwenden
        </Button>
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

  return (
    <>
      {renderHeadline}
      <Toolbar className={classes.toolbar}>
        {renderActiveFilters}
        <Chip
          classes={{ outlined: classes.chipOutlined, root: classes.chipRoot }}
          color={'primary'}
          label={'Filter hinzufügen'}
          variant={'outlined'}
          onClick={handleOpenFilterSelectorClick}
          icon={<Add />}
          disabled={!filters || filters?.length < 1}
        />
        <Popover
          open={isPopoverOpened}
          anchorEl={popoverAnchorEl}
          onClose={handleCloseFilterSelectorClick}
          anchorOrigin={popoverAnchorOrigin}
          transformOrigin={popoverTransformOrigin}
        >
          <Paper>{renderPopoverContent}</Paper>
        </Popover>
      </Toolbar>
    </>
  );
};
