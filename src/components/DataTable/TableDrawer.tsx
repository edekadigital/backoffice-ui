import * as React from 'react';
import MuiDrawer from '@material-ui/core/Drawer';
import MuiBox from '@material-ui/core/Box';
import MuiCheckbox from '@material-ui/core/Checkbox';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import { IconButton, CheckboxLight } from '../..';

import { Theme, SvgIconProps, TableRowProps } from '@material-ui/core';

import makeStyles from '@material-ui/core/styles/makeStyles';
import { CellValue } from 'react-table';
export interface TableSelectionActions {
  icon: React.ElementType<SvgIconProps>;
  handler: () => void;
}

interface TableDrawerProps {
  indeterminate: boolean;
  actions: TableSelectionActions[];
  onSelectAll: () => void;
  isAllRowsSelected: boolean;
  selectedRows: CellValue[];
}

const useStyles = makeStyles<Theme>(theme => ({
  drawerPaper: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  drawerActions: {
    display: 'flex',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  drawerCheckbox: {
    flexBasis: '45%',
    paddingLeft: theme.spacing(2),
  },
  drawerButton: {
    color: 'white',
  },
}));

export const TableDrawer: React.FC<TableDrawerProps> = ({
  indeterminate = false,
  actions,
  onSelectAll,
  isAllRowsSelected,
  selectedRows,
}) => {
  const classes = useStyles();
  const [checkboxState, setCheckboxState] = React.useState({
    indeterminate,
    checked: false,
  });

  React.useEffect(() => {
    setCheckboxState({
      indeterminate,
      checked: isAllRowsSelected,
    });
  }, [indeterminate, isAllRowsSelected, onSelectAll]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxState({
      indeterminate: false,
      checked: isAllRowsSelected,
    });
    onSelectAll();
  };

  const actionItems = actions.map((action, i) => {
    return (
      <IconButton
        icon={action.icon}
        color="inherit"
        onClick={action.handler}
        key={`selection-action-${i}`}
      />
    );
  });

  const control = (
    <CheckboxLight
      indeterminate={checkboxState.indeterminate}
      onChange={handleSelectAll}
      checked={checkboxState.checked}
    />
  );

  const variant =
    indeterminate || isAllRowsSelected ? 'permanent' : 'temporary';
  const isOpen = indeterminate || isAllRowsSelected;

  return (
    <MuiDrawer
      anchor="bottom"
      variant={variant}
      classes={{ paper: classes.drawerPaper }}
      open={isOpen}
    >
      <MuiBox className={classes.drawerActions}>
        <div className={classes.drawerCheckbox}>
          <MuiFormControlLabel control={control} label="Alle auswählen" />
        </div>
        <div>{actionItems}</div>
      </MuiBox>
    </MuiDrawer>
  );
};

// TODO paddingBottom (DataTable or PageWrapper)
// TODO drawer: container with maxWidth ( set from outside) instead of box element
// TODO add loading state, add min height so table doesn't jump to much
// TODO CallBack handler in drawer actions should always send an array with the content of the rows selected
// TODO Add selected highlight state --> doesn't take style overides with classes prop
