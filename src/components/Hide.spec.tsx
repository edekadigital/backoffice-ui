import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { Hide } from '..';
import { render } from '../test-utils';

describe('<Hide />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { container } = render(<Hide>lorem</Hide>);

    expect(container).toBeTruthy();
  });
  it('should render component for desktop viewport', () => {
    const { getByTestId } = render(
      <Hide viewport={'desktop'}>
        <div data-testid="lorem">Lorem</div>
      </Hide>
    );

    expect(getByTestId('lorem')).toBeTruthy();
  });

  it('should render component for mobile viewport', () => {
    const { getByTestId } = render(
      <Hide viewport={'mobile'}>
        <div data-testid="lorem">Lorem</div>
      </Hide>
    );

    expect(getByTestId('lorem')).toBeTruthy();
  });
});
