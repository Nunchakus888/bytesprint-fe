import API_ROUTERS from "api";
import { ISchedule } from "hooks/mytasks/schedule";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Get } from "utils/axios";

export interface IPlanItem extends ISchedule {
  actualCompleteTime: number 
  completeStatus: number
  id: string
}
export const useTaskPlanList = (id: string, isShow: boolean) => {
   const { data, isLoading, mutate } = useSWR<IPlanItem[]>(
    id && isShow 
      ? API_ROUTERS.tasks.TASKS_DETAIL({
          id
        })
      : null,
    Get
  );
  console.log("useTaskPlanList>>>", data);
  
  const data_ = [
    {
        "taskname": "的哥为",
        "usdt": "12",
        "startTime": "2023-12-11T16:00:00.000Z",
        "endTime": "2023-12-13T16:00:00.000Z",
        "workhours": "12",
        "actualEndTime": new Date(),
        "completeStatus": 1
    },
    {
        "taskname": "12321",
        "usdt": "3444",
        "startTime": "2023-12-10T16:00:00.000Z",
        "endTime": "2023-12-14T16:00:00.000Z",
        "workhours": "40"
    },
    {
        "taskname": "werhow",
        "usdt": "42",
        "startTime": "2023-12-18T16:00:00.000Z",
        "endTime": "2023-12-20T16:00:00.000Z",
        "workhours": "24"
    },
    {
        "taskname": "wrho",
        "usdt": "234",
        "startTime": "2023-12-19T16:00:00.000Z",
        "endTime": "2023-12-19T16:00:00.000Z",
        "workhours": "8"
    },
    {
        "taskname": "happya a ",
        "usdt": "31",
        "startTime": "2023-12-18T16:00:00.000Z",
        "endTime": "2023-12-27T16:00:00.000Z",
        "workhours": "20"
    }
]

  return {
    data: data_ as unknown as IPlanItem[],
    refresh: mutate
  };
}