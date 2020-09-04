// @ts-nocheck
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '../components/Button';
import jsSHA from 'jssha';
const useStyles = makeStyles(() => {
  return {
    gallery: {
      margin: 5,
      border: '1px solid #ccc',
      float: 'left',
      width: 180,
      '& img': {
        width: '100%',
        height: 'auto',
      },
    },
    desc: {
      padding: 15,
      textAlign: 'center',
    },
  };
});

export const CloudinaryWidget: React.FC = () => {
  const [images, setImages] = React.useState([]);
  const classes = useStyles();

  const timestamp = Math.round(new Date().getTime() / 1000);
  /**
   * TODO: SHA Verschlüsselung bzw. Erstellen der Signature muss in Backend implementiert werden!
   * Cloudinary config muss als env-var gesetzt werden, um die widgets testen zu können.
   * `export STORYBOOK_CLOUDINARY_CLOUD_NAME=***`
   */
  const cloudName = process.env.STORYBOOK_CLOUDINARY_CLOUD_NAME;
  const userName = process.env.STORYBOOK_CLOUDINARY_USER_NAME;
  const apiSecret = process.env.STORYBOOK_CLOUDINARY_API_SECRET;
  const apiKey = process.env.STORYBOOK_CLOUDINARY_API_KEY;
  const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(
    `cloud_name=${cloudName}&timestamp=${timestamp}&username=${userName}${apiSecret}`
  );
  const hash = shaObj.getHash('HEX');
  console.log(hash);
  /*** */

  const openWidget = () => {
    window.cloudinary.openMediaLibrary(
      {
        api_key: apiKey,
        cloud_name: cloudName,
        timestamp: timestamp,
        username: userName,
        signature: hash,
      },
      {
        insertHandler: (data) => {
          data.assets.forEach((asset) => {
            setImages((imgs) => imgs.concat(asset));
            console.log('Inserted asset:', JSON.stringify(asset, null, 2));
          });
        },
      }
    );
  };

  const renderImages = React.useMemo(() => {
    return images.map((image, index) => (
      <div key={index} className={classes.gallery}>
        <img src={image.secure_url} alt="" width="600" height="400" />
        <div className={classes.desc}>Public ID: {image.public_id}</div>
      </div>
    ));
  }, [images]);

  return (
    <>
      <div>
        <Button onClick={openWidget}>Open Image Browser</Button>
      </div>
      <div>{renderImages}</div>
    </>
  );
};
