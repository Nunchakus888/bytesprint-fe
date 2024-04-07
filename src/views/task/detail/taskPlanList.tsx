import { ISchedule } from 'hooks/mytasks/schedule';
import { Avatar, Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import { IPath, TaskBidStatus } from 'common/constant';
import styles from './index.module.scss';
import BYTable from 'components/table';
import dayjs from 'dayjs';
import { IPlanItem } from 'hooks/task/detai';
import { useMemo, useRef, useState } from 'react';
import ModalDialog from 'components/modal';

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
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  // 再次确认
  const confirmRef = useRef({
    content: '',
    onSure: () => {},
  });
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
            <Link
              color="#7551FF"
              onClick={() => {
                setIsOpenConfirm(true);
                confirmRef.current.content = `Are you sure you have completed the schedule?`;
                confirmRef.current.onSure = () => {
                  setIsOpenConfirm(false);
                  completePlan(record.id);
                };
              }}
            >
              Completed
            </Link>
          )}
        </Box>
      );
    },
  };
  const columns = [
    {
      title: '',
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
      title: 'Estimated Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (_: any, record: IPlanItem, index: number) => {
        return (
          <Box margin="5px 0" textAlign="center" fontSize={14}>
            {record.startTime ? dayjs(record.startTime).format('YYYY/MM/DD') : '-'} ~
            {record.endTime ? dayjs(record.endTime).format('YYYY/MM/DD') : '-'}
          </Box>
        );
      },
    },
    // {
    //   title: 'Estimated Completion Time',
    //   dataIndex: 'endTime',
    //   key: 'endTime',
    //   render: (_: any, record: IPlanItem, index: number) => {
    //     return (
    //       <Box margin="5px 0" textAlign="center" fontSize={14}>
    //        {record.endTime ? dayjs(record.endTime).format('YYYY/MM/DD') : '-'}
    //       </Box>
    //     );
    //   },
    // },
    {
      title: 'Actual Completion Time',
      dataIndex: 'actualEndTime',
      key: 'actualEndTime',
      render: (_: any, record: IPlanItem, index: number) => {
        return (
          <Box margin="5px 0" textAlign="center" fontSize={14}>
            {record.actualCompleteTime
              ? dayjs(record.actualCompleteTime).format('YYYY/MM/DD')
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

      {isOpenConfirm && (
        <ModalDialog
          title="Confirm"
          isOpen={isOpenConfirm}
          onClose={() => {
            setIsOpenConfirm(false);
          }}
          onSure={confirmRef.current.onSure}
          width="400px"
        >
          <Box>{confirmRef.current.content}</Box>
        </ModalDialog>
      )}
    </Box>
  );
}
