import * as React from 'react';

import { ConfirmationDialog, Button } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Components/ConfirmationDialog',
  component: ConfirmationDialog,
};

export const Default = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleConfirm = React.useCallback(() => {
    console.log('handleConfirm');
    setOpen(false);
  }, []);

  const handleCancel = React.useCallback(() => {
    console.log('handleCancel');
    setOpen(false);
  }, []);

  return (
    <>
      <Button onClick={handleOpen}>open dialog</Button>
      <ConfirmationDialog
        open={open}
        title="Some title"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onClose={handleClose}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};
