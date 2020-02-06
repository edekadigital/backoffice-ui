import { storiesOf } from '@storybook/react';
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

const navigationItems1: Array<TabNavigationItem<number>> = [
  {
    value: 1,
    label: 'Persönliche Daten',
  },
  {
    value: 2,
    label: 'Login / Mail',
  },
  {
    value: 3,
    label: 'Newsletter',
  },
  {
    value: 4,
    label: 'Datenschutz',
  },
  {
    value: 5,
    label: 'Protokoll',
    divider: true,
  },
];

const navigationItems2 = [
  {
    value: '/',
    label: 'Persönliche Daten',
  },
  {
    value: '/view2',
    label: 'Login / Mail',
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

storiesOf('Components|TabNavigation', module)
  .add('Default', () => {
    const [value, setValue] = useState(1);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };

    return (
      <>
        <TabNavigation
          items={navigationItems1}
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
  })
  .add('With router', () => {
    const source = useMemo(() => createMemorySource('/'), []);
    const history = useMemo(() => createHistory(source), []);
    const [path, setPath] = useState('/');

    useEffect(() => {
      history.listen(({ location }) => setPath(location.pathname));
    }, [history]);

    return (
      <LocationProvider history={history}>
        <TabNavigation
          items={navigationItems2}
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
  });
