import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { FlexContainer } from '..';

describe('<FlexContainer />', () => {
  afterEach(cleanup);

  it('should render the flexContainer component', () => {
    const { getByTestId } = render(
      <FlexContainer>
        <div>Child</div>
      </FlexContainer>
    );
    expect(getByTestId('flex-container')).toBeTruthy();
  });

  it('should render the flexContainer component with props justify right and align end', () => {
    const { getByTestId } = render(
      <FlexContainer justify="right" align="end">
        <div>Child</div>
      </FlexContainer>
    );
    expect(getByTestId('flex-container')).toBeTruthy();
  });

  it('should render the flexContainer component with props justify space between and align center', () => {
    const { getByTestId } = render(
      <FlexContainer justify="space-between" align="center">
        <div>Child</div>
      </FlexContainer>
    );
    expect(getByTestId('flex-container')).toBeTruthy();
  });

  it('should render the flexContainer component with gutterBottom and gutterTop with type number', () => {
    const { getByTestId } = render(
      <FlexContainer gutterBottom={2} gutterTop={2}>
        <div>Child</div>
      </FlexContainer>
    );
    expect(getByTestId('flex-container')).toBeTruthy();
  });

  it('should render the flexContainer component with gutterBottom and gutterTop set to true', () => {
    const { getByTestId } = render(
      <FlexContainer gutterBottom={true} gutterTop={true}>
        <div>Child</div>
      </FlexContainer>
    );
    expect(getByTestId('flex-container')).toBeTruthy();
  });
});
