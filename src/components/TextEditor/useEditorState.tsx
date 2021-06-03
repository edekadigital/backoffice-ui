import * as React from 'react';
import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  convertFromRaw,
  DraftDecorator,
  EditorState,
  SelectionState,
} from 'draft-js';
import { markdownToDraft } from 'markdown-draft-js';

const findLinkEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
};

const LinkDecoratorComponent: React.FC<{
  contentState: ContentState;
  entityKey: string;
}> = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} data-testid="textEditor-linkDecorator">
      {props.children}
    </a>
  );
};

export const useEditorState = (initialValue = '', selectAll = false) => {
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: LinkDecoratorComponent,
    },
  ] as DraftDecorator[]);

  const rawData = markdownToDraft(initialValue, {
    blockStyles: {
      ins_open: 'UNDERLINE',
    },
    preserveNewlines: true,
    remarkableOptions: {
      enable: {
        inline: 'ins',
      },
    },
  });

  const contentState = convertFromRaw(rawData);

  let initialEditorState = EditorState.createWithContent(
    contentState,
    decorator
  );

  if (selectAll) {
    const firstBlock = contentState.getBlockMap().first();
    const lastBlock = contentState.getBlockMap().last();
    const firstBlockKey = firstBlock.getKey();
    const lastBlockKey = lastBlock.getKey();
    const lengthOfLastBlock = lastBlock.getLength();

    const selection = new SelectionState({
      anchorKey: firstBlockKey,
      anchorOffset: 0,
      focusKey: lastBlockKey,
      focusOffset: lengthOfLastBlock,
    });

    initialEditorState = EditorState.acceptSelection(
      initialEditorState,
      selection
    );
  }

  return React.useState(initialEditorState);
};
