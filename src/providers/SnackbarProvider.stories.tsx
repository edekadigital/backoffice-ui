import * as React from 'react';
import { Button, FormRow, useSnackbar } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Global|Snackbar',
};

export const Snackbar = () => {
  const message = 'Lorem ipsum dolor sit amet.';

  const StoryComponent = () => {
    const snackbar = useSnackbar();

    const showDefault = () => snackbar.push(message);
    const showInfo = () => snackbar.push(message, { variant: 'info' });
    const showSuccess = () => snackbar.push(message, { variant: 'success' });
    const showError = () => snackbar.push(message, { variant: 'error' });
    const showWarning = () => snackbar.push(message, { variant: 'warning' });

    return (
      <FormRow>
        <Button onClick={showDefault}>default</Button>
        <Button onClick={showInfo}>info</Button>
        <Button onClick={showSuccess}>success</Button>
        <Button onClick={showError}>error</Button>
        <Button onClick={showWarning}>warning</Button>
      </FormRow>
    );
  };

  return <StoryComponent />;
};
