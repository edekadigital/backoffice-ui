import * as React from 'react';
import {
  Page,
  Body,
  ReverseNavigation,
  Star,
  MyLocation,
  AppBar,
  AppBarActions,
  Apps,
  Person,
  OpenInNew,
  Logout,
  Heading,
  Image,
  ImageSource,
  FavoriteBorder,
  Public,
  Notifications,
  ServiceTiles,
  ServiceTileItemProps,
} from '..'; // @edekadigital/backoffice-ui
import { PageWrapper } from './PageWrapper';
import { GridRow } from './GridRow';

export default {
  title: 'Layouts|Page',
  component: Page,
};

const Content = () => (
  <Body component="p">
    Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.
  </Body>
);

export const Default = () => {
  const Content = () => (
    <Body component="p">
      Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
      ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </Body>
  );
  return (
    <Page>
      <Content />
    </Page>
  );
};

export const Narrow = () => (
  <Page variant="narrow">
    <Content />
  </Page>
);

export const WithReverseNavigation = () => {
  const clickHandler = () => {};

  return (
    <Page paddingBottom={true}>
      <ReverseNavigation onBackClick={clickHandler} gutterBottom={true}>
        LoremIpsum
      </ReverseNavigation>
      <Content />
    </Page>
  );
};

export const FullExample = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const bitmapIcon = require('../assets/bitmap-icon.png');

  const actions: AppBarActions = [
    {
      icon: Star,
      handler: () => console.log('some action'),
    },
    {
      icon: Apps,
      menuType: 'grid',
      items: [
        {
          label: 'Lorem ipsum',
          icon: bitmapIcon,
          handler: () => {
            console.log('app 1');
          },
        },
        {
          label: 'Lorem ipsum dolor',
          icon: Star,
          handler: () => {
            console.log('app 2');
          },
        },
        {
          label: 'Lorem ipsum dolor sit amet',
          icon: bitmapIcon,
          handler: () => {
            console.log('app 3');
          },
        },
        {
          label: 'Lorem ipsum',
          icon: Star,
          handler: () => {
            console.log('app 4');
          },
        },
        {
          label: 'Lorem ipsum dolor',
          icon: bitmapIcon,
          handler: () => {
            console.log('app 5');
          },
        },
      ],
    },
    {
      icon: Person,
      menuType: 'list',
      items: [
        {
          label: 'Lorem ipsum',
          icon: OpenInNew,
          handler: () => {
            console.log('change password');
          },
        },
        {
          label: 'Lorem ipsum',
          icon: Logout,
          handler: () => {
            console.log('signout');
          },
        },
      ],
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const img2x = require('../assets/undraw-preferences-uuo-2@2x.png');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const img3x = require('../assets/undraw-preferences-uuo-2@3x.png');
  const sources: ImageSource[] = [
    {
      media: '(min-width: 600px)',
      srcSet: img3x,
    },
    {
      srcSet: img3x,
    },
  ];

  const services: ServiceTileItemProps[] = [
    {
      title: 'Tile A',
      icon: Star,
      description: 'Description - Lorem Ipsum dolor sit amet dolor ',
      buttonLabel: 'open',
      info: 'V 1.2.2',
      onClick: () => console.log('Button clicked'),
    },
    {
      title: 'Tile B',
      icon: MyLocation,
      description: 'Description - Lorem Ipsum',
      buttonLabel: 'open',
      info: 'V 1.2.2',
      onClick: () => console.log('Button clicked'),
    },
    {
      title: 'Tile C',
      icon: FavoriteBorder,
      description:
        'Description - Lorem Ipsum dolor sit amet dolor lorem Ipsum dolor avec sit amet dolor lorem',
      buttonLabel: 'open',
      info: 'V 11.1.0',
      onClick: () => console.log('Button clicked'),
    },
    {
      title: 'Tile D',
      icon: Public,
      description:
        'Description - Lorem Ipsum dolor sit amet dolor lorem Ipsum dolor avec sit amet',
      buttonLabel: 'open',
      info: 'V 0.1.2',
      onClick: () => console.log('Button clicked'),
    },
    {
      title: 'Tile E',
      icon: Notifications,
      description:
        'Description - Lorem Ipsum dolor sit amet dolor lorem Ipsum dolor avec sit amet',
      buttonLabel: 'open',
      info: 'V 10.1.1',
      onClick: () => console.log('Button clicked'),
    },
  ];

  return (
    <PageWrapper>
      <AppBar actions={actions} gutterBottom={true} color={'transparent'} />
      <Page variant={'narrow'} paddingBottom>
        <GridRow gridVariant={'4-4-4'} gutterBottom>
          <Heading variant={'h4'}>
            Wilkommen zurück in Ihrem Backoffice!
          </Heading>
          <></>
          <Image sources={sources} src={img2x} alt="Some alt text" />
        </GridRow>
        <GridRow>
          <Heading variant={'h6'}>Ihre Backoffice Anwendungen</Heading>
        </GridRow>
        <ServiceTiles services={services} />
      </Page>
    </PageWrapper>
  );
};
