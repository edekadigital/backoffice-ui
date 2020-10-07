import * as React from 'react';
import { TextField, IconButton, Button } from '..';
import { Delete, Add } from '../icons';
import { makeStyles } from '@material-ui/styles';
import { Theme, SvgIconProps, Typography } from '@material-ui/core';

export interface ListItem {
  value: string | undefined;
  id?: string;
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
   *addtional action for list item with icon and handler function
   */
  additionalActions?: Array<AdditionalActionItem>;
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
    return { value: item.value, id: createUniqueId(items) } as ListItem;
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
    initialItems = [
      { value: undefined },
      { value: undefined },
      { value: undefined },
    ],
    additionalActions = [],
    optionLabel = 'Option',
    addButtonLabel = 'Option hinzufügen',
    onChange,
  } = props;

  const [items, setItems] = React.useState(addUniqueId(initialItems));
  const classes = useExpandableListStyles();

  const updateState = (newItems: Array<ListItem>) => {
    setItems(newItems);
    onChange(
      newItems.map((item: ListItem, index: number) => {
        return { value: item.value, index };
      })
    );
  };

  const handleUpdateItem = (id: string, value: string) => {
    const index = items.findIndex((item) => item.id === id);
    items[index].value = value;
    updateState(items);
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
          additionalActions={additionalActions}
          initialValue={item.value}
          onChange={(value: string) => handleUpdateItem(item.id!, value)}
          index={index}
        />
      );
    });
  }, [items, additionalActions]);

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
  initialValue: string | undefined;
  onDeleteClick: () => void;
  onChange: (value: string) => void;
  additionalActions?: Array<AdditionalActionItem>;
  index: number;
}

const ExpandableListItem: React.FC<ExpandableListItemProps> = (props) => {
  const {
    label,
    onDeleteClick,
    additionalActions,
    initialValue,
    onChange,
    index,
  } = props;
  const [value, setValue] = React.useState<string | undefined>(initialValue);
  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };
  const classes = useExpandableListStyles();
  const additionalActionsIconButtons = React.useMemo(() => {
    return additionalActions
      ? additionalActions.map((additionalAction: AdditionalActionItem) => {
          return (
            <IconButton
              key={index}
              icon={additionalAction.icon}
              onClick={additionalAction.handler}
              data-testid={`expandableList-item-additional-${index}`}
            />
          );
        })
      : null;
  }, [additionalActions]);

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
          />
        </div>
        <div className={classes.icons}>
          {additionalActionsIconButtons}
          <IconButton
            icon={Delete}
            onClick={onDeleteClick}
            data-testid={`expandableList-item-delete-${index}`}
          />
        </div>
      </div>
    </Typography>
  );
};
