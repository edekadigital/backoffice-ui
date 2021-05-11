import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ListItem, Image, ThemeProvider } from '..';
import { ArrowForward } from '../icons';
import userEvent from '@testing-library/user-event';

const altText = 'Some alt text';
const src =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';

describe('<ListItem/>', () => {
  afterEach(cleanup);

  it('should render the ListItem component', () => {
    const { getByTestId } = render(<ListItem text="Foo" subText="Bar" />);
    expect(getByTestId('listItem')).toBeTruthy();
    expect(getByTestId('listItem-text')).toBeTruthy();
  });

  it('should render the ListItem component with bullet element', () => {
    const { getByTestId } = render(
      <ListItem
        text="Foo"
        subText="Bar"
        bullet={<Image src={src} alt={altText} />}
      />
    );
    expect(getByTestId('listItem-avatar')).toBeTruthy();
  });

  it('should render the ListItem component with action', () => {
    const handler = jest.fn();
    const action = { icon: ArrowForward, handler };

    const { getByTestId } = render(
      <ThemeProvider>
        <ListItem text="Foo" subText="Bar" action={action} />
      </ThemeProvider>
    );
    expect(getByTestId('listItem-action')).toBeTruthy();

    userEvent.click(getByTestId('listItem-action-button'));

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
