import * as React from 'react';
import { render } from '../test-utils';
import { cleanup } from '@testing-library/react';
import { AssignmentTable } from './AssignmentTable';

describe('<AssignmentTable />', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { container } = render(<AssignmentTable columns={[]} rows={[]} />);
    expect(container).toBeTruthy();
  });
});
