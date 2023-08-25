import React, { CSSProperties } from 'react'
import Button from '../../Button/Button';
import Card from '../Card'
import "./CardHeader.css";

interface Props {
  text: string,
  color: string,
  counter: number,
  onAdd: () => void
}

function CardHeader(props: Props) {

  const styles = {
    "--border-color": props.color ? props.color : ""
  } as CSSProperties;

  return (
    <Card className="card-header" style={styles}>
      <div className='card-header__title'>
        <div className='card-header__text'>{props.text}</div>
        <div className='card-header__counter'>{props.counter}</div>
      </div>
      <div className='card-header__action'>
        <Button onClick={props.onAdd}>ADD</Button>
      </div>
    </Card>
  )
}

export default CardHeader