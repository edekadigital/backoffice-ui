import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Body } from '../typography/Body';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Button } from './Button';
import { ServiceIcon } from './internal/ServiceIcon';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Grid from '@material-ui/core/Grid';

export interface ServiceTileProps {
  /**
   * The service title.
   */
  title: string;
  /**
   * The service icon to show. It can be a SVG icon or a path to a bitmap image.
   */
  icon?: React.ElementType<SvgIconProps> | string;
  /**
   * The description text to show.
   */
  description?: string;
  /**
   * The callback function for the button
   */
  onClick: React.MouseEventHandler<HTMLElement>;
  /**
   * The label of the tile button.
   */
  buttonLabel: string;
  /**
   * The optional service info to show.
   */
  info?: string;
}

export interface ServiceTilesProps {
  /**
   * The service tiles to show. (see: `ServiceTileProps`)
   */
  services: ServiceTileProps[];
}

const useCardStyles = makeStyles(() => ({
  root: () => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }),
}));

const useCardHeaderStyles = makeStyles<Theme, ServiceTileProps>((theme) => ({
  root: ({ description }) => ({
    paddingBottom: description ? 0 : theme.spacing(2),
  }),
}));

const useCardContentStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    flex: '1 0 auto',
    '&:last-child': {
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1),
      flex: '0 0 auto',
      alignItems: 'center',
    },
  },
}));

export const ServiceTile: React.FC<ServiceTileProps & { index: number }> = (
  props
) => {
  const { title, icon, description, onClick, buttonLabel, info, index } = props;
  const cardClasses = useCardStyles();
  const headerClasses = useCardHeaderStyles(props);
  const contentClasses = useCardContentStyles();

  const headerIcon = icon ? (
    <ServiceIcon icon={icon} data-testid={`serviceTile-${index}-icon`} />
  ) : undefined;

  const renderContent = description ? (
    <CardContent classes={contentClasses}>
      <Body
        variant={'body2'}
        color={'textSecondary'}
        data-testid={`serviceTile-${index}-description`}
      >
        {description}
      </Body>
    </CardContent>
  ) : null;

  return (
    <Card
      variant="outlined"
      data-testid={`serviceTile-${index}`}
      classes={cardClasses}
    >
      <CardHeader
        title={title}
        avatar={headerIcon}
        titleTypographyProps={{
          variant: 'subtitle1',
          'data-testid': `serviceTile-${index}-title`,
        }}
        classes={headerClasses}
      />
      {renderContent}
      <Divider />
      <CardContent classes={{ root: contentClasses.root }}>
        <Body
          variant={'body2'}
          color={'textSecondary'}
          data-testid={`serviceTile-${index}-info`}
        >
          {info}
        </Body>
        <Button
          onClick={onClick}
          size={'small'}
          color={'primary'}
          data-testid={`serviceTile-${index}-button`}
        >
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles<Theme>((theme) => ({
  container: () => ({
    marginBottom: theme.spacing(3),
    overflowX: 'hidden',
  }),
}));

/**
 * | Test ID                            | Description     |
 * | ---------------------------------- | --------------- |
 * | `serviceTile-${index}`             | container       |
 * | `serviceTile-${index}-icon`        | icon            |
 * | `serviceTile-${index}-title`       | title           |
 * | `serviceTile-${index}-description` | description     |
 * | `serviceTile-${index}-info`        | info text       |
 * | `serviceTile-${index}-button`      | button          |
 */
export const ServiceTiles: React.FC<ServiceTilesProps> = (
  props: ServiceTilesProps
) => {
  const classes = useStyles();

  const serviceTiles = props.services.map((serviceTileProps, index) => (
    <Grid item key={index} xs={12} sm={6} md={3}>
      <ServiceTile {...serviceTileProps} index={index} />
    </Grid>
  ));
  return (
    <Grid
      container
      spacing={3}
      data-testid={'serviceTiles'}
      alignItems={'stretch'}
      classes={classes}
    >
      {serviceTiles}
    </Grid>
  );
};
