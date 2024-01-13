import API_ROUTERS from 'api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Get } from 'common/utils/axios';
import useSWR from 'swr';
import useChange from 'hooks/useChange';
import { RequirementType, Tabs } from 'common/constant';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setJobTypes } from 'common/slice/commonSlice';
import { useUserInfo } from 'hooks/user';
import { onWarmToast } from 'common/utils/toast';

const PAGE_SIZE = 10;

// 根据角色返回对应的任务数据
// 任务tab
// 任务列表
export const useTasks = () => {
  const [tabs, setTabs] = useState(Tabs);
  const [activeTab, setActiveTab] = useState(tabs?.[0].value);
  const handleTabChange = (val: RequirementType) => {
    // const value = tabs.filter((it) => it.value === val)[0].value;

    // 点击其他任务
    if (val !== RequirementType.Single) {
      onWarmToast('Coming soon');
      return false;
    }
    // setActiveTab(val);
  };
  return {
    tabs,
    activeTab,
    handleTabChange,
  };
};

// 单一任务的查询
export const useSingleTaskFilter = () => {
  const [filter, setFilter] = useState({
    crowdsourcingtype: '', // 众包类型
    categorytype: '', //项目类别
    positiontype: '', // 职位类型
    // name: 1, // 项目名称
    status: '',
    address: '',
    querytype: '',
    timestamp: '',
    size: PAGE_SIZE,
  });
  const onChange = (key: string, value: string) => {
    setFilter((pre) => {
      return {
        ...pre,
        [key]: value,
      };
    });
  };

  const refreshFilter = () => {
    setFilter({
      crowdsourcingtype: '', // 众包类型
      categorytype: '', //项目类别
      positiontype: '', // 职位类型
      // name: 1, // 项目名称
      status: '',
      address: '',
      querytype: '',
      timestamp: '',
      size: PAGE_SIZE,
    });
  };

  return { filter, onChange, refreshFilter };
};

// 任务大厅列表单一需求
export const useTaskList = (filter: any, activeTab: RequirementType) => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(Date.now());
  // const [total, setTotal] = useState(0);
  const [data, setData] = useState<any>([]);
  const { triger, toggleTiger } = useChange();
  const [hadMore, setHasMore] = useState(true);
  const oldFilterRef = useRef({});
  const { userInfo } = useUserInfo();
  const getList = async (params: any) => {
    setLoading(!time);
    try {
      const _params = {
        ...params,
        timestamp: time || Date.now(),
      };
      console.log('time>>>', time);
      // TODO 参数 不同类型的区分请求 activeTab
      const res = await Get(API_ROUTERS.tasks.TASKS_LIST(_params));
      const data = res?.projectRawInfoList || [];
      // 当返回的数量跟每页比小，没有更多
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
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
    setTime(Date.now());
    setHasMore(true);
  }, [filter]);

  useEffect(() => {
    toggleTiger();
  }, [userInfo]);

  useEffect(() => {
    console.log('triger', triger);
    // console.log(JSON.stringify({ user_addresses, page, filter, triger }));
    const params = {
      time: Date.now(),
      filter,
      triger,
    };

    if (JSON.stringify(oldFilterRef.current) !== JSON.stringify(params)) {
      console.log('params>>>', params, activeTab);
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

// 人员需求的查询
export const usePersonTaskFilter = () => {
  const [filter, setFilter] = useState({
    educational: '', // 学历
    experience: '',
    workPlace: '',
    workTime: '',
    taskType: '',
  });
  const onChange = (key: string, value: string) => {
    setFilter((pre) => {
      return {
        ...pre,
        [key]: value,
      };
    });
  };
  return { filter, onChange };
};

// 任务详情
export const useTaskDetail = (id: string | string[], address: string) => {
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
      setLoading(true);
      const res = await Get(
        API_ROUTERS.tasks.TASKS_DETAIL({
          id,
          // address
        })
      );
      setLoading(false);
      setData(res?.projectDetailInfo || {});
      return res;
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    id && getData();
  }, [id]);

  return {
    data,
    isLoading: loading,
    refresh: getData,
  };
};

export const useJobTypes = () => {
  const dispatch = useDispatch();
  const { jobtypes } = useSelector((state: any) => state.common);

  const getJobTypes = async () => {
    const res = await Get(API_ROUTERS.positions.LIST_ENGINEER({}));
    const list = res?.positions?.filter((it: any) => it.status === 0);
    const data = list.map((it: any) => {
      return {
        label: it.positionName,
        value: it.positionId,
      };
    });
    // const data = [{label: '111', value: 1}]
    dispatch(setJobTypes(data));
  };
  useEffect(() => {
    getJobTypes();
  }, []);

  const getData = useCallback(() => {
    return jobtypes;
  }, [jobtypes]);
  return {
    getData,
  };
};
