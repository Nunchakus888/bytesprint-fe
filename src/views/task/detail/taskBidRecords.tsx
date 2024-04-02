import { Avatar, Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { shortAddress } from 'common/utils';
import {
  IPath,
  IStatus,
  RequirementStatus,
  RequirementType,
  TaskBidStatus,
  TaskStatus,
} from 'common/constant';
import styles from './index.module.scss';
import dayjs from 'dayjs';
import { MdKeyboardArrowRight } from 'react-icons/md';
import WalletAvatar from 'components/WalletAvatar';
import { useUserInfo, useUserInfoByUid } from 'hooks/user';
export default function TaskBidRecords(props: {
  from?: IPath;
  recordList: any[];
  taskStatus: IStatus; // 需求状态
  signBid?: (record: any) => void; // 签约TA
  unSignBid?: (recordId: string) => void; // 淘汰TA
  openRecordDetail?: (recordId: string) => void; // 详情
  signLoading?: boolean;
}) {
  const { recordList, taskStatus, signBid, unSignBid, openRecordDetail, from, signLoading } = props;
  const { userInfo } = useUserInfo();
  // 将自己的评估记录置顶
  const myRecordIndex = recordList.findIndex((item) => item.wallet === userInfo?.address);
  if (myRecordIndex > 0) {
    const myRecord = recordList.splice(myRecordIndex, 1);
    recordList.unshift(myRecord[0]);
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      position="relative"
      marginTop="20px"
      paddingBottom="20px"
      minHeight="200px"
      className={styles.container}
    >
      <Text fontSize={18} fontWeight="bold">
        {`Bidding Records：${recordList?.length || 0}`}
      </Text>
      <Box marginTop="30px" width="100%">
        {recordList?.map((it, index) => {
          return (
            <Flex
              key={`${it.id}_${index}`}
              justify="space-between"
              alignItems="center"
              margin="20px 0"
              padding="30px 20px"
              // 自己的记录背景色加深
              background={
                it.wallet === userInfo?.address ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)'
              }
              borderRadius={8}
            >
              <Flex>
                <WalletAvatar value={it.wallet} size={30} />
                {/* <Avatar name='Kola Tioluwani' src='https://bit.ly/tioluwani-kolawole' /> */}
                <Flex direction="column" marginLeft="20px" className="w-20">
                  <Text fontSize={16}>{shortAddress(it?.nickname, 6, 2)}</Text>
                  <Text fontSize={12}>{shortAddress(it?.wallet.toString() || '')}</Text>
                </Flex>
              </Flex>
              <Flex direction="column">
                <Box>
                  <Text fontSize={16} whiteSpace="nowrap" display="flex">
                    Total Cost：{it.totalCost} USDT
                  </Text>
                </Box>
                <Box>
                  <Text fontSize={16} whiteSpace="nowrap" display="flex">
                    Estimated Completion Time：{dayjs(+it.finishTime).format('YYYY/MM/DD')}
                  </Text>
                </Box>
              </Flex>

              <Flex alignItems="center" gap="20px">
                <Link
                  display="flex"
                  alignItems="center"
                  color="#7551FF"
                  fontWeight="bold"
                  onClick={() => openRecordDetail(it)}
                >
                  Details
                  <MdKeyboardArrowRight color="#2350AD" fontSize={14} />
                </Link>
                <Box width="1px" background="#fff" height="40px"></Box>
                {props.from === IPath.MYREQUIREMENT && (
                  <>
                    {/* 淘汰 */}
                    {TaskBidStatus.BID_FAIL === it.signStatus && (
                      <Box width="100px" className={styles.unbid}></Box>
                    )}
                    {/* 中标 */}
                    {TaskBidStatus.BID_SUCCESS === it.signStatus && (
                      <Box width="100px" className={styles.bidsuccess}></Box>
                    )}

                    {/* 待签约 */}
                    {!it.signStatus &&
                      (taskStatus === IStatus.WAIT_SIGN || taskStatus === IStatus.EVALUATION) && (
                        <Box
                          width="100px"
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Button
                            background="#7551FF"
                            size="md"
                            height="30px"
                            borderRadius={4}
                            onClick={() => signBid(it)}
                            isLoading={signLoading}
                          >
                            Sign
                          </Button>
                          <Link
                            color="#7551FF"
                            fontWeight="bold"
                            fontSize={14}
                            marginTop="10px"
                            onClick={() => unSignBid(it)}
                          >
                            Eliminate
                          </Link>
                        </Box>
                      )}
                  </>
                )}

                {props.from === IPath.MYTASKS && (
                  <>
                    {/* 淘汰 */}
                    {TaskBidStatus.BID_FAIL === it.signStatus && (
                      <Box width="100px" className={styles.unbid}></Box>
                    )}
                    {/* 中标 */}
                    {TaskBidStatus.BID_SUCCESS === it.signStatus && (
                      <Box width="100px" className={styles.bidsuccess}></Box>
                    )}

                    {/* 待签约 */}
                    {!it.signStatus && taskStatus === IStatus.WAIT_SIGN && (
                      <Text
                        width="100px"
                        textAlign="center"
                        color="#7551FF"
                        fontWeight="bold"
                        fontSize={16}
                      >
                        Pending Contract
                      </Text>
                    )}
                  </>
                )}
              </Flex>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}
