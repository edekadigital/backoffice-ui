import * as React from 'react';
// import { List, ListItem } from '@material-ui/core';
import { TextField, IconButton, Button } from '..';
import { Delete, Add } from '../icons';
import { makeStyles } from '@material-ui/styles';
import { Theme, SvgIconProps, Typography } from '@material-ui/core';

export interface ExpandableListProps {
  initialItems: Array<{ value: string | ''; id: string }>;
  addtionalAction?: {
    icon: React.ElementType<SvgIconProps>;
    handler: () => void;
  };
  optionLabel: string;
  headline?: string;
  addButtonLabel: string;
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

export const ExpandableList: React.FC<ExpandableListProps> = (props) => {
  const {
    initialItems,
    addtionalAction,
    optionLabel,
    headline,
    addButtonLabel,
  } = props;
  const [items, setItems] = React.useState(initialItems);
  const handleDeleteItem = (index: number) => {
    // const itemIndex = items.indexOf(item);
    // const newItems = items.filter((item, index) => itemIndex !== index);
    const newItems = [...items.slice(0, index), ...items.slice(index + 1)];

    setItems(newItems);
  };
  const classes = useExpandableListStyles();
  const handleAddClick = React.useCallback(() => {
    setItems([...items, { value: '', id: 'd' }]);
  }, [items]);

  const renderItems = React.useMemo(() => {
    console.log(items, 'renderItem');
    return items.map((item, index) => {
      const label = optionLabel + ' ' + (index + 1);
      console.log(item.value);
      return (
        <ExpandableListItem
          key={item.id}
          index={index}
          label={label}
          onDeleteClick={handleDeleteItem}
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
  index: number;
  onDeleteClick: (index: number) => void;
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
  const { label, onDeleteClick, additionalAction, initialValue, index } = props;
  const [value, setValue] = React.useState<string | ''>(initialValue);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
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
          <IconButton icon={Delete} onClick={() => onDeleteClick(index)} />
        </div>
      </div>
    </li>
  );
};
