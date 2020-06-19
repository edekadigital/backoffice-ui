import * as React from 'react';
import { default as Grid, GridJustification } from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

const GRID_SPACING = 2;

export type FormRowJustify =
  | 'auto'
  | 'left'
  | 'right'
  | 'space-between'
  | undefined;

export type FormRowItemSize = 2 | 3 | 4 | 6 | 8 | 9 | 10 | 12 | 'auto';

export interface FormRowProps {
  children: React.ReactNode | React.ReactNode[];
  gutterBottom?: boolean | number;
  justify?: FormRowJustify;
  gridLayout?: FormRowItemSize[];
  maxWidth?: Breakpoint | number;
}

interface SanitizedFormProps {
  children: React.ReactNode[];
  gutterBottom: number;
  justify: GridJustification;
  gridLayout: FormRowItemSize[];
  maxWidth?: Breakpoint | number;
}

function getSanitizedProps(props: FormRowProps): SanitizedFormProps {
  const {
    children,
    gutterBottom = 0,
    justify,
    gridLayout = [],
    maxWidth,
  } = props;
  let tempGridLayout = gridLayout;
  const childrenSize = Array.isArray(children) ? children.length : 1;
  if (tempGridLayout.length < childrenSize) {
    tempGridLayout = new Array(childrenSize).fill(12 / childrenSize);
  }
  return {
    children: Array.isArray(children) ? children : [children],
    gutterBottom: gutterBottom === true ? 2 : +gutterBottom,
    justify: mapJustifyToJustifyContent(justify),
    gridLayout: tempGridLayout,
    maxWidth,
  };
}

function mapJustifyToJustifyContent(
  justify: FormRowJustify
): GridJustification {
  /* istanbul ignore next */
  switch (justify) {
    case 'auto':
      return 'flex-start';
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    case 'space-between':
      return 'space-between';
    default:
      return 'flex-start';
  }
}

const useStyles = makeStyles<Theme, SanitizedFormProps>((theme) => ({
  root: ({ gutterBottom, maxWidth }) => {
    let maxWidthValue: number | undefined = undefined;

    if (typeof maxWidth === 'number') {
      maxWidthValue = maxWidth;
    } else if (maxWidth) {
      maxWidthValue = theme.breakpoints.width(maxWidth);
    }

    return {
      marginBottom: theme.spacing(
        Math.max(gutterBottom - GRID_SPACING * 0.5, 0)
      ),
      maxWidth: maxWidthValue,
    };
  },
}));

export const FormRow: React.FC<FormRowProps> = (rawProps) => {
  const props = getSanitizedProps(rawProps);
  const { children, gridLayout, justify } = props;
  const classes = useStyles(props);

  const gridItemSizeSm = (12 / gridLayout.length) as FormRowItemSize;

  const items = children.map((tempChild, index) => (
    <Grid
      item={true}
      md={gridLayout[index]}
      sm={gridItemSizeSm}
      xs={12}
      key={`form-row-item-${index}`}
      data-testid={`formRow-item-${index}`}
    >
      {tempChild}
    </Grid>
  ));
  return (
    <div className={classes.root}>
      <Grid container={true} justify={justify} spacing={GRID_SPACING}>
        {items}
      </Grid>
    </div>
  );
};
