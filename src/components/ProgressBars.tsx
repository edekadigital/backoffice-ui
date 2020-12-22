import { Grid, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { Body } from '../typography/Body';

export interface ProgressBarsProps {
  /**
   * Array of Progress Bars. Available Colors are primary, success and error
   */
  items: Array<ProgressBarItem>;
}

/**
 * | Test ID                                 | Description                 |
 * | --------------------------------------- | --------------------------- |
 * | `progressBars`                          | container                   |
 * | `progressBar-item-${index}`             | progress bar item           |
 * | `progressBar-item-${index}-headline`    | headline of bar item        |
 * | `progressBar-item-${index}-description` | bar description of bar item |
 * | `progressBar-item-${index}-bar`         | actual bar of bar item      |
 */

export const ProgressBars: React.FC<ProgressBarsProps> = (props) => {
  const { items } = props;
  const renderItems = items.map((item, index) => (
    <Grid key={index} item>
      <ProgressBarItem
        headline={item.headline}
        description={item.description}
        value={item.value}
        color={item.color}
        index={index}
      />
    </Grid>
  ));

  return (
    <Grid
      container
      spacing={3}
      alignItems={'stretch'}
      data-testid="progressBars"
    >
      {renderItems}
    </Grid>
  );
};

const useProgressBarStyles = makeStyles<Theme, Pick<ProgressBarItem, 'color'>>(
  (theme: Theme) => ({
    container: {
      height: theme.spacing(13),
      width: theme.spacing(30),
      border: `2px solid ${theme.palette.grey[300]}`,
      borderRadius: '4px',
      padding: '16px 16px 18px',
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

export interface ProgressBarItem {
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

const ProgressBarItem: React.FC<ProgressBarItem> = (props) => {
  const { headline, description, value, color = 'primary', index } = props;
  const classes = useProgressBarStyles({ color });
  return (
    <div
      className={classes.container}
      data-testid={`progressBar-item-${index}`}
    >
      {headline ? (
        <Body
          gutterBottom={1}
          variant="body2"
          data-testid={`progressBar-item-${index}-headline`}
        >
          {headline}
        </Body>
      ) : null}
      {description ? (
        <Body
          gutterBottom={1}
          variant="caption"
          data-testid={`progressBar-item-${index}-description`}
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
        data-testid={`progressBar-item-${index}-bar`}
      />
    </div>
  );
};
