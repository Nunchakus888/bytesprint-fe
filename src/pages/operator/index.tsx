import { Box, Flex } from "@chakra-ui/react";
import Loading from "components/loading";
import { SearchInput } from "components/search";
import FilSelect from "components/select";
import { useOperatorFilter, useOperatorList } from "hooks/operator";
import AdminLayout from "layouts/admin";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import OperatorItem from "views/operator/operatorItem";

export default function OperatorManage() {
  const {filter, onChange, refreshFilter} = useOperatorFilter()
  const {loading,
    page,
    data,
    hasMore,
    fetchMoreData,
    refetchData
	} = useOperatorList(filter)
  // 搜索任务
  const handleSearch = (searchVal: string) => {
    console.log("searchval", searchVal)
    onChange('name', searchVal)
  }
  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }} position="relative">
        <Box mt={{base: "30px"}}>
          <Flex justify="space-between">
            <SearchInput 
              background="rgba(255,255,255,0.05)" 
              searchIconColor="#7551FF" 
              placeholder="用户昵称"
              search={handleSearch}></SearchInput>
              <Box display="flex" justifyContent="flex-end">
                <FilSelect options={[]} placeholder="团队规模" change={(val) => onChange('taskStatus', val)} />
                <FilSelect options={[]} placeholder="认证类型" change={(val) => onChange('proType', val)} />
                <FilSelect options={[]} placeholder="提交时间" change={(val) => onChange('professionType', val)} />
              </Box>
          </Flex>
          <Box mt={{base: '20px'}} >
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
                    <OperatorItem
                      key={`${item.categoryId}-${index}`}
                      item={item}
                    />
                  );
                })}
              </InfiniteScroll>
            )}
        </Box>
        </Box>
      </Box>
    </AdminLayout>
  )
}