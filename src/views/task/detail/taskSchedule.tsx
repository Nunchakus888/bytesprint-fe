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
    submitLoading,
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
      render: (_: any, record: any, index: number) => {
        return <Box width={'300px'}>{record.taskname}</Box>;
      },
    },
    {
      title: 'Estimated Hours',
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
              placeholder="Enter"
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
      title: 'Estimated Start Time',
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
      title: 'Estimated Completion Time',
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
    <ModalDialog title="Task scheduling" onClose={onClose} isOpen={true} btnGroup={<></>}>
      <Box background="#1b1e24" padding="10px" margin="10px 0 20px 0">
        <Flex justify="space-between">
          <Flex width="100px" alignItems="center" justifyContent="center">
            Serial Number
          </Flex>
          <Flex alignItems="center" justifyContent="center" width="300px">
            Task Name
          </Flex>
          <Flex alignItems="center" justifyContent="center" width="200px">
            Estimated Hours
          </Flex>
          <Flex width="200px" alignItems="center" justifyContent="center">
            Estimated Start Time
          </Flex>
          <Flex width="200px" alignItems="center" justifyContent="center">
            Estimated Completion Time
          </Flex>
        </Flex>
        {fields.map((it, index) => {
          return (
            <Flex key={`line_${index}`} justify="space-between" padding="10px 0">
              <Flex alignItems="center" justifyContent="center" width="100px">
                {index + 1}
              </Flex>
              <Flex alignItems="center" justifyContent="center" width="300px">
                <Box width={'300px'} display="inline">
                  {it.taskname}
                </Box>
              </Flex>
              <Flex alignItems="center" justifyContent="center" width="200px" paddingRight="10px">
                <FormControl isInvalid={!!errors?.datas?.[index]?.workhours} isRequired>
                  <Input
                    key={`datas.${index}.workhours`}
                    color="#fff"
                    type="number"
                    placeholder="Enter"
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
              <Flex alignItems="center" justifyContent="center" width="200px" paddingRight="10px">
                <FormControl isInvalid={!!errors?.datas?.[index]?.startTime} isRequired>
                  <SingleDatepicker
                    key={`datas.${index}.startTime`}
                    name="date-input"
                    date={getValues(`datas.${index}.startTime`)}
                    onDateChange={(date) => setValue(`datas.${index}.startTime`, date)}
                    minDate={new Date()}
                    maxDate={getValues(`datas.${index}.endTime`)}
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
              <Flex alignItems="center" justifyContent="center" width="200px" paddingRight="10px">
                <FormControl isInvalid={!!errors?.datas?.[index]?.endTime} isRequired>
                  <SingleDatepicker
                    key={`datas.${index}.endTime`}
                    name="date-input"
                    // date={date}
                    // onDateChange={setDate}
                    date={getValues(`datas.${index}.endTime`)}
                    onDateChange={(date) => setValue(`datas.${index}.endTime`, date)}
                    minDate={getValues(`datas.${index}.startTime`) || new Date()}
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
        <Button
          background="#7551FF"
          mr={3}
          disabled={!isStartTask}
          onClick={startMyTask}
          isLoading={submitLoading}
        >
          Submit task plan
        </Button>
      </Flex>
    </ModalDialog>
  );
}
