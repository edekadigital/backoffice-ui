import * as React from 'react';
import {
  Switch,
  TextField,
  FormRow,
  StatusChip,
  MyLocation,
  ButtonBar,
} from '..';
import { Button } from './Button';
import { Dialog } from './Dialog';

export default {
  title: 'Components|Dialog',
  component: Dialog,
};

export const Default = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>open dialog</Button>
      <Dialog open={open} title={'Lorem ipsum'}>
        <Button onClick={() => setOpen(false)}>Click me</Button>
      </Dialog>
    </>
  );
};

export const WithCloseButton = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Button onClick={handleOpen}>open dialog</Button>
      <Dialog open={open} onClose={handleClose} title={'Lorem ipsum'}>
        Lorem ipsum
      </Dialog>
    </>
  );
};

export const FormExample = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Button onClick={handleOpen}>open dialog</Button>
      <Dialog open={open} onClose={handleClose} title={'Lorem ipsum'}>
        <FormRow justify={'space-between'} gutterBottom>
          <Switch label={'Automatic'} />
          <StatusChip label={'Manual'} icon={MyLocation} size={'small'} />
        </FormRow>
        <FormRow gutterBottom>
          <TextField label={'Value A (Decimal)'} />
        </FormRow>
        <FormRow gutterBottom>
          <TextField label={'Value B (Decimal)'} />
        </FormRow>
        <ButtonBar align={'right'}>
          <Button variant={'contained'} color={'primary'} onClick={handleClose}>
            Update data
          </Button>
        </ButtonBar>
      </Dialog>
    </>
  );
};
