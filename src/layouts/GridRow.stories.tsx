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
  </GridRow>
);

export const VariantA = () => (
  <GridRow gridVariant={'6-6'}>
    <ChildComponent>Column 1</ChildComponent>
    <ChildComponent>Column 2</ChildComponent>
  </GridRow>
);
export const VariantB = () => (
  <GridRow gridVariant={'4-8'}>
    <ChildComponent>Column 1</ChildComponent>
    <ChildComponent>Column 2</ChildComponent>
  </GridRow>
);
export const VariantC = () => (
  <GridRow gridVariant={'8-4'}>
    <ChildComponent>Column 1</ChildComponent>
    <ChildComponent>Column 2</ChildComponent>
  </GridRow>
);
export const VariantD = () => (
  <GridRow gridVariant={'4-4-4'}>
    <ChildComponent>Column 1</ChildComponent>
    <ChildComponent>Column 2</ChildComponent>
    <ChildComponent>Column 3</ChildComponent>
  </GridRow>
);
export const VariantE = () => (
  <GridRow gridVariant={'3-3-3-3'}>
    <ChildComponent>Column 1</ChildComponent>
    <ChildComponent>Column 2</ChildComponent>
    <ChildComponent>Column 3</ChildComponent>
    <ChildComponent>Column 4</ChildComponent>
  </GridRow>
);

export const MultipleGridRows = () => (
  <>
    <GridRow gridVariant={'6-6'} gutterBottom>
      <ChildComponent>Row 1 Column 1</ChildComponent>
      <ChildComponent>Row 1 Column 2</ChildComponent>
    </GridRow>
    <GridRow gridVariant={'12'} gutterBottom>
      <ChildComponent>Row 2 Column 1</ChildComponent>
    </GridRow>
    <GridRow gridVariant={'4-4-4'}>
      <ChildComponent>Row 3 Column 1</ChildComponent>
      <ChildComponent>Row 3 Column 2</ChildComponent>
      <ChildComponent>Row 3 Column 3</ChildComponent>
    </GridRow>
  </>
);

VariantA.story = {
  name: 'Variant "6-6"',
};

VariantB.story = {
  name: 'Variant "4-8"',
};

VariantC.story = {
  name: 'Variant "8-4"',
};

VariantD.story = {
  name: 'Variant "4-4-4"',
};

VariantE.story = {
  name: 'Variant "3-3-3-3"',
};
