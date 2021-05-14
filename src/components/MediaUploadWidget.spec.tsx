import { cleanup, render, waitFor } from '@testing-library/react';
import * as React from 'react';
import { ThemeProvider } from '..';
import {
  CloudinaryConfigProvider,
  MediaUploadWidget,
  widgetStylesConfig,
} from './MediaUploadWidget';
import {
  Formats,
  loadCloudinaryScript,
  Sources,
} from '../utils/loadCloudinaryScript';
import userEvent from '@testing-library/user-event';

jest.mock('../utils/loadCloudinaryScript');

const mockedLoadScript = (
  callCallback = false,
  error: Error | null = null,
  result = { event: 'queues-end' }
) => {
  const open = jest.fn();
  const destroy = jest.fn();
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

const initialItems = [
  {
    thumbnail_url: 'urlItem1',
    public_id: 'public_id1',
    format: 'jpeg' as Formats,
    bytes: 1024,
    original_filename: 'sampleItem',
    delete_token: 'delete_token',
  },
  {
    thumbnail_url: 'urlItem2',
    public_id: 'public_id2',
    format: 'jpeg' as Formats,
    bytes: 1024001,
    original_filename: 'sampleItem',
    delete_token: 'delete_token',
  },
];

describe('<MediaUploadWidget>', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const handleDelete = jest.fn();
    const handleUpload = jest.fn();
    const { getByTestId, queryAllByTestId } = render(
      <ThemeProvider>
        <MediaUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          callToActionImage={<img src="image-source" />}
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
        <MediaUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          items={initialItems}
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
        <MediaUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          items={initialItems}
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
        <MediaUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          items={initialItems}
        />
      </ThemeProvider>
    );
    userEvent.click(getByTestId('mediaUploadWidget-button'));

    await waitFor(() => {
      expect(createUploadWidget).toHaveBeenCalled();
    });

    userEvent.click(getByTestId('mediaUploadWidget-button'));

    expect(createUploadWidget).toHaveBeenCalledTimes(1);
  });

  it('should call delete handler when delete icon is clicked', () => {
    const handleDelete = jest.fn().mockResolvedValue({ result: 'ok' });
    const handleUpload = jest.fn();
    const { getAllByTestId } = render(
      <ThemeProvider>
        <MediaUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          items={initialItems}
        />
      </ThemeProvider>
    );
    userEvent.click(getAllByTestId('listItem-action-button')[1]);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(initialItems[1]);
  });

  it('should catch error for delete handler', async () => {
    const handleDelete = jest.fn().mockRejectedValue(new Error());
    const handleDeleteError = jest.fn();
    const handleUpload = jest.fn();
    const { getAllByTestId } = render(
      <ThemeProvider>
        <MediaUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onDeleteError={handleDeleteError}
          onUpload={handleUpload}
          items={initialItems}
        />
      </ThemeProvider>
    );
    userEvent.click(getAllByTestId('listItem-action-button')[1]);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(initialItems[1]);

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
        <MediaUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          items={initialItems}
        />
      </ThemeProvider>
    );

    userEvent.click(getByTestId('mediaUploadWidget-button'));

    const config = await getConfig();

    await waitFor(() => {
      expect(createUploadWidget).toHaveBeenCalled();
      expect(createUploadWidget.mock.calls[0][0]).toEqual({
        ...config,
        styles: widgetStylesConfig,
      });
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
        <MediaUploadWidget
          getWidgetConfig={getConfig}
          onDelete={handleDelete}
          onUpload={handleUpload}
          onUploadError={handleUploadError}
          items={initialItems}
        />
      </ThemeProvider>
    );

    userEvent.click(getByTestId('mediaUploadWidget-button'));

    const config = await getConfig();

    await waitFor(() => {
      expect(createUploadWidget).toHaveBeenCalled();
      expect(createUploadWidget.mock.calls[0][0]).toEqual({
        ...config,
        styles: widgetStylesConfig,
      });
      expect(handleUploadError).toHaveBeenCalled();
    });
  });
});
