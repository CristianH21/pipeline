import React, { Dispatch, SetStateAction } from 'react'
import Modal from '../Modal'

interface Props {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

function AddContainerModal(props: Props) {
  return (
    <Modal {...props}>AddContainerModal</Modal>
  )
}

export default AddContainerModal