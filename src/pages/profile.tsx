/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Flex, Grid, Portal } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';

// Custom components
import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';
import Notifications from 'views/admin/profile/components/Notifications';
import Projects from 'views/admin/profile/components/Projects';
import Storage from 'views/admin/profile/components/Storage';
import Upload from 'views/admin/profile/components/Upload';
import Navbar from 'components/navbar/NavbarAdmin';
// Assets
import banner from 'img/auth/banner.png';
import avatar from 'img/avatars/avatar4.png';
import { useSession } from 'next-auth/react';
import { useMyPledge, useUserInfo } from 'hooks/user';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { getActiveNavbar, getActiveNavbarText } from 'utils/navigation';
import UserBaseInfo from 'views/user/userBaseInfo';
import { Identification, IPath } from 'utils/constant';
import UserMyPledge from 'views/user/userMyPledge';
import UserMyReward from 'views/user/userMyReward';
import UserMajor from 'views/user/userMajor';
import UserSkillsTag from 'views/user/userSkillsTag';
import UserExperience from 'views/user/userExperience';
import UserCertificates from 'views/user/userCertificates';
import UserAttachedResume from 'views/user/userAttachedResume';
import UserTaskExperience from 'views/user/userTaskExperience';

export default function ProfileOverview() {
  const {identification, userInfo} = useUserInfo()
  const isEngineer = useMemo(() => {
    return identification === Identification.ENGINEER
  }, [identification])

  const router = useRouter()
  useEffect(() => {
    console.log("identification>>>>>>>>>>?", identification)
    if (!identification && identification !== Identification.VISITOR) {
      router.replace('/')
    }
  }, [])
  const {data: mypledge} = useMyPledge()
  return (
    <AdminLayout>
      <Portal>
        <Box>
          <Navbar
            paths={[{path: '#', name: 'User Center'}]}
          />
        </Box>
      </Portal>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <UserBaseInfo from={IPath.PROFILE} isEngineer={isEngineer} userInfo={userInfo}/>
        {/* 水手展示个人信息 */}
        {isEngineer && <UserMajor from={IPath.PROFILE} isEngineer={isEngineer}/>}
        <Flex gap="20px">
          <UserMyPledge data={mypledge}/>
          <UserMyReward data={[{},{},{},{},{}]}/>
        </Flex>
        {/* 水手展示以下信息 */}
        {isEngineer && <Flex gap="20px" justifyContent="space-between" width="100%">
          <Box width="50%">
            <UserSkillsTag />
            <UserExperience data={[{},{},{}]}/>
            <UserCertificates data={[{},{},{}]} />
            <UserAttachedResume data={{}}/>
          </Box>
          <Box width="50%">
              {/* 任务经历 */}
            <UserTaskExperience data={[{},{},{}]}/>
          </Box>
        </Flex>
        }
      </Box>
    </AdminLayout>
  );
}
