import React from 'react';
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import SortableItem from '../SortableItem/SortableItem';
import "./Container.css";
import AddCardButton from '../Button/AddCardButton/AddCardButton';
import CardHeader from '../Card/CardHeader/CardHeader';
import AddCardModal from '../Modal/AddCardModal/AddCardModal';
import SidePanel from '../SidePanel/SidePanel';
import CardInput from '../Card/CardInput/CardInput';

interface Props {
  id: string,
  color: string,
  items: any[]
}

const SAMPLE_ITEM = {
  id: "12387",
  name: "sample",
  link: "https://sample.com",
  category: "tester",
  tags: ["sample"]
}
function Container(props: Props) {

  const { id, color, items } = props;
  const { setNodeRef } = useDroppable({id});
  const [isAddCardOpen, setIsAddCardOpen] = React.useState<boolean>(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = React.useState<boolean>(false);
  const [currentItem, setCurrentItem] = React.useState({});
  const [containerItems, setContainerItems] = React.useState(items);

  return containerItems ? (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className='container'>
        <CardHeader 
          text={id} 
          color={color} 
          counter={items.length}
          onAdd={addCardHandler}/>
        {/* <CardInput /> */}
        {items.map((item) => <SortableItem key={item.id} item={item} onClickMenu={() => handleOnEditItem(item)} onClickCard={() => handleOnOpenCard()} />)}
        <AddCardButton onClick={() => {
          setCurrentItem({});
          setIsAddCardOpen(true);
        }}/>
        <AddCardModal 
          containerId={id}
          item={currentItem}
          isOpen={isAddCardOpen}
          setIsOpen={setIsAddCardOpen} 
        />
        <SidePanel
          isOpen={isSidePanelOpen}
          setIsOpen={setIsSidePanelOpen}
        />
      </div> 
    </SortableContext>
  ) : null;

  function handleOnEditItem(item: any) {
    setCurrentItem(item);
    setIsAddCardOpen(true);
  }

  function addCardHandler() {
    setContainerItems([SAMPLE_ITEM,...items])
  }

  function handleOnOpenCard() {
    // setCurrentItem(item);
    setIsSidePanelOpen(true);
  }
}

export default Container