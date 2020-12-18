import * as React from 'react';
import { ProgressBarItem, ProgressBars } from './ProgressBars';

export default {
  title: 'Components/ProgressBarItem',
  component: ProgressBars,
};

const progressBars: ProgressBarItem[] = [
  {
    headline: 'Lorem Ipsum',
    description: 'Ipsum',
    value: 10,
    color: 'primary',
  },
  { headline: 'Dolor', description: 'Ipsum', value: 40, color: 'primary' },
  { headline: 'Sit Amet', description: 'Ipsum', value: 90, color: 'primary' },
];

const progressBarsWithColors: ProgressBarItem[] = [
  {
    headline: 'Lorem Ipsum',
    description: 'Ipsum',
    value: 10,
    color: 'primary',
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
