import useChange from "hooks/useChange";
import { useCallback, useEffect, useRef, useState } from "react";
import { RequirementType } from "utils/constant";

const PAGE_SIZE = 10;

// 我的需求列表 TODO
export const useMyRequirements = (filter: any, activeTab: RequirementType) => {
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
    const time = data[data.length - 1]?.startTime;
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
}
