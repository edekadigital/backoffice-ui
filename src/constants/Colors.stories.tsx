import * as React from 'react';
import useTheme from '@material-ui/styles/useTheme';
import { Theme } from '@material-ui/core';

export default {
  title: 'Backoffice UI/2 - Colors',
};

interface ColorItem {
  name: string | number;
  value: string;
}
interface ColorPaletteProps {
  colors: Array<ColorItem>;
}
const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  const renderItems = colors.map((color, index) => (
    <li style={{ borderBottom: 'solid 1px #ddd' }} key={index}>
      <div
        style={{
          marginBottom: 16,
          padding: 16,
          paddingLeft: 0,
          marginTop: 16,
          display: 'flex',
        }}
      >
        <div
          style={{
            backgroundColor: color.value,
            borderColor: 'black',
            borderStyle: 'solid',
            borderWidth: '1px',
            height: 40,
            marginRight: '10px',
            width: 100,
          }}
        />
        <pre
          style={{
            fontSize: '14px',
            lineHeight: '40px',
            margin: 0,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '250px',
            }}
          >
            <span style={{ userSelect: 'none' }}>{color.value}</span>
          </span>
          <span>{color.name}</span>
        </pre>
      </div>
    </li>
  ));
  return (
    <ul
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        textAlign: 'left',
      }}
    >
      {renderItems}
    </ul>
  );
};

const Colors = () => {
  const theme = useTheme<Theme>();
  const colors = [
    { name: 'primary', value: theme.palette.primary.main },
    { name: 'secondary', value: theme.palette.secondary.main },
    { name: 'textPrimary', value: theme.palette.text.primary },
    { name: 'textSecondary', value: theme.palette.text.secondary },
    { name: 'error', value: theme.palette.error.main },
    { name: 'warning', value: theme.palette.warning.main },
    { name: 'success', value: theme.palette.success.main },
  ];

  return (
    <div style={{ padding: 16 }}>
      <h1>Selectable Component Colors</h1>
      <ColorPalette colors={colors} />
    </div>
  );
};

const AllColors = () => {
  const theme = useTheme<Theme>();

  const palettes = [
    'action',
    'background',
    'common',
    'divider',
    'error',
    'grey',
    'info',
    'primary',
    'secondary',
    'success',
    'text',
    'warning',
  ];

  const renderPalettes = palettes.map((palette) => {
    const colors: ColorItem[] = [];
    const themePalette = theme.palette[palette as keyof typeof theme.palette];
    if (typeof themePalette === 'object') {
      Object.keys(themePalette).forEach((key) => {
        if (
          typeof themePalette[key as keyof typeof themePalette] === 'string'
        ) {
          colors.push({
            name: `theme.palette.${palette}.${key}`,
            value: themePalette[key as keyof typeof themePalette],
          });
        }
      });
    } else {
      colors.push({
        name: `theme.palette.${palette}`,
        value: themePalette.toString(),
      });
    }
    return (
      <div key={palette}>
        <h1>{palette}</h1>
        <ColorPalette colors={colors} />
      </div>
    );
  });

  return <div style={{ padding: 16 }}>{renderPalettes}</div>;
};

export const SelectableComponentColors = () => <Colors />;
export const ThemeColors = () => <AllColors />;
