import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { ArrowDropDown, StatusChip } from '..';

describe('<StatusChip/>', () => {
  afterEach(cleanup);

  const label = 'I am a status chip';

  it('should render the status chip component', () => {
    const { getByText } = render(<StatusChip label={label} color={'info'} />);

    expect(getByText(label)!).toBeTruthy();
  });

  it('should render the status chip with icon', () => {
    const { getByText, queryByTestId } = render(
      <StatusChip label={label} icon={ArrowDropDown} />
    );
    expect(queryByTestId('statusChip-icon')).toBeTruthy();
    expect(getByText(label)!).toBeTruthy();
  });
});
