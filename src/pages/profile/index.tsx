// Chakra imports
import { Box, Flex, Grid, Portal } from '@chakra-ui/react';

import Navbar from 'components/navbar/Navbar';

import { useMyPledge, useUserInfo } from 'hooks/user';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
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

export default function ProfileOverview() {
  const { identification, userInfo } = useUserInfo();
  const { data: mypledge } = useMyPledge();
  const router = useRouter();

  useEffect(() => {
    console.log('identification>>>>>>>>>>?', identification);
    if (!identification && identification !== Identification.VISITOR) {
      router.replace('/');
    }
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
            <UserMyPledge data={mypledge} />
          </Flex>
          <Flex basis="50%">
            <UserMyReward data={[{}, {}, {}, {}, {}]} />
          </Flex>
        </Flex>
        {/* 水手展示以下信息 */}
        {isEngineer && (
          <Flex gap="20px" justifyContent="space-between" width="100%">
            <Box width="50%">
              <UserSkillsTag userInfo={userInfo} />
              {/* <UserCertificates data={[{}, {}, {}]} /> */}
              <UserAttachedResume data={{}} />
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
