import * as React from 'react';
import jsSHA from 'jssha';
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

export type Formats = 'png' | 'gif' | 'jpeg';
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
}

export interface ImageUploadData {
  id: string;
  batchId: string;
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: Formats;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  // Create type
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  // Create type
  access_mode: string;
  original_filename: string;
  path: string;
  thumbnail_url: string;
}

export interface MediaUploadProps {
  cloudinaryConfig: CloudinaryConfig;
  onImageUpload?: () => ImageUploadData[];
}

const useStyles = makeStyles((theme: Theme) => ({
  button: { marginLeft: theme.spacing(2) },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const img1x = require('../assets/attach-file@1x.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const img2x = require('../assets/attach-file@2x.png');
const sources: ImageSource[] = [
  {
    media: '(min-width: 600px)',
    srcSet: img2x,
  },
  {
    srcSet: img1x,
  },
];

export const MediaUploadWidget: React.VFC<MediaUploadProps> = (props) => {
  const { cloudinaryConfig } = props;
  const [images, setImages] = React.useState<ImageUploadData[]>([]);
  const widget = React.useRef();
  const styles = useStyles();

  const timestamp = Math.round(new Date().getTime() / 1000);
  /**
   * TODO: SHA Verschlüsselung bzw. Erstellen der Signature muss in Backend implementiert werden!
   * Cloudinary config muss als env-var gesetzt werden, um die widgets testen zu können.
   * `export STORYBOOK_CLOUDINARY_CLOUD_NAME=***`
   */
  const cloudName = process.env.STORYBOOK_CLOUDINARY_CLOUD_NAME;
  const apiSecret = process.env.STORYBOOK_CLOUDINARY_API_SECRET;
  const apiKey = process.env.STORYBOOK_CLOUDINARY_API_KEY;
  const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(
    `source=uw&timestamp=${timestamp}&upload_preset=${cloudinaryConfig.uploadPreset}${apiSecret}`
  );
  const hash = shaObj.getHash('HEX');

  const openWidget = React.useCallback(() => {
    const tempImages: any[] = [];
    loadCloudinaryScriptDynamic(() => {
      widget.current = (window as any).cloudinary.createUploadWidget(
        {
          ...cloudinaryConfig,
          cloudName,
          sources: ['local', 'url'],
          uploadSignature: hash,
          uploadSignatureTimestamp: timestamp,
          apiKey,
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
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            tempImages.push(result.info);
          }
          if (!error && result && result.event === 'queues-end') {
            const updatedImages = [...images, ...tempImages];
            setImages(updatedImages);
          }
          if (error) {
            console.log(error);
          }
        }
      );
      (widget.current as any).open();
    });
  }, [apiKey, cloudName, cloudinaryConfig, hash, images, timestamp]);

  React.useEffect(() => {
    return () => {
      (widget.current as any).destroy({ removeThumbnails: true });
    };
  });

  const action = {
    icon: Delete,
    handler: (e: React.MouseEvent, id: string | undefined) => {
      // Talk to cloudinay api endpoint
      console.log(e, id);
    },
  };

  return (
    <>
      <Paper borderStyle="dashed" gutterBottom={true}>
        <FlexContainer align="center" justify="center">
          <Image
            src={img2x}
            sources={sources}
            alt="attach-file-image"
            mode="height"
          />
          <Button
            variant="text"
            icon={CloudUpload}
            color="primary"
            className={styles.button}
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
                id={image.asset_id}
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
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.id = 'cloudinary';
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }

  if (existingScript && callback) callback();
};

/**
 * Inserted assets:  {
  "id": "uw-file3",
  "batchId": "uw-batch2",
  "asset_id": "2c2a2ac1da80431ad0f11819f4b66151",
  "public_id": "GWS-DEV/empjd1bzxy310n6ak52v",
  "version": 1620306173,
  "version_id": "2c6851002bed5a5e75eaa3e9dca423ee",
  "signature": "2f86b98f7dabffac123216d87cd2f1b7465c1d4f",
  "width": 1580,
  "height": 818,
  "format": "png",
  "resource_type": "image",
  "created_at": "2021-05-06T13:02:53Z",
  "tags": [],
  "bytes": 64436,
  "type": "upload",
  "etag": "cb947c700f68c9ac23f1c9042eefa867",
  "placeholder": false,
  "url": "http://res.cloudinary.com/edeka-dev/image/upload/v1620306173/GWS-DEV/empjd1bzxy310n6ak52v.png",
  "secure_url": "https://res.cloudinary.com/edeka-dev/image/upload/v1620306173/GWS-DEV/empjd1bzxy310n6ak52v.png",
  "access_mode": "public",
  "original_filename": "Screenshot 2021-05-05 at 11.58.06",
  "path": "v1620306173/GWS-DEV/empjd1bzxy310n6ak52v.png",
  "thumbnail_url": "https://res.cloudinary.com/edeka-dev/image/upload/c_limit,h_34,w_61/v1620306173/GWS-DEV/empjd1bzxy310n6ak52v.png"
}
 */
