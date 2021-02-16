import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ButtonBar } from '..';

describe('<ButtonBar />', () => {
  afterEach(cleanup);

  it('should render the button bar component', () => {
    const { getByTestId } = render(
      <ButtonBar>
        <div>Lorem</div>
        <div>Ipsum</div>
      </ButtonBar>
    );

    expect(getByTestId('buttonBar-item-0')).toBeTruthy();
    expect(getByTestId('buttonBar-item-0').textContent).toBe('Lorem');
    expect(getByTestId('buttonBar-item-1')).toBeTruthy();
    expect(getByTestId('buttonBar-item-1').textContent).toBe('Ipsum');
  });

  it('should render the button bar right aligned', () => {
    const { getByTestId } = render(
      <ButtonBar align={'right'}>
        <div>Lorem</div>
      </ButtonBar>
    );
    expect(getByTestId('buttonBar-item-0')).toBeTruthy();
    expect(getByTestId('buttonBar-item-0').textContent).toBe('Lorem');
  });

  it('should render the button bar centered aligned', () => {
    const { getByTestId } = render(
      <ButtonBar align={'center'}>
        <div>Lorem</div>
      </ButtonBar>
    );
    expect(getByTestId('buttonBar-item-0')).toBeTruthy();
    expect(getByTestId('buttonBar-item-0').textContent).toBe('Lorem');
  });
});
