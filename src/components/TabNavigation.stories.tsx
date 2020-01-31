import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { activeLinkClass, TabNavigation } from './TabNavigation';
import {
  Router,
  Link,
  RouteComponentProps,
  LocationProvider,
  createHistory,
  createMemorySource,
  LinkGetProps,
} from '@reach/router';

const navigationItems1 = [
  {
    href: '/',
    label: 'Persönliche Daten',
  },
  {
    href: 'view2',
    label: 'Login / Mail',
  },
  {
    href: 'view3',
    label: 'Newsletter',
  },
  {
    href: 'view3',
    label: 'Datenschutz',
  },
  {
    href: 'view3',
    label: 'Protokoll',
    divider: true,
  },
];

const navigationItems2 = [
  {
    href: '/',
    label: 'Persönliche Daten',
  },
  {
    href: 'view2',
    label: 'Login / Mail',
  },
];

const View1: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>View 1</h1>
    </div>
  );
};

const View2: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>View 2</h1>
    </div>
  );
};

storiesOf('Components|TabNavigation', module)
  .add('Default', () => {
    return <TabNavigation items={navigationItems1} />;
  })
  .add('With router', () => {
    const source = createMemorySource('/');
    const history = createHistory(source);

    // TODO refactor component forwarding
    // tslint:disable-next-line: no-any
    const NavLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
      const isActive = (options: LinkGetProps) => ({
        className: options.isCurrent
          ? `${props.className} ${activeLinkClass}`
          : props.className,
      });
      return <Link {...props} ref={ref} getProps={isActive} />;
    });

    return (
      <LocationProvider history={history}>
        <Router>
          <View1 path="/" />
          <View2 path="/view2" />
        </Router>
        <TabNavigation items={navigationItems2} linkComponent={NavLink} />
      </LocationProvider>
    );
  });
