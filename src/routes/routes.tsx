import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdPerson, MdHome } from 'react-icons/md';

// Admin Imports
import MainDashboard from 'pages/send-requirements';
import Index from 'pages';
import Profile from 'pages/profile';
import Task from 'pages/tasks/index';
import MyRequirements from 'pages/myrequirement'
import MyTasks from 'pages/mytasks'
import Operator from 'pages/operator'
import MyOperator from 'pages/operator/myOperator'
import { IRoute } from 'types/navigation';
import { IPath } from 'utils/constant';

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
    path: `/${IPath.TASKS}`,
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: Task,
  },
  {
    name: '我的需求',
    layout: '/',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    path: `/${IPath.MYREQUIREMENT}`,
    component: MyRequirements,
  },
  
  {
    name: '我的任务',
    layout: '/',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    path: `/${IPath.MYTASKS}`,
    component: MyTasks,
  },
  {
    name: '船长管理',
    layout: '/',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    path: `/${IPath.OPERATOR}`,
    component: Operator,
  },
  {
    name: '我的船长',
    layout: '/',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    path: `/${IPath.OPERATOR}/${IPath.MYOPERATOR}`,
    component: MyOperator,
  },
  
];

export default routes;
