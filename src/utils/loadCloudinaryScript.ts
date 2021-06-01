import { Cloudinary } from '../components/Cloudinary';

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
        console.error('Error', error);
        reject();
      };
    });
  }
  return;
};
