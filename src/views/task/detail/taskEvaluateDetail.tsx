import { Avatar, Box, Button, Flex, Link, Tag, Text } from "@chakra-ui/react"
import ModalDialog from "components/modal"
import { IPath, TaskBidStatus } from "utils/constant"
import styles from './index.module.scss'
import Image from 'next/image'
import { shortAddress } from "utils"
import BYTable from "components/table"
import { useTaskEvaluateDetail } from "hooks/task/detai"
import { useMemo } from "react"
import dayjs from "dayjs"
export default function TaskEvaluateDetail(props: {
  from: IPath,
  recordId: string
  onClose: () => void,
  signBid?: (recordId: string) => void // 签约TA
  unSignBid?: (recordId: string) => void // 淘汰TA
}) {
  const {onClose, signBid, unSignBid, recordId, from} = props
  const {data} = useTaskEvaluateDetail(recordId)
  const columns = [
    {
      title: '序号',
			dataIndex: 'xuhao',
			key: 'xuhao',
      render: (_:any, record:any, index:number) => {
				return <Box width="30px" paddingLeft="5px" margin="5px 0" fontSize={14}>{index+1}</Box>
			},
    },
    {
      title: '任务名称',
			dataIndex: 'taskname',
			key: 'taskname',
      render: (_:any, record:any, index:number) => {
				return <Box paddingLeft="5px" margin="5px 0" fontSize={14}>{record.taskname}</Box>
			},
    },
    {
      title: '费用（USDT）',
			dataIndex: 'usdt',
			key: 'usdt',
      render: (_:any, record:any, index: number) => {
        return (
          <Box margin="5px 0" fontSize={14}>{record.usdt}</Box>
        )
      },
    },
    {
      title: '价值(CNY)',
			dataIndex: 'cny',
			key: 'cny',
      render: (_:any, record:any, index: number) => {
        return (
          <Box margin="5px 0" fontSize={14}>{record.cny}</Box>
        )
      },
    }
  ]

  const totalUsdt = useMemo(() => {
    return data.list.reduce((pre: number, cur:any) => {
      return pre + +cur.usdt
    }, 0)
  }, [data])
  const totalCnys = useMemo(() => {
    return data.list.reduce((pre: number, cur:any) => {
      return pre + +cur.cny
    }, 0)
  }, [data])

  return (
    <ModalDialog 
      title="评估详情"
      onClose={onClose}
      isOpen={true}
      btnGroup={<></>}
    >
      <Flex justifyContent="space-between">
        <Flex justifyContent="space-between" gap="30px" alignItems="flex-start">
          <Avatar name='Kola Tioluwani' src='https://bit.ly/tioluwani-kolawole' />
          <Flex justifyContent="space-between" direction="column">
            <Tag fontSize={16} padding="10px" borderRadius={4} className={styles.userIcon}>Java开发工程师</Tag>
            <Flex marginTop="20px" direction="column">
              <Text fontSize={16} >用户昵称A</Text>
              <Text marginTop="10px" fontSize={12} >{shortAddress('0xA8f6eEe0bC6b6cDB9eDE7B96b3c13f4BD6502C62')}</Text>
            </Flex>
          </Flex>
          <Flex><Tag fontSize={16} padding="10px" className={styles.engineer}>水手</Tag></Flex>
        </Flex>
        <Flex justifyContent="space-between" gap="50px" alignItems="flex-start">
        {/* 来自需求，且当前记录无状态，需要进行签约/ 淘汰 */}
        {!data.status && from === IPath.MYREQUIREMENT && 
          <>
          <Link color="#7551FF" fontWeight="bold" fontSize={14} marginTop="10px" onClick={() => unSignBid(recordId)}>淘汰TA</Link>
          <Button background="#7551FF" size="md" width="120px" borderRadius={4} onClick={() => signBid(recordId)}>签约TA</Button>              
          </>
        }
        {
          data.status && <>
            {/* 淘汰 */}
            {TaskBidStatus.BID_FAIL === data.status && <Box width="100px" className={styles.unbid}></Box>}
            {/* 中标 */}
            {TaskBidStatus.BID_SUCCESS === data.status && <Box width="100px" className={styles.bidsuccess}></Box>}

          </>
        }
        </Flex>
      </Flex>
      <Box marginTop="20px" background="rgba(255,255,255,0.05)" borderRadius={8}>
        <BYTable columns={columns} dataSource={data.list}></BYTable>
        <Flex marginTop="30px" padding="20px" justifyContent="space-between">
          <Text textAlign="left" fontSize='lg' width="50%">报酬合计</Text>
          <Text color="#7551FF" fontSize="20px" fontWeight="bold">{totalUsdt} USDT</Text>
          <Text color="#7551FF" fontSize="20px" fontWeight="bold">{totalCnys} CNY</Text>
        </Flex>
      </Box>
      <Flex justifyContent="flex-start" margin="20px 0"><Text fontSize='lg'>预计完成时间: </Text><Text color="#7551FF" marginLeft="10px">{dayjs(data.complateTime).format('YYYY-MM-DD HH:mm:ss')}</Text></Flex>
    </ModalDialog>
  )
}