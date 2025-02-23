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
    crowdsourcingType: '', // 众包类型
    categoryType: '', //项目类别
    positionType: '', // 职位类型
    name: '', // 项目名称
    status: '',
    address: '',
    queryType: '',
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
      crowdsourcingType: '', // 众包类型
      categoryType: '', //项目类别
      positionType: '', // 职位类型
      name: '', // 项目名称
      status: '',
      address: '',
      queryType: '',
      size: PAGE_SIZE,
    });
  };

  return { filter, onChange, refreshFilter };
};

// 任务大厅列表单一需求
export const useTaskList = (filter: any, activeTab: RequirementType) => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<any>();
  // const [total, setTotal] = useState(0);
  const [data, setData] = useState<any>([]);
  const { triger, toggleTiger } = useChange();
  const [hadMore, setHasMore] = useState(true);
  const { userInfo } = useUserInfo();
  const [page, setPage] = useState(1);
  const getList = async (params: any, time: number) => {
    setLoading(page === 1);
    try {
      const _params = {
        ...params,
        timestamp: time || Date.now(),
      };
      // TODO 参数 不同类型的区分请求 activeTab
      const res = await Get(API_ROUTERS.tasks.TASKS_LIST(_params));
      const data = res?.projectRawInfoList || [];
      // 当返回的数量跟每页比小，没有更多
      if (data.length === 0) {
        setHasMore(false);
        console.log('setHasMore', false);
      }
      if (page === 1) {
        setData(data);
      } else {
        //@ts-ignore
        setData((prevData) => [...prevData, ...data]);
      }
      setLoading(false);
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = useCallback(() => {
    const time = data[data.length - 1]?.startTime;
    setPage((prevPage) => prevPage + 1);
    setTime(time);
  }, [data]);

  useEffect(() => {
    document.getElementById('items_list_scrollable_box').scrollTo(0, 0);
    setPage(1);
    setTime(Date.now());
    setHasMore(true);
    toggleTiger();
  }, [filter, toggleTiger]);

  useEffect(() => {
    // toggleTiger();
  }, [userInfo]);

  useEffect(() => {
    console.log('triger', triger);
    const params = {
      page,
      filter,
      triger,
    };
    console.log('params>>>', params, activeTab);
    getList(filter, time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, triger]);

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
