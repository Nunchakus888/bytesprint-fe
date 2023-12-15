import axios from "axios"
import _ from "lodash"
import { useEffect, useMemo, useState } from "react"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import dayjs from "dayjs";


export interface ISchedule {
  taskname: string
  usdt: string
  workhours: number| undefined
  startTime: Date | undefined
  endTime: Date | undefined
}

export const useSchedule = ({scheduleTask, startTask, taskId, scheduledata}:any) => { 
  // 是否可以开始任务
  const [isStartTask, setIsStartTask] = useState(false)

  const datas: ISchedule[] = scheduledata.map((it:ISchedule) => {
    const {startTime, endTime, workhours} = it
    return {...it, startTime, endTime, workhours}
  })
  // 如果返回有时间数据，表示可以开始任务
  if (!!datas.some(it => !!it.startTime)) {
    setIsStartTask(true)
  }
  
  const { register, control, handleSubmit, reset, watch, formState:{ errors}, setValue, getValues } = useForm({
    defaultValues: {
      datas
    }
  });
  

  const {
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    replace
  } = useFieldArray({
    control,
    name: "datas"
  });
  const results = watch()
  useEffect(() => {
    console.log("result>>>", results)
  }, [results])
  
  const saveSchedule = () => {
    handleSubmit(onSubmit)()
  }
  const onSubmit = (data:any) => {
    console.log("提交数据>>>>", data.datas)
    console.log("调用任务排期接口>>>>", data.datas)
    scheduleTask(data.datas)
    // 保存成功后，可以开始任务
    setIsStartTask(true)
  }

  // 开始任务
  const startMyTask = () => {
    // TODO 状态流转
    console.log("调用开始任务接口>>>>", )
    startTask(taskId)
  }
  return {
    fields,
    append,
    remove,
    saveSchedule,
    errors,
    register,
    setValue,
    startMyTask,
    isStartTask,
    getValues,
    control
  }
}
