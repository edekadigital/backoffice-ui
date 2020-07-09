import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { ServiceTile } from '..';
import { render } from '../test-utils';

describe('<ServiceTile />', () => {
  afterEach(cleanup);

  it('should render the service tile component', () => {
    const { getByTestId } = render(
      <ServiceTile buttonLabel="label" href="" title="title" />
    );
    expect(getByTestId('serviceTile')).toBeTruthy();
    expect(getByTestId('serviceTile-title').textContent).toBe('title');
    expect(getByTestId('serviceTile-button').textContent).toBe('label');
  });

  it('should render the service tile component with all props', () => {
    const { getByTestId } = render(
      <ServiceTile
        icon={'image.png'}
        buttonLabel="label"
        href="#"
        title="title"
        description={'description'}
        version="1"
      />
    );
    expect(getByTestId('serviceTile')).toBeTruthy();
    expect(getByTestId('serviceTile-title').textContent).toBe('title');
    expect(getByTestId('serviceTile-button').textContent).toBe('label');
    expect(getByTestId('serviceTile-description').textContent).toBe(
      'description'
    );
    expect(getByTestId('serviceTile-version').textContent).toBe('1');
    expect(getByTestId('serviceIcon')).toBeTruthy();
  });
});
