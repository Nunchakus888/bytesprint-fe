import { Box,Flex,Button, toast, useToast } from "@chakra-ui/react";
import Loading from "components/loading";
import { useEngineerCheck, useEngineerDetail } from "hooks/engineer";
import AdminLayout from "layouts/admin";
import { useRouter } from "next/router";
import { IPath } from "utils/constant";
import UserAttachedResume from "views/user/userAttachedResume";
import UserBaseInfo from "views/user/userBaseInfo";
import UserCertificates from "views/user/userCertificates";
import UserExperience from "views/user/userExperience";
import UserMajor from "views/user/userMajor";
import UserQualify from "views/user/userQualify";
import UserSkillsTag from "views/user/userSkillsTag";

export default function EngineerCheck() {
  const router = useRouter();
  const { id = null } = router.query;
  const { data } = useEngineerDetail(id as string)
  const { fetchData: fetchEngineerCheck } = useEngineerCheck(id as string)
  const toast = useToast()
  const handleCertify = async (isCertify: boolean) => {
   const res = await fetchEngineerCheck(isCertify)
   if (res?.success) {
    toast({
      title: `审核成功`,
      status: `success`,
      isClosable: true,
      onCloseComplete: () => {
        router.back()
      }
    })
   } else {
    toast({
      title: res?.message || `certification error`,
      status: `error`,
      isClosable: true,
    })
   }
  }
  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }} position="relative">
        {data ? <>
          <UserBaseInfo from={IPath.ENGINEERCheck} data={{}}/>
          <UserMajor from={IPath.ENGINEERManage}/>
          <UserSkillsTag />
          <UserExperience data={[{},{},{}]}/>
          <UserCertificates data={[{},{},{}]} />
          <UserAttachedResume data={{}}/>
          <Flex margin="20px 0" gap="20px">
            <Button background="#7551FF" size="md" width="120px" borderRadius={4} onClick={() => handleCertify(true)}>认证通过</Button>     
            <Button color="#7551FF" background="rgba(255,255,255, 0.05)" size="md" width="120px" borderRadius={4} onClick={() => handleCertify(false)}>认证不通过</Button>      
          </Flex>
        </> : <Loading />}
      </Box>
    </AdminLayout>
  )
}