import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { TabNavigation, TabNavigationItem } from './TabNavigation';
import {
  createHistory,
  createMemorySource,
  Link,
  LocationProvider,
  RouteComponentProps,
  Router,
} from '@reach/router';

export default {
  title: 'Components/TabNavigation',
  component: TabNavigation,
};

export const Default = () => {
  const navigationItems: Array<TabNavigationItem<number>> = [
    {
      value: 1,
      label: 'Tab One of Five',
    },
    {
      value: 2,
      label: 'Tab Two of Five',
    },
    {
      value: 3,
      label: 'Tab Three of Five',
    },
    {
      value: 4,
      label: 'Tab Four of Five',
    },
    {
      value: 5,
      label: 'Tab Five of Five',
      divider: true,
    },
    {
      value: 6,
      label: 'disabled Tab',
      disabled: true,
    },
  ];

  const [value, setValue] = useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <TabNavigation
        items={navigationItems}
        value={value}
        onChange={handleChange}
        gutterBottom={true}
      />
      <div hidden={value !== 1}>Tab 1</div>
      <div hidden={value !== 2}>Tab 2</div>
      <div hidden={value !== 3}>Tab 3</div>
      <div hidden={value !== 4}>Tab 4</div>
      <div hidden={value !== 5}>Tab 5</div>
    </>
  );
};

export const WithRouter = () => {
  const navigationItems = [
    {
      value: '/',
      label: 'Tab A',
    },
    {
      value: '/view2',
      label: 'Tab B',
      divider: true,
    },
  ];
  const View1: React.FC<RouteComponentProps> = ({ location }) => {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>View 1: {location?.pathname}</h1>
      </div>
    );
  };

  const View2: React.FC<RouteComponentProps> = ({ location }) => {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>View 2: {location?.pathname}</h1>
      </div>
    );
  };

  const source = useMemo(() => createMemorySource('/'), []);
  const history = useMemo(() => createHistory(source), []);
  const [path, setPath] = useState('/');

  useEffect(() => {
    history.listen(({ location }) => setPath(location.pathname));
  }, [history]);

  return (
    <LocationProvider history={history}>
      <TabNavigation
        items={navigationItems}
        linkComponent={Link}
        value={path}
        gutterBottom={true}
      />
      <Router>
        <View1 path="/" />
        <View2 path="view2" />
      </Router>
    </LocationProvider>
  );
};
