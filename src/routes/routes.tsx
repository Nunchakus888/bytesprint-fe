import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdPerson, MdHome } from 'react-icons/md';

// Admin Imports
import MainDashboard from 'pages/send-requirements';

// import { IRoute } from 'types/navigation';
import { Identification, IPath } from 'utils/constant';
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useUserInfo, useUserRoute } from 'hooks/user';
import { useRouter } from 'next/router';
import _ from 'lodash';



// const renderRouter = () => {
//   const router = useRouter()
  
//   console.log("path>>>", router.pathname)

//   const { identification } =
//     useSelector((state: any) => state.common);
//   const d = useMemo(() => {
//     console.log("identification>>>>", identification)
//     if (!identification) {
//       return defaultRoutes
//     }
    
//     return routers[identification as Identification]
//   }, [identification])


//   // useEffect(() => {
//   //   const paths = d.map(r => {
//   //     if (r.path) return r.path
//   //     if (r.children) {
//   //       const ps = r.children.map((it:any) => it.path)
//   //       return ps
//   //     }
//   //   })
//   //   console.log('_.flatten(paths)>>>', _.flatten(paths))
//   //   const validPaths = _.flatten(paths)
//   //   if (!validPaths.some(it => it === router.pathname)) {
//   //     router.replace('/')
//   //   }
//   // }, [d])
  

//   // if (d.some(rout => rout.children.some((it:any) => it.path === router.pathname))) {
//   //   router.replace('/')
//   // }

//   return d;
// }

const renderRouter = () => {
  const routes = useUserRoute()
  return routes
}


export default renderRouter();
