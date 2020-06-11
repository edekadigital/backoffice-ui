import * as React from 'react';
import MuiDrawer from '@material-ui/core/Drawer';
import MuiContainer from '@material-ui/core/Container';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import { Theme, SvgIconProps } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { IconButton, CheckboxLight } from '../..';

export interface EnhancedDataTableSelectionMenuActions<D> {
  icon: React.ElementType<SvgIconProps>;
  handler: (selectedRows: D[]) => void;
  showProgress?: boolean;
}

export interface EnhancedDataTableSelectionMenuProps<D extends object> {
  actions: Array<EnhancedDataTableSelectionMenuActions<D>>;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isAllRowsSelected: boolean;
  selectedRows: D[];
  maxWidth: 'sm' | 'lg';
}

const useStyles = makeStyles<Theme>(theme => ({
  drawerPaper: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  drawerActions: {
    display: 'flex',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  drawerCheckbox: {
    flexBasis: '45%',
    paddingLeft: theme.spacing(2),
  },
  drawerButton: {
    color: 'white',
  },
}));
export function EnhancedDataTableSelectionMenu<D extends object>(
  props: EnhancedDataTableSelectionMenuProps<D>
) {
  const {
    actions,
    isAllRowsSelected,
    onSelectAllClick,
    selectedRows,
    maxWidth,
  } = props;
  const classes = useStyles();

  const actionItems = actions.map(
    ({ icon, handler, showProgress = false }, index) => {
      const handleClick = () => handler(selectedRows);
      return (
        <IconButton
          icon={icon}
          color="inherit"
          onClick={handleClick}
          key={`selection-action-${index}`}
          data-testid={`enhancedDataTable-selectionMenu-action-${index}`}
          showProgress={showProgress}
        />
      );
    }
  );

  const control = (
    <CheckboxLight
      onChange={onSelectAllClick}
      checked={isAllRowsSelected}
      data-testid={'enhancedDataTable-selectionMenu-selectAll'}
    />
  );

  const isOpen = selectedRows.length > 0;

  return (
    <MuiDrawer
      anchor="bottom"
      variant={'persistent'}
      classes={{ paper: classes.drawerPaper }}
      open={isOpen}
      data-testid={'enhancedDataTable-selectionMenu'}
    >
      <MuiContainer className={classes.drawerActions} maxWidth={maxWidth}>
        <div className={classes.drawerCheckbox}>
          <MuiFormControlLabel control={control} label="Alle auswählen" />
        </div>
        <div>{actionItems}</div>
      </MuiContainer>
    </MuiDrawer>
  );
}
