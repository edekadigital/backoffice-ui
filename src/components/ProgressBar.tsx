import { LinearProgress, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { Body } from '../typography/Body';

export interface ProgressBarProps {
  headline?: string;
  description?: string;
  value: number;
  color?: ProgressBarColors;
  index?: number;
}

export type ProgressBarColors =
  | 'primary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

const useProgressBarStyles = makeStyles<Theme, Pick<ProgressBarProps, 'color'>>(
  (theme: Theme) => ({
    container: {
      height: theme.spacing(13),
      border: `${theme.spacing(0.25)}px solid ${theme.palette.grey[300]}`,
      borderRadius: '4px',
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(
        2.25
      )}px`,
    },
    progressBar: ({ color }) => {
      const sanitizedColorName: ProgressBarColors = color || 'primary';
      const colorMap: { [k: string]: string } = {
        info: theme.palette.primary.main,
        warning: theme.palette.warning.main,
        success: theme.palette.success.main,
        error: theme.palette.error.main,
      };
      return {
        backgroundColor:
          sanitizedColorName in colorMap
            ? colorMap[sanitizedColorName]
            : theme.palette.primary.main,
      };
    },
    progressBackground: ({ color }) => {
      const sanitizedColorName: ProgressBarColors = color || 'primary';
      const colorMap: { [k: string]: string } = {
        info: theme.palette.primary.light,
        warning: theme.palette.warning.light,
        success: theme.palette.success.light,
        error: theme.palette.error.light,
      };
      return {
        backgroundColor:
          sanitizedColorName in colorMap
            ? colorMap[sanitizedColorName]
            : theme.palette.primary.light,
      };
    },
  })
);

/**
 * | Test ID                   | Description                 |
 * | --------------------------| --------------------------- |
 * | `progressBar`             | container                   |
 * | `progressBar-headline`    | headline of bar item        |
 * | `progressBar-description` | bar description of bar item |
 * | `progressBar-bar`         | actual bar of bar item      |
 */

export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const { headline, description, value, color = 'primary' } = props;
  const classes = useProgressBarStyles({ color });
  return (
    <div className={classes.container} data-testid="progressBar">
      {headline ? (
        <Body
          gutterBottom={1}
          variant="body2"
          data-testid="progressBar-headline"
        >
          {headline}
        </Body>
      ) : null}
      {description ? (
        <Body
          gutterBottom={1}
          variant="caption"
          data-testid="progressBar-description"
        >
          {description}
        </Body>
      ) : null}
      <LinearProgress
        classes={{
          bar1Determinate: classes.progressBar,
          colorPrimary: classes.progressBackground,
        }}
        variant="determinate"
        value={value}
        data-testid="progressBar-bar"
      />
    </div>
  );
};
