import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { GridRow } from '..';
import { render } from '../test-utils';

describe('<GridRow />', () => {
  afterEach(cleanup);

  it('should render the grid row component', () => {
    const { getByTestId } = render(<GridRow />);
    expect(getByTestId('gridRow')).toBeTruthy();
  });

  it('should render the grid row component in variant "12"', () => {
    const { getByTestId } = render(
      <GridRow>
        <div data-testid="column1">column1</div>
      </GridRow>
    );
    expect(getByTestId('gridRow')).toBeTruthy();
    expect(getByTestId('gridRow-item-0')).toBeTruthy();
    expect(getByTestId('column1').textContent).toBe('column1');
  });

  it('should render the grid row component in variant "6-6"', () => {
    const { getByTestId } = render(
      <GridRow gridVariant={'6-6'}>
        <div data-testid="column1">column1</div>
        <div data-testid="column2">column2</div>
      </GridRow>
    );

    expect(getByTestId('gridRow-item-0')).toBeTruthy();
    expect(getByTestId('gridRow-item-1')).toBeTruthy();
    expect(getByTestId('column1').textContent).toBe('column1');
    expect(getByTestId('column2').textContent).toBe('column2');
  });

  it('should render the grid row component in variant "4-8"', () => {
    const { getByTestId } = render(
      <GridRow gridVariant={'4-8'}>
        <div data-testid="column1">column1</div>
        <div data-testid="column2">column2</div>
      </GridRow>
    );
    expect(getByTestId('gridRow-item-0')).toBeTruthy();
    expect(getByTestId('gridRow-item-1')).toBeTruthy();
    expect(getByTestId('gridRow-item-0')).toHaveClass('MuiGrid-grid-md-4');
    expect(getByTestId('gridRow-item-1')).toHaveClass('MuiGrid-grid-md-8');
    expect(getByTestId('column1').textContent).toBe('column1');
    expect(getByTestId('column2').textContent).toBe('column2');
  });

  it('should render the grid row component in variant "8-4"', () => {
    const { getByTestId } = render(
      <GridRow gridVariant={'8-4'}>
        <div data-testid="column1">column1</div>
        <div data-testid="column2">column2</div>
      </GridRow>
    );

    expect(getByTestId('gridRow-item-0')).toBeTruthy();
    expect(getByTestId('gridRow-item-1')).toBeTruthy();
    expect(getByTestId('gridRow-item-0')).toHaveClass('MuiGrid-grid-md-8');
    expect(getByTestId('gridRow-item-1')).toHaveClass('MuiGrid-grid-md-4');
    expect(getByTestId('column1').textContent).toBe('column1');
    expect(getByTestId('column2').textContent).toBe('column2');
  });

  it('should render the grid row component in variant "4-4-4"', () => {
    const { getByTestId } = render(
      <GridRow gridVariant={'4-4-4'}>
        <div data-testid="column1">column1</div>
        <div data-testid="column2">column2</div>
        <div data-testid="column3">column3</div>
      </GridRow>
    );

    expect(getByTestId('gridRow-item-0')).toBeTruthy();
    expect(getByTestId('gridRow-item-1')).toBeTruthy();
    expect(getByTestId('gridRow-item-2')).toBeTruthy();
    expect(getByTestId('column1').textContent).toBe('column1');
    expect(getByTestId('column2').textContent).toBe('column2');
    expect(getByTestId('column3').textContent).toBe('column3');
  });

  it('should render the grid row component in variant "3-3-3-3"', () => {
    const { getByTestId } = render(
      <GridRow gridVariant={'3-3-3-3'}>
        <div data-testid="column1">column1</div>
        <div data-testid="column2">column2</div>
        <div data-testid="column3">column3</div>
        <div data-testid="column4">column4</div>
      </GridRow>
    );

    expect(getByTestId('gridRow-item-0')).toBeTruthy();
    expect(getByTestId('gridRow-item-1')).toBeTruthy();
    expect(getByTestId('gridRow-item-2')).toBeTruthy();
    expect(getByTestId('gridRow-item-3')).toBeTruthy();
    expect(getByTestId('column1').textContent).toBe('column1');
    expect(getByTestId('column2').textContent).toBe('column2');
    expect(getByTestId('column3').textContent).toBe('column3');
    expect(getByTestId('column4').textContent).toBe('column4');
  });

  it('should render the grid row component even if there are more children provided than columns defined', () => {
    const { getByTestId } = render(
      <GridRow gridVariant={'6-6'}>
        <div data-testid="column1">column1</div>
        <div data-testid="column2">column2</div>
        <div data-testid="column3">column3</div>
      </GridRow>
    );

    expect(getByTestId('gridRow-item-0')).toBeTruthy();
    expect(getByTestId('gridRow-item-1')).toBeTruthy();
    expect(getByTestId('gridRow-item-2')).toBeTruthy();
    expect(getByTestId('column1').textContent).toBe('column1');
    expect(getByTestId('column2').textContent).toBe('column2');
    expect(getByTestId('column3').textContent).toBe('column3');
    expect(getByTestId('gridRow-item-0')).toHaveClass('MuiGrid-grid-md-6');
    expect(getByTestId('gridRow-item-1')).toHaveClass('MuiGrid-grid-md-6');
    expect(getByTestId('gridRow-item-2')).toHaveClass('MuiGrid-grid-md-6');
  });
});
