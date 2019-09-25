import * as React from 'react';
import { FunctionComponent } from 'react';
import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';

export interface MenuItem {
  title: string;
  to?: string;
  badge?: number | string | boolean;
}

export interface HorizontalMenuProps {
  items: MenuItem[];
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    listStyleType: 'none',
    display: 'inline',
  },
  item: {
    display: 'inline',
    padding: '0 5px 0px 5px',
  },
  navlink: {
    textDecoration: 'none',
    padding: '0 5px 5px 5px',
    color: 'black',
    borderBottom: '1px solid transparent',
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  navlinkActive: {
    borderBottom: '1px solid black',
  },
  navlinkDisabled: {
    textDecoration: 'none',
    padding: '0 5px 5px 5px',
    color: 'darkgrey',
    borderBottom: '1px solid transparent',
    fontSize: '12px',
    textTransform: 'uppercase',
  },
}));

export const HorizontalMenu: FunctionComponent<HorizontalMenuProps> = props => {
  if (React.Children.count(props.children) > 0) {
    throw new Error('A ' + HorizontalMenu.name + ' cannot have children!');
  }

  const classes = useStyles();

  const renderItem = (item: MenuItem) => {
    let navlink: React.ReactNodes;
    if (item.to !== undefined && item.to !== null) {
      navlink = (
        <NavLink
          to={item.to}
          className={classes.navlink}
          activeClassName={classes.navlinkActive}
          exact={true}
        >
          {item.title}
        </NavLink>
      );
    } else {
      navlink = <span className={classes.navlinkDisabled}>{item.title}</span>;
    }
    return (
      <li className={classes.item}>
        <Badge
          badgeContent={item.badge !== false ? item.badge : undefined}
          color="primary"
          variant={item.badge === true ? 'dot' : 'standard'}
        >
          {navlink}
        </Badge>
      </li>
    );
  };

  return (
    <ul className={classes.root}>
      {props.items.map(item => renderItem(item))}
    </ul>
  );
};
