import * as React from 'react';
import { Body, FormRow } from '..';
import { HighlightOffSharpIcon, Person } from '../icons';
import { Icon } from './Icon';

export default {
  title: 'Components/Icon',
  component: Icon,
};

export const Default = () => {
  return <Icon icon={Person} />;
};

export const Primary = () => {
  return <Icon color="primary" icon={Person} />;
};

export const Secondary = () => {
  return <Icon color="secondary" icon={Person} />;
};

export const Error = () => {
  return <Icon color="error" icon={Person} />;
};

export const Success = () => {
  return <Icon color="success" icon={Person} />;
};

export const Warning = () => {
  return <Icon color="warning" icon={Person} />;
};

export const Info = () => {
  return <Icon color="info" icon={Person} />;
};

export const DifferentSizes = () => {
  return (
    <>
      <Icon size="small" icon={Person} />
      <Icon icon={Person} />
      <Icon size="large" icon={Person} />
    </>
  );
};
export const IconWithText = () => (
  <FormRow>
    <>
      <Icon size="large" color="error" icon={HighlightOffSharpIcon} />
      <Body component="span">Lorem Ispum dolor sit amet.</Body>
    </>
  </FormRow>
);
