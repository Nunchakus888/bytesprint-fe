import { useToast } from '@chakra-ui/react';
import API_ROUTERS from 'api';
import dayjs from 'dayjs';
import { useUserInfo } from 'hooks/user';
import { useEffect, useState } from 'react';
import { Get, Post } from 'common/utils/axios';
import { IStatus, TaskBidStatus } from 'common/constant';
import { useAccount, useNetwork } from 'wagmi';
import { startTask, submitTask } from 'common/contract/lib/bytd';
import useConnect from 'hooks/useConnect';
import useCheckChain from 'hooks/useCheckChain';

// detail status operator
export const useMyTaskDetailStatusAction = (id: string | string[], myrecordId: string) => {
  const { userInfo } = useUserInfo();
  const toast = useToast();
  const account = useAccount();
  const { connect } = useConnect();
  const [buttonLoading, setButtonLoading] = useState(false);
  const { chain } = useNetwork();
  const { checkChain, switchChain } = useCheckChain(chain?.id);
  // 任务排期
  const scheduleTask = async (list: any[]) => {
    setButtonLoading(true);
    if (!userInfo.address) {
      connect();
      setButtonLoading(false);
      return false;
    }
    const isUncorrectChain = await checkChain();
    if (isUncorrectChain) {
      const isSwitch = await switchChain();
      if (!isSwitch) {
        setButtonLoading(false);
        return false;
      }
    }
    const res1 = await startTask({ projectId: id });
    if (!res1) {
      setButtonLoading(false);
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
    }).finally(() => {
      setButtonLoading(false);
    });

    return res;
  };
  // 提交验收
  const submitAccept = async () => {
    setButtonLoading(true);
    if (!userInfo.address) {
      connect();
      setButtonLoading(false);
      return false;
    }
    const isUncorrectChain = await checkChain();
    if (isUncorrectChain) {
      const isSwitch = await switchChain();
      if (!isSwitch) {
        setButtonLoading(false);
        return false;
      }
    }
    const res1 = await submitTask({ projectId: id });
    if (!res1) {
      setButtonLoading(false);
      return false;
    }
    const res = await Post(API_ROUTERS.tasks.REQUIREMENT_SUBMIT, {
      uid: userInfo.uid,
      walletAddress: userInfo.address,
      projectId: +id,
      assetRecordId: myrecordId,
    }).finally(() => {
      setButtonLoading(false);
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
    buttonLoading,
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
      ).finally(() => {
        setLoading(false);
      });

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
