import { Box, Button, Flex } from "@chakra-ui/react"
import { SearchInput } from "components/search"
import FilSelect from "components/select"
import { ProfessionTypes, ProTypes, TaskTypes, useSingleTaskFilter, usePersonTaskFilter, useTaskList } from "hooks/task"
import InfiniteScroll from "react-infinite-scroll-component"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import TaskItem from "./TaskItem"
import Auth from "./Auth"
import PersonTaskItem from "./PersonTaskItem"
import useChange from "hooks/useChange"
import { useEffect } from "react"
import Loading from "components/loading"


function PersonTask(props: {
	isCurrent?: boolean
}) {
	const {triger, toggleTiger} = useChange()
	const {filter, onChange} = useSingleTaskFilter()
	
	useEffect(() => {
		if (props.isCurrent) {
			toggleTiger()
		}
	}, [props.isCurrent])

	const { loading, data, hasMore, fetchMoreData } = useTaskList(
    // userAddress,
    filter,
		triger
  );
	
	// 搜索任务
	const handleSearch = (searchVal: string) => {
		console.log("searchval", searchVal)
		onChange('name', searchVal)
	}
	

  return (
		<Box mt={{base: "30px"}}>
		<Flex justify="space-between">
			<SearchInput 
				background="rgba(255,255,255,0.05)" 
				searchIconColor="#7551FF" 
				placeholder="需求名称"
				search={handleSearch}></SearchInput>
			<Box display="flex" justifyContent="flex-end">
				<FilSelect options={ProTypes} placeholder="学历要求" change={(val) => onChange('educational', val)} />
				<FilSelect options={TaskTypes} placeholder="经验要求" change={(val) => onChange('experience', val)} />
				<FilSelect options={ProfessionTypes} placeholder="工作地点" change={(val) => onChange('workPlace', val)} />
                <FilSelect options={ProfessionTypes} placeholder="工作时长" change={(val) => onChange('workTime', val)} />
                <FilSelect options={ProfessionTypes} placeholder="任务类型" change={(val) => onChange('taskType', val)} />
			</Box>
		</Flex>

		<Box mt={{base: '20px'}}>
			{loading ? (
         <Loading />
        ) : (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<AiOutlineLoading3Quarters />}
            scrollableTarget="items_list_scrollable_box"
            // className={styles.scrollBox}
            scrollThreshold="10px"
          >
            {/* {data.map((item: any, index:number) => {
              return (
                <TaskItem
                  key={`${item.categoryId}-${index}`}
                  item={item}
                />
              );
            })} */}

							<PersonTaskItem
                  
                  item={{}}
                />
								<PersonTaskItem
                  
                  item={{}}
                />
								<PersonTaskItem
                  
                  item={{}}
                />
          </InfiniteScroll>
        )}
		</Box>

		<Auth />
	</Box>
)  
}

export default PersonTask