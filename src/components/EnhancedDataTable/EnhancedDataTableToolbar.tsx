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
} from '@material-ui/core';
import { ActiveFilter } from './EnhancedDataTable';
import { Add } from '../../icons';
import { Heading } from '../../typography/Heading';
import { LIGHT_GREY } from '../../constants/colors';
import { Button } from '../Button';

export interface EnhancedDataTableToolbarProps {
  activeFilters: ActiveFilter[];
  setActiveFilters: (filters: ActiveFilter[]) => void;
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
  const { activeFilters, setActiveFilters, headline } = props;
  const [
    popoverAnchorEl,
    setPopoverAnchorEl,
  ] = React.useState<HTMLDivElement | null>(null);
  const classes = useToolbarStyles();

  const handleOpenFilterSelectorClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleCloseFilterSelectorClick = () => {
    setPopoverAnchorEl(null);
  };

  const open = Boolean(popoverAnchorEl);

  const handleDeleteFilter = (filter: ActiveFilter) => () => {
    const newActiveFilters = activeFilters.filter(
      activeFilter => activeFilter !== filter
    );
    setActiveFilters(newActiveFilters as ActiveFilter[] | []);
  };

  const handleAddFilter = () => {
    // TODO: Delete dummy
    const dummyFilterToAdd = {
      accessor: 'team' + activeFilters.length,
      value: 'HSV',
      label: 'Team' + activeFilters.length,
    };
    setPopoverAnchorEl(null);
    setActiveFilters(activeFilters.concat(dummyFilterToAdd));
  };

  const renderFilter = React.useMemo(() => {
    return activeFilters ? (
      activeFilters.map((filter: ActiveFilter) => (
        <Chip
          classes={{ root: classes.chipRoot }}
          key={filter.accessor}
          color={'primary'}
          label={`${filter.label}: "${filter.value}"`}
          onDelete={handleDeleteFilter(filter)}
          onClick={handleDeleteFilter(filter)}
        />
      ))
    ) : (
      <></>
    );
  }, [activeFilters]);

  const renderHeadline = headline ? (
    <Toolbar className={classes.toolbar}>
      <Heading variant={'h5'}>{headline}</Heading>
    </Toolbar>
  ) : (
    <></>
  );

  const popoverAnchorOrigin: PopoverOrigin = {
    vertical: 'top',
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
        {renderFilter}
        <Chip
          classes={{ outlined: classes.chipOutlined, root: classes.chipRoot }}
          color={'primary'}
          label={'Filter hinzufügen'}
          variant={'outlined'}
          onClick={handleOpenFilterSelectorClick}
          icon={<Add />}
        />
        <Popover
          open={open}
          anchorEl={popoverAnchorEl}
          onClose={handleCloseFilterSelectorClick}
          anchorOrigin={popoverAnchorOrigin}
          transformOrigin={popoverTransformOrigin}
        >
          <Paper>
            <Toolbar>Lorem</Toolbar>
            <Button onClick={handleAddFilter}>Anwenden</Button>
          </Paper>
        </Popover>
      </Toolbar>
    </>
  );
};
