// import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { SearchInput } from "components/search";
import FilSelect from "components/select";
import { useMyRequirements } from "hooks/myrequirements";
import { ProfessionTypes, ProTypes, TabsEnum, TaskTypes, useSingleTaskFilter, useTaskList, useTasks } from "hooks/task";
import TaskTemplate from "views/task/Template";
import { IoMdAdd } from "react-icons/io";


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
  return (
		<TaskTemplate data={data_} tabs={tabs} activeTab={activeTab} handleTabChange={handleTabChange}>
      <Button background="#7551FF" color="#fff"><IoMdAdd />发布需求</Button>
    </TaskTemplate>
	)
}
