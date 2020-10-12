import { Star, Add } from '@material-ui/icons';
import * as React from 'react';
import {
  AppBar,
  Body,
  DrawerNavigation,
  DrawerNavigationItem,
  Page,
  PageWrapper,
} from '..';
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
        { label: 'Lorem', value: '#lorem', icon: Star },
        { label: 'Ipsum', value: '#ipsum', icon: Add },
      ],
    },
    {
      label: 'Foos & Bars',
      items: [
        { label: 'Foo', value: '#foo', icon: Star },
        { label: 'Bar', value: '#bar', icon: Add },
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
      <DrawerNavigation items={items} value={path} linkComponent={Link}>
        <Router>
          <View1 path="/" />
          <View2 path="view2" />
        </Router>
      </DrawerNavigation>
    </LocationProvider>
  );
};

export const WithAppBar = () => {
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
  return (
    <PageWrapper>
      <AppBar gutterBottom={true}>
        <strong>Lorem</strong>Ipsum
      </AppBar>
      <DrawerNavigation items={items} value={''}>
        <Page>
          <Body component="p">
            Lorem ipsum dolor sit amet,{' '}
            <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Body>
          <Body component="p">
            Lorem ipsum dolor sit amet,{' '}
            <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Body>
          <Body component="p">
            Lorem ipsum dolor sit amet,{' '}
            <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Body>
          <Body component="p">
            Lorem ipsum dolor sit amet,{' '}
            <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Body>
          <Body component="p">
            Lorem ipsum dolor sit amet,{' '}
            <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Body>
          <Body component="p">
            Lorem ipsum dolor sit amet,{' '}
            <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Body>
          <Body component="p">
            Lorem ipsum dolor sit amet,{' '}
            <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Body>
          <Body component="p">
            Lorem ipsum dolor sit amet,{' '}
            <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Body>
          <Body component="p">
            Lorem ipsum dolor sit amet,{' '}
            <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Body>
        </Page>
      </DrawerNavigation>
    </PageWrapper>
  );
};
WithAppBar.parameters = { layout: 'fullscreen' };
WithRouter.parameters = { layout: 'fullscreen' };
