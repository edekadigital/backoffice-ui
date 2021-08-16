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
  MenuItem,
  SvgIconProps,
} from '@material-ui/core';
import { ActiveFilter, Filter } from './EnhancedDataTable';
import { Add, Close } from '../../icons';
import { Heading } from '../../typography/Heading';
import { Button, ButtonVariant } from '../Button';
import { TextField } from '../TextField';
import clsx from 'clsx';
import { IconButton } from '../IconButton';
import { ListMenu, ListMenuItem } from '../ListMenu';

export interface EnhancedDataTableToolbarProps<D> {
  activeFilters: Array<ActiveFilter<D>>;
  buttonVariant?: ButtonVariant;
  setActiveFilters: (filters: Array<ActiveFilter<D>>) => void;
  filters?: Array<Filter<D>>;
  headline?: string;
  showResetToolbarFilters: boolean;
  toolbarActions?: Array<ToolbarActionItem | ToolbarActionListItem>;
  toolbarBackgroundColor: 'default' | 'primary';
}

export type ToolbarActionItem = {
  type?: 'item';
  label: string;
  disabled?: boolean;
  icon?: React.ElementType<SvgIconProps>;
  handler: React.MouseEventHandler<HTMLElement>;
};

export type ToolbarActionListItem = {
  type: 'list';
  label: string;
  icon?: React.ElementType<SvgIconProps>;
  items: ToolbarActionItem[];
};

export function EnhancedDataTableToolbar<D>(
  props: EnhancedDataTableToolbarProps<D>
) {
  const {
    filters,
    activeFilters,
    buttonVariant,
    setActiveFilters,
    headline,
    toolbarActions,
    toolbarBackgroundColor,
    showResetToolbarFilters,
  } = props;

  const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
      toolbar: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        overflow: 'hidden',
        borderBottom: `solid 1px ${theme.palette.grey[300]}`,
        paddingLeft: theme.spacing(2),
      },
      titleToolbar: {
        backgroundColor:
          toolbarBackgroundColor === 'default'
            ? undefined
            : theme.palette.primary.light,
      },
      filterToolbar: {
        marginLeft: -theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
      chipRoot: {
        margin: theme.spacing(1),
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
        color: `${theme.palette.primary.contrastText}`,
        background: `${theme.palette.primary.main}`,
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
      actions: {
        marginLeft: buttonVariant === 'text' ? '10px' : 'auto',
      },
      resetFilter: {
        position: 'absolute',
        right: '8px',
      },
    })
  );
  const classes = useToolbarStyles();

  const [selectableFilters, setSelectableFilters] = React.useState<
    Array<Filter<D>> | undefined
  >(filters);
  const [selectedFilter, setSelectedFilter] = React.useState<
    ActiveFilter<D> | undefined
  >();

  const [
    popoverAnchorEl,
    setPopoverAnchorEl,
  ] = React.useState<HTMLDivElement | null>(null);

  const isPopoverOpened = Boolean(popoverAnchorEl);

  const handleOpenFilterSelectorClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!selectableFilters || selectableFilters.length < 1) return;
    setSelectedFilter(undefined);
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleCloseFilterSelectorClick = () => {
    setPopoverAnchorEl(null);
  };

  const handleDeleteFilterClick = React.useCallback(
    (filter: ActiveFilter<D>) => () => {
      const newActiveFilters = activeFilters.filter(
        (activeFilter) => activeFilter !== filter
      );
      setActiveFilters(newActiveFilters as Array<ActiveFilter<D>> | []);
    },
    [activeFilters, setActiveFilters]
  );

  const handleResetFilterClick = () => {
    setActiveFilters([]);
  };

  const handleFilterSelectClick = (selectedFilter: Filter<D>) => {
    setSelectedFilter(selectedFilter as ActiveFilter<D>);
  };

  const handleFilterValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFilter({ ...selectedFilter!, value: event.target.value });
  };

  const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (selectedFilter?.accessor && selectedFilter?.value) {
      setActiveFilters(activeFilters.concat(selectedFilter));
      setPopoverAnchorEl(null);
    }
  };

  React.useEffect(() => {
    if (filters) {
      setSelectableFilters(
        filters
          .filter(
            (filter) =>
              activeFilters.filter(
                (activeFilter) =>
                  activeFilter.accessor === filter.accessor &&
                  !!activeFilter.multiple === false
              ).length < 1
          )
          .map((item) => ({
            accessor: item.accessor,
            label: item.label,
            selectorValues: item.selectorValues,
            multiple: item.multiple,
          }))
      );
    }
  }, [activeFilters, filters]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openedMenuIndex, setOpenedMenuIndex] = React.useState<number>(0);

  const renderToolbarActions = toolbarActions ? (
    <div
      className={classes.actions}
      data-testid={'enhancedDataTable-filterBar-actions'}
    >
      {toolbarActions.map((action, index) => {
        if (action.type === 'list') {
          return (
            <React.Fragment key={`toolbar-action-${index}`}>
              <Button
                variant={buttonVariant}
                color={'primary'}
                icon={action.icon}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  setOpenedMenuIndex(index);
                  setAnchorEl(event.currentTarget);
                }}
                data-testid={`enhancedDataTable-filterBar-actions-${index}`}
              >
                {action.label}
              </Button>
              <ListMenu
                anchorEl={anchorEl}
                items={(action.items as unknown) as ListMenuItem[]}
                onClose={() => setAnchorEl(null)}
                open={!!anchorEl && openedMenuIndex === index}
              />
            </React.Fragment>
          );
        }

        return (
          <Button
            disabled={action.disabled ?? false}
            variant={buttonVariant}
            color={'primary'}
            icon={action.icon}
            onClick={action.handler}
            key={`toolbar-action-${index}`}
            data-testid={`enhancedDataTable-filterBar-actions-${index}`}
          >
            {action.label}
          </Button>
        );
      })}
    </div>
  ) : (
    <></>
  );

  const renderHeadline = headline ? (
    <Heading
      variant={'h6'}
      data-testid={'enhancedDataTable-filterBar-headline'}
    >
      {headline}
    </Heading>
  ) : (
    <></>
  );

  const renderToolbar =
    headline || toolbarActions ? (
      <Toolbar className={clsx(classes.toolbar, classes.titleToolbar)}>
        {renderHeadline}
        {renderToolbarActions}
      </Toolbar>
    ) : (
      <></>
    );

  const renderActiveFilters = React.useMemo(() => {
    return activeFilters ? (
      activeFilters.map((filter: ActiveFilter<D>, index: number) => (
        <Chip
          classes={{ root: classes.chipRoot }}
          key={`${filter.accessor}-${index}` as React.Key}
          color={'primary'}
          label={`${filter.label}: "${filter.value}"`}
          onDelete={handleDeleteFilterClick(filter)}
          onClick={handleDeleteFilterClick(filter)}
          data-testid={`enhancedDataTable-activeFilter-${index}`}
        />
      ))
    ) : (
      <></>
    );
  }, [activeFilters, classes.chipRoot, handleDeleteFilterClick]);

  const renderResetActiveFilters = React.useMemo(() => {
    return showResetToolbarFilters &&
      activeFilters &&
      activeFilters.length > 0 ? (
      <span className={classes.resetFilter}>
        <Button
          color={'primary'}
          variant={buttonVariant}
          onClick={handleResetFilterClick}
          data-testid={'enhancedDataTable-filterBar-resetFilters'}
        >
          Filter löschen
        </Button>
      </span>
    ) : (
      <></>
    );
  }, [activeFilters, handleResetFilterClick]);

  const popoverFilterList = selectableFilters ? (
    selectableFilters!.map((filter, index) => (
      <ListItem
        key={filter.accessor as React.Key}
        button={true}
        onClick={() => handleFilterSelectClick(filter)}
        data-testid={`enhancedDataTable-filterBar-selectFilter-${index}`}
      >
        <ListItemText primary={filter.label} />
      </ListItem>
    ))
  ) : (
    <></>
  );

  const popoverFilterFormInput = selectedFilter?.selectorValues ? (
    <TextField
      label="Auswahl"
      onChange={handleFilterValueChange}
      select
      inputTestId={'enhancedDataTable-filterBar-selectValue'}
      defaultValue=""
    >
      {selectedFilter.selectorValues.map((filterValue, index) => (
        <MenuItem
          key={filterValue}
          value={filterValue}
          data-testid={`enhancedDataTable-filterBar-selectValue-${index}`}
        >
          {filterValue}
        </MenuItem>
      ))}
    </TextField>
  ) : (
    <TextField
      label="Enthält..."
      onChange={handleFilterValueChange}
      inputTestId={'enhancedDataTable-filterBar-input'}
      autoFocus={true}
    />
  );

  const renderPopoverContent = selectedFilter ? (
    <>
      <Toolbar
        classes={{ root: classes.filterTitleToolbar }}
        variant={'dense'}
        disableGutters={true}
      >
        <div
          className={classes.filterTitleToolbarLabel}
          data-testid={'enhancedDataTable-filterBar-selectedFilter'}
        >
          {selectedFilter.label}
        </div>
        <IconButton
          icon={Close}
          color={'inherit'}
          onClick={handleCloseFilterSelectorClick}
          data-testid={'enhancedDataTable-filterBar-close'}
        />
      </Toolbar>
      <form onSubmit={handleFilterSubmit}>
        <Paper className={classes.popoverFormPaper}>
          {popoverFilterFormInput}
          <Button
            variant={'text'}
            color={'primary'}
            type={'submit'}
            disabled={selectedFilter && !selectedFilter.value}
            data-testid={'enhancedDataTable-filterBar-submit'}
          >
            Anwenden
          </Button>
        </Paper>
      </form>
    </>
  ) : (
    <List>{popoverFilterList}</List>
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
    <Toolbar
      className={clsx(classes.toolbar, classes.filterToolbar)}
      data-testid={'enhancedDataTable-filterBar'}
    >
      {renderActiveFilters}
      <Chip
        classes={{ outlined: classes.chipOutlined, root: classes.chipRoot }}
        color={'primary'}
        label={'Filter hinzufügen'}
        variant={'outlined'}
        onClick={handleOpenFilterSelectorClick}
        icon={<Add />}
        disabled={!selectableFilters || selectableFilters.length < 1}
        data-testid={'enhancedDataTable-filterBar-add'}
      />
      {renderResetActiveFilters}
      <Popover
        open={isPopoverOpened}
        anchorEl={popoverAnchorEl}
        onClose={handleCloseFilterSelectorClick}
        anchorOrigin={popoverAnchorOrigin}
        transformOrigin={popoverTransformOrigin}
        classes={{ paper: classNamePopoverpaper }}
        data-testid={'enhancedDataTable-filterBar-filterMenu'}
        data-open={isPopoverOpened}
      >
        {renderPopoverContent}
      </Popover>
    </Toolbar>
  ) : (
    <></>
  );

  return (
    <>
      {renderToolbar}
      {renderFilterBar}
    </>
  );
}

EnhancedDataTableToolbar.defaultProps = {
  buttonVariant: 'outlined',
} as Partial<EnhancedDataTableToolbarProps<unknown>>;
