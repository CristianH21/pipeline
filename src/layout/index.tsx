import React from 'react'
import { Toolbar } from '../component';
import "./index.css";

interface Props {
  children: React.ReactNode
}

function Layout(props: Props) {
  return (
    <div className='layout-wrapper'>
      <Toolbar />
      {props.children}
    </div>
  )
}

export default Layout