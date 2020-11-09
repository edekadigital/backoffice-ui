import * as React from 'react';
import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
  ButtonGroup,
} from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowDownIcon, ListMenu } from '..';

export type ButtonVariant = 'contained' | 'text' | 'outlined';

export type ButtonColor = 'inherit' | 'default' | 'primary' | 'secondary';

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
    ...additionalProps
  } = props;
  const classes = useStyles();

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return React.useMemo(() => {
    if (menu?.items) {
      if (menu.splitButton) {
        return (
          <>
            <ButtonGroup
              variant={variant}
              {...additionalProps}
              classes={{
                groupedContainedPrimary: classes.buttonGroupContainedPrimary,
              }}
            >
              <Button
                variant={variant}
                {...additionalProps}
                data-testid="splitButton-main"
              >
                {content()}
              </Button>
              <Button onClick={handleMenuOpen} data-testid="splitButton-menu">
                <KeyboardArrowDownIcon />
              </Button>
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
              variant={variant}
              onClick={handleMenuOpen}
              {...additionalProps}
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
        <MuiButton variant={variant} {...additionalProps}>
          {content()}
        </MuiButton>
      );
    }
  }, [anchorEl, props]);
};
