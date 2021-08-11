import * as React from 'react';
import classNames from 'clsx';
import { makeStyles } from '@material-ui/core';
import { IconButton } from './IconButton';
import { Add, Cancel } from '../icons';
import { Button } from './Button';

const useGrayBoxStyles = makeStyles((theme) => ({
  grayBoxWrapper: {
    position: 'relative',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
  },
  grayBox: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #c0c0c0',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#efefef',
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
  },
  shortBox: {
    display: 'inline-block',
  },
  buttonBoxTransform: {
    position: 'relative',
    width: theme.spacing(42),
    textAlign: 'center',
  },
  connectorBox: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: theme.spacing(1) / 2,
    zIndex: 1,
    left: theme.spacing(14),
    bottom: theme.spacing(-3) - 2,
    borderLeft: '2px solid #c0c0c0',
    borderRight: '2px solid #c0c0c0',
    backgroundColor: '#efefef',
    width: theme.spacing(14),
    height: theme.spacing(3) + 4,
  },
}));

const GrayBox: React.FC<{ short?: boolean }> = ({
  children,
  short = false,
}) => {
  const classes = useGrayBoxStyles();
  return (
    <div className={classNames(classes.grayBox, { [classes.shortBox]: short })}>
      {children}
    </div>
  );
};

export interface ConnectedBoxesListProps {
  /**
   * A list of components. Each element of the list will get its own row
   * in the `ConnectedBoxesList`. A row is actually a `flex` container, so
   * if you put multiple elements in a react fragment, they will be layed out
   * in a 'flex' manner, e.g.:
   * ```
   * [<><TextField /><Spacer horizontal={2}/><TextField /></>]
   * ```
   */
  boxesContents: React.ReactNode[];
  /**
   * The label for the button that adds a new row
   */
  addButtonLabel: string;
  /**
   * The label in the little area that connects two rows
   */
  connectionLabel: string;
  /**
   * By default, clicking on the add button will not do anything. In your
   * implementation of the `onAdd` handler you will have to do things which
   * should end up updating the boxesContent.
   */
  onAdd: VoidFunction;
  /**
   * By default, clicking on the remove button on any row will not do anything.
   * In your implementation of the `onRemove` handler you will have to do things
   * which end up updating the boxesContent. `onRemove` tells you the row index for
   * the row the user wants removed.
   */
  onRemove: (index: number) => void;
  /**
   * Sets a `data-testid` attribute on the overall component. Note, the add button
   * itself has a `data-testid` of 'box-add' and each remove button has a `data-testid`
   * of 'box-remove'.
   */
  testId?: string;
  /**
   * Perhaps you just want the list of the grey boxes but you don't actually care
   * for the connectors? Well with this little nifty boolean you can turn the
   * whole thing off.
   */
  connectBoxes?: boolean;
}

/**
 * ConnectedBoxesList was introduced to provide a way to visualize and edit
 * logical conditions. Each row would stand for a condition, represented by
 * individual form fields, where you can edit a condition.
 *
 * This component abstracts away the general visualization. It does not care
 * for what you actually render within each row. It is totally up to you.
 *
 * Note that a row is a `flex` container, so you might want to take advantage
 * of that. See the explanation at `boxesContents` for details.
 */
export const ConnectedBoxesList = (props: ConnectedBoxesListProps) => {
  const classes = useGrayBoxStyles();
  return (
    <div data-testid={props.testId}>
      {props.boxesContents.map((element, index) => (
        <div key={`box-${index}`} className={classes.grayBoxWrapper}>
          <GrayBox>
            <IconButton
              icon={Cancel}
              color="default"
              onClick={() => props.onRemove(index)}
              data-testid="box-remove"
            />
            {element}
          </GrayBox>
          {props.connectBoxes ?? true ? (
            <div className={classes.connectorBox}>
              {index < props.boxesContents.length - 1
                ? props.connectionLabel
                : ''}
            </div>
          ) : null}
        </div>
      ))}
      <div className={classes.buttonBoxTransform}>
        <GrayBox short>
          <Button
            variant="text"
            color="primary"
            icon={Add}
            data-testid="box-add"
            onClick={props.onAdd}
          >
            {props.addButtonLabel}
          </Button>
        </GrayBox>
      </div>
    </div>
  );
};

export default ConnectedBoxesList;
