import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import { ArrowDropDown, StatusChip } from '..';

describe('<StatusChip/>', () => {
  afterEach(cleanup);

  const label = 'I am a status chip';

  it('should render the status chip component', () => {
    const { container } = render(
      <StatusChip
        label={label}
        color={'info'}
      />);
    expect(container.textContent).toEqual(label);
  });

  it('should render the status chip with icon', () => {
    const { container } = render(
      <StatusChip
        label={label}
        icon={ArrowDropDown}
      />
    );
    const icon = container.querySelector<HTMLButtonElement>('svg');
    expect(icon!).toBeTruthy();
  });
});
