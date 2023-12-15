import { Avatar, Box, Button, Flex, Link, Text } from "@chakra-ui/react"
import { useCallback, useMemo } from "react"
import { shortAddress } from "utils"
import { IPath, IStatus, RequirementStatus, RequirementType, TaskBidStatus, TaskStatus } from "utils/constant"
import styles from './index.module.scss'
import dayjs from 'dayjs'
import { MdKeyboardArrowRight } from "react-icons/md";
export default function TaskBidRecords(props: {
  from?: IPath
  recordList: {bidStatus: TaskBidStatus, [key: string]: string}[]
  taskStatus: IStatus  // 需求状态
  signBid?: (recordId: string) => void // 签约TA
  unSignBid?: (recordId: string) => void // 淘汰TA
  openRecordDetail ?: (recordId: string) => void  // 详情
}) {
  const { recordList,taskStatus, signBid, unSignBid, openRecordDetail, from } = props


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
        {from === IPath.MYTASKS && taskStatus === IStatus.WAIT_SIGN ? `我的投标:` : `投标记录：${recordList.length}`}
      </Text>
      <Box marginTop="30px"  width="100%">
        {recordList.map((it,index) => {
          return (
            <Flex key={`${it.id}_${index}`} justify="space-between" alignItems="center" margin="20px 0" padding="30px 20px"  background="rgba(255,255,255,0.03)" borderRadius={8}>
              <Flex>
                <Avatar name='Kola Tioluwani' src='https://bit.ly/tioluwani-kolawole' />
                <Flex direction="column" marginLeft="20px">
                  <Text fontSize={16} >用户昵称A</Text>
                  <Text fontSize={12} >{shortAddress('0xA8f6eEe0bC6b6cDB9eDE7B96b3c13f4BD6502C62')}</Text>
                </Flex>
              </Flex>
              <Box>
                <Text fontSize={16} whiteSpace="nowrap" display="flex">费用合计：1000.00 USDT</Text>
              </Box>
              <Box>
                <Text fontSize={16} whiteSpace="nowrap" display="flex">预计完成时间：{dayjs(Date.now()).format('YYYY/MM/DD')}</Text>
              </Box>

              <Flex alignItems="center" gap="20px">
                <Link display="flex" alignItems="center" color="#7551FF" fontWeight="bold" onClick={() => openRecordDetail(it.id)}>详情<MdKeyboardArrowRight color="#2350AD" fontSize={14}/></Link>
                <Box width="1px" background="#fff" height="40px"></Box>
                {
                  props.from === IPath.MYREQUIREMENT && (
                    <>
                    {/* 淘汰 */}
                    {TaskBidStatus.BID_FAIL === it.bidStatus && <Box width="100px" className={styles.unbid}></Box>}
                    {/* 中标 */}
                    {TaskBidStatus.BID_SUCCESS === it.bidStatus && <Box width="100px" className={styles.bidsuccess}></Box>}

                    {/* 待签约 */}
                    {!it.bidStatus && taskStatus === IStatus.WAIT_SIGN && <Box width="100px" display="flex" flexDirection="column" alignItems="center">
                      <Button background="#7551FF" size="md" height="30px" borderRadius={4} onClick={() => signBid(it.id)}>签约TA</Button>
                      <Link color="#7551FF" fontWeight="bold" fontSize={14} marginTop="10px" onClick={() => unSignBid(it.id)}>淘汰TA</Link>
                    </Box>}
                    </>
                  )
                }

                {
                  props.from === IPath.MYTASKS && (
                    <>
                      {/* 淘汰 */}
                      {TaskBidStatus.BID_FAIL === it.bidStatus && <Box width="100px" className={styles.unbid}></Box>}
                      {/* 中标 */}
                      {TaskBidStatus.BID_SUCCESS === it.bidStatus && <Box width="100px" className={styles.bidsuccess}></Box>}

                      {/* 待签约 */}
                      {!it.bidStatus && taskStatus === IStatus.WAIT_SIGN && <Text width="100px" textAlign="center" color="#7551FF" fontWeight="bold" fontSize={16}>待签约</Text>}
                    </>
                  )
                }
                
              </Flex>
            </Flex>
          )
        })}
      </Box>
    </Box>
  )
}