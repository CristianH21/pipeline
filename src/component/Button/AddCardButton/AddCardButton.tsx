import React from 'react'
import Button from '../Button'

interface Props {
  onClick: () => void
}

function AddCardButton(props: Props) {
  return (
    <Button {...props}>
      + Add Card
    </Button>
  )
}

export default AddCardButton