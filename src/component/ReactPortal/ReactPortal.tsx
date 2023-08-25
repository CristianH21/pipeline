import React from 'react'
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode,
  wrapperId: string
}

function ReactPortal(props: Props) {
  const [wrapperElement, setWrapperElement] = React.useState<HTMLElement | null>(null);
  
  React.useLayoutEffect(() => {
    let element =  document.getElementById(props.wrapperId);
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = containerElementHelper(props.wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }, [props.wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(props.children, wrapperElement)
}

// Create container element before createPortal is called
function containerElementHelper(wrapperId: string) {
    const wrapperELement = document.createElement("div");
    wrapperELement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperELement);
    return wrapperELement;
}

export default ReactPortal