import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import * as React from 'react';
import { Dialog } from '..';
import userEvent from '@testing-library/user-event';

describe('<Dialog/>', () => {
  afterEach(cleanup);

  it('should render the dialog component', () => {
    const title = 'Foo';
    const content = 'bar';
    const { getByTestId } = render(
      <Dialog title={title} open>
        {content}
      </Dialog>
    );

    expect(getByTestId('dialog')).toBeTruthy();
    expect(getByTestId('dialog-title').textContent).toBe(title);
    expect(getByTestId('dialog-content').textContent).toBe(content);
  });

  it('should be possible to close the dialog by clicking the close button', () => {
    const title = 'Foo';
    const content = 'bar';
    const closeFn = jest.fn();
    const { getByTestId } = render(
      <Dialog title={title} open onClose={closeFn}>
        {content}
      </Dialog>
    );
    expect(getByTestId('dialog-close')).toBeTruthy();
    userEvent.click(getByTestId('dialog-close'));
    expect(closeFn).toHaveBeenCalledTimes(1);
  });
});
