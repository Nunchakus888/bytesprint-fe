// Chakra imports
import { Box, Flex, Grid, Portal } from '@chakra-ui/react';

import Navbar from 'components/navbar/Navbar';

import { useMyPledge, useMyRewards, useUserInfo, useUserInfoByUid } from 'hooks/user';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import UserBaseInfo from 'views/user/userBaseInfo';
import { Identification, IPath } from 'common/constant';
import UserMyPledge from 'views/user/userMyPledge';
import UserMyReward from 'views/user/userMyReward';
import UserMajor from 'views/user/userMajor';
import UserSkillsTag from 'views/user/userSkillsTag';
import UserExperience from 'views/user/userExperience';
import UserCertificates from 'views/user/userCertificates';
import UserAttachedResume from 'views/user/userAttachedResume';
import UserTaskExperience from 'views/user/userTaskExperience';
import API_ROUTERS from 'api';
import { Get } from 'common/utils/axios';
import { getItem, setItem } from 'common/utils';
import { setUserInfo as setUserInfoStore } from 'common/slice/commonSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileOverview() {
  // // test
  // const userInfo: any = {
  //   data: {
  //     result: { code: 0, message: 'success' },
  //     uid: 'E0351099955257511005',
  //     userType: 2,
  //     walletAddress: '0x524e93A271d2e50Ce78b39F4E3df2d828DA490a9',
  //     nickname: '0x524e93A271d2e50Ce78b39F4E3df2d828DA490a9',
  //     currency: 'USDT',
  //     level: 0,
  //     engineer: {
  //       status: 0,
  //       position: [2],
  //       name: null,
  //       age: null,
  //       sex: -1,
  //       address: 'New York 666666 aa',
  //       phone: '+861111122222',
  //       email: 'wuwenjie@sina.com',
  //       experience: '3',
  //       workingStatus: -1,
  //       educationType: 0,
  //       jobList: [
  //         {
  //           companyName: '牛逼puls，NTFC++ Inc.',
  //           position: 'GGo,ctf',
  //           startTime: Date.now(),
  //           endTime: Date.now(),
  //           department: 'NTFc depaerment puls',
  //         },
  //         {
  //           companyName: '牛逼11puls，NTFC++ Inc.',
  //           position: 'GGo,ctf',
  //           startTime: null,
  //           endTime: null,
  //           department: 'NTFc depaerment puls1',
  //         },
  //       ],
  //       educationList: [
  //         {
  //           school: 'jialidun college',
  //           major: 'neural network',
  //           education: '5',
  //           startTime: null,
  //           endTime: null,
  //         },
  //       ],
  //       certificateList: [
  //         {
  //           name: '1.jpg',
  //           expiration: null,
  //           path: 'https://bytesprintdata.obs.ap-southeast-1.myhuaweicloud.com:443/1.jpg%3A1711444872846',
  //         },
  //       ],
  //       skillList: ['java', 'go', 'aa', 'bb', 'cc', 'ios', 'android'],
  //       authorizeCode: '',
  //     },
  //     operator: null,
  //   },
  // };
  // const setUserInfo = (a: any) => {};

  const [userInfo, setUserInfo] = useState({});
  const { identification, userInfo: oldUserInfo } = useUserInfo();
  const { data: mypledge, refresh: pledgeRefresh } = useMyPledge();
  const { data: myrewards, refresh: rewardsRefresh } = useMyRewards();
  const router = useRouter();
  const dispatch = useDispatch();
  // 重新请求，认证成功后这里会改变数据
  const getOwnInfo = async () => {
    const userData = await Get(API_ROUTERS.users.USER_INFO({ uid: oldUserInfo?.data?.uid }));
    const local_userInfo = getItem('userInfo') || {};
    local_userInfo.data = userData;
    local_userInfo.timestamp = Date.now();
    dispatch(setUserInfoStore(local_userInfo));
    setItem('userInfo', local_userInfo);
    setUserInfo({ data: userData });
  };

  useEffect(() => {
    console.log('identification>>>>>>>>>>?', identification);
    if (!identification && identification !== Identification.VISITOR) {
      router.replace('/');
    }
    getOwnInfo();
  }, []);

  const isEngineer = useMemo(() => {
    return identification === Identification.ENGINEER;
  }, [identification]);

  return (
    <>
      <Box>
        <UserBaseInfo from={IPath.PROFILE} isEngineer={isEngineer} userInfo={userInfo} />
        {/* 水手展示个人信息 */}
        {isEngineer && (
          <UserMajor from={IPath.PROFILE} isEngineer={isEngineer} userInfo={userInfo} />
        )}
        <Flex gap="20px">
          <Flex basis="50%">
            <UserMyPledge data={mypledge} refresh={pledgeRefresh} />
          </Flex>
          <Flex basis="50%">
            <UserMyReward data={myrewards} refresh={rewardsRefresh} />
          </Flex>
        </Flex>
        {/* 水手展示以下信息 */}
        {isEngineer && (
          <Flex gap="20px" justifyContent="space-between" width="100%">
            <Box width="50%">
              <UserSkillsTag userInfo={userInfo} />
              {/* <UserCertificates data={[{}, {}, {}]} /> */}
              {/* TODO 附件 */}
              <UserAttachedResume data={userInfo} />
            </Box>
            <Box width="50%">
              {/* 任务经历 */}
              {/* <UserTaskExperience data={[{}, {}, {}]} /> */}
              <UserExperience userInfo={userInfo} />
            </Box>
          </Flex>
        )}
      </Box>
    </>
  );
}
