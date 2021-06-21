import { cleanup, render, waitFor } from '@testing-library/react';
import * as React from 'react';
import {
  CloudinaryUploadWidget,
  CloudinaryUploadWidgetAssetSource,
  CloudinaryUploadWidgetConfigCallback,
  CloudinaryUploadWidgetOptions,
  ThemeProvider,
} from '../../..';
import userEvent from '@testing-library/user-event';
import { loadCloudinaryScript } from '../../../utils/loadCloudinaryScript';
import { CloudinaryMediaData } from '..';

jest.mock('../../../utils/loadCloudinaryScript');

const mockedLoadScript = (
  callCallback = false,
  error: Error | null = null,
  result = { event: 'queues-end' }
) => {
  const open = jest.fn();
  const destroy = jest.fn().mockImplementation(() => Promise.resolve());
  const createUploadWidget = jest
    .fn()
    .mockImplementation((config, callback) => {
      if (callCallback) {
        callback(error, result);
      }
      return { open, destroy };
    });
  (loadCloudinaryScript as jest.MockedFunction<
    typeof loadCloudinaryScript
  >).mockResolvedValue({
    createUploadWidget,
  });

  return { createUploadWidget, open, destroy };
};

const sources: CloudinaryUploadWidgetAssetSource[] = ['url'];

const widgetOptions: CloudinaryUploadWidgetOptions = {
  uploadPreset: 'upload-preset',
  sources,
};

const getConfig: CloudinaryUploadWidgetConfigCallback = async (options) => {
  return {
    uploadSignature: 'signature',
    uploadSignatureTimestamp: 1637238,
    apiKey: 'apiKey',
    cloudName: 'cloud',
    maxFiles: 1,
    ...options,
  };
};

const initialItems: CloudinaryMediaData[] = [
  {
    thumbnail_url: 'urlItem1',
    public_id: 'public_id1',
    format: 'jpeg',
    bytes: 1024,
    original_filename: 'sampleItem',
    delete_token: 'delete_token',
    width: 3840,
    height: 2160,
    secure_url: 'https://edeka.de/test.jpg',
  },
  {
    thumbnail_url: 'urlItem2',
    public_id: 'public_id2',
    format: 'jpeg',
    bytes: 1024001,
    original_filename: 'sampleItem',
    delete_token: 'delete_token',
    width: 3840,
    height: 2160,
    secure_url: 'https://edeka.de/test.jpg',
  },
];

describe('<CloudinaryUploadWidget>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const handleDelete = jest.fn();
    const handleUpload = jest.fn();
    const { getByTestId, queryAllByTestId } = render(
      <ThemeProvider>
        <CloudinaryUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          callToActionImage={<img src="image-source" />}
          widgetOptions={widgetOptions}
        />
      </ThemeProvider>
    );
    expect(getByTestId('paper')).toBeTruthy();
    expect(queryAllByTestId('listItem')).toHaveLength(0);
    expect(getByTestId('mediaUploadWidget-callToActionImage')).toBeTruthy();
  });

  it('should render a list of items', () => {
    const handleDelete = jest.fn();
    const handleUpload = jest.fn();
    const { getAllByTestId } = render(
      <ThemeProvider>
        <CloudinaryUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          items={initialItems}
          widgetOptions={widgetOptions}
        />
      </ThemeProvider>
    );
    expect(getAllByTestId('listItem')).toHaveLength(2);
  });

  it('should initialise widget when button is clicked', async () => {
    const { createUploadWidget, open } = mockedLoadScript();
    const handleDelete = jest.fn();
    const handleUpload = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <CloudinaryUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          items={initialItems}
          widgetOptions={widgetOptions}
        />
      </ThemeProvider>
    );

    userEvent.click(getByTestId('mediaUploadWidget-button'));

    await waitFor(() => {
      expect(createUploadWidget).toHaveBeenCalled();
      expect(open).toHaveBeenCalled();
    });
  });

  it('should not initialize widget again when button is clicked', async () => {
    const { createUploadWidget } = mockedLoadScript(true, undefined, {
      event: 'success',
    });
    const handleDelete = jest.fn();
    const handleUpload = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <CloudinaryUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          items={initialItems}
          widgetOptions={widgetOptions}
        />
      </ThemeProvider>
    );

    userEvent.click(getByTestId('mediaUploadWidget-button'));
    await waitFor(() => {
      expect(createUploadWidget).toHaveBeenCalled();
    });
    userEvent.click(getByTestId('mediaUploadWidget-button'));
    await waitFor(() => {
      expect(createUploadWidget).toHaveBeenCalledTimes(1);
    });
  });

  it('should call delete handler when delete icon is clicked', () => {
    const handleDelete = jest.fn().mockResolvedValue({ result: 'ok' });
    const handleUpload = jest.fn();
    const { getAllByTestId } = render(
      <ThemeProvider>
        <CloudinaryUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          items={initialItems}
          widgetOptions={widgetOptions}
        />
      </ThemeProvider>
    );
    userEvent.click(getAllByTestId('listItem-action-button')[1]);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(initialItems[1].public_id);
  });

  it('should catch error for delete handler', async () => {
    const handleDelete = jest.fn().mockRejectedValue(new Error());
    const handleDeleteError = jest.fn();
    const handleUpload = jest.fn();
    const { getAllByTestId } = render(
      <ThemeProvider>
        <CloudinaryUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onDeleteError={handleDeleteError}
          onUpload={handleUpload}
          items={initialItems}
          widgetOptions={widgetOptions}
        />
      </ThemeProvider>
    );
    userEvent.click(getAllByTestId('listItem-action-button')[1]);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(initialItems[1].public_id);

    await waitFor(() => {
      expect(handleDeleteError).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onUpload when event callback is called and result is defined', async () => {
    const { createUploadWidget } = mockedLoadScript(true);
    const handleDelete = jest.fn();
    const handleUpload = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <CloudinaryUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          widgetOptions={widgetOptions}
          items={initialItems}
        />
      </ThemeProvider>
    );

    userEvent.click(getByTestId('mediaUploadWidget-button'));

    await waitFor(() => {
      expect(createUploadWidget).toHaveBeenCalled();
      expect(handleUpload).toHaveBeenCalled();
    });
  });

  it('should call onUploadError when event callback error is defined', async () => {
    const { createUploadWidget } = mockedLoadScript(true, new Error());
    const handleDelete = jest.fn();
    const handleUpload = jest.fn();
    const handleUploadError = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <CloudinaryUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          onUploadError={handleUploadError}
          items={initialItems}
          widgetOptions={widgetOptions}
        />
      </ThemeProvider>
    );

    userEvent.click(getByTestId('mediaUploadWidget-button'));

    await waitFor(() => {
      expect(createUploadWidget).toHaveBeenCalled();
      expect(handleUploadError).toHaveBeenCalled();
    });
  });
});
