import { Container, ContainerProps, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

export type FlexContainerJustify =
  | 'auto'
  | 'left'
  | 'right'
  | 'space-between'
  | 'center';

export type FlexContainerAlign = 'auto' | 'start' | 'end' | 'center';

export interface FlexContainerProps {
  /**
   * The elements (children) to be rendered in the form row
   */
  children: NonNullable<React.ReactNode>;
  /**
   * If `true` or a number is set, the form row will have a bottom margin.
   */
  gutterBottom?: boolean | number;
  /**
   * If `true` or a number is set, the form row will have a top margin.
   */
  gutterTop?: boolean | number;
  /**
   * Justifies the container items.
   * @default left
   */
  justify?: FlexContainerJustify;
  /**
   * Aligns the container items.
   * @default center
   */
  align?: FlexContainerAlign;
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters?: boolean;
  /**
   * Component type of flex container
   * @default div
   */
  component?: React.ElementType<ContainerProps>;
}

const getCSSString = (prop: string) => {
  switch (prop) {
    case 'right':
      return 'flex-end';
    case 'end':
      return 'flex-end';
    case 'space-between':
      return 'space-between';
    case 'center':
      return 'center';
    case 'left':
    case 'auto':
    case 'start':
    default:
      return 'flex-start';
  }
};

const useStyles = makeStyles<
  Theme,
  {
    gutterBottom: number;
    gutterTop: number;
    justify: FlexContainerJustify;
    align: FlexContainerAlign;
  }
>((theme) => {
  return {
    root: ({ gutterBottom, gutterTop, justify, align }) => ({
      marginBottom: theme.spacing(gutterBottom),
      marginTop: theme.spacing(gutterTop),
      alignItems: getCSSString(align),
      justifyContent: getCSSString(justify),
      display: 'flex',
    }),
  };
});

export const FlexContainer: React.FC<FlexContainerProps> = (props) => {
  const {
    gutterBottom = 0,
    gutterTop = 0,
    justify = 'left',
    align = 'center',
    component = 'div',
    disableGutters,
    children,
  } = props;
  const classes = useStyles({
    gutterBottom: gutterBottom === true ? 3 : +gutterBottom,
    gutterTop: gutterTop === true ? 3 : +gutterTop,
    justify,
    align,
  });
  return (
    <Container
      component={component}
      disableGutters={disableGutters}
      classes={classes}
      data-testid="flex-container"
    >
      {children}
    </Container>
  );
};
