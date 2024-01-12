import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { SearchInput } from 'components/search';
import FilSelect from 'components/select';
import { useJobTypes, useSingleTaskFilter, useTaskList } from 'hooks/task';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import TaskItem from '../item/TaskItem';
import Auth from '../Auth';
import useChange from 'hooks/useChange';
import { useEffect } from 'react';
import Loading from 'components/loading';
import {
  IPath,
  ProfessionTypes,
  ProTypes,
  RequirementStatus,
  TaskStatus,
  TaskTypes,
} from 'common/constant';

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
          background="rgba(255,255,255,0.05)"
          searchIconColor="#7551FF"
          placeholder="Task Name"
          search={handleSearch}
        ></SearchInput>
        <Box display="flex" justifyContent="flex-end">
          {props.isMine ? (
            <>
              <FilSelect
                options={props.from === IPath.MYREQUIREMENT ? RequirementStatus : TaskStatus}
                placeholder="Task Status"
                change={(val) => onChange('taskStatus', val)}
              />
              <FilSelect
                options={ProTypes}
                placeholder="Crowdsourcing Method"
                change={(val) => onChange('proType', val)}
              />
              <FilSelect
                options={ProfessionTypes}
                placeholder="Job Type"
                change={(val) => onChange('professionType', val)}
              />
            </>
          ) : (
            <>
              <FilSelect
                options={ProTypes}
                placeholder="Crowdsourcing Method"
                change={(val) => onChange('proType', val)}
              />
              <FilSelect
                options={TaskTypes}
                placeholder="Task Type"
                change={(val) => onChange('taskType', val)}
              />
              <FilSelect
                options={ProfessionTypes}
                placeholder="Job Type"
                change={(val) => onChange('professionType', val)}
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
