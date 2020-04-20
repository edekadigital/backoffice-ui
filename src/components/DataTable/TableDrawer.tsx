import * as React from 'react';
import MuiDrawer from '@material-ui/core/Drawer';
import MuiBox from '@material-ui/core/Box';
import MuiCheckbox from '@material-ui/core/Checkbox';
import { Button, IconButton, GetApp } from '../..';

import { Theme } from '@material-ui/core';

import makeStyles from '@material-ui/core/styles/makeStyles';
import { useFlexLayout } from 'react-table';

interface TableDrawerProps {
  indeterminate: boolean;
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
    paddingRight: theme.spacing(3),
  },
  drawerCheckbox: {
    flexBasis: '45%',
  },
  drawerButton: {
    color: 'white',
  },
}));

export const TableDrawer: React.FC<TableDrawerProps> = ({
  indeterminate = false,
}) => {
  const classes = useStyles();

  const handleDownloadClick = () => {
    console.log('Send api request and expect zip file');
  };

  const handleSelectAllClick = () => {
    console.log('Select all rows');
  };

  return (
    <MuiDrawer
      anchor="bottom"
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
    >
      <MuiBox className={classes.drawerActions}>
        <div className={classes.drawerCheckbox}>
          <MuiCheckbox indeterminate={indeterminate} />
          <Button
            children="Alle auswählen"
            variant="text"
            className={classes.drawerButton}
            onClick={handleSelectAllClick}
          />
        </div>
        <div>
          <IconButton
            icon={GetApp}
            color="inherit"
            onClick={handleDownloadClick}
          />
        </div>
      </MuiBox>
    </MuiDrawer>
  );
};
