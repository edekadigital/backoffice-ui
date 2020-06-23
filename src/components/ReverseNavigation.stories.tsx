import * as React from 'react';
// @edekadigital/backoffice-ui
import { ReverseNavigation, StatusChip, Check, Button, Delete, Page } from '..';

export default {
  title: 'Components|ReverseNavigation',
  component: ReverseNavigation,
};

ReverseNavigation.defaultProps = {
  floatingBackButton: true,
};

export const DefaultWithFloatingBackButton = () => {
  const handleBackClick = () => {
    console.log('handleBackClick');
  };
  return (
    <Page>
      <ReverseNavigation onBackClick={handleBackClick}>
        Lorem ipsum dolor <strong>sit amet</strong>
      </ReverseNavigation>
      <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
    </Page>
  );
};

export const WithoutFloatingBackButton = () => {
  const handleBackClick = () => {
    console.log('handleBackClick');
  };
  return (
    <Page>
      <ReverseNavigation
        onBackClick={handleBackClick}
        floatingBackButton={false}
      >
        Lorem ipsum dolor <strong>sit amet</strong>
      </ReverseNavigation>
      <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
    </Page>
  );
};

export const InfoBar = () => {
  const handleBackClick = () => {
    console.log('handleBackClick');
  };
  const label = 'Some Label';
  const status = <StatusChip label={label} icon={Check} />;
  return (
    <Page>
      <ReverseNavigation onBackClick={handleBackClick} infoBarContent={status}>
        Lorem ipsum dolor <strong>sit amet</strong>
      </ReverseNavigation>
    </Page>
  );
};

export const InfoAndActionBar = () => {
  const handleBackClick = () => {
    console.log('handleBackClick');
  };
  const label = 'Some Label';
  const status = <StatusChip label={label} icon={Check} />;
  const action = (
    <Button icon={Delete} variant="outlined">
      {label}
    </Button>
  );
  return (
    <Page>
      <ReverseNavigation
        onBackClick={handleBackClick}
        infoBarContent={status}
        action={action}
      >
        Lorem ipsum dolor <strong>sit amet</strong>
      </ReverseNavigation>
    </Page>
  );
};
