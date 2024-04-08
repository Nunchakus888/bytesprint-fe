import { Box, Text, Flex, Image, Tag } from '@chakra-ui/react';
import { EducationTypes } from 'common/constant';
import dayjs from 'dayjs';
import styles from './index.module.scss';

export default function UserExperience(props: { userInfo: any }) {
  const { userInfo } = props;
  return (
    <>
      {userInfo?.data?.engineer?.jobList ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          position="relative"
          marginTop="20px"
          paddingBottom="20px"
          className={styles.container}
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
                  background="#18191F"
                  borderRadius={4}
                  margin="10px 0"
                  padding="30px 25px"
                >
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    borderRadius={4}
                    fontSize={12}
                    background="linear-gradient(158deg, #3c4897 0%, #1d1e23 100%)"
                  >
                    {/* <Image
                  src="https://bit.ly/dan-abramov"
                  alt="Dan Abramov"
                  width="30px"
                  height="30px"
                /> */}
                    Work
                  </Flex>
                  <Flex width="45%" minWidth="200px" direction="column" gap="5px">
                    <Box>
                      <Text>{it.companyName}</Text>
                    </Box>
                    <Flex gap="5px">
                      <Text>{it.department}</Text>
                    </Flex>
                    <Flex gap="5px">
                      <Text>{it.position}</Text>
                    </Flex>
                  </Flex>
                  <Flex minWidth="177px" justifyContent="flex-end" alignItems="flex-start">
                    {it.startTime && dayjs(it.startTime).format('YYYY/MM/DD')}
                    {it.startTime && '-'}
                    {it.endTime && dayjs(it.endTime).format('YYYY/MM/DD')}
                  </Flex>
                </Flex>
              );
            })}

            {userInfo?.data?.engineer?.educationList.map((it: any, index: number) => {
              return (
                <Flex
                  key={`ex_${index}`}
                  justifyContent="space-between"
                  gap="10px"
                  background="#18191F"
                  borderRadius={4}
                  margin="10px 0"
                  padding="30px 25px"
                >
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    width="60px"
                    height="60px"
                    borderRadius={4}
                    fontSize={12}
                    background="linear-gradient(158deg, #3c4897 0%, #1d1e23 100%)"
                  >
                    {/* <Image
                  src="https://bit.ly/dan-abramov"
                  alt="Dan Abramov"
                  width="30px"
                  height="30px"
                /> */}
                    Education
                  </Flex>
                  <Flex width="45%" direction="column" gap="10px">
                    <Box>
                      <Text>{it.school}</Text>
                    </Box>
                    <Flex gap="5px">
                      <Text>
                        {EducationTypes.filter((v) => v.value === it.education)[0]?.label}
                      </Text>
                    </Flex>
                    <Flex gap="5px">
                      <Text>{it.major}</Text>
                    </Flex>
                  </Flex>
                  <Flex minWidth="177px" justifyContent="flex-end" alignItems="flex-start">
                    {it.startTime && dayjs(it.startTime).format('YYYY/MM/DD')}
                    {it.startTime && '-'}
                    {it.endTime && dayjs(it.endTime).format('YYYY/MM/DD')}
                  </Flex>
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
