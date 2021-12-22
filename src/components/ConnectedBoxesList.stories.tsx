import * as React from 'react';

import {
  ConnectedBoxesList,
  ConnectedBoxesListProps,
} from './ConnectedBoxesList';
import { TextField } from './TextField';
import { Meta, Story } from '@storybook/react';
import { Spacer } from './Spacer';
import { useCallback, useState } from 'react';

export default {
  title: 'Components/ConnectedBoxesList',
  component: ConnectedBoxesList,
} as Meta;

const Template: Story<ConnectedBoxesListProps> = (props) => {
  const [boxesContents, setBoxesContents] = useState(props.boxesContents);

  const handleAdd = useCallback(() => {
    setBoxesContents([
      ...boxesContents,
      <>
        <TextField placeholder="Name" />
        <Spacer horizontal={2} />
        ist
        <Spacer horizontal={2} />
        <TextField placeholder="Adjektiv" />
      </>,
    ]);
  }, [boxesContents, setBoxesContents]);

  const handleRemove = useCallback(
    (index: number) => {
      const newBoxesContents = [...boxesContents];
      newBoxesContents.splice(index, 1);
      setBoxesContents(newBoxesContents);
    },
    [boxesContents, setBoxesContents]
  );

  return (
    <ConnectedBoxesList
      boxesContents={boxesContents}
      addButtonLabel={props.addButtonLabel}
      connectBoxes={props.connectBoxes}
      connectionLabel={props.connectionLabel}
      hideAddButton={props.hideAddButton}
      testId={props.testId}
      onAdd={handleAdd}
      onRemove={handleRemove}
    />
  );
};

export const Primary = Template.bind({});

Primary.args = {
  boxesContents: [
    <>
      <TextField placeholder="Name" />
      <Spacer horizontal={2} />
      ist
      <Spacer horizontal={2} />
      <TextField placeholder="Adjektiv" />
    </>,
    <>
      <TextField placeholder="Name" />
      <Spacer horizontal={2} />
      ist
      <Spacer horizontal={2} />
      <TextField placeholder="Adjektiv" />
    </>,
  ],
  addButtonLabel: 'Zeile hinzufügen',
  connectBoxes: true,
  connectionLabel: 'und',
  testId: 'my-grey-boxes',
};

Primary.argTypes = {
  boxesContents: { control: null },
  onAdd: { control: null },
  onRemove: { control: null },
};

Primary.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
};
