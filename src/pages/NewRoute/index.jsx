import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NewRoute = ({ background }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className='d-flex flex-fill align-items-center container'>
        <div className='row w-100'>
          <div className='col-12  mx-auto'>
            <div className='card shadow-sm rounded p-4 border-0'>
              <div className='card-body text-center'>
                <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
                  {background ? (
                    <div>
                      <h1>Am un fundal in spate.</h1>
                    </div>
                  ) : (
                    <h1>Am fost accesat din URL</h1>
                  )}
                  <Button
                    className='btn btn-primary'
                    onClick={() => navigate(-1)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewRoute;
