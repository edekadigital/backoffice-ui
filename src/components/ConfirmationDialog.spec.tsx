import * as React from 'react';
import { cleanup } from '@testing-library/react';
import { ConfirmationDialog } from '..';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';

const messageTitle = 'Title';
const cancelButton = 'Cancel';
const confirmButton = 'Confirm';
const messageText = 'Message';

const setup = (open = true) => {
  const handleConfirm = jest.fn();
  const handleCancel = jest.fn();
  const handleClose = jest.fn();

  const renderResult = render(
    <ConfirmationDialog
      open={open}
      title={messageTitle}
      message={messageText}
      confirmLabel={confirmButton}
      cancelLabel={cancelButton}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onClose={handleClose}
    />
  );

  const confirm = () => {
    userEvent.click(renderResult.getByTestId('confirmationDialog-confirm'));
  };

  const cancel = () => {
    userEvent.click(renderResult.getByTestId('confirmationDialog-cancel'));
  };

  const close = () => {
    userEvent.click(renderResult.getByTestId('confirmationDialog-close'));
  };

  return {
    renderResult,
    confirm,
    cancel,
    close,
    handleConfirm,
    handleCancel,
    handleClose,
  };
};

describe('<ConfirmationDialog/>', () => {
  afterEach(cleanup);

  it('should render the confirmation dialog component', () => {
    const { renderResult } = setup();
    const { getByText } = renderResult;

    expect(getByText(messageTitle)).toBeTruthy();
    expect(getByText(messageText)).toBeTruthy();
    expect(getByText(confirmButton)).toBeTruthy();
    expect(getByText(cancelButton)).toBeTruthy();
  });

  it('should trigger confirm callback', () => {
    const { confirm, handleConfirm } = setup();
    confirm();
    expect(handleConfirm).toBeCalledTimes(1);
  });

  it('should trigger cancel callback', () => {
    const { cancel, handleCancel } = setup();
    cancel();
    expect(handleCancel).toBeCalledTimes(1);
  });

  /*  it('should trigger close callback', () => {
    const { close, handleClose } = setup();
    close();
    expect(handleClose).toBeCalledTimes(1);
  });*/
});
