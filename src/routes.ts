import { dAppName } from 'config';
import withPageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ModalX from './pages/ModalX';
import Transaction from './pages/Transaction';

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  transaction: '/transaction',
  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect',
  modalNew: '/modalNew'
};
export const contextualRouteNames = {
  modalActivation: '/modalX'
};
const firstModal = {
  path: contextualRouteNames.modalActivation,
  title: 'Modal',
  component: ModalX,
  modal: true
};
export const contextualArray: Array<any> = [firstModal];

const routes: Array<any> = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.transaction,
    title: 'Transaction',
    component: Transaction
  },
  firstModal,
  {
    path: routeNames.modalNew,
    title: 'ModalNew',
    component: ModalX,
    modal: true
  }
];
const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • Elrond ${dAppName}`
    : `Elrond ${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth,
    modal: route?.modal
  };
});

export default mappedRoutes;
