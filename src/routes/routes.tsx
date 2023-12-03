import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdPerson, MdHome } from 'react-icons/md';

// Admin Imports
import MainDashboard from 'pages/send-requirements';
import Index from 'pages';
import Profile from 'pages/profile';
import Tasks from 'pages/tasks';

import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: '项目大厅',
    layout: '/',
    path: '/',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Index,
  },
  {
    name: '用户中心',
    layout: '/',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: '钱包管理',
    layout: '/',
    path: '/account',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Index,
  },
  {
    name: '发布需求',
    layout: '/',
    path: '/send-requirements',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: '我的任务',
    layout: '/',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    path: '/tasks',
    component: Tasks,
  },
];

export default routes;
