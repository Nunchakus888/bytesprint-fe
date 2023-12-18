import { Box, Button, Flex } from "@chakra-ui/react"
import { SearchInput } from "components/search"
import FilSelect from "components/select"
import { useSingleTaskFilter, usePersonTaskFilter, useTaskList } from "hooks/task"
import InfiniteScroll from "react-infinite-scroll-component"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Auth from "../Auth"
import PersonTaskItem from "../item/PersonTaskItem"
import useChange from "hooks/useChange"
import { useEffect } from "react"
import Loading from "components/loading"
import { IPath, ProfessionTypes, ProTypes, RequirementStatus, TaskTypes } from "utils/constant"


function PersonTask(props: {
	isCurrent?: boolean
	isMine?: boolean
  from?: string
	person: {loading:boolean, data:any[], hasMore: boolean, fetchMoreData: ()=> void, handleSearch: (val:string) => void, onChange: (val:string, s: string) => void}
}) {
	const {loading, data, hasMore, fetchMoreData, handleSearch, onChange} = props.person

  return (
		<Box mt={{base: "30px"}}>
		<Flex justify="space-between">
			<SearchInput 
				background="rgba(255,255,255,0.05)" 
				searchIconColor="#7551FF" 
				placeholder="需求名称"
				search={handleSearch}></SearchInput>
			<Box display="flex" justifyContent="flex-end">
			{props.isMine ? 
          <>
          <FilSelect options={props.from === IPath.MYREQUIREMENT ? RequirementStatus : RequirementStatus} placeholder="任务状态" change={(val) => onChange('taskStatus', val)} />
          <FilSelect options={ProTypes} placeholder="学历要求" change={(val) => onChange('educational', val)} />
				  <FilSelect options={TaskTypes} placeholder="经验要求" change={(val) => onChange('experience', val)} />
				<FilSelect options={ProfessionTypes} placeholder="工作地点" change={(val) => onChange('workPlace', val)} />
				<FilSelect options={ProfessionTypes} placeholder="工作时长" change={(val) => onChange('workTime', val)} />
          </>:
          <>
            <FilSelect options={ProTypes} placeholder="学历要求" change={(val) => onChange('educational', val)} />
				<FilSelect options={TaskTypes} placeholder="经验要求" change={(val) => onChange('experience', val)} />
				<FilSelect options={ProfessionTypes} placeholder="工作地点" change={(val) => onChange('workPlace', val)} />
				<FilSelect options={ProfessionTypes} placeholder="工作时长" change={(val) => onChange('workTime', val)} />
				<FilSelect options={ProfessionTypes} placeholder="任务类型" change={(val) => onChange('taskType', val)} />
          </>
        }
				
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
            {data.map((item: any, index:number) => {
              return (
                <PersonTaskItem
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

export default PersonTask