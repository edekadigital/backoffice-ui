import * as React from 'react';
import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
  ButtonGroup,
  alpha,
} from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowDownIcon, ListMenu } from '..';

export type ButtonVariant = 'contained' | 'text' | 'outlined';

export type ButtonColor =
  | 'inherit'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success';

export type ButtonComponent = React.ElementType<MuiButtonProps>;

export type ButtonType = 'submit' | 'reset' | 'button';

export type ButtonIcon = React.ElementType<SvgIconProps>;

export type ButtonIconPosition = 'left' | 'right';

export interface ButtonMenuItem {
  label: string;
  handler: React.MouseEventHandler<HTMLElement>;
}

export interface ButtonMenu {
  splitButton?: boolean;
  items?: Array<ButtonMenuItem>;
}

export interface ButtonProps {
  className?: string;
  /**
   * The color of the button. It supports those theme colors that make sense for this component.
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
   * The URL to link to when the button is clicked.
   * If defined, an a element will be used as the root node.
   */
  href?: string;
  /**
   * If set the given icon will be rendered in the button component
   */
  icon?: ButtonIcon;
  /**
   * Sets the postion of the provided icon in the button compontent
   * @default "left"
   */
  iconPosition?: ButtonIconPosition;
  /**
   * If provided, a selection menu will be shown on clicking the button itself (`splitButton=false`)
   * or on clicking the arrow icon in split button mode (`splitButton=true`)
   */
  menu?: ButtonMenu;
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
   * The size of the button.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Target where to open the linked URL resource
   */
  target?: string;
  /**
   * The button type
   */
  type?: ButtonType;
  /**
   * The variant to use.
   * @default "contained"
   */
  variant?: ButtonVariant;
}
// https://github.com/mui-org/material-ui/issues/24778, success, error, warning, info might be added to type Color
const useOveridesStyles = makeStyles<Theme, { color: ButtonColor }>(
  (theme: Theme) => {
    const buttonColorMap: Record<ButtonColor, string> = {
      success: theme.palette.success.main,
      error: theme.palette.error.main,
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      default: theme.palette.grey[300],
      inherit: 'inherit',
    };

    const buttonTextColorMap: Record<ButtonColor, string> = {
      success: theme.palette.success.contrastText,
      error: theme.palette.error.contrastText,
      primary: theme.palette.primary.contrastText,
      secondary: theme.palette.secondary.contrastText,
      default: theme.palette.text.primary,
      inherit: 'inherit',
    };
    const buttonHoverColorMap: Record<ButtonColor, string> = {
      success: theme.palette.success.dark,
      error: theme.palette.error.dark,
      primary: theme.palette.primary.dark,
      secondary: theme.palette.secondary.dark,
      default: theme.palette.grey.A100,
      inherit: 'inherit',
    };

    const buttonTextHoverColorMap: Record<ButtonColor, string> = {
      success: alpha(theme.palette.success.main, 0.04),
      error: alpha(theme.palette.error.main, 0.04),
      primary: alpha(theme.palette.primary.main, 0.04),
      secondary: alpha(theme.palette.secondary.main, 0.04),
      default: theme.palette.action.hover,
      inherit: 'inherit',
    };

    const buttonOutlinedBorderColorMap: Record<ButtonColor, string> = {
      success: alpha(theme.palette.success.main, 0.5),
      error: alpha(theme.palette.error.main, 0.5),
      primary: alpha(theme.palette.primary.main, 0.5),
      secondary: alpha(theme.palette.secondary.main, 0.5),
      default: alpha(theme.palette.common.black, 0.23),
      inherit: 'inherit',
    };

    const buttonOutlinedHoverBorderColorMap: Record<ButtonColor, string> = {
      success: theme.palette.success.main,
      error: theme.palette.error.main,
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      default: alpha(theme.palette.common.black, 0.23),
      inherit: 'inherit',
    };

    const buttonOutlinedTextColorMap: Record<ButtonColor, string> = {
      success: theme.palette.success.main,
      error: theme.palette.error.main,
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      default: theme.palette.text.primary,
      inherit: 'inherit',
    };

    return {
      contained: ({ color }) => {
        return {
          backgroundColor: buttonColorMap[color],
          color: buttonTextColorMap[color],
          '&:hover': { backgroundColor: buttonHoverColorMap[color] },
        };
      },
      outlined: ({ color }) => {
        return {
          borderColor: buttonOutlinedBorderColorMap[color],
          color: buttonOutlinedTextColorMap[color],
          '&:hover': {
            backgroundColor: buttonTextHoverColorMap[color],
            borderColor: buttonOutlinedHoverBorderColorMap[color],
          },
        };
      },
      text: ({ color }) => {
        return {
          color: buttonOutlinedTextColorMap[color],
          '&:hover': {
            backgroundColor: buttonTextHoverColorMap[color],
          },
        };
      },
    };
  }
);

const useStyles = makeStyles((theme: Theme) => {
  return {
    iconLeft: {
      marginRight: theme.spacing(),
    },
    iconRight: {
      marginLeft: theme.spacing(),
    },
    buttonGroupContainedPrimary: {
      borderColor: `${theme.palette.common.white}!important`,
    },
  };
});
/**
 * | Test ID                | Description                               |
 * | ---------------------- | ----------------------------------------- |
 * | `splitButton-main`     | Splitted button: Main button              |
 * | `splitButton-menu`     | Splitted button: Menu button              |
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'contained',
    icon,
    iconPosition = 'left',
    showProgress = false,
    children,
    menu,
    color = 'default',
    ...additionalProps
  } = props;
  const classes = useStyles();
  const classesOverides = useOveridesStyles({ color });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const IconComponent = React.useMemo(() => {
    if (showProgress) {
      return (props: {}) => <CircularProgress size={24} {...props} />;
    } else if (icon) {
      return icon;
    } else {
      return null;
    }
  }, [icon, showProgress]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return React.useMemo(() => {
    const content = () => {
      if (IconComponent) {
        if (iconPosition === 'left' || menu) {
          return (
            <>
              <IconComponent className={classes.iconLeft} />
              {children}
            </>
          );
        } else {
          return (
            <>
              {children}
              <IconComponent className={classes.iconRight} />
            </>
          );
        }
      } else {
        return children;
      }
    };

    if (menu?.items) {
      if (menu.splitButton) {
        return (
          <>
            <ButtonGroup
              variant={variant}
              disabled={additionalProps.disabled}
              size={additionalProps.size}
              classes={{
                groupedContainedPrimary: classes.buttonGroupContainedPrimary,
              }}
            >
              <MuiButton
                {...additionalProps}
                variant={variant}
                data-testid="splitButton-main"
                classes={classesOverides}
              >
                {content()}
              </MuiButton>
              <MuiButton
                onClick={handleMenuOpen}
                data-testid="splitButton-menu"
                classes={classesOverides}
              >
                <KeyboardArrowDownIcon />
              </MuiButton>
            </ButtonGroup>
            <ListMenu
              items={menu.items}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorEl={anchorEl}
            />
          </>
        );
      } else {
        return (
          <>
            <MuiButton
              {...additionalProps}
              variant={variant}
              onClick={handleMenuOpen}
              classes={classesOverides}
            >
              {content()}
              <KeyboardArrowDownIcon />
            </MuiButton>
            <ListMenu
              items={menu.items}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorEl={anchorEl}
            />
          </>
        );
      }
    } else {
      return (
        <MuiButton
          variant={variant}
          {...additionalProps}
          classes={classesOverides}
        >
          {content()}
        </MuiButton>
      );
    }
  }, [
    IconComponent,
    additionalProps,
    anchorEl,
    children,
    classes.buttonGroupContainedPrimary,
    classes.iconLeft,
    classes.iconRight,
    classesOverides,
    iconPosition,
    menu,
    variant,
  ]);
};
