import * as React from 'react';

import { cleanup, fireEvent } from '@testing-library/react';
import { AppBar, Apps, ArrowDropDown, IconButton } from '..';
import userEvent from '@testing-library/user-event';
import { render } from '../test-utils';

const label = 'Some Label';

describe('<AppBar />', () => {
  afterEach(cleanup);

  it('should render the app bar component', () => {
    const { container } = render(<AppBar>{label}</AppBar>);
    expect(container.textContent).toEqual(label);
  });

  it('should click the button on the app bar component', () => {
    let click = false;
    const handleClick = () => {
      click = true;
    };

    const { container } = render(<AppBar>{label}</AppBar>);

    const { getByTestId } = render(
      <IconButton
        icon={ArrowDropDown}
        onClick={handleClick}
        data-testid="iconbutton"
      />
    );

    userEvent.click(getByTestId('iconbutton'));
    expect(container.textContent).toEqual(label);
    expect(click).toBe(true);
  });

  it('should render the app bar component with action button', () => {
    const testAction = [
      {
        icon: Apps,
        handler: () => console.log('test'),
      },
    ];

    const { container } = render(
      <AppBar actions={testAction} gutterBottom={true}>
        {label}
      </AppBar>
    );

    expect(container.textContent).toEqual(label);
    const actionButton = container.querySelector<HTMLSpanElement>('span');
    expect(actionButton!).toBeTruthy();
  });

  it('should notice onClick event in app bar', () => {
    /*    const testHandler = jest.fn();*/
    let clicked = false;
    const clickHandler = () => {
      clicked = true;
    };

    const testAction = [
      {
        icon: Apps,
        handler: clickHandler,
      },
    ];

    const { container } = render(
      <AppBar actions={testAction} gutterBottom={true}>
        {label}
      </AppBar>
    );

    expect(container.textContent).toEqual(label);
    const actionButton = container.querySelector<HTMLSpanElement>('span');
    expect(actionButton!).toBeTruthy();

    const buttonResult = container.querySelectorAll<HTMLButtonElement>(
      'button'
    );
    fireEvent.click(buttonResult.item(0)!);
    expect(clicked).toBe(true);
  });
});
