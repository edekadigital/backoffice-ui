import * as React from 'react';
import { CloudinaryMediaData } from '..';
import {
  Body,
  CloudinaryUploadWidgetConfigCallback,
  CloudinaryUploadWidget,
  Image,
  ImageSource,
  Spacer,
  CloudinaryUploadWidgetUploadCallback,
} from '../../..';
import { CloudinaryUploadWidgetDeleteCallback } from './CloudinaryUploadWidget';

export default {
  title: 'Components/CloudinaryUploadWidget',
  component: CloudinaryUploadWidget,
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const img1x = require('../../../assets/attach-file@1x.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const img2x = require('../../../assets/attach-file@2x.png');
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

/**
 * For demonstration purpose only.
 * General informations:
 * - `uploadSignatureTimestamp` can be set in frontend and be part of the request body when generating the upload signature.
 *    Otherwise the timestamp will be calculated in the backend automatically.
 * - `apiKey`, `cloudName` and `uploadSignature` itself will be passed in the response body after calling the
 *    signature generator backend endpoint (no need to store these values in frontend). Make sure these values
 *    are part of the returned config callback.
 */
const getConfig: CloudinaryUploadWidgetConfigCallback = async (options) => {
  const config = {
    uploadSignatureTimestamp: Math.round(new Date().getTime() / 1000),
    ...options,
  };

  /**
   * Call api endpoint to generate required cloudinary signature
   * and to get required apiKey, cloudName and timestamp.
   */
  const uploadSignature = 'SOME-SIGNATURE'; // mocked signature response
  const uploadSignatureTimestamp = 123456; // mocked timestamp response
  const cloudName = 'SOME-CLOUDNAME'; // mocked cloudinary cloud name response
  const apiKey = 'SOME-APIKEY'; // mocked api key response

  return {
    ...config,
    cloudName,
    apiKey,
    uploadSignature,
    uploadSignatureTimestamp,
  };
};

const initialItems: CloudinaryMediaData[] = [
  {
    thumbnail_url: 'https://via.placeholder.com/61x34.jpeg/a9a4a4',
    public_id: 'public_id1',
    format: 'jpeg',
    bytes: 103000,
    original_filename: 'sampleImage',
    original_extension: 'jpg',
    delete_token: 'delete_token',
    width: 3840,
    height: 2160,
    secure_url: 'https://edeka.de/test.jpg',
  },
  {
    thumbnail_url: 'https://via.placeholder.com/120x70.jpeg/88c893',
    public_id: 'public_id2',
    format: 'jpeg',
    bytes: 1387114,
    original_filename: 'sampleImage',
    original_extension: 'jpg',
    delete_token: 'delete_token',
    width: 3840,
    height: 2160,
    secure_url: 'https://edeka.de/test.jpg',
  },
  {
    thumbnail_url: 'https://via.placeholder.com/61x34.jpeg/7b82b7',
    public_id: 'public_id3',
    format: 'jpeg',
    bytes: 10024000,
    original_filename: 'sampleImage',
    original_extension: 'jpg',
    delete_token: 'delete_token',
    width: 3840,
    height: 2160,
    secure_url: 'https://edeka.de/test.jpg',
  },
  {
    thumbnail_url: 'https://via.placeholder.com/61x34.jpeg/f8a26a',
    public_id: 'public_id4',
    format: 'jpeg',
    bytes: 1000000,
    original_filename: 'sampleImage',
    original_extension: 'jpg',
    delete_token: 'delete_token',
    width: 3840,
    height: 2160,
    secure_url: 'https://edeka.de/test.jpg',
  },
];

export const Default = () => {
  const [items, setItems] = React.useState(initialItems);

  const handleUpload: CloudinaryUploadWidgetUploadCallback = (items) => {
    console.log('handleUploads', items);
  };

  const handleDelete: CloudinaryUploadWidgetDeleteCallback = async (
    publicId
  ) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.public_id !== publicId);
    });
    console.log('handleDelete', publicId);
  };

  return (
    <>
      <Body backgroundColor="warning" dense={false}>
        You won&rsquo;t be able to upload an image, widget is just for
        demonstration purposes
      </Body>
      <Spacer vertical={2} />
      <CloudinaryUploadWidget
        getWidgetConfig={getConfig}
        onUpload={handleUpload}
        onDelete={handleDelete}
        callToActionImage={image}
        items={items}
        widgetOptions={{
          uploadPreset: 'somePreset',
          sources: ['local', 'url'],
        }}
      />
    </>
  );
};
