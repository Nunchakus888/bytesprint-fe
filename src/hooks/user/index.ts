import { useRouter } from "next/router";
import { useMemo } from "react";
import { MdBarChart, MdHome, MdPerson } from "react-icons/md";
import { useSelector } from "react-redux";
import { Identification, IPath } from "utils/constant";
import {useCookies} from 'react-cookie'
export const useUserInfo = () => {
	const [cookies, setCookie, removeCookie] = useCookies();
	// 身份
  const { identification } =
    useSelector((state: any) => state.common);
	return {
		identification
	}
}

let defaultRoutes: any[] = [
	// {
	//   name: '项目大厅',
	
	//   path: '/',
	//   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
	//   component: Index,
	// },
	{
		name: '众包管理',
		icon: MdBarChart, // <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
		children: [
			{
				name: '任务大厅',
				path: `/${IPath.TASKS}`,
				// icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
			},
			{
				name: '我的需求',
				// icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
				path: `/${IPath.MYREQUIREMENT}`,
			},
			
			{
				name: '我的任务',
				// icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
				path: `/${IPath.MYTASKS}`
			},
		]
	},
	
	
];

const system = [
	{
		name: '船长管理',
		icon: MdPerson,  // <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,

		children: [
			{
				name: '船长审核',
				// icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
				path: `/${IPath.OPERATOR}`,
			},
			{
				name: '我的船长',
				// icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
				path: `/${IPath.MYOPERATOR}`,
			},
		]
	},
]

const operator = [
	...defaultRoutes,
	{
		name: '水手管理',
		icon: MdPerson, // <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
		children: [
			{
				name: '水手审核',
				// icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
				path: `/${IPath.ENGINEERManage}`
			},
			{
				name: '我的水手',
				// icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
				path: `/${IPath.MYENGINEER}`
			},
		]
	},
	{
		name: '系统设置',
		icon: MdPerson, // <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
		children: [
			{
				name: '认证职位',
				// icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
				path: `/system/certposition`,
			},
			{
				name: '水手认证设置',
				// icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
				path: `/system/certengineersetting`
			},
		]
	}
]

const loginNav = [
	{
		name: '用户中心',
		path: '/profile',
		icon: MdPerson, // <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
	},
	{
		name: '钱包管理',
		path: '/account',
		icon: MdHome // <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
	}
]

export const routers = {
	[Identification.SYSTEM]: system,
	[Identification.OPERATOR]: [...loginNav, ...operator],
	[Identification.ENGINEER]: [...loginNav, ...defaultRoutes],
	[Identification.VISITOR]: [...loginNav, ...defaultRoutes],
}

export const useUserRoute = () => {

  const { identification } =
    useSelector((state: any) => state.common);
  const d = useMemo(() => {
    console.log("identification>>>>", identification)
    if (!identification) {
      return defaultRoutes
    }
    
    return routers[identification as Identification]
  }, [identification])
	return d;
}


