import API_ROUTERS from 'api';
import useChange from 'hooks/useChange';
import { useUserInfo } from 'hooks/user';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Get } from 'common/utils/axios';
import { QUERYTYPE, RequirementType } from 'common/constant';

const PAGE_SIZE = 10;

// 我的需求列表 TODO
export const useMyRequirements = (filter: any, activeTab: RequirementType, address: string) => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState('');
  // const [total, setTotal] = useState(0);
  const [data, setData] = useState<any>([]);
  const { triger, toggleTiger } = useChange();
  const [hadMore, setHasMore] = useState(true);
  const oldFilterRef = useRef({});
  const { userInfo } = useUserInfo();
  const getList = async (params: any) => {
    setLoading(!time);
    try {
      // TODO 参数 不同类型的区分请求 activeTab
      const _params = {
        address,
        queryType: QUERYTYPE.MY_REQUIREMENT,
      };
      if (!_params.address) {
        return;
      }
      const res = await Get(API_ROUTERS.tasks.TASKS_LIST_MINI(_params));

      const data = res?.projectRawInfoList || [];

      // 当返回的数量跟每页比小，没有更多, 不分页
      // if (data.length < PAGE_SIZE) {
      setHasMore(false);
      // }
      if (!time) {
        setData(data);
      } else {
        //@ts-ignore
        setData((prevData) => [...prevData, ...data]);
      }
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = useCallback(() => {
    const time = data[data.length - 1]?.startTime;
    setTime(time);
  }, [data]);

  useEffect(() => {
    setTime('');
    setHasMore(true);
  }, [filter]);

  useEffect(() => {
    toggleTiger();
  }, [userInfo]);

  useEffect(() => {
    console.log('triger', triger);
    // console.log(JSON.stringify({ user_addresses, page, filter, triger }));
    const params = {
      time,
      filter,
      triger,
    };
    console.log('params>>>', params, activeTab);
    if (JSON.stringify(oldFilterRef.current) !== JSON.stringify(params)) {
      oldFilterRef.current = params;
      getList(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, filter, triger]);

  return {
    loading,
    data,
    hasMore: hadMore,
    fetchMoreData,
    refetchData: toggleTiger,
  };
};
