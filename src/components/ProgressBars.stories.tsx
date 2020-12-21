import { Button } from '@material-ui/core';
import * as React from 'react';
import {
  ProgressBarColors,
  ProgressBarItem,
  ProgressBars,
} from './ProgressBars';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBars,
};

const progressBars: ProgressBarItem[] = [
  {
    headline: 'Lorem Ipsum',
    description: 'Ipsum',
    value: 10,
  },
  { headline: 'Dolor', description: 'Ipsum', value: 40 },
  { headline: 'Sit Amet', description: 'Ipsum', value: 90 },
];

const progressBarsWithColors: ProgressBarItem[] = [
  {
    headline: 'Lorem Ipsum',
    description: 'Ipsum',
    value: 10,
  },
  { headline: 'Dolor', description: 'Ipsum', color: 'success', value: 100 },
  { headline: 'Sit Amet', description: 'Ipsum', color: 'error', value: 100 },
];

export const Default = () => {
  return <ProgressBars items={progressBars} />;
};

export const WithErrorAndSuccess = () => {
  return <ProgressBars items={progressBarsWithColors} />;
};

export const WithChangingProps = () => {
  const [value, setValue] = React.useState(0);

  const items = React.useMemo(
    () => [
      {
        headline: 'Headline',
        description: `${value} von 100`,
        value: value,
        color: (value >= 50 ? 'success' : 'primary') as ProgressBarColors,
      },
    ],
    [value]
  );

  return (
    <>
      <ProgressBars items={items} />
      <Button onClick={() => (value < 100 ? setValue(value + 10) : null)}>
        +
      </Button>
      <Button onClick={() => (value > 0 ? setValue(value - 10) : null)}>
        -
      </Button>
    </>
  );
};
