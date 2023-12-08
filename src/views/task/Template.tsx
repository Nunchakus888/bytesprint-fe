// import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { ProfessionTypes, ProTypes, TabsEnum, TaskTypes, useSingleTaskFilter, useTaskList, useTasks } from "hooks/task";

import AdminLayout from "layouts/admin";
import { useEffect } from "react";
import styles from './index.module.scss'
import PersonTask from "./list/PersonTask";
import SingleTask from "./list/SingleTask";

export default function TaskTemplate (props: {
	children?: React.ReactNode,
  tabs: any[],
  activeTab: string,
  handleTabChange: (val:string) => void,
  data: {loading:boolean, data:any[], hasMore: boolean, fetchMoreData: ()=> void, refetchData: () => void, handleSearch: (val:string) => void, onChange: (val:string, s: string) => void,refreshFilter:() => void},
  // person: {loading:boolean, data:any[], hasMore: boolean, fetchMoreData: ()=> void, refetchData: () => void, handleSearch: (val:string) => void, onChange: (val:string, s: string) => void,refreshFilter:() => void}
}){
  const {
    tabs,
    activeTab,
    handleTabChange,
    data,
		children
    // person
  } = props    
  useEffect(() => {
    // 单一任务
    data.refreshFilter()
    data.refetchData()
  }, [activeTab])

  
  // // 搜索任务
  // const handleSearch = (searchVal: string) => {
  //   console.log("searchval", searchVal)
  //   onChange('name', searchVal)
  // }
  return (
		<AdminLayout>
			<Box pt={{ base: '130px', md: '80px', xl: '80px' }} position="relative">
				<Tabs variant='soft-rounded' colorScheme="purple">
					<Box className={styles.tabswrap} > 
						<TabList className={styles.tabs}>
							{
								tabs?.map(it => {
									return (
										<Tab key={it.label} onClick={() => handleTabChange(it.value)}>{it.label}</Tab>
									)
								})
							}
						</TabList>
					</Box>
					<TabPanels padding="0">
						{
							tabs?.map(it => {
								return (
									<TabPanel padding="0" key={`${it.label}_tabcontent`}>
										{it.label === TabsEnum.SINGLE_TASK && <SingleTask single={data} />}
										{it.label === TabsEnum.PERSON_TASK && <PersonTask person={data } />}
									</TabPanel>
								)
							})
						}
					</TabPanels>
				</Tabs>
				{children && <Box className={styles.add}>{children}</Box>}
			</Box>
		</AdminLayout>
	)
}

