import * as React from 'react';
import MuiDrawer from '@material-ui/core/Drawer';
import MuiContainer from '@material-ui/core/Container';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import { Theme, SvgIconProps } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { CellValue } from 'react-table';
import { IconButton, CheckboxLight } from '../..';
export interface TableSelectionActions {
  icon: React.ElementType<SvgIconProps>;
  handler: (selectedRows: CellValue[]) => void;
}

interface TableDrawerProps {
  indeterminate: boolean;
  actions: TableSelectionActions[];
  onSelectAll: () => void;
  isAllRowsSelected: boolean;
  selectedRows: CellValue[];
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

export const TableDrawer: React.FC<TableDrawerProps> = ({
  indeterminate = false,
  actions,
  onSelectAll,
  isAllRowsSelected,
  selectedRows,
  maxWidth = 'lg',
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

  const handleSelectAll = () => {
    setCheckboxState({
      indeterminate: false,
      checked: isAllRowsSelected,
    });
    onSelectAll();
  };

  const actionItems = actions.map(({ icon, handler }, i) => {
    const handleClick = () => handler(selectedRows);
    return (
      <IconButton
        icon={icon}
        color="inherit"
        onClick={handleClick}
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
      <MuiContainer className={classes.drawerActions} maxWidth={maxWidth}>
        <div className={classes.drawerCheckbox}>
          <MuiFormControlLabel control={control} label="Alle auswählen" />
        </div>
        <div>{actionItems}</div>
      </MuiContainer>
    </MuiDrawer>
  );
};

// TODO Add selected highlight state --> doesn't take style overides with classes prop
