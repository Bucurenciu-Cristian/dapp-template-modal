import * as React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { dAppName } from 'config';
import { contextualRouteNames, routeNames } from 'routes';

const Home = () => {
  const location = useLocation();

  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto'>
          <div className='card shadow-sm rounded p-4 border-0'>
            <div className='card-body text-center'>
              <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
                <h2 className='mb-3' data-testid='title'>
                  {dAppName}
                </h2>

                <p className='mb-3'>
                  This is an Elrond dapp sample.
                  <br /> Login using your Elrond wallet.
                </p>

                <Link
                  to={routeNames.unlock}
                  className='btn btn-primary mt-3 text-white'
                  data-testid='loginBtn'
                >
                  Login
                </Link>

                <Link
                  to={contextualRouteNames.modalActivation}
                  state={{ background: location }}
                  className='btn btn-primary mt-3 ml-3 text-white'
                  data-testid='modalBtn'
                >
                  Modal
                </Link>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
