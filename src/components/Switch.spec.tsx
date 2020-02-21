import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { Switch } from '..';
import userEvent from '@testing-library/user-event';

describe('<Switch/>', () => {
  afterEach(cleanup);

  const label = 'some label';

  it('should render the switch component', () => {
    const { container } = render(<Switch label={label} />);

    expect(container.textContent).toEqual(label);
  });

  it('should notice when switch status changed', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <Switch onChange={onChange} label={label} />
    );

    userEvent.click(getByTestId('switch-input'));
    userEvent.click(getByTestId('switch-input'));

    expect(onChange).toBeCalledTimes(2);
    const [call1, call2] = onChange.mock.calls;
    const [, passedCheckedState1] = call1;
    const [, passedCheckedState2] = call2;
    expect(passedCheckedState1).toBe(true);
    expect(passedCheckedState2).toBe(false);
  });
});
