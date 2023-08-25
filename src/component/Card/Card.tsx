import React, { CSSProperties } from 'react';
import cn from "classnames";
import "./Card.css";

interface Props {
  children: React.ReactNode,
  className?: string,
  style?: CSSProperties
}

function Card (props: Props) {

  const classes = cn([
    "card",
    props.className
  ]);

  return (
    <div className={classes} style={props.style}>{props.children}</div>
  )
}

export default Card;