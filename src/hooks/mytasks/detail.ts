import { useToast } from '@chakra-ui/react';
import API_ROUTERS from 'api';
import dayjs from 'dayjs';
import { useUserInfo } from 'hooks/user';
import { useEffect, useState } from 'react';
import { Get, Post } from 'common/utils/axios';
import { IStatus, TaskBidStatus } from 'common/constant';
import { useAccount, useConnect } from 'wagmi';
import { startTask, submitTask } from 'common/contract/lib/bytd';

// detail status operator
export const useMyTaskDetailStatusAction = (id: string | string[], myrecordId: string) => {
  const { userInfo } = useUserInfo();
  const toast = useToast();
  const account = useAccount();
  const { connect } = useConnect();
  // 任务排期
  const scheduleTask = async (list: any[]) => {
    if (!account.address) {
      connect();
      return false;
    }
    const res1 = await startTask(id);
    if (!res1) {
      return false;
    }
    const data = list?.map((it) => {
      return {
        expectedstartTime: dayjs(it.startTime).unix() * 1000,
        expectedFinishTime: dayjs(it.endTime).unix() * 1000,
        expectedWorkTime: +it.workhours,
        requirementId: it.id,
      };
    });
    console.log('userInfo>>>', userInfo);
    const res = await Post(API_ROUTERS.tasks.PLANSUBMIT, {
      requirementPlan: data,
      uid: userInfo.uid,
      walletAddress: userInfo.address,
      projectId: id,
    });
    return res;
  };
  // 提交验收
  const submitAccept = async () => {
    if (!account.address) {
      connect();
      return false;
    }
    const res1 = await submitTask(id);
    if (!res1) {
      return false;
    }
    const res = await Post(API_ROUTERS.tasks.REQUIREMENT_SUBMIT, {
      uid: userInfo.uid,
      walletAddress: userInfo.address,
      projectId: +id,
      assetRecordId: myrecordId,
    });
    toast({
      title: `SuccessFully`,
      status: `success`,
      isClosable: false,
    });
    window.location.reload();
  };
  // 提取My Rewards
  // const withdrawMyRewards = () => {};
  // const startTask = () => {}
  // 完成任务计划某项
  const completePlanItem = async (planId: string) => {
    const res = await Post(API_ROUTERS.tasks.PLAN_COMPLETE, {
      projectId: id,
      requirementId: planId,
      uid: userInfo.uid,
      walletAddress: userInfo.address,
    });
    return res;
  };

  return {
    scheduleTask,
    submitAccept,
    // withdrawMyRewards,
    // startTask,
    completePlanItem,
  };
};

// 任务详情
export const useMyTaskDetail = (id: string | string[], address: string) => {
  // const { data, isLoading } = useSWR(
  //   id
  //     ? API_ROUTERS.tasks.TASKS_DETAIL({
  //         id
  //       })
  //     : null,
  //   Get
  // );
  // console.log("useTaskDetail>>>", data);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const getData = async () => {
    try {
      setLoading(true);
      const res = await Get(
        API_ROUTERS.tasks.TASKS_DETAIL({
          id,
          address,
        })
      );
      setLoading(false);
      // TODO 取status最后一个值
      res.projectDetailInfo.taskStatus = res.projectDetailInfo.projectRawInfo.status;
      // test
      // res.projectDetailInfo.taskStatus = res.projectDetailInfo.projectRawInfo.status =
      // IStatus.SIGNED;
      console.log('res?.projectDetailInfo>>>', res);
      setData(res?.projectDetailInfo || {});
      return res;
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    id && getData();
  }, [id]);

  return {
    data,
    isLoading: loading,
  };
};
