import Loadable from 'react-loadable';

import Loading from '@components/Loading';
import Editor from '@views/editor/Editor';
import Notifications from '@views/notifications/Notifications';
import DashboardBuilder from '@views/builder/DashboardBuilder';

const AsyncHome = Loadable({ 
  loader: () => import('@views/home/Home'),
  loading: Loading
});
const AsyncContracts = Loadable({ 
  loader: () => import('@views/contracts/Contracts'),
  loading: Loading
});
const AsyncUsers = Loadable({ 
  loader: () => import('@views/users/Users'),
  loading: Loading
});

const dashboardRoutes = [
  {
    path: "/",
    exact: true,
    protected: true,
    displayLink: false,
    label: null,
    icon: null,
    component: AsyncHome
  },
  {
    path: "/contract",
    exact: true,
    protected: true,
    displayLink: true,
    label: "Contract Templates",
    icon: 'src/assets/images/sidebar/contract-icon.png',
    activeIcon: 'src/assets/images/sidebar/contract-icon-active.png',
    component: AsyncContracts
  },
  {
    exact: true,
    path: "/users",
    protected: true,
    displayLink: true,
    label: "Users",
    icon: 'src/assets/images/sidebar/user-icon.png',
    activeIcon: 'src/assets/images/sidebar/user-icon-active.png',
    component: AsyncUsers
  },
  // {
  //   exact: true,
  //   path: "/editor",
  //   label: "Request Form Editor",
  //   icon: '',
  //   component: AsyncUsers
  // },
  // {
  //   exact: true,
  //   path: "/notification-settings",
  //   label: "Notification Settings",
  //   icon: '',
  //   component: AsyncUsers
  // },
  // {
  //   exact: true,
  //   path: "/dashboard-builder",
  //   label: "Dashboard Builder",
  //   icon: '',
  //   component: AsyncUsers
  // },

  { redirect: true, path: "/", to: "/home", label: "Home" }
];

export default dashboardRoutes;

