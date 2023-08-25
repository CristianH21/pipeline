import React from 'react'
import { AddContainerModal } from '..'
import AddContainerButton from '../Button/AddContainerButton/AddContainerButton'
import Search from '../Input/Search/Search'
import "./Toolbar.css"

function Toolbar() {

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className='toolbar'>
      {/* <div className='toolbar-brand'></div> */}
      <div className='toolbar-tools'>
        <Search />
        <AddContainerButton onClick={() => setIsOpen(true)} />
      </div>
      <AddContainerModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default Toolbar