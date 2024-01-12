import { Box, Flex, Button, toast, useToast } from '@chakra-ui/react';
import Loading from 'components/loading';
import { useOperatorCheck, useOperatorDetail } from 'hooks/operator';
import { useRouter } from 'next/router';
import { IPath } from 'common/constant';
import UserBaseInfo from 'views/user/userBaseInfo';
import UserMajor from 'views/user/userMajor';
import UserQualify from 'views/user/userQualify';

export default function OperatorCheck() {
  const router = useRouter();
  const { id = null } = router.query;
  const { data } = useOperatorDetail(id as string);
  const { fetchData: fetchOperatorCheck } = useOperatorCheck(id as string);
  const toast = useToast();
  const handleCertify = async (isCertify: boolean) => {
    const res = await fetchOperatorCheck(isCertify);
    if (res?.success) {
      toast({
        title: `审核成功`,
        status: `success`,
        isClosable: true,
        onCloseComplete: () => {
          router.back();
        },
      });
    } else {
      toast({
        title: res?.message || `certification error`,
        status: `error`,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }} position="relative">
        {data ? (
          <>
            <UserBaseInfo from={IPath.OperatorCheck} data={{}} />
            <UserMajor from={IPath.OPERATOR} />
            <UserQualify />
            <Flex margin="20px 0" gap="20px">
              <Button
                background="#7551FF"
                size="md"
                width="120px"
                borderRadius={4}
                onClick={() => handleCertify(true)}
              >
                认证通过
              </Button>
              <Button
                color="#7551FF"
                background="rgba(255,255,255, 0.05)"
                size="md"
                width="120px"
                borderRadius={4}
                onClick={() => handleCertify(false)}
              >
                认证不通过
              </Button>
            </Flex>
          </>
        ) : (
          <Loading />
        )}
      </Box>
    </>
  );
}
