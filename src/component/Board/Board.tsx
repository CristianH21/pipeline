import React, { CSSProperties } from 'react'
import { 
  DndContext,
  closestCenter, 
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { CardItem, Container } from '..';
import importedData from "../../job";
import "./Board.css"
import { useItemContext } from '../../context/items.context';
import { setItems } from '../../context/items.reducer';
import SidePanel from '../SidePanel/SidePanel';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

function Board() {
  const [state, dispatch] = useItemContext();
  const [data, setData] = React.useState<any>({});
  const [activeItem, setActiveItem] = React.useState<any>(null);
  React.useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("items");
    if (dataFromLocalStorage !== null) {
      dispatch(setItems(JSON.parse(dataFromLocalStorage)))
    } else {
      dispatch(setItems(importedData))
    }
  }, [dispatch]);

  React.useEffect(() => {
    setData(state.items);
  }, [state]);

  React.useEffect(() => {
    if (Object.keys(data).length !== 0) {
      localStorage.setItem("items", JSON.stringify(data));
    }
  }, [data]);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className='board'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}>
          {Object.entries(data).map(([id, values]: any, idx) => (
            <Container key={idx} id={id} color={values.color} items={values.items as any[]}/>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>{activeItem ? <CardItem item={{title:activeItem.name, subtitle: activeItem.category, ...activeItem}}/> : null}</DragOverlay>
      </DndContext>
    </div>
  )

  function findContainer(itemId: string) {
    if (itemId in data) {
      return itemId;
    }
    return Object.keys(data).find(key => JSON.stringify(data[key].items).indexOf(itemId) > -1)
  }

  function handleDragStart(event: any) {
    setActiveItem(getItem(event.active.id) as any);
  }

  function handleDragOver({ active, over }: any) {

    if (over.id == null || active.id in data) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setData((prev: any) => {
      const activeItems = prev[activeContainer].items;
      const overItems = prev[overContainer].items;
      const activeIndex = activeItems.findIndex(({id}: any) => id === active.id)
      const overIndex = overItems.findIndex(({id}: any) => id === over.id)

      let newIndex: number;
      if (over.id in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top >
            over.rect.top + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }
      return {
        ...prev,
        [activeContainer]: {
          ...prev[activeContainer],
          items: [...prev[activeContainer].items.filter((item: any) => item.id !== active.id)]
        },
        [overContainer]: {
          ...prev[overContainer],
          items: [
            ...prev[overContainer].items.slice(0, newIndex),
            data[activeContainer].items[activeIndex],
            ...prev[overContainer].items.slice(newIndex, prev[overContainer].items.length)
          ]
        }
      };
    });
    
  }

  function handleDragEnd({ active, over }: any) {
    const activeContainer = findContainer(active.id)
    const overContainer = findContainer(over.id)

    if (
      activeContainer && 
      overContainer && 
      activeContainer === overContainer
    ) {

      const activeIndex = data[activeContainer].items.findIndex(({id}: any) => id === active.id)
      const overIndex = data[overContainer].items.findIndex(({id}: any) => id === over.id)

      if (activeIndex !== overIndex) {
        setData((items: any) => ({
            ...items,
            [overContainer]: {
              ...data[overContainer],
              items: arrayMove(data[overContainer].items, activeIndex, overIndex)
            }
          }
        ))
      }
    }
  }

  function getItem(itemId: string) {
    return Object.keys(data).reduce((acc, key) => {
      data[key].items.find((item: any) => {
        if (item.id === itemId) {
          acc = {...item}
        }
      })
      return acc
    }, {})
  }
}

export default Board