import * as React from 'react';
import {
  Body,
  CloudinaryConfigProvider,
  MediaUploadWidget,
  Image,
  ImageSource,
  MediaData,
  Spacer,
} from '..';
import {
  CloudinaryAssetFormat,
  CloudinaryAssetSource,
} from '../utils/loadCloudinaryScript';

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

const sources: CloudinaryAssetSource[] = ['local'];

/**
 * For demonstration purpose only.
 * General informations:
 * - `uploadPreset` is required AND has to be part of the request body when generating the upload signature
 * - `uploadSignatureTimestamp` can be set in frontend and be part of the request body when generating the upload signature.
 *    Otherwise the timestamp will be calculated in the backend automatically.
 * - `apiKey`, `cloudName` and `uploadSignature` itself will be passed in the response body after calling the
 *    signature generator backend endpoint (no need to store these values in frontend). Make sure these values
 *    are part of the returned config callback.
 */
const getConfig: CloudinaryConfigProvider = async () => {
  const config = {
    uploadPreset: 'SOME-PRESET',
    uploadSignatureTimestamp: Math.round(new Date().getTime() / 1000),
    sources,
    maxFiles: 1,
  };

  /**
   * Call api endpoint to generate required cloudinary signature
   * and to get required apiKey, cloudName and timestamp.
   */
  // const signatureGeneratorResponse = await fetch(
  //   'http://xxx/getSignature',
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(config),
  //   }
  // );

  // const {
  //   uploadSignature,
  //   uploadSignatureTimestamp,
  //   cloudName,
  //   apiKey,
  // } = await signatureGeneratorResponse.json();

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

const initialItems = [
  {
    thumbnail_url: 'https://via.placeholder.com/61x34.jpeg/a9a4a4',
    public_id: 'public_id1',
    format: 'jpeg' as CloudinaryAssetFormat,
    bytes: 1024,
    original_filename: 'sampleImage',
    delete_token: 'delete_token',
  },
  {
    thumbnail_url: 'https://via.placeholder.com/61x34.jpeg/88c893',
    public_id: 'public_id2',
    format: 'jpeg' as CloudinaryAssetFormat,
    bytes: 1024,
    original_filename: 'sampleImage',
    delete_token: 'delete_token',
  },
  {
    thumbnail_url: 'https://via.placeholder.com/61x34.jpeg/7b82b7',
    public_id: 'public_id3',
    format: 'jpeg' as CloudinaryAssetFormat,
    bytes: 1024,
    original_filename: 'sampleImage',
    delete_token: 'delete_token',
  },
  {
    thumbnail_url: 'https://via.placeholder.com/61x34.jpeg/f8a26a',
    public_id: 'public_id4',
    format: 'jpeg' as CloudinaryAssetFormat,
    bytes: 1024,
    original_filename: 'sampleImage',
    delete_token: 'delete_token',
  },
];
// TODO Überlegen ob ein demo account eingerichtet werden kann
export const Default = () => {
  const [items, setItems] = React.useState(initialItems);
  const handleUpload = (items: MediaData[]) => {
    console.log('handleUploads', items);
  };

  const handleDelete = async (deletedItem: MediaData) => {
    setItems((prevItems) => {
      return prevItems.filter(
        (item) => item.public_id !== deletedItem.public_id
      );
    });
    console.log('handleDelete', deletedItem);
  };

  return (
    <>
      <Body backgroundColor="warning" dense={false}>
        You won&rsquo;t be able to upload an image, widget is just for
        demonstration purposes
      </Body>
      <Spacer vertical={2} />
      <MediaUploadWidget
        getWidgetConfig={getConfig}
        onUpload={handleUpload}
        onDelete={handleDelete}
        callToActionImage={image}
        items={items}
      />
    </>
  );
};
