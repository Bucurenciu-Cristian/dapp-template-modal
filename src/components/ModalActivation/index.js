import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const ModalActivation = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }
  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);
    //This is for cleanup
    //I think it is equivalent with ComponentWillUnmount
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);
  return createPortal(<div>{children}</div>, elRef.current);
};

export default ModalActivation;
