import API_ROUTERS from "api";
import { useEffect, useState } from "react";
import { Get } from "utils/axios";
import { IStatus } from "utils/constant";

// detail status operator
export const useMyTaskDetailStatusAction = (id: string | string[]) => {
  // 任务排期
  const scheduleTask = () => {
  }
  const submitAccept = () => {}
  const withdrawMyRewards = () => {}
  const startTask = () => {}
  // 完成任务计划某项
  const completePlanItem = async (planId: string) => {}

  // 获取任务的评估，进行排期
  const getTaskEvaluateInfo = async () => {
    
    try {
      
			// TODO 参数 不同类型的区分请求 activeTab
      // const res = await Get(
      //   API_ROUTERS.tasks.TASKS_LIST({})
      // );
      // let { count, result } = res || {};
      
      // test
      let result = [
        {
            "taskname": "的哥为",
            "usdt": "12"
        },
        {
            "taskname": "12321",
            "usdt": "3444"
        },
        {
            "taskname": "werhow",
            "usdt": "42"
        },
        {
            "taskname": "wrho",
            "usdt": "234"
        },
        {
            "taskname": "happya a ",
            "usdt": "31"
        }
    ]
    
    return result
      
    } catch (error) {
      // handle error
      console.log("errr", error)
    } 
  };
  return {
    scheduleTask,
    submitAccept,
    withdrawMyRewards,
    startTask,
    getTaskEvaluateInfo,
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
  const [data, setData] = useState({taskStatus: IStatus.CODEING})
  const getData = async () => {
    try {
      setLoading(true)
      const res = await Get(
        API_ROUTERS.tasks.TASKS_DETAIL({
          id
        })
      )
      setLoading(false)
      setData(res?.result || {})
      return res
    }catch(e) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return {
    data,
    isLoading: loading,
  };
}

