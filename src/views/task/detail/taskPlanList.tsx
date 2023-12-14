import { ISchedule } from "hooks/mytasks/schedule";
import { Avatar, Box, Button, Flex, Link, Text } from "@chakra-ui/react"
import { IPath } from "utils/constant"
import styles from './index.module.scss'
import BYTable from "components/table";
import dayjs from "dayjs";
import { IPlanItem } from "hooks/task/detai";

enum EPlanStatus {
  NO_START=`未开始`,
  DONE=`已完成`
}

export default function TaskPlanList(props: {
  from: IPath,
  planlist: IPlanItem[],
  completePlan?: (id: string) => void
}) {
  const {from, planlist, completePlan} = props

  // 我的任务有完成操作
  const Action = {
    title: '操作',
    dataIndex: 'id',
    key: 'id',
    render: (_:any, record:IPlanItem, index: number) => {
      return (
        <Box margin="5px 0" fontSize={14}>
          {record.completeStatus ? <Box color="#7551FF" opacity="0.6">完成</Box>:<Link color="#7551FF" onClick={() => completePlan(record.id)}>完成</Link>}
        </Box>
      )
    },
  }
  const columns = [
    {
      title: '序号',
			dataIndex: 'xuhao',
			key: 'xuhao',
      render: (_:any, record:any, index:number) => {
				return <Box paddingLeft="5px" margin="5px 0" fontSize={14}>{index+1}</Box>
			},
    },
    {
      title: '任务名称',
			dataIndex: 'taskname',
			key: 'taskname',
      render: (_:any, record:IPlanItem, index:number) => {
				return <Box paddingLeft="5px" margin="5px 0" fontSize={14}>{record.taskname}</Box>
			},
    },
    {
      title: '预计工时(H)',
			dataIndex: 'workhours',
			key: 'workhours',
      render: (_:any, record:IPlanItem, index: number) => {
        return (
          <Box margin="5px 0" fontSize={14}>{record.workhours || '-'}</Box>
        )
      },
    },
    {
      title: '预计开始时间',
			dataIndex: 'startTime',
			key: 'startTime',
      render: (_:any, record:IPlanItem, index: number) => {
        return (
          <Box margin="5px 0" textAlign="center" fontSize={14}>{record.startTime ? dayjs(record.startTime).format('YYYY-MM-DD') : '-'}</Box>
        )
      },
    },
    {
      title: '预计完成时间',
			dataIndex: 'endTime',
			key: 'endTime',
      render: (_:any, record:IPlanItem, index: number) => {
        return (
          <Box margin="5px 0" textAlign="center" fontSize={14}>{record.endTime ? dayjs(record.endTime).format('YYYY-MM-DD') : '-'}</Box>
        )
      },
    },
    {
      title: '实际完成时间',
			dataIndex: 'actualEndTime',
			key: 'actualEndTime',
      render: (_:any, record:IPlanItem, index: number) => {
        return (
          <Box margin="5px 0" textAlign="center" fontSize={14}>{record.actualCompleteTime ? dayjs(record.actualCompleteTime).format('YYYY-MM-DD') : '-'}</Box>
        )
      },
    },
    {
      title: '状态',
			dataIndex: 'completeStatus',
			key: 'completeStatus',
      render: (_:any, record:IPlanItem, index: number) => {
        return (
          <Box margin="5px 0" fontSize={14}>{!record.completeStatus ? EPlanStatus.NO_START : EPlanStatus.DONE}</Box>
        )
      },
    },
    from === IPath.MYTASKS && (Action)
  ]

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
      <Text fontSize={18} fontWeight="bold">任务计划</Text>
      <BYTable columns={columns} dataSource={planlist}></BYTable>
    </Box>
  )
}