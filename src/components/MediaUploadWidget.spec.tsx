import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import {
  CloudinaryConfigProvider,
  MediaUploadWidget,
  Sources,
} from './MediaUploadWidget';

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

describe('<MediaUploadWidget>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { getByTestId } = render(
      <MediaUploadWidget getWidgetConfig={getConfig} />
    );
    expect(getByTestId('paper')).toBeTruthy();
  });
});
