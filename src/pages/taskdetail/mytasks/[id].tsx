import { Box, Button, Code, Container, Flex, Portal, Tag } from '@chakra-ui/react';
import Back from 'components/back';
import FileReviewer from 'components/fileReview';
import Loading from 'components/loading';
import { useMyTaskDetail, useMyTaskDetailStatusAction } from 'hooks/mytasks/detail';
import { useTaskDetail } from 'hooks/task';
import { useTaskPlanList } from 'hooks/task/detai';
import { useUserInfo } from 'hooks/user';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Identification, IPath, IStatus, TaskBidStatus } from 'common/utils/constant';
import Auth from 'views/task/Auth';
import TaskBaseInfo from 'views/task/detail/taskBaseInfo';
import TaskBidRecords from 'views/task/detail/taskBidRecords';
import TaskDescription from 'views/task/detail/taskDescription';
import TaskEvaluateDetail from 'views/task/detail/taskEvaluateDetail';
import TaskMovement from 'views/task/detail/taskMovement';
import TaskPlanList from 'views/task/detail/taskPlanList';
import TaskSchedule from 'views/task/detail/taskSchedule';
import TaskSignedReward from 'views/task/detail/taskSignedReward';
import TaskStatusInfo from 'views/task/detail/taskStatusInfo';
import TaskUserInfo from 'views/task/detail/taskUserInfo';
import Evaluate from 'views/task/Evaluate';
import styles from '../index.module.scss';
import Navbar from 'components/navbar/NavbarAdmin';

const TaskDetail = () => {
  const router = useRouter();
  const { id = null } = router.query;
  console.log('TaskDetail>>>');

  // detail
  const { identification, userInfo } = useUserInfo();
  const { data, isLoading } = useMyTaskDetail(id, userInfo.address);
  const { scheduleTask, submitAccept, withdrawMyRewards } = useMyTaskDetailStatusAction(id);
  // 打开任务排期
  const [openschedule, setSchedule] = useState(false);
  const [scheduledata, setScheduledata] = useState([]);
  useEffect(() => {
    if (openschedule) {
      let data_ = [];
      const bidSuc = data?.assetRecordList.filter(
        (it: any) => it.wallet === userInfo.address && it.signStatus === TaskBidStatus.BID_SUCCESS
      );
      console.log('bidSuc>>>', bidSuc, userInfo.address);
      if (bidSuc?.length) {
        // const rids = bidSuc[0].requirementAssociation?.map((it:any) => it.requirementId)
        // console.log("rids>>>", rids)
        // const list = data?.requirementList.filter((it:any) => rids.includes(it.requirementId))
        const list = bidSuc[0]?.requirementAssociation;
        console.log('list>>>', list);
        data_ = list.map((it: any) => {
          return {
            taskname: it.requirementName,
            usdt: it.requirementCost,
            id: it.requirementId,
          };
        });
      }
      console.log('data_>>>', data_);
      setScheduledata(data_);
    }
  }, [openschedule, data, userInfo]);

  const isShowExtendTaskInfo = useMemo(() => {
    console.log('data?.taskStatus>>>>', data?.taskStatus);
    if (
      [IStatus.CODEING, IStatus.WAIT_ACCEPT, IStatus.COMPLETE].includes(data?.taskStatus.toString())
    ) {
      return true;
    }
    return false;
  }, [data?.taskStatus]);
  // 任务计划列表
  const { planlist, openRecordDetailId, handleOpenRecordDetail, closeRecordDetail } =
    useTaskPlanList(data, isShowExtendTaskInfo);
  const { completePlanItem } = useMyTaskDetailStatusAction(id);
  // 完成任务计划
  const completePlan = async (planId: string) => {
    await completePlanItem(planId);
    window.location.reload();
  };

  return (
    <>
      <Portal>
        <Box>
          <Navbar
            paths={[
              { path: '#', name: 'Crowdsourcing Management ' },
              { path: `/${IPath.MYTASKS}`, name: 'My Task' },
              { path: '#', name: 'Task Details' },
            ]}
          />
        </Box>
      </Portal>
      <Box
        pt={{ base: '130px', md: '80px', xl: '80px' }}
        className={identification === Identification.VISITOR ? styles.visitor : ''}
      >
        <Back />
        {!data ? (
          <Loading />
        ) : (
          <Box display="flex" gap="20px">
            <Flex direction="column" basis="80%">
              <TaskBaseInfo from={IPath.MYTASKS} data={data?.projectRawInfo} />
              {isShowExtendTaskInfo && (
                <TaskPlanList
                  from={IPath.MYTASKS}
                  completePlan={completePlan}
                  data={data}
                  address={userInfo.address}
                  planlist={planlist}
                />
              )}
              <TaskBidRecords
                from={IPath.MYTASKS}
                recordList={data?.assetRecordList}
                taskStatus={data?.taskStatus}
                openRecordDetail={handleOpenRecordDetail}
              />
              <TaskDescription
                description={data?.projectRawInfo?.description}
                fileList={data?.fileList}
              />
            </Flex>
            <Flex direction="column" basis="20%">
              <TaskStatusInfo
                from={IPath.MYTASKS}
                taskStatus={data.taskStatus}
                scheduleTask={() => setSchedule(true)}
                submitAccept={submitAccept}
                withdrawMyRewards={withdrawMyRewards}
              />
              {/* TODO 待获取 */}
              {data.taskStatus !== IStatus.WAIT_SIGN && (
                <TaskSignedReward totalUsdt={'1000.00'} completeTime={1702545889368} />
              )}
              {/* TODO 待获取 */}
              <TaskUserInfo title="My Information" userInfo={{}} />
              <TaskMovement data={data} />
            </Flex>
          </Box>
        )}
        <Auth from={IPath.TASKS} />
        {openschedule && scheduledata.length && (
          <TaskSchedule
            onClose={() => setSchedule(false)}
            taskId={id as string}
            scheduleTask={scheduleTask}
            startTask={() => {}}
            scheduledata={scheduledata}
          />
        )}
        {openRecordDetailId && (
          <TaskEvaluateDetail
            from={IPath.MYTASKS}
            recordId={openRecordDetailId}
            originData={data}
            onClose={closeRecordDetail}
          />
        )}
      </Box>
    </>
  );
};

export default TaskDetail;
