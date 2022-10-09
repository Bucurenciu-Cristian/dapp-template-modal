import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ModalTest = (props) => {
  const navigate = useNavigate();

  return (
    <Modal
      Body={props.Header}
      show={props.modal}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          {props.Header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTest;
