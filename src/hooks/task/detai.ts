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

  return {
    scheduleTask,
    submitAccept,
    withdrawMyRewards
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
  const [data, setData] = useState({taskStatus: IStatus.WAIT_SIGN})
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