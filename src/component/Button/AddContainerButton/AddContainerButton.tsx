import React from 'react'
import Button from '../Button'

interface Props {
  onClick: () => void
}

function AddContainerButton(props: Props) {
  return (
    <Button secondary {...props}>
      + Add Container
    </Button>
  )
}

export default AddContainerButton