import { Box, Button, Flex } from "@chakra-ui/react"
import { SearchInput } from "components/search"
import FilSelect from "components/select"
import { useSingleTaskFilter, useTaskList } from "hooks/task"
import InfiniteScroll from "react-infinite-scroll-component"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import TaskItem from "../item/TaskItem"
import Auth from "../Auth"
import useChange from "hooks/useChange"
import { useEffect } from "react"
import Loading from "components/loading"
import { IPath, ProfessionTypes, ProTypes, RequirementStatus, TaskStatus, TaskTypes } from "utils/constant"


function SingleTask(props: {
	isCurrent?: boolean,
  isMine?: boolean
  from?: string
	single: {loading:boolean, data:any[], hasMore: boolean, fetchMoreData: ()=> void, handleSearch: (val:string) => void, onChange: (val:string, s: string) => void}
}) {
	
	const {loading, data, hasMore, fetchMoreData, handleSearch, onChange} = props.single
	
  return (
		<Box mt={{base: "30px"}}>
		<Flex justify="space-between">
			<SearchInput 
				background="rgba(255,255,255,0.05)" 
				searchIconColor="#7551FF" 
				placeholder="任务名称"
				search={handleSearch}></SearchInput>
			<Box display="flex" justifyContent="flex-end">
        {props.isMine ? 
          <>
          <FilSelect options={props.from === IPath.MYREQUIREMENT ? RequirementStatus : TaskStatus} placeholder="任务状态" change={(val) => onChange('taskStatus', val)} />
          <FilSelect options={ProTypes} placeholder="众包方式" change={(val) => onChange('proType', val)} />
				  <FilSelect options={ProfessionTypes} placeholder="职位类型" change={(val) => onChange('professionType', val)} />
          </>:
          <>
            <FilSelect options={ProTypes} placeholder="众包方式" change={(val) => onChange('proType', val)} />
				    <FilSelect options={TaskTypes} placeholder="任务类型" change={(val) => onChange('taskType', val)} />
				    <FilSelect options={ProfessionTypes} placeholder="职位类型" change={(val) => onChange('professionType', val)} />
          </>
        }
				
			</Box>
		</Flex>
		<Box mt={{base: '20px'}}>
			{!data ? (
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
            {data.map((item: any, index:number) => {
              return (
                <TaskItem
                  key={`${item.categoryId}-${index}`}
                  item={item}
                  isMine={props.isMine}
                  from={props.from}
                />
              );
            })}
          </InfiniteScroll>
        )}
		</Box>

		<Auth />
	</Box>
)  
}

export default SingleTask