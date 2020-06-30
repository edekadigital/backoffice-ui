import * as React from 'react';
import { GridRow } from './GridRow';
import { edekaBlue } from '../constants/colors';

export default {
  title: 'Layouts|GridRow',
  component: GridRow,
};

const ChildComponent: React.FC = ({ children }) => (
  <div style={{ background: `${edekaBlue.main}`, color: 'white', padding: 20 }}>
    {children}
  </div>
);

export const Default = () => (
  <GridRow>
    <ChildComponent>Column 1</ChildComponent>
    <ChildComponent>Column 2</ChildComponent>
    <ChildComponent>Column 3</ChildComponent>
    <ChildComponent>Column 4</ChildComponent>
  </GridRow>
);

export const AutoOneColumn = () => (
  <GridRow>
    <ChildComponent>Column 1</ChildComponent>
  </GridRow>
);

export const AutoTwoColumns = () => (
  <GridRow>
    <ChildComponent>Column 1</ChildComponent>
    <ChildComponent>Column 2</ChildComponent>
  </GridRow>
);

export const AutoThreeColumns = () => (
  <GridRow>
    <ChildComponent>Column 1</ChildComponent>
    <ChildComponent>Column 2</ChildComponent>
    <ChildComponent>Column 3</ChildComponent>
  </GridRow>
);

export const AutoMultipleColumns = () => (
  <GridRow>
    <ChildComponent>Column 1</ChildComponent>
    <ChildComponent>Column 2</ChildComponent>
    <ChildComponent>Column 3</ChildComponent>
    <ChildComponent>Column 4</ChildComponent>
    <ChildComponent>Column 5</ChildComponent>
    <ChildComponent>Column 6</ChildComponent>
    <ChildComponent>Column 7</ChildComponent>
  </GridRow>
);

export const NarrowLeft = () => (
  <GridRow gridVariant={'narrowLeft'}>
    <ChildComponent>Column 1</ChildComponent>
    <ChildComponent>Column 2</ChildComponent>
    <ChildComponent>Column 3</ChildComponent>
    <ChildComponent>Column 4</ChildComponent>
  </GridRow>
);

export const NarrowRight = () => (
  <GridRow gridVariant={'narrowRight'}>
    <ChildComponent>Column 1</ChildComponent>
    <ChildComponent>Column 2</ChildComponent>
    <ChildComponent>Column 3</ChildComponent>
    <ChildComponent>Column 4</ChildComponent>
  </GridRow>
);
