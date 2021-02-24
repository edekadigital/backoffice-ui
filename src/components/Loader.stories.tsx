import * as React from 'react';
import { GridRow } from '..';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { Loader } from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
};

export const Default = () => {
  return <Loader />;
};

export const WithMessage = () => {
  return <Loader message="Lorem ipsum dolor sit amet." />;
};

export const InsideDialog = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Button onClick={() => setOpen(true)}>open dialog</Button>
      <Dialog open={open} title={'Lorem ipsum'} onClose={handleClose}>
        <GridRow gutterBottom={10} gutterTop={10}>
          <Loader message="Lorem ipsum dolor sit amet." />
        </GridRow>
      </Dialog>
    </>
  );
};
