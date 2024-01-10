import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import styles from './index.module.scss';
import dayjs from 'dayjs';
import { IStatus, RequirementStatus, TaskStatus } from 'common/utils/constant';
export default function TaskMovement(props: { data: any }) {
  const { data } = props;
  // 需求动态
  const originstatusTime = data?.projectRawInfo.statusTime;
  let statusRes: number[] = [];
  let statusTimeRes: number[] = [];
  originstatusTime?.map((s: string) => {
    const arr = s.split(':');
    const status = arr[0];
    const time = arr[1];
    statusRes.push(+status);
    statusTimeRes.push(Number(time));
  });
  statusRes.unshift(IStatus.PUBLISHED);
  statusTimeRes.unshift(statusTimeRes[0]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      position="relative"
      marginTop="20px"
      width="300px"
      paddingBottom="20px"
      className={styles.container}
    >
      <Text fontSize={18} fontWeight="bold">
        Requirement Updates
      </Text>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <Flex direction="column" height="100%" justifyContent="space-around">
          {statusTimeRes.reverse().map((it: any, index: number) => {
            const t = dayjs(it).format('HH:mm');
            const date = dayjs(it).format('YYYY/MM/DD');
            return (
              <Box
                marginTop="30px"
                key={it}
                className={styles.movementTime}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Text fontSize={16}>{t}</Text>
                <Text fontSize={12}>{date}</Text>
              </Box>
            );
          })}
        </Flex>

        <Flex
          direction="column"
          height="100%"
          justifyContent="space-around"
          className={styles.bubles}
        >
          {/* <Box display="flex" justifyItems="center" width="1px" height="100%"><Box className={styles.line}></Box></Box> */}
          <Box className={styles.line} overflow="hidden"></Box>
          {statusRes.map((it: any, index: number) => {
            return (
              <Box marginTop="30px" key={`${it}_buble_${index}}`} className={styles.buble}></Box>
            );
          })}
        </Flex>

        <Flex direction="column" height="100%" justifyContent="space-around">
          {statusRes.reverse().map((it: any) => {
            return (
              <Box display="flex" alignItems="center" marginTop="30px" key={`${it}`}>
                {/* @ts-ignore */}
                <Text>{[...RequirementStatus].filter((ts) => ts.value === it)[0]?.label}</Text>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}
