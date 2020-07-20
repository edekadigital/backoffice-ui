import * as React from 'react';
import { Button, useSnackbar } from '..'; // @edekadigital/backoffice-ui

export default {
  title: 'Global|Snackbar',
};

export const Default = () => {
  const message = 'Stet clita kasd gubergren, no sea takimata.';

  const StoryComponent = () => {
    const snackbar = useSnackbar();
    const showDefault = () => snackbar.push({ message });
    return <Button onClick={showDefault}>default</Button>;
  };

  return <StoryComponent />;
};

export const withTitle = () => {
  const title = 'Lorem ipsum dolor sit amet.';
  const message = 'Stet clita kasd gubergren, no sea takimata.';

  const StoryComponent = () => {
    const snackbar = useSnackbar();
    const showDefault = () => snackbar.push({ title, message });

    return <Button onClick={showDefault}>default</Button>;
  };
  return <StoryComponent />;
};

export const customAutoHideDuration = () => {
  const title = 'Lorem ipsum dolor sit amet.';
  const message = 'Stet clita kasd gubergren, no sea takimata.';

  const StoryComponent = () => {
    const snackbar = useSnackbar();
    const showDefault = () =>
      snackbar.push({ title, message }, { autoHideDuration: 1000 });

    return <Button onClick={showDefault}>default</Button>;
  };
  return <StoryComponent />;
};

export const sticky = () => {
  const title = 'Lorem ipsum dolor sit amet.';
  const message = 'Stet clita kasd gubergren, no sea takimata.';

  const StoryComponent = () => {
    const snackbar = useSnackbar();
    const showDefault = () =>
      snackbar.push({ title, message }, { autoHideDuration: null });

    return <Button onClick={showDefault}>default</Button>;
  };
  return <StoryComponent />;
};

export const positionTop = () => {
  const title = 'Lorem ipsum dolor sit amet.';
  const message = 'Stet clita kasd gubergren, no sea takimata.';

  const StoryComponent = () => {
    const snackbar = useSnackbar();
    const showDefault = () =>
      snackbar.push({ title, message }, { position: 'top' });

    return <Button onClick={showDefault}>default</Button>;
  };
  return <StoryComponent />;
};

export const Info = () => {
  const title = 'Lorem ipsum dolor sit amet.';
  const message = 'Stet clita kasd gubergren, no sea takimata.';

  const StoryComponent = () => {
    const snackbar = useSnackbar();
    const showDefault = () =>
      snackbar.push({ title, message }, { variant: 'info' });

    return <Button onClick={showDefault}>Info</Button>;
  };
  return <StoryComponent />;
};

export const Warning = () => {
  const title = 'Lorem ipsum dolor sit amet.';
  const message = 'Stet clita kasd gubergren, no sea takimata.';

  const StoryComponent = () => {
    const snackbar = useSnackbar();
    const showDefault = () =>
      snackbar.push({ title, message }, { variant: 'warning' });

    return <Button onClick={showDefault}>Warning</Button>;
  };
  return <StoryComponent />;
};

export const Error = () => {
  const title = 'Lorem ipsum dolor sit amet.';
  const message = 'Stet clita kasd gubergren, no sea takimata.';

  const StoryComponent = () => {
    const snackbar = useSnackbar();
    const showDefault = () =>
      snackbar.push({ title, message }, { variant: 'error' });

    return <Button onClick={showDefault}>Error</Button>;
  };
  return <StoryComponent />;
};

export const Success = () => {
  const title = 'Lorem ipsum dolor sit amet.';
  const message = 'Stet clita kasd gubergren, no sea takimata.';

  const StoryComponent = () => {
    const snackbar = useSnackbar();
    const showDefault = () =>
      snackbar.push({ title, message }, { variant: 'success' });

    return <Button onClick={showDefault}>Success</Button>;
  };
  return <StoryComponent />;
};
