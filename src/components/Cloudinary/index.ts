import { CloudinaryUploadWidgetConfig, CloudinaryUploadWidgetRef } from '../..';

declare global {
  interface Window {
    cloudinary?: Cloudinary;
  }
}

export interface Cloudinary {
  createUploadWidget: (
    options: CloudinaryUploadWidgetConfig & {
      styles: { palette: { [key: string]: string } };
    },
    onEvent: Function
  ) => CloudinaryUploadWidgetRef;
}

export type CloudinaryAssetFormat =
  | 'png'
  | 'gif'
  | 'jpeg'
  | 'pdf'
  | 'heif'
  | 'heic'
  | 'webp'
  | 'svg';

export interface CloudinaryMediaData {
  id?: string;
  batchId?: string;
  asset_id?: string;
  public_id: string;
  version?: number;
  version_id?: string;
  signature?: string;
  width: number;
  height: number;
  format: CloudinaryAssetFormat;
  resource_type?: string;
  created_at?: string;
  tags?: string[];
  bytes: number;
  type?: string;
  etag?: string;
  placeholder?: boolean;
  url?: string;
  secure_url: string;
  access_mode?: string;
  original_filename: string;
  original_extension: string;
  path?: string;
  thumbnail_url: string;
  delete_token: string;
}
