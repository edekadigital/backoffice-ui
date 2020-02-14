import * as React from 'react';

import { render, cleanup } from '@testing-library/react';
import { AppBar, ArrowDropDown, IconButton, ThemeProvider } from '..';
import userEvent from '@testing-library/user-event';

const label = 'Some Label';

describe('<AppBar />', () => {
  afterEach(cleanup);

  it('should render the app bar component', () => {
    const { container } = render(
      <ThemeProvider>
        <AppBar>{label}</AppBar>
      </ThemeProvider>
    );
    expect(container.textContent).toEqual(label);
  });

  it('should click the button on the app bar component', () => {
    const { container } = render(
      <ThemeProvider>
        <AppBar>{label}</AppBar>
      </ThemeProvider>
    );
    expect(container.textContent).toEqual(label);

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
});
