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
  ListActionItem,
  Dialog,
  Loader,
} from '../../..';
import { loadCloudinaryScript } from '../../../utils/loadCloudinaryScript';
import { useTheme } from '@material-ui/styles';
import { CloudinaryAssetFormat, CloudinaryMediaData } from '..';

export interface CloudinaryUploadWidgetOptions {
  uploadPreset: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  clientAllowedFormats?: CloudinaryAssetFormat[];
  maxImageFileSize?: number;
  maxVideoFileSize?: number;
  maxRawFileSize?: number;
  maxImageWidth?: number;
  maxImageHeight?: number;
  minImageWidth?: number;
  minImageHeight?: number;
  validateMaxWidthHeight?: boolean;
  sources: CloudinaryUploadWidgetAssetSource[];
  showPoweredBy?: boolean;
  language?: 'de' | 'en';
}

export interface CloudinaryUploadWidgetSignatureParams {
  cloudName: string;
  uploadSignature: string;
  uploadSignatureTimestamp: number;
  apiKey: string;
}

export type CloudinaryUploadWidgetConfig = CloudinaryUploadWidgetOptions &
  CloudinaryUploadWidgetSignatureParams;

export type CloudinaryUploadWidgetAssetSource = 'local' | 'url';

export interface CloudinaryUploadWidgetRef {
  open: Function;
  destroy: () => Promise<void>;
}

export type CloudinaryUploadWidgetConfigCallback = (
  options: CloudinaryUploadWidgetOptions
) => Promise<CloudinaryUploadWidgetConfig>;

export type CloudinaryUploadWidgetDeleteCallback = (
  publicId: string
) => Promise<void>;

export type CloudinaryUploadWidgetDeleteErrorCallback = (error: Error) => void;

export type CloudinaryUploadWidgetUploadCallback = (
  images: CloudinaryMediaData[]
) => void;

export type CloudinaryUploadWidgetUploadErrorCallback = (error: Error) => void;

export interface CloudinaryUploadWidgetProps {
  /**
   * Callback when delete icon in list is clicked
   */
  onDelete: CloudinaryUploadWidgetDeleteCallback;
  /**
   *
   */
  onDeleteError?: CloudinaryUploadWidgetDeleteErrorCallback;
  /**
   * Function which returns the configuration object for the upload widget
   */
  getWidgetConfig: CloudinaryUploadWidgetConfigCallback;
  /**
   * Disable upload button
   */
  isUploadDisabled?: boolean;
  /**
   * Remove delete action from list
   */
  isDeleteDisabled?: boolean;
  /**
   * Array of images
   */
  items?: CloudinaryMediaData[];
  /**
   * Callback with image object once upload was successfull
   */
  onUpload: CloudinaryUploadWidgetUploadCallback;
  /**
   * Callback when upload failed
   */
  onUploadError?: CloudinaryUploadWidgetUploadErrorCallback;
  /**
   * Optional image which will be displayed next to the upload button
   */
  callToActionImage?: React.ReactNode;
  /**
   * Cloudinary widget options
   */
  widgetOptions: CloudinaryUploadWidgetOptions;
  /**
   * Text and label language in the upload widget.
   * @default "de"
   */
  language?: 'en' | 'de';
}

const useStyles = makeStyles((theme: Theme) => ({
  button: { marginLeft: theme.spacing(2) },
}));

const localization = {
  text: {
    de: {
      or: 'oder',
      back: 'Zurück',
      close: 'Schließen',
      menu: {
        files: 'Meine Dateien',
        web: 'URL',
      },
      url: {
        inner_title: 'Öffentliche Bild-URL:',
        input_placeholder: 'Bild-URL',
      },
      local: {
        browse: 'Durchsuchen',
        dd_title_single: 'Datei hierhin ziehen und ablegen',
        dd_title_multi: 'Dateien hierhin ziehen und ablegen',
        drop_title_single: 'Datei ablegen um sie hochzuladen',
        drop_title_multiple: 'Dateien ablegen um sie hochzuladen',
      },
      uploader: {
        errors: {
          file_too_large:
            'Dateigröße ({{size}}) überschreitet die maximal erlaubte Größe ({{allowed}})',
          max_dimensions_validation:
            'Bildabmessungen ({{width}}X{{height}}) sind größer als die maximal erlaubten Maße ({{maxWidth}}X{{maxHeight}})',
          min_dimensions_validation:
            'Bildabmessungen ({{width}}X{{height}}) sind kleiner als die mindestens erforderten Maße ({{minWidth}}X{{minHeight}})',
          max_number_of_files: 'Maximale Anzahl an Dateien erreicht',
          allowed_formats: 'Datei Format nicht erlaubt',
          max_file_size: 'Datei ist zu groß',
          min_file_size: 'Datei ist zu klein',
        },
      },
      queue: {
        title: 'Upload Warteschlange',
        title_uploading_with_counter: '{{num}} Dateien werden hochgeladen',
        title_uploading: 'Dateien werden hochgeladen',
        mini_title: 'Hochgeladen',
        mini_title_uploading: 'Upload Prozess läuft',
        show_completed: 'Zeige fertiggestellte Dateien',
        retry_failed: 'Wiederholungsversuch fehlgeschlagen',
        abort_all: 'Alles abbrechen',
        upload_more: 'Weitere Dateien hochladen',
        done: 'Fertig',
        mini_upload_count: '{{num}} Dateien hochgeladen',
        mini_failed: '{{num}} fehlgeschlagen',
        statuses: {
          uploading: 'Hochladen...',
          error: 'Fehler',
          uploaded: 'Fertig',
          aborted: 'Abgebrochen',
        },
      },
      loadingDialog: {
        title: 'Bitte warten',
        text: 'Bitte warten. Der Datei Uploader wird initialisiert...',
      },
    },
    en: {
      loadingDialog: {
        title: 'Please wait.',
        text: 'Please wait. Initializing file uploader...',
      },
    },
  },
};

export const CloudinaryUploadWidget: React.VFC<CloudinaryUploadWidgetProps> = (
  props
) => {
  const {
    getWidgetConfig,
    isUploadDisabled,
    isDeleteDisabled,
    items = [],
    onUpload,
    onDelete,
    onDeleteError,
    onUploadError,
    callToActionImage,
    widgetOptions,
    language = 'de',
  } = props;

  const widget = React.useRef<CloudinaryUploadWidgetRef>();
  const styles = useStyles();
  const theme = useTheme<Theme>();
  const [openLoadingDialog, setOpenLoadingDialog] = React.useState(false);

  const widgetStylesConfig = React.useMemo(
    () => ({
      palette: {
        window: theme.palette.background.paper,
        windowBorder: theme.palette.divider,
        tabIcon: theme.palette.primary.main,
        menuIcons: theme.palette.action.active,
        textDark: theme.palette.text.secondary,
        textLight: theme.palette.primary.contrastText,
        link: theme.palette.primary.main,
        inactiveTabIcon: theme.palette.text.disabled,
        error: theme.palette.error.main,
        inProgress: theme.palette.primary.main,
        complete: theme.palette.success.main,
        sourceBg: theme.palette.background.default,
      },
    }),
    [
      theme.palette.action.active,
      theme.palette.background.default,
      theme.palette.background.paper,
      theme.palette.divider,
      theme.palette.error.main,
      theme.palette.primary.contrastText,
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.text.disabled,
      theme.palette.text.secondary,
    ]
  );

  const openWidget = React.useCallback(async () => {
    setOpenLoadingDialog(true);
    const config = await getWidgetConfig(widgetOptions);
    let tempItems: CloudinaryMediaData[] = [];

    if (widget.current) {
      widget.current?.open();
      setOpenLoadingDialog(false);
    } else {
      loadCloudinaryScript().then((cloudinary) => {
        widget.current = cloudinary?.createUploadWidget(
          {
            ...config,
            ...localization,
            language,
            styles: widgetStylesConfig,
            showPoweredBy: false,
          },
          (
            error: Error,
            result: { event: string; info: CloudinaryMediaData }
          ) => {
            if (!error && result && result.event === 'success') {
              tempItems.push(result.info);
            }
            if (!error && result && result.event === 'queues-end') {
              onUpload(tempItems);
              tempItems = [];
            }
            if (error) {
              if (onUploadError) {
                onUploadError(error);
              }
            }
          }
        );
        widget.current?.open();
        setOpenLoadingDialog(false);
      });
    }
  }, [
    getWidgetConfig,
    language,
    onUpload,
    onUploadError,
    widgetOptions,
    widgetStylesConfig,
  ]);

  React.useEffect(() => {
    return () => {
      widget.current?.destroy().then(() => (widget.current = undefined));
    };
  }, []);

  return (
    <>
      <Paper borderStyle="dashed" gutterBottom={true}>
        <FlexContainer align="center" justify="center">
          {callToActionImage ? (
            <div data-testid="mediaUploadWidget-callToActionImage">
              {callToActionImage}
            </div>
          ) : null}
          <Button
            variant="text"
            icon={CloudUpload}
            color="primary"
            className={callToActionImage ? styles.button : undefined}
            onClick={openWidget}
            data-testid="mediaUploadWidget-button"
            disabled={isUploadDisabled}
          >
            Bild wählen
          </Button>
        </FlexContainer>
      </Paper>
      {items.length > 0 && (
        <List>
          {items.map((item, index) => {
            let unit;
            let size;
            if (item.bytes > 1024000) {
              unit = 'MB';
              size = (item.bytes / (1024 * 1024)).toFixed(1);
            } else {
              unit = 'KB';
              size = (item.bytes / 1024).toFixed();
            }

            const action: ListActionItem = {
              icon: Delete,
              handler: () => {
                onDelete(item.public_id).catch((error) => {
                  if (onDeleteError) {
                    onDeleteError(error);
                  }
                });
              },
            };

            return (
              <ListItem
                key={`item-${index}`}
                text={`${item.original_filename}.${item.format}`}
                subText={`${size} ${unit}`}
                action={!isDeleteDisabled ? action : undefined}
                bullet={
                  <Image
                    mode="contain"
                    src={item.thumbnail_url || item.secure_url}
                    alt="thumbnail"
                    maxWidth={56}
                  />
                }
              />
            );
          })}
        </List>
      )}
      <Dialog
        open={openLoadingDialog}
        title={localization.text[language].loadingDialog.title}
      >
        <FlexContainer gutterBottom={10} gutterTop={10} justify="center">
          <Loader message={localization.text[language].loadingDialog.text} />
        </FlexContainer>
      </Dialog>
    </>
  );
};
