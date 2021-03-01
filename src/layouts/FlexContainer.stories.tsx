import * as React from 'react';
import { FlexContainer } from '..';
import { edekaBlue } from '../constants/colors';

export default {
  title: 'Layouts/FlexContainer',
  component: FlexContainer,
};

const ChildComponent: React.FC = ({ children }) => (
  <div
    style={{
      background: `${edekaBlue.main}`,
      color: 'white',
      padding: 20,
      margin: 10,
    }}
  >
    {children}
  </div>
);

const BigChildComponent: React.FC = ({ children }) => (
  <div
    style={{
      background: `${edekaBlue.main}`,
      color: 'white',
      padding: 50,
      margin: 10,
    }}
  >
    {children}
  </div>
);

const GiantChildComponent: React.FC = ({ children }) => (
  <div
    style={{
      background: `${edekaBlue.main}`,
      color: 'white',
      padding: 80,
      margin: 10,
    }}
  >
    {children}
  </div>
);

export const Default = () => (
  <FlexContainer>
    <ChildComponent>Item 1</ChildComponent>
    <ChildComponent>Item 2</ChildComponent>
    <ChildComponent>Item 3</ChildComponent>
  </FlexContainer>
);

export const WithoutPaddingLeftAndRightDisabled = () => (
  <FlexContainer disableGutters={true}>
    <ChildComponent>Item 1</ChildComponent>
    <ChildComponent>Item 2</ChildComponent>
    <ChildComponent>Item 3</ChildComponent>
  </FlexContainer>
);

export const WithGutterBottomAndGutterTop = () => (
  <>
    <FlexContainer gutterBottom={true} gutterTop={true}>
      <ChildComponent>Item 1</ChildComponent>
      <ChildComponent>Item 2</ChildComponent>
      <ChildComponent>Item 3</ChildComponent>
    </FlexContainer>
    <FlexContainer gutterBottom={true} gutterTop={true}>
      <ChildComponent>Item 1</ChildComponent>
      <ChildComponent>Item 2</ChildComponent>
      <ChildComponent>Item 3</ChildComponent>
    </FlexContainer>
  </>
);

export const WithItemsAligned = () => (
  <>
    <FlexContainer gutterBottom={true} gutterTop={true} align="start">
      <ChildComponent>Item 1</ChildComponent>
      <BigChildComponent>Item 2</BigChildComponent>
      <GiantChildComponent>Item 3</GiantChildComponent>
    </FlexContainer>
    <FlexContainer gutterBottom={true} gutterTop={true} align="end">
      <ChildComponent>Item 1</ChildComponent>
      <BigChildComponent>Item 2</BigChildComponent>
      <GiantChildComponent>Item 3</GiantChildComponent>
    </FlexContainer>
  </>
);

export const WithItemsJustified = () => (
  <>
    <FlexContainer gutterBottom={true} gutterTop={true} justify="right">
      <ChildComponent>Right 1</ChildComponent>
      <ChildComponent>Right 2</ChildComponent>
      <ChildComponent>Right 3</ChildComponent>
    </FlexContainer>
    <FlexContainer gutterBottom={true} gutterTop={true} justify="space-between">
      <ChildComponent>Space between 1</ChildComponent>
      <ChildComponent>Space between 2</ChildComponent>
      <ChildComponent>Space between 3</ChildComponent>
    </FlexContainer>
    <FlexContainer gutterBottom={true} gutterTop={true} justify="center">
      <ChildComponent>Center 1</ChildComponent>
      <ChildComponent>Center 2</ChildComponent>
      <ChildComponent>Center 3</ChildComponent>
    </FlexContainer>
  </>
);
