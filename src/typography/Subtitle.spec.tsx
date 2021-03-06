import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { Subtitle } from '..';

const subtitleContent = 'test content';

describe('<Subtitle/>', () => {
  afterEach(cleanup);

  it('should render the subtitle component', () => {
    const { getByText } = render(<Subtitle>{subtitleContent}</Subtitle>);

    expect(getByText(subtitleContent)!).toBeTruthy();
  });
});
