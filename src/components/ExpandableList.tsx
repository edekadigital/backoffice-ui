import * as React from 'react';
// import { List, ListItem } from '@material-ui/core';
import { TextField, IconButton, Button } from '..';
import { Delete, Add } from '../icons';
import { makeStyles } from '@material-ui/styles';
import { Theme, SvgIconProps, Typography } from '@material-ui/core';

export interface ListItem {
  value: string | '';
  id?: string;
}
export interface ExpandableListProps {
  initialItems?: Array<ListItem>;
  addtionalAction?: {
    icon: React.ElementType<SvgIconProps>;
    handler: () => void;
  };
  optionLabel?: string;
  headline?: string;
  addButtonLabel?: string;
  // onChange: () => void;
  // Callback der die items zurück gibt [{index: number,  value:number | string}]
}

const useExpandableListStyles = makeStyles((theme: Theme) => ({
  listItemInner: () => ({
    display: 'flex',
    marginBottom: theme.spacing(3),
  }),
  listItem: () => ({
    lineHeight: '56px',
    color: theme.palette.action.active,
    fontSize: '16px',
  }),
  inputField: () => ({
    flex: 'auto',
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(4),
  }),
  icons: () => ({
    flex: '0 0 auto',
  }),
  addButton: () => ({
    marginLeft: theme.spacing(5),
  }),
  list: () => ({ paddingLeft: theme.spacing(2) }),
}));

const createUniqueId = () => {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

export const ExpandableList: React.FC<ExpandableListProps> = (props) => {
  const {
    initialItems = [{ value: '' }, { value: '' }, { value: '' }],
    addtionalAction,
    optionLabel = 'Option',
    headline,
    addButtonLabel = 'Option hinzufügen',
  } = props;

  const addUniqueId = (items: Array<ListItem>) => {
    const itemsWithId = items.map((item: ListItem) => {
      return { value: item.value, id: createUniqueId() } as ListItem;
    });
    return itemsWithId;
  };

  const [items, setItems] = React.useState(addUniqueId(initialItems));
  const handleDeleteItem = (item: ListItem) => {
    const itemIndex = items.indexOf(item);
    const newItems = [
      ...items.slice(0, itemIndex),
      ...items.slice(itemIndex + 1),
    ];
    setItems([...newItems]);
    // onChange
  };
  const classes = useExpandableListStyles();
  const handleAddClick = React.useCallback(() => {
    setItems((prevState) => [
      ...prevState,
      { value: '', id: createUniqueId() },
    ]);
    // onChange
    // nochmal prüfen ob die id schon existiert
  }, [items]);

  const renderItems = React.useMemo(() => {
    console.log(items);
    return items.map((item, index) => {
      const label = optionLabel + ' ' + (index + 1);
      return (
        <ExpandableListItem
          key={item.id}
          label={label}
          onDeleteClick={() => handleDeleteItem(item)}
          additionalAction={addtionalAction}
          initialValue={item.value}
        />
      );
    });
  }, [items, addtionalAction]);
  return (
    <>
      <Typography variant="body1" gutterBottom={true} color="textSecondary">
        {headline}
      </Typography>
      <ol className={classes.list}>{renderItems}</ol>
      <Button
        variant="text"
        icon={Add}
        color={'primary'}
        onClick={handleAddClick}
        className={classes.addButton}
      >
        {addButtonLabel}
      </Button>
    </>
  );
};

export interface ExpandableListItemProps {
  label: string;
  initialValue: string;
  onDeleteClick: () => void;
  additionalAction:
    | {
        icon: React.ElementType<SvgIconProps>;
        handler: () => void;
      }
    | undefined;
}

export const ExpandableListItem: React.FC<ExpandableListItemProps> = (
  props
) => {
  const { label, onDeleteClick, additionalAction, initialValue } = props;
  const [value, setValue] = React.useState<string | ''>(initialValue);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
    // onChange
  };
  const classes = useExpandableListStyles();
  const icon = additionalAction ? (
    <IconButton
      icon={additionalAction.icon}
      onClick={additionalAction.handler}
    />
  ) : null;
  return (
    <li className={classes.listItem}>
      <div className={classes.listItemInner}>
        <div className={classes.inputField}>
          <TextField label={label} value={value} onChange={handleChange} />
        </div>
        <div className={classes.icons}>
          {icon}
          <IconButton icon={Delete} onClick={onDeleteClick} />
        </div>
      </div>
    </li>
  );
};
