import React from 'react';
import "./Input.css";
import cn from "classnames";

interface Props {
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  name?: string;
}

function Input(props: Props, ref: React.LegacyRef<HTMLInputElement>) {

  const inputClass = cn([
    "input",
    props.error && "input-error"
  ]) 

  return (
   <div className='input-wrapper'>
      {props.name && <span className='input-label'>{props.name}</span>}
      <input {...props} ref={ref} className={inputClass}/>
      {props.error && <span className='input-error__message'>{props.error}</span>}
   </div>
  )
}

export default React.forwardRef(Input)