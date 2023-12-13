import API_ROUTERS from 'api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Get } from 'utils/axios';
import useSWR from 'swr';
import useChange from 'hooks/useChange';
import { RequirementType, Tabs } from 'utils/constant';
const PAGE_SIZE = 10;

// 根据角色返回对应的任务数据
// 任务tab
// 任务列表
export const useTasks = () => {
  const [tabs, setTabs] = useState(Tabs);
  const [activeTab, setActiveTab] = useState(tabs?.[0].value);
  const handleTabChange = (val: RequirementType) => {
    const value = tabs.filter((it) => it.value === val)[0].value;
    setActiveTab(value);
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
    proType: '',
    taskType: '',
    professionType: '',
    name: '',
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
      proType: '',
      taskType: '',
      professionType: '',
      name: '',
    });
  };

  return { filter, onChange, refreshFilter };
};

// 任务大厅列表
export const useTaskList = (filter: any, activeTab: RequirementType) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any>([]);
  const { triger, toggleTiger } = useChange();
  const oldFilterRef = useRef({});
  const getList = async (params: any) => {
    setLoading(params.page === 1);
    try {
      const _params = {
        page,
        page_size: PAGE_SIZE,
        ...params,
      };
      // TODO 参数 不同类型的区分请求 activeTab
      // const res = await Get(
      //   API_ROUTERS.tasks.TASKS_LIST({})
      // );
      // let { count, result } = res || {};

      // test
      let result = [{}, {}, {}, {}, {}, {}];
      let count = 30;

      setTotal(count);
      if (params.page === 1) {
        setData(result);
      } else {
        //@ts-ignore
        setData((prevData) => [...prevData, ...result]);
      }
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = useCallback(() => {
    console.log('fetchMoreData');
    if (total > page * PAGE_SIZE) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, total]);

  useEffect(() => {
    setPage(1);
    setTotal(0);
  }, [filter]);

  useEffect(() => {
    console.log('triger', triger);
    // console.log(JSON.stringify({ user_addresses, page, filter, triger }));
    const params = {
      page,
      filter,
      triger,
    };
    console.log('params>>>', params, activeTab);
    if (JSON.stringify(oldFilterRef.current) !== JSON.stringify(params)) {
      oldFilterRef.current = params;
      getList({
        page,
        collection_addresses: filter?.collections,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter, triger]);

  return {
    loading,
    page,
    data,
    hasMore: total > page * PAGE_SIZE,
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
export const useTaskDetail = (id: string | string[]) => {
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
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      setLoading(true);
      const res = await Get(
        API_ROUTERS.tasks.TASKS_DETAIL({
          id,
        })
      );
      setLoading(false);
      setData(res?.result || []);
      return res;
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  

  return {
    data,
    isLoading: loading,
  };
};

