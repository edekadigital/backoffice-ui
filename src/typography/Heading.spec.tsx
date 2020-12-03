import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { Heading } from '..';

const headingContent = 'test content';
describe('<Heading />', () => {
  afterEach(cleanup);

  it('should render the heading component', () => {
    const { getByText } = render(<Heading>{headingContent}</Heading>);

    expect(getByText(headingContent)).toBeTruthy();
  });
});
