import * as React from 'react';
import { Heading } from '../../typography/Heading';
import { makeStyles, Box, SvgIconProps, Divider } from '@material-ui/core';
import MuiIconButton from '@material-ui/core/IconButton';
import { ButtonBar } from '../..';

export interface TableBarProps {
  actions?: TableBarAction[];
  headline?: string;
}

export interface TableBarAction {
  icon: React.ElementType<SvgIconProps>;
  handler: () => void;
}

const useStyles = makeStyles((theme) => ({
  tableBarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const TableBar: React.FC<TableBarProps> = (props) => {
  const { headline, actions = [] } = props;

  const classes = useStyles();

  const actionItems = actions.map(({ icon, handler }, index) => {
    const IconComponent = icon;
    const handleClick = () => handler();
    return (
      <div key={`action-item-${index}`}>
        <MuiIconButton
          color="default"
          onClick={handleClick}
          data-testid="tablebar-action"
        >
          <IconComponent fontSize="small" />
        </MuiIconButton>
      </div>
    );
  });

  const heading = React.useMemo(
    () =>
      headline ? (
        <Heading variant="h4" data-testid="tablebar-heading">
          {headline}
        </Heading>
      ) : null,
    [headline]
  );

  const actionBar = React.useMemo(
    () => (actions ? <ButtonBar>{actionItems}</ButtonBar> : null),
    [actions, actionItems]
  );

  return (
    <>
      <Box className={classes.tableBarContainer}>
        {heading}
        {actionBar}
      </Box>
      <Divider />
    </>
  );
};
