import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { Paper, Image } from '..';
import { render, setMatchMedia } from '../test-utils';

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

  it('should render the paper component with headline', () => {
    const headline = 'Foo';
    const { getByTestId } = render(<Paper headline={headline}>Lorem</Paper>);
    expect(getByTestId('paper-headline').textContent).toBe(headline);
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

  it('should render with an image', () => {
    const headline = 'Foo';
    setMatchMedia('desktop');
    const { getByTestId } = render(
      <Paper headline={headline} image="https://via.placeholder.com/150">
        Lorem
      </Paper>
    );
    expect(getByTestId('paper-image')).toBeTruthy();
  });

  it('should render without divider', () => {
    const headline = 'Foo';
    const { getByTestId } = render(
      <Paper headline={headline} divider={false}>
        Lorem
      </Paper>
    );
    expect(getByTestId('spacer')).toBeTruthy();
  });
});
