import * as React from 'react';
import { cleanup, waitFor } from '@testing-library/react';
import { DrawerNavigation } from '..';
import { render, setMatchMedia } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { Star } from '@material-ui/icons';
import {
  createHistory,
  createMemorySource,
  Link,
  LocationProvider,
  RouteComponentProps,
  Router,
} from '@reach/router';

describe('<DrawerNavigation/>', () => {
  afterEach(cleanup);

  it('should render the drawer navigation component', () => {
    setMatchMedia('desktop');
    const items = [
      { label: 'Lorem', value: '#lorem' },
      { label: 'Ipsum', value: '#ipsum', icon: Star },
      {
        label: 'Foos & Bars',
        items: [
          { label: 'Foo', value: 'foo', icon: Star },
          { label: 'Bar', value: 'bar' },
        ],
      },
    ];
    const { getByTestId, queryByTestId } = render(
      <DrawerNavigation items={items} value={''} />
    );

    expect(getByTestId('drawerNavigation-drawer')).toBeTruthy();
    expect(queryByTestId('drawerNavigation-mobileDrawer')).toBeFalsy();

    expect(getByTestId('drawerNavigation-list')).toBeTruthy();

    expect(getByTestId('drawerNavigation-linkItem-0')).toBeTruthy();
    expect(getByTestId('drawerNavigation-linkItem-1')).toBeTruthy();
    expect(getByTestId('drawerNavigation-linkItem-0-label').textContent).toBe(
      items[0].label
    );
    expect(getByTestId('drawerNavigation-linkItem-1-label').textContent).toBe(
      items[1].label
    );
    expect(getByTestId('drawerNavigation-linkItem-1-icon')).toBeTruthy();
    expect(getByTestId('drawerNavigation-subLabel-2').textContent).toBe(
      items[2].label
    );
    expect(getByTestId('drawerNavigation-linkItem-2-0')).toBeTruthy();
    expect(getByTestId('drawerNavigation-linkItem-2-0-label').textContent).toBe(
      items[2].items && items[2].items[0].label
    );
    expect(getByTestId('drawerNavigation-linkItem-2-0-icon')).toBeTruthy();
    expect(getByTestId('drawerNavigation-linkItem-2-1')).toBeTruthy();
    expect(getByTestId('drawerNavigation-linkItem-2-1-label').textContent).toBe(
      items[2].items![1].label
    );
  });

  it('should render the drawer navigation component on mobile viewports', () => {
    setMatchMedia('mobile');
    const items = [
      { label: 'Lorem', value: '#lorem' },
      { label: 'Ipsum', value: '#ipsum', icon: Star },
      {
        label: 'Foos & Bars',
        items: [
          { label: 'Foo', value: 'foo', icon: Star },
          { label: 'Bar', value: 'bar' },
        ],
      },
    ];
    const { getByTestId, queryByTestId } = render(
      <DrawerNavigation items={items} value={''} />
    );
    expect(queryByTestId('drawerNavigation-drawer')).toBeFalsy();
    expect(getByTestId('drawerNavigation-mobileDrawer')).toBeTruthy();
    expect(getByTestId('drawerNavigation-mobileDrawer')).not.toBeVisible();
    expect(getByTestId('drawerNavigation-mobileMenuButton')).toBeTruthy();

    userEvent.click(getByTestId('drawerNavigation-mobileMenuButton'));
    expect(getByTestId('drawerNavigation-mobileDrawer')).toBeVisible();

    expect(getByTestId('drawerNavigation-list')).toBeTruthy();
    expect(getByTestId('drawerNavigation-linkItem-0')).toBeTruthy();
    expect(getByTestId('drawerNavigation-linkItem-1')).toBeTruthy();
    expect(getByTestId('drawerNavigation-linkItem-0-label').textContent).toBe(
      items[0].label
    );
    expect(getByTestId('drawerNavigation-linkItem-1-label').textContent).toBe(
      items[1].label
    );
    expect(getByTestId('drawerNavigation-linkItem-1-icon')).toBeTruthy();
    expect(getByTestId('drawerNavigation-subLabel-2').textContent).toBe(
      items[2].label
    );
    expect(getByTestId('drawerNavigation-linkItem-2-0')).toBeTruthy();
    expect(getByTestId('drawerNavigation-linkItem-2-0-label').textContent).toBe(
      items[2].items && items[2].items[0].label
    );
    expect(getByTestId('drawerNavigation-linkItem-2-0-icon')).toBeTruthy();
    expect(getByTestId('drawerNavigation-linkItem-2-1')).toBeTruthy();
    expect(getByTestId('drawerNavigation-linkItem-2-1-label').textContent).toBe(
      items[2].items![1].label
    );

    userEvent.click(getByTestId('drawerNavigation-mobileMenuButton'));
    expect(
      getByTestId('drawerNavigation-mobileDrawer').getAttribute('aria-hidden')
    ).toBe('true');
  });

  it('should be able to handle the navigation with an external React state', () => {
    setMatchMedia();
    const items = [
      { label: 'Lorem', value: '#lorem' },
      { label: 'Ipsum', value: '#ipsum' },
    ];
    const handleChange = jest.fn();

    const TestComponent = () => {
      const [val, setVal] = React.useState('#lorem');
      handleChange.mockImplementation(
        (_: React.ChangeEvent<{}>, newValue: string) => {
          setVal(newValue);
        }
      );
      return (
        <DrawerNavigation items={items} value={val} onChange={handleChange}>
          {items[0].value === val ? <div data-testid="page1" /> : null}
          {items[1].value === val ? <div data-testid="page2" /> : null}
        </DrawerNavigation>
      );
    };

    const { getByTestId, queryByTestId } = render(<TestComponent />);
    expect(getByTestId('page1')).toBeTruthy();
    expect(queryByTestId('page2')).toBeFalsy();
    userEvent.click(getByTestId('drawerNavigation-linkItem-1'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(getByTestId('page2')).toBeTruthy();
    expect(queryByTestId('page1')).toBeFalsy();
    userEvent.click(getByTestId('drawerNavigation-linkItem-0'));
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(getByTestId('page1')).toBeTruthy();
    expect(queryByTestId('page2')).toBeFalsy();
  });

  it('should be able to handle the navigation with a router and link component', async () => {
    setMatchMedia();
    const items = [
      { label: 'Lorem', value: '/lorem' },
      { label: 'Ipsum', value: '/ipsum' },
    ];

    const TestComponent = () => {
      const source = React.useMemo(() => createMemorySource('/lorem'), []);
      const history = React.useMemo(() => createHistory(source), []);
      const [path, setPath] = React.useState('/lorem');

      React.useEffect(() => {
        history.listen(({ location }) => setPath(location.pathname));
      }, [history]);

      const Page1: React.FC<RouteComponentProps> = () => (
        <div data-testid="page1" />
      );

      const Page2: React.FC<RouteComponentProps> = () => (
        <div data-testid="page2" />
      );

      return (
        <LocationProvider history={history}>
          <DrawerNavigation items={items} value={path} linkComponent={Link}>
            <Router>
              <Page1 path="/lorem" />
              <Page2 path="/ipsum" />
            </Router>
          </DrawerNavigation>
        </LocationProvider>
      );
    };

    const { getByTestId, queryByTestId } = render(<TestComponent />);

    expect(getByTestId('page1')).toBeTruthy();
    expect(queryByTestId('page2')).toBeFalsy();
    userEvent.click(getByTestId('drawerNavigation-linkItem-1'));
    await waitFor(() => expect(getByTestId('page2')).toBeTruthy());
    expect(queryByTestId('page1')).toBeFalsy();
    userEvent.click(getByTestId('drawerNavigation-linkItem-0'));
    await waitFor(() => expect(getByTestId('page1')).toBeTruthy());
    expect(queryByTestId('page2')).toBeFalsy();
  });
});
