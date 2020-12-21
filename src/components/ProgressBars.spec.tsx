import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { ProgressBarColors, ProgressBars } from './ProgressBars';

describe('<ProgressBars />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const item = [{ headline: 'Foo', description: 'Bar', value: 10 }];
    const { getByTestId } = render(<ProgressBars items={item} />);
    expect(getByTestId('progressBars')).toBeTruthy();
    expect(getByTestId('progressBar-item-0')).toBeTruthy();
    expect(getByTestId('progressBar-item-0-headline').textContent).toBe(
      item[0].headline
    );
    expect(getByTestId('progressBar-item-0-description').textContent).toBe(
      item[0].description
    );

    expect(
      getByTestId('progressBar-item-0-bar').getAttribute('aria-valuenow')
    ).toBe(item[0].value.toString());
  });

  it('should not render headline and descriptin when they are not given', () => {
    const item = [{ value: 10 }];
    const { queryByTestId, getByTestId } = render(
      <ProgressBars items={item} />
    );
    expect(getByTestId('progressBar-item-0')).toBeTruthy();
    expect(queryByTestId('progressBar-item-0-headline')).toBeFalsy();
    expect(queryByTestId('progressBar-item-0-description')).toBeFalsy();
    expect(
      getByTestId('progressBar-item-0-bar').getAttribute('aria-valuenow')
    ).toBe(item[0].value.toString());
  });

  it('should render colors correctly', () => {
    const item = [
      { value: 10, color: 'error' as ProgressBarColors },
      { value: 10, color: 'success' as ProgressBarColors },
    ];
    const { getByTestId } = render(<ProgressBars items={item} />);
    expect(
      getByTestId('progressBar-item-0-bar').classList.contains(
        'makeStyles-progressBackground-18'
      )
    ).toBeTruthy();
    expect(
      getByTestId('progressBar-item-1-bar').classList.contains(
        'makeStyles-progressBackground-20'
      )
    ).toBeTruthy();
  });
});
