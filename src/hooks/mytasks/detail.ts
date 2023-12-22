import { useToast } from "@chakra-ui/react";
import API_ROUTERS from "api";
import dayjs from "dayjs";
import { useUserInfo } from "hooks/user";
import { useEffect, useState } from "react";
import { Get } from "utils/axios";
import { IStatus, TaskBidStatus } from "utils/constant";

// detail status operator
export const useMyTaskDetailStatusAction = (id: string | string[]) => {
  const {userInfo} = useUserInfo()
  const toast = useToast()
  // 任务排期
  const scheduleTask = async (list: any[]) => {
    const data = list?.map(it => {
      return {
        expectedstartTime: dayjs(it.startTime).unix(),
        expectedFinishTime: dayjs(it.endTime).unix(),
        expectedWorkTime: +it.workhours,
        requirementId: it.id
      }
    })
    const res = await API_ROUTERS.tasks.PLANSUBMIT({
      requirementPlan: data,
      uid: userInfo.uid,
      address: userInfo.address
    })
    return res
  }
  // 提交验收
  const submitAccept = async () => {
    const res = await API_ROUTERS.tasks.REQUIREMENT_SUBMIT({
      uid: userInfo.uid,
      walletAddress: userInfo.walletAddress,
      projectid: id
    })
    toast({
      title: `Operate SuccessFully`,
      status: `success`,
      isClosable: true,
      onCloseComplete: () => {
        window.location.reload()
      }
    })
  }
  // 提取我的报酬
  const withdrawMyRewards = () => {}
  // const startTask = () => {}
  // 完成任务计划某项
  const completePlanItem = async (planId: string) => {
    const res = await API_ROUTERS.tasks.PLAN_COMPLETE({
      projectId: id,
      requirementId: planId,
      uid: userInfo.uid,
      walletAddress: userInfo.address
    })
    return res
  }


  return {
    scheduleTask,
    submitAccept,
    withdrawMyRewards,
    // startTask,
    completePlanItem
  }
}

// 任务详情
export const useMyTaskDetail = (id: string | string[]) => {
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
      // setLoading(true);
      // const res = await Get(
      //   API_ROUTERS.tasks.TASKS_DETAIL({
      //     id,
      //     address
      //   })
      // );
      // setLoading(false);
      const res = {
        projectDetailInfo: {
          projectRawInfo: {
            id: "11",
            number: 'BYSD123456',
            name: '测试任务 海鸥灰',
            categoryType: 1,
            categoryName: '普通任务',
            positionType: 1,
            positionName: `前端开发`,
            crowdsourcingType: 1,
            crowdsourcingName: `竞标`,
            description: `测试任务 海鸥灰符合肉鹅和佛围绕娃儿我为人欧赔王倩茹排位额如额嘎哈哦发货红色佛色和沃尔好哦我乌尔禾哦区分深V多少的饭卡了哈拉萨代发额还让我恶化哦融合我饿水电费哈师大立法会带回去哦我惹我看帅哥好哦钱啊干哈阿大概好哦玩`,
            status: [0, 1, 2],
            statusTime: [Date.now(),Date.now(), Date.now()],
            startTime: Date.now(),
            endTime: Date.now(),
            
          },
          fileList: [
            {fileName: '是哦否哈佛稍微额UR偶.pdf', fileType: 'pdf', fileUrl: '#'},
            {fileName: '是哦否哈佛稍微额UR偶.pdf', fileType: 'pdf', fileUrl: '#'},
            {fileName: '是哦否哈佛稍微额UR偶.pdf', fileType: 'pdf', fileUrl: '#'},
            {fileName: '是哦否哈佛稍微额UR偶.pdf', fileType: 'pdf', fileUrl: '#'}
          ],
          assetRecordList: [
            {totalTime: 133, totalCost: 1222, finishTime: Date.now(), requirementAssociation: [{requirementId: 1}], uid: 1, wallet: "0x8B51290B45b899beE168aC764F3a2f2276c61961", signStatus: TaskBidStatus.BID_SUCCESS},
            {totalTime: 133, totalCost: 1222, finishTime: Date.now(), requirementAssociation: [{requirementId: 1}], uid: 2, wallet: 11, signStatus: TaskBidStatus.BID_FAIL},
            {totalTime: 133, totalCost: 1222, finishTime: Date.now(), requirementAssociation: [{requirementId: 1}], uid: 3, wallet: 11, signStatus: TaskBidStatus.BID_FAIL},
            {totalTime: 133, totalCost: 1222, finishTime: Date.now(), requirementAssociation: [{requirementId: 1}], uid: 4, wallet: 11, signStatus: TaskBidStatus.BID_FAIL},
          ],
          requirementList: [
            {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },
            {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },
            {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },
            {requirementId: 1, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },

            {requirementId: 2, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },
            {requirementId: 2, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },
            {requirementId: 2, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },
            {requirementId: 2, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },

            {requirementId: 3, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },
            {requirementId: 3, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },
            {requirementId: 3, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },
            {requirementId: 3, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },

            {requirementId: 4, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },
            {requirementId: 4, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },
            {requirementId: 4, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            },
            {requirementId: 4, requirementName: '111', requirementCost: 121, requirementPlan: {
              expectedstartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), expectedWorkTime: 1111, actualFinishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),requirementStatus: 2}
            }
          ],
          taskStatus: 2
        }
      }
      console.log("res?.projectDetailInfo>>>", res)
      setData(res?.projectDetailInfo || {});
      return res;
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    isLoading: loading,
  };
}

