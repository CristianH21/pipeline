import React, { Dispatch, SetStateAction } from 'react';
import ReactPortal from '../ReactPortal/ReactPortal';
import "./SidePanel.css";
import TransitionOut from '../TransitionOut/TransitionOut';
import Button from '../Button/Button';
import InputGroup from '../Input/InputGroup/InputGroup';
import Input from '../Input/Input';

interface Props {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

function SidePanel(props: Props) {
  const divRef = React.useRef(null);
  return (
    <TransitionOut in={props.isOpen} delay={550} className="panel-wrapper" nodeRef={divRef}>
      <ReactPortal wrapperId='side-panel-container'>
        <div className="panel-background">
          <div className="panel-wrapper" ref={divRef}>
            <div className='panel'>
              <div className='panel-container'>
                <div className='panel-container-header'>
                  header
                </div>
                <div className='panel-container-main'>
                  <EditItemForm />
                </div>
                <div className='panel-container-footer'>
                  <Button primary large>Save</Button>
                </div>
              </div>
              <span className='close' onClick={() => props.setIsOpen(false)} />
            </div>
          </div>
        </div>
      </ReactPortal>
    </TransitionOut>
  )
}

function EditItemForm() {
  return (
    <form>
      <InputGroup>
        <Input name=""/>
        <Input name=""/>
      </InputGroup>
      <InputGroup>
        <Input name=""/>
      </InputGroup>
    </form>
  )
}

export default SidePanel;
