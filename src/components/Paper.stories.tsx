import * as React from 'react';
import { Paper } from './Paper';
import { Heading, Body } from '..';

export default {
  title: 'Components|Paper',
  component: Paper,
};

export const Default = () => (
  <Paper>
    <Heading variant={'h5'} gutterBottom={true}>
      Lorem Ipsum
    </Heading>
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
      <Heading variant={'h5'} gutterBottom={true}>
        Lorem Ipsum
      </Heading>
      <Body>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </Body>
    </Paper>
    <Paper gutterBottom>
      <Heading variant={'h5'}>Lorem Ipsum</Heading>
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
