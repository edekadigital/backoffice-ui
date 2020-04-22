import * as React from 'react';

import { cleanup } from '@testing-library/react';
import { CheckboxDark, CheckboxLight } from './Checkbox';
import { render } from '../test-utils';

const label = 'Some Label';

describe('<Checkbox>', () => {
  afterEach(cleanup);

  it('should render the component CheckboxLight', () => {
    const { container } = render(<CheckboxLight>{label}</CheckboxLight>);
    expect(container).toBeTruthy();
  });
  it('should render the component CheckboxDark', () => {
    const { container } = render(<CheckboxDark>{label}</CheckboxDark>);
    expect(container).toBeTruthy();
  });
});
