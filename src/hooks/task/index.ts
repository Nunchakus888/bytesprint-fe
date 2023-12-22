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
    crowdsourcingType: '', // 众包类型
    categoryType: '',  //项目类别
    positionType: '', // 职位类型
    name: '', // 项目名称
    status: ''
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
      categoryType: '',  //项目类别
      positionType: '', // 职位类型
      name: '', // 项目名称
      status: ''
    });
  };

  return { filter, onChange, refreshFilter };
};

// 任务大厅列表
export const useTaskList = (filter: any, activeTab: RequirementType) => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState('');
  // const [total, setTotal] = useState(0);
  const [data, setData] = useState<any>([]);
  const { triger, toggleTiger } = useChange();
  const [hadMore, setHasMore] = useState(true)
  const oldFilterRef = useRef({});
  
  const getList = async (params: any) => {
    setLoading(!time);
    try {
      const _params = {
        pageSize: PAGE_SIZE,
        ...params,
        time,
      };
      // TODO 参数 不同类型的区分请求 activeTab
      // const res = await Get(
      //   API_ROUTERS.tasks.TASKS_LIST(_params)
      // );
      const list = [1,2,3,4,5].map(it => {
        return {
          id: it,
          number: 'BYSD123456',
          name: '测试任务 海鸥灰',
          categoryType: 1,
          categoryName: '普通任务',
          positionType: 1,
          positionName: `前端开发`,
          crowdsourcingType: 1,
          crowdsourcingName: `竞标`,
          description: `测试任务 海鸥灰符合肉鹅和佛围绕娃儿我为人欧赔王倩茹排位额如额嘎哈哦发货红色佛色和沃尔好哦我乌尔禾哦区分深V多少的饭卡了哈拉萨代发额还让我恶化哦融合我饿水电费哈师大立法会带回去哦我惹我看帅哥好哦钱啊干哈阿大概好哦玩`,
          status: [0, 1, 2],
          statusTime: [Date.now(),Date.now(), Date.now()],
          startTime: Date.now(),
          endTime: Date.now()
        }
      })
      const res = {
        projectRawInfoList: list
      } 
      // // test
      // let result = [{}, {}, {}, {}, {}, {}];
      // let count = 30;
      const data = res.projectRawInfoList
      // 当返回的数量跟每页比小，没有更多
      if (data.length < PAGE_SIZE) {
        setHasMore(false)
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
    const time = data[data.length - 1].createTime;
    setTime(time)
  }, [data]);


  useEffect(() => {
    setTime('');
    setHasMore(true);
  }, [filter]);

  useEffect(() => {
    console.log('triger', triger);
    // console.log(JSON.stringify({ user_addresses, page, filter, triger }));
    const params = {
      time,
      filter,
      triger
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
      // setLoading(true);
      // const res = await Get(
      //   API_ROUTERS.tasks.TASKS_DETAIL({
      //     id,
      //     address
      //   })
      // );
      // setLoading(false);
      console.log("111")
      const res = {
        projectDetailInfo: {
          projectRawInfo: {
            id: "11",
            number: 'BYSD123456',
            name: '测试任务 海鸥灰',
            categoryType: 1,
            categoryName: '普通任务',
            positionType: 1,
            positionName: `前端开发`,
            crowdsourcingType: 1,
            crowdsourcingName: `竞标`,
            description: `测试任务 海鸥灰符合肉鹅和佛围绕娃儿我为人欧赔王倩茹排位额如额嘎哈哦发货红色佛色和沃尔好哦我乌尔禾哦区分深V多少的饭卡了哈拉萨代发额还让我恶化哦融合我饿水电费哈师大立法会带回去哦我惹我看帅哥好哦钱啊干哈阿大概好哦玩`,
            status: [0, 1, 2],
            statusTime: [Date.now(),Date.now(), Date.now()],
            startTime: Date.now(),
            endTime: Date.now()
          },
          fileList: [
            {fileName: '是哦否哈佛稍微额UR偶.pdf', fileType: 'pdf', fileUrl: '#'},
            {fileName: '是哦否哈佛稍微额UR偶.pdf', fileType: 'pdf', fileUrl: '#'},
            {fileName: '是哦否哈佛稍微额UR偶.pdf', fileType: 'pdf', fileUrl: '#'},
            {fileName: '是哦否哈佛稍微额UR偶.pdf', fileType: 'pdf', fileUrl: '#'}
          ]
        }
      }
      console.log("res?.projectDetailInfo>>>", res)
      setData(res?.projectDetailInfo || {});
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

