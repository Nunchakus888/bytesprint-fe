import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdPerson, MdHome } from 'react-icons/md';

// Admin Imports
import MainDashboard from 'pages/send-requirements';
import Index from 'pages';
import Profile from 'pages/profile';
import Task from 'pages/task';

import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  // {
  //   name: '项目大厅',
  //   layout: '/',
  //   path: '/',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: Index,
  // },
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
    name: '任务大厅',
    layout: '/',
    path: '/task',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: Task,
  },
  // {
  //   name: '我的需求',
  //   layout: '/',
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   path: '/requirements',
  //   component: MyRequirements,
  // },
  
  // {
  //   name: '我的任务',
  //   layout: '/',
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   path: '/tasks',
  //   component: Tasks,
  // },
];

export default routes;
