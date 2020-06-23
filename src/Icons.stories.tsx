import * as React from 'react';
import { IconGallery } from 'storybook-icon-gallery';
import * as ExportedIcons from './icons';

export default {
  title: 'Backoffice UI|3 - Icons',
};

export const Default = () => {
  const icons = Object.keys(ExportedIcons);

  const renderIcons = icons.map((icon) => {
    // @ts-expect-error
    const Component = ExportedIcons[icon];
    return (
      <IconGallery.Item name={icon} key={icon}>
        <Component />
      </IconGallery.Item>
    );
  });

  return <IconGallery>{renderIcons}</IconGallery>;
};
