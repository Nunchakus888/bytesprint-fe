import { Icon } from '@chakra-ui/react'
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart
} from 'react-icons/md'

// Admin Imports
import MainDashboard from 'pages/admin/send-requirements'
import Home from 'pages/admin/home'
import Profile from 'pages/admin/profile'
import Tasks from 'pages/admin/tasks'
import RTL from 'pages/rtl/rtl-default'

// Auth Imports
import SignInCentered from 'pages/auth/sign-in'
import { IRoute } from 'types/navigation'

const routes: IRoute[] = [
  /*{
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard
  },*/
  {
    name: '项目大厅',
    layout: '/admin',
    path: '/home',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Home,
  },
  {
    name: '发布需求',
    layout: '/admin',
    path: '/send-requirements',
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: '我的任务',
    layout: '/admin',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    path: '/tasks',
    component: Tasks,
  },
  /*{
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    disabled: !0,
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile
  },*/
  /*{
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered
  },*/
  /*{
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: RTL
  }*/
]

export default routes
