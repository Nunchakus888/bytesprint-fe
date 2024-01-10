import { Avatar, Box, Button, Flex, Link, Tag, Text } from '@chakra-ui/react';
import ModalDialog from 'components/modal';
import { IPath, TaskBidStatus } from 'common/utils/constant';
import styles from './index.module.scss';
import Image from 'next/image';
import { shortAddress } from 'common/utils';
import BYTable from 'components/table';
import { useTaskEvaluateDetail } from 'hooks/task/detai';
import { useMemo } from 'react';
import dayjs from 'dayjs';
export default function TaskEvaluateDetail(props: {
  from: IPath;
  recordId: any;
  onClose: () => void;
  signBid?: (recordId: string) => void; // 签约TA
  unSignBid?: (recordId: string) => void; // 淘汰TA
  originData: any;
}) {
  const { onClose, signBid, unSignBid, recordId: record, from, originData } = props;
  const { data } = useTaskEvaluateDetail(record, originData);

  const columns = [
    {
      title: 'Serial Number',
      dataIndex: 'xuhao',
      width: '50px',
      textAlign: 'center',
      key: 'xuhao',
      render: (_: any, record: any, index: number) => {
        return (
          <Box width="30px" paddingLeft="5px" margin="5px 0" fontSize={14}>
            {index + 1}
          </Box>
        );
      },
    },
    {
      title: 'Task Name',
      dataIndex: 'taskname',
      width: '60%',
      textAlign: 'left',
      key: 'taskname',
      render: (_: any, record: any, index: number) => {
        return (
          <Box paddingLeft="5px" width="60%" margin="5px 0" fontSize={14}>
            {record.taskname}
          </Box>
        );
      },
    },
    {
      title: 'Cost（USDT）',
      dataIndex: 'usdt',
      key: 'usdt',
      render: (_: any, record: any, index: number) => {
        return (
          <Box margin="5px 0" fontSize={14}>
            {record.usdt}
          </Box>
        );
      },
    },
    // {
    //   title: '价值(CNY)',
    // 	dataIndex: 'cny',
    // 	key: 'cny',
    //   render: (_:any, record:any, index: number) => {
    //     return (
    //       <Box margin="5px 0" fontSize={14}>{record.cny}</Box>
    //     )
    //   },
    // }
  ];

  const totalUsdt = useMemo(() => {
    return data.list.reduce((pre: number, cur: any) => {
      return pre + +cur.usdt;
    }, 0);
  }, [data]);
  // const totalCnys = useMemo(() => {
  //   return data.list.reduce((pre: number, cur:any) => {
  //     return pre + +cur.cny
  //   }, 0)
  // }, [data])

  return (
    <ModalDialog title="评估详情" onClose={onClose} isOpen={true} btnGroup={<></>}>
      <Flex justifyContent="space-between">
        <Flex justifyContent="space-between" gap="30px" alignItems="flex-start">
          {/* <WalletAvatar value={it.wallet} size={30}/> */}
          {/* <Avatar name='Kola Tioluwani' src='https://bit.ly/tioluwani-kolawole' /> */}
          <Flex justifyContent="space-between" direction="column">
            <Tag fontSize={16} padding="10px" borderRadius={4} className={styles.userIcon}>
              Java开发工程师
            </Tag>
            <Flex marginTop="20px" direction="column">
              <Text fontSize={16}>{record.uid}</Text>
              <Text marginTop="10px" fontSize={12}>
                {shortAddress(record?.wallet.toString() || '')}
              </Text>
            </Flex>
          </Flex>
          {/* TODO 缺身份标识 */}
          <Flex>
            <Tag fontSize={16} padding="10px" className={styles.engineer}>
              Tasker
            </Tag>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" gap="50px" alignItems="flex-start">
          {/* 来自需求，且当前记录无状态，需要进行签约/ 淘汰 */}
          {!record.signStatus && from === IPath.MYREQUIREMENT && (
            <>
              <Link
                color="#7551FF"
                fontWeight="bold"
                fontSize={14}
                marginTop="10px"
                onClick={() => unSignBid(record)}
              >
                淘汰TA
              </Link>
              <Button
                background="#7551FF"
                size="md"
                width="120px"
                borderRadius={4}
                onClick={() => signBid(record)}
              >
                签约TA
              </Button>
            </>
          )}
          {record.signStatus && (
            <>
              {/* 淘汰 */}
              {TaskBidStatus.BID_FAIL === record.signStatus && (
                <Box width="100px" className={styles.unbid}></Box>
              )}
              {/* 中标 */}
              {TaskBidStatus.BID_SUCCESS === record.signStatus && (
                <Box width="100px" className={styles.bidsuccess}></Box>
              )}
            </>
          )}
        </Flex>
      </Flex>
      <Box marginTop="20px" background="rgba(255,255,255,0.05)" borderRadius={8}>
        <BYTable columns={columns} dataSource={data.list}></BYTable>
        <Flex marginTop="30px" padding="20px" justifyContent="space-around">
          <Text textAlign="left" fontSize="lg" width="40%">
            报酬合计
          </Text>
          <Text color="#7551FF" fontSize="20px" fontWeight="bold">
            {totalUsdt} USDT
          </Text>
          {/* <Text color="#7551FF" fontSize="20px" fontWeight="bold">{totalCnys} CNY</Text> */}
        </Flex>
      </Box>
      <Flex justifyContent="flex-start" margin="20px 0">
        <Text fontSize="lg">Estimated Completion Time: </Text>
        <Text color="#7551FF" marginLeft="10px">
          {dayjs(data.complateTime).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
      </Flex>
    </ModalDialog>
  );
}
