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
} from '..';

const action = {
  icon: Delete,
  handler: () => {},
};

export interface CloudinaryConfig {
  config: string;
}

export interface ImageUploadData {
  url: string;
}

export interface MediaUploadProps {
  cloudinaryConfig?: CloudinaryConfig;
  onImageUpload?: () => ImageUploadData[];
}

const useStyles = makeStyles((theme: Theme) => ({
  button: { marginLeft: theme.spacing(2) },
}));

export const MediaUpload: React.VFC<MediaUploadProps> = () => {
  const [images, setImages] = React.useState([]);
  const [cloudinaryReady, setCloudinaryReady] = React.useState(false);
  const widget = React.useRef();
  const styles = useStyles();

  React.useEffect(() => {
    loadCloudinaryScriptDynamic(() => {
      widget.current = (window as any).cloudinary.createUploadWidget({
        cloudName: 'edeka-test',
        uploadPreset: 'gws-dev',
      });
      setCloudinaryReady(true);
    });
  }, []);

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
            <ListItem key={`Image-${index}`} />
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
