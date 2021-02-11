import * as React from 'react';
import {
  IconButton as MuiIconButton,
  CircularProgress,
  SvgIconProps,
  Theme,
} from '@material-ui/core';
import { ButtonColor, ButtonComponent, ButtonIcon, ButtonType } from './Button';
import { ListMenu } from '..';
import { makeStyles } from '@material-ui/styles';

export interface IconButtonMenuItem {
  icon?: React.ElementType<SvgIconProps>;
  label: string;
  handler: React.MouseEventHandler<HTMLElement>;
}

export interface IconButtonProps {
  className?: string;
  /**
   * The color of the button. It supports those theme colors that make sense for this component.
   * @default "default"
   */
  color?: ButtonColor;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: ButtonComponent;
  /**
   * If `true`, the button will be disabled.
   */
  disabled?: boolean;
  /**
   * The download file name
   */
  download?: string | boolean;
  /**
   * If given, uses a negative margin to counteract the padding on one side
   * (this is often helpful for aligning the left or right side of the icon
   * with content above or below, without ruining the border size and shape).
   * @default false
   */
  edge?: 'start' | 'end' | false;
  /**
   * The URL to link to when the button is clicked.
   * If defined, an a element will be used as the root node.
   */
  href?: string;
  /**
   * If set the given icon will be rendered in the button component
   */
  icon: ButtonIcon;
  /**
   * If provided, a selection menu will be shown on clicking the icon button itself, instead of calling the onClick callback function
   */
  menu?: Array<IconButtonMenuItem>;
  /**
   * Callback fired when the button has been clicked.
   */
  onClick?: React.MouseEventHandler;
  /**
   * If `true` a loading spinner will be shown.
   * @default false
   */
  showProgress?: boolean;
  /**
   * Target where to open the linked URL resource
   */
  target?: string;
  /**
   * The button type
   */
  type?: ButtonType;
}

const useOveridesStyles = makeStyles<Theme, { color: ButtonColor }>(
  (theme: Theme) => {
    const buttonColorMap: Record<ButtonColor, string> = {
      success: theme.palette.success.main,
      error: theme.palette.error.main,
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      default: theme.palette.action.active,
      inherit: 'inherit',
    };
    const buttonHoverColorMap: Record<ButtonColor, string> = {
      success: theme.palette.success.light,
      error: theme.palette.error.light,
      primary: theme.palette.primary.light,
      secondary: theme.palette.secondary.dark,
      default: theme.palette.action.hover,
      inherit: 'inherit',
    };

    return {
      root: ({ color }) => {
        return {
          color: buttonColorMap[color],
          '&:hover': { backgroundColor: buttonHoverColorMap[color] },
        };
      },
    };
  }
);

/**
 * | Test ID                | Description                                       |
 * | ---------------------- | ------------------------------------------------- |
 * | `iconButton-progress`  | progress indicator if showProgress is set to true |
 */
export const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    icon,
    color = 'default',
    menu,
    showProgress = false,
    onClick,
    ...additionalProps
  } = props;

  const classes = useOveridesStyles({ color });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const IconComponent = icon;
  const content = !showProgress ? (
    <IconComponent />
  ) : (
    <CircularProgress
      size={24}
      color="inherit"
      data-testid="iconButton-progress"
    />
  );
  return (
    <>
      <MuiIconButton
        classes={classes}
        onClick={menu ? handleMenuOpen : onClick}
        {...additionalProps}
      >
        {content}
      </MuiIconButton>
      {menu ? (
        <ListMenu
          items={menu}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorEl={anchorEl}
        />
      ) : null}
    </>
  );
};
