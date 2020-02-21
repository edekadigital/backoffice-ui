import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { PreformattedText } from '..';

const preContent = 'test content';

describe('<PreformattedText/>', () => {
  afterEach(cleanup);

  it('should render the preformatted text component', () => {
    const { getByText } = render(
      <PreformattedText>{preContent}</PreformattedText>
    );

    expect(getByText(preContent)!).toBeTruthy();
  });
});
