import { toast, useToast } from "@chakra-ui/react";
import API_ROUTERS from "api";
import axios from "axios"
import dayjs from "dayjs";
import { useUserInfo } from "hooks/user";
import _ from "lodash"
import { useEffect, useMemo, useState } from "react"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Post } from "utils/axios";


export const useEvaluate = (projectId: string, ) => { 
  const {userInfo } = useUserInfo()
  const toast = useToast()
  // 汇率
  // const [rate, setRate] = useState(0)

  // useEffect(() => {
  //   getExchangeRate().then((res) => {
  //     setRate(+res);
  //   });
  // }, []);

  const { register, control, handleSubmit, reset, watch, formState:{ errors, }, setValue , getValues} = useForm({
    defaultValues: {
      datas: [{taskname: '', usdt: ''}],
      endTime: new Date()
    },
    mode:'onChange'
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
    console.log("result>>", results)
  }, [results])
  // cnys
  // const cnys = useMemo(() => {
  //   const datas = results.datas.map(it => {
  //     try {
  //       const usdt = Number(it.usdt || 0)
  //       if (it) {
  //         return  Number(usdt * rate).toFixed(2)
  //       }
  //       return ''
  //     }catch(e) {return 0}
  //   })
  //   return datas
  // }, [results, rate])

  // const totalCnys = useMemo(() => {
  //   const total = cnys.reduce((pre: number, cur: any) => {
  //     try {
  //       if (cur && +cur > 0) {
  //         return Number(pre) + Number(cur);
  //       }
  //       return pre
  //     }catch(e) {return pre}
  //   }, 0)
  //   return Number(total || 0).toFixed(2)
  // }, [cnys])
 
  const totalUsdt = useMemo(() => {
    const total = results.datas.reduce((pre, cur) => {
      const usdt = +cur.usdt || 0
      try {
        if (usdt) {
          return pre + Number(usdt)
        }
        return pre
      }catch(e) {return pre}
    }, 0)
    console.log("total", total)
    return Number(total || 0).toFixed(2)
  }, [results])

  const handleSure = () => {
    handleSubmit(onSubmit)()
  }
  const onSubmit = async (data:any) => {
    console.log("提交数据>>>>", data)
    // TODO 跟合约交互

    // 合约交互完成后再调用接口
    const requirementList = data.datas.map((it:any) => {
      return {
        requirementName: it.taskname,
        requirementCost: it.usdt
      }
    })
    const params = {
      finishTime: dayjs(data.endTime).unix(),
      projectId,
      uid: userInfo.uid,
      walletAddress: userInfo.address,
      requirementList
    }
    const res = await Post(
      API_ROUTERS.tasks.EVALUATE(params)
    );
    // 请求成功后返回任务列表
    toast({
      title: `successFully`,
      status: `success`,
      isClosable: true,
      onCloseComplete: () => {
        window.location.reload()
      }
    })
  }
  return {
    fields,
    append,
    remove,
    handleSure,
    // totalCnys,
    totalUsdt,
    // cnys,
    // rate,
    errors,
    register,
    control,
    setValue,
    getValues
  }
}

// 计算汇率
export const getExchangeRate = async () => {
  const res = await axios.get(
    'http://api.exchangeratesapi.io/latest?access_key=f52d93afd307d021a73305da8b7055e4'
  );
  if (res.data.success) {
    const { CNY, USD } = res.data.rates;
    return Number(CNY / USD).toFixed(4);
  }
  return 0;
};
