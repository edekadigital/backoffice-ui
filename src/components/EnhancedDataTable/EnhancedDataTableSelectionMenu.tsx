import * as React from 'react';
import MuiDrawer from '@material-ui/core/Drawer';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import { Theme, SvgIconProps } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { IconButton } from '../IconButton';
import { CheckboxLight } from '../Checkbox';

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
  drawerPosition?: { left: number; width: number };
}

const useStyles = makeStyles<
  Theme,
  { drawerPosition?: { left: number; width: number } }
>((theme) => ({
  drawerPaper: ({ drawerPosition }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingLeft: drawerPosition?.left,
  }),
  drawerActions: ({ drawerPosition }) => ({
    display: 'flex',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    maxWidth: drawerPosition?.width,
  }),
  drawerCheckbox: {
    flexBasis: '45%',
    paddingLeft: theme.spacing(2),
  },
  drawerButton: {
    color: theme.palette.primary.contrastText,
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
    drawerPosition,
  } = props;
  const classes = useStyles({ drawerPosition });
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

  const checkboxInputProps = {
    'data-testid': 'enhancedDataTable-selectionMenu-selectAll',
  } as React.InputHTMLAttributes<HTMLInputElement>;

  const control = (
    <CheckboxLight
      onChange={onSelectAllClick}
      checked={isAllRowsSelected}
      inputProps={checkboxInputProps}
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
      data-open={isOpen}
      PaperProps={{ elevation: 8 }}
    >
      <div className={classes.drawerActions}>
        <div className={classes.drawerCheckbox}>
          <MuiFormControlLabel control={control} label="Alle auswählen" />
        </div>
        <div>{actionItems}</div>
      </div>
    </MuiDrawer>
  );
}
