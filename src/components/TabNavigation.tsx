import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tabs from '@material-ui/core/Tabs';
import { useMemo } from 'react';
import Tab from '@material-ui/core/Tab';
import clsx from 'clsx';

const DefaultLinkComponent = React.forwardRef<HTMLAnchorElement>(
  (props, ref) => <a {...props} ref={ref} />
);

interface TabNavigationItem {
  label: string;
  href: string;
  divider?: boolean;
}

export interface TabNavigationProps {
  // tslint:disable-next-line: no-any
  linkComponent?: any;
  items: TabNavigationItem[];
}

export const activeLinkClass = 'active';

const useStyles = makeStyles(() => ({
  root: {},
  tab: {},
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

export const TabNavigation: React.FC<TabNavigationProps> = props => {
  const { items, linkComponent = DefaultLinkComponent } = props;
  const classes = useStyles();

  const tabs = useMemo(
    () =>
      items.map((item: TabNavigationItem, index: number) => {
        const className = clsx(classes.tab, {
          [classes.tabDivider]: item.divider,
        });
        return (
          <Tab
            key={index}
            component={linkComponent}
            label={item.label}
            className={className}
          />
        );
      }),
    []
  );

  return (
    <div className={classes.root}>
      <Tabs value={false}>{tabs}</Tabs>
    </div>
  );
};
