import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import {
  Paper,
  FlexContainer,
  Image,
  Button,
  List,
  Delete,
  ListItem,
  ImageSource,
} from '..';

export type Formats =
  | 'png'
  | 'gif'
  | 'jpeg'
  | 'pdf'
  | 'heif'
  | 'heic'
  | 'webp'
  | 'svg';

export type Sources = 'local' | 'url';

export interface CloudinaryConfig {
  uploadPreset: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  clientAllowedFormats?: Formats[];
  maxImageFileSize?: number;
  maxVideoFileSize?: number;
  maxRawFileSize?: number;
  maxImageWidth?: number;
  maxImageHeight?: number;
  minImageWidth?: number;
  minImageHeight?: number;
  validateMaxWidthHeight?: boolean;
  cloudName: string;
  sources?: Sources[];
  uploadSignature: string;
  uploadSignatureTimestamp: number;
  apiKey: string;
}

export interface ImageUploadData {
  id?: string;
  batchId?: string;
  asset_id?: string;
  public_id: string;
  version?: number;
  version_id?: string;
  signature?: string;
  width?: number;
  height?: number;
  format: Formats;
  resource_type?: string;
  created_at?: string;
  tags?: string[];
  bytes: number;
  type?: string;
  etag?: string;
  placeholder?: boolean;
  url?: string;
  secure_url?: string;
  access_mode?: string;
  original_filename: string;
  path?: string;
  thumbnail_url: string;
  delete_token: string;
}

export type CloudinaryConfigProvider = () => Promise<CloudinaryConfig>;
export interface MediaUploadWidgetProps {
  /**
   * Callback when delete icon in list is clicked
   */
  deleteHandler?: (
    e: React.MouseEvent,
    id?: string,
    deleteToken?: string
  ) => Promise<{ result: string } | Error>;
  /**
   * Function which returns the configuration object for the upload widget
   */
  getWidgetConfig: CloudinaryConfigProvider;
  /**
   * Initial array of images
   */
  initialImages?: ImageUploadData[];
  /**
   * Callback with image object once upload was successfull
   */
  onImageUpload?: (images: ImageUploadData[]) => void;
  /**
   * Calback when upload failed
   */
  onImageUploadError?: (error: Error) => void;
  /**
   * Optional image which will be displayed next to the upload button
   */
  image?: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) => ({
  button: { marginLeft: theme.spacing(2) },
}));

export const MediaUploadWidget: React.VFC<MediaUploadWidgetProps> = (props) => {
  const {
    getWidgetConfig,
    initialImages,
    onImageUpload,
    deleteHandler,
    onImageUploadError,
    image,
  } = props;
  const [images, setImages] = React.useState<ImageUploadData[]>(
    initialImages || []
  );
  const widget = React.useRef();
  const styles = useStyles();

  const openWidget = React.useCallback(async () => {
    const config = await getWidgetConfig();
    const tempImages: ImageUploadData[] = [];
    loadCloudinaryScriptDynamic(() => {
      widget.current = (window as any).cloudinary.createUploadWidget(
        {
          ...config,
          styles: {
            palette: {
              window: '#FFFFFF',
              windowBorder: '#9E9E9E',
              tabIcon: '#1A65B2',
              menuIcons: '#9E9E9E',
              textDark: '#000000',
              textLight: '#FFFFFF',
              link: '#1A65B2',
              action: '#FF9800',
              inactiveTabIcon: '#757575',
              error: '#D32F2F',
              inProgress: '#1A65B2',
              complete: '#4CAF50',
              sourceBg: '#F5F5F5',
            },
            fonts: {
              default: null,
              "'Fira Sans', sans-serif": {
                url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
                active: true,
              },
            },
          },
        },
        (error: Error, result: { event: string; info: ImageUploadData }) => {
          if (!error && result && result.event === 'success') {
            tempImages.push(result.info);
          }
          if (!error && result && result.event === 'queues-end') {
            const updatedImages = [...images, ...tempImages];
            setImages(updatedImages);
            if (onImageUpload) {
              onImageUpload(updatedImages);
            }
          }
          if (error) {
            if (onImageUploadError) {
              onImageUploadError(error);
            }
          }
        }
      );
      (widget.current as any).open();
    });
  }, [getWidgetConfig, images, onImageUpload, onImageUploadError]);

  React.useEffect(() => {
    return () => {
      if (widget.current) {
        (widget.current as any).destroy({ removeThumbnails: true });
      }
    };
  });

  const action = deleteHandler
    ? {
        icon: Delete,
        handler: (e: React.MouseEvent, id: string | undefined) => {
          const image = images.find((image) => image.public_id === id);
          deleteHandler(e, id, image?.delete_token).then(
            () => {
              const updatedImages = images.filter(
                (image) => image.public_id !== id
              );
              setImages(updatedImages);
            },
            (error) => {
              console.log(error);
            }
          );
        },
      }
    : undefined;

  return (
    <>
      <Paper borderStyle="dashed" gutterBottom={true}>
        <FlexContainer align="center" justify="center">
          {image}
          <Button
            variant="text"
            icon={CloudUpload}
            color="primary"
            className={image ? styles.button : undefined}
            onClick={openWidget}
          >
            Bild wählen
          </Button>
        </FlexContainer>
      </Paper>
      {images.length > 0 && (
        <List>
          {images.map((image, index) => {
            const unit = image.bytes > 1024000 ? 'MB' : 'KB';
            const size = Math.round(image.bytes / 1024);

            return (
              <ListItem
                key={`Image-${index}`}
                text={`${image.original_filename}.${image.format}`}
                subText={`${size}${unit}`}
                action={action}
                id={image.public_id}
                bullet={
                  <Image
                    mode="contain"
                    src={image.thumbnail_url}
                    alt="thumbnail"
                  />
                }
              />
            );
          })}
        </List>
      )}
    </>
  );
};

const loadCloudinaryScriptDynamic = (callback: () => void) => {
  const existingScript = document.getElementById('cloudinary');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.id = 'cloudinary';
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }

  if (existingScript && callback) callback();
};
