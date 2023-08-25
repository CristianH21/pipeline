import React from 'react'
import "./Button.css";
import cn from "classnames";

interface Props {
  children: React.ReactNode,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  basic?: boolean,
  primary?: boolean,
  secondary?: boolean,
  large?: boolean,
  type?: "button" | "submit" | "reset"
}

function Button(props: Props) {

  const buttonClasses = cn([
    'button',
    props.className,
    props.basic && "button-basic",
    props.primary && "button-primary",
    props.secondary && "button-secondary",
    props.large && "button-large"
  ])
  return (
    <button
      type={props.type}
      className={buttonClasses}
      onClick={props.onClick}>
        {props.children}
    </button>
  )
}

export default Button