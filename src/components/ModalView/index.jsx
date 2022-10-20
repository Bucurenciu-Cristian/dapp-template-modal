import React from 'react';
import { Modal } from 'react-bootstrap';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { routeNames } from '../../routes';

const ModalView = () => {
  let location = useLocation();
  const navigate = useNavigate();

  let urlPath = location.pathname;
  const background = location.state?.background;
  let urlPathBG = background?.pathname;
  console.log(urlPathBG, '->', urlPath);
  console.log('-------------------------------');
  return (
    <>
      {background && (
        <Routes location={location}>
          <Route
            path={urlPath}
            element={
              <div
                onClick={() => {
                  navigate(-1);
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  background: 'rgba(0, 0, 0, 0.50)'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    background: '#fff',
                    top: 25,
                    left: '10%',
                    right: '10%',
                    padding: 15,
                    border: '2px solid #444'
                  }}
                >
                  <h1>Salutare</h1>
                  <button
                    type='button'
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default ModalView;
