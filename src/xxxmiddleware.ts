import { routers, useUserRoute } from 'hooks/user';
import { NextResponse, NextRequest } from 'next/server';
import { IPath } from 'utils/constant';

export const config = {
  matcher: [`/${IPath.TASKS}/:path*`, `/${IPath.MYREQUIREMENT}/:path*`],
};

const middleware = (req: NextRequest, res: NextResponse) => {
  let identification = req.cookies.get('identification');
  // const loginUrl = new URL('/', req.url,routers)
  console.log('req.url>>>>', req.url, routers);
  // if (req.nextUrl.pathname.startsWith('/creator')){
  //   // loginUrl.searchParams.set('from', req.nextUrl.pathname)
  //   return NextResponse.redirect(loginUrl)
  // }
  return;
};
export default middleware;
