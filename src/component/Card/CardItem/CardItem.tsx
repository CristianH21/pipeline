import React from 'react'
import { Tag } from '../..'
import Button from '../../Button/Button';
import Card from '../Card'
import "./CardItem.css";

interface Props {
  item: {
    title: string,
    subtitle: string,
    tags: string[]
  },
  extraProps?: any,
  onClickMenu?: React.MouseEventHandler<HTMLButtonElement>,
  onClickCard?: React.MouseEventHandler<HTMLDivElement>
}

function CardItem(props: Props) {
  return (
    <Card>
      <div className="carditem-title" onClick={props.onClickCard}>{props.item.title}</div>
      <div {...props.extraProps}>
        <div className="carditem-subtitle">{props.item.subtitle}</div>
        <div className="carditem-tags">
          {props.item.tags.map((tag, idx) => <Tag key={idx} text={tag}/>)}
        </div>
      </div>
      <Button className='carditem-menu' onClick={props.onClickMenu}>edit</Button>
    </Card>
  )
}

export default CardItem;