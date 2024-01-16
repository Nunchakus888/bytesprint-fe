import { toast, useToast } from '@chakra-ui/react';
import API_ROUTERS from 'api';
import axios from 'axios';
import { stakeTasker } from 'common/contract/lib/bytd';
import dayjs from 'dayjs';
import { useUserInfo } from 'hooks/user';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Post } from 'common/utils/axios';
import { useAccount } from 'wagmi';
import useConnect from 'hooks/useConnect';

export const useEvaluate = (projectId: string, onSuccessCb: () => void) => {
  const { userInfo } = useUserInfo();
  const toast = useToast();
  const account = useAccount();
  const [isLoading, setLoading] = useState(false);
  const { connect } = useConnect();
  // 汇率
  // const [rate, setRate] = useState(0)

  // useEffect(() => {
  //   getExchangeRate().then((res) => {
  //     setRate(+res);
  //   });
  // }, []);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      datas: [{ taskname: '', usdt: '' }],
      endTime: new Date(),
    },
    mode: 'onChange',
  });
  const { fields, append, prepend, remove, swap, move, insert, replace } = useFieldArray({
    control,
    name: 'datas',
  });

  const results = watch();
  useEffect(() => {
    console.log('result>>', results);
  }, [results]);
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
      const usdt = +cur.usdt || 0;
      try {
        if (usdt) {
          return pre + Number(usdt);
        }
        return pre;
      } catch (e) {
        return pre;
      }
    }, 0);
    console.log('total', total);
    return Number(total || 0).toFixed(2);
  }, [results]);

  const handleSure = () => {
    if (!account.address) {
      connect();
      return false;
    }
    handleSubmit(onSubmit)();
  };
  const onSubmit = async (data: any) => {
    console.log('提交数据>>>>', data);
    setLoading(true);
    try {
      // 先调用接口
      const requirementList = data.datas.map((it: any) => {
        return {
          requirementName: it.taskname,
          requirementCost: it.usdt,
        };
      });
      const params = {
        finishTime: dayjs(data.endTime).unix() * 1000,
        projectId,
        uid: userInfo.uid,
        walletAddress: userInfo.address,
        requirementList,
      };
      const res = await Post(API_ROUTERS.tasks.EVALUATE, params);
      if (res.code !== 0) {
        return false;
      }
      const amount = data.datas.reduce((prev: number, cur: any) => prev + +cur.usdt, 0);
      // 质押天数 完成时间 - 当前时间
      const lockDays = Math.ceil(
        (dayjs(data.endTime).unix() * 1000 - Date.now()) / (24 * 60 * 60 * 1000)
      );
      const contactRes = await stakeTasker({
        account,
        projectId,
        amount: amount * 0.1, // 质押10%
        lockDays: Math.max(lockDays, 1),
      });
      if (!contactRes) {
        toast({
          title: `Operate Error`,
          status: `error`,
          isClosable: true,
        });
        setLoading(false);
        return false;
      }
      // 请求成功后返回任务列表
      toast({
        title: `successFully`,
        status: `success`,
        isClosable: true,
      });
      setLoading(false);
      onSuccessCb?.();
    } finally {
      setLoading(false);
    }
  };
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
    getValues,
    isLoading,
  };
};

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
