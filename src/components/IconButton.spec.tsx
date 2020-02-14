import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { ArrowDropDown, IconButton } from '..';
import userEvent from '@testing-library/user-event';

describe('<IconButton/>', () => {
  afterEach(cleanup);

  it('should render the icon button component', () => {
    const { container } = render(<IconButton icon={ArrowDropDown} />);

    const icon = container.querySelector<HTMLButtonElement>('button');
    expect(icon!).toBeTruthy();
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
});
