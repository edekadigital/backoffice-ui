import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { Heading } from '..';

const headingContent = 'test content';
const headingTestId = 'heading-test-id';
describe('<Heading />', () => {
  afterEach(cleanup);

  it('should render the heading component', () => {
    const { getByText } = render(
      <Heading>
        {headingContent}
      </Heading>);

    expect(getByText(headingContent)).toBeTruthy();
  });

  it('should render the heading component with secondary color', () => {
    const { getByTestId } = render(
      <Heading
        color={'secondary'}
        data-testid={headingTestId}
      >
        {headingContent}
      </Heading>
    );

    expect(getByTestId(headingTestId).textContent).toEqual(headingContent);
    expect(getByTestId(headingTestId).classList).toContain('MuiTypography-colorSecondary');
  });

  it('should render the heading component with variant h3', () => {
    const { getByTestId } = render(
      <Heading
        variant="h3"
        data-testid={headingTestId}
      >
        {headingContent}
      </Heading>
    );

    expect(getByTestId(headingTestId).textContent).toEqual(headingContent);
    expect(getByTestId(headingTestId).classList).toContain('MuiTypography-h3');
  });
});
