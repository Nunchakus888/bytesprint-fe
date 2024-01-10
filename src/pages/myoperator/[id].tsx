import { Box, Flex, Button, toast, useToast } from '@chakra-ui/react';
import Loading from 'components/loading';
import { useOperatorCheck, useOperatorDetail } from 'hooks/operator';
import AdminLayout from 'layouts/admin';
import { useRouter } from 'next/router';
import { IPath } from 'common/utils/constant';
import UserBaseInfo from 'views/user/userBaseInfo';
import UserMajor from 'views/user/userMajor';
import UserQualify from 'views/user/userQualify';

export default function MyOperatorDetail() {
  const router = useRouter();
  const { id = null } = router.query;
  const { data } = useOperatorDetail(id as string);

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }} position="relative">
        {data ? (
          <>
            <UserBaseInfo from={IPath.MYOPERATORDetail} data={{}} />
            <UserMajor from={IPath.MYOPERATORDetail} />
            <UserQualify />
          </>
        ) : (
          <Loading />
        )}
      </Box>
    </AdminLayout>
  );
}
