import { Button, } from "@chakra-ui/react";
import {useSingleTaskFilter, useTaskList, useTasks } from "hooks/task";
import TaskTemplate from "views/task/Template";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { IPath } from "utils/constant";
import { useMyTasks } from "hooks/mytasks";

// My Requirements
export default function MyRequirements() {
	const {tabs, activeTab, handleTabChange} = useTasks()
	const {filter, onChange, refreshFilter} = useSingleTaskFilter()
	const {loading,
    // page,
    data,
    hasMore,
    fetchMoreData,
    refetchData
	} = useMyTasks(filter, activeTab)
	// 搜索任务
  const handleSearch = (searchVal: string) => {
    console.log("searchval", searchVal)
    onChange('name', searchVal)
  }
	const data_ = {
		loading,
		// page,
    data,
    hasMore,
    fetchMoreData,
    refetchData,
		onChange,
		refreshFilter,
		handleSearch
	}
  return (
		<TaskTemplate data={data_} tabs={tabs} activeTab={activeTab} handleTabChange={handleTabChange} isMine={true} from={IPath.MYTASKS}>
    </TaskTemplate>
	)
}
