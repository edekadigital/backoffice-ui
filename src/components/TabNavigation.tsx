import * as React from 'react';
import { useEffect, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import clsx from 'clsx';

export interface TabNavigationItem<T> {
  label: string;
  divider?: boolean;
  value: T;
}

export interface TabNavigationProps<T> {
  linkComponent?: React.ElementType;
  items: Array<TabNavigationItem<T>>;
  value: T;
  onChange?: (event: React.ChangeEvent<{}>, value: T) => void;
}

export const activeLinkClass = 'active';

const useStyles = makeStyles(() => ({
  root: {},
  tab: {
    [`&.${activeLinkClass}`]: {
      backgroundColor: 'red',
    },
  },
  tabDivider: {
    '&::before': {
      content: "''",
      borderLeft: 'solid 1px',
      height: '50%',
      position: 'absolute',
      left: 0,
    },
  },
}));

export function TabNavigation<T>(props: TabNavigationProps<T>) {
  const { items, linkComponent = 'button', value, ...additionalProps } = props;
  const classes = useStyles();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('resize'));
  }, []);

  const tabs = useMemo(
    () =>
      items.map((item: TabNavigationItem<T>, index: number) => {
        const className = clsx(classes.tab, {
          [classes.tabDivider]: item.divider,
        });
        return (
          <Tab
            key={index}
            selected={true}
            component={linkComponent}
            label={item.label}
            to={item.value}
            value={item.value}
            className={className}
          />
        );
      }),
    []
  );

  return (
    <div className={classes.root}>
      <Tabs value={value} indicatorColor="primary" {...additionalProps}>
        {tabs}
      </Tabs>
    </div>
  );
}
