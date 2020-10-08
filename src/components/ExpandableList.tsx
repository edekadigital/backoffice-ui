import * as React from 'react';
import { TextField, IconButton, Button } from '..';
import { Delete, Add } from '../icons';
import { makeStyles } from '@material-ui/styles';
import { Theme, SvgIconProps, Typography } from '@material-ui/core';
import { Check } from '@material-ui/icons';

export interface ListItem {
  value: string | '';
  id?: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface AdditionalActionItem {
  icon: React.ElementType<SvgIconProps>;
  handler: () => void;
}
export interface ExpandableListProps {
  /**
   * initial list items with given value
   */
  initialItems?: Array<ListItem>;
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
  checkable?: string | boolean | undefined;
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
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(4),
  },
  icons: {
    flex: '0 0 auto',
  },
  addButton: {
    marginLeft: theme.spacing(5),
  },
  list: { paddingLeft: theme.spacing(2) },
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
  return uniqueId;
};

const addUniqueId = (items: Array<ListItem>) => {
  const itemsWithId = items.map((item: ListItem) => {
    return { ...item, id: createUniqueId(items) } as ListItem;
  });
  return itemsWithId;
};

/**
 * | Test ID                                    | Description                  |
 * | ------------------------------------------ | ---------------------------- |
 * | `expandableList`                           | container                    |
 * | `expandableList-item-${index}`             | list item                    |
 * | `expandable-list-add`                      | add button                   |
 * | `expandableList-item-additional-${index}`  | additional list item action  |
 * | `expandableList-item-delete-${index}`      | delete button                |
 */

export const ExpandableList: React.FC<ExpandableListProps> = (props) => {
  const {
    initialItems = [{ value: '' }, { value: '' }, { value: '' }],
    optionLabel = 'Option',
    addButtonLabel = 'Option hinzufügen',
    onChange,
    checkable,
  } = props;

  const [items, setItems] = React.useState(addUniqueId(initialItems));
  const classes = useExpandableListStyles();

  const updateState = (newItems: Array<ListItem>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setItems((prevState) => [...newItems]);
    onChange(
      newItems.map((item: ListItem, index: number) => {
        return {
          value: item.value,
          checked: item.checked,
          disabled: item.disabled,
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
    if (checkable === 'multiple') {
      newItems[index].checked = !newItems[index].checked;
    } else {
      newItems.map((item) => {
        item.checked = false;
      });
      newItems[index].checked = true;
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
          disabled={item.disabled}
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
}

const ExpandableListItem: React.FC<ExpandableListItemProps> = (props) => {
  const {
    label,
    onDeleteClick,
    onChange,
    onCheck,
    index,
    checked = false,
    disabled = false,
    checkable,
    value = '',
  } = props;
  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    onChange(event.target.value);
  };

  const classes = useExpandableListStyles();
  const iconColor = checked ? '#4caf50' : undefined;
  const icon = () => <Check htmlColor={iconColor} />;

  const checkButton = checkable ? (
    <IconButton
      key={index}
      icon={icon}
      onClick={onCheck}
      data-testid={`expandableList-item-additional-${index}`}
      disabled={disabled}
    />
  ) : null;

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
          <IconButton
            icon={Delete}
            onClick={onDeleteClick}
            data-testid={`expandableList-item-delete-${index}`}
            disabled={disabled}
          />
        </div>
      </div>
    </Typography>
  );
};
