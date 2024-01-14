import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { SearchInput } from 'components/search';
import FilSelect from 'components/select';
import { useJobTypes, useSingleTaskFilter, useTaskList } from 'hooks/task';
import InfiniteScroll from 'react-infinite-scroll-component';
import TaskItem from '../item/TaskItem';
import Auth from '../Auth';
import Loading from 'components/loading';
import {
  IPath,
  ProfessionTypes,
  ProTypes,
  RequirementStatus,
  TaskStatus,
  TaskTypes,
} from 'common/constant';
import CustomSelect from 'components/custom-select';

function SingleTask(props: {
  isCurrent?: boolean;
  isMine?: boolean;
  from?: string;
  single: {
    loading: boolean;
    data: any[];
    hasMore: boolean;
    fetchMoreData: () => void;
    handleSearch: (val: string) => void;
    onChange: (val: string, s: string) => void;
  };
}) {
  // const {getData} = useJobTypes()

  const { loading, data, hasMore, fetchMoreData, handleSearch, onChange } = props.single;
  console.log('data>>>>>>>>>>>>>', data);
  return (
    <Box mt={{ base: '30px' }}>
      <Flex justify="space-between">
        <SearchInput
          background="#1b1e24"
          searchIconColor="#7551FF"
          placeholder="Task Name"
          search={handleSearch}
        ></SearchInput>
        <Box display="flex" justifyContent="flex-end" style={{ gap: 16 }}>
          {props.isMine ? (
            <>
              <CustomSelect
                options={props.from === IPath.MYREQUIREMENT ? RequirementStatus : TaskStatus}
                placeholder="Task Status"
                change={(val: any) => onChange('taskStatus', val)}
                focusBorderColor="rgba(255, 255, 255, 0.4)"
                width={220}
              />
              <CustomSelect
                options={ProTypes}
                placeholder="Crowdsourcing Method"
                change={(val: any) => onChange('proType', val)}
                focusBorderColor="rgba(255, 255, 255, 0.4)"
                width={220}
              />
              <CustomSelect
                options={ProfessionTypes}
                placeholder="Job Type"
                change={(val: any) => onChange('professionType', val)}
                focusBorderColor="rgba(255, 255, 255, 0.4)"
                width={220}
              />
            </>
          ) : (
            <>
              <CustomSelect
                options={ProTypes}
                placeholder="Crowdsourcing Method"
                change={(val: any) => onChange('proType', val)}
                focusBorderColor="rgba(255, 255, 255, 0.4)"
                width={220}
              />
              <CustomSelect
                options={TaskTypes}
                placeholder="Task Type"
                change={(val: any) => onChange('taskType', val)}
                focusBorderColor="rgba(255, 255, 255, 0.4)"
                width={220}
              />
              <CustomSelect
                options={ProfessionTypes}
                placeholder="Job Type"
                change={(val: any) => onChange('professionType', val)}
                focusBorderColor="rgba(255, 255, 255, 0.4)"
                style={{ width: 200 }}
                width={220}
              />
            </>
          )}
        </Box>
      </Flex>
      <Box mt={{ base: '20px' }}>
        {loading ? (
          <Loading />
        ) : (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loading />}
            scrollableTarget="items_list_scrollable_box"
            // className={styles.scrollBox}
            scrollThreshold="10px"
          >
            {data.map((item: any, index: number) => {
              return (
                <TaskItem
                  key={`${item.categoryId}-${index}`}
                  item={item}
                  isMine={props.isMine}
                  from={props.from}
                />
              );
            })}
            {data.length === 0 && (
              <Box display="flex" justifyContent="center">
                No data
              </Box>
            )}
          </InfiniteScroll>
        )}
      </Box>

      <Auth from={props.from} />
    </Box>
  );
}

export default SingleTask;
