import React from 'react';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@elrondnetwork/dapp-core/UI';
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';

import { Modal } from 'react-bootstrap';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from 'components/Layout';
import PageNotFound from 'pages/PageNotFound';
import { routeNames } from 'routes';
import { contextualArray } from 'routes';
import routes from 'routes';
import ModalActivation from './components/ModalActivation';
import ModalView from './components/ModalView';
import UnlockPage from './pages/UnlockPage';

const environment = 'devnet';
const App = () => {
  const location = useLocation();
  //eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const background = location.state && location.state.background;

  return (
    <DappProvider
      environment={environment}
      customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
    >
      <Layout>
        <TransactionsToastList />
        <NotificationModal />
        {/*<ModalView />*/}
        <SignTransactionsModals className='custom-class-for-modals' />
        <Routes location={background || location}>
          <Route path={routeNames.unlock} element={<UnlockPage />} />
          {routes.map((route: any, index: number) => (
            <Route
              path={route.path}
              key={'route-key-' + index}
              element={<route.component />}
            />
          ))}

          <Route path='*' element={<PageNotFound />} />
        </Routes>
        {/* Show the modal when a background page is set */}
        {background && (
          <Routes>
            {contextualArray.map((route: any, index: number) => (
              <Route
                path={route.path}
                key={'route-key-' + index}
                element={
                  <Modal show={true} centered>
                    <route.component />
                  </Modal>
                }
              />
            ))}
          </Routes>
        )}
      </Layout>
    </DappProvider>
  );
};

export default App;
