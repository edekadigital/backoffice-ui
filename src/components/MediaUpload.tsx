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
} from '..';

const action = {
  icon: Delete,
  handler: () => {},
};

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
  url: string;
}

export interface MediaUploadProps {
  cloudinaryConfig: CloudinaryConfig;
  onImageUpload?: () => ImageUploadData[];
}

const useStyles = makeStyles((theme: Theme) => ({
  button: { marginLeft: theme.spacing(2) },
}));

export const MediaUpload: React.VFC<MediaUploadProps> = (props) => {
  const { cloudinaryConfig } = props;
  const [images, setImages] = React.useState<{ info: string }[]>([]);
  const [cloudinaryReady, setCloudinaryReady] = React.useState(false);
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
    `source=uw&timestamp=${timestamp}&upload_preset${cloudinaryConfig.uploadPreset}`
  );
  const hash = shaObj.getHash('HEX');
  console.log(hash);
  console.log(cloudName, apiKey, apiSecret);

  React.useEffect(() => {
    loadCloudinaryScriptDynamic(() => {
      widget.current = (window as any).cloudinary.createUploadWidget(
        {
          ...cloudinaryConfig,
          cloudName,
          sources: ['local', 'url'],
          uploadSignature: hash,
          uploadSignatureTimestamp: timestamp,
          apiKey,
          apiSecret,
          thumbnailTransformation: [{ width: 61, height: 34, crop: 'limit' }],
        },
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            // setImages(result.info);
            console.log(
              'Inserted assets: ',
              JSON.stringify(result.info, null, 2)
            );
          }
        }
      );
      setCloudinaryReady(true);
    });
    return () => {
      (widget.current as any).destroy({ removeThumbnails: true });
    };
  }, [apiKey, apiSecret, cloudName, cloudinaryConfig, hash, timestamp]);

  return (
    <>
      <Paper borderStyle="dashed" gutterBottom={true}>
        <FlexContainer align="center" justify="center">
          <Image
            src="https://via.placeholder.com/50/2076c4/ffffff"
            alt="placeholder"
            mode="height"
          />
          <Button
            variant="text"
            icon={CloudUpload}
            color="primary"
            className={styles.button}
            onClick={() => (widget.current as any).open()}
            disabled={!cloudinaryReady}
          >
            Bild wählen
          </Button>
        </FlexContainer>
      </Paper>
      {images.length > 0 && (
        <List>
          {images.map((image, index) => (
            <ListItem
              key={`Image-${index}`}
              text={image.info}
              action={action}
            />
          ))}
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

// function showUploadWidget() {
//   cloudinary.openUploadWidget(
//     {
//       cloudName: '<cloud name>',
//       uploadPreset: '<upload preset>',
//       sources: ['local', 'google_drive', 'dropbox', 'url'],
//       googleApiKey: '<image_search_google_api_key>',
//       showAdvancedOptions: true,
//       cropping: false,
//       multiple: false,
//       defaultSource: 'local',
//       styles: {
//         palette: {
//           window: '#FFFFFF',
//           windowBorder: '#90A0B3',
//           tabIcon: '#0078FF',
//           menuIcons: '#5A616A',
//           textDark: '#000000',
//           textLight: '#FFFFFF',
//           link: '#0078FF',
//           action: '#FF620C',
//           inactiveTabIcon: '#0E2F5A',
//           error: '#F44235',
//           inProgress: '#0078FF',
//           complete: '#20B832',
//           sourceBg: '#E4EBF1',
//         },
//         fonts: {
//           default: null,
//           "'Fira Sans', sans-serif": {
//             url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
//             active: true,
//           },
//         },
//       },
//     },
//     (err, info) => {
//       if (!err) {
//         console.log('Upload Widget event - ', info);
//       }
//     }
//   );
// }
