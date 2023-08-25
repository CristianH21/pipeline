import React from 'react';
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { CardItem } from '..';

interface Props {
  item: {
    id: string,
    name: string,
    category: string,
    tags: string[]
  },
  onClickMenu?: () => void
  onClickCard?: () => void
}

function SortableItem(props: Props) {

  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({id: props.item.id})

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const extraProps = {
    ...listeners,
    ...attributes
  }

  return (
    <div style={styles} ref={setNodeRef}>
      <CardItem 
        extraProps={extraProps} 
        item={{
          title: props.item.name,
          subtitle: props.item.category,
          ...props.item
        }}
        onClickMenu={props.onClickMenu}
        onClickCard={props.onClickCard} />
    </div>
  )
}

export default SortableItem