import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { Paper } from '..';
import { render } from '../test-utils';

describe('<Paper />', () => {
  afterEach(cleanup);

  it('should render the paper component', () => {
    const { getByTestId } = render(
      <Paper>
        <div data-testid={'paperContent'}>Lorem</div>
      </Paper>
    );
    expect(getByTestId('paper')).toBeTruthy();
    expect(getByTestId('paperContent').textContent).toBe('Lorem');
  });

  it('should render the paper component with bottom margin', () => {
    const { getByTestId } = render(
      <Paper gutterBottom={true}>
        <div data-testid={'paperContent'}>Lorem</div>
      </Paper>
    );
    expect(getByTestId('paper')).toBeTruthy();
    expect(getByTestId('paperContent').textContent).toBe('Lorem');
  });
});
