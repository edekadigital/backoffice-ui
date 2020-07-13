import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { ServiceTiles } from '..';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';

describe('<ServiceTiles />', () => {
  afterEach(cleanup);

  it('should render the service tiles component', () => {
    const onClickFn = jest.fn();
    const services = [
      {
        title: 'title',
        buttonLabel: 'label',
        onClick: onClickFn,
      },
    ];
    const { getByTestId } = render(<ServiceTiles services={services} />);
    expect(getByTestId('serviceTile-0')).toBeTruthy();
    expect(getByTestId('serviceTile-0-title').textContent).toBe('title');
    expect(getByTestId('serviceTile-0-button').textContent).toBe('label');
  });

  it('should render the service tiles component with multiple services and with all props ', () => {
    const onClickFn = jest.fn();
    const onClickFn2 = jest.fn();
    const services = [
      {
        icon: 'image.png',
        title: 'title',
        buttonLabel: 'label',
        onClick: onClickFn,
        description: 'description',
        info: '1',
      },
      {
        icon: 'image.png',
        title: 'title2',
        buttonLabel: 'label2',
        onClick: onClickFn2,
        description: 'description',
        info: '1',
      },
    ];
    const { getByTestId, getAllByTestId } = render(
      <ServiceTiles services={services} />
    );
    expect(getByTestId('serviceTile-0')).toBeTruthy();
    expect(getByTestId('serviceTile-0-title').textContent).toBe('title');
    expect(getByTestId('serviceTile-0-button').textContent).toBe('label');
    expect(getByTestId('serviceTile-0-description').textContent).toBe(
      'description'
    );
    expect(getByTestId('serviceTile-0-info').textContent).toBe('1');
    expect(getAllByTestId('serviceIcon')[0]).toBeTruthy();
    userEvent.click(getByTestId('serviceTile-0-button'));
    expect(onClickFn).toBeCalledTimes(1);

    expect(getByTestId('serviceTile-1')).toBeTruthy();
    expect(getByTestId('serviceTile-1-title').textContent).toBe('title2');
    expect(getByTestId('serviceTile-1-button').textContent).toBe('label2');
    userEvent.click(getByTestId('serviceTile-1-button'));
    expect(onClickFn2).toBeCalledTimes(1);
  });
});
