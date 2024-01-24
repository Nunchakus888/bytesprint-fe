import { Avatar, Box, Button, Flex, Tag, Text } from '@chakra-ui/react';
import { EducationTypes, ExperienceTypes, IPath } from 'common/constant';
import { useMemo } from 'react';
import styles from './index.module.scss';

export default function UserMajor(props: {
  from: IPath;
  isEngineer?: boolean;
  isOperator?: boolean;
  userInfo?: any;
}) {
  const { from = '', isOperator, isEngineer, userInfo } = props;
  // const from = IPath.ENGINEERManage
  const educationVal = useMemo(() => {
    if (isEngineer) {
      const maxEdu = userInfo?.data?.engineer?.educationList?.sort((a: any, b: any) =>
        a.education > b.education ? -1 : 1
      );
      if (maxEdu?.length > 0) {
        return EducationTypes.filter((v) => v.value === maxEdu[0].education)[0]?.label;
      }
      return null;
    }
    return null;
  }, [isEngineer, userInfo]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
      position="relative"
      marginTop="20px"
      paddingBottom="20px"
      height="150px"
      className={styles.container}
    >
      {/* Navigator */}
      {/* {from.includes(IPath.OPERATOR) ||
        (isOperator && (
          <Flex justifyContent="space-around" alignItems="center" width="100%">
            <Box className={styles.numsIcon}>
              <Text>10人以内</Text>
            </Box>
            <Box className={styles.positionIcon}>
              <Text>信息传输、软件和信息技术服务业 / 软件和信息技术服务业</Text>
            </Box>
          </Flex>
        ))} */}

      {from.includes(IPath.ENGINEERManage) ||
        (isEngineer && (
          <Flex
            justifyContent="space-around"
            alignItems="center"
            width="100%"
            direction="row"
            className={styles.itemKeyInfo}
          >
            <Box className={styles.experience}>
              {
                ExperienceTypes.filter((v) => v.value === userInfo?.data?.engineer?.experience)[0]
                  ?.label
              }
            </Box>
            {educationVal && <Box className={styles.educational}>{educationVal}</Box>}
            <Box className={styles.phone}>{userInfo?.data?.engineer?.phone}</Box>
            <Box className={styles.workTime}>{userInfo?.data?.engineer?.email}</Box>
            <Box className={styles.workPlace}>{userInfo?.data?.engineer?.address}</Box>
          </Flex>
        ))}
    </Box>
  );
}
