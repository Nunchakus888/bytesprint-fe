import { useToast } from '@chakra-ui/react';
import API_ROUTERS from 'api';
import {
  publishTask,
  signTask,
  acceptTask as acceptTaskForEmployee,
  closeTask as closeTaskForEmployee,
} from 'common/contract/lib/bytd';
import { Get, Post } from 'common/utils/axios';
import { TaskBidStatus } from 'common/constant';
import dayjs from 'dayjs';
import { useUserInfo } from 'hooks/user';
import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { ethers } from 'ethers';

// detail status operator
export const useMyRequirementDetailStatusAction = (id: string | string[]) => {
  const { userInfo } = useUserInfo();
  const toast = useToast();
  const account = useAccount();
  const { connect } = useConnect();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [signLoading, setSignLoading] = useState(false);
  // 打开任务
  const openTask = async () => {
    setButtonLoading(true);
    if (!account.address) {
      connect();
      setButtonLoading(false);
      return false;
    }
    // 执行合约
    const res1 = await publishTask({ projectId: id });
    // 任务类型，根据身份匹配
    if (!res1) {
      setButtonLoading(false);
      return false;
    }
    const res = await Post(API_ROUTERS.tasks.TASK_OPEN, {
      uid: userInfo.uid,
      walletAddress: userInfo.address,
      projectId: id,
    });
    toast({
      title: `SuccessFully`,
      status: `success`,
      isClosable: false,
    });
    setButtonLoading(false);
    window.location.reload();
  };

  // 关闭任务
  const closeTask = async () => {
    setButtonLoading(true);
    if (!account.address) {
      connect();
      setButtonLoading(false);
      return false;
    }
    const res1 = await closeTaskForEmployee({ projectId: id });
    debugger;
    if (!res1) {
      setButtonLoading(false);
      return false;
    }
    const res = await Post(API_ROUTERS.tasks.TASK_CLOSE, {
      uid: userInfo.uid,
      walletAddress: userInfo.address,
      projectId: id,
    });
    toast({
      title: `SuccessFully`,
      status: `success`,
      isClosable: false,
    });
    setButtonLoading(false);
    window.location.reload();
  };

  // 验收任务
  const acceptTask = async () => {
    setButtonLoading(true);
    if (!account.address) {
      connect();
      setButtonLoading(false);
      return false;
    }
    const res1 = await acceptTaskForEmployee({ projectId: id });
    if (!res1) {
      setButtonLoading(false);
      return false;
    }
    const res = await Post(API_ROUTERS.tasks.PROJECT_ACCEPT, {
      uid: userInfo.uid,
      walletAddress: userInfo.address,
      projectId: id,
    });
    toast({
      title: `SuccessFully`,
      status: `success`,
      isClosable: false,
    });
    setButtonLoading(false);
    window.location.reload();
  };

  // 签约TA
  const signBid = async (record: any) => {
    // 判断是否登录
    if (!account.address) {
      connect();
      return false;
    }
    try {
      setSignLoading(true);
      let { totalCost, totalTime, uid, wallet, assetRecordId, finishTime } = record;
      // // 质押天数
      // const lockDays = Math.ceil((+finishTime - Date.now()) / (24 * 60 * 60 * 1000));
      // 合约交互
      const result = await signTask({
        account,
        projectId: id,
        taskerAddress: wallet,
        totalCost: totalCost * 10,
      });
      if (!result) {
        setSignLoading(false);
        return false;
      }
      // 调用接口
      const res = await Post(API_ROUTERS.tasks.PROJECT_SIGN, {
        uid: userInfo.uid,
        walletAddress: wallet,
        projectId: id,
        assetRecordId,
        status: TaskBidStatus.BID_SUCCESS,
      });
      if (res.result.code !== 0) {
        return false;
      }
      toast({
        title: `SuccessFully`,
        status: `success`,
        isClosable: false,
      });
      window.location.reload();
    } finally {
      setSignLoading(false);
    }
  };
  // 淘汰TA
  const unSignBid = async (record: any) => {
    const { uid, wallet, assetRecordId } = record;
    const res = await Post(API_ROUTERS.tasks.PROJECT_UNSIGN, {
      uid: userInfo.uid,
      walletAddress: wallet,
      projectId: id,
      assetRecordId,
      // status: TaskBidStatus.BID_FAIL
    });
    toast({
      title: `SuccessFully`,
      status: `success`,
      isClosable: true,
      onCloseComplete: () => {
        window.location.reload();
      },
    });
  };

  // 打开详情 暂时不做
  const openRecordDetail = () => {};
  return {
    openTask,
    closeTask,
    acceptTask,
    signBid,
    unSignBid,
    openRecordDetail,
    buttonLoading,
    signLoading,
  };
};

// 任务详情
export const useMyRequirementDetail = (id: string | string[], address: string) => {
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
      console.log('id,address1111', id, address);
      setLoading(true);
      const res = await Get(
        API_ROUTERS.tasks.TASKS_DETAIL({
          id,
          // address
        })
      );
      setLoading(false);

      // const res = {
      //   projectDetailInfo: {
      //     projectRawInfo: {
      //       id: "11",
      //       number: 'BYSD123456',
      //       name: '测试任务 海鸥灰',
      //       categoryType: 1,
      //       categoryName: '普通任务',
      //       positionType: 1,
      //       positionName: `前端开发`,
      //       crowdsourcingType: 1,
      //       crowdsourcingName: `竞标`,
      //       description: `测试任务 海鸥灰符合肉鹅和佛围绕娃儿我为人欧赔王倩茹排位额如额嘎哈哦发货红色佛色和沃尔好哦我乌尔禾哦区分深V多少的饭卡了哈拉萨代发额还让我恶化哦融合我饿水电费哈师大立法会带回去哦我惹我看帅哥好哦钱啊干哈阿大概好哦玩`,
      //       status: [0, 1, 2],
      //       statusTime: [Date.now(),Date.now(), Date.now()],
      //       startTime: Date.now(),
      //       endTime: Date.now(),

      //     },
      //     fileList: [
      //       {fileName: '是哦否哈佛稍微额UR偶.pdf', fileType: 'pdf', fileUrl: '#'},
      //       {fileName: '是哦否哈佛稍微额UR偶.pdf', fileType: 'pdf', fileUrl: '#'},
      //       {fileName: '是哦否哈佛稍微额UR偶.pdf', fileType: 'pdf', fileUrl: '#'},
      //       {fileName: '是哦否哈佛稍微额UR偶.pdf', fileType: 'pdf', fileUrl: '#'}
      //     ],
      //     assetRecordList: [
      //       {totalTime: 133, totalCost: 1222, finishTime: Date.now(), requirementList: [
      //         {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
      //           expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //         },
      //         {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
      //           expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //         },
      //         {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
      //           expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //         },
      //         {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
      //           expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //         }], uid: 1, wallet: "0x8B51290B45b899beE168aC764F3a2f2276c61961", signStatus: TaskBidStatus.BID_SUCCESS},
      //       {totalTime: 133, totalCost: 1222, finishTime: Date.now(), requirementList: [
      //         {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
      //           expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //         },
      //         {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
      //           expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //         },
      //         {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
      //           expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //         },
      //         {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
      //           expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //         }], uid: 2, wallet: '0x01821bfbffefecf0f31c78dd841d2819fdfc1ef2', signStatus: TaskBidStatus.BID_FAIL},
      //       // {totalTime: 133, totalCost: 1222, finishTime: Date.now(), requirementAssociation: [{requirementId: 1}], uid: 3, wallet: 11, signStatus: TaskBidStatus.BID_FAIL},
      //       // {totalTime: 133, totalCost: 1222, finishTime: Date.now(), requirementAssociation: [{requirementId: 1}], uid: 4, wallet: 11, signStatus: TaskBidStatus.BID_FAIL},
      //     ],
      //     // requirementList: [
      //     //   {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },
      //     //   {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },
      //     //   {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },
      //     //   {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },

      //     //   {requirementId: 2, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },
      //     //   {requirementId: 2, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },
      //     //   {requirementId: 2, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },
      //     //   {requirementId: 2, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },

      //     //   {requirementId: 3, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },
      //     //   {requirementId: 3, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },
      //     //   {requirementId: 3, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },
      //     //   {requirementId: 3, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },

      //     //   {requirementId: 4, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },
      //     //   {requirementId: 4, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },
      //     //   {requirementId: 4, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   },
      //     //   {requirementId: 4, requirementName: '111', requirementCost: 121, requirementPlan: {
      //     //     expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
      //     //   }
      //     // ],
      //     taskStatus: 2
      //   }
      // }

      // test
      // res.projectDetailInfo.projectRawInfo.status = [1,2,3]
      // res.projectDetailInfo.projectRawInfo.statusTime=[Date.now(), Date.now(), Date.now()]
      console.log('id,address1111res', res);
      res.projectDetailInfo.taskStatus = res.projectDetailInfo.projectRawInfo.status;
      console.log('res?.projectDetailInfo>>>', res);
      setData(res?.projectDetailInfo || {});
      return res;
    } catch (e) {
      debugger;
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return {
    data,
    isLoading: loading,
    refresh: getData,
  };
};
