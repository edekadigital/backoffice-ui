import * as React from 'react';
import { MediaUploadWidget } from '..';

export default {
  title: 'Components/MediaUploadWidget',
  component: MediaUploadWidget,
};

export const WithImageUploadExample = () => {
  return (
    <MediaUploadWidget
      cloudinaryConfig={{ uploadPreset: 'gws-dev', maxFiles: 1 }}
    ></MediaUploadWidget>
  );
};
