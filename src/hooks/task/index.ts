import API_ROUTERS from "api";
import { useCallback, useEffect, useRef, useState } from "react"
import { Get } from "utils/axios";
import useSWR from "swr";
const PAGE_SIZE = 40;

export const enum TabsEnum {
	SINGLE_TASK= '单一任务',
	PERSON_TASK= '人员需求',
	ALL_TASK = '整包项目'
}
// 需求类型
const Tabs = [
	{
		label: TabsEnum.SINGLE_TASK,
		value: '1'
	},
	{
		label: TabsEnum.PERSON_TASK,
		value: '2'
	},
	{
		label: TabsEnum.ALL_TASK,
		value: '3'
	},
]

// 众包方式
export const ProTypes = [
	{
		label: '竞标',
		value: '1'
	},
	{
		label: '比稿',
		value: '2'
	},
	{
		label: '出价',
		value: '3'
	}
]
// 任务类型
export const TaskTypes = [
	{
		label: '普通任务',
		value: '1'
	},
	{
		label: '船长任务',
		value: '2'
	}
]
// 职位类型
export const ProfessionTypes = [
	{
		label: '前端开发',
		value: '1'
	},
	{
		label: '后端开发',
		value: '2'
	},
	{
		label: 'UI设计',
		value: '3'
	},
	{
		label: '测试',
		value: '4'
	},
]

// 根据角色返回对应的任务数据
// 任务tab
// 任务列表
export const useTasks = () => {
	const [tabs, setTabs] = useState(Tabs)
	const [activeTab, setActiveTab] = useState(tabs?.[0].value)
	const handleTabChange = (val: string) => {
		setActiveTab(tabs.filter(it => it.value === val)[0].label)
	}
  return {
		tabs,
		activeTab,
		handleTabChange
	}
}

// 单一任务的查询
export const useSingleTaskFilter = () => {
	const [filter, setFilter] = useState({
    proType: '',
		taskType: '',
		professionType: '',
		name: ''
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
}

export const useTaskList = (filter: any, triger: number) => {
	const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any>([]);
  const oldFilterRef = useRef({});
  const getList = async (params: any) => {
    setLoading(params.page === 1);

    try {
      const _params = {
        page,
        page_size: PAGE_SIZE,
        ...params,
      };
			// TODO 参数 不同类型的区分请求
      const res = await Get(
        API_ROUTERS.tasks.TASKS_LIST({})
      );
      const { count, result } = res || {};
  
      setTotal(count);
      if (params.page === 1) {
        setData(result);
      } else {
        //@ts-ignore
        setData((prevData) => [...prevData, ..._result]);
      }
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = useCallback(() => {
    if (total > page * PAGE_SIZE) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, total]);

  useEffect(() => {
    setPage(1);
    setTotal(0);
  }, [filter]);

  useEffect(() => {
		console.log("triger", triger)
    // console.log(JSON.stringify({ user_addresses, page, filter, triger }));
    const params = {
      page,
      filter,
      triger,
    };

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
    // refetchData: toggleTiger,
  };
}

// 人员需求的查询
export const usePersonTaskFilter = () => {
	const [filter, setFilter] = useState({
    educational: '', // 学历
		experience: '',
		workPlace: '',
		workTime: '',
		taskType: ''
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
}

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
  const [data, setData] = useState([])
  const getData = async () => {
    try {
      setLoading(true)
      const res = await Get(
        API_ROUTERS.tasks.TASKS_DETAIL({
          id
        })
      )
      setLoading(false)
      setData(res?.result || [])
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
