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

export type CloudinaryOptions = CloudinaryConfig & {
  styles: { palette: { [key: string]: string } };
};

export interface CloudinaryWidget {
  open: Function;
  destroy: Function;
}

export interface Cloudinary {
  createUploadWidget: (
    options: CloudinaryOptions,
    onEvent: Function
  ) => CloudinaryWidget;
}
declare global {
  interface Window {
    cloudinary?: Cloudinary;
  }
}

export const loadCloudinaryScript = () => {
  const existingScript = document.getElementById('cloudinary');

  if (!existingScript) {
    return new Promise<Cloudinary>((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
      script.id = 'cloudinary';
      document.body.appendChild(script);

      script.onload = () => {
        resolve(window.cloudinary as Cloudinary);
      };

      script.onerror = (error) => {
        console.log('Error', error);
        reject();
      };
    });
  }
  return;
};
