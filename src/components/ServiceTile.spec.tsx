import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { ServiceTile } from '..';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';

describe('<ServiceTile />', () => {
  afterEach(cleanup);

  it('should render the service tile component', () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(
      <ServiceTile buttonLabel="label" onClick={onClickFn} title="title" />
    );
    expect(getByTestId('serviceTile')).toBeTruthy();
    expect(getByTestId('serviceTile-title').textContent).toBe('title');
    expect(getByTestId('serviceTile-button').textContent).toBe('label');
  });

  it('should render the service tile component with all props', () => {
    const onClickFn = jest.fn();
    const { getByTestId } = render(
      <ServiceTile
        icon={'image.png'}
        buttonLabel="label"
        onClick={onClickFn}
        title="title"
        description={'description'}
        info="1"
      />
    );
    expect(getByTestId('serviceTile')).toBeTruthy();
    expect(getByTestId('serviceTile-title').textContent).toBe('title');
    expect(getByTestId('serviceTile-button').textContent).toBe('label');
    expect(getByTestId('serviceTile-description').textContent).toBe(
      'description'
    );
    expect(getByTestId('serviceTile-info').textContent).toBe('1');
    expect(getByTestId('serviceIcon')).toBeTruthy();
    userEvent.click(getByTestId('serviceTile-button'));
    expect(onClickFn).toBeCalledTimes(1);
  });
});
