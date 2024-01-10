import { Box, Button, Code, Container, Flex, Portal, Tag } from '@chakra-ui/react';
import Back from 'components/back';
import FileReviewer from 'components/fileReview';
import Loading from 'components/loading';
import {
  useMyRequirementDetail,
  useMyRequirementDetailStatusAction,
} from 'hooks/myrequirements/detail';
import { useTaskDetail } from 'hooks/task';
import { useTaskPlanList } from 'hooks/task/detai';
import { useUserInfo } from 'hooks/user';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { Identification, IPath, IStatus, TaskBidStatus } from 'common/utils/constant';
import Auth from 'views/task/Auth';
import TaskBaseInfo from 'views/task/detail/taskBaseInfo';
import TaskBidRecords from 'views/task/detail/taskBidRecords';
import TaskDescription from 'views/task/detail/taskDescription';
import TaskEvaluateDetail from 'views/task/detail/taskEvaluateDetail';
import TaskMovement from 'views/task/detail/taskMovement';
import TaskPlanList from 'views/task/detail/taskPlanList';
import TaskSignedReward from 'views/task/detail/taskSignedReward';
import TaskStatusInfo from 'views/task/detail/taskStatusInfo';
import TaskUserInfo from 'views/task/detail/taskUserInfo';
import Evaluate from 'views/task/Evaluate';
import styles from '../index.module.scss';
import Navbar from 'components/navbar/NavbarAdmin';
const TaskDetail = () => {
  const router = useRouter();
  const { id = null } = router.query;
  console.log('TaskDetail>>>, id = null', id);

  // detail
  const { userInfo } = useUserInfo();
  const { data, isLoading, refresh } = useMyRequirementDetail(id, userInfo.address);
  console.log('data>>', data);
  const { identification } = useUserInfo();
  const [isOpenEvaluate, setIsOpenEvaluate] = useState(false);
  const { openTask, closeTask, acceptTask, signBid, unSignBid, openRecordDetail, signLoading } =
    useMyRequirementDetailStatusAction(id);

  const isShowExtendTaskInfo = useMemo(() => {
    if (
      [IStatus.SIGNED, IStatus.CODEING, IStatus.WAIT_ACCEPT, IStatus.COMPLETE].includes(
        data?.taskStatus
      )
    ) {
      return true;
    }
    return false;
  }, [data?.taskStatus]);

  // 任务计划列表
  const { planlist, openRecordDetailId, handleOpenRecordDetail, closeRecordDetail } =
    useTaskPlanList(data, isShowExtendTaskInfo);

  return (
    <>
      <Portal>
        <Box>
          <Navbar
            paths={[
              { path: '#', name: 'Crowdsourcing Management ' },
              { path: `/${IPath.MYREQUIREMENT}`, name: 'My Requirements' },
              { path: '#', name: 'Details' },
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
              <TaskBaseInfo
                from={IPath.MYREQUIREMENT}
                setIsOpenEvaluate={setIsOpenEvaluate}
                data={data?.projectRawInfo}
              />
              {isShowExtendTaskInfo && (
                <TaskPlanList from={IPath.MYREQUIREMENT} planlist={planlist} />
              )}
              <TaskBidRecords
                from={IPath.MYREQUIREMENT}
                recordList={data?.assetRecordList}
                taskStatus={data?.taskStatus}
                signBid={signBid}
                unSignBid={unSignBid}
                signLoading={signLoading}
                openRecordDetail={handleOpenRecordDetail}
              />
              <TaskDescription
                description={data?.projectRawInfo?.description}
                fileList={data?.fileList}
              />
            </Flex>
            <Flex direction="column" basis="20%">
              <TaskStatusInfo
                from={IPath.MYREQUIREMENT}
                taskStatus={data?.taskStatus}
                openTask={openTask}
                closeTask={closeTask}
                acceptTask={acceptTask}
              />
              {(isShowExtendTaskInfo || data?.taskStatus === IStatus.SIGNED) && (
                <TaskSignedReward recordList={data?.assetRecordList} />
              )}
              <TaskUserInfo title="My Information" userInfo={userInfo} />
              {/* TODO 签约水手信息 */}
              {(isShowExtendTaskInfo || data?.taskStatus === IStatus.SIGNED) && (
                <TaskUserInfo title="签约水手信息" userInfo={{ email: '133' }} />
              )}
              <TaskMovement data={data} />
            </Flex>
          </Box>
        )}
        <Auth from={IPath.MYREQUIREMENT} />
      </Box>

      {isOpenEvaluate && (
        <Evaluate
          projectId={id as string}
          isOpen={isOpenEvaluate}
          onClose={() => setIsOpenEvaluate(false)}
          onSuccess={refresh}
        ></Evaluate>
      )}
      {openRecordDetailId && (
        <TaskEvaluateDetail
          from={IPath.MYREQUIREMENT}
          recordId={openRecordDetailId}
          originData={data}
          onClose={closeRecordDetail}
        />
      )}
    </>
  );
};

export default TaskDetail;
