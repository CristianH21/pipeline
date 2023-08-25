import React from 'react'
import "./Tag.css"

interface Props {
    text: string
}

function Tag(props: Props) {
  return (
    <div className='tag'>{props.text}</div>
  )
}

export default Tag