import { Box, Text, Flex, Image, Tag } from '@chakra-ui/react';
import { EducationTypes } from 'common/constant';
import dayjs from 'dayjs';
import styles from './index.module.scss';
import { BiBriefcaseAlt2 } from 'react-icons/bi';
import { FaGraduationCap } from 'react-icons/fa';
import { useMemo } from 'react';
export default function UserExperience(props: { userInfo: any }) {
  const { userInfo } = props;
  // test
  // const res = {
  //   address: 'Algeria, Eckerö',
  //   phone: '+86234234',
  //   email: '997785798@qq.com',
  //   certificateList: [
  //     {
  //       expiration: null,
  //       name: 'af3b4d28399532b60de3c1465413d8cc.png',
  //       path: 'https://bytesprintdata.obs.ap-southeast-1.myhuaweicloud.com:443/af3b4d28399532b60de3c1465413d8cc.png%3A1714291599276',
  //       time: 1714291608652,
  //     },
  //   ],
  //   jobList: [
  //     {
  //       companyName: 'suzhou hanshou jisuanji youxiaogognsi',
  //       department: 'jishu bumen',
  //       position: 'jishuwajueji',
  //       startTime: '2024-04-01 00:00:00',
  //       endTime: '2024-04-28 00:00:00',
  //     },
  //   ],
  //   educationList: [
  //     {
  //       school: 'xianggang zhong fangxingzhe ngda',
  //       startTime: '2022-04-10 00:00:00',
  //       endTime: '2024-04-14 00:00:00',
  //       education: 5,
  //       major: 'hualao xingsr',
  //     },
  //   ],
  //   position: [1, 4],
  //   experience: 2,
  //   skillList: [
  //     'java',
  //     ' javascript',
  //     'react',
  //     'vue',
  //     'java',
  //     ' javascript',
  //     'react',
  //     'vue',
  //     'java',
  //     ' javascript',
  //     'react',
  //     'vue',
  //   ],
  //   authorizeCode: '',
  //   certificateList: [],
  // };
  // userInfo.data = {
  //   engineer: res,
  // };
  const isShow = useMemo(() => {
    if (
      userInfo?.data?.engineer?.jobList.length === 0 &&
      userInfo?.data?.engineer?.educationList.length === 0
    ) {
      return false;
    }
    return true;
  }, [userInfo]);
  return (
    <>
      {isShow ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          position="relative"
          marginTop="20px"
          paddingBottom="20px"
          className={styles.container}
          width="-webkit-fill-available"
        >
          <Text fontSize={18} fontWeight="bold">
            Work and Education Experience
          </Text>
          <Box justifyContent="center" margin="20px 0" width="100%">
            {userInfo?.data?.engineer?.jobList.map((it: any, index: number) => {
              return (
                <Flex
                  key={`ex_${index}`}
                  justifyContent="space-between"
                  gap="10px"
                  background="rgba(255,255,255,0.06)"
                  borderRadius={4}
                  margin="10px 0"
                  padding="30px 25px"
                  alignItems="center"
                >
                  <Flex gap="10px" width="70%" alignItems="center">
                    <Flex
                      className={styles.experienceTag}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <BiBriefcaseAlt2 size={32} color="#999" />
                    </Flex>
                    <Flex direction="column" gap="10px">
                      <Box>
                        <Text fontWeight="bold">{it.companyName}</Text>
                      </Box>
                      <Flex color="#999" fontSize="14">
                        {it.startTime && dayjs(it.startTime).format('YYYY/MM/DD')}
                        {it.startTime && '-'}
                        {it.endTime && dayjs(it.endTime).format('YYYY/MM/DD')}
                      </Flex>
                    </Flex>
                  </Flex>
                  {(it.department || it.position) && (
                    <Flex gap="5px" fontWeight="bold">
                      <Text>{it.department}</Text>
                      <Text>·</Text>
                      <Text>{it.position}</Text>
                    </Flex>
                  )}
                </Flex>
              );
            })}

            {userInfo?.data?.engineer?.educationList.map((it: any, index: number) => {
              return (
                <Flex
                  key={`ex_${index}`}
                  justifyContent="space-between"
                  gap="10px"
                  background="rgba(255,255,255,0.06)"
                  borderRadius={4}
                  margin="10px 0"
                  padding="30px 25px"
                  alignItems="center"
                >
                  <Flex gap="10px" width="70%" alignItems="center">
                    <Flex
                      className={styles.experienceTag}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <FaGraduationCap size={32} color="#999" />
                    </Flex>
                    <Flex width="45%" direction="column" gap="10px">
                      <Box>
                        <Text fontWeight="bold">{it.school}</Text>
                      </Box>
                      <Flex color="#999" fontSize="14">
                        {it.startTime && dayjs(it.startTime).format('YYYY/MM/DD')}
                        {it.startTime && '-'}
                        {it.endTime && dayjs(it.endTime).format('YYYY/MM/DD')}
                      </Flex>
                    </Flex>
                  </Flex>
                  {(it.education || it.major) && (
                    <Flex gap="5px" fontWeight="bold">
                      <Text>
                        {EducationTypes.filter((v) => +v.value === +it.education)[0]?.label}
                      </Text>
                      <Text>·</Text>
                      <Text>{it.major}</Text>
                    </Flex>
                  )}
                </Flex>
              );
            })}
          </Box>
        </Box>
      ) : (
        ''
      )}
    </>
  );
}
