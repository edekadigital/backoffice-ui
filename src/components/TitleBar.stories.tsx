import * as React from 'react';
import {
  TitleBar,
  StatusChip,
  CheckCircleFilled,
  Page,
  TitleBarActions,
  Star,
  MoreVert,
  OpenInNew,
  Logout,
} from '..';
import { Body } from '../typography/Body';

export default {
  title: 'Components/TitleBar',
  component: TitleBar,
};

export const Default = () => {
  return (
    <Page>
      <TitleBar gutterBottom>
        Lorem ipsum dolor <strong>sit amet</strong>
      </TitleBar>
      <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
    </Page>
  );
};

export const WithReverseNavigation = () => {
  const handleBackClick = () => {
    console.log('handleBackClick');
  };
  return (
    <Page>
      <TitleBar gutterBottom onBackClick={handleBackClick}>
        Lorem ipsum dolor <strong>sit amet</strong>
      </TitleBar>
      <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
    </Page>
  );
};

export const WithNonFloatingReverseNavigation = () => {
  const handleBackClick = () => {
    console.log('handleBackClick');
  };
  return (
    <Page>
      <TitleBar
        gutterBottom
        onBackClick={handleBackClick}
        floatingBackButton={false}
      >
        Lorem ipsum dolor <strong>sit amet</strong>
      </TitleBar>
      <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
    </Page>
  );
};

export const WithAdditionalContent = () => {
  return (
    <Page>
      <TitleBar gutterBottom additionalContent={'ID: 012345678'}>
        Lorem ipsum dolor <strong>sit amet</strong>
      </TitleBar>
      <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
    </Page>
  );
};

export const WithActions = () => {
  const actions: TitleBarActions = [
    {
      icon: Star,
      handler: () => console.log('some action'),
      label: 'Some action',
    },
    {
      icon: MoreVert,
      items: [
        {
          label: 'Lorem ipsum',
          icon: OpenInNew,
          handler: () => {
            console.log('loremipsum');
          },
        },
        {
          label: 'Foo Bar',
          icon: Logout,
          handler: () => {
            console.log('foobar');
          },
        },
      ],
    },
  ];

  return (
    <Page>
      <TitleBar gutterBottom actions={actions}>
        Lorem ipsum dolor <strong>sit amet</strong>
      </TitleBar>
      <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
    </Page>
  );
};

export const FullExample = () => {
  const handleBackClick = () => {
    console.log('handleBackClick');
  };
  const status = (
    <>
      <StatusChip label={'Active'} color={'success'} size={'small'} />
      <>ID: 012345678 · Teilnehmer: 324</>
    </>
  );

  const actions: TitleBarActions = [
    {
      icon: Star,
      handler: () => console.log('some action'),
      label: 'Some action',
    },
    {
      icon: MoreVert,
      items: [
        {
          label: 'Lorem ipsum',
          icon: OpenInNew,
          handler: () => {
            console.log('loremipsum');
          },
        },
        {
          label: 'Foo Bar',
          icon: Logout,
          handler: () => {
            console.log('foobar');
          },
        },
      ],
    },
  ];
  return (
    <Page>
      <TitleBar
        onBackClick={handleBackClick}
        additionalContent={status}
        actions={actions}
        gutterBottom
      >
        Lorem ipsum dolor <strong>sit amet</strong>
      </TitleBar>
      <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
    </Page>
  );
};
