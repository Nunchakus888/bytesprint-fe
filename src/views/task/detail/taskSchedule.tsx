import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  styled,
  Text,
} from '@chakra-ui/react';
import ModalDialog from 'components/modal';
import BYTable from 'components/table';
import { ISchedule, useSchedule } from 'hooks/mytasks/schedule';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { Controller } from 'react-hook-form';
import { useEffect } from 'react';

export default function TaskSchedule(props: {
  taskId: string;
  onClose: () => void;
  scheduleTask: (data: ISchedule[]) => void;
  startTask: (id: string) => void;
  scheduledata: ISchedule[];
}) {
  const { onClose, scheduleTask, startTask, taskId, scheduledata } = props;
  const {
    fields,
    append,
    remove,
    errors,
    register,
    setValue,
    startMyTask,
    saveSchedule,
    isStartTask,
    getValues,
    control,
  } = useSchedule({ scheduleTask, startTask, taskId, scheduledata });

  useEffect(() => {
    console.log('fields', fields);
  }, [fields]);

  const columns = [
    {
      title: 'Serial Number',
      dataIndex: 'xuhao',
      key: 'xuhao',
      render: (_: any, record: any, index: number) => {
        return <Box paddingLeft="5px">{index + 1}</Box>;
      },
    },
    {
      title: 'Task Name',
      dataIndex: 'taskname',
      key: 'taskname',
    },
    {
      title: '预计工时',
      dataIndex: 'workhours',
      key: 'workhours',
      render: (_: any, record: any, index: number) => {
        return (
          // <Controller
          //   render={props => <Input {...props} key={`datas.${index}.workhours`} color="#fff" type="number" placeholder='请输入' size='md' {...register(`datas.${index}.workhours`, { required: true })}  /> }
          //   name={`datas.${index}.workhours`}
          //   control={control}
          // />
          <FormControl isInvalid={!!errors?.datas?.[index]?.workhours} isRequired>
            <Input
              key={`datas.${index}.workhours`}
              color="#fff"
              type="number"
              placeholder="请输入"
              size="md"
              {...register(`datas.${index}.workhours`, { required: true })}
            />
            <FormErrorMessage>
              {errors?.datas?.[index]?.workhours && (
                <>{errors?.datas?.[index]?.workhours.message}</>
              )}
            </FormErrorMessage>
          </FormControl>
        );
      },
    },
    {
      title: '预计开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (_: any, record: any, index: number) => {
        return (
          <FormControl isInvalid={!!errors?.datas?.[index]?.startTime} isRequired>
            <SingleDatepicker
              key={`datas.${index}.startTime`}
              name="date-input"
              date={getValues(`datas.${index}.startTime`)}
              onDateChange={(date) => setValue(`datas.${index}.startTime`, date)}
              {...register(`datas.${index}.startTime`, { required: true })}
            />
            {/* <Input color="#fff" type="number" placeholder='请输入' size='md' {...register(`datas.${index}.startTime`, { required: true })}  />  */}
            <FormErrorMessage>
              {errors?.datas?.[index]?.startTime && (
                <>{errors?.datas?.[index]?.startTime.message}</>
              )}
            </FormErrorMessage>
          </FormControl>
        );
      },
    },
    {
      title: '预计结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (_: any, record: any, index: number) => {
        console.log('getValues(`datas.${index}.endTime`)', getValues());
        return (
          <FormControl isInvalid={!!errors?.datas?.[index]?.endTime} isRequired>
            <SingleDatepicker
              key={`datas.${index}.endTime`}
              name="date-input"
              // date={date}
              // onDateChange={setDate}
              date={getValues(`datas.${index}.endTime`)}
              onDateChange={(date) => setValue(`datas.${index}.endTime`, date)}
              {...register(`datas.${index}.endTime`, { required: true })}
            />
            {/* <Input color="#fff" type="number" placeholder='请输入' size='md' {...register(`datas.${index}.workhours`, { required: true })}  />  */}
            <FormErrorMessage>
              {errors?.datas?.[index]?.endTime && <>{errors?.datas?.[index]?.endTime.message}</>}
            </FormErrorMessage>
          </FormControl>
        );
      },
    },
  ];
  return (
    <ModalDialog title="任务计划" onClose={onClose} isOpen={true} btnGroup={<></>}>
      <Box background="rgba(255,255,255,0.05)" padding="10px" margin="10px 0 20px 0">
        <Flex justify="space-between">
          <Flex width="100px" alignItems="center" justifyContent="center">
            Serial Number
          </Flex>
          <Flex alignItems="center" justifyContent="center" width="300px">
            Task Name
          </Flex>
          <Flex alignItems="center" justifyContent="center" width="300px">
            预计工时
          </Flex>
          <Flex width="300px" alignItems="center" justifyContent="center">
            预计开始时间
          </Flex>
          <Flex width="300px" alignItems="center" justifyContent="center">
            预计结束时间
          </Flex>
        </Flex>
        {fields.map((it, index) => {
          return (
            <Flex key={`line_${index}`} justify="space-between" padding="10px 0">
              <Flex alignItems="center" justifyContent="center" width="100px">
                {index + 1}
              </Flex>
              <Flex alignItems="center" justifyContent="center" width="300px">
                {it.taskname}
              </Flex>
              <Flex alignItems="center" justifyContent="center" width="300px" paddingRight="10px">
                <FormControl isInvalid={!!errors?.datas?.[index]?.workhours} isRequired>
                  <Input
                    key={`datas.${index}.workhours`}
                    color="#fff"
                    type="number"
                    placeholder="请输入"
                    size="md"
                    {...register(`datas.${index}.workhours`, { required: true, min: 0 })}
                  />
                  <FormErrorMessage>
                    {errors?.datas?.[index]?.workhours && (
                      <>{errors?.datas?.[index]?.workhours.message}</>
                    )}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex alignItems="center" justifyContent="center" width="300px" paddingRight="10px">
                <FormControl isInvalid={!!errors?.datas?.[index]?.startTime} isRequired>
                  <SingleDatepicker
                    key={`datas.${index}.startTime`}
                    name="date-input"
                    date={getValues(`datas.${index}.startTime`)}
                    onDateChange={(date) => setValue(`datas.${index}.startTime`, date)}
                    {...register(`datas.${index}.startTime`, { required: true })}
                  />
                  {/* <Input color="#fff" type="number" placeholder='请输入' size='md' {...register(`datas.${index}.startTime`, { required: true })}  />  */}
                  <FormErrorMessage>
                    {errors?.datas?.[index]?.startTime && (
                      <>{errors?.datas?.[index]?.startTime.message}</>
                    )}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex alignItems="center" justifyContent="center" width="300px" paddingRight="10px">
                <FormControl isInvalid={!!errors?.datas?.[index]?.endTime} isRequired>
                  <SingleDatepicker
                    key={`datas.${index}.endTime`}
                    name="date-input"
                    // date={date}
                    // onDateChange={setDate}
                    date={getValues(`datas.${index}.endTime`)}
                    onDateChange={(date) => setValue(`datas.${index}.endTime`, date)}
                    {...register(`datas.${index}.endTime`, { required: true })}
                  />
                  {/* <Input color="#fff" type="number" placeholder='请输入' size='md' {...register(`datas.${index}.workhours`, { required: true })}  />  */}
                  <FormErrorMessage>
                    {errors?.datas?.[index]?.endTime && (
                      <>{errors?.datas?.[index]?.endTime.message}</>
                    )}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
            </Flex>
          );
        })}
      </Box>
      <Flex justify="center" alignItems="center" gap="40px">
        {/* <Link color="#7551FF" onClick={saveSchedule}>保存</Link> */}
        <Button background="#7551FF" mr={3} disabled={!isStartTask} onClick={startMyTask}>
          开始任务
        </Button>
      </Flex>
    </ModalDialog>
  );
}
