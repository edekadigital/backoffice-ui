import * as React from 'react';
import { createRef, useEffect } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import objectFitImages from 'object-fit-images';

export type ImagePosition = 'relative' | 'absolute';

export type ImageMode =
  | 'width'
  | 'height'
  | 'fill'
  | 'contain'
  | 'cover'
  | 'scale-down';

export type ImageSource = React.SourceHTMLAttributes<HTMLSourceElement>;

export interface ImageProps {
  src: string;
  alt: string;
  position?: ImagePosition;
  mode?: ImageMode;
  sources?: ImageSource[];
}
/* istanbul ignore next */
const useStyles = makeStyles<unknown, ImageProps>({
  root: {},
  img: ({ mode = 'width', position = 'relative' }) => ({
    position,
    display: 'block',
    width: mode === 'height' ? 'auto' : '100%',
    height: mode === 'width' ? 'auto' : '100%',
    objectFit: mode === 'width' || mode === 'height' ? undefined : mode,
    fontFamily:
      mode === 'width' || mode === 'height'
        ? undefined
        : `"object-fit: ${mode}"`,
  }),
});

const renderSource = (props: ImageSource, index: number) => (
  <source key={`source-item-${index}`} {...props} />
);

export const Image: React.FC<ImageProps> = (props) => {
  const { src, alt, sources = [] } = props;
  const classes = useStyles(props);

  const image = createRef<HTMLImageElement>();

  useEffect(() => {
    const imageSelector = image.current!.classList[0];
    objectFitImages(`img.${imageSelector}`);
  }, [src]);

  return (
    <picture className={classes.root}>
      {sources.map(renderSource)}
      <img src={src} alt={alt} className={classes.img} ref={image} />
    </picture>
  );
};
