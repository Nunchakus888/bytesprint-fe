// import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Box, Flex, Portal, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useSingleTaskFilter, useTaskList, useTasks } from 'hooks/task';

import { IPath, RequirementType, TabsEnum } from 'common/utils/constant';
import styles from './index.module.scss';
import PersonTask from './list/PersonTask';
import SingleTask from './list/SingleTask';
import Navbar from 'components/navbar/Navbar';
export default function TaskTemplate(props: {
  children?: React.ReactNode;
  isMine?: boolean; // 是否是我的
  from?: string; // 来自我的需求、大厅、我的任务
  tabs: any[];
  activeTab: RequirementType;
  handleTabChange: (val: RequirementType) => void;
  data: {
    loading: boolean;
    data: any[];
    hasMore: boolean;
    fetchMoreData: () => void;
    refetchData: () => void;
    handleSearch: (val: string) => void;
    onChange: (val: string, s: string) => void;
    refreshFilter: () => void;
  };
  // person: {loading:boolean, data:any[], hasMore: boolean, fetchMoreData: ()=> void, refetchData: () => void, handleSearch: (val:string) => void, onChange: (val:string, s: string) => void,refreshFilter:() => void}
}) {
  const {
    tabs,
    activeTab,
    handleTabChange,
    data,
    children,
    // person
  } = props;

  // useEffect(() => {
  //   // 单一任务
  //   data.refreshFilter();
  //   data.refetchData();
  // }, [activeTab]);

  // // 搜索任务
  // const handleSearch = (searchVal: string) => {
  //   console.log("searchval", searchVal)
  //   onChange('name', searchVal)
  // }

  const path =
    props.from === IPath.MYREQUIREMENT
      ? { path: `#`, name: 'My Requirements' }
      : props.from === IPath.MYTASKS
        ? { path: `#`, name: 'My Task' }
        : { path: `#`, name: 'Task Hall' };
  return (
    <>
      <Box position="relative">
        <Tabs variant="soft-rounded" colorScheme="purple" index={0}>
          <Box className={styles.tabswrap}>
            <TabList className={styles.tabs}>
              {tabs?.map((it) => {
                return (
                  <Tab
                    key={it.label}
                    className={it.value === activeTab ? styles.tab_active : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabChange(it.value);
                    }}
                  >
                    {it.label}
                  </Tab>
                );
              })}
            </TabList>
          </Box>
          <TabPanels padding="0">
            {tabs?.map((it) => {
              return (
                <TabPanel padding="0" key={`${it?.label}_tabcontent`}>
                  {it.label === TabsEnum.SINGLE_TASK && (
                    <SingleTask single={data} isMine={props.isMine} from={props.from} />
                  )}
                  {it.label === TabsEnum.PERSON_TASK && (
                    <PersonTask person={data} isMine={props.isMine} from={props.from} />
                  )}
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
        {children && <Box className={styles.add}>{children}</Box>}
      </Box>
    </>
  );
}
