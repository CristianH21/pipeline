import React from 'react';

type StateType = "mounting" | "mounted"| "unmounting" | "unmounted";

type RefType = HTMLDivElement | null | any;

interface Props {
  in: boolean,
  nodeRef?: React.MutableRefObject<RefType>;
  className?: string,
  delay: number;
  onExited?: () => void,
  children?: React.ReactNode
}

function TransitionOut(props: Props) {
  const [state, setState] = React.useState<StateType>("unmounted");
  const [hasMounted, setHasMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    let timeoutId: any;

    if (state === "unmounting") {
      timeoutId = setTimeout(() => {
        setState("unmounted")
      }, props.delay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state]);

  React.useEffect(() => {
    if (props.in) {
      setHasMounted(true);
      setState("mounted");
    }

    if (!props.in && hasMounted) {
      setState("unmounting");
    }
  }, [props.in])

  React.useEffect(() => {
    if (state === "unmounting") {
      onUnmounting();
    }
  }, [state]);

  return state === "unmounted" ? null : <>{props.children}</>;

  function onUnmounting() {
    props.nodeRef?.current.classList.add(`${props.className}-exit`);
  }
}

export default TransitionOut