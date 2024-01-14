import { Box, Flex } from '@chakra-ui/react';
import Loading from 'components/loading';
import { SearchInput } from 'components/search';
import FilSelect from 'components/select';
import { useEngineerFilter, useEngineerList } from 'hooks/engineer';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';
import EngineerItem from 'views/engineer/engineerItem';

export default function EngineerManage() {
  const { filter, onChange, refreshFilter } = useEngineerFilter();
  const { loading, page, data, hasMore, fetchMoreData, refetchData } = useEngineerList(filter);
  // 搜索任务
  const handleSearch = (searchVal: string) => {
    console.log('searchval', searchVal);
    onChange('name', searchVal);
  };
  console.log('hasMore', hasMore);
  return (
    <>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }} position="relative">
        <Box mt={{ base: '30px' }}>
          <Box position="sticky">
            <Flex justify="space-between">
              <SearchInput
                background="#1b1e24"
                searchIconColor="#7551FF"
                placeholder="User Name"
                search={handleSearch}
              ></SearchInput>
              <Box display="flex" justifyContent="flex-end" width="42%" minWidth="400px">
                <FilSelect
                  options={[]}
                  placeholder="工作经验"
                  change={(val) => onChange('experience', val)}
                />
                <FilSelect
                  options={[]}
                  placeholder="学历"
                  change={(val) => onChange('educational', val)}
                />
                <FilSelect
                  options={[]}
                  placeholder="认证类型"
                  change={(val) => onChange('proType', val)}
                />
                <FilSelect
                  options={[]}
                  placeholder="提交时间"
                  change={(val) => onChange('professionType', val)}
                />
              </Box>
            </Flex>
          </Box>
          <Box mt={{ base: '20px' }} id="operator-list" height="800px" overflow="scroll">
            {loading ? (
              <Loading />
            ) : (
              <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<AiOutlineLoading3Quarters />}
                scrollableTarget="operator-list"
                // className={styles.scrollBox}
                scrollThreshold="10px"
              >
                {data.map((item: any, index: number) => {
                  return <EngineerItem key={`${item.categoryId}-${index}`} item={item} />;
                })}
              </InfiniteScroll>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
