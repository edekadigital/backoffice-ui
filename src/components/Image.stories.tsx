import * as React from 'react';

import { Image, ImageSource } from './Image';

export default {
  title: 'Components/Image',
  component: Image,
};

export const Default = () => (
  <Image
    src="https://via.placeholder.com/1920x1080/000000/404040"
    alt="Some alt text"
  />
);

export const ModeHeight = () => (
  <div style={{ position: 'relative', height: '60px' }}>
    <Image
      mode="height"
      src="https://via.placeholder.com/400x100/000000/404040"
      alt="Some alt text"
    />
  </div>
);

export const Sources = () => {
  const sources: ImageSource[] = [
    {
      media: '(min-width: 600px)',
      srcSet: 'https://via.placeholder.com/1920x1080/000000/404040',
    },
    {
      srcSet: 'https://via.placeholder.com/720x720/000000/404040',
    },
  ];
  return (
    <Image
      sources={sources}
      src="https://via.placeholder.com/1920x1080/000000/404040"
      alt="Some alt text"
    />
  );
};

export const ModeCover = () => (
  <div style={{ position: 'relative', height: '100vh' }}>
    <Image
      mode="cover"
      src="https://via.placeholder.com/1920x1080/000000/404040"
      alt="Some alt text"
    />
  </div>
);
