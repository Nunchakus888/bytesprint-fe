import { Box, Text, Flex, Image, Tag, Link } from '@chakra-ui/react';
import classNames from 'classnames';
import styles from './index.module.scss';

export default function UserAttachedResume(props: { data: any }) {
  // test
  // const res = {
  //   address: 'Algeria, Eckerö',
  //   phone: '+86234234',
  //   email: '997785798@qq.com',
  //   // @ts-ignore
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
  // };
  // const data = {
  //   data: {
  //     engineer: res,
  //   },
  // };

  const { data } = props;
  const certificate = data?.data?.engineer?.certificateList?.[0] || {};

  return (
    <>
      {certificate?.name && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          position="relative"
          marginTop="20px"
          paddingBottom="20px"
          className={styles.container}
          width="400px"
          height="200px"
        >
          <Text fontSize={18} fontWeight="bold">
            My resume
          </Text>
          <Flex
            direction="column"
            justifyContent="center"
            margin="20px 0"
            width="100%"
            padding="20px 10px"
            background="rgba(255,255,255,0.06)"
            onClick={() => {
              window.open(certificate.path, '_blank');
            }}
            gap="10px"
            borderRadius="4px"
          >
            <Box className={classNames(styles.file, styles.textOverflow)} fontWeight="bold">
              {certificate.name}
            </Box>
            <Text color="#7551FF" className="cursor-pointer">
              Read more
            </Text>
          </Flex>
        </Box>
      )}
    </>
  );
}
