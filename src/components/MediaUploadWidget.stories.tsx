import * as React from 'react';
import {
  Body,
  CloudinaryConfigProvider,
  Formats,
  MediaUploadWidget,
  Sources,
  Image,
  ImageSource,
} from '..';

export default {
  title: 'Components/MediaUploadWidget',
  component: MediaUploadWidget,
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const img1x = require('../assets/attach-file@1x.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const img2x = require('../assets/attach-file@2x.png');
const imgSources: ImageSource[] = [
  {
    media: '(min-width: 600px)',
    srcSet: img2x,
  },
  {
    srcSet: img1x,
  },
];

const image = (
  <Image
    src={img2x}
    sources={imgSources}
    alt="attach-file-image"
    mode="height"
  />
);

const sources: Sources[] = ['url'];

const getConfig: CloudinaryConfigProvider = async () => {
  return {
    uploadPreset: 'upload-preset',
    uploadSignature: 'signature',
    uploadSignatureTimestamp: 1637238,
    apiKey: 'apiKey',
    cloudName: 'cloud',
    sources,
    maxFiles: 1,
  };
};

const handleError = () => {
  window.alert(
    'Image cannnot be uploaded, configuration of widget is just for demo'
  );
};

const images = [
  {
    thumbnail_url: 'https://via.placeholder.com/61x34.jpeg/a9a4a4',
    public_id: 'public_id1',
    format: 'jpeg' as Formats,
    bytes: 1024,
    original_filename: 'sampleImage',
    delete_token: 'delete_token',
  },
  {
    thumbnail_url: 'https://via.placeholder.com/61x34.jpeg/88c893',
    public_id: 'public_id2',
    format: 'jpeg' as Formats,
    bytes: 1024,
    original_filename: 'sampleImage',
    delete_token: 'delete_token',
  },
  {
    thumbnail_url: 'https://via.placeholder.com/61x34.jpeg/7b82b7',
    public_id: 'public_id3',
    format: 'jpeg' as Formats,
    bytes: 1024,
    original_filename: 'sampleImage',
    delete_token: 'delete_token',
  },
  {
    thumbnail_url: 'https://via.placeholder.com/61x34.jpeg/f8a26a',
    public_id: 'public_id4',
    format: 'jpeg' as Formats,
    bytes: 1024,
    original_filename: 'sampleImage',
    delete_token: 'delete_token',
  },
];

export const Default = () => {
  return (
    <>
      <MediaUploadWidget
        getWidgetConfig={getConfig}
        onImageUploadError={handleError}
        image={image}
      ></MediaUploadWidget>
      <Body backgroundColor="warning" dense={false}>
        You won&rsquo;t be able to upload an image, widget is just for
        demonstration purposes
      </Body>
    </>
  );
};

export const WithInitialImages = () => {
  return (
    <>
      <MediaUploadWidget
        getWidgetConfig={getConfig}
        onImageUploadError={handleError}
        initialImages={images}
        image={image}
      ></MediaUploadWidget>
      <Body backgroundColor="warning" dense={false}>
        You won&rsquo;t be able to upload an image, widget is just for
        demonstration purposes
      </Body>
    </>
  );
};

export const WithDeleteAction = () => {
  const handleDelete = async (): Promise<{ result: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ result: 'ok' });
        window.alert('Call Endpoint to delete image in cloudinary');
      }, 1000);
    });
  };

  return (
    <>
      <MediaUploadWidget
        getWidgetConfig={getConfig}
        onImageUploadError={handleError}
        initialImages={images}
        deleteHandler={handleDelete}
        image={image}
      ></MediaUploadWidget>
      <Body backgroundColor="warning" dense={false}>
        You won&rsquo;t be able to upload an image, widget is just for
        demonstration purposes
      </Body>
    </>
  );
};
