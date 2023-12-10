import API_ROUTERS from "api";
import { useEffect, useState } from "react";
import { Get } from "utils/axios";
import { IStatus } from "utils/constant";

// detail status operator
export const useMyRequirementDetailStatusAction = (id: string | string[]) => {
  
  

  // 打开任务
  const openTask = () => {
    // prompt
    // open
    // refresh
  }

  // 关闭任务
  const closeTask = () => {

  }

  // 验收任务
  const acceptTask = () => {

  }

  // 签约TA
  const signBid = () => {

  }
  // 淘汰TA
  const unSignBid = () => {

  }
  // 打开详情
  const openRecordDetail = () => {

  }

  return {
    openTask,
    closeTask,
    acceptTask,
    signBid,unSignBid, openRecordDetail
  }
}

// 任务详情
export const useMyRequirementDetail = (id: string | string[]) => {
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
  const [data, setData] = useState({taskStatus: IStatus.SIGNED})
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