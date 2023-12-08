import useChange from "hooks/useChange";
import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_SIZE = 10;

// 我的需求列表
export const useMyRequirements = (filter: any, activeTab: string) => {
	const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any>([]);
  const {triger, toggleTiger} = useChange()
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
      let result = [{}, {}, {},{}, {}, {}]
      let count = 30

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
    console.log("fetchMoreData")
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
    console.log("params>>>", params, activeTab)
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
}
