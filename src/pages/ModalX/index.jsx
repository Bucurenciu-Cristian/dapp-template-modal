import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const ModalX = (props) => {
  const navigate = useNavigate();
  let location = useLocation();

  console.log(props, ' props');
  console.log(location, ' useLocation Hook');

  const background = location.state?.background;
  console.log(background, '  Background useLocation Hook');
  return (
    <>
      <div className='card-body text-center'>
        <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
          <Modal.Body>
            <h1>Te Felicit</h1>
          </Modal.Body>
          <button className='btn btn-primary' onClick={() => navigate(-1)}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalX;
