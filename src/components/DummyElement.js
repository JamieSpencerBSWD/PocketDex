import React, {useEffect} from 'react'
import { UseIntersection } from '../hooks/useintersection';

const DummyElement = ({callbackFn}) => {
  const triggerRef = React.useRef(null);
  const isVisible = UseIntersection(triggerRef, "0px")

  useEffect(() => {
    if (isVisible) {
        //Call LoadPokemon/Moves
      callbackFn(); // Trigger a function when the div is visible on view port
    }
  }, [callbackFn, isVisible]);

  return <div ref={triggerRef}></div>;
};

export default DummyElement