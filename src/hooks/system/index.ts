import API_ROUTERS from "api";
import useChange from "hooks/useChange";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Get } from "utils/axios";

// 认证职位设置列表
export const useCertPositionSetting = () => {
  const { data, isLoading, mutate } = useSWR(
    API_ROUTERS.tasks.TASKS_DETAIL({
      
    }),
    Get
  );

  const _data = [
    {id: 1, name: 'test', enable: true, source: 1},
    {id: 2, name: 'test', enable: true, source: 1},
    {id: 3, name: 'test', enable: false, source: 1},
  ]
  console.log("useTaskDetail>>>", data);

  const deleteItem = async (id: string) => {
    const res = await Get(
      API_ROUTERS.tasks.TASKS_LIST({})
    );
    return res
  }
  const saveItem = async (item:any) => {
    if (item.id) {
      // 编辑
      const res = await Get(
        API_ROUTERS.tasks.TASKS_LIST({})
      );
      return res
    }
    // 新增
    const res = await Get(
      API_ROUTERS.tasks.TASKS_LIST({})
    );
    return res
  }

  return {
    isLoading,
    data:_data,
    mutate,
    deleteItem,
    saveItem
  }
};