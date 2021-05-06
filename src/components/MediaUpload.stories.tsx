import * as React from 'react';
import { MediaUpload } from '..';

export default {
  title: 'Components/MediaUpload',
  component: MediaUpload,
};

export const WithImageUploadExample = () => {
  return (
    <MediaUpload
      cloudinaryConfig={{ uploadPreset: 'gws-dev', maxFiles: 1 }}
    ></MediaUpload>
  );
};
