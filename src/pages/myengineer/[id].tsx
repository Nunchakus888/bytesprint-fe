import { Box, Flex, Button, toast, useToast } from '@chakra-ui/react';
import Loading from 'components/loading';
import { useEngineerDetail } from 'hooks/engineer';
import AdminLayout from 'layouts/admin';
import { useRouter } from 'next/router';
import { IPath } from 'common/utils/constant';
import UserAttachedResume from 'views/user/userAttachedResume';
import UserBaseInfo from 'views/user/userBaseInfo';
import UserCertificates from 'views/user/userCertificates';
import UserExperience from 'views/user/userExperience';
import UserMajor from 'views/user/userMajor';
import UserQualify from 'views/user/userQualify';
import UserSkillsTag from 'views/user/userSkillsTag';
import UserTaskExperience from 'views/user/userTaskExperience';

export default function MyEngineerDetail() {
  const router = useRouter();
  const { id = null } = router.query;
  const { data } = useEngineerDetail(id as string);

  return (
    <>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }} position="relative">
        {data ? (
          <>
            <UserBaseInfo from={IPath.ENGINEERCheck} data={{}} />
            <UserMajor from={IPath.ENGINEERManage} />
            <Flex gap="20px" justifyContent="space-between" width="100%">
              <Box width="50%">
                <UserSkillsTag />
                <UserExperience data={[{}, {}, {}]} />
                <UserCertificates data={[{}, {}, {}]} />
                <UserAttachedResume data={{}} />
              </Box>
              <Box width="50%">
                {/* 任务经历 */}
                <UserTaskExperience data={[{}, {}, {}]} />
              </Box>
            </Flex>
          </>
        ) : (
          <Loading />
        )}
      </Box>
    </>
  );
}
