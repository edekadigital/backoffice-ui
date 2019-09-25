import * as React from 'react';
import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { IconButton as MuiIconButton } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { OUTER_MARGIN } from '../constants/dimensions';

export interface AppBarAction {
  icon: React.ReactType<SvgIconProps>;
  handler: () => void;
}

export interface AppBarProps {
  children?: React.ReactNode;
  actions?: AppBarAction[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: OUTER_MARGIN,
    paddingRight: OUTER_MARGIN,
    background: theme.palette.background.paper,
  },
  outer: {
    margin: '0 auto',
    display: 'flex',
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrapper: {
    flex: '1 1 100%',
  },
  title: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  actionsWrapper: {
    flex: '0 0 auto',
    display: 'flex',
    overflow: 'hidden',
  },
}));

export const AppBar: React.FC<AppBarProps> = ({ actions = [], children }) => {
  const classes = useStyles();

  const actionItems = actions.map(({ icon, handler }, index) => {
    const IconComponent = icon;
    const handleClick = () => handler();
    return (
      <div key={`action-item-${index}`}>
        <MuiIconButton color="default" onClick={handleClick}>
          <IconComponent fontSize="small" />
        </MuiIconButton>
      </div>
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.outer}>
        <div className={classes.titleWrapper}>
          <Typography component="h1" variant="h6" className={classes.title}>
            {children}
          </Typography>
        </div>
        <div className={classes.actionsWrapper}>{actionItems}</div>
      </div>
    </div>
  );
};
