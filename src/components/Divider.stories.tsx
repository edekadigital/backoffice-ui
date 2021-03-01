import * as React from 'react';
import { FormRow, Page } from '..';
import { Body } from '../typography/Body';
import { Divider } from './Divider';

export default {
  title: 'Components/Divider',
  component: Divider,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <div style={{ margin: 120 }}>{storyFn()}</div>
    ),
  ],
};

export const Default = () => {
  return <Divider />;
};

export const InsidePage = () => {
  return (
    <Page variant="narrow">
      <FormRow gutterBottom={true}>
        <Body>Lorem ipsum</Body>
      </FormRow>
      <Divider />
      <FormRow gutterTop={true}>
        <Body>Lorem ipsum</Body>
      </FormRow>
    </Page>
  );
};
