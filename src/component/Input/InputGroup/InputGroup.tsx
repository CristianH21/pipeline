import React from 'react'
import "./InputGroup.css";

interface Props {
    children: React.ReactNode
}

function InputGroup(props: Props) {
  return (
    <div className='input-group'>{props.children}</div>
  )
}

export default InputGroup