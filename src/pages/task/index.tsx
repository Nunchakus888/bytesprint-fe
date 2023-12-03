// import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { SearchInput } from "components/search";
import FilSelect from "components/select";
import { ProfessionTypes, ProTypes, TabsEnum, TaskTypes, useSingleTaskFilter, useTasks } from "hooks/task";
import useChange from "hooks/useChange";
import AdminLayout from "layouts/admin";
import PersonTask from "views/task/PersonTask";
import SingleTask from "views/task/SingleTask";
import styles from './index.module.scss'

const Task = () => {
	const {tabs, activeTab, handleTabChange} = useTasks()
  return (
		<AdminLayout>
			<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
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
								{it.label === TabsEnum.SINGLE_TASK && <SingleTask isCurrent={activeTab === TabsEnum.SINGLE_TASK}/>}
								{it.label === TabsEnum.PERSON_TASK && <PersonTask isCurrent={activeTab === TabsEnum.PERSON_TASK}/>}
							</TabPanel>
						)
					})
				}
			</TabPanels>
		</Tabs>
		</Box>
		</AdminLayout>
	)
}

export default Task;