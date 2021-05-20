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
} from '..';
import {
  CloudinaryConfig,
  CloudinaryWidget,
  CloudinaryAssetFormat,
  loadCloudinaryScript,
} from '../utils/loadCloudinaryScript';
import { useTheme } from '@material-ui/styles';
export interface CloudinaryMediaData {
  id?: string;
  batchId?: string;
  asset_id?: string;
  public_id: string;
  version?: number;
  version_id?: string;
  signature?: string;
  width?: number;
  height?: number;
  format: CloudinaryAssetFormat;
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
export interface CloudinaryUploadWidgetProps {
  /**
   * Callback when delete icon in list is clicked
   */
  onDelete: (image: CloudinaryMediaData) => Promise<unknown>;
  /**
   *
   */
  onDeleteError?: (error: Error) => unknown;
  /**
   * Function which returns the configuration object for the upload widget
   */
  getWidgetConfig: CloudinaryConfigProvider;
  /**
   * Array of images
   */
  items?: CloudinaryMediaData[];
  /**
   * Callback with image object once upload was successfull
   */
  onUpload: (images: CloudinaryMediaData[]) => unknown;
  /**
   * Calback when upload failed
   */
  onUploadError?: (error: Error) => unknown;
  /**
   * Optional image which will be displayed next to the upload button
   */
  callToActionImage?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  button: { marginLeft: theme.spacing(2) },
}));

export const CloudinaryUploadWidget: React.VFC<CloudinaryUploadWidgetProps> = (
  props
) => {
  const {
    getWidgetConfig,
    items = [],
    onUpload,
    onDelete,
    onDeleteError,
    onUploadError,
    callToActionImage,
  } = props;

  const widget = React.useRef<CloudinaryWidget>();
  const styles = useStyles();
  const theme = useTheme<Theme>();

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
    const config = await getWidgetConfig();
    let tempItems: CloudinaryMediaData[] = [];

    if (widget.current) {
      widget.current?.open();
    } else {
      loadCloudinaryScript()?.then((cloudinary) => {
        widget.current = cloudinary?.createUploadWidget(
          {
            ...config,
            styles: widgetStylesConfig,
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
      });
    }
  }, [getWidgetConfig, onUpload, onUploadError, widgetStylesConfig]);

  React.useEffect(() => {
    return () => {
      widget.current?.destroy();
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
          >
            Bild wählen
          </Button>
        </FlexContainer>
      </Paper>
      {items.length > 0 && (
        <List>
          {items.map((item, index) => {
            const unit = item.bytes > 1024000 ? 'MB' : 'KB';
            const size = Math.round(item.bytes / 1024);

            const action: ListActionItem = {
              icon: Delete,
              handler: () => {
                onDelete(item).catch((error) => {
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
                subText={`${size}${unit}`}
                action={action}
                bullet={
                  <Image
                    mode="contain"
                    src={item.thumbnail_url}
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
