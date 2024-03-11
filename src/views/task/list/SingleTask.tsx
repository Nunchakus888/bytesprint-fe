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
import styles from './index.module.scss';
import { useAccount } from 'wagmi';

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
  const account = useAccount();
  return (
    <Box mt={{ base: '30px' }}>
      <Flex
        justify="space-between"
        gap="10px"
        className={props.from === IPath.MYREQUIREMENT ? styles.hasAdd : ''}
      >
        <SearchInput
          background="#1b1e24"
          placeholder="Task Name"
          search={handleSearch}
        ></SearchInput>
        {props.from === IPath.TASKS && (
          <Box display="flex" justifyContent="flex-end" style={{ gap: 16 }}>
            {props.isMine ? (
              <>
                <CustomSelect
                  // options={props.from === IPath.MYREQUIREMENT ? RequirementStatus : TaskStatus}
                  options={TaskStatus}
                  placeholder="Task Status"
                  onChange={(val: any) => onChange('status', val?.value)}
                  focusBorderColor="rgba(255, 255, 255, 0.4)"
                  width={220}
                />
                <CustomSelect
                  options={ProTypes}
                  placeholder="Crowdsourcing Method"
                  onChange={(val: any) => onChange('crowdsourcingtype', val?.value)}
                  focusBorderColor="rgba(255, 255, 255, 0.4)"
                  width={220}
                />
                <CustomSelect
                  options={ProfessionTypes}
                  placeholder="Job Type"
                  onChange={(val: any) => onChange('positiontype', val?.value)}
                  focusBorderColor="rgba(255, 255, 255, 0.4)"
                  width={220}
                />
              </>
            ) : (
              <>
                <CustomSelect
                  options={ProTypes}
                  placeholder="Crowdsourcing Method"
                  onChange={(val: any) => onChange('crowdsourcingtype', val?.value)}
                  focusBorderColor="rgba(255, 255, 255, 0.4)"
                  width={220}
                />
                <CustomSelect
                  options={TaskTypes}
                  placeholder="Task Type"
                  onChange={(val: any) => onChange('categorytype', val?.value)}
                  focusBorderColor="rgba(255, 255, 255, 0.4)"
                  width={220}
                />
                <CustomSelect
                  options={ProfessionTypes}
                  placeholder="Job Type"
                  onChange={(val: any) => onChange('positiontype', val?.value)}
                  focusBorderColor="rgba(255, 255, 255, 0.4)"
                  style={{ width: 200 }}
                  width={220}
                />
              </>
            )}
          </Box>
        )}
      </Flex>
      <Box
        mt={{ base: '20px' }}
        id="items_list_scrollable_box"
        style={{ height: 'calc(100vh - 240px)', overflow: 'scroll' }}
      >
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
          </InfiniteScroll>
        )}
        {data.length === 0 && (
          <Box display="flex" justifyContent="center">
            No data
          </Box>
        )}
      </Box>

      {account?.address && <Auth from={props.from} />}
    </Box>
  );
}

export default SingleTask;
