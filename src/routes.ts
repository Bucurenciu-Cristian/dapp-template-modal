import { dAppName } from 'config';
import withPageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ModalX from './pages/ModalX';
import NewRoute from './pages/NewRoute';
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
  modalActivation: '/modalX',
  newRoute: '/NewRoute'
};
const firstModal = {
  path: contextualRouteNames.modalActivation,
  title: 'Modal',
  component: ModalX
};
const secondModal = {
  path: contextualRouteNames.newRoute,
  title: 'Modal',
  component: NewRoute
};
export const contextualArray: Array<any> = [firstModal, secondModal];

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
  secondModal
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
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
