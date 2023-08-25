import React, { Children, Dispatch, SetStateAction } from 'react'
import ReactPortal from '../ReactPortal/ReactPortal';
import "./Modal.css";
import cn from "classnames";
import Button from '../Button/Button';


interface Props {
  children: React.ReactNode,
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  classNames?: string
}

function Modal(props: Props) {

  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    const closeOnEscapeKey = 
      (e: KeyboardEvent) => e.key === "Escape" ? props.setIsOpen(false) : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    }
  }, [props.setIsOpen]);

  if (!props.isOpen) return null

  const modalClassNames = cn([
    'modal-content',
    props.classNames
  ])

  return (
    <ReactPortal wrapperId='modal-container'>
      <div className='modal'>
        <Button className='modal-close' onClick={() => props.setIsOpen(false)}>close</Button>
        <div className={modalClassNames} >{props.children}</div>
      </div>
    </ReactPortal>
  )
}

export default Modal