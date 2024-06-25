import {
  Box,
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
import { useEvaluate } from 'hooks/task/evaluate';
import { IoIosAdd } from 'react-icons/io';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import styles from './index.module.scss';
import _ from 'lodash';
import { Controller } from 'react-hook-form';

export default function Evaluate(props: {
  isOpen?: boolean;
  onClose?: () => void;
  projectId: string;
  onSuccess: () => void;
}) {
  const { isOpen, onClose, projectId, onSuccess } = props;
  const {
    fields,
    append,
    remove,
    // totalCnys,
    totalUsdt,
    // cnys,
    errors,
    register,
    handleSure,
    setValue,
    getValues,
    isLoading,
    control,
  } = useEvaluate(projectId, () => {
    onClose();
    onSuccess();
  });

  return (
    <ModalDialog
      title="Participate in Evaluation"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Evaluate pledge"
      onSure={handleSure}
      isLoading={isLoading}
      closeOnOverlayClick={false}
    >
      <Box>
        <Text fontSize="lg">Task planList</Text>
        <Box background="rgba(255,255,255,0.1)" padding="10px" margin="10px 0 20px 0">
          <Flex justify="space-between" alignItems="center">
            <Flex width="100px" alignItems="center" justifyContent="center">
              Serial Number
            </Flex>
            <Flex alignItems="center" justifyContent="center" width="400px">
              Task Name
            </Flex>
            <Flex alignItems="center" justifyContent="center" width="400px">
              Cost（USDT）
            </Flex>
            {/* <Flex width="100px" alignItems="center" justifyContent="center" >价值(CNY)</Flex> */}
            <Flex width="100px" alignItems="center" justifyContent="center">
              Operation
            </Flex>
          </Flex>
          {fields.map((it, index) => {
            return (
              <Flex
                key={`line_${index}`}
                justify="space-between"
                alignItems="flex-start"
                padding="10px 0"
              >
                <Flex alignItems="center" justifyContent="top" width="100px" height="40px">
                  {index + 1}
                </Flex>
                <Flex alignItems="center" justifyContent="center" width="400px" paddingRight="10px">
                  <FormControl isInvalid={!!errors?.datas?.[index]?.taskname} isRequired>
                    <Input
                      id={`id.${index}.taskname`}
                      name={`datas.${index}.taskname`}
                      color="#fff"
                      placeholder="Enter task name"
                      size="md"
                      {...register(`datas.${index}.taskname`, {
                        required: true,
                      })}
                      disabled={isLoading}
                    />
                    <FormErrorMessage>
                      {errors?.datas?.[index]?.taskname && (
                        <>{errors?.datas?.[index]?.taskname.message}</>
                      )}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                <Flex alignItems="center" justifyContent="center" width="400px" paddingRight="10px">
                  <FormControl isInvalid={!!errors?.datas?.[index]?.usdt} isRequired>
                    <Input
                      id={`id.${index}.usdt`}
                      name={`datas.${index}.usdt`}
                      color="#fff"
                      type="number"
                      placeholder="Enter"
                      size="md"
                      {...register(`datas.${index}.usdt`, {
                        required: true,
                        min: 0,
                        valueAsNumber: true,
                        validate: (value) => {
                          if (!/^(0|[1-9]\d*)$/.test(String(value))) {
                            return `Decimal places not supported`;
                          }
                        },
                      })}
                      disabled={isLoading}
                    />
                    <FormErrorMessage>
                      {errors?.datas?.[index]?.usdt && <>{errors?.datas?.[index]?.usdt.message}</>}
                    </FormErrorMessage>
                  </FormControl>

                  {/* <Controller
                    control={control}
                    name={`datas.${index}.usdt`}
                    rules={{ required: 'Please input usdt' }}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { error },
                    }) => {
                      return (
                        <FormControl
                          className="mb-4"
                          id={`datas.${index}.usdt`}
                          isInvalid={!!error}
                          isRequired
                        >
                          <Input
                            id={`id.${index}.usdt`}
                            name={`datas.${index}.usdt`}
                            color="#fff"
                            type="number"
                            placeholder="Enter"
                            size="md"
                            {...register(`datas.${index}.usdt`, {
                              required: true,
                              min: 0,
                              valueAsNumber: true,
                              validate: {
                                onlyNumber: (value) => {
                                  if (!/^([0-9][1-9]\d*)$/.test(String(value))) {
                                    return `Please input number`;
                                  }
                                },
                              },
                            })}
                            disabled={isLoading}
                          />
                          <FormErrorMessage>{error && error.message}</FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  /> */}
                </Flex>
                {/* <Flex width="100px" alignItems="center" justifyContent="center" >{cnys[index]}</Flex> */}
                <Flex width="100px" height="40px" alignItems="center" justifyContent="center">
                  <Link
                    color="#7551FF"
                    onClick={() => {
                      if (isLoading) return;
                      remove(index);
                    }}
                  >
                    Delete
                  </Link>
                </Flex>
              </Flex>
            );
          })}
          <Link
            onClick={() => {
              if (isLoading) return;
              append({ taskname: '', usdt: '' });
            }}
            color="#7551FF"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IoIosAdd />
            Add Task
          </Link>
          <Flex width="70%" justifyContent="space-between" padding="20px 0 0 20px">
            <Text fontSize="lg">Total Rewards</Text>
            <Text color="#7551FF" fontSize="20px" fontWeight="bold">
              {totalUsdt} USDT
            </Text>
            {/* <Text color="#7551FF" fontSize="20px" fontWeight="bold">{totalCnys} CNY</Text> */}
          </Flex>
        </Box>
      </Box>
      <Box>
        <Text fontSize="lg">Estimated Completion Time</Text>
        <Box margin="10px 0 20px 0" className={styles.datepicker}>
          <SingleDatepicker
            name="date-input"
            date={getValues().endTime}
            onDateChange={(date) => setValue('endTime', date)}
            {...register('endTime', { required: true })}
          />
          <Text fontSize="lg" margin="10px 0 0 0">
            Need pledge amount(USDT)
          </Text>
          <InputGroup margin="10px 0 5px 0">
            <InputRightElement>USDT</InputRightElement>
            <Input
              name="need-usdt"
              isReadOnly
              value={(Number(totalUsdt) * 0.1).toFixed(2)}
              color="#fff"
            ></Input>
          </InputGroup>
          <Text fontSize="xs" color="#7551FF">
            Need pledge amount=Total Cost*10%
          </Text>
        </Box>
      </Box>
    </ModalDialog>
  );
}
