import { Box, Button, Flex } from "@chakra-ui/react"
import { SearchInput } from "components/search"
import FilSelect from "components/select"
import { ProfessionTypes, ProTypes, TaskTypes, useSingleTaskFilter, useTaskList } from "hooks/task"
import InfiniteScroll from "react-infinite-scroll-component"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import TaskItem from "./TaskItem"
import Auth from "./Auth"
import useChange from "hooks/useChange"
import { useEffect } from "react"
import Loading from "components/loading"

// TODO 切换tab刷新接口
// TODO 任务详情
function SingleTask(props: {
	isCurrent?: boolean
}) {
	const {triger, toggleTiger} = useChange()
	const {filter, onChange} = useSingleTaskFilter()
	
	useEffect(() => {
		console.log("isCurrent>>>", props.isCurrent)
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
				placeholder="任务名称"
				search={handleSearch}></SearchInput>
			<Box display="flex" justifyContent="flex-end">
				<FilSelect options={ProTypes} placeholder="众包方式" change={(val) => onChange('proType', val)} />
				<FilSelect options={TaskTypes} placeholder="任务类型" change={(val) => onChange('taskType', val)} />
				<FilSelect options={ProfessionTypes} placeholder="职位类型" change={(val) => onChange('professionType', val)} />
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

							<TaskItem
                  
                  item={{}}
                />
								<TaskItem
                  
                  item={{}}
                />
								<TaskItem
                  
                  item={{}}
                />
          </InfiniteScroll>
        )}
		</Box>

		<Auth />
	</Box>
)  
}

export default SingleTask