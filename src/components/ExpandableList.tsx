import * as React from 'react';
import { TextField, IconButton, Button } from '..';
import { Delete, Add } from '../icons';
import { makeStyles } from '@material-ui/styles';
import { Theme, SvgIconProps, Typography } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import clsx from 'clsx';

export interface ListItem {
  value: string | '';
  id?: string;
  checked?: boolean;
}

export interface AdditionalActionItem {
  icon: React.ElementType<SvgIconProps>;
  handler: () => void;
}

export type CheckOptions = 'single' | 'multiple';
export interface ExpandableListProps {
  /**
   * needed for controlled component
   */
  value?: Array<ListItem>;
  /**
   * label to be displayed in the option field
   * @default 'Option'
   */
  optionLabel?: string;
  /**
   * label for button to add options
   * @default 'Option hinzufügen'
   */
  addButtonLabel?: string;
  /**
   * callback function which is called when items or items list are changed
   */
  onChange: (items: Array<ListItem>) => void;
  /**
   * options can be checked,
   * @default 'multiple'
   */
  checkable?: CheckOptions | boolean;
  /**
   * if true component is shown as disabled
   */
  disabled?: boolean;
  /**
   * if set delete button will be shown as disabled when minimum amount of options is reached
   */
  min?: number;
  /**
   * if set add button will be shown as disabled when maximum amount of options is reached
   */
  max?: number;
}

const useExpandableListStyles = makeStyles((theme: Theme) => ({
  listItemInner: {
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
  listItem: {
    lineHeight: `${theme.spacing(7)}px`,
  },
  inputField: {
    flex: 'auto',
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    [theme.breakpoints.up(theme.breakpoints.width('md'))]: {
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(4),
    },
  },
  icons: {
    flex: '0 0 auto',
  },
  addButton: {
    marginLeft: theme.spacing(3),
    [theme.breakpoints.up(theme.breakpoints.width('md'))]: {
      marginLeft: theme.spacing(5),
    },
  },
  list: { paddingLeft: theme.spacing(2) },
  checkIcon: { color: theme.palette.success.main },
  placeholder: {
    width: theme.spacing(6),
    display: 'inline-block',
  },
}));

const createUniqueId = (items: Array<ListItem>) => {
  const create = () => {
    let string = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++)
      string += possible.charAt(Math.floor(Math.random() * possible.length));
    return string;
  };
  let uniqueId: string;
  do {
    uniqueId = create();
  } while (
    uniqueId === undefined ||
    items.find((item) => item.id === uniqueId)
  );
  return `internal_${uniqueId}`;
};

const addUniqueId = (items: Array<ListItem>) => {
  const itemsWithId = items.map((item: ListItem) => {
    return { ...item, id: createUniqueId(items) } as ListItem;
  });
  return itemsWithId;
};

/**
 * | Test ID                                       | Description                     |
 * | --------------------------------------------- | ------------------------------- |
 * | `expandableList`                              | container                       |
 * | `expandableList-item-${index}`                | list item                       |
 * | `expandable-list-add`                         | add button                      |
 * | `expandableList-item-additional-${index}`     | additional list item action     |
 * | `expandableList-item-additional-icon-${index}`| additional list item action icon|
 * | `expandableList-item-delete-${index}`         | delete button                   |
 */

export const ExpandableList: React.FC<ExpandableListProps> = (props) => {
  const {
    value = [{ value: '' }, { value: '' }, { value: '' }],
    optionLabel = 'Option',
    addButtonLabel = 'Option hinzufügen',
    onChange,
    checkable,
    disabled,
    min,
    max,
  } = props;

  const hasId = value.every((item) => item.id);

  const [items, setItems] = React.useState(hasId ? value : addUniqueId(value));
  const classes = useExpandableListStyles();

  const updateState = (newItems: Array<ListItem>) => {
    setItems(() => [...newItems]);
    onChange(
      newItems.map((item: ListItem, index: number) => {
        return hasId
          ? {
              value: item.value,
              checked: item.checked,
              index,
              id: !item.id?.indexOf('internal_') ? undefined : item.id,
            }
          : {
              value: item.value,
              checked: item.checked,
              index,
            };
      })
    );
  };

  const handleUpdateItem = (id: string, value: string) => {
    const index = items.findIndex((item) => item.id === id);
    items[index].value = value;
    updateState(items);
  };

  const handleUpdateCheck = (id: string) => {
    const newItems = items;
    const index = newItems.findIndex((item) => item.id === id);
    if (checkable === 'single') {
      newItems.map((item) => {
        item.checked = false;
      });
      newItems[index].checked = true;
    } else {
      newItems[index].checked = !newItems[index].checked;
    }
    updateState(newItems);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = [...items.slice(0, index), ...items.slice(index + 1)];
    updateState(newItems);
  };

  const handleAddItem = () => {
    updateState([...items, { value: '', id: createUniqueId(items) }]);
  };

  const isMaxItems = max && items.length === max ? true : false;

  const isMinItems = min && items.length === min ? true : false;

  const renderItems = React.useMemo(() => {
    return items.map((item, index) => {
      const label = optionLabel + ' ' + (index + 1);
      return (
        <ExpandableListItem
          key={item.id}
          label={label}
          onDeleteClick={() => handleDeleteItem(index)}
          value={item.value}
          onChange={(value: string) => handleUpdateItem(item.id!, value)}
          onCheck={() => handleUpdateCheck(item.id!)}
          index={index}
          checkable={checkable}
          checked={item.checked}
          disabled={disabled}
          isMinItems={isMinItems}
        />
      );
    });
  }, [items]);

  return (
    <div data-testid="expandableList">
      <ol className={classes.list}>{renderItems}</ol>
      <Button
        variant="text"
        icon={Add}
        color={'primary'}
        onClick={handleAddItem}
        className={classes.addButton}
        data-testid="expandable-list-add"
        disabled={disabled || isMaxItems}
      >
        {addButtonLabel}
      </Button>
    </div>
  );
};

export interface ExpandableListItemProps {
  label: string;
  value: string;
  onDeleteClick: () => void;
  onChange: (value: string) => void;
  onCheck: () => void;
  index: number;
  checked?: boolean;
  disabled?: boolean;
  checkable?: boolean | string;
  isMinItems?: boolean;
}

const ExpandableListItem: React.FC<ExpandableListItemProps> = (props) => {
  const {
    label,
    onDeleteClick,
    onChange,
    onCheck,
    index,
    checked = false,
    disabled,
    checkable,
    value,
    isMinItems,
  } = props;
  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    onChange(event.target.value);
  };

  const classes = useExpandableListStyles();
  const icon = () => (
    <CheckCircle
      className={clsx({ [classes.checkIcon]: checked })}
      data-testid={`expandableList-item-additional-icon-${index}`}
    />
  );

  const checkButton = checkable ? (
    <IconButton
      key={index}
      icon={icon}
      onClick={onCheck}
      data-testid={`expandableList-item-additional-${index}`}
      disabled={disabled}
    />
  ) : null;

  const deleteButton = !isMinItems ? (
    <IconButton
      icon={Delete}
      onClick={onDeleteClick}
      data-testid={`expandableList-item-delete-${index}`}
      disabled={disabled}
    />
  ) : (
    <div className={classes.placeholder} />
  );

  return (
    <Typography
      variant="body1"
      gutterBottom={true}
      color="textSecondary"
      component="li"
      className={classes.listItem}
    >
      <div className={classes.listItemInner}>
        <div className={classes.inputField}>
          <TextField
            label={label}
            value={value}
            onChange={handleChange}
            inputTestId={`expandableList-item-${index}`}
            disabled={disabled}
          />
        </div>
        <div className={classes.icons}>
          {checkButton}
          {deleteButton}
        </div>
      </div>
    </Typography>
  );
};
