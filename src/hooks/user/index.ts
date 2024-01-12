import { useEffect, useMemo, useState } from 'react';
import { MdBarChart, MdPerson } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Identification, IPath } from 'common/constant';
import API_ROUTERS from 'api';
import { Get } from 'common/utils/axios';

let defaultRoutes: any[] = [
  // {
  //   name: '项目大厅',

  //   path: '/',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: Index,
  // },
  {
    name: 'CS Management',
    icon: MdBarChart, // <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    children: [
      {
        name: 'Task Hall',
        path: `/${IPath.TASKS}`,
        // icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      },
      {
        name: 'My Requirements',
        // icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
        path: `/${IPath.MYREQUIREMENT}`,
      },

      {
        name: 'My Task',
        // icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
        path: `/${IPath.MYTASKS}`,
      },
    ],
  },
];

let visitor_defaultRoutes: any[] = [
  // {
  //   name: '项目大厅',

  //   path: '/',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: Index,
  // },
  {
    name: 'CS Management ',
    icon: MdBarChart, // <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    children: [
      {
        name: 'Task Hall',
        path: `/${IPath.TASKS}`,
        // icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      },
      {
        name: 'My Requirements',
        // icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
        path: `/${IPath.MYREQUIREMENT}`,
      },
    ],
  },
];

let noLogin_defaultRoutes: any[] = [
  // {
  //   name: '项目大厅',

  //   path: '/',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: Index,
  // },
  {
    name: 'CS Management',
    icon: MdBarChart, // <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    children: [
      {
        name: 'Task Hall',
        path: `/${IPath.TASKS}`,
        // icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      },
    ],
  },
];

const system = [
  {
    name: 'Navigator管理',
    icon: MdPerson, // <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,

    children: [
      {
        name: 'Navigator审核',
        // icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
        path: `/${IPath.OPERATOR}`,
      },
      {
        name: '我的Navigator',
        // icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
        path: `/${IPath.MYOPERATOR}`,
      },
    ],
  },
];

const operator = [
  ...defaultRoutes,
  // {
  // 	name: 'Tasker管理',
  // 	icon: MdPerson, // <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  // 	children: [
  // 		{
  // 			name: 'Tasker审核',
  // 			// icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  // 			path: `/${IPath.ENGINEERManage}`
  // 		},
  // 		{
  // 			name: '我的Tasker',
  // 			// icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  // 			path: `/${IPath.MYENGINEER}`
  // 		},
  // 	]
  // },
  // {
  // 	name: '系统设置',
  // 	icon: MdPerson, // <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  // 	children: [
  // 		{
  // 			name: '认证职位',
  // 			// icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  // 			path: `/system/certposition`,
  // 		},
  // 		{
  // 			name: 'Tasker认证设置',
  // 			// icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  // 			path: `/system/certengineersetting`
  // 		},
  // 	]
  // }
];

const loginNav = [
  {
    name: 'User Center',
    path: '/profile',
    icon: MdPerson, // <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  // {
  // 	name: '钱包管理',
  // 	path: '/account',
  // 	icon: MdHome // <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  // }
];

export const routers = {
  [Identification.SYSTEM]: system,
  [Identification.OPERATOR]: [...loginNav, ...operator],
  [Identification.ENGINEER]: [...loginNav, ...defaultRoutes],
  [Identification.VISITOR]: [...loginNav, ...visitor_defaultRoutes],
};

export const useUserInfo = () => {
  const { userInfo } = useSelector((state: any) => state.common);

  const identification = useMemo(() => {
    const data = userInfo?.data;
    return data?.userType;
  }, [userInfo.data]);

  return {
    identification,
    userInfo,
  };
};

export const useUserRoute = () => {
  const { identification } = useUserInfo();
  const d = useMemo(() => {
    console.log('identification>>>>', identification);
    if (!identification && identification !== Identification.VISITOR) {
      return noLogin_defaultRoutes;
    }

    return routers[identification as Identification];
  }, [identification]);
  return d;
};

// 我的质押
export const useMyPledge = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await Get(API_ROUTERS.users.MY_PLEDGE());
    setData(res?.stakings || []);
  };
  useEffect(() => {
    getData();
  }, []);
  return {
    data,
  };
};
