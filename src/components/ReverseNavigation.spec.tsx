import * as React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { render } from '../test-utils';
import { Button, Check, Delete, ReverseNavigation, StatusChip } from '..';

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
    const action = <Button children={label} icon={Delete} variant="outlined" />;

    const { container, getByTestId } = render(
      <ReverseNavigation
        infoBarContent={status}
        onBackClick={onClick}
        gutterBottom={true}
        floatingBackButton={false}
        action={action}
      />
    );

    const buttonResult = container.querySelectorAll<HTMLButtonElement>(
      'button'
    );
    expect(buttonResult.item(1)!.classList[3]).toContain(
      'MuiButton-outlinedPrimary'
    );
    expect(buttonResult.item(1)!.children.item(0)!.textContent).toContain(
      label
    );
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

    const { container } = render(
      <ReverseNavigation infoBarContent={'test'} onBackClick={onClick}>
        <p>{reverseNaviContent}</p>
      </ReverseNavigation>
    );

    const childrenResult = container.querySelectorAll<HTMLParagraphElement>(
      'p'
    );
    expect(childrenResult.item(0)!.textContent).toEqual(reverseNaviContent);
  });
});
