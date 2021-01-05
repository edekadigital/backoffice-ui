import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { ProgressBar, ProgressBarColors } from './ProgressBar';

describe('<ProgressBars />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const item = { headline: 'Foo', description: 'Bar', value: 10 };
    const { getByTestId } = render(
      <ProgressBar
        headline={item.headline}
        description={item.description}
        value={item.value}
      />
    );
    expect(getByTestId('progressBar')).toBeTruthy();
    expect(getByTestId('progressBar-headline').textContent).toBe(item.headline);
    expect(getByTestId('progressBar-description').textContent).toBe(
      item.description
    );

    expect(getByTestId('progressBar-bar').getAttribute('aria-valuenow')).toBe(
      item.value.toString()
    );
  });

  it('should not render headline and descriptin when they are not given', () => {
    const item = { value: 10, color: 'success' };
    const { queryByTestId, getByTestId } = render(
      <ProgressBar value={item.value} color={item.color as ProgressBarColors} />
    );
    expect(getByTestId('progressBar')).toBeTruthy();
    expect(queryByTestId('progressBar-headline')).toBeFalsy();
    expect(queryByTestId('progressBar-description')).toBeFalsy();
    expect(getByTestId('progressBar-bar').getAttribute('aria-valuenow')).toBe(
      item.value.toString()
    );
  });
});
