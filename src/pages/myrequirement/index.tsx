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
import useConnect from "hooks/useConnect";

// My Requirements
export default function MyRequirements() {
  const { connect } = useConnect()
	const {tabs, activeTab, handleTabChange} = useTasks()
	const {filter, onChange, refreshFilter} = useSingleTaskFilter()
	const {loading,
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
    data,
    hasMore,
    fetchMoreData,
    refetchData,
		onChange,
		refreshFilter,
		handleSearch
	}

  return (
		<TaskTemplate data={data_} tabs={tabs} activeTab={activeTab} handleTabChange={handleTabChange} isMine={true} from={IPath.MYREQUIREMENT}>
      <Link href={`/myrequirement/add`}><Button background="#7551FF" color="#fff"><IoMdAdd />Publish Requirement</Button></Link>
    </TaskTemplate>
	)
}
