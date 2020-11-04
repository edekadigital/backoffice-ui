import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { Spacer } from '..';
import { render } from '../test-utils';

describe('<Spacer />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { getByTestId } = render(<Spacer />);
    expect(getByTestId('spacer')).toBeTruthy();
  });

  it('should render the component as nested element', () => {
    const { getByTestId } = render(
      <>
        <div data-testid="element1" />
        <Spacer vertical={2} />
        <div data-testid="element2" />
      </>
    );
    expect(getByTestId('spacer')).toBeTruthy();
    expect(getByTestId('element1')).toBeTruthy();
    expect(getByTestId('element2')).toBeTruthy();
  });
});
