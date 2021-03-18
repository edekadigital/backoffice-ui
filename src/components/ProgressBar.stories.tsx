import { Button } from '@material-ui/core';
import * as React from 'react';
import { GridRow, Page } from '..';
import { ProgressBarColors, ProgressBar } from './ProgressBar';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
};

export const Default = () => {
  return <ProgressBar headline="Lorem Ipsum" description="Ipsum" value={10} />;
};

export const WithColorSuccess = () => {
  return (
    <ProgressBar
      headline="Lorem Ipsum"
      description="Ipsum"
      value={60}
      color="success"
    />
  );
};

export const WithChangingProps = () => {
  const [value, setValue] = React.useState(0);

  return (
    <>
      <ProgressBar
        headline="Headline"
        description={`${value} von 100`}
        value={value}
        color={(value >= 50 ? 'success' : 'primary') as ProgressBarColors}
      />
      <Button onClick={() => (value < 100 ? setValue(value + 10) : null)}>
        +
      </Button>
      <Button onClick={() => (value > 0 ? setValue(value - 10) : null)}>
        -
      </Button>
    </>
  );
};

export const InsideLayout = () => {
  return (
    <Page variant="narrow">
      <GridRow gridVariant="3-3-3-3" alignItems="stretch">
        <ProgressBar
          headline="Lorem ipsum dolor sit amet, consetetur sadipscing"
          description="Ipsum"
          value={10}
        />
        <ProgressBar headline="Lorem Ipsum" description="Ipsum" value={10} />
        <ProgressBar headline="Lorem Ipsum" description="Ipsum" value={10} />
        <ProgressBar headline="Lorem Ipsum" description="Ipsum" value={10} />
      </GridRow>
      <GridRow gridVariant="3-3-3-3" alignItems="stretch">
        <ProgressBar description="Ipsum" value={10} />
        <ProgressBar description="Ipsum" value={10} />
        <ProgressBar description="Ipsum" value={10} />
        <ProgressBar description="Ipsum" value={10} />
      </GridRow>
    </Page>
  );
};
