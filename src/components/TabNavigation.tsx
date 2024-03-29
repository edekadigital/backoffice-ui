import * as React from 'react';
import { useEffect, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import clsx from 'clsx';
import { Divider, alpha, Theme } from '@material-ui/core';

export interface TabNavigationItem<T> {
  /**
   * The content of the label.
   */
  label: string;
  /**
   * The value of the tab item.
   */
  value: T;
  /**
   * If `true`, the tab will be disabled
   */
  disabled?: boolean;
  /**
   * If `true`, a vertical divider will be shown before the tab item
   */
  divider?: boolean;
}

export interface TabNavigationProps<T> {
  /**
   * The link component to use. Default component is `button`
   * @default "button"
   */
  linkComponent?: React.ElementType;
  /**
   * The tab items to show.
   */
  items: Array<TabNavigationItem<T>>;
  /**
   * The tab item to be selected and active.
   */
  value: T;
  /**
   * Callback fired when a tab item is clicked.
   */
  onChange?: (event: React.ChangeEvent<{}>, value: T) => void;
  /**
   * If `true`, the tab navigation bar will have a bottom margin.
   * @default false
   */
  gutterBottom?: boolean;
}

const useStyles = makeStyles<Theme, { gutterBottom: boolean }>((theme) => ({
  root: ({ gutterBottom }) => ({
    marginBottom: theme.spacing(gutterBottom ? 3 : 0),
  }),
  indicator: {
    height: 4,
    zIndex: 2,
  },
  horizontalDivider: {
    position: 'relative',
    bottom: 1,
  },
  tab: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  tabDivider: {
    '&::before': {
      content: "''",
      borderLeft: `solid 1px ${alpha('#000', 0.5)}`,
      height: '50%',
      position: 'absolute',
      left: 0,
    },
  },
}));

/**
 * | Test ID                        | Description              |
 * | ------------------------------ | ------------------------ |
 * | `tabNavigation`                | tab navigation container |
 * | `tabNavigation-item-{index}`   | tab item                 |
 */
export function TabNavigation<T>(props: TabNavigationProps<T>) {
  const {
    items,
    gutterBottom = false,
    linkComponent = 'button',
    value,
    ...additionalProps
  } = props;
  const classes = useStyles({ gutterBottom });

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
            disabled={item.disabled}
            data-testid={'tabNavigation-item-' + index}
          />
        );
      }),
    [items]
  );

  const tabIndicatorProps = {
    color: 'primary',
    className: classes.indicator,
  };

  return (
    <div className={classes.root}>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        TabIndicatorProps={tabIndicatorProps}
        data-testid="tabNavigation"
        {...additionalProps}
      >
        {tabs}
      </Tabs>
      <Divider className={classes.horizontalDivider} />
    </div>
  );
}
