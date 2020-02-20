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
    const { getByText, container } = render(
      <StatusChip label={label} icon={ArrowDropDown} />
    );

    const progressResult2 = container.querySelector<HTMLOrSVGImageElement>(
      '[role="presentation"]'
    );
    expect(progressResult2).toBeTruthy();
    expect(getByText(label)!).toBeTruthy();
  });
});
