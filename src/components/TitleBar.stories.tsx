import * as React from 'react';
import {
  TitleBar,
  StatusChip,
  Page,
  MoreVert,
  Button,
  Body,
  TitleBarMenuItem,
} from '..';
import { Add } from '../icons';
import { IconButton } from './IconButton';

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
      <TitleBar gutterBottom additionalContent={<>ID: 012345678</>}>
        Lorem ipsum dolor <strong>sit amet</strong>
      </TitleBar>
      <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
    </Page>
  );
};

export const WithActions = () => {
  const actions = (
    <>
      <Button
        icon={Add}
        variant="outlined"
        color={'primary'}
        onClick={() => {
          console.log('Button clicked');
        }}
      >
        Save
      </Button>
      <Button
        color="primary"
        menu={{
          splitButton: true,
          items: [{ handler: () => {}, label: 'Do something special' }],
        }}
        onClick={() => console.log('CLICK')}
      >
        Some menu button label
      </Button>
    </>
  );

  return (
    <Page>
      <TitleBar gutterBottom actions={actions}>
        Lorem ipsum dolor <strong>sit amet</strong>
      </TitleBar>
      <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
    </Page>
  );
};

export const WithActionsAndCaption = () => {
  const actions = (
    <Button
      icon={Add}
      variant="outlined"
      color={'primary'}
      onClick={() => {
        console.log('Button clicked');
      }}
    >
      Save
    </Button>
  );

  return (
    <Page>
      <TitleBar
        gutterBottom
        actions={actions}
        actionsCaption={
          <Body variant="caption" color="error">
            Caption text
          </Body>
        }
      >
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
      <>ID: 012345678 · Number: 324</>
    </>
  );

  const menu: Array<TitleBarMenuItem> = [
    {
      handler: () => console.log('clicked 1'),
      label: 'Menu item 1',
    },
    {
      handler: () => console.log('clicked 2'),
      label: 'Menu item 2',
    },
  ];

  const actions = (
    <>
      <Button
        icon={Add}
        variant="outlined"
        color={'primary'}
        onClick={() => {
          console.log('Button clicked');
        }}
      >
        Save
      </Button>
      <Button
        color="primary"
        menu={{
          splitButton: true,
          items: [{ handler: () => {}, label: 'Do something special' }],
        }}
        onClick={() => console.log('CLICK')}
      >
        Publish data
      </Button>
    </>
  );

  const actionsCaption = (
    <>
      <Body variant="caption" color="textSecondary">
        Status:&nbsp;
      </Body>
      <Body variant="caption" color="warning">
        Entwurf
      </Body>
    </>
  );

  return (
    <Page>
      <TitleBar
        onBackClick={handleBackClick}
        additionalContent={status}
        actions={actions}
        actionsCaption={actionsCaption}
        menu={menu}
        gutterBottom
      >
        Lorem ipsum dolor dolor ipsum dolor ipsum dolor
        <strong>sit amet</strong>
      </TitleBar>
      <div style={{ border: 'solid 1px', minHeight: '100vh' }}>Content</div>
    </Page>
  );
};
