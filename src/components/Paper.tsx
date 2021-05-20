import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { default as MuiPaper } from '@material-ui/core/Paper';
import { Heading } from '../typography/Heading';
import { Divider, useMediaQuery, useTheme } from '@material-ui/core';
import { Spacer } from '..';
import { Image } from './Image';

export type PaperColor = 'initial' | 'primary';
export type BorderStyle = 'solid' | 'dashed';

export interface PaperProps {
  /**
   * If `true`, the paper component will have a bottom margin.
   */
  gutterBottom?: boolean;
  /**
   * Optional paper headline
   */
  headline?: string;
  /**
   * Optional background color, allowed are theme colors, currently only primary theme color
   * @default initial
   */
  backgroundColor?: PaperColor;
  /**
   * If false divider is not shown underneath the headline
   * @default true
   */
  divider?: boolean;
  /**
   * Image that will appear in the right top corner, will disappear on mobile viewport
   */
  image?: React.ElementType<SVGImageElement> | string;
  /**
   * Sets border style of the paper component
   * @default solid
   */
  borderStyle?: BorderStyle;
}

const useStyles = makeStyles<Theme, PaperProps>((theme) => ({
  paperRoot: ({
    gutterBottom,
    backgroundColor = 'initial',
    borderStyle = 'solid',
  }) => {
    const colorMap = {
      primary: theme.palette.primary.main,
      initial: theme.palette.background.paper,
    };
    const borderStyleMap = {
      solid: `1px solid ${theme.palette.action.focus}`,
      dashed: `1px dashed ${theme.palette.action.focus}`,
    };
    return {
      marginBottom: theme.spacing(gutterBottom ? 3 : 0),
      padding: theme.spacing(3),
      backgroundColor: colorMap[backgroundColor],
      color:
        backgroundColor === 'primary'
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
      position: 'relative',
      border: borderStyleMap[borderStyle],
    };
  },
  headingRoot: {
    marginTop: theme.spacing(-1),
  },
  dividerRoot: {
    margin: theme.spacing(2, -3),
  },
  image: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  container: {
    position: 'relative',
    zIndex: 1,
  },
}));

/**
 * | Test ID           | Description          |
 * | ----------------- | -------------------- |
 * | `paper`           | Paper container      |
 * | `paper-headline`  | Paper headline       |
 * | `paper-image`     | Paper image       |
 * | `paper-divider`   | Paper divider       |
 */
export const Paper: React.FC<PaperProps> = (props) => {
  const classes = useStyles(props);
  const theme = useTheme<Theme>();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { divider = true } = props;

  const headline = props.headline ? (
    <>
      <div className={classes.headingRoot}>
        <Heading variant={'h6'} data-testid={'paper-headline'}>
          {props.headline}
        </Heading>
      </div>
      {divider ? (
        <Divider classes={{ root: classes.dividerRoot }} />
      ) : (
        <Spacer vertical={3} />
      )}
    </>
  ) : null;

  const image = React.useMemo(() => {
    if (props.image && !mobile) {
      if (typeof props.image === 'string') {
        return (
          <div className={classes.image} data-testid="paper-image">
            <Image alt="image" mode="height" src={props.image} />;
          </div>
        );
      } else {
        return (
          <div className={classes.image} data-testid="paper-image">
            {props.image}
          </div>
        );
      }
    }
    return null;
  }, [classes.image, mobile, props.image]);

  return (
    <MuiPaper
      variant={'outlined'}
      classes={{ root: classes.paperRoot }}
      data-testid={'paper'}
    >
      {headline}
      <div className={classes.container}>{props.children}</div>
      {image}
    </MuiPaper>
  );
};
