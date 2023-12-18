import { Button, } from "@chakra-ui/react";
import { useMyRequirements } from "hooks/myrequirements";
import {useSingleTaskFilter, useTaskList, useTasks } from "hooks/task";
import TaskTemplate from "views/task/Template";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { IPath } from "utils/constant";
import { useUserInfo } from "hooks/user";
import { useRouter } from "next/router";
import { useEffect } from "react";

// 我的需求
export default function MyRequirements() {
	const {tabs, activeTab, handleTabChange} = useTasks()
	const {filter, onChange, refreshFilter} = useSingleTaskFilter()
	const {loading,
    page,
    data,
    hasMore,
    fetchMoreData,
    refetchData
	} = useMyRequirements(filter, activeTab)
	// 搜索任务
  const handleSearch = (searchVal: string) => {
    console.log("searchval", searchVal)
    onChange('name', searchVal)
  }
	const data_ = {
		loading,
		page,
    data,
    hasMore,
    fetchMoreData,
    refetchData,
		onChange,
		refreshFilter,
		handleSearch
	}

  const {identification} = useUserInfo()
  const router = useRouter()
  useEffect(() => {
    console.log("identification>>>>>>>>>>?", identification)
    if (!identification) {
      router.replace('/tasks')
    }
  }, [])
  return (
		<TaskTemplate data={data_} tabs={tabs} activeTab={activeTab} handleTabChange={handleTabChange} isMine={true} from={IPath.MYREQUIREMENT}>
      <Link href={`/myrequirement/add`}><Button background="#7551FF" color="#fff"><IoMdAdd />发布需求</Button></Link>
    </TaskTemplate>
	)
}
