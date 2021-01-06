import * as React from 'react';
import { Paper } from './Paper';
import { Body, Button, SelectField } from '..';
import { Switch } from './Switch';
import { FormRow } from '../forms/FormRow';
import { StatusChip } from './StatusChip';
import { MyLocation } from '../icons';
import { GridRow } from '../layouts/GridRow';
import { TextField } from './TextField';
import { ButtonBar } from './ButtonBar';

export default {
  title: 'Components/Paper',
  component: Paper,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <div style={{ margin: 120 }}>{storyFn()}</div>
    ),
  ],
};

export const Default = () => (
  <Paper>
    <Body>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet.
    </Body>
  </Paper>
);

export const WithHeadline = () => (
  <Paper headline={'Lorem ipsum'}>
    <Body>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet.
    </Body>
  </Paper>
);

export const Multiple = () => (
  <>
    <Paper gutterBottom>
      <Body>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </Body>
    </Paper>
    <Paper gutterBottom>
      <Body>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </Body>
    </Paper>
  </>
);

export const FormExample = () => (
  <GridRow gridVariant={'4-8'}>
    <Paper>
      <Body>Form title</Body>
      <Body variant={'body2'} color={'textSecondary'} gutterBottom>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </Body>
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
        <Button variant={'contained'} color={'primary'}>
          Update data
        </Button>
      </ButtonBar>
    </Paper>
  </GridRow>
);

export const ColoredBackground = () => (
  <Paper
    headline={'Lorem ipsum'}
    backgroundColor="primary"
    gutterBottom
    divider={false}
  >
    <Body color="secondary" gutterBottom={3}>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua.
    </Body>
    <FormRow gutterBottom>
      <TextField label={'Value A (Decimal)'} color="secondary" />
      <SelectField
        label={'Value B (Decimal)'}
        color="secondary"
        menuItems={[
          { value: 'foo', label: 'foo' },
          { value: 'bar', label: 'bar' },
        ]}
      />
    </FormRow>
    <Button color="secondary">Lorem</Button>
  </Paper>
);

export const WithImage = () => {
  return (
    <Paper
      headline={'Lorem ipsum'}
      backgroundColor="primary"
      gutterBottom
      divider={false}
      image="https://via.placeholder.com/150"
    >
      <GridRow gridVariant="4-4-4" gutterBottom={true}>
        <TextField label={'Value A (Decimal)'} color="secondary" />
        <SelectField
          label={'Value B (Decimal)'}
          color="secondary"
          menuItems={[
            { value: 'foo', label: 'foo' },
            { value: 'bar', label: 'bar' },
          ]}
        />
        <Button color="secondary">Lorem ipsum</Button>
      </GridRow>
    </Paper>
  );
};
