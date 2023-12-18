

import API_ROUTERS from "api";
import useChange from "hooks/useChange";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Get, Post } from "utils/axios";

// 接单方认证设置
export const useCertEngineerSetting = () => {
  const { data, isLoading, } = useSWR(
    API_ROUTERS.tasks.TASKS_DETAIL({
      
    }),
    Get
  );

  const _data = {
    base: true,
    baseInfo: {
      position: true,
      experience: true,
      workplace: true,
      phone: true,
      email: true
    },
    skillsTag: true,
    taskExperience: true,
    education: true,
    skillsCert: true,
    attachResume: true
  };
  console.log("useTaskDetail>>>", data);

  
  const saveItem = async (item:any) => {
    console.log("data>>>", item)
    // const res = await Post(
    //   API_ROUTERS.tasks.TASKS_LIST({})
    // );
    // return res
  }

  return {
    isLoading,
    data:_data,
    saveItem
  }
};