import { ISchedule } from 'hooks/mytasks/schedule';
import { Avatar, Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import { IPath, TaskBidStatus } from 'common/constant';
import styles from './index.module.scss';
import BYTable from 'components/table';
import dayjs from 'dayjs';
import { IPlanItem } from 'hooks/task/detai';
import { useMemo } from 'react';

enum EPlanStatus {
  NO_START = `Not Started`,
  DONE = `Completed`,
}

export default function TaskPlanList(props: {
  from: IPath;
  data?: any;
  completePlan?: (id: string) => void;
  address?: string;
  planlist: any[];
}) {
  const { from, data, completePlan, address, planlist } = props;

  // 放在别处
  // const planlist = useMemo(() => {
  //   let data_ = []
  //   const bidSuc = data?.assetRecordList.filter((it:any) => it.wallet === address && it.signStatus === TaskBidStatus.BID_SUCCESS)
  //   console.log("bidSuc>>>", bidSuc)
  //   if (bidSuc?.length) {
  //     const rids = bidSuc[0].requirementAssociation?.map((it:any) => it.requirementId)
  //     console.log("rids>>>", rids)
  //     const list = data?.requirementList.filter((it:any) => rids.includes(it.requirementId))
  //     console.log("list>>>", list)
  //     data_ = list?.map((it:any) => {
  //       return {
  //         "taskname": it.requirementName,
  //         "usdt": it.requirementCost,
  //         "startTime": it.requirementPlan.expectedstartTime,
  //         "endTime": it.requirementPlan.expectedFinishTime,
  //         "workhours": it.requirementPlan.expectedWorkTime,
  //         "actualCompleteTime": it.requirementPlan.actualFinishTime,
  //         "completeStatus": it.requirementPlan.requirementStatus,
  //         "id":it.requirementId
  //       }
  //     })
  //   }
  //   console.log("data_>>>", data_)
  //   return data_
  // }, [data])

  // My Task有完成操作
  const Action = {
    title: 'Operation',
    dataIndex: 'id',
    key: 'id',
    render: (_: any, record: IPlanItem, index: number) => {
      return (
        <Box margin="5px 0" fontSize={14}>
          {record.completeStatus ? (
            <Box color="#7551FF" opacity="0.6">
              Completed
            </Box>
          ) : (
            <Link color="#7551FF" onClick={() => completePlan(record.id)}>
              Completed
            </Link>
          )}
        </Box>
      );
    },
  };
  const columns = [
    {
      title: 'Serial Number',
      dataIndex: 'xuhao',
      key: 'xuhao',
      render: (_: any, record: any, index: number) => {
        return (
          <Box paddingLeft="5px" margin="5px 0" fontSize={14}>
            {index + 1}
          </Box>
        );
      },
    },
    {
      title: 'Task Name',
      dataIndex: 'taskname',
      key: 'taskname',
      render: (_: any, record: IPlanItem, index: number) => {
        return (
          <Box paddingLeft="5px" margin="5px 0" fontSize={14}>
            {record.taskname}
          </Box>
        );
      },
    },
    {
      title: 'Estimated Hours(H)',
      dataIndex: 'workhours',
      key: 'workhours',
      render: (_: any, record: IPlanItem, index: number) => {
        return (
          <Box margin="5px 0" fontSize={14}>
            {record.workhours || '-'}
          </Box>
        );
      },
    },
    {
      title: 'Estimated Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (_: any, record: IPlanItem, index: number) => {
        return (
          <Box margin="5px 0" textAlign="center" fontSize={14}>
            {record.startTime ? dayjs(record.startTime).format('YYYY-MM-DD') : '-'}
          </Box>
        );
      },
    },
    {
      title: 'Estimated Completion Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (_: any, record: IPlanItem, index: number) => {
        return (
          <Box margin="5px 0" textAlign="center" fontSize={14}>
            {record.endTime ? dayjs(record.endTime).format('YYYY-MM-DD') : '-'}
          </Box>
        );
      },
    },
    {
      title: 'Actual Completion Time',
      dataIndex: 'actualEndTime',
      key: 'actualEndTime',
      render: (_: any, record: IPlanItem, index: number) => {
        return (
          <Box margin="5px 0" textAlign="center" fontSize={14}>
            {record.actualCompleteTime
              ? dayjs(record.actualCompleteTime).format('YYYY-MM-DD')
              : '-'}
          </Box>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'completeStatus',
      key: 'completeStatus',
      render: (_: any, record: IPlanItem, index: number) => {
        return (
          <Box margin="5px 0" fontSize={14}>
            {!record.completeStatus ? EPlanStatus.NO_START : EPlanStatus.DONE}
          </Box>
        );
      },
    },
    from === IPath.MYTASKS && Action,
  ];

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
        Task Schedule
      </Text>
      <BYTable columns={columns} dataSource={planlist}></BYTable>
    </Box>
  );
}
