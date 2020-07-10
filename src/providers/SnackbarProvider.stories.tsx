import * as React from 'react';
import { Button, FormRow, useSnackbar } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Global|Snackbar',
};

export const Default = () => {
  const title = 'Lorem ipsum dolor sit amet.';
  const message = 'Stet clita kasd gubergren, no sea takimata.';

  const StoryComponent = () => {
    const snackbar = useSnackbar();

    const showDefault = () => snackbar.push({ title, message });
    const showInfo = () =>
      snackbar.push({ title, message }, { variant: 'info' });
    const showSuccess = () =>
      snackbar.push({ title, message }, { variant: 'success' });
    const showError = () =>
      snackbar.push({ title, message }, { variant: 'error' });
    const showWarning = () =>
      snackbar.push({ title, message }, { variant: 'warning' });

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
