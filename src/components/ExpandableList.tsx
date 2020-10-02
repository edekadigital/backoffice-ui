import * as React from 'react';
// import { List, ListItem } from '@material-ui/core';
import { TextField, IconButton, Button } from '..';
import { Delete, Add } from '../icons';
import { makeStyles } from '@material-ui/styles';
import { Theme, SvgIconProps, Typography } from '@material-ui/core';

export interface ExpandableListProps {
  initialItems: Array<{ initialValue: string | '' }>;
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
  inputField: () => ({
    flex: 'auto',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  }),
  icons: () => ({
    flex: '0 0 auto',
  }),
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
  const handleDeleteItem = (item: { initialValue: string }) => {
    const itemIndex = items.indexOf(item);
    const newItems = items.filter((item, index) => itemIndex !== index);

    setItems(newItems);
  };

  const handleAddClick = React.useCallback(() => {
    setItems([...items, { initialValue: '' }]);
  }, [items]);

  const renderItems = React.useMemo(() => {
    console.log(items, 'renderItem');
    return items.map((item, index) => {
      const label = optionLabel + ' ' + (index + 1);
      console.log(item.initialValue);
      return (
        <ExpandableListItem
          key={index}
          label={label}
          onDeleteClick={() => handleDeleteItem(item)}
          additionalAction={addtionalAction}
          initialValue={item.initialValue}
        />
      );
    });
  }, [items, addtionalAction]);
  return (
    <>
      <Typography variant="body1" gutterBottom={true} color="textSecondary">
        {headline}
      </Typography>
      <ol>{renderItems}</ol>
      <Button
        variant="text"
        icon={Add}
        color={'primary'}
        onClick={handleAddClick}
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
  };
  const classes = useExpandableListStyles();
  const icon = additionalAction ? (
    <IconButton
      icon={additionalAction.icon}
      onClick={additionalAction.handler}
    />
  ) : null;
  return (
    <li>
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
