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
import { Container } from '@material-ui/core';

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
  onClick: () => void;
  /**
   * The label of the tile button.
   */
  buttonLabel: string;
  /**
   * The optional service info to show.
   */
  info?: string;
}

const useCardHeaderStyles = makeStyles<Theme, ServiceTileProps>((theme) => ({
  root: ({ description }) => ({
    paddingBottom: description ? 0 : theme.spacing(2),
  }),
}));

const useCardContentStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    '&:last-child': {
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      '& > *:first-child': {
        flexGrow: 1,
      },
    },
  },
}));

/**
 * | Test ID                   | Description     |
 * | ------------------------- | --------------- |
 * | `serviceTile`             | container       |
 * | `serviceTile-icon`        | icon            |
 * | `serviceTile-title`       | title           |
 * | `serviceTile-description` | description     |
 * | `serviceTile-info`        | info text       |
 * | `serviceTile-button`      | button          |
 */
export const ServiceTile: React.FC<ServiceTileProps> = (props) => {
  const { title, icon, description, onClick, buttonLabel, info } = props;
  const headerClasses = useCardHeaderStyles(props);
  const contentClasses = useCardContentStyles();

  const headerIcon = icon ? (
    <ServiceIcon icon={icon} data-testid="serviceTile-icon" />
  ) : undefined;

  const renderContent = description ? (
    <CardContent classes={contentClasses}>
      <Body
        variant={'body2'}
        color={'textSecondary'}
        data-testid="serviceTile-description"
      >
        {description}
      </Body>
    </CardContent>
  ) : null;

  return (
    <Container maxWidth={'xs'} disableGutters>
      <Card variant="outlined" data-testid="serviceTile">
        <CardHeader
          title={title}
          avatar={headerIcon}
          titleTypographyProps={{
            variant: 'subtitle1',
            'data-testid': 'serviceTile-title',
          }}
          classes={headerClasses}
        />
        {renderContent}
        <Divider />
        <CardContent classes={{ root: contentClasses.root }}>
          <Body
            variant={'body2'}
            color={'textSecondary'}
            data-testid="serviceTile-info"
          >
            {info}
          </Body>
          <Button
            onClick={onClick}
            size={'small'}
            color={'primary'}
            data-testid="serviceTile-button"
          >
            {buttonLabel}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};
