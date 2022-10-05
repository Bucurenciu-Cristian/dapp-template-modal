import React, { useState } from 'react';
import ModalActivation from '../../components/ModalActivation';

const ModalView = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  return (
    <>
      <div className='d-flex flex-fill align-items-center container'>
        <div className='row w-100'>
          <div className='col-12 col-md-8 col-lg-5 mx-auto'>
            <div className='card shadow-sm rounded p-4 border-0'>
              <div className='card-body text-center d-flex flex-column align-content-center justify-content-center'>
                <button
                  className='btn btn-primary p-3 text-white'
                  onClick={toggleModal}
                >
                  Click me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <ModalActivation>
          <div>
            <h1>Do you want to close the Modal? Click NO</h1>
            <div className='buttons'>
              <a className='btn btn-primary' href='#'>
                YES
              </a>
              <button className='btn btn-secondary' onClick={toggleModal}>
                NO
              </button>
            </div>
          </div>
        </ModalActivation>
      ) : null}
    </>
  );
};

export default ModalView;
