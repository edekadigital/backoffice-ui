import * as React from 'react';
import MuiDrawer from '@material-ui/core/Drawer';
import MuiBox from '@material-ui/core/Box';
import MuiCheckbox from '@material-ui/core/Checkbox';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import { IconButton, CheckboxLight } from '../..';

import { Theme, SvgIconProps } from '@material-ui/core';

import makeStyles from '@material-ui/core/styles/makeStyles';
import { on } from 'cluster';
export interface TableSelectionActions {
  icon: React.ElementType<SvgIconProps>;
  handler: () => void;
}

interface TableDrawerProps {
  indeterminate: boolean;
  actions: TableSelectionActions[];
  onSelectAll: () => void;
  isAllRowsSelected: boolean;
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
  indeterminate,
  actions,
  onSelectAll,
  isAllRowsSelected,
}) => {
  const classes = useStyles();
  // const [isIndeterminate, setIsIndeterminate] = React.useState(false);

  const isIndeterminate = indeterminate && !isAllRowsSelected;

  console.log(isIndeterminate);
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onchnage');
    // isIndeterminate;
    onSelectAll();
  };

  const actionItems = actions.map((action, i) => (
    <IconButton
      icon={action.icon}
      color="inherit"
      onClick={action.handler}
      key={`selection-action-${i}`}
    />
  ));

  const control = (
    <CheckboxLight indeterminate={isIndeterminate} onChange={handleSelectAll} />
  );

  return (
    <MuiDrawer
      anchor="bottom"
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
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
