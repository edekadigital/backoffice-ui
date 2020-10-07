import { Star, Add } from '@material-ui/icons';
import * as React from 'react';
import { DrawerNavigation, DrawerNavigationItem } from '..';
import {
  createHistory,
  createMemorySource,
  Link,
  LocationProvider,
  RouteComponentProps,
  Router,
} from '@reach/router';

export default {
  title: 'Components/DrawerNavigation',
  component: DrawerNavigation,
};

export const Default = () => {
  const items: Array<DrawerNavigationItem<string>> = [
    { label: 'Lorem', value: '#lorem' },
    { label: 'Ipsum', value: '#ipsum' },
  ];
  return <DrawerNavigation items={items} value={''} />;
};

export const WithIcons = () => {
  const items: Array<DrawerNavigationItem<string>> = [
    { label: 'Lorem', value: '#', icon: Star },
    { label: 'Ipsum', value: '##', icon: Add },
  ];
  return <DrawerNavigation items={items} value={'#'} />;
};

export const WithSubItems = () => {
  const items: Array<DrawerNavigationItem<string>> = [
    {
      label: 'Lorems & Ipsums',
      items: [
        { label: 'Lorem', value: 'lorem', icon: Star },
        { label: 'Ipsum', value: 'ipsum', icon: Add },
      ],
    },
    {
      label: 'Foos & Bars',
      items: [
        { label: 'Foo', value: 'foo', icon: Star },
        { label: 'Bar', value: 'bar', icon: Add },
      ],
    },
  ];
  return <DrawerNavigation items={items} value={'lorem'} />;
};

export const WithState = () => {
  const [val, setVal] = React.useState('lorem');
  const items: Array<DrawerNavigationItem<string>> = [
    { label: 'Lorem', value: 'lorem' },
    { label: 'Ipsum', value: 'ipsum' },
  ];
  return (
    <DrawerNavigation
      items={items}
      value={val}
      onChange={(_, newVal) => setVal(newVal)}
    />
  );
};

export const WithRouter = () => {
  const items: Array<DrawerNavigationItem<string>> = [
    { label: 'Lorem', value: '/', icon: Add },
    { label: 'Ipsum', value: '/view2', icon: Star },
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

  const source = React.useMemo(() => createMemorySource('/'), []);
  const history = React.useMemo(() => createHistory(source), []);
  const [path, setPath] = React.useState('/');

  React.useEffect(() => {
    history.listen(({ location }) => setPath(location.pathname));
  }, [history]);

  return (
    <LocationProvider history={history}>
      <DrawerNavigation items={items} value={path} linkComponent={Link} />
      <Router>
        <View1 path="/" />
        <View2 path="view2" />
      </Router>
    </LocationProvider>
  );
};
