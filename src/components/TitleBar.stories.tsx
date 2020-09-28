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

export default {
  title: 'Components|TitleBar',
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

export const WithReverseNavigationWithoutFloating = () => {
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

export const WithInfo = () => {
  return (
    <Page>
      <TitleBar gutterBottom info={'Rendered successfully'}>
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
  const status = 'ID: 012345678';

  const info = (
    <StatusChip
      label={'Changes saved'}
      icon={CheckCircleFilled}
      color={'success'}
      size={'small'}
      variant={'naked'}
    />
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
        info={info}
        gutterBottom
      >
        Lorem ipsum dolor <strong>sit amet</strong>
      </TitleBar>
      <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
    </Page>
  );
};
