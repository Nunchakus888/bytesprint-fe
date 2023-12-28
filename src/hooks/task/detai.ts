import API_ROUTERS from "api";
import { ISchedule } from "hooks/mytasks/schedule";
import { useUserInfo } from "hooks/user";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { Get } from "utils/axios";
import { IStatus, TaskBidStatus } from "utils/constant";

export interface IPlanItem extends ISchedule {
  actualCompleteTime: number 
  completeStatus: number
  id: string
}
export const useTaskPlanList = (data:any, isShow: boolean) => {
  const {identification, userInfo } = useUserInfo()
  const [openRecordDetailId, setOpenRecordDetailId] = useState('')
  // 投标详情
  const handleOpenRecordDetail = (recordId: string) => {
    setOpenRecordDetailId(recordId)
  }
  const closeRecordDetail = () => {
    setOpenRecordDetailId(null)
  }

  const planlist = useMemo(() => {
    if (data) {
      let data_ = []
      const bidSuc = data?.assetRecordList?.filter((it:any) => it.wallet === userInfo.address && it.signStatus === TaskBidStatus.BID_SUCCESS)
      console.log("bidSuc>>>", bidSuc)
      if (bidSuc?.length) {
        // const rids = bidSuc[0].requirementAssociation?.map((it:any) => it.requirementId)
        // console.log("rids>>>", rids)
        // const list = data?.requirementList.filter((it:any) => rids.includes(it.requirementId))
        const list = bidSuc[0]?.requirementAssociation
        console.log("list>>>", list)
        data_ = list?.map((it:any) => {
          return {
            "taskname": it.requirementName,
            "usdt": it.requirementCost,
            "startTime": it.requirementPlan.expectedstartTime,
            "endTime": it.requirementPlan.expectedFinishTime,
            "workhours": it.requirementPlan.expectedWorkTime,
            "actualCompleteTime": it.requirementPlan.actualFinishTime,
            "completeStatus": it.requirementPlan.requirementStatus,
            "id":it.requirementId
          }
        })
      }
      console.log("data_>>>", data_)
      return data_
    }
  }, [data])


//   const data_ = [
//     {
//         "taskname": "的哥为",
//         "usdt": "12",
//         "startTime": "2023-12-11T16:00:00.000Z",
//         "endTime": "2023-12-13T16:00:00.000Z",
//         "workhours": "12",
//         "actualCompleteTime": Date.now(),
//         "completeStatus": 1
//     },
//     {
//         "taskname": "12321",
//         "usdt": "3444",
//         "startTime": "2023-12-10T16:00:00.000Z",
//         "endTime": "2023-12-14T16:00:00.000Z",
//         "workhours": "40"
//     },
//     {
//         "taskname": "werhow",
//         "usdt": "42",
//         "startTime": "2023-12-18T16:00:00.000Z",
//         "endTime": "2023-12-20T16:00:00.000Z",
//         "workhours": "24"
//     },
//     {
//         "taskname": "wrho",
//         "usdt": "234",
//         "startTime": "2023-12-19T16:00:00.000Z",
//         "endTime": "2023-12-19T16:00:00.000Z",
//         "workhours": "8"
//     },
//     {
//         "taskname": "happya a ",
//         "usdt": "31",
//         "startTime": "2023-12-18T16:00:00.000Z",
//         "endTime": "2023-12-27T16:00:00.000Z",
//         "workhours": "20"
//     }
// ]

  return {
    planlist: planlist || [],
    openRecordDetailId,
    handleOpenRecordDetail,
    closeRecordDetail
  };
}

// 评估详情
export const useTaskEvaluateDetail = (record: any, data:any) => {
  // const { data, isLoading, mutate } = useSWR<IPlanItem[]>(
  //   id
  //     ? API_ROUTERS.tasks.TASKS_DETAIL({
  //         id
  //       })
  //     : null,
  //   Get
  // );
  // console.log("useTaskPlanList>>>", data);
  
  const data_ = useMemo(() => {
    // const rids = record?.requirementAssociation
    // console.log("rids>>>", rids)
    const list = record?.requirementAssociation
    console.log("list>>>", list)
    const res = list.map((it:any) => {
      return {
        "id": it.requirementId,
        "taskname": it.requirementName,
        "usdt": it.requirementCost,
        "startTime": it.requirementPlan?.expectedstartTime,
        "endTime": it.requirementPlan?.expectedFinishTime,
        "workhours": it.requirementPlan?.expectedWorkTime,
        "actualCompleteTime": it.requirementPlan?.actualFinishTime,
        "completeStatus": it.requirementPlan?.requirementStatus,
      }
    })
    return res
  }, [data, record])

//   const data_ = [
//     {
//         "taskname": "的哥为",
//         "usdt": "12",
//         "cny":700,
//         "startTime": "2023-12-11T16:00:00.000Z",
//         "endTime": "2023-12-13T16:00:00.000Z",
//         "workhours": "12",
//         "actualCompleteTime": Date.now(),
//         "completeStatus": 1
//     },
//     {
//         "taskname": "12321",
//         "usdt": "3444",
//         "cny":700,
//         "startTime": "2023-12-10T16:00:00.000Z",
//         "endTime": "2023-12-14T16:00:00.000Z",
//         "workhours": "40"
//     },
//     {
//         "taskname": "werhow",
//         "usdt": "42",
//         "cny":700,
//         "startTime": "2023-12-18T16:00:00.000Z",
//         "endTime": "2023-12-20T16:00:00.000Z",
//         "workhours": "24"
//     },
//     {
//         "taskname": "wrho",
//         "usdt": "234",
//         "cny":700,
//         "startTime": "2023-12-19T16:00:00.000Z",
//         "endTime": "2023-12-19T16:00:00.000Z",
//         "workhours": "8"
//     },
//     {
//         "taskname": "happya a ",
//         "usdt": "31",
//         "cny":700,
//         "startTime": "2023-12-18T16:00:00.000Z",
//         "endTime": "2023-12-27T16:00:00.000Z",
//         "workhours": "20"
//     }
   
    
// ]
const result = {
  list: data_,
  complateTime: Date.now(),
  status: ''
}
return {
  data: result,
  // refresh: mutate
};
}