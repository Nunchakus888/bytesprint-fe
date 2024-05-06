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
import { useUserInfo, useUserInfoByUid } from 'hooks/user';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { Identification, IPath, IStatus, TaskBidStatus } from 'common/constant';
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
import Navbar from 'components/navbar/Navbar';
import { useAccount } from 'wagmi';
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
  const {
    openTask,
    closeTask,
    acceptTask,
    signBid,
    unSignBid,
    openRecordDetail,
    buttonLoading,
    signLoading,
    clickSignItem,
  } = useMyRequirementDetailStatusAction(id);

  // 中标记录
  const signEdRecord = useMemo(() => {
    const bidSuc = data?.assetRecordList?.filter(
      (it: any) => it.signStatus === TaskBidStatus.BID_SUCCESS
    );
    if (bidSuc?.length) {
      return bidSuc[0];
    }
  }, [data]);

  // 获取中标人的信息
  const { userInfoForUid } = useUserInfoByUid(signEdRecord?.uid);

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
  const account = useAccount();
  return (
    <>
      <Box>
        <Navbar
          paths={[
            {
              name: 'Crowdsourcing Management ',
              onClick: () => {
                router.push('/');
              },
            },
            {
              name: 'My Requirements',
              onClick: () => {
                router.push(`/${IPath.MYREQUIREMENT}`);
              },
            },
            { name: 'Details' },
          ]}
        />
      </Box>
      <Box
        pt={{ base: '130px', md: '80px', xl: '80px' }}
        className={identification === Identification.VISITOR ? styles.visitor : ''}
      >
        <Back />
        {!data ? (
          <Loading />
        ) : (
          <Box display="flex" gap="20px">
            <Flex direction="column" width="900px">
              <TaskBaseInfo
                from={IPath.MYREQUIREMENT}
                setIsOpenEvaluate={setIsOpenEvaluate}
                data={data?.projectRawInfo}
              />
              {isShowExtendTaskInfo && IStatus.SIGNED !== data?.taskStatus && (
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
                clickSignItem={clickSignItem}
              />
              <TaskDescription
                description={data?.projectRawInfo?.description}
                fileList={data?.fileList}
              />
            </Flex>
            <Flex direction="column">
              <TaskStatusInfo
                from={IPath.MYREQUIREMENT}
                taskStatus={data?.taskStatus}
                openTask={openTask}
                closeTask={closeTask}
                acceptTask={acceptTask}
                buttonLoading={buttonLoading}
              />
              {(isShowExtendTaskInfo || data?.taskStatus === IStatus.SIGNED) && (
                <TaskSignedReward recordList={data?.assetRecordList} />
              )}
              <TaskUserInfo
                title="My Information"
                userInfo={{
                  data: {
                    engineer: {
                      phone: data.projectRawInfo.contactPhone,
                      email: data.projectRawInfo.contactEmail,
                    },
                    nickname: userInfo?.data?.nickname,
                  },
                  address: userInfo.address,
                }}
              />
              {/* TODO 签约水手信息 */}
              {(isShowExtendTaskInfo || data?.taskStatus === IStatus.SIGNED) && (
                <TaskUserInfo title="Signed Sailor Information" userInfo={userInfoForUid} />
              )}
              <TaskMovement data={data} />
            </Flex>
          </Box>
        )}
        {account?.address && <Auth from={IPath.MYREQUIREMENT} />}
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
          signBid={signBid}
          unSignBid={unSignBid}
          signLoading={signLoading}
        />
      )}
    </>
  );
};

export default TaskDetail;
