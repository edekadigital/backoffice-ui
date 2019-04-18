import * as React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';

const iconStyles = (theme: Theme) =>
  createStyles({
    left: {
      marginRight: theme.spacing.unit,
    },
    right: {
      marginLeft: theme.spacing.unit,
    },
  });

function renderIcon(
  IconComponent: React.ComponentType<SvgIconProps>,
  position: InlineIconPosition
) {
  const StyledIconComponent = withStyles(iconStyles)((props: WithStyles) => (
    <IconComponent className={props.classes[position]} />
  ));
  return <StyledIconComponent />;
}

export type InlineIconPosition = 'left' | 'right';

export interface InlineIconProps {
  icon: React.ComponentType<SvgIconProps>;
  position: InlineIconPosition;
}

export const InlineIcon: React.FC<InlineIconProps> = ({ icon, position }) => (
  <>{renderIcon(icon, position)}</>
);

export const WithInlineIcon: React.FC<InlineIconProps> = props =>
  props.position === 'left' ? (
    <>
      <InlineIcon {...props} />
      {props.children}
    </>
  ) : (
    <>
      {props.children}
      <InlineIcon {...props} />
    </>
  );
