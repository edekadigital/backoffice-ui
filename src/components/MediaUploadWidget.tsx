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

export type Formats =
  | 'png'
  | 'gif'
  | 'jpeg'
  | 'pdf'
  | 'heif'
  | 'heic'
  | 'webp'
  | 'svg';

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
  delete_token: string;
}

export interface MediaUploadProps {
  cloudinaryConfig: CloudinaryConfig;
  onImageUpload?: (images: ImageUploadData[]) => void;
  initialImages?: ImageUploadData[];
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
  const { cloudinaryConfig, initialImages, onImageUpload } = props;
  const [images, setImages] = React.useState<ImageUploadData[]>(
    initialImages || []
  );
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
            if (onImageUpload) {
              onImageUpload(updatedImages);
            }
          }
          if (error) {
            console.log(error);
          }
        }
      );
      (widget.current as any).open();
    });
  }, [
    apiKey,
    cloudName,
    cloudinaryConfig,
    hash,
    images,
    onImageUpload,
    timestamp,
  ]);

  React.useEffect(() => {
    return () => {
      (widget.current as any).destroy({ removeThumbnails: true });
    };
  });

  const action = {
    icon: Delete,
    handler: (e: React.MouseEvent, id: string | undefined) => {
      const timestampDelete = Math.round(new Date().getTime() / 1000);
      const shaObjDelete = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(`public_id=${id}&timestamp=${timestampDelete}${apiSecret}`);
      const hashDelete = shaObjDelete.getHash('HEX');

      // fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      //   method: 'POST',
      //   mode: 'no-cors',
      //   body: JSON.stringify({
      //     public_id: id,
      //     timestamp: timestampDelete,
      //     signature: hashDelete,
      //     api_key: apiKey,
      //   }),
      // }).then(
      //   (result) => console.log(result),
      //   (error) => console.log(error)
      // );

      const image = images.find((image) => image.public_id === id);
      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/delete_by_token`, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          token: image!.delete_token,
        }),
      }).then(
        (result) => console.log(result),
        (error) => console.log(error)
      );
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
