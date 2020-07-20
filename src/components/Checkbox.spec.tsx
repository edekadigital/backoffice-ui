import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { render } from '../test-utils';

const label = 'Some Label';

describe('<Checkbox>', () => {
  afterEach(cleanup);

  it('should render the component Checkbox', () => {
    const { container } = render(<Checkbox>{label}</Checkbox>);
    expect(container).toBeTruthy();
  });
  it('should render the component Checkbox with inverted colors', () => {
    const { container } = render(<Checkbox inverted={true}>{label}</Checkbox>);
    expect(container).toBeTruthy();
  });
});
