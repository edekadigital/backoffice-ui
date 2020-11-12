import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { ArrowDropDown, IconButton } from '..';
import userEvent from '@testing-library/user-event';

describe('<IconButton/>', () => {
  afterEach(cleanup);

  it('should render the icon button component', () => {
    const { getByTestId } = render(
      <IconButton icon={ArrowDropDown} data-testid="iconbutton" />
    );

    expect(getByTestId('iconbutton')).toBeTruthy();
  });

  it('should render the icon button component with progress indicator', () => {
    const { getByTestId } = render(
      <IconButton icon={ArrowDropDown} data-testid="iconbutton" showProgress />
    );
    expect(getByTestId('iconbutton')).toBeTruthy();
    expect(getByTestId('iconButton-progress')).toBeTruthy();
  });

  it('should notice onClick event for IconButton', () => {
    let click = false;

    const handleClick = () => {
      click = true;
    };

    const { getByTestId } = render(
      <IconButton
        icon={ArrowDropDown}
        onClick={handleClick}
        data-testid="iconbutton"
      />
    );

    userEvent.click(getByTestId('iconbutton'));
    expect(click).toBe(true);
  });

  it('should open menu on click if menu prop is provided', () => {
    const handleClick = jest.fn();
    const menuItemClick = jest.fn();
    const { getByTestId } = render(
      <IconButton
        icon={ArrowDropDown}
        onClick={handleClick}
        menu={[{ handler: menuItemClick, label: 'Foo' }]}
        data-testid="iconbutton"
      />
    );
    userEvent.click(getByTestId('iconbutton'));
    expect(handleClick).toHaveBeenCalledTimes(0);
    expect(getByTestId('listMenu')).toBeVisible();
    userEvent.click(getByTestId('listMenu-menuItem-0'));
    expect(menuItemClick).toHaveBeenCalledTimes(1);
  });
});
