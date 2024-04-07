import React, { useEffect } from 'react';
import Tasks from 'pages/tasks';
import { useUserInfo } from 'hooks/user';
import Guide from './guide';
import { useRouter } from 'next/router';
export default function Index() {
  const { userInfo } = useUserInfo();
  const route = useRouter();
  // 判断是否登录成功了
  useEffect(() => {
    if (!userInfo?.address) {
      route.replace('/guide');
    }
  }, [userInfo]);
  return <> {userInfo?.address ? <Tasks /> : ''}</>;
}
