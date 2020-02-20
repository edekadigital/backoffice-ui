import * as React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { render } from '../test-utils';
import { Check, ReverseNavigation, StatusChip } from '..';

const label = 'Button Label';
const reverseNaviContent = 'Lorem ipsum dolor';

describe('<ReverseNavigation/>', () => {
  afterEach(cleanup);

  it('should render the reverse navigation component', () => {
    const onClick = () => {};

    const { getByTestId } = render(
      <ReverseNavigation infoBarContent={'test'} onBackClick={onClick} />
    );

    expect(getByTestId('reverseNavigation-infoBar')).toBeTruthy();
    expect(getByTestId('reverseNavigation-infoBar').textContent).toEqual(
      'test'
    );
  });

  it('should render the reverse navigation component with gutterbuttom', () => {
    const onClick = () => {};
    const status = <StatusChip label={label} icon={Check} />;
    const action = 'button rendered';

    const { getByText, getByTestId } = render(
      <ReverseNavigation
        infoBarContent={status}
        onBackClick={onClick}
        gutterBottom={true}
        floatingBackButton={false}
        action={action}
      />
    );

    expect(getByText('button rendered')).toBeTruthy();
    expect(getByTestId('reverseNavigation-infoBar')).toBeTruthy();
  });

  it('should trigger onClick callback for reverse navigation', () => {
    let clicked = false;
    const onClick = () => {
      clicked = true;
    };

    const { getByTestId } = render(<ReverseNavigation onBackClick={onClick} />);

    fireEvent.click(getByTestId('reverseNavigation-back'));
    expect(clicked).toBe(true);
  });

  it('should trigger onClick callback for reverse navigation with variant narrow', () => {
    let clicked = false;
    const onClick = () => {
      clicked = true;
    };

    const { getByTestId } = render(<ReverseNavigation onBackClick={onClick} />);

    fireEvent.click(getByTestId('reverseNavigation-back'));
    expect(clicked).toBe(true);
  });

  it('should render the reverse navigation component with children', () => {
    const onClick = () => {};

    const { getByTestId } = render(
      <ReverseNavigation infoBarContent={'test'} onBackClick={onClick}>
        <p data-testid="p-element">{reverseNaviContent}</p>
      </ReverseNavigation>
    );

    expect(getByTestId('p-element')!.textContent).toEqual(reverseNaviContent);
  });
});
