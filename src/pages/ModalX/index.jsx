import React from 'react';
import ModalActivation from '../../components/ModalActivation';
import ModalTest from '../../components/ModalTest';

const ModalX = (props, modal) => {
  const Header = <h1> Salutare</h1>;
  return (
    <ModalActivation>
      <ModalTest {...props} Header={Header} modal={modal} />
    </ModalActivation>
  );
};

export default ModalX;
